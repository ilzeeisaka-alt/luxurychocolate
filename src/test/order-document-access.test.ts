import { describe, expect, it } from "vitest";
import { ownsOrder, customerDocumentPath } from "../lib/orderDocumentAccess";
import { canSendOrderDocuments } from "../../supabase/functions/_shared/order-document-access";

describe("Customer order documents", () => {
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