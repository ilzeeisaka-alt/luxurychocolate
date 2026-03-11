import logo from "@/assets/logo.jpg";

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-svh flex items-start pt-32 overflow-hidden">
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
        <img src={logo} alt="Luxury Chocolate" className="h-[200px] w-auto mx-auto mb-10 invert brightness-200" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-4">
          Ekskluzīvas šokolādes<br />ar Jūsu logo
        </h1>
        <p className="text-lg text-primary-foreground/80 mb-10 max-w-lg mx-auto">
          Premium korporatīvās dāvanas klientiem un partneriem.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-sm text-primary-foreground/90">
          <li className="flex items-center gap-1.5">✔ Premium Beļģu šokolāde</li>
          <li className="flex items-center gap-1.5">✔ Personalizēta apdruka</li>
          <li className="flex items-center gap-1.5">✔ Ražots Latvijā</li>
          <li className="flex items-center gap-1.5">✔ Piegāde visā pasaulē</li>
        </ul>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-sm text-primary-foreground/90">
          <li className="flex items-center gap-1.5">✔ Premium Beļģu šokolāde</li>
          <li className="flex items-center gap-1.5">✔ Personalizēta apdruka</li>
          <li className="flex items-center gap-1.5">✔ Ražots Latvijā</li>
          <li className="flex items-center gap-1.5">✔ Piegāde visā pasaulē</li>
        </ul>
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
