import logo from "@/assets/logo-transparent.png";

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-svh flex items-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        style={{ filter: "brightness(0.35) saturate(0.9)" }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Hidden SEO H1 */}
      <h1 className="sr-only">Ekskluzīvas korporatīvās šokolādes dāvanas ar Jūsu logo — Luxury Chocolate</h1>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        <img
          src={logo}
          alt="Luxury Chocolate"
          className="h-[220px] sm:h-[260px] w-auto mx-auto mb-12"
          style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.4))" }}
        />

        <p
          className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] tracking-tight"
          aria-hidden="true"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          Ekskluzīvas šokolādes
          <br />
          <span className="text-primary">ar Jūsu logo</span>
        </p>

        <p
          className="text-lg sm:text-xl text-white/70 mb-12 max-w-xl mx-auto leading-relaxed tracking-wide"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
        >
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
    </section>
  );
};

export default HeroSection;
