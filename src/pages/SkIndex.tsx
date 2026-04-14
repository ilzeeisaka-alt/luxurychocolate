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

const SkIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.sk;

  useSeo({
    title: "Čokoláda s logom & Firemné darčeky",
    description: "Prémiové firemné darčeky a personalizovaná čokoláda s logom. Belgická čokoláda, rýchla výroba.",
    path: "/sk",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="sk" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="sk" {...t} logoAlt="Luxury Chocolate — exkluzívna firemná čokoláda s logom" />
      <SeoContentSection lang="sk" />
      <QuickFactsSection lang="sk" />
      <ClientExamplesSection lang="sk" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="sk" />
      <HowToOrderSection lang="sk" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="sk" />
      <TrustSection lang="sk" />
      <ProductsSection lang="sk" />
      <ShopSection lang="sk" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="sk" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="sk" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="sk" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="sk" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="sk" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="sk" />
      <BookBoxSection lang="sk" />
      <DailyChocolateSection lang="sk" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="sk" />
      <FaqSection lang="sk" />
      <IdeasSection lang="sk" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="sk" />
      <ContactSection lang="sk" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default SkIndex;
