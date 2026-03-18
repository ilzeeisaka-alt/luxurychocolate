import { useState } from "react";
import logo from "@/assets/logo-transparent.png";
import Navbar from "@/components/Navbar";
import SeoContentSection from "@/components/SeoContentSection";
import QuickFactsSection from "@/components/QuickFactsSection";
import ClientExamplesSection from "@/components/ClientExamplesSection";
import UseCasesSection from "@/components/UseCasesSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import FreePreviewSection from "@/components/FreePreviewSection";
import TrustSection from "@/components/TrustSection";
import ProductsSection from "@/components/ProductsSection";
import BookBoxSection from "@/components/BookBoxSection";
import FaqSection from "@/components/FaqSection";
import IdeasSection from "@/components/IdeasSection";
import RelatedPagesSection from "@/components/RelatedPagesSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";
import ShopSection from "@/components/ShopSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const EnIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.en;

  useSeo({
    title: "Custom Chocolate with Logo | Premium Corporate Gifts",
    description: "Exclusive custom chocolate with your company logo. Premium corporate gifts for clients, partners and events. Belgian chocolate with personalized printing.",
    path: "/en",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="en" />
      <section className="flex flex-col">
        <div className="relative bg-foreground py-16 sm:py-20 text-center">
          <div className="container mx-auto">
            <div className="mx-auto mb-10 w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-white overflow-hidden flex items-center justify-center" style={{ boxShadow: "0 0 40px rgba(196,163,90,0.15), 0 0 80px rgba(0,0,0,0.3)" }}>
              <img src={logo} alt="Luxury Chocolate — custom corporate chocolate with logo" className="w-[85%] h-[85%] object-contain" />
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

      <SeoContentSection lang="en" />
      <QuickFactsSection lang="en" />
      <ClientExamplesSection lang="en" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="en" />
      <HowToOrderSection lang="en" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="en" />
      <TrustSection lang="en" />
      <ProductsSection lang="en" />
      <BookBoxSection lang="en" />
      <FaqSection lang="en" />
      <IdeasSection lang="en" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="en" />
      <ContactSection lang="en" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default EnIndex;
