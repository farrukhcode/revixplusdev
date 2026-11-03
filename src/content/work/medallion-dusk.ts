import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "medallion-dusk",
  title: "A mobile-first Shopify store for handmade jewelry",
  client: "Medallion Dusk",
  industry: "E-commerce, jewelry",
  location: "TODO: confirm",
  services: ["shopify-development", "ecommerce-development"],
  stack: ["Shopify", "Liquid", "JavaScript", "Shopify Payments", "Instagram Shopping"],
  timeline: "TODO: confirm",
  liveUrl: "https://medalliondusk.com",
  summary:
    "A Shopify store for a handmade jewelry brand, designed phone-first so pieces photographed up close look as good on a small screen as they do in the hand.",
  challenge: [
    "Handmade jewelry sells on detail. Buyers want to see the texture of a medallion and the clasp on a chain, and almost all of them are browsing on a phone, usually after finding the brand on Instagram. A store that squeezed desktop layouts onto mobile would hide exactly what sells the piece.",
    "The brand is small, with a catalog that changes as new pieces are made and sold out. The owner needed to add products, write short stories about each piece and run occasional drops without technical help, and without the store ever feeling like a template that thousands of other shops use.",
  ],
  solution: [
    "We designed the store on Shopify starting from the phone layout and scaling up. Product pages lead with full-width imagery and zoom, followed by the story of the piece, materials and sizing, and the add-to-cart stays reachable with a thumb. Collections are curated by style rather than by SKU count.",
    "Custom Liquid templates give the brand its own look while keeping every section editable in the Shopify theme editor. Drops, sold-out states and limited pieces are handled with native inventory, so a new release takes a few minutes to publish and the store tells the truth about availability.",
    "Checkout runs on Shopify Payments, and the catalog is connected to Instagram Shopping so a post can be tapped straight through to the product. Page weight is kept low with optimized images and no heavy apps, which keeps the store quick on the mobile networks most customers use.",
  ],
  results: [
    { value: "TODO: add figure", label: "share of orders from mobile" },
    { value: "TODO: add figure", label: "mobile page speed score" },
    { value: "TODO: add figure", label: "conversion rate" },
  ],
  featured: false,
  accent: ["var(--violet)", "var(--orange)"],
  seoTitle: "Medallion Dusk Case Study: Mobile-First Shopify Store",
  metaDescription:
    "How RevixPlus built a mobile-first Shopify store for Medallion Dusk, a handmade jewelry brand, with custom Liquid templates and Instagram Shopping integration.",
};

export default study;
