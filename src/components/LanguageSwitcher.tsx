import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { hreflangMap } from "@/i18n/ui-strings";

const langLabels: Record<string, string> = {
  lv: "LV", en: "EN", ru: "RU", et: "ET", lt: "LT",
  sv: "SV", no: "NO", fi: "FI", da: "DA", de: "DE",
  fr: "FR", it: "IT", es: "ES", ar: "AR",
  nl: "NL", pl: "PL", cs: "CS", pt: "PT", el: "EL", tr: "TR",
  hu: "HU", ro: "RO", bg: "BG", hr: "HR", sk: "SK", sl: "SL",
  uk: "UK", sr: "SR", bs: "BS", mk: "MK", sq: "SQ", is: "IS",
};

const langPrefixes = ["nl","pl","cs","pt","el","tr","hu","ro","bg","hr","sk","sl","uk","sr","bs","mk","sq","is","de","fr","it","es","ar","sv","no","fi","da","et","lt","ru","en"];

const LanguageSwitcher = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const alternatives = hreflangMap[pathname];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!alternatives) return null;

  let currentLang = "lv";
  for (const p of langPrefixes) {
    if (pathname.startsWith(`/${p}`)) { currentLang = p; break; }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-white/80 hover:text-white transition-colors"
        aria-label="Select language"
      >
        {langLabels[currentLang]}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-foreground border border-white/10 rounded-lg shadow-xl py-1 grid grid-cols-4 gap-0 min-w-[200px] max-h-[320px] overflow-y-auto z-50">
          {Object.entries(alternatives).map(([lang, path]) => (
            <Link
              key={lang}
              to={path}
              onClick={() => setOpen(false)}
              className={`px-3 py-1.5 text-xs text-center transition-colors ${
                lang === currentLang
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {langLabels[lang]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
