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
    const { donor_name, donor_email, amount, cause_slug, paypal_transaction_id } = await req.json();

    if (!donor_name || !donor_email || !amount || !cause_slug || !paypal_transaction_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Step 1: Insert donation record
    const { data: donation, error: insertError } = await supabase
      .from("donations")
      .insert({
        cause_slug,
        donor_name,
        donor_email,
        donor_phone: "PayPal",
        amount: Math.round(amount),
        status: "completed",
        mpesa_receipt: paypal_transaction_id,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Donation insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to record donation" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Update cause totals
    const { data: cause } = await supabase
      .from("causes")
      .select("raised, supporters, title")
      .eq("slug", cause_slug)
      .single();

    if (cause) {
      await supabase
        .from("causes")
        .update({
          raised: (cause.raised || 0) + Math.round(amount),
          supporters: (cause.supporters || 0) + 1,
        })
        .eq("slug", cause_slug);

      // Step 3: Send Brevo email
      const brevoKey = Deno.env.get("BREVO_API_KEY");
      if (brevoKey && donor_email) {
        try {
          const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "api-key": brevoKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: [{ email: donor_email, name: donor_name }],
              templateId: 7,
              params: {
                donor_name,
                cause_name: cause.title,
                amount: String(amount),
                phone: "PayPal",
                mpesa_receipt: paypal_transaction_id,
                date: new Date().toLocaleDateString("en-KE", {
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

    return new Response(
      JSON.stringify({ success: true, donation_id: donation.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("PayPal record error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
