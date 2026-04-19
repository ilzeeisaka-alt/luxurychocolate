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

const DaIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.da;

  useSeo({
    title: "Chokolade med logo & Firmagaver",
    description: "Premium firmagaver og personlig chokolade med logo. Eksklusive gaveæsker til virksomheder. Belgisk chokolade, hurtig produktion, bestillinger fra 1 stk.",
    path: "/da",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="da" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="da" {...t} logoAlt="Luxury Chocolate — eksklusiv firmachokolade med logo" />

      <SeoContentSection lang="da" />
      <QuickFactsSection lang="da" />
      <ClientExamplesSection lang="da" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="da" />
      <HowToOrderSection lang="da" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="da" />
      <TrustSection lang="da" />
      <ProductsSection lang="da" />
      <ShopSection lang="da" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="da" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="da" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="da" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="da" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="da" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="da" />
      <CoinsCardsSection lang="da" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="da" />
      <DailyChocolateSection lang="da" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="da" />
      <FaqSection lang="da" />
      <IdeasSection lang="da" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="da" />
      <ContactSection lang="da" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default DaIndex;
