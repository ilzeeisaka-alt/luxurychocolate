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

const UrIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.ur;

  useSeo({
    title: "چاکلیٹ پرنٹنگ اور لوگو کے ساتھ ذاتی چاکلیٹ",
    description: "چاکلیٹ پرنٹنگ — بیلجیئم چاکلیٹ پر براہ راست فل کلر پرنٹ۔ لوگو کے ساتھ ذاتی چاکلیٹ، کارپوریٹ تحائف۔",
    path: "/ur",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="ur" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="ur" {...t} logoAlt="Luxury Chocolate — لوگو کے ساتھ خصوصی کارپوریٹ چاکلیٹ" />

      <SeoContentSection lang="ur" />
      <QuickFactsSection lang="ur" />
      <ClientExamplesSection lang="ur" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="ur" />
      <HowToOrderSection lang="ur" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ur" />
      <TrustSection lang="ur" />
      <ProductsSection lang="ur" />
      <ShopSection lang="ur" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="ur" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="ur" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="ur" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="ur" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="ur" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="ur" />
      <CoinsCardsSection lang="ur" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="ur" />
      <DailyChocolateSection lang="ur" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="ur" />
      <FaqSection lang="ur" />
      <IdeasSection lang="ur" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="ur" />
      <ContactSection lang="ur" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default UrIndex;
