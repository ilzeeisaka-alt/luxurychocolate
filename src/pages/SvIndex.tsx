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

const SvIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.sv;

  useSeo({
    title: "Choklad med logotyp & Företagspresenter",
    description: "Premium företagspresenter och personlig choklad med logotyp. Exklusiva presentförpackningar för företag. Belgisk choklad, snabb produktion, beställningar från 1 st.",
    path: "/sv",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="sv" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="sv" {...t} logoAlt="Luxury Chocolate — exklusiv företagschoklad med logotyp" />

      <SeoContentSection lang="sv" />
      <QuickFactsSection lang="sv" />
      <ClientExamplesSection lang="sv" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="sv" />
      <HowToOrderSection lang="sv" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="sv" />
      <TrustSection lang="sv" />
      <ProductsSection lang="sv" />
      <ShopSection lang="sv" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="sv" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="sv" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="sv" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="sv" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="sv" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="sv" />
      <CoinsCardsSection lang="sv" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="sv" />
      <DailyChocolateSection lang="sv" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="sv" />
      <FaqSection lang="sv" />
      <IdeasSection lang="sv" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="sv" />
      <ContactSection lang="sv" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default SvIndex;
