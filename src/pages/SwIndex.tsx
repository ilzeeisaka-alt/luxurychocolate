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

const SwIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.sw;

  useSeo({
    title: "Uchapishaji wa Chokoleti & Chokoleti ya Kibinafsi yenye Nembo",
    description: "Uchapishaji wa chokoleti — uchapishaji wa rangi kamili moja kwa moja kwenye chokoleti ya Ubelgiji. Chokoleti ya kibinafsi yenye nembo, zawadi za kampuni.",
    path: "/sw",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="sw" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="sw" {...t} logoAlt="Luxury Chocolate — chokoleti ya kipekee ya kampuni yenye nembo" />

      <SeoContentSection lang="sw" />
      <QuickFactsSection lang="sw" />
      <ClientExamplesSection lang="sw" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="sw" />
      <HowToOrderSection lang="sw" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="sw" />
      <TrustSection lang="sw" />
      <ProductsSection lang="sw" />
      <ShopSection lang="sw" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="sw" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="sw" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="sw" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="sw" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="sw" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="sw" />
      <CoinsCardsSection lang="sw" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="sw" />
      <DailyChocolateSection lang="sw" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="sw" />
      <FaqSection lang="sw" />
      <IdeasSection lang="sw" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="sw" />
      <ContactSection lang="sw" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default SwIndex;
