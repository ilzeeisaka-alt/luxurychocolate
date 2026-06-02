import { Link } from "react-router-dom";
import logo from "@/assets/logo-seal-clean.png";
import chocoTimeLogo from "@/assets/its-choco-time.png";
import { ExternalLink, ShoppingBag } from "lucide-react";
import type { Lang } from "@/i18n/types";
import { expandLangs } from "@/i18n/expandLangs";

const shopUrls: Record<Lang, string> = expandLangs({
  lv: "https://www.luxurychocolatesia.lv/interneta-veikals-produkti/",
  en: "https://www.luxurychocolatesia.lv/online-shop-products/",
  ru: "https://www.luxurychocolatesia.lv/internet-magazin-produkti/",
  et: "https://www.luxurychocolatesia.lv/e-pood/",
  lt: "https://www.luxurychocolatesia.lv/internetine-parduotuve/",
  sv: "https://www.luxurychocolatesia.lv/online-shop-products/",
  no: "https://www.luxurychocolatesia.lv/online-shop-products/",
  fi: "https://www.luxurychocolatesia.lv/online-shop-products/",
  da: "https://www.luxurychocolatesia.lv/online-shop-products/",
  de: "https://www.luxurychocolatesia.lv/online-shop-products/",
  fr: "https://www.luxurychocolatesia.lv/online-shop-products/",
  it: "https://www.luxurychocolatesia.lv/online-shop-products/",
  es: "https://www.luxurychocolatesia.lv/online-shop-products/",
  ar: "https://www.luxurychocolatesia.lv/online-shop-products/",
  nl: "https://www.luxurychocolatesia.lv/online-shop-products/", pl: "https://www.luxurychocolatesia.lv/online-shop-products/", cs: "https://www.luxurychocolatesia.lv/online-shop-products/", pt: "https://www.luxurychocolatesia.lv/online-shop-products/", el: "https://www.luxurychocolatesia.lv/online-shop-products/", tr: "https://www.luxurychocolatesia.lv/online-shop-products/", hu: "https://www.luxurychocolatesia.lv/online-shop-products/", ro: "https://www.luxurychocolatesia.lv/online-shop-products/", bg: "https://www.luxurychocolatesia.lv/online-shop-products/", hr: "https://www.luxurychocolatesia.lv/online-shop-products/", sk: "https://www.luxurychocolatesia.lv/online-shop-products/", sl: "https://www.luxurychocolatesia.lv/online-shop-products/", uk: "https://www.luxurychocolatesia.lv/online-shop-products/", sr: "https://www.luxurychocolatesia.lv/online-shop-products/", bs: "https://www.luxurychocolatesia.lv/online-shop-products/", mk: "https://www.luxurychocolatesia.lv/online-shop-products/", sq: "https://www.luxurychocolatesia.lv/online-shop-products/", is: "https://www.luxurychocolatesia.lv/online-shop-products/",
});

const orderNowLabels: Record<Lang, string> = expandLangs({
  lv: "Pasūti tagad",
  en: "Order now",
  ru: "Заказать сейчас",
  et: "Telli kohe",
  lt: "Užsisakyti dabar",
  sv: "Beställ nu",
  no: "Bestill nå",
  fi: "Tilaa nyt",
  da: "Bestil nu",
  de: "Jetzt bestellen",
  fr: "Commander",
  it: "Ordina ora",
  es: "Pedir ahora",
  ar: "اطلب الآن",
  nl: "Bestel nu",
  pl: "Zamów teraz",
  cs: "Objednat",
  pt: "Encomendar",
  el: "Παραγγείλτε",
  tr: "Sipariş ver",
  hu: "Rendelés",
  ro: "Comandă acum",
  bg: "Поръчай сега",
  hr: "Naruči sada",
  sk: "Objednať",
  sl: "Naroči zdaj",
  uk: "Замовити",
  sr: "Naruči odmah",
  bs: "Naruči odmah",
  mk: "Нарачај сега",
  sq: "Porosit tani",
  is: "Panta núna",
});

