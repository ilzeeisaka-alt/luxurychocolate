import { describe, expect, it } from "vitest";

describe("Gingerbread ribbon bag 3 cm catalog", () => {
  async function loadProduct() {
    const env = import.meta.env;
    const response = await fetch(
      `${env.VITE_SUPABASE_URL}/rest/v1/products?slug=eq.3-garsu-maisins-ar-lentiti-piparkukas-3-cm&select=price_cents,currency,prices_include_vat,has_image,product_categories(slug)`,
      { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
    );
    expect(response.ok).toBe(true);
    const products = await response.json();
    expect(products).toHaveLength(1);
    return products[0];
  }

  it("costs EUR 15 including VAT", async () => {
    const product = await loadProduct();
    expect(product.price_cents).toBe(1500);
    expect(product.currency).toBe("EUR");
    expect(product.prices_include_vat).toBe(true);
  });

  it("has no copied images", async () => {
    const product = await loadProduct();
    expect(product.has_image).toBe(false);
  });

  it("belongs to the Christmas gingerbread category", async () => {
    const product = await loadProduct();
    expect(product.product_categories.slug).toBe("ziemassvetku-piparkukas");
  });
});
