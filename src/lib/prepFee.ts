import { supabase } from "@/integrations/supabase/client";

// Product ID for "Sagatavošana šokolādes ražošanai" (302.50 EUR)
const PREP_FEE_PRODUCT_ID = "006bc6f2-bbb0-4b9e-992f-40b195b641ed";

// Categories considered "ar apdruku" (printed/personalized chocolate)
const PRINTED_CATEGORY_SLUGS = new Set([
  "apdrukatas-kuku-sokolades",
  "personalizeta-reklamas-sokolade",
  "sokolades-papira-apdruka",
  "korporativu-davanu-sokolade",
]);

/**
 * If the just-added product is a printed chocolate AND its name does NOT contain
 * "regulāri", automatically add one unit of the prep-fee product to the cart
 * (only if it's not already there).
 */
export async function ensurePrepFeeForPrintedProduct(
  userId: string,
  productId: string,
): Promise<void> {
  if (!userId || !productId || productId === PREP_FEE_PRODUCT_ID) return;

  const { data: product, error } = await supabase
    .from("products")
    .select("name, product_categories(slug)")
    .eq("id", productId)
    .maybeSingle();
  if (error || !product) return;

  const categorySlug = (product.product_categories as { slug?: string } | null)?.slug ?? "";
  if (!PRINTED_CATEGORY_SLUGS.has(categorySlug)) return;

  const name = (product.name ?? "").toLowerCase();
  if (name.includes("regulāri") || name.includes("regulari")) return;

  // Only add once per cart — check if user already has it
  const { data: existing } = await supabase
    .from("cart_items")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", PREP_FEE_PRODUCT_ID)
    .maybeSingle();
  if (existing) return;

  await supabase.from("cart_items").insert({
    user_id: userId,
    product_id: PREP_FEE_PRODUCT_ID,
    quantity: 1,
  });
}
