import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      company,
      email,
      phone,
      size,
      packaging,
      purpose,
      quantity,
      message,
      logoUrl,
      shopUpload,
      fileName,
    } = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "E-pasta serviss nav konfigurēts" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (shopUpload) {
      if (!logoUrl) {
        return new Response(
          JSON.stringify({ error: "Logo URL ir obligāts" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const htmlBody = `
        <h2>Jauns logo augšupielādēts no interneta veikala</h2>
        <p><strong>Faila nosaukums:</strong> ${fileName || "Nav zināms"}</p>
        <p><strong>Logo fails:</strong> <a href="${logoUrl}">${logoUrl}</a></p>
        <p><img src="${logoUrl}" alt="Klienta logo" style="max-width:400px;max-height:300px;" /></p>
      `;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Luxury Chocolate <onboarding@resend.dev>",
          to: ["info@luxurychocolate.lv"],
          subject: `Jauns logo augšupielādēts — ${fileName || "fails"}`,
          html: htmlBody,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Resend error:", JSON.stringify(data));
        return new Response(
          JSON.stringify({ error: data?.message ?? "Neizdevās nosūtīt e-pastu" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      console.log("Shop logo email sent:", JSON.stringify(data));

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!name || !company || !email) {
      return new Response(
        JSON.stringify({ error: "Trūkst obligāto lauku" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const logoSection = logoUrl
      ? `<p><strong>Logo fails:</strong> <a href="${logoUrl}">${logoUrl}</a></p>
         <p><img src="${logoUrl}" alt="Klienta logo" style="max-width:300px;max-height:200px;" /></p>`
      : "<p><em>Logo nav pievienots</em></p>";

    const htmlBody = `
      <h2>Jauns piedāvājuma pieprasījums</h2>
      <table style="border-collapse:collapse;width:100%;">
        <tr><td style="padding:8px;font-weight:bold;">Vārds:</td><td style="padding:8px;">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Uzņēmums:</td><td style="padding:8px;">${company}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">E-pasts:</td><td style="padding:8px;">${email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Telefons:</td><td style="padding:8px;">${phone || "Nav norādīts"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Izmērs:</td><td style="padding:8px;">${size || "Nav norādīts"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Iepakojums:</td><td style="padding:8px;">${packaging || "Nav norādīts"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Pielietošana:</td><td style="padding:8px;">${purpose || "Nav norādīts"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Daudzums:</td><td style="padding:8px;">${quantity || "Nav norādīts"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Ziņojums:</td><td style="padding:8px;">${message || "Nav norādīts"}</td></tr>
      </table>
      ${logoSection}
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Luxury Chocolate <onboarding@resend.dev>",
        to: ["ilze.eisaka@gmail.com"],
        subject: `Jauns pieprasījums no ${company} — ${name}`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: data?.message ?? "Neizdevās nosūtīt e-pastu" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log("Email sent successfully:", JSON.stringify(data));

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
