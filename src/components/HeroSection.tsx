import logo from "@/assets/logo-transparent.png";

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
      {/* Hidden SEO H1 */}
      <h1 className="sr-only">Ekskluzīvas korporatīvās šokolādes dāvanas ar Jūsu logo — Luxury Chocolate</h1>
      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        <img src={logo} alt="Luxury Chocolate" className="h-[280px] w-auto mx-auto mb-10" />
        <p className="text-5xl sm:text-6xl lg:text-7xl text-primary-foreground mb-4" aria-hidden="true">
          Ekskluzīvas šokolādes<br />ar Jūsu logo
        </p>
        <p className="text-lg text-primary-foreground/80 mb-10 max-w-lg mx-auto">
          Premium korporatīvās dāvanas klientiem un partneriem.
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

        <div className="mt-8">
          <h2 className="sr-only">
            Uzticības punkti zem pogas — Kāpēc izvēlēties Luxury Chocolate
          </h2>
          <ul role="list" aria-label="Uzticības punkti zem pogas" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:text-base text-primary-foreground/90">
            <li className="flex items-center gap-2">✔ Premium Beļģu šokolāde</li>
            <li className="flex items-center gap-2">✔ Personalizēta apdruka</li>
            <li className="flex items-center gap-2">✔ Ražots Latvijā</li>
            <li className="flex items-center gap-2">✔ Piegāde visā pasaulē</li>
          </ul>
          <p className="sr-only">
            4 lietas, kas padara sākumu spēcīgāku: uzticības punkti zem pogas — Premium Beļģu šokolāde, Personalizēta apdruka, Ražots Latvijā, Piegāde visā pasaulē.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
