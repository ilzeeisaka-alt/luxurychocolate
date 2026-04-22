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

const ViIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.vi;

  useSeo({
    title: "In sô cô la & Sô cô la cá nhân hóa với logo",
    description: "In sô cô la — in đủ màu trực tiếp trên sô cô la Bỉ. Sô cô la cá nhân hóa với logo, quà tặng doanh nghiệp.",
    path: "/vi",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="vi" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="vi" {...t} logoAlt="Luxury Chocolate — sô cô la doanh nghiệp độc quyền với logo" />

      <SeoContentSection lang="vi" />
      <QuickFactsSection lang="vi" />
      <ClientExamplesSection lang="vi" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="vi" />
      <HowToOrderSection lang="vi" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="vi" />
      <TrustSection lang="vi" />
      <ProductsSection lang="vi" />
      <ShopSection lang="vi" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="vi" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="vi" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="vi" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="vi" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="vi" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="vi" />
      <CoinsCardsSection lang="vi" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="vi" />
      <DailyChocolateSection lang="vi" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="vi" />
      <FaqSection lang="vi" />
      <IdeasSection lang="vi" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="vi" />
      <ContactSection lang="vi" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default ViIndex;
