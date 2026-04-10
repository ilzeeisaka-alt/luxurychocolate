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

const CsIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.cs;

  useSeo({
    title: "Čokoláda s logem & Firemní dárky",
    description: "Prémiové firemní dárky a personalizovaná čokoláda s logem. Belgická čokoláda, rychlá výroba.",
    path: "/cs",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="cs" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="cs" {...t} logoAlt="Luxury Chocolate — exkluzivní firemní čokoláda s logem" />
      <SeoContentSection lang="cs" />
      <QuickFactsSection lang="cs" />
      <ClientExamplesSection lang="cs" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="cs" />
      <HowToOrderSection lang="cs" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="cs" />
      <TrustSection lang="cs" />
      <ProductsSection lang="cs" />
      <ShopSection lang="cs" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="cs" />
      <DailyChocolateSection lang="cs" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="cs" />
      <FaqSection lang="cs" />
      <IdeasSection lang="cs" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="cs" />
      <ContactSection lang="cs" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default CsIndex;
