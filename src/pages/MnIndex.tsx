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

const MnIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.mn;

  useSeo({
    title: "Шоколадан хэвлэл ба захиалгат лого шоколад",
    description: "Шоколадан хэвлэл — Бельгийн шоколад дээр өнгөт хэвлэл. Лого бүхий захиалгат шоколад, корпорацийн бэлэг. 1 ширхэгээс захиалга.",
    path: "/mn",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="mn" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="mn" {...t} logoAlt="Luxury Chocolate — Логотой онцгой корпорацийн шоколад" />
      <SeoContentSection lang="mn" />
      <QuickFactsSection lang="mn" />
      <ClientExamplesSection lang="mn" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="mn" />
      <HowToOrderSection lang="mn" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="mn" />
      <TrustSection lang="mn" />
      <ProductsSection lang="mn" />
      <ShopSection lang="mn" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="mn" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="mn" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="mn" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="mn" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="mn" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="mn" />
      <CoinsCardsSection lang="mn" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="mn" />
      <DailyChocolateSection lang="mn" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="mn" />
      <FaqSection lang="mn" />
      <IdeasSection lang="mn" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="mn" />
      <ContactSection lang="mn" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default MnIndex;
