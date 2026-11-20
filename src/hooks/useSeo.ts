import { useEffect } from "react";
import { hreflangMap } from "@/i18n/ui-strings";
import { canonicalPath } from "@/lib/seoPaths";
import { useCurrentLang } from "@/i18n/useCurrentLang";

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

// Core offer themes every language homepage must advertise to search engines.
const themeKeywords: Record<string, string[]> = {
  "/": ["šokolādes apdruka", "personalizēti laimes cepumi", "logo kapkeiki", "korporatīvā šokolāde", "Ziemassvētku un Jaunā gada dāvanu šokolādes", "logo šokolādes izstādēm", "logo šokolādes konditorejām", "logo šokolādes restorāniem"],
  "/en": ["chocolate printing", "personalized fortune cookies", "logo cupcakes", "corporate chocolate", "Christmas and New Year chocolate gifts", "logo chocolates for exhibitions", "logo chocolates for confectioneries", "logo chocolates for restaurants"],
  "/ru": ["печать на шоколаде", "персонализированное печенье с предсказаниями", "капкейки с логотипом", "корпоративный шоколад", "шоколадные подарки на Рождество и Новый год", "шоколад с логотипом для выставок", "шоколад с логотипом для кондитерских", "шоколад с логотипом для ресторанов"],
  "/et": ["šokolaadi trükk", "personaliseeritud ennustusküpsised", "logoga koogikesed", "korporatiivne šokolaad", "jõulu- ja uusaasta šokolaadikingid", "logoga šokolaad messidele", "logoga šokolaad kondiitritele", "logoga šokolaad restoranidele"],
  "/lt": ["šokolado spauda", "personalizuoti laimės sausainiai", "keksiukai su logotipu", "korporatyvinis šokoladas", "kalėdinės ir naujametinės šokolado dovanos", "šokoladas su logotipu parodoms", "šokoladas su logotipu konditerijoms", "šokoladas su logotipu restoranams"],
  "/sv": ["chokladtryck", "personliga lyckokakor", "cupcakes med logotyp", "företagschoklad", "jul- och nyårspresenter i choklad", "logochoklad för mässor", "logochoklad för konditorier", "logochoklad för restauranger"],
  "/no": ["sjokoladetrykk", "personlige lykkekaker", "cupcakes med logo", "bedriftssjokolade", "jule- og nyttårsgaver i sjokolade", "logosjokolade for messer", "logosjokolade for konditorier", "logosjokolade for restauranter"],
  "/fi": ["suklaapainatus", "personoidut onnenkeksit", "logokuppikakut", "yrityssuklaa", "joulun ja uudenvuoden suklaalahjat", "logosuklaat messuille", "logosuklaat konditorioille", "logosuklaat ravintoloille"],
  "/da": ["chokoladetryk", "personlige lykkekager", "cupcakes med logo", "firmachokolade", "jule- og nytårsgaver i chokolade", "logochokolade til messer", "logochokolade til konditorier", "logochokolade til restauranter"],
  "/de": ["Schokoladendruck", "personalisierte Glückskekse", "Logo-Cupcakes", "Firmenschokolade", "Weihnachts- und Neujahrsschokolade als Geschenk", "Logo-Schokolade für Messen", "Logo-Schokolade für Konditoreien", "Logo-Schokolade für Restaurants"],
  "/fr": ["impression sur chocolat", "biscuits chinois personnalisés", "cupcakes avec logo", "chocolat d'entreprise", "cadeaux chocolat de Noël et Nouvel An", "chocolats logo pour salons", "chocolats logo pour pâtisseries", "chocolats logo pour restaurants"],
  "/it": ["stampa su cioccolato", "biscotti della fortuna personalizzati", "cupcake con logo", "cioccolato aziendale", "regali di cioccolato per Natale e Capodanno", "cioccolatini con logo per fiere", "cioccolatini con logo per pasticcerie", "cioccolatini con logo per ristoranti"],
  "/es": ["impresión en chocolate", "galletas de la fortuna personalizadas", "cupcakes con logo", "chocolate corporativo", "regalos de chocolate de Navidad y Año Nuevo", "chocolates con logo para ferias", "chocolates con logo para pastelerías", "chocolates con logo para restaurantes"],
  "/ar": ["طباعة على الشوكولاتة", "كعك الحظ المخصص", "كب كيك بشعار", "شوكولاتة الشركات", "هدايا شوكولاتة لعيد الميلاد ورأس السنة", "شوكولاتة بشعار للمعارض", "شوكولاتة بشعار لمحلات الحلويات", "شوكولاتة بشعار للمطاعم"],
  "/nl": ["chocoladedruk", "gepersonaliseerde gelukskoekjes", "cupcakes met logo", "bedrijfschocolade", "kerst- en nieuwjaarscadeaus van chocolade", "logochocolade voor beurzen", "logochocolade voor banketbakkerijen", "logochocolade voor restaurants"],
  "/pl": ["nadruk na czekoladzie", "personalizowane ciasteczka z wróżbą", "babeczki z logo", "czekolada firmowa", "czekoladowe prezenty na Boże Narodzenie i Nowy Rok", "czekoladki z logo na targi", "czekoladki z logo dla cukierni", "czekoladki z logo dla restauracji"],
  "/cs": ["potisk čokolády", "personalizované sušenky štěstí", "cupcakes s logem", "firemní čokoláda", "čokoládové dárky na Vánoce a Nový rok", "čokolády s logem na veletrhy", "čokolády s logem pro cukrárny", "čokolády s logem pro restaurace"],
  "/pt": ["impressão em chocolate", "biscoitos da sorte personalizados", "cupcakes com logo", "chocolate corporativo", "presentes de chocolate de Natal e Ano Novo", "chocolates com logo para feiras", "chocolates com logo para confeitarias", "chocolates com logo para restaurantes"],
  "/el": ["εκτύπωση σε σοκολάτα", "εξατομικευμένα μπισκότα τύχης", "cupcakes με λογότυπο", "εταιρική σοκολάτα", "χριστουγεννιάτικα και πρωτοχρονιάτικα δώρα σοκολάτας", "σοκολάτες με λογότυπο για εκθέσεις", "σοκολάτες με λογότυπο για ζαχαροπλαστεία", "σοκολάτες με λογότυπο για εστιατόρια"],
  "/tr": ["çikolata baskı", "kişiye özel şans kurabiyeleri", "logolu cupcake", "kurumsal çikolata", "Noel ve Yılbaşı çikolata hediyeleri", "fuarlar için logolu çikolata", "pastaneler için logolu çikolata", "restoranlar için logolu çikolata"],
  "/hu": ["csokoládé nyomtatás", "személyre szabott szerencsesüti", "logós cupcake", "céges csokoládé", "karácsonyi és újévi csokoládé ajándékok", "logós csokoládé kiállításokra", "logós csokoládé cukrászdáknak", "logós csokoládé éttermeknek"],
  "/ro": ["imprimare pe ciocolată", "fursecuri cu răvaș personalizate", "cupcakes cu logo", "ciocolată corporate", "cadouri din ciocolată de Crăciun și Anul Nou", "ciocolată cu logo pentru expoziții", "ciocolată cu logo pentru cofetării", "ciocolată cu logo pentru restaurante"],
  "/bg": ["печат върху шоколад", "персонализирани бисквитки с късмет", "къпкейкове с лого", "корпоративен шоколад", "шоколадови подаръци за Коледа и Нова година", "шоколад с лого за изложения", "шоколад с лого за сладкарници", "шоколад с лого за ресторанти"],
  "/hr": ["tisak na čokoladi", "personalizirani kolačići sreće", "cupcakes s logom", "korporativna čokolada", "čokoladni pokloni za Božić i Novu godinu", "čokolade s logom za sajmove", "čokolade s logom za slastičarnice", "čokolade s logom za restorane"],
  "/sk": ["potlač na čokoláde", "personalizované koláčiky šťastia", "cupcakes s logom", "firemná čokoláda", "čokoládové darčeky na Vianoce a Nový rok", "čokolády s logom na veľtrhy", "čokolády s logom pre cukrárne", "čokolády s logom pre reštaurácie"],
  "/sl": ["tisk na čokoladi", "personalizirani piškotki sreče", "cupcakes z logotipom", "poslovna čokolada", "čokoladna darila za božič in novo leto", "čokolade z logotipom za sejme", "čokolade z logotipom za slaščičarne", "čokolade z logotipom za restavracije"],
  "/uk": ["друк на шоколаді", "персоналізоване печиво з передбаченнями", "капкейки з логотипом", "корпоративний шоколад", "шоколадні подарунки на Різдво та Новий рік", "шоколад з логотипом для виставок", "шоколад з логотипом для кондитерських", "шоколад з логотипом для ресторанів"],
  "/sr": ["štampa na čokoladi", "personalizovani kolačići sreće", "kapkejk sa logom", "korporativna čokolada", "čokoladni pokloni za Božić i Novu godinu", "čokolade sa logom za sajmove", "čokolade sa logom za poslastičarnice", "čokolade sa logom za restorane"],
  "/bs": ["štampa na čokoladi", "personalizirani kolačići sreće", "kapkejk sa logom", "korporativna čokolada", "čokoladni pokloni za Božić i Novu godinu", "čokolade sa logom za sajmove", "čokolade sa logom za slastičarne", "čokolade sa logom za restorane"],
  "/mk": ["печат на чоколадо", "персонализирани колачиња со среќа", "капкејкови со лого", "корпоративно чоколадо", "чоколадни подароци за Божиќ и Нова година", "чоколадо со лого за саеми", "чоколадо со лого за слаткарници", "чоколадо со лого за ресторани"],
  "/sq": ["shtypje në çokollatë", "biskota fati të personalizuara", "cupcakes me logo", "çokollatë korporative", "dhurata çokollate për Krishtlindje dhe Vit të Ri", "çokollata me logo për panaire", "çokollata me logo për ëmbëltore", "çokollata me logo për restorante"],
  "/is": ["súkkulaðiprentun", "sérsniðnar lukkukökur", "bollakökur með merki", "fyrirtækjasúkkulaði", "jóla- og áramótagjafir úr súkkulaði", "merkjasúkkulaði fyrir sýningar", "merkjasúkkulaði fyrir bakarí", "merkjasúkkulaði fyrir veitingastaði"],
};

