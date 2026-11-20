import { expect, it } from "vitest";

it("places Power & Beauty coffee chocolate third in its category", async () => {
  const env = import.meta.env;
  const response = await fetch(
    `${env.VITE_SUPABASE_URL}/rest/v1/products?category_id=eq.74aed29f-e0fd-4267-911a-00d7a85768aa&published=eq.true&select=id&order=sort_order.asc,name.asc&limit=3`,
    { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
  );
  expect(response.ok).toBe(true);
  const products = await response.json();
  expect(products[2]?.id).toBe("7d24c94b-d9c5-4461-a1b5-f68a8c07b4cd");
});