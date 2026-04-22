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

const FaIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.fa;

  useSeo({
    title: "چاپ شکلات و شکلات شخصی‌سازی شده با لوگو",
    description: "چاپ شکلات — چاپ تمام رنگی مستقیم بر روی شکلات بلژیکی. شکلات شخصی‌سازی شده با لوگو، هدایای شرکتی.",
    path: "/fa",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="fa" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="fa" {...t} logoAlt="Luxury Chocolate — شکلات شرکتی انحصاری با لوگو" />

      <SeoContentSection lang="fa" />
      <QuickFactsSection lang="fa" />
      <ClientExamplesSection lang="fa" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="fa" />
      <HowToOrderSection lang="fa" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="fa" />
      <TrustSection lang="fa" />
      <ProductsSection lang="fa" />
      <ShopSection lang="fa" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="fa" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="fa" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="fa" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="fa" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="fa" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="fa" />
      <CoinsCardsSection lang="fa" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="fa" />
      <DailyChocolateSection lang="fa" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="fa" />
      <FaqSection lang="fa" />
      <IdeasSection lang="fa" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="fa" />
      <ContactSection lang="fa" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default FaIndex;
