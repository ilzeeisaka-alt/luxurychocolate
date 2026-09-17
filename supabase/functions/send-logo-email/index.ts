import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

const OFFER_RECIPIENTS = ["info@luxurychocolate.lv", "ilze.eisaka@gmail.com"];
const SHOP_RECIPIENTS = ["info@luxurychocolate.lv"];

type SupabaseClient = ReturnType<typeof createClient>;

// Mirrors the send-state history the queue processor used to write.
const logSend = async (
  supabase: SupabaseClient,
  templateName: string,
  recipient: string,
  status: "sent" | "suppressed" | "failed",
  errorMessage?: string,
) => {
  const { error } = await supabase.from("email_send_log").insert({
    message_id: null,
    template_name: templateName,
    recipient_email: recipient,
    status,
    error_message: errorMessage ? errorMessage.slice(0, 1000) : null,
  });
  if (error) {
    console.error("Failed to write email send log", { code: error.code, message: error.message });
  }
};

const sendAndLog = async (
  supabase: SupabaseClient,
  templateName: string,
  recipient: string,
  options: { templateData: Record<string, unknown>; idempotencyKey: string; replyTo?: string },
): Promise<boolean> => {
  try {
    const result = await sendTemplateEmail(templateName, recipient, options);
    if (!result.sent) {
      await logSend(supabase, templateName, recipient, "suppressed", result.reason);
      return false;
    }
    await logSend(supabase, templateName, recipient, "sent");
    return true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Email send failed", { templateName, error: msg });
    await logSend(supabase, templateName, recipient, "failed", msg);
    return false;
  }
};

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

      const uploadId = crypto.randomUUID();
      const emailed = await sendAndLog(supabase, "shop_logo_upload", SHOP_RECIPIENTS[0], {
        templateData: {
          fileName: fileName || "fails",
          fileType: fileType || "unknown",
          fileSize: Number.isFinite(fileSize) ? `${Math.max(0, Number(fileSize))} B` : "Nav zināms",
          logoUrl,
          isImage: typeof fileType === "string" && fileType.startsWith("image/"),
        },
        idempotencyKey: `shop_logo_upload-${uploadId}`,
      });

      if (!emailed) {
        return jsonResponse({ success: true, emailed: false, warning: "Fails saglabāts, paziņojums aizkavēts." });
      }
      return jsonResponse({ success: true, emailed: true });
    }

    if (!name || !company || !email) {
      return jsonResponse({ error: "Trūkst obligāto lauku" }, 400);
    }

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

    const offerId = crypto.randomUUID();
    const templateData = {
      name,
      company,
      email,
      phone: phone || "",
      size: size || "",
      packaging: packaging || "",
      purpose: purpose || "",
      quantity: quantity || "",
      message: message || "",
      logoUrl: logoUrl || null,
    };

    let sentCount = 0;
    for (const recipient of OFFER_RECIPIENTS) {
      const ok = await sendAndLog(supabase, "offer_request", recipient, {
        templateData,
        idempotencyKey: `offer_request-${offerId}-${recipient}`,
        replyTo: email,
      });
      if (ok) sentCount += 1;
    }

    if (sentCount === 0 && !saved) return jsonResponse({ error: "Neizdevās saglabāt pieprasījumu" }, 500);
    return jsonResponse({ success: true, emailed: sentCount > 0, saved });

  } catch (error) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
});
