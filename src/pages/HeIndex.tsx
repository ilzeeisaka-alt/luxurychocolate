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

const HeIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.he;

  useSeo({
    title: "הדפסת שוקולד ושוקולד מותאם אישית עם לוגו",
    description: "הדפסת שוקולד — הדפסה צבעונית מלאה ישירות על שוקולד בלגי. שוקולד מותאם אישית עם לוגו, מתנות עסקיות.",
    path: "/he",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="he" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="he" {...t} logoAlt="Luxury Chocolate — שוקולד עסקי בלעדי עם לוגו" />

      <SeoContentSection lang="he" />
      <QuickFactsSection lang="he" />
      <ClientExamplesSection lang="he" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="he" />
      <HowToOrderSection lang="he" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="he" />
      <TrustSection lang="he" />
      <ProductsSection lang="he" />
      <ShopSection lang="he" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="he" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="he" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="he" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="he" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="he" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="he" />
      <CoinsCardsSection lang="he" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="he" />
      <DailyChocolateSection lang="he" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="he" />
      <FaqSection lang="he" />
      <IdeasSection lang="he" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="he" />
      <ContactSection lang="he" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default HeIndex;
