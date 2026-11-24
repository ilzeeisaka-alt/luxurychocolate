import { describe, expect, it } from "vitest";
import { checkoutBuyerDetails } from "../lib/checkoutBuyerDraft";
import { buyerDraftKey } from "../lib/repeatCustomer";

const draft = { agencyOn: true, agencyPct: 20, eventName: " Christmas event ", eventDate: "2026-12-20T10:00", deliveryAddress: " Delivery street 1 " };
const storage = (values: Record<string, string>) => ({ getItem: (key: string) => values[key] ?? null });
const saved = storage({ [buyerDraftKey("buyer")]: JSON.stringify(draft), invoice_buyer_form: JSON.stringify({ agencyOn: false, agencyPct: 5, eventName: "Old event" }) });

describe("Card checkout buyer draft", () => {
  it("preserves the current buyer's agency discount instead of the legacy value", () => {
    expect(checkoutBuyerDetails(saved, "buyer")).toMatchObject({ agencyDiscountOn: true, agencyDiscountPct: 20 });
  });
  it("passes the current purchase's event name", () => {
    expect(checkoutBuyerDetails(saved, "buyer").eventName).toBe("Christmas event");
  });
  it("passes the current purchase's event date and time", () => {
    expect(checkoutBuyerDetails(saved, "buyer").eventDate).toBe("2026-12-20T10:00");
  });
  it("passes the saved delivery address", () => {
    expect(checkoutBuyerDetails(saved, "buyer").deliveryAddress).toBe("Delivery street 1");
  });
  it("never uses another account's or an unscoped legacy draft", () => {
    expect(checkoutBuyerDetails(saved, "other-buyer")).toEqual({ agencyDiscountOn: false, agencyDiscountPct: 20, eventName: null, eventDate: null, deliveryAddress: null });
  });
  it("uses safe defaults for malformed drafts", () => {
    expect(checkoutBuyerDetails(storage({ [buyerDraftKey("buyer")]: "null" }), "buyer")).toEqual(checkoutBuyerDetails(storage({}), "buyer"));
  });
});