import logo from "@/assets/logo-transparent.png";
import { ExternalLink } from "lucide-react";
import type { Lang } from "@/i18n/types";

const shopUrls: Record<Lang, string> = {
  lv: "https://www.luxurychocolatesia.lv/interneta-veikals-produkti/",
  en: "https://www.luxurychocolatesia.lv/online-shop-products/",
  ru: "https://www.luxurychocolatesia.lv/internet-magazin-produkti/",
  et: "https://www.luxurychocolatesia.lv/e-pood/",
  lt: "https://www.luxurychocolatesia.lv/internetine-parduotuve/",
  sv: "https://www.luxurychocolatesia.lv/online-shop-products/",
  no: "https://www.luxurychocolatesia.lv/online-shop-products/",
  fi: "https://www.luxurychocolatesia.lv/online-shop-products/",
};

interface HeroSectionProps {
  onCtaClick: () => void;
  lang?: Lang;
  title1: string;
  title2: string;
  subtitle: string;
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
  ctaButton,
  formButton,
  pricesButton,
  logoAlt = "Luxury Chocolate — ekskluzīvas korporatīvās šokolādes ar logo",
}: HeroSectionProps) => {
  return (
    <section className="flex flex-col">
      <div className="relative bg-foreground py-16 sm:py-20 text-center">
        <div className="container mx-auto">
          <div
            className="mx-auto mb-10 w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-white overflow-hidden flex items-center justify-center"
            style={{ boxShadow: "0 0 40px rgba(196,163,90,0.15), 0 0 80px rgba(0,0,0,0.3)" }}
          >
            <img src={logo} alt={logoAlt} className="w-[85%] h-[85%] object-contain" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-[1.1] tracking-tight font-normal">
            {title1}
            <br />
            <span className="text-primary">{title2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed tracking-wide font-normal">
            {subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{
                boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)",
                letterSpacing: "0.12em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px rgba(196,163,90,0.5), 0 6px 28px -4px rgba(196,163,90,0.5), 0 12px 40px -8px rgba(0,0,0,0.4)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {ctaButton}
            </button>
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

      <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/video/hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default HeroSection;
