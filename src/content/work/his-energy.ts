import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "his-energy",
  title: "A multilingual site for battery energy storage solutions",
  client: "HIS Energy",
  industry: "Energy and cleantech",
  location: "Denmark and the EU",
  services: ["wordpress-development", "seo"],
  stack: ["WordPress", "PHP", "Elementor", "WPML", "MySQL", "Cloudflare"],
  timeline: "TODO: confirm",
  liveUrl: "https://his-energy.com",
  summary:
    "A multilingual WordPress site for a Battery Energy Storage System provider, built with Elementor and WPML so buyers across Europe read the same solutions in their own language.",
  challenge: [
    "HIS Energy sells Battery Energy Storage Systems to commercial and industrial buyers across several European countries. Those buyers read technical specifications in their own language, and a site that only spoke English would lose them before a sales conversation started.",
    "Energy storage is also a technical sale. Capacity, chemistry, warranties and use cases needed to be presented clearly enough for a facilities manager to compare options, while the marketing team kept the freedom to update pages and launch new product lines without a developer each time.",
  ],
  solution: [
    "We built the site on WordPress with Elementor templates for solution pages, product lines and case examples. Each template is structured so specifications, benefits and downloads sit in the same place on every page, which makes comparison easy and lets the team add a new product in minutes.",
    "WPML handles the multilingual setup. Every page, menu and form exists per language with correct hreflang tags, so search engines serve the right version in each market and visitors can switch language without losing their place. Translations are managed inside WordPress by the team.",
    "Technical SEO was part of the build rather than a later fix. Clean URLs per language, structured headings, optimized images and fast templates give the solution pages a fair chance to rank for storage terms in each country, and the site runs behind Cloudflare for speed and protection.",
  ],
  results: [
    { value: "TODO: add figure", label: "languages served" },
    { value: "TODO: add figure", label: "solution pages published" },
    { value: "TODO: add figure", label: "inbound enquiries per month" },
  ],
  featured: false,
  accent: ["var(--cyan)", "var(--lime)"],
  seoTitle: "HIS Energy Case Study: Multilingual WordPress | RevixPlus",
  metaDescription:
    "How RevixPlus built a multilingual WordPress site with Elementor and WPML for HIS Energy, a Battery Energy Storage System provider selling across Europe.",
};

export default study;
