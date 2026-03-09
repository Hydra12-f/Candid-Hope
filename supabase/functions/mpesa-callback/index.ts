import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("M-Pesa callback received:", JSON.stringify(body));

    const callback = body?.Body?.stkCallback;
    if (!callback) {
      return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const checkoutRequestId = callback.CheckoutRequestID;
    const resultCode = callback.ResultCode;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (resultCode !== 0) {
      // Payment failed
      await supabase
        .from("donations")
        .update({ status: "failed" })
        .eq("mpesa_checkout_id", checkoutRequestId);

      return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Extract callback metadata
    const items = callback.CallbackMetadata?.Item || [];
    const getValue = (name: string) =>
      items.find((i: { Name: string; Value: unknown }) => i.Name === name)?.Value;

    const amount = getValue("Amount");
    const receiptNumber = getValue("MpesaReceiptNumber");
    const phone = String(getValue("PhoneNumber") || "");

    // Step 1: Update donation
    const { data: donation, error: updateError } = await supabase
      .from("donations")
      .update({ status: "completed", mpesa_receipt: receiptNumber })
      .eq("mpesa_checkout_id", checkoutRequestId)
      .select()
      .single();

    if (updateError) {
      console.error("Donation update error:", updateError);
    }

    // Step 2: Update cause totals
    if (donation) {
      const { data: cause } = await supabase
        .from("causes")
        .select("raised, supporters, title")
        .eq("slug", donation.cause_slug)
        .single();

      if (cause) {
        await supabase
          .from("causes")
          .update({
            raised: (cause.raised || 0) + Math.round(amount),
            supporters: (cause.supporters || 0) + 1,
          })
          .eq("slug", donation.cause_slug);

        // Step 3: Send Brevo email
        const brevoKey = Deno.env.get("BREVO_API_KEY");
        if (brevoKey && donation.donor_email) {
          try {
            const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
              method: "POST",
              headers: {
                "api-key": brevoKey,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                to: [{ email: donation.donor_email, name: donation.donor_name }],
                templateId: 7,
                params: {
                  donor_name: donation.donor_name,
                  cause_name: cause.title,
                  amount: String(amount),
                  phone: donation.donor_phone,
                  mpesa_receipt: receiptNumber,
                  date: new Date(donation.created_at).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                },
              }),
            });
            console.log("Brevo email status:", emailRes.status);
          } catch (emailErr) {
            console.error("Brevo email error:", emailErr);
          }
        }
      }
    }

    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Callback error:", err);
    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
