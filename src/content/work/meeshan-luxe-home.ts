import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "meeshan-luxe-home",
  title: "Luxury furniture commerce with nationwide delivery",
  client: "Meeshan Luxe Home",
  industry: "E-commerce, furniture and home",
  location: "Pakistan",
  services: ["shopify-development", "ecommerce-development", "cloud-devops-deployment"],
  stack: [
    "Shopify",
    "Liquid",
    "JavaScript",
    "Shopify Payments",
    "Delivery integrations",
    "Google Analytics",
    "Meta Pixel",
  ],
  timeline: "2018 to 2023",
  liveUrl: "https://meeshan.com",
  summary:
    "A Shopify store for a luxury furniture brand, built to sell large, high-value items online and deliver them anywhere in Pakistan, with the technical operations led in-house for five years.",
  challenge: [
    "Furniture is one of the hardest categories to sell online. Orders are large, buyers want to see every detail before committing, and delivery of a sofa across the country is nothing like shipping a parcel. Meeshan needed a store that made expensive purchases feel safe from a phone screen.",
    "The brand also wanted to run the store itself for years, not depend on an agency for every banner change. That meant a theme the team could manage, integrations that did not break when apps updated, and someone technically accountable for uptime, payments and delivery logistics behind the scenes.",
  ],
  solution: [
    "We built the storefront on Shopify with custom Liquid templates. Product pages carry large galleries, dimensions, material details and clear delivery terms so a buyer can judge a piece without visiting a showroom. Collections are organized by room and by piece, which is how people actually furnish a home.",
    "Delivery and payment flows were set up for the Pakistani market, with nationwide delivery zones, lead times shown at checkout and the payment options local buyers expect. Analytics and pixels were wired in from the start so campaigns could be measured against real orders instead of clicks.",
    "As DevOps tech lead from 2018 to 2023 we owned the technical side of the business end to end: theme releases, app integrations, performance, security updates and the handling of every incident. The store stayed online and selling through five years of catalog growth and seasonal campaigns.",
  ],
  results: [
    { value: "5", label: "years of continuous technical ownership" },
    { value: "TODO: add figure", label: "orders delivered nationwide" },
    { value: "TODO: add figure", label: "store uptime" },
  ],
  featured: true,
  order: 4,
  accent: ["var(--orange)", "var(--violet)"],
  seoTitle: "Meeshan Luxe Home Case Study: Shopify Furniture Store",
  metaDescription:
    "How RevixPlus built and ran the Shopify store for Meeshan Luxe Home, a luxury furniture brand with nationwide delivery across Pakistan, over five years.",
};

export default study;
