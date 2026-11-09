import { describe, expect, it } from "vitest";

describe("5-7 cm cupcakes with chocolate logo decoration and berries", () => {
  it("costs EUR 10 per piece without changing the original EUR 5 product", async () => {
    const env = import.meta.env;
    const slugs =
      "5-7-cm-kapkeiki-ar-sokolades-logo-dekoru-un-ogam,5-7-cm-kapkeiki-keksini-ar-baltu-kremu-kapkeiki";
    const response = await fetch(
      `${env.VITE_SUPABASE_URL}/rest/v1/products?slug=in.(${slugs})&select=slug,price_cents,currency,published`,
      { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
    );
    expect(response.ok).toBe(true);
    const products = await response.json();
    expect(products).toHaveLength(2);
    expect(
      products.find((p: { slug: string }) => p.slug === slugs.split(",")[0]),
    ).toMatchObject({ price_cents: 1000, currency: "EUR", published: true });
    expect(
      products.find((p: { slug: string }) => p.slug === slugs.split(",")[1]),
    ).toMatchObject({ price_cents: 500, currency: "EUR" });
  });
});
