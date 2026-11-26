import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-hero-gold-center.webp.asset.json";
import chocoTimeLogo from "@/assets/its-choco-time-gold.webp.asset.json";
import chocolatePrintingTitle from "@/assets/hero-chocolate-printing.webp.asset.json";
import chocolatePrintingTitleEn from "@/assets/hero-chocolate-printing-en.webp.asset.json";
import heroPoster from "@/assets/hero-poster.webp.asset.json";
import { Button } from "@/components/ui/button";
import { heroChocolateTitles, heroChocolateRtlLanguages } from "@/i18n/heroChocolateTitle";
import { ExternalLink, ShoppingBag, Phone, Mail } from "lucide-react";
import type { Lang } from "@/i18n/types";
import { expandLangs } from "@/i18n/expandLangs";

const shopUrls: Record<Lang, string> = expandLangs({
  lv: "https://luxurychocolate.lv/veikals",
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
  const sectionRef = useRef<HTMLElement>(null);
  const [navigationClearance, setNavigationClearance] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Let the lightweight poster and heading paint before competing for video bandwidth.
    const timer = window.setTimeout(() => setPlayVideo(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const navigation = document.getElementById("luxury-navigation");
    if (!navigation) return;

    const updateClearance = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      setNavigationClearance(Math.max(0, navigation.getBoundingClientRect().height - sectionTop));
    };
    const observer = new ResizeObserver(updateClearance);
    observer.observe(navigation);
    window.addEventListener("resize", updateClearance);
    updateClearance();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateClearance);
    };
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col bg-foreground" style={{ paddingTop: navigationClearance }}>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 pt-16 pb-3 sm:pt-3 text-sm text-background">
        <a href="tel:+37126177853" className="inline-flex min-h-9 items-center gap-2 hover:text-primary"><Phone size={16} />+371 26 177 853</a>
        <a href="mailto:info@luxurychocolate.lv" className="inline-flex min-h-9 items-center gap-2 hover:text-primary"><Mail size={16} />info@luxurychocolate.lv</a>
        <Button onClick={onCtaClick} size="sm" className="whitespace-normal h-auto min-h-9">{formButton}</Button>
      </div>
      {/* Video ar logo abās malās */}
      <div className="relative w-full h-[38vh] sm:h-[60vh] overflow-hidden bg-foreground">
        <img src={heroPoster.url} alt="" aria-hidden="true" fetchPriority="high" width={720} height={1280} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 35%" }} />
        {playVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={heroPoster.url}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 35%" }}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        )}

        {/* Maigs gradients malās lai logo labāk redzami */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Augšējais teksts uz video */}
        <div className="absolute top-[16%] sm:top-[12%] left-0 right-0 z-10 text-center px-4">
          {lang === "lv" || lang === "en" ? (
            <h1 className="m-0">
              <span className="sr-only">{heroChocolateTitles[lang]}</span>
              <img
                src={lang === "lv" ? chocolatePrintingTitle.url : chocolatePrintingTitleEn.url}
                alt=""
                aria-hidden="true"
                width={1884}
                height={320}
                fetchPriority="high"
                className="mx-auto h-auto w-full max-w-[620px] object-contain"
              />
            </h1>
          ) : (
            <h1
              className="hero-chocolate-title"
              lang={lang}
              dir={heroChocolateRtlLanguages.includes(lang) ? "rtl" : "ltr"}
            >
              <span className="hero-chocolate-title-depth" aria-hidden="true">{heroChocolateTitles[lang]}</span>
              <span className="hero-chocolate-title-face">{heroChocolateTitles[lang]}</span>
            </h1>
          )}
        </div>

        {/* Kreisais logo */}
        <div className="absolute top-[55%] -translate-y-1/2 left-3 sm:left-6 z-10">
          <div className="w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] lg:w-[320px] lg:h-[320px] flex items-center justify-center">
            <img src={logo.url} width={640} height={640} alt={logoAlt} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Labais logo */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-10 z-10">
          <img
            src={chocoTimeLogo.url}
            width={340}
            height={340}
            alt="It's Choco Time"
            className="w-[100px] sm:w-[170px] h-auto object-contain"
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
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-background mb-5 leading-[1.1] font-normal">
            {title1}
            <br />
            <span className="text-primary">{title2}</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/60 mb-4 max-w-xl mx-auto leading-relaxed tracking-wide font-normal">
            {subtitle}
          </p>

          {tagline && (
            <p className="text-base sm:text-lg text-primary/90 mb-10 max-w-2xl mx-auto leading-relaxed tracking-wide font-normal italic">
              {tagline}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={onCtaClick}
              className="h-auto whitespace-normal px-10 py-4 text-base uppercase active:scale-[0.97]"
              style={{
                boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)",
                letterSpacing: "0.12em",
              }}
            >
              {ctaButton}
            </Button>
            <Link
              to="/kuku-sokolades-veikals"
              className="group inline-flex items-center gap-2 justify-center rounded-lg bg-primary/10 border border-primary text-primary px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:bg-primary hover:text-primary-foreground"
              style={{ letterSpacing: "0.12em" }}
            >
              <ShoppingBag size={18} />
              {orderNowLabels[lang]}
            </Link>
            <Button
              onClick={onCtaClick}
              variant="outline"
              className="h-auto whitespace-normal border-primary bg-transparent text-primary px-10 py-4 text-base uppercase hover:bg-primary hover:text-primary-foreground"
              style={{ letterSpacing: "0.12em" }}
            >
              {formButton}
            </Button>
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
