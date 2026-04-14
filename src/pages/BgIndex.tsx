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
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const BgIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.bg;

  useSeo({
    title: "Шоколад с лого & Корпоративни подаръци",
    description: "Премиум корпоративни подаръци и персонализиран шоколад с лого. Белгийски шоколад, бърза продукция.",
    path: "/bg",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="bg" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="bg" {...t} logoAlt="Luxury Chocolate — ексклузивен корпоративен шоколад с лого" />
      <SeoContentSection lang="bg" />
      <QuickFactsSection lang="bg" />
      <ClientExamplesSection lang="bg" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="bg" />
      <HowToOrderSection lang="bg" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="bg" />
      <TrustSection lang="bg" />
      <ProductsSection lang="bg" />
      <ShopSection lang="bg" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="bg" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="bg" />
      <DailyChocolateSection lang="bg" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="bg" />
      <FaqSection lang="bg" />
      <IdeasSection lang="bg" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="bg" />
      <ContactSection lang="bg" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default BgIndex;
