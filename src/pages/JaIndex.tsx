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

const JaIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.ja;

  useSeo({
    title: "チョコレート印刷とロゴ入りパーソナライズチョコレート",
    description: "チョコレート印刷 — ベルギーチョコレートに直接フルカラー印刷。ロゴ入りパーソナライズチョコレート、企業ギフト。1個からご注文可能。",
    path: "/ja",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="ja" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="ja" {...t} logoAlt="Luxury Chocolate — ロゴ入り独占企業チョコレート" />

      <SeoContentSection lang="ja" />
      <QuickFactsSection lang="ja" />
      <ClientExamplesSection lang="ja" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="ja" />
      <HowToOrderSection lang="ja" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ja" />
      <TrustSection lang="ja" />
      <ProductsSection lang="ja" />
      <ShopSection lang="ja" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="ja" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="ja" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="ja" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="ja" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="ja" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="ja" />
      <CoinsCardsSection lang="ja" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="ja" />
      <DailyChocolateSection lang="ja" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="ja" />
      <FaqSection lang="ja" />
      <IdeasSection lang="ja" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="ja" />
      <ContactSection lang="ja" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default JaIndex;
