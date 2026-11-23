import { describe, expect, it } from "vitest";
import { buyerDraftKey, repeatCustomerDefaults } from "../lib/repeatCustomer";

const order = { user_id: "taltap-owner", company_name: "TalTap SIA", customer_name: " Guntis Bērtiņš Sales Manager", customer_email: "guntis@taltap.com", customer_phone: "+371 29564397 ", vat_number: "LV40203581532", shipping_address: "Blaumaņa iela 5A – 2, Rīga, LV-1011", notes: "Pasākuma datums / laiks: 2026-11-27T10:00" };

describe("Repeat customer memory", () => {
  it("restores company, contact, email, phone, VAT and address from the customer's saved order", () => {
    expect(repeatCustomerDefaults("taltap-owner", undefined, order, null)).toEqual({ company: "TalTap SIA", contact: "Guntis Bērtiņš Sales Manager", email: "guntis@taltap.com", phone: "+371 29564397", vat: "LV40203581532", regNr: "40203581532", address: order.shipping_address, deliveryAddress: order.shipping_address });
  });
  it("never restores another account's customer data", () => {
    expect(repeatCustomerDefaults("another-owner", "owner@example.com", order, null).company).toBe("");
    expect(repeatCustomerDefaults("another-owner", "owner@example.com", order, null).email).toBe("owner@example.com");
    expect(buyerDraftKey("taltap-owner")).not.toBe(buyerDraftKey("another-owner"));
  });
  it("keeps saved legal address and registration separate from delivery", () => {
    const defaults = repeatCustomerDefaults("taltap-owner", undefined, { ...order, notes: "Juridiskā adrese: Legal street 1\nReģistrācijas numurs: 12345678901" }, null);
    expect(defaults.address).toBe("Legal street 1");
    expect(defaults.regNr).toBe("12345678901");
    expect(defaults.deliveryAddress).toBe(order.shipping_address);
  });
  it("does not carry an old event into a new purchase", () => {
    expect(repeatCustomerDefaults("taltap-owner", undefined, order, null)).not.toHaveProperty("eventDate");
  });
});