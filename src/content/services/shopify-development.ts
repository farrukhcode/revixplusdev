import type { Service } from "../types";

const service: Service = {
  slug: "shopify-development",
  pillar: "web-mobile",
  title: "Shopify development, custom themes and Shopify Plus",
  shortTitle: "Shopify",
  eyebrow: "Web & Mobile",
  seoTitle: "Shopify Development Agency | Themes, Liquid, Shopify Plus | RevixPlus",
  metaDescription:
    "Shopify development agency for custom themes, Liquid, Shopify Plus, app integrations and migrations. Stores built for speed and conversion, from $2,500.",
  keywords: [
    "Shopify development agency",
    "Shopify theme customization",
    "Shopify Plus development",
    "Liquid developer",
    "Shopify migration",
  ],
  icon: "ShoppingBag",
  heroPromise:
    "You get a Shopify store that looks like your brand instead of a template, built in Liquid and Online Store 2.0 sections your team can edit without calling a developer. We have run Shopify stores for supplement, furniture and jewelry brands since 2017, so we know what sells and what slows a store down. Shopify Plus, custom apps and migrations from other platforms are all in scope.",
  pains: [
    {
      title: "Your theme looks like everyone else's",
      body: "The template was fine on day one, then every customization fought the theme's own code. Now the store looks generic and each tweak costs more than the last one did.",
    },
    {
      title: "Apps are slowing the store down",
      body: "Fourteen apps load scripts on every page, the product page takes four seconds on a phone, and nobody remembers which app does what. Speed and margins both suffer.",
    },
    {
      title: "You outgrew the plan you started on",
      body: "Wholesale pricing, multiple markets, custom checkout rules or a large catalog now need Shopify Plus or custom apps. The store was never set up to handle any of that.",
    },
  ],
  deliverables: [
    "Custom Shopify theme",
    "Online Store 2.0 sections",
    "Shopify Plus setup",
    "Custom app development",
    "Platform migration",
    "App audit and cleanup",
    "Checkout customization",
    "Speed optimization",
    "Team training",
  ],
  approach: [
    {
      step: "Audit what you have",
      body: "We review the theme, apps, speed and analytics of your current store, or your current platform if you are migrating. You get a short report of what to keep and what to replace.",
    },
    {
      step: "Design the sections",
      body: "Product, collection and home page sections get designed as reusable blocks in Figma. Your team will arrange them in the theme editor later, so we design for flexibility from the start.",
    },
    {
      step: "Build in Liquid and test",
      body: "We build the theme with Liquid, JSON templates and minimal JavaScript, replace heavy apps with native features where possible, and test every flow including discounts, subscriptions and returns.",
    },
    {
      step: "Migrate, launch, train",
      body: "Products, customers and redirects move over, the theme goes live on a quiet day, and your team gets a recorded walkthrough of the editor. We stay on call for launch week.",
    },
  ],
  stack: [
    "Shopify",
    "Shopify Plus",
    "Liquid",
    "Online Store 2.0",
    "Shopify Functions",
    "Hydrogen",
    "Klaviyo",
    "Shopify Flow",
    "Judge.me",
    "Google Analytics 4",
    "Matrixify",
  ],
  startingAt: {
    price: "from $2,500",
    timeline: "3 weeks",
    note: "Custom apps and Shopify Plus checkout work are quoted after the audit.",
  },
  relatedWork: ["meeshan-luxe-home", "the-vitamin-company", "medallion-dusk"],
  relatedServices: ["ecommerce-development", "conversion-rate-optimization", "email-marketing-automation"],
  faqs: [
    {
      q: "Do we need a custom theme or can we customize a paid one?",
      a: "A paid theme customized well serves most stores under a few hundred products and keeps costs low. A custom theme pays off when your brand, catalog or buying flow does not fit any template, or when years of edits have made the paid theme fragile. We tell you which case you are in after the audit.",
    },
    {
      q: "Will you clean up our app stack?",
      a: "Yes, an app audit is part of every Shopify project. We list each app, what it costs, which scripts it loads and whether Shopify now offers the feature natively. Removing redundant apps usually cuts monthly fees and improves load time at the same time, and we handle the removal safely.",
    },
    {
      q: "Can you migrate us from WooCommerce, Magento or Wix to Shopify?",
      a: "Yes, we migrate stores from WooCommerce, Magento, Wix, BigCommerce and custom platforms. Products, variants, customers, orders, reviews and discount codes come across, with redirects for every old URL so search traffic is kept. The old store keeps selling until the new one is tested and ready to switch.",
    },
    {
      q: "When does Shopify Plus make sense?",
      a: "Shopify Plus makes sense when you need checkout customization, wholesale pricing, multiple stores or markets, automation with Shopify Flow, or your volume makes the lower transaction fees pay for the higher plan. For most stores under a few hundred orders a day, standard Shopify plans are enough. We model the costs before you upgrade.",
    },
    {
      q: "How do you keep a Shopify store fast?",
      a: "We keep Shopify stores fast by limiting apps, using native sections instead of script-heavy widgets, serving compressed images at the right sizes and deferring anything below the fold. We test on a mid-range phone over a slow connection, because that is where most shoppers are. Speed is rechecked after every change.",
    },
  ],
  authorityLinks: [
    { label: "Shopify theme development docs", href: "https://shopify.dev/docs/storefronts/themes" },
    { label: "Shopify Liquid reference", href: "https://shopify.dev/docs/api/liquid" },
    { label: "Core Web Vitals, web.dev", href: "https://web.dev/articles/vitals" },
  ],
};

export default service;
