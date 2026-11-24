import { buyerDraftKey } from "./repeatCustomer";

export function checkoutBuyerDetails(storage: Pick<Storage, "getItem">, userId: string) {
  const details = {
    agencyDiscountOn: false,
    agencyDiscountPct: 20,
    eventName: null as string | null,
    eventDate: null as string | null,
    deliveryAddress: null as string | null,
  };
  try {
    const raw = storage.getItem(buyerDraftKey(userId));
    if (!raw) return details;
    const draft = JSON.parse(raw);
    details.agencyDiscountOn = !!draft.agencyOn;
    details.agencyDiscountPct = typeof draft.agencyPct === "number" ? draft.agencyPct : 20;
    for (const key of ["eventName", "eventDate", "deliveryAddress"] as const) {
      details[key] = typeof draft[key] === "string" && draft[key].trim() ? draft[key].trim() : null;
    }
  } catch {
    // Missing or invalid drafts retain checkout defaults, never another account's draft.
  }
  return details;
}