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

const ZhIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.zh;

  useSeo({
    title: "巧克力印刷与定制徽标巧克力",
    description: "巧克力印刷 — 直接在比利时巧克力上进行全彩印刷。带徽标的定制巧克力，企业礼品。订购量从1件起。",
    path: "/zh",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="zh" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="zh" {...t} logoAlt="Luxury Chocolate — 带徽标的独家企业巧克力" />

      <SeoContentSection lang="zh" />
      <QuickFactsSection lang="zh" />
      <ClientExamplesSection lang="zh" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="zh" />
      <HowToOrderSection lang="zh" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="zh" />
      <TrustSection lang="zh" />
      <ProductsSection lang="zh" />
      <ShopSection lang="zh" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="zh" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="zh" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="zh" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="zh" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="zh" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="zh" />
      <CoinsCardsSection lang="zh" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="zh" />
      <DailyChocolateSection lang="zh" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="zh" />
      <FaqSection lang="zh" />
      <IdeasSection lang="zh" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="zh" />
      <ContactSection lang="zh" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default ZhIndex;
