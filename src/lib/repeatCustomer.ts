import { contactRegistrationNumber } from "./orderVisualization";

interface SavedOrder {
  user_id: string | null;
  company_name: string | null;
  customer_name: string | null;
  customer_email: string;
  customer_phone: string | null;
  vat_number: string | null;
  shipping_address: string | null;
  notes: string | null;
}

interface CustomerProfile {
  company_name?: string | null;
  vat_number?: string | null;
  registration_number?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  legal_address?: string | null;
  legal_city?: string | null;
  legal_postal_code?: string | null;
  legal_country?: string | null;
  phone?: string | null;
  email?: string | null;
}

export function buyerDraftKey(userId: string) {
  return `invoice_buyer_form:${userId}`;
}

// Only contact defaults carry forward; events, quantities and prices belong to each purchase.
export function repeatCustomerDefaults(userId: string, email: string | undefined, order: SavedOrder | null, profile: CustomerProfile | null) {
  const previous = order?.user_id === userId ? order : null;
  const note = (label: string) => previous?.notes?.split("\n").find(line => line.startsWith(`${label}: `))?.slice(label.length + 2).trim();
  const profileAddress = [profile?.legal_address, profile?.legal_city, profile?.legal_postal_code, profile?.legal_country].filter(Boolean).join(", ");
  const vat = previous?.vat_number || profile?.vat_number || "";
  return {
    company: previous?.company_name || profile?.company_name || "",
    contact: previous?.customer_name?.trim() || [profile?.first_name, profile?.last_name].filter(Boolean).join(" "),
    email: previous?.customer_email || profile?.email || email || "",
    phone: previous?.customer_phone?.trim() || profile?.phone || "",
    vat,
    regNr: contactRegistrationNumber(note("Reģistrācijas numurs") || profile?.registration_number, vat),
    address: note("Juridiskā adrese") || profileAddress || previous?.shipping_address || "",
    deliveryAddress: previous?.shipping_address || "",
  };
}