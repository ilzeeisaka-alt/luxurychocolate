// One-off function: pulls scraped i18n JSON from storage and updates products
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

const STRIP_RE = /,\s*(Weight|Svars|Вес|Category|Kategorija|Категория|Min Price|Minimālā cena|Минимальная Цена|Max Price|Maksimālā cena|Максимальная Цена)\s*:.*$/i;

function clean(s: string | null | undefined) {
  if (!s) return null;
  return s.replace(STRIP_RE, "").trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const url = "https://qptmewoggfoycsoehenn.supabase.co/storage/v1/object/public/product-images/_seed/products_i18n.json";
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const r = await fetch(url);
  const items: Array<{ id: string; lv?: { name: string; short?: string }; ru?: { name: string; short?: string }; en?: { name: string; short?: string } }> = await r.json();

  let updated = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const it of items) {
    if (!it.lv && !it.ru && !it.en) { skipped++; continue; }
    const name_i18n: Record<string, string> = {};
    const short_i18n: Record<string, string> = {};
    for (const lang of ["lv", "ru", "en"] as const) {
      const v = it[lang];
      if (v?.name) name_i18n[lang] = v.name;
      const sh = clean(v?.short);
      if (sh) short_i18n[lang] = sh;
    }
    const canonical = name_i18n.lv ?? name_i18n.en ?? name_i18n.ru;
    if (!canonical) { skipped++; continue; }

    const { error } = await supabase
      .from("products")
      .update({ name: canonical, name_i18n, short_description_i18n: short_i18n })
      .eq("id", it.id);

    if (error) errors.push(`${it.id}: ${error.message}`);
    else updated++;
  }

  return new Response(
    JSON.stringify({ total: items.length, updated, skipped, errors: errors.slice(0, 10) }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
