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

const KoIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.ko;

  useSeo({
    title: "초콜릿 인쇄 및 로고가 있는 맞춤 초콜릿",
    description: "초콜릿 인쇄 — 벨기에 초콜릿에 직접 풀컬러 인쇄. 로고가 있는 맞춤 초콜릿, 기업 선물. 1개부터 주문 가능.",
    path: "/ko",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="ko" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="ko" {...t} logoAlt="Luxury Chocolate — 로고가 있는 독점 기업 초콜릿" />

      <SeoContentSection lang="ko" />
      <QuickFactsSection lang="ko" />
      <ClientExamplesSection lang="ko" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="ko" />
      <HowToOrderSection lang="ko" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ko" />
      <TrustSection lang="ko" />
      <ProductsSection lang="ko" />
      <ShopSection lang="ko" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="ko" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="ko" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="ko" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="ko" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="ko" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="ko" />
      <CoinsCardsSection lang="ko" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="ko" />
      <DailyChocolateSection lang="ko" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="ko" />
      <FaqSection lang="ko" />
      <IdeasSection lang="ko" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="ko" />
      <ContactSection lang="ko" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default KoIndex;
