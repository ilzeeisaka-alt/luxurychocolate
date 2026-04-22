import type { Lang } from "./types";

// Languages added later that fall back to English content if a partial map only
// covers the original 32 languages. Use `expandLangs(partialMap)` to satisfy
// `Record<Lang, T>` in components without manually duplicating the EN entry.
const FALLBACK_LANGS: Lang[] = [
  "zh", "ja", "ko", "hi", "bn", "ur", "fa", "he", "th", "vi",
  "id", "ms", "tl", "sw", "am", "ka", "az", "kk", "hy", "be",
  "ta", "km", "mn",
];

export function expandLangs<T>(map: Partial<Record<Lang, T>> & { en: T }): Record<Lang, T> {
  const result = { ...map } as Record<Lang, T>;
  for (const l of FALLBACK_LANGS) {
    if (!(l in result)) result[l] = map.en;
  }
  return result;
}
