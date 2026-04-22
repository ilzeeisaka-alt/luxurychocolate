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

const BeIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.be;

  useSeo({
    title: "Друк шакаладу і персаналізаваны шакалад з лагатыпам",
    description: "Друк шакаладу — поўнакаляровы друк прама на бельгійскім шакаладзе. Персаналізаваны шакалад з лагатыпам, карпаратыўныя падарункі.",
    path: "/be",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="be" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="be" {...t} logoAlt="Luxury Chocolate — эксклюзіўны карпаратыўны шакалад з лагатыпам" />

      <SeoContentSection lang="be" />
      <QuickFactsSection lang="be" />
      <ClientExamplesSection lang="be" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="be" />
      <HowToOrderSection lang="be" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="be" />
      <TrustSection lang="be" />
      <ProductsSection lang="be" />
      <ShopSection lang="be" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="be" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="be" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="be" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="be" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="be" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="be" />
      <CoinsCardsSection lang="be" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="be" />
      <DailyChocolateSection lang="be" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="be" />
      <FaqSection lang="be" />
      <IdeasSection lang="be" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="be" />
      <ContactSection lang="be" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default BeIndex;
