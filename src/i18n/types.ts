export type Lang = "lv" | "en" | "ru" | "et" | "lt";

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
}

export interface RelatedPage {
  to: string;
  label: string;
  desc: string;
}
