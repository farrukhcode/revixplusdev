import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "indibe",
  title: "A multivendor cosmetics marketplace built on Nuxt",
  client: "Indibe",
  industry: "E-commerce, beauty marketplace",
  location: "TODO: confirm",
  services: ["ecommerce-development", "web-development", "api-backend-engineering"],
  stack: ["Nuxt.js", "Vue.js", "Pinia", "TypeScript", "Node.js", "REST APIs", "Tailwind CSS"],
  timeline: "TODO: confirm",
  liveUrl: "https://indibe.com",
  summary:
    "A marketplace where independent cosmetics brands run their own storefronts under one roof, built on Nuxt and Vue with Pinia managing cart, vendor and checkout state.",
  challenge: [
    "A marketplace is a store with many owners. Each cosmetics brand on Indibe needed its own catalog, pricing and orders, while shoppers wanted one basket and one checkout no matter how many vendors they bought from. Getting both sides right in a single interface is where most marketplace builds fall apart.",
    "Beauty shoppers also expect a fast, image-heavy experience on mobile. Pages full of product photos and shade swatches had to render quickly and feel instant when filtering, and search engines had to be able to index every brand and product page, which rules out a plain client-side app.",
  ],
  solution: [
    "We built the storefront on Nuxt.js so brand and product pages render on the server for search engines and first paint, then hand over to Vue for the interactive parts. Vendor storefronts share one component library, which keeps the marketplace consistent while still letting each brand show its own identity.",
    "Pinia stores hold the cart, the active vendor context and the checkout flow, so a shopper can add items from several brands and pay once. Orders are split per vendor behind the scenes, and each brand sees only its own orders, stock and payouts in its dashboard.",
    "The REST API behind the marketplace handles vendor onboarding, catalog management, order routing and the usual validation and error handling. Images are optimized and lazy-loaded so swatch-heavy listing pages stay quick on a phone, which is where most beauty shopping happens.",
  ],
  results: [
    { value: "TODO: add figure", label: "brands selling on the marketplace" },
    { value: "TODO: add figure", label: "products listed" },
    { value: "TODO: add figure", label: "mobile performance score" },
  ],
  featured: true,
  order: 5,
  accent: ["var(--pink)", "var(--violet)"],
  seoTitle: "Indibe Case Study: Multivendor Cosmetics Marketplace",
  metaDescription:
    "How RevixPlus built Indibe, a multivendor cosmetics marketplace on Nuxt.js, Vue and Pinia, with one checkout for shoppers and a separate dashboard per brand.",
};

export default study;
