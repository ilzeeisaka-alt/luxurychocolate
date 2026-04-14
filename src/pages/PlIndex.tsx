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

const PlIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.pl;

  useSeo({
    title: "Czekolada z logo & Prezenty firmowe",
    description: "Ekskluzywne prezenty firmowe i spersonalizowana czekolada z logo. Belgijska czekolada, szybka produkcja.",
    path: "/pl",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="pl" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="pl" {...t} logoAlt="Luxury Chocolate — ekskluzywna czekolada firmowa z logo" />
      <SeoContentSection lang="pl" />
      <QuickFactsSection lang="pl" />
      <ClientExamplesSection lang="pl" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="pl" />
      <HowToOrderSection lang="pl" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="pl" />
      <TrustSection lang="pl" />
      <ProductsSection lang="pl" />
      <ShopSection lang="pl" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="pl" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="pl" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="pl" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="pl" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="pl" />
      <DailyChocolateSection lang="pl" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="pl" />
      <FaqSection lang="pl" />
      <IdeasSection lang="pl" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="pl" />
      <ContactSection lang="pl" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default PlIndex;
