import type { Service } from "../types";

const service: Service = {
  slug: "seo",
  pillar: "growth",
  title: "SEO services that bring buyers, not just visitors",
  shortTitle: "SEO",
  eyebrow: "Growth Marketing",
  seoTitle: "SEO Services for Growing Businesses | RevixPlus",
  metaDescription:
    "Technical SEO, Core Web Vitals, content silos and local search for businesses in the US, UK, Denmark and the UAE. Reporting tied to leads and sales.",
  keywords: [
    "SEO services",
    "technical SEO agency",
    "Core Web Vitals optimization",
    "local SEO",
    "international SEO Denmark UK US",
    "SEO for ecommerce",
  ],
  icon: "Search",
  heroPromise:
    "Rankings are only useful when the people who click are the people who buy. We fix the technical foundation, build content around the questions your customers actually ask, and report every month on leads and revenue rather than vanity positions. The same playbook rebuilt Bankful's marketing site around Core Web Vitals and grew its organic traffic.",
  pains: [
    {
      title: "Traffic goes up, inquiries stay flat",
      body: "Your reports show more sessions every month, yet the phone rings no more often than before. The pages that rank attract readers who were never going to buy anything from you.",
    },
    {
      title: "The site is slow and Google knows it",
      body: "Core Web Vitals sit in the red, mobile pages take seconds to become usable, and every template change makes it worse. Competitors with thinner content outrank you because theirs loads.",
    },
    {
      title: "Content gets published, then forgotten",
      body: "Blog posts go live without a plan for what they should rank for or where they should link. Nothing connects into a structure, so nothing builds authority on the topics you sell.",
    },
  ],
  deliverables: [
    "Technical SEO audit",
    "Core Web Vitals fixes",
    "Keyword and intent map",
    "Content silo architecture",
    "Local SEO and Google Business Profile",
    "International SEO setup",
    "Internal linking plan",
    "Monthly lead reporting",
  ],
  approach: [
    {
      step: "Audit",
      body: "We crawl the site, check Core Web Vitals on real devices, review indexing and structured data, and list every issue by the revenue it blocks rather than by severity label.",
    },
    {
      step: "Map",
      body: "We group keywords by buying intent and market, then design a silo structure where pillar pages, service pages and supporting posts link to each other on purpose.",
    },
    {
      step: "Fix",
      body: "We ship the technical work ourselves: rendering, speed, schema, redirects and crawl budget. No ticket handed to another agency, no waiting months for a developer slot.",
    },
    {
      step: "Publish",
      body: "We write and optimize pages in a steady cadence, each one briefed against a target query, reviewed by a human editor, and linked into the silo on the day it goes live.",
    },
    {
      step: "Report",
      body: "Every month you get one page showing rankings, organic sessions, leads and revenue side by side, with the next month's priorities decided from that data rather than from a template.",
    },
  ],
  stack: [
    "Google Search Console",
    "Ahrefs",
    "Screaming Frog",
    "PageSpeed Insights",
    "Google Business Profile",
    "Schema.org JSON-LD",
    "Looker Studio",
    "Next.js",
    "WordPress",
  ],
  startingAt: {
    price: "from $1,200",
    timeline: "per month",
    note: "Three-month minimum so results can be measured.",
  },
  relatedWork: ["bankful", "revixmd-website", "thetoys"],
  relatedServices: ["aieo-geo", "content-marketing", "conversion-rate-optimization"],
  faqs: [
    {
      q: "How long does SEO take to show results?",
      a: "Most sites see measurable movement within three to four months, with the strongest gains arriving between months six and twelve. Technical fixes such as speed and indexing often move numbers within weeks. New content takes longer because Google needs time to crawl, evaluate and rank it, which is why we commit to a minimum of three months.",
    },
    {
      q: "Do you handle the technical fixes or just send recommendations?",
      a: "We make the fixes ourselves. RevixPlus is a development team first, so speed work, rendering problems, schema markup, redirects and crawl issues are shipped by the same people who found them. On Next.js, WordPress, Shopify and WooCommerce we work directly in the codebase or theme, which removes the usual wait for a separate developer.",
    },
    {
      q: "Can you do SEO for a business in Denmark, the UK or the US from Pakistan?",
      a: "Yes, and we already do. Our founder spent years building and ranking sites for Danish, British and American companies, including a payment gateway's marketing site rebuilt around Core Web Vitals. Keyword research, local listings, hreflang and country targeting are set up per market, and we work in your time zone for calls and reporting.",
    },
    {
      q: "What does the monthly SEO report include?",
      a: "One page with rankings, organic sessions, leads and revenue shown side by side, so you can see whether search is paying for itself. Under that sit the pages shipped, the technical fixes closed, and the priorities for next month. We skip the hundred-page PDF because nobody reads it and it hides what matters.",
    },
    {
      q: "Is SEO still worth it now that people ask AI assistants instead?",
      a: "Yes, because AI assistants pull their answers from the same pages search engines index. A site with clear structure, fast pages and well-written answers ranks in Google and gets cited by ChatGPT and Perplexity at the same time. We treat AI engine optimization as an extension of SEO rather than a replacement, and we track both.",
    },
  ],
  authorityLinks: [
    {
      label: "Google Search Essentials",
      href: "https://developers.google.com/search/docs/essentials",
    },
    {
      label: "Core Web Vitals on web.dev",
      href: "https://web.dev/articles/vitals",
    },
    {
      label: "Google Search Central: SEO Starter Guide",
      href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
    },
  ],
};

export default service;
