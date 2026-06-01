// Affiliate referral tracking — stored in localStorage for 90 days
import { supabase } from "@/integrations/supabase/client";

const KEY = "lc_aff_ref";
const TTL_DAYS = 90;

export interface StoredRef {
  code: string;
  affiliateId: string;
  discountRate: number;
  source: "link" | "code";
  expiresAt: number;
}

export function getStoredRef(): StoredRef | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const ref = JSON.parse(raw) as StoredRef;
    if (!ref?.expiresAt || ref.expiresAt < Date.now()) {
      localStorage.removeItem(KEY);
      return null;
    }
    return ref;
  } catch {
    return null;
  }
}

export function clearStoredRef() {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}

export async function validateAndStoreRef(
  code: string,
  source: "link" | "code" = "link",
): Promise<StoredRef | null> {
  const trimmed = (code || "").trim();
  if (!trimmed) return null;
  const { data, error } = await supabase.rpc("validate_affiliate_code", { _code: trimmed });
  if (error || !data || !data.length) return null;
  const row = data[0] as { id: string; code: string; discount_rate: number; valid: boolean };
  if (!row.valid) return null;
  const ref: StoredRef = {
    code: row.code,
    affiliateId: row.id,
    discountRate: Number(row.discount_rate) || 0,
    source,
    expiresAt: Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000,
  };
  try { localStorage.setItem(KEY, JSON.stringify(ref)); } catch { /* noop */ }
  return ref;
}
