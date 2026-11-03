/**
 * Content schema for RevixPlus.
 * Every page is generated from typed modules in src/content so the site
 * stays fast (static), typed and easy to edit without a CMS.
 */

export type PillarSlug = "ai" | "web-mobile" | "games" | "growth" | "creative" | "cloud";

export interface Pillar {
  slug: PillarSlug;
  title: string;
  /** Short line shown on the home services chapter panel */
  tagline: string;
  /** One sentence used on the pillar overview */
  summary: string;
  /** lucide-react icon name, e.g. "Sparkles" */
  icon: string;
  /** Gradient accent pair, as theme tokens (e.g. "var(--violet)") so it follows light/dark */
  accent: [string, string];
}

export interface Faq {
  q: string;
  a: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  pillar: PillarSlug;
  /** H1 on the service page, keyword + outcome, max ~70 chars */
  title: string;
  /** Short title used in nav, chips and cards, max ~28 chars */
  shortTitle: string;
  /** Small text above the H1, e.g. "AI Solutions" */
  eyebrow: string;
  seoTitle: string;
  /** 140 to 160 chars */
  metaDescription: string;
  keywords: string[];
  /** lucide-react icon name */
  icon: string;
  /** One paragraph, 45 to 70 words, the promise under the H1 */
  heroPromise: string;
  /** Exactly 3 pains, each title max 8 words, body 25 to 40 words */
  pains: { title: string; body: string }[];
  /** 6 to 9 deliverable chips, each 2 to 6 words */
  deliverables: string[];
  /** 4 or 5 steps, body 20 to 35 words each */
  approach: { step: string; body: string }[];
  /** Technologies and tools, 6 to 12 items */
  stack: string[];
  startingAt: { price: string; timeline: string; note?: string };
  /** Case study slugs (2 or 3) */
  relatedWork: string[];
  /** Service slugs (3) */
  relatedServices: string[];
  /** Exactly 5 FAQs, answers 40 to 70 words, written for AI answer engines */
  faqs: Faq[];
  /** 2 or 3 authoritative external sources (standards bodies, vendor docs, research) */
  authorityLinks: ExternalLink[];
  /** Optional compliance block, used by healthcare and security services */
  compliance?: { title: string; items: string[] };
  /** Optional catalog block, e.g. an agent catalog for the healthcare page */
  catalog?: { title: string; items: { name: string; body: string }[] };
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  /** Country or region, e.g. "Denmark" */
  location: string;
  /** Service slugs this project demonstrates */
  services: string[];
  stack: string[];
  /** e.g. "2023 to present" */
  timeline: string;
  liveUrl?: string;
  /** Shown in cards and the home gallery, 20 to 30 words */
  summary: string;
  /** 2 paragraphs, 40 to 60 words each */
  challenge: string[];
  /** 3 paragraphs, 40 to 60 words each */
  solution: string[];
  /** 3 metrics. Use "TODO:" prefix in value when the real number is pending */
  results: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
  featured: boolean;
  /** Display order within featured gallery */
  order?: number;
  /** Two CSS colors for the glass device card gradient */
  accent: [string, string];
  /** Path under /public, e.g. "/work/difacto.webp". Optional until screenshots exist */
  image?: string;
  seoTitle: string;
  metaDescription: string;
}

export interface Industry {
  slug: string;
  title: string;
  /** H1, e.g. "Software, AI and growth for healthcare and medical billing" */
  headline: string;
  seoTitle: string;
  metaDescription: string;
  /** One paragraph, 50 to 80 words */
  intro: string;
  /** Exactly 3 pains, body 25 to 40 words */
  pains: { title: string; body: string }[];
  /** 4 to 6 service slugs */
  services: string[];
  /** 2 to 4 case study slugs */
  work: string[];
  /** 4 FAQs */
  faqs: Faq[];
  icon: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Case study slug if one exists */
  work?: string;
  /** "TODO" testimonials are placeholders awaiting the client's words */
  status: "approved" | "TODO";
}

export interface ProcessStep {
  step: string;
  title: string;
  promise: string;
  duration: string;
  /** 3 or 4 bullet outputs */
  outputs: string[];
}

export interface PricingPackage {
  slug: string;
  name: string;
  /** e.g. "from $1,500" */
  price: string;
  timeline: string;
  bestFor: string;
  includes: string[];
  serviceSlug: string;
  highlight?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Path under /public/team, optional */
  photo?: string;
  linkedin?: string;
  status: "live" | "TODO";
}
