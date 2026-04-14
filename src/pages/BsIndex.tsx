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
import VipGiftSection from "@/components/VipGiftSection";
import SouvenirSection from "@/components/SouvenirSection";
import CienastsSection from "@/components/CienastsSection";
import TableCardsSection from "@/components/TableCardsSection";
import CelebrationCakeSection from "@/components/CelebrationCakeSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const BsIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.bs;

  useSeo({
    title: "Čokolada sa logom & Korporativni pokloni",
    description: "Premium korporativni pokloni i personalizirana čokolada sa logom. Belgijska čokolada, brza proizvodnja.",
    path: "/bs",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="bs" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="bs" {...t} logoAlt="Luxury Chocolate — ekskluzivna korporativna čokolada sa logom" />
      <SeoContentSection lang="bs" />
      <QuickFactsSection lang="bs" />
      <ClientExamplesSection lang="bs" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="bs" />
      <HowToOrderSection lang="bs" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="bs" />
      <TrustSection lang="bs" />
      <ProductsSection lang="bs" />
      <ShopSection lang="bs" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="bs" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="bs" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="bs" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="bs" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="bs" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="bs" />
      <DailyChocolateSection lang="bs" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="bs" />
      <FaqSection lang="bs" />
      <IdeasSection lang="bs" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="bs" />
      <ContactSection lang="bs" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default BsIndex;
