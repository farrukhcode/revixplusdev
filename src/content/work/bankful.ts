import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "bankful",
  title: "One payment gateway for five e-commerce platforms",
  client: "Bankful (eMerchantBroker LLC)",
  industry: "Fintech and payments",
  location: "United States",
  services: ["api-backend-engineering", "web-development", "seo"],
  stack: [
    "Node.js",
    "Express",
    "MongoDB",
    "Shopify",
    "WooCommerce",
    "Magento",
    "Wix",
    "BigCommerce",
    "WordPress",
    "Tailwind CSS",
  ],
  timeline: "2019 to 2023",
  liveUrl: "https://bankful.com",
  summary:
    "A payment gateway for high-risk merchants, served from one Node.js codebase across Shopify, WooCommerce, Magento, Wix and BigCommerce, with fraud and chargeback tooling.",
  challenge: [
    "High-risk merchants get turned away by mainstream processors, and the ones who do get accounts face chargebacks that can cost them the account overnight. Bankful needed a gateway that these merchants could install on whichever store platform they already used, without a separate integration project for each one.",
    "Supporting five platforms from separate codebases would have meant five sets of bugs and five release schedules. The gateway also had to stay fast at checkout, because any added friction shows up straight away as abandoned carts, while still validating every request and every incoming webhook.",
  ],
  solution: [
    "We built the gateway as a single Node.js service with platform adapters for Shopify, WooCommerce, Magento, Wix and BigCommerce. Request validation, webhook signature checks and idempotent processing sit in the shared core, so a fix lands once and every platform gets it in the same release.",
    "Fraud monitoring and chargeback-prevention tools run alongside the gateway. They score transactions and surface risky orders in merchant dashboards before a dispute lands, which protects merchant revenue without slowing the checkout path. Third-party payment, onboarding and risk APIs are integrated behind those dashboards.",
    "We also rebuilt the marketing and onboarding websites with Core Web Vitals and technical SEO as the brief, cutting page load time and lifting organic traffic. All of this was delivered inside a distributed US and Pakistan team working through pull-request reviews and staged releases.",
  ],
  results: [
    { value: "5", label: "e-commerce platforms from one codebase" },
    { value: "TODO: add figure", label: "faster page load after the site rebuild" },
    { value: "TODO: add figure", label: "organic traffic growth" },
  ],
  featured: true,
  order: 2,
  accent: ["var(--blue)", "var(--cyan)"],
  seoTitle: "Bankful Case Study: Multi-Platform Payment Gateway",
  metaDescription:
    "How we built Bankful's payment gateway for high-risk merchants: one Node.js codebase across five store platforms, fraud tools and a faster SEO site.",
};

export default study;
