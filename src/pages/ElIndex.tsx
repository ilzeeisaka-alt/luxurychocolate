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

const ElIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.el;

  useSeo({
    title: "Σοκολάτα με λογότυπο & Εταιρικά δώρα",
    description: "Premium εταιρικά δώρα και εξατομικευμένη σοκολάτα με λογότυπο. Βελγική σοκολάτα, γρήγορη παραγωγή.",
    path: "/el",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="el" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="el" {...t} logoAlt="Luxury Chocolate — αποκλειστική εταιρική σοκολάτα με λογότυπο" />
      <SeoContentSection lang="el" />
      <QuickFactsSection lang="el" />
      <ClientExamplesSection lang="el" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="el" />
      <HowToOrderSection lang="el" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="el" />
      <TrustSection lang="el" />
      <ProductsSection lang="el" />
      <ShopSection lang="el" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="el" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="el" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="el" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="el" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="el" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="el" />
      <DailyChocolateSection lang="el" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="el" />
      <FaqSection lang="el" />
      <IdeasSection lang="el" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="el" />
      <ContactSection lang="el" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default ElIndex;
