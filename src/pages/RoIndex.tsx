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

const RoIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.ro;

  useSeo({
    title: "Ciocolată cu logo & Cadouri corporative",
    description: "Cadouri corporative premium și ciocolată personalizată cu logo. Ciocolată belgiană, producție rapidă.",
    path: "/ro",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="ro" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="ro" {...t} logoAlt="Luxury Chocolate — ciocolată corporativă exclusivă cu logo" />
      <SeoContentSection lang="ro" />
      <QuickFactsSection lang="ro" />
      <ClientExamplesSection lang="ro" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="ro" />
      <HowToOrderSection lang="ro" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ro" />
      <TrustSection lang="ro" />
      <ProductsSection lang="ro" />
      <ShopSection lang="ro" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="ro" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="ro" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="ro" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="ro" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="ro" />
      <DailyChocolateSection lang="ro" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="ro" />
      <FaqSection lang="ro" />
      <IdeasSection lang="ro" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="ro" />
      <ContactSection lang="ro" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default RoIndex;
