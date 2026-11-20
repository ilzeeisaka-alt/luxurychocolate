import { expect, it } from "vitest";

it("copies the coffee chocolate without changing the source price or category", async () => {
  const env = import.meta.env;
  const response = await fetch(
    `${env.VITE_SUPABASE_URL}/rest/v1/products?id=in.(1d649367-7c65-479f-bf0d-d676e440b930,7d24c94b-d9c5-4461-a1b5-f68a8c07b4cd)&select=id,price_cents,category_id,weight_grams,published,metadata`,
    { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
  );
  expect(response.ok).toBe(true);
  const rows = await response.json();
  const source = rows.find((row: { id: string }) => row.id === "1d649367-7c65-479f-bf0d-d676e440b930");
  const copy = rows.find((row: { id: string }) => row.id === "7d24c94b-d9c5-4461-a1b5-f68a8c07b4cd");
  expect(source).toBeDefined();
  expect(copy).toMatchObject({ price_cents: source.price_cents, category_id: source.category_id, weight_grams: 7, published: true });
  expect(copy.metadata).toMatchObject({ chocolate_type: "white", logo_brand: "Power & Beauty Studio" });
});