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

export function orderHeaderLogo(savedLogo: string | undefined, items: OrderDesignItem[], resolvedLogos: Record<string, string>) {
  if (savedLogo) return savedLogo;
  for (const item of items) {
    for (const logo of orderDesignLogos(item)) {
      if (resolvedLogos[logo.url]) return resolvedLogos[logo.url];
    }
  }
  return undefined;
}

export function primaryProductPhoto(images: { url: string; is_primary: boolean; sort_order: number }[]) {
  return [...images].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order)[0]?.url ?? null;
}

export function orderVisualizationFilename(prefix: string, number: string, company: string | null | undefined, items: { product_name: string }[]) {
  const safePart = (value: string) => value.normalize("NFC")
    .replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, "-")
    .replace(/\s+/g, " ").trim().replace(/[. ]+$/g, "");
  const products = [...new Set(items.map(item => safePart(item.product_name)).filter(Boolean))].join(" + ") || "Produkts";
  // Bound descriptive sections independently so neither company nor order number is lost.
  return [safePart(prefix), Array.from(products).slice(0, 120).join(""), Array.from(safePart(company || "") || "Klients").slice(0, 60).join(""), safePart(number)].filter(Boolean).join("_");
}

/** Explicit company website saved in order notes ("Mājaslapa: ..." / "Website: ..."). */
export function orderWebsite(notes?: string | null) {
  const match = notes?.match(/^(?:Mājaslapa|Website)\s*:\s*(\S+)\s*$/im)?.[1];
  return match ? match.replace(/^https?:\/\//i, "").replace(/\/+$/, "") : undefined;
}

export function contactWebsite(email: string) {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain || !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/.test(domain)) return undefined;
  const mailboxDomains = ["gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com", "yahoo.com", "icloud.com", "inbox.lv", "mail.ru", "yandex.ru", "proton.me", "protonmail.com"];
  return mailboxDomains.includes(domain) ? undefined : `www.${domain}`;
}

export function contactRegistrationNumber(registration?: string | null, vat?: string | null) {
  if (registration?.trim()) return registration.trim();
  const match = vat?.trim().toUpperCase().match(/^LV(\d{11})$/);
  return match?.[1];
}

export function contactAddress(address?: string | null, city?: string | null, postalCode?: string | null, country?: string | null) {
  let parts = (address ?? "").split(",").map(part => part.trim()).filter(Boolean);
  const embeddedPostal = parts.join(", ").match(/\bLV\s*-\s*\d{4}\b/i)?.[0];
  const postal = (postalCode || embeddedPostal || "").trim().replace(/^LV\s*-\s*/i, "LV-");
  const embeddedCountry = parts.find(part => /^(Latvija|Latvia|LV)$/i.test(part));
  const countryValue = country?.trim() || embeddedCountry || (/^LV-/i.test(postal) ? "Latvija" : "");
  const countryName = /^(LV|Latvia|Latvija)$/i.test(countryValue) ? "Latvija" : countryValue;
  parts = parts.map(part => embeddedPostal ? part.replace(embeddedPostal, "").trim() : part)
    .filter(part => part && part !== embeddedCountry && part !== countryValue);
  const cityName = city?.trim() || (parts.length > 1 ? parts.pop() : undefined);
  if (cityName && !parts.some(part => part.toLowerCase() === cityName.toLowerCase())) parts.push(cityName);
  return { address: parts.join(", "), locality: [postal, countryName].filter(Boolean).join(", ") };
}
/** Production-preparation fee items never get an Order Sheet page. */
export function needsOrderSheet(item: { product_name?: string | null; product_slug?: string | null }) {
  const fold = (v?: string | null) => (v ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return !fold(item.product_slug).startsWith("sagatavosana-sokolades-") && !fold(item.product_name).startsWith("sagatavosana sokolades");
}
