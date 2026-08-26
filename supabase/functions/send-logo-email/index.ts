import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const SENDER_DOMAIN = "notify.luxurychocolate.lv";
const FROM_EMAIL = "Luxury Chocolate <info@luxurychocolate.lv>";
const OFFER_RECIPIENTS = ["info@luxurychocolate.lv", "ilze.eisaka@gmail.com"];
const SHOP_RECIPIENTS = ["info@luxurychocolate.lv"];

const RequestSchema = z.object({
  name: z.string().trim().min(1).max(200).optional(),
  company: z.string().trim().min(1).max(200).optional(),
  email: z.string().trim().email().max(320).optional(),
  phone: z.string().trim().max(100).optional(),
  size: z.string().trim().max(200).optional(),
  packaging: z.string().trim().max(300).optional(),
  purpose: z.string().trim().max(300).optional(),
  quantity: z.string().trim().max(100).optional(),
  message: z.string().trim().max(5000).optional(),
  logoUrl: z.string().url().max(2000).optional().nullable(),
  shopUpload: z.boolean().optional().default(false),
  fileName: z.string().trim().max(255).optional(),
  fileType: z.string().trim().max(150).optional(),
  fileSize: z.number().nonnegative().max(20 * 1024 * 1024).optional(),
});

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const parsed = RequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return jsonResponse({ error: parsed.error.flatten().fieldErrors }, 400);
    }

    const { name, company, email, phone, size, packaging, purpose, quantity, message, logoUrl, shopUpload, fileName, fileType, fileSize } = parsed.data;
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) return jsonResponse({ error: "Server configuration error" }, 500);
    const supabase = createClient(supabaseUrl, serviceKey);

    if (shopUpload) {
      if (!logoUrl) {
        return jsonResponse({ error: "Logo URL ir obligāts" }, 400);
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

      const messageId = crypto.randomUUID();
      const { error: enqueueError } = await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: messageId,
          to: SHOP_RECIPIENTS[0],
          from: FROM_EMAIL,
          sender_domain: SENDER_DOMAIN,
          subject: `Jauns fails augšupielādēts — ${fileName || "fails"}`,
          html: htmlBody,
          text: `Jauns fails augšupielādēts\nFaila nosaukums: ${fileName || "fails"}\nTips: ${fileType || "unknown"}\nFaila saite: ${logoUrl}`,
          purpose: "transactional",
          label: "shop_logo_upload",
          idempotency_key: `shop-logo-${messageId}`,
          queued_at: new Date().toISOString(),
        },
      });
      if (enqueueError) {
        console.error("Shop upload email enqueue failed", { code: enqueueError.code, message: enqueueError.message });
        return jsonResponse({ success: true, emailed: false, warning: "Fails saglabāts, paziņojums aizkavēts." });
      }
      return jsonResponse({ success: true, emailed: true });
    }

    if (!name || !company || !email) {
      return jsonResponse({ error: "Trūkst obligāto lauku" }, 400);
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

    const { error: saveError } = await supabase.from("offer_requests").insert({
      name, company, email,
      phone: phone || null,
      size: size || null,
      packaging: packaging || null,
      purpose: purpose || null,
      quantity: quantity || null,
      message: message || null,
      logo_url: logoUrl || null,
      email_status: "pending",
    });
    const saved = !saveError;
    if (saveError) console.error("Lead save failed", { code: saveError.code, message: saveError.message });

    const subject = `Jauns pieprasījums no ${safeCompany} — ${safeName}`;
    let enqueuedCount = 0;
    for (const recipient of OFFER_RECIPIENTS) {
      const messageId = crypto.randomUUID();
      const { error: enqueueError } = await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: messageId,
          to: recipient,
          from: FROM_EMAIL,
          sender_domain: SENDER_DOMAIN,
          reply_to: email,
          subject,
          html: htmlBody,
          text: `Jauns piedāvājuma pieprasījums\nVārds: ${name}\nUzņēmums: ${company}\nE-pasts: ${email}\nTelefons: ${phone || "Nav norādīts"}\nIzmērs: ${size || "Nav norādīts"}\nIepakojums: ${packaging || "Nav norādīts"}\nPielietošana: ${purpose || "Nav norādīts"}\nDaudzums: ${quantity || "Nav norādīts"}\nZiņojums: ${message || "Nav norādīts"}${logoUrl ? `\nLogo fails: ${logoUrl}` : ""}`,
          purpose: "transactional",
          label: "offer_request",
          idempotency_key: `offer-${messageId}`,
          queued_at: new Date().toISOString(),
        },
      });
      if (enqueueError) {
        console.error("Offer email enqueue failed", { recipient, code: enqueueError.code, message: enqueueError.message });
      } else {
        enqueuedCount += 1;
      }
    }
    if (enqueuedCount === 0 && !saved) return jsonResponse({ error: "Neizdevās saglabāt pieprasījumu" }, 500);
    return jsonResponse({ success: true, emailed: enqueuedCount > 0, saved });

  } catch (error) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
