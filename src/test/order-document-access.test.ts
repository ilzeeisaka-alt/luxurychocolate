import { describe, expect, it } from "vitest";
import { ownsOrder, customerDocumentPath, canReuseOrderContact } from "../lib/orderDocumentAccess";
import { canSendOrderDocuments } from "../../supabase/functions/_shared/order-document-access";

describe("Customer order documents", () => {
  const contact = { user_id: "customer-a", company_name: "TalTap SIA", customer_email: "guntis@taltap.com", customer_name: "Guntis Bērtiņš Sales Manager" };
  it("automatically reuses saved logo and portrait for the same customer", () => {
    expect(canReuseOrderContact(contact, { ...contact }, "logo")).toBe(true);
    expect(canReuseOrderContact(contact, { ...contact }, "photo")).toBe(true);
  });
  it("does not reuse media across owners or different companies", () => {
    expect(canReuseOrderContact(contact, { ...contact, user_id: "customer-b" }, "logo")).toBe(false);
    expect(canReuseOrderContact(contact, { ...contact, company_name: "Other SIA" }, "photo")).toBe(false);
  });
  it("does not reuse another contact person's portrait", () => {
    expect(canReuseOrderContact(contact, { ...contact, customer_name: "Another person" }, "photo")).toBe(false);
    expect(canReuseOrderContact(contact, { ...contact, customer_email: "other@taltap.com" }, "photo")).toBe(false);
  });
  it("allows a customer to view only their own purchase", () => {
    expect(ownsOrder("customer-a", "customer-a")).toBe(true);
    expect(ownsOrder("customer-a", "customer-b")).toBe(false);
    expect(ownsOrder(undefined, "customer-a")).toBe(false);
    expect(ownsOrder("customer-a", null)).toBe(false);
  });
  it("links the same purchase to its invoice and visualization", () => {
    expect(customerDocumentPath("order-1", "proforma")).toBe("/account/orders/order-1?type=proforma");
    expect(customerDocumentPath("order-1", "visualization")).toBe("/account/orders/order-1?type=visualization");
  });
  it("requires ownership for a customer-triggered document email", () => {
    expect(canSendOrderDocuments("customer-a", "customer-a", true)).toBe(true);
    expect(canSendOrderDocuments("customer-a", "customer-b", true)).toBe(false);
    expect(canSendOrderDocuments(undefined, "customer-a", true)).toBe(false);
    expect(canSendOrderDocuments(undefined, "customer-a", false)).toBe(true);
  });
});