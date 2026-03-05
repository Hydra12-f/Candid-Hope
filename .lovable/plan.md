This system enables **per-cause donations with M-Pesa STK Push**, updates donation progress in real-time, and sends a **transaction receipt email using Brevo templates**.

No PDFs are generated — Brevo handles the **email layout and formatting**.

---

# Prerequisites

1. **Lovable Cloud / Supabase** (database + edge functions)
2. **M-Pesa Daraja credentials** from  
Safaricom  
developer portal  
Safaricom Developer Portal

Store as Supabase secrets:

```
MPESA_CONSUMER_KEY
MPESA_CONSUMER_SECRET
MPESA_PASSKEY
MPESA_SHORTCODE
```

3. **Brevo API Key** from  
  
Brevo

Stored as secret:

```
BREVO_API_KEY
```

4. **Brevo transactional email template**

Example template variables:

```
{{ donor_name }}
{{ cause_name }}
{{ amount }}
{{ mpesa_receipt }}
{{ phone }}
{{ date }}
```

---

# Updated Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  React UI   │────▶│ Edge Function:   │────▶│ Safaricom       │
│ Donation    │     │ mpesa-stk-push   │     │ Daraja API      │
│ Dialog      │     └──────────────────┘     └────────┬────────┘
│             │                                       │ callback
│             │     ┌──────────────────┐               │
│             │◀────│ Edge Function:   │◀──────────────┘
│ (poll)      │     │ mpesa-callback   │
│             │     │ • Updates DB     │
│             │     │ • Sends data to  │
│             │     │   Brevo template │
│             │     └──────────────────┘
│             │
│ Progress    │◀─── Supabase DB (donations + causes)
│ Bars update │
└─────────────┘
```

---

# Database Tables

### donations

```
id (uuid, PK)

cause_slug (text)

donor_name (text)

donor_email (text)

donor_phone (text)

amount (integer)

mpesa_checkout_id (text)

mpesa_receipt (text, nullable)

status (enum)
    pending
    completed
    failed

created_at (timestamptz)
```

---

### causes

```
id (uuid, PK)

slug (text unique)

title (text)

goal (integer)

raised (integer default 0)

supporters (integer default 0)
```

Seed with your **6 causes and their current KES totals**.

---

# Edge Functions

## 1. mpesa-stk-push

Purpose:

Start the **M-Pesa payment request**.

Steps:

1. Receive

```
name
email
phone
amount
cause_slug
```

2. Authenticate with Daraja OAuth
3. Send **STK Push request**
4. Insert donation record:

```
status = pending
mpesa_checkout_id
```

5. Return

```
checkout_request_id
```

Frontend begins polling.

---

# 2. mpesa-callback

Safaricom sends payment result here.

If payment **successful**:

### Step 1 — Extract payment info

```
receipt number
amount
phone
checkout_request_id
```

### Step 2 — Update donation row

```
status = completed
mpesa_receipt = receipt_number
```

---

### Step 3 — Update cause totals

```
causes.raised += amount
causes.supporters += 1
```

---

### Step 4 — Send data to Brevo email template

Request:

```
POST https://api.brevo.com/v3/smtp/email
```

Headers:

```
api-key: BREVO_API_KEY
content-type: application/json
```

Body:

```
{
 "to":[{"email": donor_email,"name": donor_name}],
 "templateId": 7,
 "params": {
   "donor_name": donor_name,
   "cause_name": cause_title,
   "amount": amount,
   "phone": donor_phone,
   "mpesa_receipt": receipt_number,
   "date": created_at
 }
}
```

Brevo sends the **formatted receipt email automatically**.

---

# 3. check-donation-status

Frontend polls every **3 seconds**.

Input:

```
checkout_request_id
```

Returns:

```
status
receipt
```

Possible values:

```
pending
completed
failed
```

---

# Frontend Changes

## 1 Currency Conversion

Replace all `$` with **KES**

Suggested donation amounts:

```
KES 500
KES 1000
KES 2500
KES 5000
KES 10000
KES 25000
```

---

# Donation Dialog Component

`DonationDialog.tsx`

Features:

**Triggered from**

- Causes cards
- Cause details sidebar
- Homepage causes section

---

### UI Layout

```
Cause Title

Suggested Impact Donations

KES 500  → School supplies for one child
KES 1000 → Meals for a family
KES 2500 → Medical support
KES 5000 → Sponsor education support
```

Form fields:

```
Full Name
Email
M-Pesa Phone
Amount
```

---

### Payment Flow

1. User clicks **Donate**
2. Call

```
mpesa-stk-push
```

3. Show

```
"Check your phone to complete payment"
```

4. Poll

```
check-donation-status
```

5. On success:

```
Payment successful
Receipt sent to your email
```

---

# Dynamic Progress Bars

Replace hardcoded values with Supabase queries.

Example fetch:

```
supabase
.from("causes")
.select("*")
```

Use

```
@tanstack/react-query
```

for caching and auto refresh.

---

# Real-Time Donation Impact

Progress bar formula:

```
progress = (raised / goal) * 100
```

Displayed as:

```
KES 345,000 raised of KES 1,000,000 goal
```

---

# Updated Implementation Order

1. Connect **Supabase / Lovable Cloud**
2. Add **M-Pesa + Brevo secrets**
3. Create **donations and causes tables**
4. Seed causes data
5. Create edge functions
  - mpesa-stk-push
  - mpesa-callback
  - check-donation-status
6. Build **DonationDialog component**
7. Convert all currency to **KES**
8. Connect causes pages to Supabase
9. Enable **live progress bar updates**
10. Create **Brevo email template for donation receipts**