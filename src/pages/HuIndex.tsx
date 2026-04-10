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
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const HuIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.hu;

  useSeo({
    title: "Logós csokoládé & Céges ajándékok",
    description: "Prémium céges ajándékok és személyre szabott logós csokoládé. Belga csokoládé, gyors gyártás.",
    path: "/hu",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="hu" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="hu" {...t} logoAlt="Luxury Chocolate — exkluzív céges csokoládé logóval" />
      <SeoContentSection lang="hu" />
      <QuickFactsSection lang="hu" />
      <ClientExamplesSection lang="hu" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="hu" />
      <HowToOrderSection lang="hu" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="hu" />
      <TrustSection lang="hu" />
      <ProductsSection lang="hu" />
      <ShopSection lang="hu" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="hu" />
      <DailyChocolateSection lang="hu" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="hu" />
      <FaqSection lang="hu" />
      <IdeasSection lang="hu" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="hu" />
      <ContactSection lang="hu" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default HuIndex;
