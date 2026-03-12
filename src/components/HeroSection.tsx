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
          <div className="mx-auto mb-10 w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-white overflow-hidden flex items-center justify-center"
            style={{ boxShadow: "0 0 40px rgba(196,163,90,0.15), 0 0 80px rgba(0,0,0,0.3)" }}
          >
            <img
              src={logo}
              alt="Luxury Chocolate — ekskluzīvas korporatīvās šokolādes ar logo"
              className="w-[85%] h-[85%] object-contain"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-[1.1] tracking-tight font-normal">
            Šokolādes ar logo
            <br />
            <span className="text-primary">uzņēmumiem</span>
          </h1>

          <h2 className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed tracking-wide font-normal">
            Premium korporatīvās dāvanas klientiem un partneriem.
          </h2>

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
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Removed duplicate sr-only H1 — visible H1 now in hero */}
    </section>
  );
};

export default HeroSection;
