import { describe, expect, it } from "vitest";

describe("Chocolate in 3D gun shape product", () => {
  it("costs EUR 15 per piece and lives in the special-shapes category", async () => {
    const env = import.meta.env;
    const slugs = "sokolade-3d-ieroca-forma,sokolades-oskara-statuete";
    const response = await fetch(
      `${env.VITE_SUPABASE_URL}/rest/v1/products?slug=in.(${slugs})&select=slug,price_cents,currency,published,category_id`,
      { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
    );
    expect(response.ok).toBe(true);
    const products = await response.json();
    expect(products).toHaveLength(2);

    const gun = products.find(
      (p: { slug: string }) => p.slug === "sokolade-3d-ieroca-forma",
    );
    expect(gun).toMatchObject({ price_cents: 1500, currency: "EUR", published: true });

    const oscar = products.find(
      (p: { slug: string }) => p.slug === "sokolades-oskara-statuete",
    );
    expect(oscar).toMatchObject({ price_cents: 1500, currency: "EUR" });
    expect(gun.category_id).not.toEqual(oscar.category_id);

    // The gun chocolate belongs to "Īpašu formu šokolādes".
    const category = await fetch(
      `${env.VITE_SUPABASE_URL}/rest/v1/product_categories?slug=eq.ipasu-formu-sokolades&select=slug,name`,
      { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
    );
    expect(category.ok).toBe(true);
    const rows = await category.json();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ slug: "ipasu-formu-sokolades" });

    // Its own separate category was removed.
    const removed = await fetch(
      `${env.VITE_SUPABASE_URL}/rest/v1/product_categories?slug=eq.sokolade-3d-ieroca-forma&select=slug`,
      { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
    );
    expect(removed.ok).toBe(true);
    expect(await removed.json()).toEqual([]);
  });
});
