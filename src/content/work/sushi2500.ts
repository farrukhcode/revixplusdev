import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "sushi2500",
  title: "Online ordering for a Copenhagen sushi restaurant",
  client: "Sushi2500",
  industry: "Restaurants and food delivery",
  location: "Denmark",
  services: ["ecommerce-development", "wordpress-development"],
  stack: ["WordPress", "WooCommerce", "PHP", "Bootstrap", "Contact Form 7", "MySQL"],
  timeline: "TODO: confirm",
  liveUrl: "https://sushi2500.dk",
  summary:
    "A WooCommerce ordering site for a sushi restaurant serving Copenhagen and Central Zealand, where customers build a menu order, pick delivery or pickup and pay online.",
  challenge: [
    "Sushi2500 delivers across Copenhagen and Central Zealand, and most orders arrive in a narrow dinner window. The restaurant was taking orders by phone, which tied up staff at the busiest hour and led to mistakes on large orders with many small items and substitutions.",
    "A generic store template does not fit a restaurant. Customers expect to see the menu by category, add sets and single pieces to one order, and choose a delivery slot or pickup time. The kitchen needed those orders to arrive clearly formatted, not as a stream of confusing emails.",
  ],
  solution: [
    "We built the site on WordPress with WooCommerce configured as a menu rather than a catalog. Sets, nigiri, maki and sides are grouped the way the printed menu reads, and product options cover the substitutions regulars ask for, so an order placed online matches what the kitchen expects.",
    "Checkout was simplified to what a hungry customer needs: delivery or pickup, address within the delivery area, time and payment. Delivery zones for Copenhagen and Central Zealand are built into shipping rules, and Contact Form 7 handles catering and event enquiries separately from everyday orders.",
    "The front end is a lightweight Bootstrap theme that stays fast on a phone during the evening rush. Order notifications reach the kitchen in a clean, printable format, which cut down the phone traffic and the transcription errors that came with it.",
  ],
  results: [
    { value: "2", label: "regions covered by delivery rules" },
    { value: "TODO: add figure", label: "share of orders placed online" },
    { value: "TODO: add figure", label: "reduction in phone orders" },
  ],
  featured: false,
  accent: ["var(--pink)", "var(--orange)"],
  seoTitle: "Sushi2500 Case Study: Restaurant Ordering on WooCommerce",
  metaDescription:
    "How RevixPlus built a WooCommerce ordering site for Sushi2500, a sushi restaurant delivering across Copenhagen and Central Zealand, with zones and pickup.",
};

export default study;
