import heroImg from "@/assets/hero-chocolate.jpg";
import logo from "@/assets/logo.jpg";

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="min-h-svh flex items-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <img src={logo} alt="Luxury Chocolate" className="h-16 w-auto mb-10 opacity-90" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
              Ekskluzīva šokolāde<br />Jūsu zīmolam.
            </h1>
            <p className="text-lg text-muted-foreground text-body mb-10">
              Augstākās kvalitātes korporatīvās dāvanas klientiem, partneriem un pasākumiem.
            </p>
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium tracking-wide text-base transition-all duration-200 active:scale-[0.98]"
              style={{
                boxShadow: "var(--shadow-button)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-button-hover)";
                e.currentTarget.style.filter = "brightness(0.92)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-button)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            >
              Saņemt piedāvājumu
            </button>
          </div>
          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src={heroImg}
                alt="Ekskluzīva šokolāde ar Jūsu logo"
                className="w-full rounded-xl"
                style={{ outline: "1px solid hsla(20, 14%, 12%, 0.1)", outlineOffset: "-1px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
