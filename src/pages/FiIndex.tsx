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
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const FiIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.fi;

  useSeo({
    title: "Suklaa logolla & Yrityslahjat",
    description: "Premium yrityslahjat ja personoitu suklaa logolla. Eksklusiiviset lahjapakkaukset yrityksille. Belgialainen suklaa, nopea tuotanto, tilaukset alkaen 1 kpl.",
    path: "/fi",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="fi" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="fi" {...t} logoAlt="Luxury Chocolate — eksklusiivinen yrityssuklaa logolla" />

      <SeoContentSection lang="fi" />
      <QuickFactsSection lang="fi" />
      <ClientExamplesSection lang="fi" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="fi" />
      <HowToOrderSection lang="fi" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="fi" />
      <TrustSection lang="fi" />
      <ProductsSection lang="fi" />
      <ShopSection lang="fi" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="fi" />
      <RestaurantChocolateSection lang="fi" />
      <FaqSection lang="fi" />
      <IdeasSection lang="fi" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="fi" />
      <ContactSection lang="fi" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default FiIndex;
