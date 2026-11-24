interface SavedShopDetails {
  subtotal_cents: number;
  shipping_cents: number;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  shipping_country: string | null;
}

interface Address {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export function shopPaymentDetails(saved: SavedShopDetails, shippingAddress?: Address | null, billingAddress?: Address | null) {
  // A billing address is not a replacement for the buyer's chosen delivery destination.
  const address = shippingAddress?.line1 ? shippingAddress : !saved.shipping_address ? billingAddress : null;
  return {
    // Shipping is a Stripe line item; amount_subtotal is before the agency coupon.
    subtotal_cents: saved.subtotal_cents,
    shipping_cents: saved.shipping_cents,
    shipping_address: address?.line1 ? [address.line1, address.line2].filter(Boolean).join(", ") : saved.shipping_address,
    shipping_city: address ? address.city || null : saved.shipping_city,
    shipping_postal_code: address ? address.postal_code || null : saved.shipping_postal_code,
    shipping_country: address ? address.country || null : saved.shipping_country,
  };
}

export function canCompleteShopPayment(status: string) {
  return status === "pending";
}