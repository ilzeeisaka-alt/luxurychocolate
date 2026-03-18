import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

type ResendResponse = {
  id?: string;
  message?: string;
  name?: string;
  statusCode?: number;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const sendEmail = async (
  apiKey: string,
  from: string,
  to: string[],
  subject: string,
  html: string,
  replyTo?: string,
) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  const data = (await response.json()) as ResendResponse;
  return { ok: response.ok, status: response.status, data };
};

const extractAllowedTestRecipient = (message: string | undefined) => {
  if (!message) return null;
  const match = message.match(/own email address \(([^)]+)\)/i);
  return match?.[1] ?? null;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
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
      fileType,
      fileSize,
    } = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") ?? "Luxury Chocolate <onboarding@resend.dev>";

    if (!resendApiKey) {
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

      const safeFileName = escapeHtml(fileName || "fails");
      const safeFileType = escapeHtml(fileType || "unknown");
      const safeFileSize = Number.isFinite(fileSize) ? `${Math.max(0, Number(fileSize))} B` : "Nav zināms";
      const safeLogoUrl = escapeHtml(logoUrl);
      const isImage = typeof fileType === "string" && fileType.startsWith("image/");

      const htmlBody = `
        <h2>Jauns logo/fails augšupielādēts no interneta veikala</h2>
        <p><strong>Faila nosaukums:</strong> ${safeFileName}</p>
        <p><strong>Tips:</strong> ${safeFileType}</p>
        <p><strong>Izmērs:</strong> ${safeFileSize}</p>
        <p><strong>Faila saite:</strong> <a href="${safeLogoUrl}">${safeLogoUrl}</a></p>
        ${isImage ? `<p><img src="${safeLogoUrl}" alt="Klienta augšupielādētais fails" style="max-width:400px;max-height:300px;" /></p>` : ""}
      `;

      const primarySend = await sendEmail(
        resendApiKey,
        fromEmail,
        ["info@luxurychocolate.lv"],
        `Jauns fails augšupielādēts — ${safeFileName}`,
        htmlBody,
      );

      if (primarySend.ok) {
        return new Response(
          JSON.stringify({ success: true, recipient: "info@luxurychocolate.lv", fallbackUsed: false }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const primaryMessage = primarySend.data?.message;
      console.error("Primary recipient send failed:", JSON.stringify(primarySend.data));

      const fallbackRecipient = extractAllowedTestRecipient(primaryMessage);
      if (fallbackRecipient) {
        const fallbackSend = await sendEmail(
          resendApiKey,
          fromEmail,
          [fallbackRecipient],
          `Jauns fails augšupielādēts — ${safeFileName}`,
          htmlBody,
        );

        if (fallbackSend.ok) {
          return new Response(
            JSON.stringify({
              success: true,
              recipient: fallbackRecipient,
              fallbackUsed: true,
              warning: "Primārais saņēmējs īslaicīgi nav pieejams; izmantots rezerves saņēmējs.",
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }

        console.error("Fallback recipient send failed:", JSON.stringify(fallbackSend.data));
      }

      return new Response(
        JSON.stringify({
          success: true,
          fallbackUsed: true,
          warning: "Fails ir saglabāts, bet e-pastu šobrīd nevarēja nosūtīt.",
          details: primaryMessage ?? "unknown_email_error",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!name || !company || !email) {
      return new Response(
        JSON.stringify({ error: "Trūkst obligāto lauku" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Nav norādīts");
    const safeSize = escapeHtml(size || "Nav norādīts");
    const safePackaging = escapeHtml(packaging || "Nav norādīts");
    const safePurpose = escapeHtml(purpose || "Nav norādīts");
    const safeQuantity = escapeHtml(quantity || "Nav norādīts");
    const safeMessage = escapeHtml(message || "Nav norādīts");

    const logoSection = logoUrl
      ? `<p><strong>Logo fails:</strong> <a href="${escapeHtml(logoUrl)}">${escapeHtml(logoUrl)}</a></p>`
      : "<p><em>Logo nav pievienots</em></p>";

    const htmlBody = `
      <h2>Jauns piedāvājuma pieprasījums</h2>
      <table style="border-collapse:collapse;width:100%;">
        <tr><td style="padding:8px;font-weight:bold;">Vārds:</td><td style="padding:8px;">${safeName}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Uzņēmums:</td><td style="padding:8px;">${safeCompany}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">E-pasts:</td><td style="padding:8px;">${safeEmail}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Telefons:</td><td style="padding:8px;">${safePhone}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Izmērs:</td><td style="padding:8px;">${safeSize}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Iepakojums:</td><td style="padding:8px;">${safePackaging}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Pielietošana:</td><td style="padding:8px;">${safePurpose}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Daudzums:</td><td style="padding:8px;">${safeQuantity}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Ziņojums:</td><td style="padding:8px;">${safeMessage}</td></tr>
      </table>
      ${logoSection}
    `;

    const offerSend = await sendEmail(
      resendApiKey,
      fromEmail,
      ["ilze.eisaka@gmail.com"],
      `Jauns pieprasījums no ${safeCompany} — ${safeName}`,
      htmlBody,
      email,
    );

    if (!offerSend.ok) {
      console.error("Offer send failed:", JSON.stringify(offerSend.data));
      return new Response(
        JSON.stringify({ error: offerSend.data?.message ?? "Neizdevās nosūtīt e-pastu" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

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
