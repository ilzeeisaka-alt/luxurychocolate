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

const MkIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.mk;

  useSeo({
    title: "Чоколадо со лого & Корпоративни подароци",
    description: "Премиум корпоративни подароци и персонализирано чоколадо со лого. Белгиско чоколадо, брза продукција.",
    path: "/mk",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="mk" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="mk" {...t} logoAlt="Luxury Chocolate — ексклузивно корпоративно чоколадо со лого" />
      <SeoContentSection lang="mk" />
      <QuickFactsSection lang="mk" />
      <ClientExamplesSection lang="mk" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="mk" />
      <HowToOrderSection lang="mk" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="mk" />
      <TrustSection lang="mk" />
      <ProductsSection lang="mk" />
      <ShopSection lang="mk" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="mk" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="mk" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="mk" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="mk" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang={<TableCardsSection lang="mk" onCtaClick={() => setModalOpen(true)} />.match(/lang="([^"]+)"/)?.[1] || "lv"} onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="mk" />
      <DailyChocolateSection lang="mk" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="mk" />
      <FaqSection lang="mk" />
      <IdeasSection lang="mk" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="mk" />
      <ContactSection lang="mk" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default MkIndex;