export function homepageKeywords(path: string): string {
  const themes = themeKeywords[path];
  const base = seoKeywords[path] ?? "";
  if (!themes) return base;
  return [...themes, ...base.split(",").map((s) => s.trim()).filter(Boolean)]
    .filter((k, i, all) => all.findIndex((x) => x.toLowerCase() === k.toLowerCase()) === i)
    .join(", ");
}

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
    if (extra) {
      const link = el;
      Object.entries(extra).forEach(([k, v]) => link.setAttribute(k, v));
    }
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Keep meta descriptions within the 160-character limit search engines display.
function clampDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.-]+$/, "")}…`;
}

function searchTitle(title: string) {
  const suffix = " — Luxury Chocolate";
  const clean = title.replace(/\s+/g, " ").trim().replace(/\s*[|—–-]\s*Luxury Chocolate\s*$/i, "");
  const full = `${clean}${suffix}`;
  // Keep descriptive product details ahead of branding when the full title is long.
  if (full.length <= 70) return full;
  if (clean.length <= 70) return clean;
  return clampDescription(clean, 70);
}

const descriptionContext: Record<string, string> = {
  lv: "Apskatiet Luxury Chocolate piedāvājumu un produktu informāciju. Sazinieties ar mums, lai saņemtu individuālu piedāvājumu.",
  en: "Explore the Luxury Chocolate collection and product details. Contact us for a personalised quotation for your order.",
  ru: "Посмотрите ассортимент Luxury Chocolate и информацию о продукции. Свяжитесь с нами для индивидуального предложения.",
  et: "Tutvuge Luxury Chocolate valiku ja tooteinfoga. Võtke meiega ühendust, et saada oma tellimusele personaalne pakkumine.",
};

export function useSeo({ title, description, path, ogImage, keywords }: SeoProps) {
  const pageLang = useCurrentLang();
  useEffect(() => {
    const fullTitle = searchTitle(title);
    // Canonical must never carry query params (?lang, ?page, ?category, ?q).
    const cleanPath = canonicalPath(path);
    const url = `${BASE_URL}${cleanPath}`;
    let base = description.replace(/\s+/g, " ").trim();
    if (base.length < 110) {
      base = `${base.replace(/[.\s]+$/, "")}. ${descriptionContext[pageLang] ?? descriptionContext.en}`;
    }
    const desc = clampDescription(base);

    document.title = fullTitle;
    document.documentElement.lang = pageLang;

    setMeta("description", desc);
    setMeta("robots", "index, follow");
    setLink("canonical", url);

    // Keywords
    const kw = keywords || homepageKeywords(cleanPath);
    if (kw) setMeta("keywords", kw);

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "website", "property");
    if (ogImage) setMeta("og:image", ogImage, "property");

    // Twitter
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);
    if (ogImage) setMeta("twitter:image", ogImage);

    // Hreflang alternate links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    const alternatives = hreflangMap[cleanPath];
    // Only emit hreflang when the current URL is itself the canonical member of the set.
    if (alternatives && Object.values(alternatives).includes(cleanPath)) {
      Object.entries(alternatives).forEach(([lang, altPath]) => {
        setLink("alternate", `${BASE_URL}${altPath}`, { hreflang: lang });
      });
      const defaultPath = alternatives["lv"] || cleanPath;
      setLink("alternate", `${BASE_URL}${defaultPath}`, { hreflang: "x-default" });
    }

    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
  }, [title, description, path, ogImage, keywords, pageLang]);
}
