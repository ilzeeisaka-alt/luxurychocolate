import { expect, it } from "vitest";

it("places the five-praline box directly after the ervy bar in advertising chocolate", async () => {
  const env = import.meta.env;
  const response = await fetch(
    `${env.VITE_SUPABASE_URL}/rest/v1/products?category_id=eq.74aed29f-e0fd-4267-911a-00d7a85768aa&published=eq.true&select=slug,sort_order&order=sort_order.asc`,
    { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
  );
  expect(response.ok).toBe(true);
  const products: { slug: string; sort_order: number }[] = await response.json();
  const barIndex = products.findIndex(p => p.slug === "8-7x19-7-cm-sokolade-ar-apdruku-personalizeta-reklamas-sokolade");
  expect(barIndex).toBeGreaterThanOrEqual(0);
  expect(products[barIndex + 1]).toEqual({ slug: "5-konfektes-ar-lazdu-riekstu-krema-pildijumu-kastite-65-g-13-", sort_order: 3 });
});