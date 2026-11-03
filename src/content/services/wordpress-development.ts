import type { Service } from "../types";

const service: Service = {
  slug: "wordpress-development",
  pillar: "web-mobile",
  title: "WordPress development with custom themes, Bricks and Elementor",
  shortTitle: "WordPress",
  eyebrow: "Web & Mobile",
  seoTitle: "WordPress Development | Custom Themes, Elementor, WPML | RevixPlus",
  metaDescription:
    "WordPress development for corporate sites: custom themes, Bricks and Elementor builds, WPML multilingual setup, speed, security and hosting, from $1,500.",
  keywords: [
    "WordPress development agency",
    "custom WordPress theme",
    "Bricks Builder developer",
    "Elementor developer",
    "WPML multilingual website",
  ],
  icon: "LayoutTemplate",
  heroPromise:
    "You get a WordPress site your team can edit on a Tuesday afternoon without breaking the layout, built on a custom theme or a clean Bricks or Elementor setup, whichever fits how you work. Multilingual sites with WPML, membership areas, booking forms and blogs that rank are all familiar ground. Since 2015 we have built WordPress sites for healthcare, energy, education, coffee and dental clients in Denmark and the US.",
  pains: [
    {
      title: "Editing the site is a gamble",
      body: "Someone changes a heading and the homepage collapses on mobile. Your team avoids the site, updates pile up, and the content slowly drifts out of date and off brand.",
    },
    {
      title: "Plugins and speed are out of control",
      body: "Forty plugins, half of them unused, each one a security risk and a few hundred milliseconds of load time. The site feels heavy and gets hacked about once a year.",
    },
    {
      title: "You need languages and the theme does not",
      body: "A second market needs a second language, but the current theme hard-codes English into every template. Translation becomes a manual mess instead of a repeatable workflow.",
    },
  ],
  deliverables: [
    "Custom WordPress theme",
    "Bricks or Elementor build",
    "WPML multilingual setup",
    "Forms and CRM connections",
    "Blog and SEO structure",
    "Plugin audit and cleanup",
    "Speed and caching setup",
    "Security hardening",
    "Managed hosting on Docker",
  ],
  approach: [
    {
      step: "Content and structure first",
      body: "We map pages, languages and content types before touching a theme, then set up a sitemap and editorial roles. Decisions about builders come after we know what the site must do.",
    },
    {
      step: "Design in the builder",
      body: "Bricks or Elementor layouts are built from global styles and reusable templates so every page stays consistent. For sites with custom logic we write a lean coded theme instead.",
    },
    {
      step: "Build, integrate, translate",
      body: "Pages, forms, CRM connections and WPML translations go in with caching and image optimization from the start. Every template is tested on mobile before the content is loaded.",
    },
    {
      step: "Launch on hardened hosting",
      body: "The site launches on Docker-based hosting we manage or on your host, with backups, updates, uptime monitoring and a firewall in place. Your editors get a recorded training session.",
    },
  ],
  stack: [
    "WordPress",
    "Bricks Builder",
    "Elementor",
    "WPML",
    "Advanced Custom Fields",
    "Gravity Forms",
    "WP Rocket",
    "Cloudflare",
    "Docker",
    "Coolify",
    "PHP",
    "MySQL",
  ],
  startingAt: {
    price: "from $1,500",
    timeline: "2 weeks",
    note: "Multilingual and membership sites are scoped after the content map.",
  },
  relatedWork: ["revixmd-website", "his-energy", "sushi2500"],
  relatedServices: ["seo", "maintenance-support-retainers", "content-marketing"],
  faqs: [
    {
      q: "Custom theme, Bricks or Elementor: which one should we use?",
      a: "Bricks is our default for new corporate sites because it produces clean markup, loads quickly and gives editors structured control. Elementor suits teams already trained on it or with existing templates. A custom coded theme makes sense when the site has complex logic, heavy traffic or strict performance targets. We pick after seeing your content and team.",
    },
    {
      q: "Can you build a multilingual WordPress site?",
      a: "Yes, multilingual builds with WPML are routine for us, including Danish and English sites for European clients. We set up language switching, translated URLs, hreflang tags for search engines and a translation workflow your editors can follow. Menus, forms, SEO fields and media captions are translated too, not just the page body.",
    },
    {
      q: "How do you make WordPress fast and secure?",
      a: "We keep WordPress fast with a lean plugin list, server-side caching, optimized images, a CDN and a lightweight builder setup. Security comes from hardened hosting, automatic updates, two-factor logins, a web application firewall and daily off-site backups. Both are checked monthly if you keep us on a maintenance retainer.",
    },
    {
      q: "Will you fix or rebuild our existing WordPress site?",
      a: "Both are options, and we start with an audit to find out which one makes sense. If the theme and plugins are sound we fix speed, security and layout problems in place. If the site is built on abandoned plugins or a broken theme, a staged rebuild on the same domain usually costs less than endless patching.",
    },
    {
      q: "Do you host WordPress sites?",
      a: "Yes, we host WordPress sites in Docker containers on servers we manage, with automatic backups, updates, uptime monitoring and a firewall included. You can also stay on your current host and we will harden it. Either way, you keep ownership of the domain, the content and the accounts at all times.",
    },
  ],
  authorityLinks: [
    { label: "WordPress developer resources", href: "https://developer.wordpress.org/" },
    {
      label: "Hardening WordPress, WordPress.org",
      href: "https://wordpress.org/documentation/article/hardening-wordpress/",
    },
    { label: "Core Web Vitals, web.dev", href: "https://web.dev/articles/vitals" },
  ],
};

export default service;
