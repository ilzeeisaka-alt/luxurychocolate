export type Lang = "lv" | "en" | "ru" | "et" | "lt" | "sv" | "no" | "fi" | "da" | "de" | "fr" | "it" | "es" | "ar" | "nl" | "pl" | "cs" | "pt" | "el" | "tr" | "hu" | "ro" | "bg" | "hr" | "sk" | "sl" | "uk" | "sr" | "bs" | "mk" | "sq" | "is" | "zh" | "ja" | "ko" | "hi" | "bn" | "ur" | "fa" | "he" | "th" | "vi" | "id" | "ms" | "tl" | "sw" | "am" | "ka" | "az" | "kk" | "hy" | "be" | "ta" | "km" | "mn";

export interface PageContent {
  slug: string;
  emoji: string;
  title: string;
  metaDescription: string;
  intro: string;
  benefits: string[];
  body: string;
  cta: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
}

export interface UiStrings {
  backLabel: string;
  ctaButton: string;
  benefitsHeading: string;
  faqHeading: string;
  relatedHeading: string;
  ctaSubtext: string;
  freePreviewHeading: string;
  freePreviewDesc: string;
  freePreviewBadge1: string;
  freePreviewBadge2: string;
  freePreviewBadge3: string;
  freePreviewButton: string;
  freePreviewInquiryButton: string;
}

export interface RelatedPage {
  to: string;
  label: string;
  desc: string;
}
