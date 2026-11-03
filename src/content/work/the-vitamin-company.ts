import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "the-vitamin-company",
  title: "Keeping a national supplement store online and selling",
  client: "The Vitamin Company",
  industry: "E-commerce, health and beauty",
  location: "Pakistan",
  services: ["ecommerce-development", "shopify-development", "cloud-devops-deployment"],
  stack: [
    "Shopify",
    "WooCommerce",
    "WordPress",
    "AWS EC2",
    "AWS S3",
    "AWS Route 53",
    "Nginx",
    "Linux",
    "TLS",
  ],
  timeline: "2017 to 2020",
  liveUrl: "https://thevitamincompany.com",
  summary:
    "The online store and corporate website for one of Pakistan's leading health supplement brands, launched on Shopify and WooCommerce and kept available for orders from across the country.",
  challenge: [
    "The Vitamin Company sells multivitamins and beauty products to customers in every city of Pakistan, and a store that goes down during a campaign costs real orders. The brand needed an online shop that could take sustained traffic and a corporate site that reflected a serious health business.",
    "Behind the storefront there was no dedicated operations team. Servers, certificates, firewall rules, backups and updates all had to be handled by the same people who built the site, so the infrastructure had to be simple enough to run reliably without a large staff on call.",
  ],
  solution: [
    "We launched the store on Shopify for the retail catalog and the corporate presence on WordPress with WooCommerce, keeping product data, promotions and content where each platform does its best work. The two sites share one brand system so customers move between them without noticing a seam.",
    "The self-hosted side runs on AWS. EC2 instances behind an Nginx reverse proxy serve the WordPress site, S3 holds media and backups, and Route 53 manages DNS. TLS certificates, firewall rules, OS updates and service troubleshooting were handled as routine maintenance rather than emergencies.",
    "The same deployment pipelines we built here were reused to deliver other client projects in e-commerce, SaaS, healthcare, education and travel, from architecture through post-launch maintenance. The store stayed available for nationwide orders through every campaign the brand ran in that period.",
  ],
  results: [
    { value: "2", label: "platforms, one brand system" },
    { value: "TODO: add figure", label: "store uptime during campaigns" },
    { value: "TODO: add figure", label: "orders processed" },
  ],
  featured: false,
  accent: ["var(--lime)", "var(--cyan)"],
  seoTitle: "The Vitamin Company Case Study: Supplement E-commerce",
  metaDescription:
    "How RevixPlus launched and ran the Shopify and WooCommerce stores for The Vitamin Company on AWS, keeping a national supplement brand online and taking orders.",
};

export default study;