const videoTopCaptions: Record<Lang, string> = expandLangs({
  lv: "Šokolādes apdruka",
  en: "Chocolate printing",
  ru: "Шоколадная печать",
  et: "Šokolaaditrükk",
  lt: "Šokolado spauda",
  sv: "Chokladtryck",
  no: "Sjokoladetrykk",
  fi: "Suklaapainatus",
  da: "Chokoladetryk",
  de: "Schokoladendruck",
  fr: "Impression sur chocolat",
  it: "Stampa su cioccolato",
  es: "Impresión en chocolate",
  ar: "طباعة الشوكولاتة",
  nl: "Chocoladedruk",
  pl: "Druk czekoladowy",
  cs: "Čokoládový tisk",
  pt: "Impressão em chocolate",
  el: "Εκτύπωση σοκολάτας",
  tr: "Çikolata baskı",
  hu: "Csokoládé nyomtatás",
  ro: "Tiparire cu ciocolată",
  bg: "Шоколадов печат",
  hr: "Čokoladni tisak",
  sk: "Čokoládová tlač",
  sl: "Čokoladni tisk",
  uk: "Шоколадний друк",
  sr: "Čokoladna štampa",
  bs: "Čokoladna štampa",
  mk: "Чоколадно печатење",
  sq: "Shtypje çokollate",
  is: "Súkkulaðaprentun",
});

const videoCaptions: Record<Lang, string> = expandLangs({
  lv: "Uzdruka ar šokolādes krāsām uz šokolādes",
  en: "Printing with chocolate colors on chocolate",
  ru: "Печать шоколадными красками на шоколаде",
  et: "Trükkimine šokolaadivärvidega šokolaadile",
  lt: "Spauda šokolado spalvomis ant šokolado",
  sv: "Tryck med chokladfärger på choklad",
  no: "Trykk med sjokoladefarger på sjokolade",
  fi: "Painatus suklaaväreillä suklaalle",
  da: "Tryk med chokoladefarver på chokolade",
  de: "Druck mit Schokoladenfarben auf Schokolade",
  fr: "Impression aux couleurs de chocolat sur chocolat",
  it: "Stampa con colori di cioccolato su cioccolato",
  es: "Impresión con colores de chocolate sobre chocolate",
  ar: "طباعة بألوان الشوكولاتة على الشوكولاتة",
  nl: "Drukken met chocoladekleuren op chocolade",
  pl: "Druk czekoladowymi kolorami na czekoladzie",
  cs: "Tisk čokoládovými barvami na čokoládě",
  pt: "Impressão com cores de chocolate sobre chocolate",
  el: "Εκτύπωση με χρώματα σοκολάτας πάνω σε σοκολάτα",
  tr: "Çikolata renkleriyle çikolata üzerine baskı",
  hu: "Nyomtatás csokoládészínekkel csokoládéra",
  ro: "Imprimare cu culori de ciocolată pe ciocolată",
  bg: "Печат с шоколадови цветове върху шоколад",
  hr: "Tisak čokoladnim bojama na čokoladi",
  sk: "Tlač čokoládovými farbami na čokoláde",
  sl: "Tisk s čokoladnimi barvami na čokoladi",
  uk: "Друк шоколадними фарбами на шоколаді",
  sr: "Štampa čokoladnim bojama na čokoladi",
  bs: "Štampa čokoladnim bojama na čokoladi",
  mk: "Печат со чоколадни бои на чоколадо",
  sq: "Shtypje me ngjyra çokollate mbi çokollatë",
  is: "Prentun með súkkulaðilitum á súkkulaði",
});

interface HeroSectionProps {
  onCtaClick: () => void;
  lang?: Lang;
  title1: string;
  title2: string;
  subtitle: string;
  tagline?: string;
  ctaButton: string;
  formButton: string;
  pricesButton: string;
  logoAlt?: string;
}

