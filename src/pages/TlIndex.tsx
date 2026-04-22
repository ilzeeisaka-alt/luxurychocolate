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

const TlIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.tl;

  useSeo({
    title: "Pagpi-print ng Tsokolate & Personalized Tsokolate na may Logo",
    description: "Pagpi-print ng tsokolate — full-color print direkta sa Belgian tsokolate. Personalized tsokolate na may logo, mga regalo sa korporasyon.",
    path: "/tl",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="tl" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="tl" {...t} logoAlt="Luxury Chocolate — eksklusibong korporasyon tsokolate na may logo" />

      <SeoContentSection lang="tl" />
      <QuickFactsSection lang="tl" />
      <ClientExamplesSection lang="tl" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="tl" />
      <HowToOrderSection lang="tl" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="tl" />
      <TrustSection lang="tl" />
      <ProductsSection lang="tl" />
      <ShopSection lang="tl" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="tl" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="tl" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="tl" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="tl" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="tl" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="tl" />
      <CoinsCardsSection lang="tl" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="tl" />
      <DailyChocolateSection lang="tl" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="tl" />
      <FaqSection lang="tl" />
      <IdeasSection lang="tl" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="tl" />
      <ContactSection lang="tl" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default TlIndex;
