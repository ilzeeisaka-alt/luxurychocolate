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

const FrIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.fr;

  useSeo({
    title: "Chocolat avec logo & Cadeaux d'entreprise",
    description: "Cadeaux d'entreprise premium et chocolat personnalisé avec logo. Coffrets cadeaux exclusifs. Chocolat belge, production rapide.",
    path: "/fr",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="fr" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="fr" {...t} logoAlt="Luxury Chocolate — chocolat d'entreprise exclusif avec logo" />
      <SeoContentSection lang="fr" />
      <QuickFactsSection lang="fr" />
      <ClientExamplesSection lang="fr" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="fr" />
      <HowToOrderSection lang="fr" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="fr" />
      <TrustSection lang="fr" />
      <ProductsSection lang="fr" />
      <ShopSection lang="fr" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="fr" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="fr" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="fr" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="fr" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="fr" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="fr" />
      <CoinsCardsSection lang="fr" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="fr" />
      <DailyChocolateSection lang="fr" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="fr" />
      <FaqSection lang="fr" />
      <IdeasSection lang="fr" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="fr" />
      <ContactSection lang="fr" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default FrIndex;
