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

const NoIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.no;

  useSeo({
    title: "Sjokolade med logo & Bedriftsgaver",
    description: "Premium bedriftsgaver og personlig sjokolade med logo. Eksklusive gavesett for bedrifter. Belgisk sjokolade, rask produksjon, bestillinger fra 1 stk.",
    path: "/no",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="no" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="no" {...t} logoAlt="Luxury Chocolate — eksklusiv bedriftssjokolade med logo" />

      <SeoContentSection lang="no" />
      <QuickFactsSection lang="no" />
      <ClientExamplesSection lang="no" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="no" />
      <HowToOrderSection lang="no" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="no" />
      <TrustSection lang="no" />
      <ProductsSection lang="no" />
      <ShopSection lang="no" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="no" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="no" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="no" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="no" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="no" />
      <DailyChocolateSection lang="no" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="no" />
      <FaqSection lang="no" />
      <IdeasSection lang="no" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="no" />
      <ContactSection lang="no" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default NoIndex;
