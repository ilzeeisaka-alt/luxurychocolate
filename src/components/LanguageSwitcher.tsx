import { Link, useLocation } from "react-router-dom";
import { hreflangMap } from "@/i18n/ui-strings";

const langLabels: Record<string, string> = {
  lv: "LV",
  en: "EN",
  ru: "RU",
  et: "ET",
  lt: "LT",
  sv: "SV",
  no: "NO",
  fi: "FI",
  da: "DA",
};

const LanguageSwitcher = () => {
  const { pathname } = useLocation();
  const alternatives = hreflangMap[pathname];

  if (!alternatives) return null;

  // Determine current language
  const currentLang = pathname.startsWith("/sv")
    ? "sv"
    : pathname.startsWith("/no")
    ? "no"
    : pathname.startsWith("/fi")
    ? "fi"
    : pathname.startsWith("/da")
    ? "da"
    : pathname.startsWith("/et")
    ? "et"
    : pathname.startsWith("/lt")
    ? "lt"
    : pathname.startsWith("/ru")
    ? "ru"
    : pathname.startsWith("/en")
    ? "en"
    : "lv";

  return (
    <div className="flex items-center gap-0.5 text-xs flex-wrap">
      {Object.entries(alternatives).map(([lang, path]) => (
        <Link
          key={lang}
          to={path}
          className={`px-1.5 py-1 rounded transition-colors ${
            lang === currentLang
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={`Switch to ${langLabels[lang]}`}
        >
          {langLabels[lang]}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
