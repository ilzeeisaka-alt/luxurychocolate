import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo-transparent.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SeoContentSection from "@/components/SeoContentSection";
import QuickFactsSection from "@/components/QuickFactsSection";
import ClientExamplesSection from "@/components/ClientExamplesSection";
import UseCasesSection from "@/components/UseCasesSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import FreePreviewSection from "@/components/FreePreviewSection";
import TrustSection from "@/components/TrustSection";
import ProductsSection from "@/components/ProductsSection";
import FaqSection from "@/components/FaqSection";
import IdeasSection from "@/components/IdeasSection";
import RelatedPagesSection from "@/components/RelatedPagesSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const LtIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.lt;

  useSeo({
    title: "Šokoladas su logotipu įmonėms | Premium korporatyvinės dovanos",
    description: "Eksklusivininis šokoladas su jūsų įmonės logotipu. Premium korporatyvinės dovanos klientams, partneriams ir renginiams. Belgiškas šokoladas su personalizuotu spausdinamu.",
    path: "/lt",
  });

  return (
    <main className="bg-background">
      <section className="flex flex-col">
        <div className="relative bg-foreground py-16 sm:py-20 text-center">
          <div className="absolute top-4 right-4 z-10"><LanguageSwitcher /></div>
          <div className="container mx-auto">
            <div className="mx-auto mb-10 w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-white overflow-hidden flex items-center justify-center" style={{ boxShadow: "0 0 40px rgba(196,163,90,0.15), 0 0 80px rgba(0,0,0,0.3)" }}>
              <img src={logo} alt="Luxury Chocolate — eksklusivininis korporatyvinis šokoladas su logotipu" className="w-[85%] h-[85%] object-contain" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-[1.1] tracking-tight font-normal">
              {t.title1}<br /><span className="text-primary">{t.title2}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed tracking-wide font-normal">{t.subtitle}</p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{ boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)", letterSpacing: "0.12em" }}
            >
              {t.ctaButton}
            </button>
          </div>
        </div>
        <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
          <video autoPlay muted loop playsInline preload="none" poster="/video/hero-poster.webp" className="absolute inset-0 w-full h-full object-cover">
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <SeoContentSection lang="lt" />
      <QuickFactsSection lang="lt" />
      <ClientExamplesSection lang="lt" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="lt" />
      <HowToOrderSection lang="lt" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="lt" />
      <TrustSection lang="lt" />
      <ProductsSection lang="lt" />
      <FaqSection lang="lt" />
      <IdeasSection lang="lt" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="lt" />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default LtIndex;
