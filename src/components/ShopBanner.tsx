import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface ShopBannerProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  to?: string;
}

const ShopBanner = ({
  title = "Pasūti tagad — kūku šokolāde ar Tavu logo",
  subtitle = "Konfigurē formu, izmēru un šokolādes veidu. Augšupielādē logo, samaksā tiešsaistē — bez gaidīšanas uz piedāvājumu.",
  ctaLabel = "Atvērt veikalu",
  to = "/kuku-sokolades-veikals",
}: ShopBannerProps) => {
  return (
    <section className="bg-foreground py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-primary/5 px-6 py-10 sm:px-12 sm:py-14"
          style={{ boxShadow: "0 0 0 1px rgba(196,163,90,0.2), 0 20px 60px -20px rgba(196,163,90,0.3)" }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/15 border border-primary/30">
                <ShoppingBag size={14} className="text-primary" />
                <span className="text-xs uppercase tracking-widest text-primary font-medium">
                  Tiešsaistes veikals
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3 leading-tight tracking-tight">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            <Link
              to={to}
              className="group inline-flex items-center gap-3 justify-center rounded-lg bg-primary text-primary-foreground px-8 py-4 sm:px-10 sm:py-5 font-medium uppercase text-base whitespace-nowrap transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{
                boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 6px 24px -4px rgba(196,163,90,0.5), 0 12px 40px -8px rgba(0,0,0,0.3)",
                letterSpacing: "0.12em",
              }}
            >
              {ctaLabel}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;
