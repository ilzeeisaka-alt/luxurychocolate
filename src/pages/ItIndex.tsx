import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
import RestaurantChocolateSection from "@/components/RestaurantChocolateSection";
import DailyChocolateSection from "@/components/DailyChocolateSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const ItIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.it;

  useSeo({
    title: "Cioccolato con logo & Regali aziendali",
    description: "Regali aziendali premium e cioccolato personalizzato con logo. Confezioni regalo esclusive. Cioccolato belga, produzione rapida.",
    path: "/it",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="it" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="it" {...t} logoAlt="Luxury Chocolate — cioccolato aziendale esclusivo con logo" />
      <SeoContentSection lang="it" />
      <QuickFactsSection lang="it" />
      <ClientExamplesSection lang="it" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="it" />
      <HowToOrderSection lang="it" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="it" />
      <TrustSection lang="it" />
      <ProductsSection lang="it" />
      <ShopSection lang="it" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="it" />
      <DailyChocolateSection lang="it" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="it" />
      <FaqSection lang="it" />
      <IdeasSection lang="it" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="it" />
      <ContactSection lang="it" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default ItIndex;
