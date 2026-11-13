import { expect, it } from "vitest";

it("prices the 8.7x19.7 cm personalized chocolate at EUR 10.00 plus VAT (12.10 incl. 21% VAT)", async () => {
  const env = import.meta.env;
  const response = await fetch(
    `${env.VITE_SUPABASE_URL}/rest/v1/products?id=eq.6a76461a-0c4a-41f0-8d2a-a091e381fae2&select=price_cents,currency,vat_rate,prices_include_vat`,
    { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } },
  );
  expect(response.ok).toBe(true);
  const [row] = await response.json();
  expect(row).toMatchObject({ currency: "EUR", vat_rate: 21, prices_include_vat: true });
  // price_cents stores the VAT-inclusive price; excluding 21% VAT it must be exactly EUR 10.00
  expect(row.price_cents / (1 + Number(row.vat_rate) / 100)).toBe(1000);
});
