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

const RuIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.ru;

  useSeo({
    title: "Шоколад с логотипом & Корпоративные подарки",
    description: "Премиум корпоративные подарки и персонализированный шоколад с логотипом. Эксклюзивные подарочные наборы для компаний. Бельгийский шоколад, быстрое изготовление, заказы от 1 шт.",
    path: "/ru",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="ru" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="ru" {...t} logoAlt="Luxury Chocolate — эксклюзивный корпоративный шоколад с логотипом" />

      <SeoContentSection lang="ru" />
      <QuickFactsSection lang="ru" />
      <ClientExamplesSection lang="ru" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="ru" />
      <HowToOrderSection lang="ru" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ru" />
      <TrustSection lang="ru" />
      <ProductsSection lang="ru" />
      <ShopSection lang="ru" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="ru" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="ru" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="ru" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="ru" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="ru" />
      <DailyChocolateSection lang="ru" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="ru" />
      <FaqSection lang="ru" />
      <IdeasSection lang="ru" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="ru" />
      <ContactSection lang="ru" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default RuIndex;
