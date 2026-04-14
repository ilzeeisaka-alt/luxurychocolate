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

const SlIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.sl;

  useSeo({
    title: "Čokolada z logotipom & Poslovna darila",
    description: "Premium poslovna darila in personalizirana čokolada z logotipom. Belgijska čokolada, hitra proizvodnja.",
    path: "/sl",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="sl" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="sl" {...t} logoAlt="Luxury Chocolate — ekskluzivna poslovna čokolada z logotipom" />
      <SeoContentSection lang="sl" />
      <QuickFactsSection lang="sl" />
      <ClientExamplesSection lang="sl" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="sl" />
      <HowToOrderSection lang="sl" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="sl" />
      <TrustSection lang="sl" />
      <ProductsSection lang="sl" />
      <ShopSection lang="sl" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="sl" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="sl" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="sl" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="sl" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="sl" />
      <DailyChocolateSection lang="sl" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="sl" />
      <FaqSection lang="sl" />
      <IdeasSection lang="sl" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="sl" />
      <ContactSection lang="sl" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default SlIndex;
