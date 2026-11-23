export function ownsOrder(userId: string | undefined, orderUserId: string | null | undefined) {
  return Boolean(userId && orderUserId && userId === orderUserId);
}

interface OrderContactIdentity {
  user_id: string | null;
  company_name: string | null;
  customer_email: string;
  customer_name: string | null;
}

// Reuse only saved media for the same account and identified company/contact.
export function canReuseOrderContact(current: OrderContactIdentity, previous: OrderContactIdentity, kind: "logo" | "photo") {
  const normalize = (value: string | null) => (value ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
  if (!ownsOrder(current.user_id ?? undefined, previous.user_id)) return false;
  if (!normalize(current.company_name) || normalize(current.company_name) !== normalize(previous.company_name)) return false;
  if (!normalize(current.customer_email) || normalize(current.customer_email) !== normalize(previous.customer_email)) return false;
  return kind === "logo" || Boolean(normalize(current.customer_name) && normalize(current.customer_name) === normalize(previous.customer_name));
}

export function customerDocumentPath(orderId: string, type: "proforma" | "invoice" | "visualization") {
  return `/account/orders/${encodeURIComponent(orderId)}?type=${type}`;
}