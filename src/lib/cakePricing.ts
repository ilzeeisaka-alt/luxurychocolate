// Cake-chocolate pricing logic.
// Tiered by max dimension (width or height in cm).
// Stripe price IDs match the products created via batch_create_product.

export type CakeShape = "round" | "square" | "oval" | "rectangle";
export type ChocolateType = "milk" | "dark" | "white";

export interface CakeTier {
  id: "small" | "medium" | "large" | "xl";
  label: string;
  maxDim: number; // in cm, inclusive upper bound
  unitPriceCents: number;
  priceId: string;
}

export const CAKE_TIERS: CakeTier[] = [
  { id: "small", label: "S (3–5 cm)", maxDim: 5, unitPriceCents: 150, priceId: "cake_choc_small_price" },
  { id: "medium", label: "M (5–7 cm)", maxDim: 7, unitPriceCents: 250, priceId: "cake_choc_medium_price" },
  { id: "large", label: "L (7–9 cm)", maxDim: 9, unitPriceCents: 380, priceId: "cake_choc_large_price" },
  { id: "xl", label: "XL (9–12 cm)", maxDim: 12, unitPriceCents: 550, priceId: "cake_choc_xl_price" },
];

export function getTierForSize(widthCm: number, heightCm: number): CakeTier {
  const max = Math.max(widthCm, heightCm);
  return CAKE_TIERS.find((t) => max <= t.maxDim) ?? CAKE_TIERS[CAKE_TIERS.length - 1];
}

export function calcAreaCm2(shape: CakeShape, w: number, h: number): number {
  if (shape === "round") return Math.PI * (w / 2) ** 2;
  if (shape === "oval") return Math.PI * (w / 2) * (h / 2);
  return w * h; // square / rectangle
}

export function formatEUR(cents: number): string {
  return new Intl.NumberFormat("lv-LV", { style: "currency", currency: "EUR" }).format(cents / 100);
}
