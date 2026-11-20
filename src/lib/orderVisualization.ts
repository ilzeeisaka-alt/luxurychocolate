export interface OrderDesignItem {
  id: string;
  product_id?: string | null;
  product_slug?: string | null;
  product_name: string;
  quantity: number;
  logo_url: string | null;
  logo_filename?: string | null;
  logos: { url: string; filename: string; quantity?: number }[] | null;
  custom_text?: string | null;
  notes?: string | null;
  width_mm?: number | null;
  height_mm?: number | null;
}

export function orderDesignLogos(item: OrderDesignItem) {
  const logos = Array.isArray(item.logos) ? item.logos.filter(logo => typeof logo?.url === "string" && logo.url.length > 0) : [];
  return logos.length ? logos : item.logo_url ? [{ url: item.logo_url, filename: item.logo_filename ?? "", quantity: item.quantity }] : [];
}

export function primaryProductPhoto(images: { url: string; is_primary: boolean; sort_order: number }[]) {
  return [...images].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order)[0]?.url ?? null;
}