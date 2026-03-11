import logo from "@/assets/logo.jpg";

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
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/60" />
      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        <img src={logo} alt="Luxury Chocolate" className="h-14 w-auto mx-auto mb-10 invert brightness-200" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-4">
          Šokolāde ar Jūsu logo
        </h1>
        <p className="text-lg text-primary-foreground/80 mb-10 max-w-lg mx-auto">
          Personalizētas korporatīvās dāvanas klientiem, partneriem un pasākumiem.
        </p>
        <button
          onClick={onCtaClick}
          className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3.5 font-medium tracking-wide text-base transition-all duration-200 active:scale-[0.98]"
          style={{ boxShadow: "var(--shadow-button)" }}
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
    </section>
  );
};

export default HeroSection;
