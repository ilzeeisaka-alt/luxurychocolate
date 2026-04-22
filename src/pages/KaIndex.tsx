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

const KaIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.ka;

  useSeo({
    title: "შოკოლადის ბეჭდვა და პერსონალური შოკოლადი ლოგოთი",
    description: "შოკოლადის ბეჭდვა — სრული ფერის ბეჭდვა პირდაპირ ბელგიურ შოკოლადზე. პერსონალური შოკოლადი ლოგოთი, კორპორატიული საჩუქრები.",
    path: "/ka",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="ka" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="ka" {...t} logoAlt="Luxury Chocolate — ექსკლუზიური კორპორატიული შოკოლადი ლოგოთი" />

      <SeoContentSection lang="ka" />
      <QuickFactsSection lang="ka" />
      <ClientExamplesSection lang="ka" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="ka" />
      <HowToOrderSection lang="ka" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ka" />
      <TrustSection lang="ka" />
      <ProductsSection lang="ka" />
      <ShopSection lang="ka" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="ka" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="ka" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="ka" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="ka" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="ka" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="ka" />
      <CoinsCardsSection lang="ka" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="ka" />
      <DailyChocolateSection lang="ka" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="ka" />
      <FaqSection lang="ka" />
      <IdeasSection lang="ka" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="ka" />
      <ContactSection lang="ka" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default KaIndex;
