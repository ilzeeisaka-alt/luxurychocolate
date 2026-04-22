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

const HiIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.hi;

  useSeo({
    title: "चॉकलेट प्रिंटिंग और लोगो के साथ कस्टम चॉकलेट",
    description: "चॉकलेट प्रिंटिंग — बेल्जियम चॉकलेट पर सीधे फुल-कलर प्रिंट। लोगो के साथ कस्टम चॉकलेट, कॉर्पोरेट उपहार। 1 पीस से ऑर्डर।",
    path: "/hi",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="hi" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="hi" {...t} logoAlt="Luxury Chocolate — लोगो के साथ विशेष कॉर्पोरेट चॉकलेट" />

      <SeoContentSection lang="hi" />
      <QuickFactsSection lang="hi" />
      <ClientExamplesSection lang="hi" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="hi" />
      <HowToOrderSection lang="hi" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="hi" />
      <TrustSection lang="hi" />
      <ProductsSection lang="hi" />
      <ShopSection lang="hi" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="hi" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="hi" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="hi" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="hi" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="hi" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="hi" />
      <CoinsCardsSection lang="hi" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="hi" />
      <DailyChocolateSection lang="hi" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="hi" />
      <FaqSection lang="hi" />
      <IdeasSection lang="hi" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="hi" />
      <ContactSection lang="hi" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default HiIndex;
