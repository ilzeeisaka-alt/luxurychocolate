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

const PtIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.pt;

  useSeo({
    title: "Chocolate com logo & Presentes corporativos",
    description: "Presentes corporativos premium e chocolate personalizado com logo. Chocolate belga, produção rápida.",
    path: "/pt",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="pt" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="pt" {...t} logoAlt="Luxury Chocolate — chocolate corporativo exclusivo com logo" />
      <SeoContentSection lang="pt" />
      <QuickFactsSection lang="pt" />
      <ClientExamplesSection lang="pt" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="pt" />
      <HowToOrderSection lang="pt" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="pt" />
      <TrustSection lang="pt" />
      <ProductsSection lang="pt" />
      <ShopSection lang="pt" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="pt" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="pt" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="pt" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="pt" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="pt" />
      <DailyChocolateSection lang="pt" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="pt" />
      <FaqSection lang="pt" />
      <IdeasSection lang="pt" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="pt" />
      <ContactSection lang="pt" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default PtIndex;
