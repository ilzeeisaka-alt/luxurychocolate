export function ownsOrder(userId: string | undefined, orderUserId: string | null | undefined) {
  return Boolean(userId && orderUserId && userId === orderUserId);
}

export function customerDocumentPath(orderId: string, type: "proforma" | "invoice" | "visualization") {
  return `/account/orders/${encodeURIComponent(orderId)}?type=${type}`;
}