import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientExamplesSection from "@/components/ClientExamplesSection";
import QuickFactsSection from "@/components/QuickFactsSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import TrustSection from "@/components/TrustSection";
import ProductsSection from "@/components/ProductsSection";
import CakeChocolateSection from "@/components/CakeChocolateSection";
import RestaurantChocolateSection from "@/components/RestaurantChocolateSection";
import DailyChocolateSection from "@/components/DailyChocolateSection";
import BookBoxSection from "@/components/BookBoxSection";
import MagnetBoxSection from "@/components/MagnetBoxSection";
import CoinsCardsSection from "@/components/CoinsCardsSection";
import VipGiftSection from "@/components/VipGiftSection";
import SouvenirSection from "@/components/SouvenirSection";
import CienastsSection from "@/components/CienastsSection";
import TableCardsSection from "@/components/TableCardsSection";
import CelebrationCakeSection from "@/components/CelebrationCakeSection";
import SeoContentSection from "@/components/SeoContentSection";
import FaqSection from "@/components/FaqSection";
import IdeasSection from "@/components/IdeasSection";
import CtaSection from "@/components/CtaSection";
import FreePreviewSection from "@/components/FreePreviewSection";
import UseCasesSection from "@/components/UseCasesSection";
import RelatedPagesSection from "@/components/RelatedPagesSection";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";
import ShopSection from "@/components/ShopSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.lv;

  useSeo({
    title: "Šokolāde ar logo & Korporatīvās dāvanas",
    description: "Premium korporatīvās dāvanas un personalizēta šokolāde ar logo. Ekskluzīvi dāvanu komplekti uzņēmumiem. Beļģu šokolāde, ātra izpilde, pasūtījumi jau no 1 gab.",
    path: "/",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="lv" {...t} />
      <SeoContentSection />
      <QuickFactsSection />
      <ClientExamplesSection />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} />
      <HowToOrderSection />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} />
      <TrustSection />
      <ProductsSection />
      <ShopSection onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="lv" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="lv" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="lv" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="lv" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="lv" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection />
      <CoinsCardsSection lang="lv" onCtaClick={() => setModalOpen(true)} />
      <DailyChocolateSection lang="lv" onCtaClick={() => setModalOpen(true)} />
      <CakeChocolateSection />
      <RestaurantChocolateSection />
      <BookBoxSection />
      <FaqSection />
      <IdeasSection />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} />
      <ContactSection onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default Index;
