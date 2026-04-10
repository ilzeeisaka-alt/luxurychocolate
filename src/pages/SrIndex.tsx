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

const SrIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.sr;

  useSeo({
    title: "Čokolada sa logom & Korporativni pokloni",
    description: "Premium korporativni pokloni i personalizovana čokolada sa logom. Belgijska čokolada, brza proizvodnja.",
    path: "/sr",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="sr" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="sr" {...t} logoAlt="Luxury Chocolate — ekskluzivna korporativna čokolada sa logom" />
      <SeoContentSection lang="sr" />
      <QuickFactsSection lang="sr" />
      <ClientExamplesSection lang="sr" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="sr" />
      <HowToOrderSection lang="sr" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="sr" />
      <TrustSection lang="sr" />
      <ProductsSection lang="sr" />
      <ShopSection lang="sr" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="sr" />
      <DailyChocolateSection lang="sr" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="sr" />
      <FaqSection lang="sr" />
      <IdeasSection lang="sr" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="sr" />
      <ContactSection lang="sr" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default SrIndex;
