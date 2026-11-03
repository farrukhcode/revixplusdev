import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "revixmd-website",
  title: "A fast, content-led website for a medical billing company",
  client: "Revix MD",
  industry: "Healthcare, medical billing and RCM",
  location: "United States",
  services: ["wordpress-development", "seo", "content-marketing"],
  stack: ["WordPress", "Bricks Builder", "WPCode", "WP Rocket", "PHP", "JavaScript", "Docker", "Coolify"],
  timeline: "2025 to present",
  liveUrl: "https://revixmd.com",
  summary:
    "A WordPress site built on Bricks Builder with a teal brand system, a growing blog with load-more browsing, and a subscribe flow that sends readers a weekly Billing Insights email.",
  challenge: [
    "Revix MD competes for search terms against large medical billing generalists, so the site had to do more than look professional. It needed to publish service pages, specialty pages and blog posts at a steady pace, load quickly on mobile, and turn readers into subscribers and enquiries.",
    "The team also wanted to keep control of the site themselves. Changes to headers, mega menus and forms could not depend on a developer for every tweak, yet custom behavior still had to be added safely, without plugins piling up or caching breaking something after each edit.",
  ],
  solution: [
    "We built the site in WordPress on Bricks Builder with a palette driven by the brand's teal variable, so buttons and calls to action stay consistent across every template. The header mega menu, service and specialty templates and blog layouts are all editable by the team inside the builder.",
    "Custom PHP and JavaScript live as managed WPCode snippets instead of a tangle of plugins. For the blog listing we chose Bricks' native query-loop load-more interaction over a custom AJAX snippet, which kept the page simpler and faster. WP Rocket handles caching with a clear and preload step after each release.",
    "The subscribe form on the blog confirms on screen and sends a Revix MD Insights welcome email from the team's address, pointing readers back to the blog. The site runs as a Docker container on the same Coolify server as the other Revix properties, with staging at a separate subdomain.",
  ],
  results: [
    { value: "TODO: add figure", label: "pages published" },
    { value: "TODO: add figure", label: "mobile performance score" },
    { value: "TODO: add figure", label: "newsletter subscribers" },
  ],
  featured: false,
  accent: ["var(--cyan)", "var(--lime)"],
  seoTitle: "Revix MD Website Case Study: WordPress on Bricks",
  metaDescription:
    "How RevixPlus built the Revix MD website on WordPress and Bricks Builder with a teal brand system, a load-more blog, a subscribe flow and WP Rocket caching.",
};

export default study;
