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

const EtIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.et;

  useSeo({
    title: "Šokolaad logoga & Korporatiivsed kingitused",
    description: "Premium korporatiivsed kingitused ja personaliseeritud šokolaad logoga. Eksklusiivsed kinkekomplektid ettevõtetele. Belgia šokolaad, kiire valmistamine, tellimused alates 1 tk.",
    path: "/et",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="et" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="et" {...t} logoAlt="Luxury Chocolate — eksklusiivne korporatiivne šokolaad logoga" />

      <SeoContentSection lang="et" />
      <QuickFactsSection lang="et" />
      <ClientExamplesSection lang="et" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="et" />
      <HowToOrderSection lang="et" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="et" />
      <TrustSection lang="et" />
      <ProductsSection lang="et" />
      <ShopSection lang="et" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="et" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="et" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="et" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="et" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="et" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="et" />
      <BookBoxSection lang="et" />
      <DailyChocolateSection lang="et" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="et" />
      <FaqSection lang="et" />
      <IdeasSection lang="et" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="et" />
      <ContactSection lang="et" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default EtIndex;
