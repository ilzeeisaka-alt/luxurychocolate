import { useLocation } from "react-router-dom";

const langPrefixes = [
  "nl","pl","cs","pt","el","tr","hu","ro","bg","hr","sk","sl","uk","sr","bs","mk","sq","is",
  "de","fr","it","es","ar","sv","no","fi","da","et","lt","ru","en",
  "zh","ja","ko","hi","bn","ur","fa","he","th","vi","id","ms","tl","sw","am","ka","az","kk","hy","be",
  "ta","km","mn",
];

export function useCurrentLang(): string {
  const { pathname } = useLocation();
  for (const p of langPrefixes) {
    if (pathname === `/${p}` || pathname.startsWith(`/${p}/`)) return p;
  }
  return "lv";
}

/** Pick localized value from an i18n JSONB object with fallback chain: lang → lv → en → first → fallback. */
export function pickI18n(
  i18n: Record<string, unknown> | null | undefined,
  lang: string,
  fallback: string | null = ""
): string {
  if (i18n && typeof i18n === "object") {
    const v = (i18n as Record<string, unknown>)[lang];
    if (typeof v === "string" && v.trim()) return v;
    const lv = (i18n as Record<string, unknown>)["lv"];
    if (typeof lv === "string" && lv.trim()) return lv;
    const en = (i18n as Record<string, unknown>)["en"];
    if (typeof en === "string" && en.trim()) return en;
    for (const k of Object.keys(i18n)) {
      const x = (i18n as Record<string, unknown>)[k];
      if (typeof x === "string" && x.trim()) return x;
    }
  }
  return fallback ?? "";
}
