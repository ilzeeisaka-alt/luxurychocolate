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

const DeIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.de;

  useSeo({
    title: "Schokolade mit Logo & Firmengeschenke",
    description: "Premium Firmengeschenke und personalisierte Schokolade mit Logo. Exklusive Geschenkboxen für Unternehmen. Belgische Schokolade, schnelle Produktion.",
    path: "/de",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="de" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="de" {...t} logoAlt="Luxury Chocolate — exklusive Firmenschokolade mit Logo" />
      <SeoContentSection lang="de" />
      <QuickFactsSection lang="de" />
      <ClientExamplesSection lang="de" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="de" />
      <HowToOrderSection lang="de" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="de" />
      <TrustSection lang="de" />
      <ProductsSection lang="de" />
      <ShopSection lang="de" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="de" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="de" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="de" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="de" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang={<TableCardsSection lang="de" onCtaClick={() => setModalOpen(true)} />.match(/lang="([^"]+)"/)?.[1] || "lv"} onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="de" />
      <DailyChocolateSection lang="de" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="de" />
      <FaqSection lang="de" />
      <IdeasSection lang="de" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="de" />
      <ContactSection lang="de" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default DeIndex;
