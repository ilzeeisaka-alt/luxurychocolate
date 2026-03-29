import { useEffect } from "react";
import { hreflangMap } from "@/i18n/ui-strings";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string;
}

const BASE_URL = "https://luxurychocolate.lv";

const seoKeywords: Record<string, string> = {
  "/": "šokolādes apdruka, personalizēta reklāmas šokolāde, Beļģu šokolāde, šokolādes dāvanas, korporatīvās dāvanas, prezentreklāmas dāvanas, korporatīvās šokolādes dāvanas, prezentreklāmas šokolādes dāvanas, uzdruka uz šokolādes",
  "/en": "chocolate printing, personalized promotional chocolate, Belgian chocolate, chocolate gifts, corporate gifts, promotional gifts, corporate chocolate gifts, promotional chocolate gifts, printing on chocolate",
  "/ru": "печать на шоколаде, персонализированный рекламный шоколад, бельгийский шоколад, шоколадные подарки, корпоративные подарки, промо подарки, корпоративные шоколадные подарки, промо шоколадные подарки, нанесение на шоколад",
  "/et": "šokolaadi trükk, personaliseeritud reklaamšokolaad, Belgia šokolaad, šokolaadi kingitused, korporatiivsed kingitused, reklaamkingitused, korporatiivsed šokolaadi kingitused, reklaam šokolaadi kingitused, trükk šokolaadile",
  "/lt": "šokolado spauda, personalizuotas reklaminis šokoladas, belgiškas šokoladas, šokolado dovanos, korporatyvinės dovanos, reklaminės dovanos, korporatyvinės šokolado dovanos, reklaminės šokolado dovanos, spauda ant šokolado",
  "/sv": "chokladtryck, personlig reklamchoklad, belgisk choklad, chokladpresenter, företagspresenter, reklamgåvor, choklad med logotyp, presentförpackningar",
  "/no": "sjokoladetrykk, personlig reklamesjokolade, belgisk sjokolade, sjokoladegaver, bedriftsgaver, reklamegaver, sjokolade med logo, gavesett",
  "/fi": "suklaapaino, personoitu mainossuklaa, belgialainen suklaa, suklaalahja, yrityslahjat, mainoslahjat, suklaa logolla, lahjapakkaukset",
};

function setMeta(name: string, content: string, attribute = "name") {
  let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (extra) Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo({ title, description, path, ogImage, keywords }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} — Luxury Chocolate`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    setMeta("description", description);
    setLink("canonical", url);

    // Keywords
    const kw = keywords || seoKeywords[path] || "";
    if (kw) setMeta("keywords", kw);

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "website", "property");
    if (ogImage) setMeta("og:image", ogImage, "property");

    // Twitter
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    if (ogImage) setMeta("twitter:image", ogImage);

    // Hreflang alternate links
    const alternatives = hreflangMap[path];
    if (alternatives) {
      Object.entries(alternatives).forEach(([lang, altPath]) => {
        setLink("alternate", `${BASE_URL}${altPath}`, { hreflang: lang });
      });
      const defaultPath = alternatives["lv"] || path;
      setLink("alternate", `${BASE_URL}${defaultPath}`, { hreflang: "x-default" });
    }

    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
  }, [title, description, path, ogImage, keywords]);
}
