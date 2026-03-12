import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo-transparent.png";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FreePreviewSection from "@/components/FreePreviewSection";
import { useSeo } from "@/hooks/useSeo";

const vp = { once: true, margin: "-50px" as const };

const services = [
  { to: "/en/chocolate-with-logo", emoji: "🍫", title: "Chocolate with Logo", desc: "Full-color logo printed directly on premium Belgian chocolate" },
  { to: "/en/client-gifts", emoji: "💼", title: "Client Gifts", desc: "Premium chocolate gifts that strengthen business relationships" },
  { to: "/en/promotional-chocolate", emoji: "🎁", title: "Promotional Chocolate", desc: "Branded chocolate for exhibitions, conferences and events" },
  { to: "/en/christmas-corporate-chocolate", emoji: "🎄", title: "Christmas Chocolate", desc: "Festive corporate gifts with your company logo" },
  { to: "/en/conference-chocolate", emoji: "🎤", title: "Conference Chocolate", desc: "Personalized chocolate for events and seminars" },
  { to: "/en/employee-gifts", emoji: "👥", title: "Employee Gifts", desc: "Show appreciation with personalized chocolate gifts" },
  { to: "/en/partner-gifts", emoji: "🤝", title: "Partner Gifts", desc: "Exclusive gifts for valued business partners" },
  { to: "/en/corporate-gift-ideas", emoji: "💡", title: "Gift Ideas", desc: "Inspiration for corporate chocolate gifts" },
];

const stats = [
  { value: "500+", label: "Orders completed" },
  { value: "10+", label: "Years of experience" },
  { value: "30+", label: "Countries delivered to" },
  { value: "50", label: "Minimum order (pcs)" },
];

const EnIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useSeo({
    title: "Custom Chocolate with Logo | Premium Corporate Gifts",
    description: "Exclusive custom chocolate with your company logo. Premium corporate gifts for clients, partners and events. Belgian chocolate with personalized printing.",
    path: "/en",
  });

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="flex flex-col">
        <div className="bg-foreground py-16 sm:py-20 text-center">
          <div className="container mx-auto">
            <div className="flex justify-end mb-4">
              <LanguageSwitcher />
            </div>
            <div className="mx-auto mb-10 w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-white overflow-hidden flex items-center justify-center"
              style={{ boxShadow: "0 0 40px rgba(196,163,90,0.15), 0 0 80px rgba(0,0,0,0.3)" }}
            >
              <img src={logo} alt="Luxury Chocolate — custom corporate chocolate with logo" className="w-[85%] h-[85%] object-contain" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-[1.1] tracking-tight font-normal">
              Custom Chocolate
              <br />
              <span className="text-primary">with Your Logo</span>
            </h1>
            <h2 className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed tracking-wide font-normal">
              Premium corporate gifts for clients and partners.
            </h2>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{ boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)", letterSpacing: "0.12em" }}
            >
              Get a Quote
            </button>
          </div>
        </div>
        <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
          <video autoPlay muted loop playsInline preload="none" poster="/video/hero-poster.webp" className="absolute inset-0 w-full h-full object-cover">
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
                <p className="text-3xl sm:text-4xl font-light text-primary mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-12">Our Solutions</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <Link key={s.to} to={s.to} className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md">
                  <span className="text-2xl flex-shrink-0">{s.emoji}</span>
                  <div>
                    <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                      {s.title} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1">{s.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free preview */}
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="en" />

      {/* SEO text */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }} className="text-base text-muted-foreground leading-relaxed space-y-4">
            <h2 className="text-2xl sm:text-3xl text-foreground mb-4">Custom Chocolate with Logo for Businesses</h2>
            <p>We offer premium Belgian chocolate with personalized full-color printing — perfect corporate gifts for clients, partners, and events. Our chocolate gifts help companies stand out and create a lasting positive impression.</p>
            <p>From small promotional chocolates for conferences to luxury gift boxes for VIP clients, we provide end-to-end service: design, production, and worldwide delivery to over 30 countries. Minimum order from 50 pieces, production time 3–10 business days.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground text-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Ready to order?</h2>
            <p className="text-white/60 mb-8">Send us your logo and we'll prepare a personalized offer within 24 hours.</p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{ boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)", letterSpacing: "0.12em" }}
            >
              Get a Quote
            </button>
          </motion.div>
        </div>
      </section>

      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default EnIndex;
