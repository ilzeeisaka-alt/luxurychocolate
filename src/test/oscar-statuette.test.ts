import { describe, expect, it } from "vitest";
import { loadEnv } from "vite";

describe("Oscar chocolate catalog pricing", () => {
  it("offers the statuette for EUR 25 per piece in its own category", async () => {
    const env = loadEnv("development", process.cwd(), "VITE_");
    const response = await fetch(
      `${env.VITE_SUPABASE_URL}/rest/v1/products?slug=eq.sokolades-oskara-statuete&select=price_cents,currency,published,product_categories(slug)`,
      { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
    );
    expect(response.ok).toBe(true);
    const products = await response.json();
    expect(products).toHaveLength(1);
    expect(products[0].price_cents).toBe(2500);
    expect(products[0].currency).toBe("EUR");
    expect(products[0].published).toBe(true);
    expect(products[0].product_categories.slug).toBe("sokolades-oskara-statuete");
  });
});