const HeroSection = ({
  onCtaClick,
  lang = "lv",
  title1,
  title2,
  subtitle,
  tagline,
  ctaButton,
  formButton,
  pricesButton,
  logoAlt = "Luxury Chocolate — ekskluzīvas korporatīvās šokolādes ar logo",
}: HeroSectionProps) => {
  return (
    <section className="flex flex-col">
      {/* Video ar logo abās malās */}
      <div className="relative w-full h-[55vh] sm:h-[70vh] overflow-hidden bg-foreground">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 35%" }}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Maigs gradients malās lai logo labāk redzami */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Augšējais teksts uz video */}
        <div className="absolute top-6 sm:top-10 left-0 right-0 z-10 text-center px-4">
          <p
            className="text-lg sm:text-3xl font-semibold tracking-widest uppercase"
            style={{
              color: "#e8d5b5",
              textShadow: "0 2px 12px rgba(60,30,10,0.9), 0 0 24px rgba(60,30,10,0.6)",
              letterSpacing: "0.18em",
            }}
          >
            {videoTopCaptions[lang] ?? videoTopCaptions.en}
          </p>
        </div>

        {/* Kreisais logo */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-10 z-10">
          <div
            className="w-[110px] h-[110px] sm:w-[180px] sm:h-[180px] rounded-full bg-white flex items-center justify-center"
            style={{ boxShadow: "0 0 40px rgba(196,163,90,0.25), 0 0 80px rgba(0,0,0,0.5)" }}
          >
            <img src={logo} alt={logoAlt} className="w-[70%] h-[70%] object-contain" />
          </div>
        </div>

        {/* Labais logo */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-10 z-10">
          <img
            src={chocoTimeLogo}
            alt="It's Choco Time"
            className="w-[100px] sm:w-[170px] h-auto object-contain rounded-lg"
            style={{ boxShadow: "0 0 30px rgba(196,163,90,0.2), 0 0 60px rgba(0,0,0,0.4)" }}
          />
        </div>

        {/* Apakšējais teksts uz video */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-10 text-center px-4">
          <p
            className="text-base sm:text-2xl font-medium tracking-widest uppercase"
            style={{
              color: "#e8d5b5",
              textShadow: "0 2px 12px rgba(60,30,10,0.9), 0 0 24px rgba(60,30,10,0.6)",
              letterSpacing: "0.2em",
            }}
          >
            {videoCaptions[lang] ?? videoCaptions.en}
          </p>
        </div>
      </div>

      {/* Teksts un CTA pogas zem video */}
      <div className="relative bg-foreground pt-12 pb-16 sm:pt-16 sm:pb-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-[1.1] tracking-tight font-normal">
            {title1}
            <br />
            <span className="text-primary">{title2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 mb-4 max-w-xl mx-auto leading-relaxed tracking-wide font-normal">
            {subtitle}
          </p>

          {tagline && (
            <p className="text-base sm:text-lg text-primary/90 mb-10 max-w-2xl mx-auto leading-relaxed tracking-wide font-normal italic">
              {tagline}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{
                boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)",
                letterSpacing: "0.12em",
              }}
            >
              {ctaButton}
            </button>
            <Link
              to="/kuku-sokolades-veikals"
              className="group inline-flex items-center gap-2 justify-center rounded-lg bg-primary/10 border border-primary text-primary px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:bg-primary hover:text-primary-foreground"
              style={{ letterSpacing: "0.12em" }}
            >
              <ShoppingBag size={18} />
              {orderNowLabels[lang]}
            </Link>
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-lg border border-primary text-primary px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:bg-primary hover:text-primary-foreground"
              style={{ letterSpacing: "0.12em" }}
            >
              {formButton}
            </button>
            <a
              href={shopUrls[lang]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-lg border border-primary text-primary px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:bg-primary hover:text-primary-foreground"
              style={{ letterSpacing: "0.12em" }}
            >
              {pricesButton}
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
