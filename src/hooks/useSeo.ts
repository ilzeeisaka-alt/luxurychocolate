import { useEffect } from "react";
import { hreflangMap } from "@/i18n/ui-strings";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const BASE_URL = "https://luxurychocolate.lv";

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

export function useSeo({ title, description, path, ogImage }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} — Luxury Chocolate`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    setMeta("description", description);
    setLink("canonical", url);

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
    const hreflangEls: HTMLLinkElement[] = [];
    if (alternatives) {
      Object.entries(alternatives).forEach(([lang, altPath]) => {
        setLink("alternate", `${BASE_URL}${altPath}`, { hreflang: lang });
      });
      // x-default → lv variant or current
      const defaultPath = alternatives["lv"] || path;
      setLink("alternate", `${BASE_URL}${defaultPath}`, { hreflang: "x-default" });
    }

    return () => {
      // Clean up hreflang links on unmount
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
  }, [title, description, path, ogImage]);
}
