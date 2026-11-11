import { describe, expect, it } from "vitest";

const slug = "piena-sokolades-trifeles-ar-piparkuku-garsas-krema-pildijumu";
async function catalogRead(path: string) {
  const env = import.meta.env;
  const response = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY },
  });
  expect(response.ok).toBe(true);
  return response.json();
}

describe("Truffles catalog", () => {
  it("prices the branded 12-truffle box at EUR 25 including VAT", async () => {
    const products = await catalogRead("products?slug=eq.12-trifelu-kastite-ar-uznemuma-logo-ziemassvetkiem&select=price_cents,currency,prices_include_vat,published,metadata,product_categories(slug)");
    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({ price_cents: 2500, currency: "EUR", prices_include_vat: true, published: true, metadata: { pieces_per_box: 12 }, product_categories: { slug: "trifeles" } });
  });

  it.each([
    "piena-sokolades-trifele-belgu-cepums",
    "tumsas-sokolades-trifele-melna-balzama-ganasa",
    "tumsas-sokolades-trifeles-ar-cepumu-pildijumu",
    "tumsas-sokolades-trifeles-mocha",
    "piena-sokolades-trifeles-ar-kokosriekstu-pildijumu",
  ])("prices new %s at EUR 3 per piece", async (productSlug) => {
    const products = await catalogRead(`products?slug=eq.${productSlug}&select=price_cents,currency,published,has_image,product_categories(slug)`);
    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({ price_cents: 300, currency: "EUR", published: true, has_image: true, product_categories: { slug: "trifeles" } });
  });

  it.each([
    "tumsas-sokolades-trifeles-ar-upenu-kremu-un-liofilizetam-upenem",
    "piena-sokolades-trifeles-ar-karameles-kremu-un-kraukskiem",
    "piena-sokolades-trifeles-ar-lazdu-riekstu-kremu-un-riekstu-dekoru",
    "piena-sokolades-trifeles-ar-piparkuku-kanela-kremu-un-cepumu-dekoru",
    "tumsas-sokolades-trifeles-ar-dzervenu-kremu-un-dzervenu-dekoru",
    "tumsas-sokolades-trifeles-ar-vanilas-piena-kremu-un-baltas-sokolades-dekoru",
  ])("prices decorated %s at EUR 3 per piece", async (productSlug) => {
    const products = await catalogRead(`products?slug=eq.${productSlug}&select=price_cents,currency,prices_include_vat,published,product_categories(slug)`);
    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({
      price_cents: 300, currency: "EUR", prices_include_vat: true, published: true,
      product_categories: { slug: "trifeles" },
    });
  });

  it.each([
    "tumsas-sokolades-trifeles-ar-dzervenu-pildijumu",
    "piena-sokolades-trifeles-ar-karameles-un-kanela-piparkuku-garsvielu-pildijumu",
    "piena-sokolades-trifeles-ar-lazdu-riekstu-krema-pildijumu",
    "baltas-sokolades-trifeles-ar-vanilas-marcipana-vai-ziemas-ogu-krema-pildijumu",
  ])("prices %s at EUR 3 per piece in Trifeles", async (productSlug) => {
    const products = await catalogRead(`products?slug=eq.${productSlug}&select=price_cents,currency,prices_include_vat,published,product_categories(slug)`);
    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({
      price_cents: 300, currency: "EUR", prices_include_vat: true, published: true,
      product_categories: { slug: "trifeles" },
    });
  });

  it("places truffles second among top-level categories", async () => {
    const categories = await catalogRead("product_categories?parent_id=is.null&select=slug&order=sort_order.asc,name.asc&limit=3");
    expect(categories[1]?.slug).toBe("trifeles");
  });

  it("prices gingerbread cream truffles at EUR 3 per piece", async () => {
    const products = await catalogRead(`products?slug=eq.${slug}&select=price_cents,currency,prices_include_vat,published,product_categories(slug)`);
    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({
      price_cents: 300, currency: "EUR", prices_include_vat: true, published: true,
      product_categories: { slug: "trifeles" },
    });
  });
});