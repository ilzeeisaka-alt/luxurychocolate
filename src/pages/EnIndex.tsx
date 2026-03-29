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

const EnIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.en;

  useSeo({
    title: "Chocolate with Logo & Corporate Gifts",
    description: "Premium corporate gifts and personalized chocolate with your logo. Exclusive gift sets for companies. Belgian chocolate, fast production, orders from 1 piece.",
    path: "/en",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="en" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="en" {...t} logoAlt="Luxury Chocolate — custom corporate chocolate with logo" />

      <SeoContentSection lang="en" />
      <QuickFactsSection lang="en" />
      <ClientExamplesSection lang="en" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="en" />
      <HowToOrderSection lang="en" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="en" />
      <TrustSection lang="en" />
      <ProductsSection lang="en" />
      <ShopSection lang="en" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="en" />
      <RestaurantChocolateSection lang="en" />
      <FaqSection lang="en" />
      <IdeasSection lang="en" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="en" />
      <ContactSection lang="en" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default EnIndex;
