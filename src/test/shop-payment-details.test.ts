import { describe, expect, it } from "vitest";
import { canCompleteShopPayment, shopPaymentDetails } from "../../supabase/functions/_shared/shop-payment-details";

const saved = { subtotal_cents: 8000, shipping_cents: 3025, shipping_address: "Event venue 1", shipping_city: null, shipping_postal_code: null, shipping_country: null };
describe("Shop payment preserves buyer choices", () => {
  it("keeps the 20% discounted subtotal of an EUR 100 purchase", () => {
    expect(shopPaymentDetails(saved).subtotal_cents).toBe(8000);
  });
  it("keeps the chosen EUR 30.25 delivery charge", () => {
    expect(shopPaymentDetails(saved).shipping_cents).toBe(3025);
  });
  it("does not replace the chosen event delivery address with a card billing address", () => {
    expect(shopPaymentDetails(saved, null, { line1: "Billing street 2", city: "Billing city" })).toEqual(saved);
  });
  it("uses a shipping address explicitly supplied at card checkout", () => {
    expect(shopPaymentDetails(saved, { line1: "New venue 3", city: "Rīga", postal_code: "LV-1011", country: "LV" })).toMatchObject({ shipping_address: "New venue 3", shipping_city: "Rīga", shipping_postal_code: "LV-1011", shipping_country: "LV" });
  });
  it("falls back to the card address only when no delivery address exists", () => {
    expect(shopPaymentDetails({ ...saved, shipping_address: null }, null, { line1: "Billing street 2" }).shipping_address).toBe("Billing street 2");
  });
  it("never completes settled or cancelled orders again", () => {
    for (const status of ["paid", "in_production", "shipped", "delivered", "refunded", "cancelled"]) expect(canCompleteShopPayment(status)).toBe(false);
    expect(canCompleteShopPayment("pending")).toBe(true);
  });
});