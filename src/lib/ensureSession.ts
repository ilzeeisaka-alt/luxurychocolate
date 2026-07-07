import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

/**
 * Ensures there's an authenticated session. If none exists, signs the user in
 * anonymously so they can add to cart / checkout without registering upfront.
 * After payment we offer them to convert the anonymous account into a real one.
 */
export async function ensureSessionUser(): Promise<User> {
  const { data: existing } = await supabase.auth.getSession();
  if (existing.session?.user) return existing.session.user;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.user) {
    throw new Error(error?.message || "Nevar izveidot sesiju");
  }
  return data.user;
}
