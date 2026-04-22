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

const HyIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.hy;

  useSeo({
    title: "Շոկոլադի տպագրություն և լոգոյով անհատականացված շոկոլադ",
    description: "Շոկոլադի տպագրություն — ամբողջական գույնի տպագրություն ուղղակիորեն բելգիական շոկոլադի վրա։ Լոգոյով անհատականացված շոկոլադ, կորպորատիվ նվերներ։",
    path: "/hy",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="hy" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="hy" {...t} logoAlt="Luxury Chocolate — բացառիկ կորպորատիվ շոկոլադ լոգոյով" />

      <SeoContentSection lang="hy" />
      <QuickFactsSection lang="hy" />
      <ClientExamplesSection lang="hy" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="hy" />
      <HowToOrderSection lang="hy" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="hy" />
      <TrustSection lang="hy" />
      <ProductsSection lang="hy" />
      <ShopSection lang="hy" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="hy" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="hy" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="hy" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="hy" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="hy" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="hy" />
      <CoinsCardsSection lang="hy" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="hy" />
      <DailyChocolateSection lang="hy" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="hy" />
      <FaqSection lang="hy" />
      <IdeasSection lang="hy" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="hy" />
      <ContactSection lang="hy" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default HyIndex;
