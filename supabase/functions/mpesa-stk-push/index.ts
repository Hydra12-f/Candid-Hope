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
    const { name, email, phone, amount, cause_slug } = await req.json();

    if (!name || !email || !phone || !amount || !cause_slug) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate phone format (Kenyan: 2547XXXXXXXX)
    const formattedPhone = phone.replace(/^0/, "254").replace(/^\+/, "");
    if (!/^254\d{9}$/.test(formattedPhone)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number. Use format 07XXXXXXXX or 2547XXXXXXXX" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const consumerKey = Deno.env.get("MPESA_CONSUMER_KEY")!;
    const consumerSecret = Deno.env.get("MPESA_CONSUMER_SECRET")!;
    const passkey = Deno.env.get("MPESA_PASSKEY")!;
    const shortcode = Deno.env.get("MPESA_SHORTCODE")!;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Step 1: Get OAuth token
    const authString = btoa(`${consumerKey}:${consumerSecret}`);
    const tokenRes = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${authString}` } }
    );

    const tokenText = await tokenRes.text();
    let tokenData;
    try {
      tokenData = JSON.parse(tokenText);
    } catch {
      console.error("M-Pesa token response not JSON:", tokenText);
      return new Response(
        JSON.stringify({ error: "M-Pesa authentication failed. Safaricom API may be unavailable." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error("Failed to get M-Pesa token:", tokenData);
      return new Response(
        JSON.stringify({ error: "Failed to authenticate with M-Pesa" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: STK Push
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);
    const password = btoa(`${shortcode}${passkey}${timestamp}`);
    const callbackUrl = `${supabaseUrl}/functions/v1/mpesa-callback`;

    const stkRes = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Math.round(amount),
          PartyA: formattedPhone,
          PartyB: shortcode,
          PhoneNumber: formattedPhone,
          CallBackURL: callbackUrl,
          AccountReference: cause_slug.slice(0, 12),
          TransactionDesc: `Donation to ${cause_slug}`,
        }),
      }
    );

    const stkText = await stkRes.text();
    let stkData;
    try {
      stkData = JSON.parse(stkText);
    } catch {
      console.error("M-Pesa STK response not JSON:", stkText);
      return new Response(
        JSON.stringify({ error: "M-Pesa STK Push failed. Safaricom API may be unavailable." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    console.log("STK Push response:", stkData);

    if (stkData.ResponseCode !== "0") {
      return new Response(
        JSON.stringify({ error: stkData.ResponseDescription || stkData.errorMessage || "STK Push failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const checkoutRequestId = stkData.CheckoutRequestID;

    // Step 3: Insert donation record
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error: dbError } = await supabase.from("donations").insert({
      cause_slug,
      donor_name: name,
      donor_email: email,
      donor_phone: formattedPhone,
      amount: Math.round(amount),
      mpesa_checkout_id: checkoutRequestId,
      status: "pending",
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
    }

    return new Response(
      JSON.stringify({ checkout_request_id: checkoutRequestId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("STK Push error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
