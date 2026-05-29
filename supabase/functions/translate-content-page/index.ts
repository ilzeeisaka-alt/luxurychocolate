// Translates content_pages markdown/title/description on-demand using Lovable AI
// and caches the result in the *_i18n columns.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LANG_NAMES: Record<string, string> = {
  en: "English", ru: "Russian", et: "Estonian", lt: "Lithuanian",
  de: "German", fr: "French", it: "Italian", es: "Spanish", ar: "Arabic",
  sv: "Swedish", no: "Norwegian", fi: "Finnish", da: "Danish",
  nl: "Dutch", pl: "Polish", cs: "Czech", pt: "Portuguese", el: "Greek", tr: "Turkish",
  hu: "Hungarian", ro: "Romanian", bg: "Bulgarian", hr: "Croatian", sk: "Slovak", sl: "Slovenian",
  uk: "Ukrainian", sr: "Serbian", bs: "Bosnian", mk: "Macedonian", sq: "Albanian", is: "Icelandic",
  zh: "Chinese (Simplified)", ja: "Japanese", ko: "Korean", hi: "Hindi", bn: "Bengali", ur: "Urdu",
  fa: "Persian", he: "Hebrew", th: "Thai", vi: "Vietnamese", id: "Indonesian", ms: "Malay",
  tl: "Tagalog", sw: "Swahili", am: "Amharic", ka: "Georgian", az: "Azerbaijani", kk: "Kazakh",
  hy: "Armenian", be: "Belarusian", ta: "Tamil", km: "Khmer", mn: "Mongolian",
};

async function translate(text: string, langName: string): Promise<string> {
  if (!text || !text.trim()) return text;
  const apiKey = Deno.env.get("LOVABLE_API_KEY")!;
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate Latvian text into ${langName}. Preserve all Markdown formatting, links, images, headings and HTML exactly. Do not add commentary. Return only the translation.`,
        },
        { role: "user", content: text },
      ],
    }),
  });
  if (!res.ok) throw new Error(`AI ${res.status}: ${await res.text()}`);
  const j = await res.json();
  return j.choices?.[0]?.message?.content?.trim() ?? text;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { slug, lang } = await req.json();
    if (!slug || !lang) throw new Error("slug and lang required");
    const langName = LANG_NAMES[lang];
    if (!langName) throw new Error(`Unsupported lang: ${lang}`);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: row, error } = await supabase
      .from("content_pages")
      .select("id,title,description,markdown,title_i18n,description_i18n_jsonb,markdown_i18n")
      .eq("slug", slug)
      .eq("lang", "lv")
      .eq("published", true)
      .maybeSingle();
    if (error || !row) throw new Error("page not found");

    const t_i18n = (row.title_i18n ?? {}) as Record<string, string>;
    const d_i18n = (row.description_i18n_jsonb ?? {}) as Record<string, string>;
    const m_i18n = (row.markdown_i18n ?? {}) as Record<string, string>;

    if (m_i18n[lang]?.trim()) {
      return new Response(JSON.stringify({
        title: t_i18n[lang] ?? row.title,
        description: d_i18n[lang] ?? row.description,
        markdown: m_i18n[lang],
        cached: true,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const [tT, tD, tM] = await Promise.all([
      translate(row.title ?? "", langName),
      translate(row.description ?? "", langName),
      translate(row.markdown ?? "", langName),
    ]);

    t_i18n[lang] = tT;
    d_i18n[lang] = tD;
    m_i18n[lang] = tM;

    await supabase
      .from("content_pages")
      .update({ title_i18n: t_i18n, description_i18n_jsonb: d_i18n, markdown_i18n: m_i18n })
      .eq("id", row.id);

    return new Response(JSON.stringify({ title: tT, description: tD, markdown: tM, cached: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error).message) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
