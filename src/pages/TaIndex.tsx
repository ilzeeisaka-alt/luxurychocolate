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

const TaIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.ta;

  useSeo({
    title: "சாக்லேட் அச்சு மற்றும் தனிப்பயன் லோகோ சாக்லேட்",
    description: "சாக்லேட் அச்சு — பெல்ஜிய சாக்லேட்டில் முழு வண்ண அச்சு. லோகோவுடன் தனிப்பயன் சாக்லேட், கார்ப்பரேட் பரிசுகள். 1 துண்டிலிருந்து ஆர்டர்.",
    path: "/ta",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="ta" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="ta" {...t} logoAlt="Luxury Chocolate — லோகோவுடன் பிரத்யேக கார்ப்பரேட் சாக்லேட்" />
      <SeoContentSection lang="ta" />
      <QuickFactsSection lang="ta" />
      <ClientExamplesSection lang="ta" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="ta" />
      <HowToOrderSection lang="ta" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ta" />
      <TrustSection lang="ta" />
      <ProductsSection lang="ta" />
      <ShopSection lang="ta" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="ta" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="ta" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="ta" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="ta" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="ta" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="ta" />
      <CoinsCardsSection lang="ta" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="ta" />
      <DailyChocolateSection lang="ta" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="ta" />
      <FaqSection lang="ta" />
      <IdeasSection lang="ta" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="ta" />
      <ContactSection lang="ta" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default TaIndex;
