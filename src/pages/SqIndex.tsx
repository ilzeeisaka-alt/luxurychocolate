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
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const SqIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.sq;

  useSeo({
    title: "Çokollatë me logo & Dhurata korporative",
    description: "Dhurata korporative premium dhe çokollatë e personalizuar me logo. Çokollatë belge, prodhim i shpejtë.",
    path: "/sq",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="sq" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="sq" {...t} logoAlt="Luxury Chocolate — çokollatë ekskluzive korporative me logo" />
      <SeoContentSection lang="sq" />
      <QuickFactsSection lang="sq" />
      <ClientExamplesSection lang="sq" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="sq" />
      <HowToOrderSection lang="sq" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="sq" />
      <TrustSection lang="sq" />
      <ProductsSection lang="sq" />
      <ShopSection lang="sq" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="sq" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="sq" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="sq" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="sq" />
      <DailyChocolateSection lang="sq" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="sq" />
      <FaqSection lang="sq" />
      <IdeasSection lang="sq" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="sq" />
      <ContactSection lang="sq" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default SqIndex;
