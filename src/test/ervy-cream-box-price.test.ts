import { expect, it } from "vitest";

it("prices one five-cream-chocolate box at EUR 25 including VAT", async () => {
  const env = import.meta.env;
  const response = await fetch(
    `${env.VITE_SUPABASE_URL}/rest/v1/products?id=eq.07f67dc2-b2e4-4d55-94c7-90fdda9da365&select=price_cents,currency,prices_include_vat`,
    { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
  );
  expect(response.ok).toBe(true);
  expect(await response.json()).toEqual([{ price_cents: 2500, currency: "EUR", prices_include_vat: true }]);
});