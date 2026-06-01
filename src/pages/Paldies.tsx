import { Link, useSearchParams } from "react-router-dom";
import { Heart, Mail, Package, Phone, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";
import logoSeal from "@/assets/logo-seal-clean.png";
import heroChocolate from "@/assets/hero-chocolate.webp";

const Paldies = () => {
  const [params] = useSearchParams();
  const orderNumber = params.get("order");
  const email = params.get("email");

  useSeo({
    title: "Paldies par pasūtījumu — Luxury Chocolate",
    description:
      "Paldies, ka izvēlējies Luxury Chocolate. Tavs pasūtījums saņemts un drīzumā tiks sagatavots ar mīlestību.",
    path: "/paldies",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient + subtle texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-foreground/95" />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-screen"
          style={{
            backgroundImage: `url(${heroChocolate})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-28 text-center max-w-3xl">
          {/* Logo in white circle */}
          <div className="inline-flex items-center justify-center w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-white shadow-2xl shadow-primary/20 mb-8 ring-1 ring-primary/20">
            <img
              src={logoSeal}
              alt="Luxury Chocolate"
              className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs tracking-[0.2em] uppercase">
            <Sparkles size={14} />
            <span>Ar mīlestību gatavots</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
            Paldies!
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-3">
            Esam priecīgi, ka esi izvēlējies Luxury Chocolate —
            roku darbu no premium beļģu šokolādes.
          </p>
          <p className="text-base text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Tavs pasūtījums ir saņemts un drīzumā tiks uzsākts ražošanā.
            Apstiprinājums un visa informācija ir ceļā uz tavu e-pastu.
          </p>

          {(orderNumber || email) && (
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 rounded-full bg-card border border-border text-sm">
              {orderNumber && (
                <span className="inline-flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="font-mono">{orderNumber}</span>
                </span>
              )}
              {orderNumber && email && (
                <span className="text-muted-foreground">•</span>
              )}
              {email && (
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{email}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* What happens next */}
      <section className="container mx-auto px-4 pb-20 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: "01",
              title: "Bezmaksas skice",
              text: "24 stundu laikā saņemsi pirmo logo skici uz šokolādes apstiprināšanai.",
            },
            {
              n: "02",
              title: "Ražošana 3 dienās",
              text: "Mūsu meistari ar rokām gatavo katru šokolādi no Belcolade un Callebaut.",
            },
            {
              n: "03",
              title: "Piegāde pa Eiropu",
              text: "Rūpīgi iepakots un nosūtīts ar Venipak vai pēc tavas izvēles.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="group relative rounded-2xl border border-border bg-card/60 backdrop-blur p-7 hover:border-primary/40 transition-colors"
            >
              <div className="text-primary/60 text-xs tracking-[0.3em] mb-4">
                {step.n}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.text}
              </p>
              <div className="absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <Heart className="mx-auto text-primary mb-4" size={28} />
          <p className="text-base text-muted-foreground italic leading-relaxed">
            "Katra šokolāde, ko gatavojam, nes sevī mūsu mīlestību pret amatu
            un cieņu pret cilvēku, kas to saņems. Paldies, ka uzticies mums."
          </p>
          <p className="mt-4 text-sm font-medium tracking-wider uppercase text-foreground">
            Ilze Eisaka
          </p>
          <p className="text-xs text-muted-foreground">
            Luxury Chocolate SIA
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <a
              href="tel:+37126177853"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone size={14} /> +371 26177853
            </a>
            <span className="text-border">•</span>
            <a
              href="mailto:ilze.eisaka@gmail.com"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail size={14} /> ilze.eisaka@gmail.com
            </a>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/account">Apskatīt manus pasūtījumus</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/veikals">Turpināt iepirkties</Link>
          </Button>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Paldies;
