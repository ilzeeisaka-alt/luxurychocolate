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

const NlIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.nl;

  useSeo({
    title: "Chocolade met logo & Zakelijke geschenken",
    description: "Premium zakelijke geschenken en gepersonaliseerde chocolade met logo. Exclusieve geschenksets. Belgische chocolade, snelle productie.",
    path: "/nl",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="nl" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="nl" {...t} logoAlt="Luxury Chocolate — exclusieve zakelijke chocolade met logo" />
      <SeoContentSection lang="nl" />
      <QuickFactsSection lang="nl" />
      <ClientExamplesSection lang="nl" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="nl" />
      <HowToOrderSection lang="nl" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="nl" />
      <TrustSection lang="nl" />
      <ProductsSection lang="nl" />
      <ShopSection lang="nl" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="nl" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="nl" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="nl" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="nl" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="nl" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="nl" />
      <DailyChocolateSection lang="nl" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="nl" />
      <FaqSection lang="nl" />
      <IdeasSection lang="nl" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="nl" />
      <ContactSection lang="nl" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default NlIndex;
