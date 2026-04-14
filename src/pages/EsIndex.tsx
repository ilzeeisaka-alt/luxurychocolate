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

const EsIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.es;

  useSeo({
    title: "Chocolate con logo & Regalos corporativos",
    description: "Regalos corporativos premium y chocolate personalizado con logo. Cajas de regalo exclusivas. Chocolate belga, producción rápida.",
    path: "/es",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="es" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="es" {...t} logoAlt="Luxury Chocolate — chocolate corporativo exclusivo con logo" />
      <SeoContentSection lang="es" />
      <QuickFactsSection lang="es" />
      <ClientExamplesSection lang="es" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="es" />
      <HowToOrderSection lang="es" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="es" />
      <TrustSection lang="es" />
      <ProductsSection lang="es" />
      <ShopSection lang="es" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="es" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="es" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="es" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="es" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="es" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="es" />
      <BookBoxSection lang="es" />
      <DailyChocolateSection lang="es" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="es" />
      <FaqSection lang="es" />
      <IdeasSection lang="es" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="es" />
      <ContactSection lang="es" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default EsIndex;
