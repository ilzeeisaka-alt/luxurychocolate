import logo from "@/assets/logo-transparent.png";

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="flex flex-col">
      {/* Top segment — logo + text on dark background */}
      <div className="bg-foreground py-16 sm:py-20 text-center">
        <div className="container mx-auto">
          <img
            src={logo}
            alt="Luxury Chocolate"
            className="h-[180px] sm:h-[220px] w-auto mx-auto mb-10"
            style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.4))" }}
          />

          <p
            className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-[1.1] tracking-tight"
            aria-hidden="true"
          >
            Ekskluzīvas šokolādes
            <br />
            <span className="text-primary">ar Jūsu logo</span>
          </p>

          <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed tracking-wide">
            Premium korporatīvās dāvanas klientiem un partneriem.
          </p>

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
            Saņemt piedāvājumu
          </button>
        </div>
      </div>

      {/* Video segment below */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(0.9)" }}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-transparent to-foreground/40" />
      </div>

      {/* Hidden SEO H1 */}
      <h1 className="sr-only">Ekskluzīvas korporatīvās šokolādes dāvanas ar Jūsu logo — Luxury Chocolate</h1>
    </section>
  );
};

export default HeroSection;
