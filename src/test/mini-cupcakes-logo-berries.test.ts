import { describe, expect, it } from "vitest";

describe("Mini cupcakes with chocolate logo decoration and berries", () => {
  it("costs EUR 5 per piece without changing the original EUR 2.50 product", async () => {
    const env = import.meta.env;
    const slugs = "3-4-cm-mini-kapkeiki-ar-sokolades-logo-dekoru-un-ogam,3-4-cm-kapkeiki-keksini-ar-baltu-kremu-mini-kapkeiki";
    const response = await fetch(
      `${env.VITE_SUPABASE_URL}/rest/v1/products?slug=in.(${slugs})&select=slug,price_cents,currency`,
      { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
    );
    expect(response.ok).toBe(true);
    const products = await response.json();
    expect(products).toHaveLength(2);
    expect(products.find((p: { slug: string }) => p.slug === slugs.split(",")[0])).toMatchObject({ price_cents: 500, currency: "EUR" });
    expect(products.find((p: { slug: string }) => p.slug === slugs.split(",")[1])).toMatchObject({ price_cents: 250, currency: "EUR" });
  });
});