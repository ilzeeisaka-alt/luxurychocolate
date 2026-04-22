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

const AmIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.am;

  useSeo({
    title: "የቸኮሌት ህትመት እና ሎጎ ያለው ግላዊ ቸኮሌት",
    description: "የቸኮሌት ህትመት — በቤልጂየም ቸኮሌት ላይ ቀጥታ ሙሉ ቀለም ህትመት። ሎጎ ያለው ግላዊ ቸኮሌት፣ የኩባንያ ስጦታዎች።",
    path: "/am",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="am" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="am" {...t} logoAlt="Luxury Chocolate — ሎጎ ያለው ልዩ የኩባንያ ቸኮሌት" />

      <SeoContentSection lang="am" />
      <QuickFactsSection lang="am" />
      <ClientExamplesSection lang="am" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="am" />
      <HowToOrderSection lang="am" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="am" />
      <TrustSection lang="am" />
      <ProductsSection lang="am" />
      <ShopSection lang="am" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="am" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="am" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="am" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="am" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="am" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="am" />
      <CoinsCardsSection lang="am" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="am" />
      <DailyChocolateSection lang="am" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="am" />
      <FaqSection lang="am" />
      <IdeasSection lang="am" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="am" />
      <ContactSection lang="am" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default AmIndex;
