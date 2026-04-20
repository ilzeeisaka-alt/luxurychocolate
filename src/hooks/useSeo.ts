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

// Primary keyword across all languages: "šokolādes apdruka" (chocolate printing)
const seoKeywords: Record<string, string> = {
  "/": "šokolādes apdruka, apdruka uz šokolādes, šokolāde ar apdruku, šokolādes tiešā apdruka, personalizēta šokolāde, šokolāde ar logo, korporatīvās dāvanas, Beļģu šokolāde",
  "/en": "chocolate printing, printing on chocolate, printed chocolate, direct chocolate printing, personalized chocolate, chocolate with logo, corporate gifts, Belgian chocolate",
  "/ru": "печать на шоколаде, шоколад с печатью, нанесение печати на шоколад, персонализированный шоколад, шоколад с логотипом, корпоративные подарки, бельгийский шоколад",
  "/et": "šokolaadi trükk, trükk šokolaadile, trükitud šokolaad, personaliseeritud šokolaad, šokolaad logoga, korporatiivsed kingitused, Belgia šokolaad",
  "/lt": "šokolado spauda, spauda ant šokolado, spausdintas šokoladas, personalizuotas šokoladas, šokoladas su logotipu, korporatyvinės dovanos, belgiškas šokoladas",
  "/sv": "chokladtryck, tryck på choklad, tryckt choklad, personlig choklad, choklad med logotyp, företagspresenter, belgisk choklad",
  "/no": "sjokoladetrykk, trykk på sjokolade, trykt sjokolade, personlig sjokolade, sjokolade med logo, bedriftsgaver, belgisk sjokolade",
  "/fi": "suklaapaino, painatus suklaalle, painettu suklaa, personoitu suklaa, suklaa logolla, yrityslahjat, belgialainen suklaa",
  "/da": "chokoladetryk, tryk på chokolade, trykt chokolade, personlig chokolade, chokolade med logo, firmagaver, belgisk chokolade",
  "/de": "Schokoladendruck, Druck auf Schokolade, bedruckte Schokolade, personalisierte Schokolade, Schokolade mit Logo, Firmengeschenke, belgische Schokolade",
  "/fr": "impression sur chocolat, chocolat imprimé, chocolat personnalisé, chocolat avec logo, cadeaux d'entreprise, chocolat belge",
  "/it": "stampa su cioccolato, cioccolato stampato, cioccolato personalizzato, cioccolato con logo, regali aziendali, cioccolato belga",
  "/es": "impresión en chocolate, chocolate impreso, chocolate personalizado, chocolate con logo, regalos corporativos, chocolate belga",
  "/ar": "طباعة على الشوكولاتة, شوكولاتة مطبوعة, شوكولاتة مخصصة, شوكولاتة بشعار, هدايا الشركات, شوكولاتة بلجيكية",
  "/nl": "chocoladedruk, bedrukken op chocolade, bedrukte chocolade, gepersonaliseerde chocolade, chocolade met logo, zakelijke geschenken, Belgische chocolade",
  "/pl": "nadruk na czekoladzie, czekolada z nadrukiem, personalizowana czekolada, czekolada z logo, prezenty firmowe, belgijska czekolada",
  "/cs": "potisk čokolády, tisk na čokoládu, potištěná čokoláda, personalizovaná čokoláda, čokoláda s logem, firemní dárky, belgická čokoláda",
  "/pt": "impressão em chocolate, chocolate impresso, chocolate personalizado, chocolate com logo, presentes corporativos, chocolate belga",
  "/el": "εκτύπωση σε σοκολάτα, τυπωμένη σοκολάτα, εξατομικευμένη σοκολάτα, σοκολάτα με λογότυπο, εταιρικά δώρα, βελγική σοκολάτα",
  "/tr": "çikolata baskı, çikolata üzerine baskı, baskılı çikolata, kişiselleştirilmiş çikolata, logolu çikolata, kurumsal hediyeler, Belçika çikolatası",
  "/hu": "csokoládé nyomtatás, nyomtatás csokoládéra, nyomtatott csokoládé, személyre szabott csokoládé, csokoládé logóval, céges ajándékok, belga csokoládé",
  "/ro": "imprimare pe ciocolată, ciocolată imprimată, ciocolată personalizată, ciocolată cu logo, cadouri corporate, ciocolată belgiană",
  "/bg": "печат върху шоколад, отпечатан шоколад, персонализиран шоколад, шоколад с лого, корпоративни подаръци, белгийски шоколад",
  "/hr": "tisak na čokoladi, tiskana čokolada, personalizirana čokolada, čokolada s logom, korporativni pokloni, belgijska čokolada",
  "/sk": "potlač na čokoláde, tlač na čokoládu, potlačená čokoláda, personalizovaná čokoláda, čokoláda s logom, firemné darčeky, belgická čokoláda",
  "/sl": "tisk na čokoladi, tiskana čokolada, personalizirana čokolada, čokolada z logotipom, poslovna darila, belgijska čokolada",
  "/uk": "друк на шоколаді, шоколад з друком, персоналізований шоколад, шоколад з логотипом, корпоративні подарунки, бельгійський шоколад",
  "/sr": "štampa na čokoladi, štampana čokolada, personalizovana čokolada, čokolada sa logom, korporativni pokloni, belgijska čokolada",
  "/bs": "štampa na čokoladi, štampana čokolada, personalizirana čokolada, čokolada sa logom, korporativni pokloni, belgijska čokolada",
  "/mk": "печат на чоколадо, печатено чоколадо, персонализирано чоколадо, чоколадо со лого, корпоративни подароци, белгиско чоколадо",
  "/sq": "shtypje në çokollatë, çokollatë e shtypur, çokollatë e personalizuar, çokollatë me logo, dhurata korporative, çokollatë belge",
  "/is": "súkkulaðiprentun, prentun á súkkulaði, prentað súkkulaði, sérsniðið súkkulaði, súkkulaði með merki, fyrirtækjagjafir, belgískt súkkulaði",
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
