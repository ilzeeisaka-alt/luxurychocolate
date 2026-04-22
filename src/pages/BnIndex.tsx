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

const BnIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.bn;

  useSeo({
    title: "চকলেট প্রিন্টিং এবং লোগো সহ ব্যক্তিগতকৃত চকলেট",
    description: "চকলেট প্রিন্টিং — বেলজিয়ান চকলেটের উপর সরাসরি ফুল-কালার প্রিন্ট। লোগো সহ ব্যক্তিগতকৃত চকলেট, কর্পোরেট উপহার।",
    path: "/bn",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="bn" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="bn" {...t} logoAlt="Luxury Chocolate — লোগো সহ এক্সক্লুসিভ কর্পোরেট চকলেট" />

      <SeoContentSection lang="bn" />
      <QuickFactsSection lang="bn" />
      <ClientExamplesSection lang="bn" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="bn" />
      <HowToOrderSection lang="bn" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="bn" />
      <TrustSection lang="bn" />
      <ProductsSection lang="bn" />
      <ShopSection lang="bn" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="bn" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="bn" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="bn" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="bn" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="bn" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="bn" />
      <CoinsCardsSection lang="bn" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="bn" />
      <DailyChocolateSection lang="bn" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="bn" />
      <FaqSection lang="bn" />
      <IdeasSection lang="bn" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="bn" />
      <ContactSection lang="bn" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default BnIndex;
