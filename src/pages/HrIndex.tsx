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
import MagnetBoxSection from "@/components/MagnetBoxSection";
import CoinsCardsSection from "@/components/CoinsCardsSection";
import FaqSection from "@/components/FaqSection";
import IdeasSection from "@/components/IdeasSection";
import RelatedPagesSection from "@/components/RelatedPagesSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";
import ShopSection from "@/components/ShopSection";
import RestaurantChocolateSection from "@/components/RestaurantChocolateSection";
import DailyChocolateSection from "@/components/DailyChocolateSection";
import VipGiftSection from "@/components/VipGiftSection";
import SouvenirSection from "@/components/SouvenirSection";
import CienastsSection from "@/components/CienastsSection";
import TableCardsSection from "@/components/TableCardsSection";
import CelebrationCakeSection from "@/components/CelebrationCakeSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const HrIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.hr;

  useSeo({
    title: "Čokolada s logom & Korporativni darovi",
    description: "Premium korporativni darovi i personalizirana čokolada s logom. Belgijska čokolada, brza proizvodnja.",
    path: "/hr",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="hr" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="hr" {...t} logoAlt="Luxury Chocolate — ekskluzivna korporativna čokolada s logom" />
      <SeoContentSection lang="hr" />
      <QuickFactsSection lang="hr" />
      <ClientExamplesSection lang="hr" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="hr" />
      <HowToOrderSection lang="hr" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="hr" />
      <TrustSection lang="hr" />
      <ProductsSection lang="hr" />
      <ShopSection lang="hr" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="hr" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="hr" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="hr" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="hr" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="hr" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="hr" />
      <CoinsCardsSection lang="hr" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="hr" />
      <DailyChocolateSection lang="hr" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="hr" />
      <FaqSection lang="hr" />
      <IdeasSection lang="hr" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="hr" />
      <ContactSection lang="hr" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default HrIndex;
