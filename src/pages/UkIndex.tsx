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
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const UkIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.uk;

  useSeo({
    title: "Шоколад з логотипом & Корпоративні подарунки",
    description: "Преміум корпоративні подарунки та персоналізований шоколад з логотипом. Бельгійський шоколад, швидке виробництво.",
    path: "/uk",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="uk" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="uk" {...t} logoAlt="Luxury Chocolate — ексклюзивний корпоративний шоколад з логотипом" />
      <SeoContentSection lang="uk" />
      <QuickFactsSection lang="uk" />
      <ClientExamplesSection lang="uk" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="uk" />
      <HowToOrderSection lang="uk" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="uk" />
      <TrustSection lang="uk" />
      <ProductsSection lang="uk" />
      <ShopSection lang="uk" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="uk" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="uk" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="uk" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="uk" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="uk" />
      <DailyChocolateSection lang="uk" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="uk" />
      <FaqSection lang="uk" />
      <IdeasSection lang="uk" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="uk" />
      <ContactSection lang="uk" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default UkIndex;
