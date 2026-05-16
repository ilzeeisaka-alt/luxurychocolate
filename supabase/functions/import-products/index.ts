// Import products from luxurychocolatesia.lv via Firecrawl
// POST { mode: "discover" } → returns all product URLs
// POST { mode: "import", urls: [...] } → scrapes & imports the given URLs (batch)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FIRECRAWL_API = "https://api.firecrawl.dev/v2";
const SOURCE_BASE = "https://www.luxurychocolatesia.lv";
const SHOP_PAGE = `${SOURCE_BASE}/interneta-veikals-produkti`;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function urlSlug(url: string): string {
  // last meaningful path segment
  const parts = url.replace(/\/$/, "").split("/");
  return parts[parts.length - 1] || parts[parts.length - 2] || "product";
}

async function firecrawl(path: string, body: unknown) {
  const apiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!apiKey) throw new Error("FIRECRAWL_API_KEY missing");
  const res = await fetch(`${FIRECRAWL_API}${path}`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Firecrawl ${path} failed: ${res.status} ${JSON.stringify(data).slice(0, 300)}`);
  return data;
}

async function discoverProductUrls(): Promise<string[]> {
  const res = await firecrawl("/scrape", {
    url: SHOP_PAGE,
    formats: ["links"],
    onlyMainContent: false,
  });
  const links: string[] = res.data?.links || res.links || [];
  const urls = links
    .filter((l) => l.includes("/interneta-veikals-produkti/item/"))
    .map((l) => l.replace(/\/$/, ""));
  return Array.from(new Set(urls));
}

async function uploadImage(supabase: ReturnType<typeof createClient>, imageUrl: string, productSlug: string, idx: number): Promise<string | null> {
  try {
    const r = await fetch(imageUrl);
    if (!r.ok) return null;
    const buf = new Uint8Array(await r.arrayBuffer());
    const ct = r.headers.get("content-type") || "image/jpeg";
    const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : "jpg";
    const path = `${productSlug}/${idx}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, buf, {
      contentType: ct, upsert: true,
    });
    if (error) { console.error("upload err", path, error.message); return null; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  } catch (e) {
    console.error("uploadImage", imageUrl, (e as Error).message);
    return null;
  }
}

async function importOne(supabase: ReturnType<typeof createClient>, url: string): Promise<{ url: string; ok: boolean; error?: string; slug?: string }> {
  try {
    const scrape = await firecrawl("/scrape", {
      url,
      formats: [{
        type: "json",
        prompt: "Extract product info as JSON: name (string), price (number in EUR INCLUDING VAT, no currency symbol), currency (default EUR), short_description (string, 1 sentence), full_description (string, full text in Latvian), image_urls (array of high-resolution image URLs from the product gallery), category_name (string), weight_in_grams (integer or 0), ingredients (string or empty), in_stock (true/false), preparation_days (integer, production/making time in business days, default 3 if not stated), delivery_days (integer, shipping/courier delivery time in business days, default 2 if not stated).",
      }],
      onlyMainContent: true,
    });
    const j = scrape.data?.json || scrape.json;
    if (!j || !j.name) return { url, ok: false, error: "no data extracted" };

    const baseSlug = slugify(j.name) || urlSlug(url);
    const urlPart = slugify(urlSlug(url));
    // hash for uniqueness
    let h = 0; for (let i = 0; i < url.length; i++) h = (h * 31 + url.charCodeAt(i)) | 0;
    const hashSuffix = Math.abs(h).toString(36).slice(0, 6);
    const slug = `${baseSlug}-${urlPart}-${hashSuffix}`.replace(/-+/g, "-").slice(0, 140);

    // Resolve category
    let categoryId: string | null = null;
    if (j.category_name) {
      const catSlug = slugify(j.category_name);
      const { data: existingCat } = await supabase.from("product_categories").select("id").eq("slug", catSlug).maybeSingle();
      if (existingCat) {
        categoryId = (existingCat as { id: string }).id;
      } else {
        const { data: newCat } = await supabase.from("product_categories")
          .insert({ slug: catSlug, name: j.category_name }).select("id").single();
        categoryId = (newCat as { id: string } | null)?.id || null;
      }
    }

    const priceCents = Math.round(Number(j.price || 0) * 100);

    const { data: product, error: pErr } = await supabase.from("products").upsert({
      slug,
      name: j.name,
      short_description: j.short_description || null,
      description: j.full_description || null,
      price_cents: priceCents,
      currency: (j.currency || "EUR").toUpperCase(),
      category_id: categoryId,
      weight_grams: j.weight_in_grams || null,
      ingredients: j.ingredients || null,
      in_stock: j.in_stock !== false,
      preparation_days: j.preparation_days ?? 3,
      delivery_days: j.delivery_days ?? 2,
      prices_include_vat: true,
      vat_rate: 21,
      source_url: url,
      published: true,
    }, { onConflict: "source_url" }).select("id").single();

    if (pErr || !product) return { url, ok: false, error: pErr?.message || "insert failed" };

    const productId = (product as { id: string }).id;

    // Images
    const imageUrls: string[] = Array.isArray(j.image_urls) ? j.image_urls.slice(0, 8) : [];
    if (imageUrls.length) {
      // Wipe old images for this product
      await supabase.from("product_images").delete().eq("product_id", productId);
      const rows: Array<{ product_id: string; url: string; sort_order: number; is_primary: boolean }> = [];
      for (let i = 0; i < imageUrls.length; i++) {
        const stored = await uploadImage(supabase, imageUrls[i], slug, i);
        if (stored) rows.push({ product_id: productId, url: stored, sort_order: i, is_primary: i === 0 });
      }
      if (rows.length) await supabase.from("product_images").insert(rows);
    }

    return { url, ok: true, slug };
  } catch (e) {
    return { url, ok: false, error: (e as Error).message };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const mode = body.mode || "discover";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (mode === "discover") {
      const urls = await discoverProductUrls();
      return new Response(JSON.stringify({ count: urls.length, urls }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (mode === "import") {
      const urls: string[] = body.urls || [];
      if (!urls.length) return new Response(JSON.stringify({ error: "no urls" }), { status: 400, headers: corsHeaders });
      const results = [];
      for (const u of urls) {
        results.push(await importOne(supabase, u));
      }
      return new Response(JSON.stringify({
        imported: results.filter((r) => r.ok).length,
        failed: results.filter((r) => !r.ok).length,
        results,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "invalid mode" }), { status: 400, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
