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

const MsIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.ms;

  useSeo({
    title: "Cetakan Coklat & Coklat Diperibadikan dengan Logo",
    description: "Cetakan coklat — cetakan warna penuh terus pada coklat Belgium. Coklat diperibadikan dengan logo, hadiah korporat.",
    path: "/ms",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="ms" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="ms" {...t} logoAlt="Luxury Chocolate — coklat korporat eksklusif dengan logo" />

      <SeoContentSection lang="ms" />
      <QuickFactsSection lang="ms" />
      <ClientExamplesSection lang="ms" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="ms" />
      <HowToOrderSection lang="ms" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ms" />
      <TrustSection lang="ms" />
      <ProductsSection lang="ms" />
      <ShopSection lang="ms" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="ms" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="ms" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="ms" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="ms" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="ms" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="ms" />
      <CoinsCardsSection lang="ms" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="ms" />
      <DailyChocolateSection lang="ms" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="ms" />
      <FaqSection lang="ms" />
      <IdeasSection lang="ms" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="ms" />
      <ContactSection lang="ms" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default MsIndex;
