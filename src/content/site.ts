import type { Pillar } from "./types";

export const site = {
  name: "RevixPlus",
  legalName: "RevixPlus",
  tagline: "We build what's next for your business.",
  description:
    "RevixPlus is a software, AI and growth agency: one senior team for web and mobile apps, AI integration, games and the marketing that brings customers.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://revixplus.com",
  email: "hello@revixplus.com",
  phone: "+92 321 242 2242",
  whatsapp: "https://wa.me/923212422242",
  bookingUrl: process.env.NEXT_PUBLIC_CAL_LINK ?? "https://cal.com/farrukhbilal",
  location: {
    city: "Lahore",
    country: "Pakistan",
    serving: ["United States", "United Kingdom", "Denmark", "European Union", "UAE", "Pakistan"],
  },
  founded: "2026",
  social: {
    linkedin: "https://www.linkedin.com/in/farrukhbilal/",
    instagram: "https://www.instagram.com/revixplus",
    github: "https://github.com/farrukhcode",
    x: "https://x.com/revixplus",
  },
  stats: [
    { value: 10, suffix: "+", label: "years shipping software" },
    { value: 50, suffix: "+", label: "products and stores launched" },
    { value: 5, suffix: "", label: "countries served" },
    { value: 91, suffix: "%", label: "clients who come back" },
  ],
} as const;

export const pillars: Pillar[] = [
  {
    slug: "ai",
    title: "AI Solutions",
    tagline: "Intelligence inside the tools you already run.",
    summary:
      "Strategy, RAG assistants, agents, automation and HIPAA-compliant AI, built into your existing platform instead of replacing it.",
    icon: "Sparkles",
    accent: ["var(--violet)", "var(--cyan)"],
  },
  {
    slug: "web-mobile",
    title: "Web & Mobile",
    tagline: "Apps, stores and platforms that load fast and sell.",
    summary:
      "Next.js web apps, React Native mobile apps, Shopify and WooCommerce stores, WordPress sites, SaaS MVPs and the APIs behind them.",
    icon: "MonitorSmartphone",
    accent: ["var(--cyan)", "var(--blue)"],
  },
  {
    slug: "games",
    title: "Game Development",
    tagline: "Playables and mobile games that keep people coming back.",
    summary:
      "HTML5 web games, YouTube Playables, Unity and Godot mobile games, and gamified brand experiences with monetization built in.",
    icon: "Gamepad2",
    accent: ["var(--orange)", "var(--pink)"],
  },
  {
    slug: "growth",
    title: "Growth Marketing",
    tagline: "Search, AI answers, social and ads, run as one system.",
    summary:
      "SEO, AI engine optimization, social media management, paid ads, content, email automation and conversion optimization with one dashboard.",
    icon: "TrendingUp",
    accent: ["var(--blue)", "var(--violet)"],
  },
  {
    slug: "creative",
    title: "Creative",
    tagline: "Brands, creatives and video people actually stop for.",
    summary:
      "Branding and graphic design, social creatives at scale, video editing and motion graphics for launches, ads and feeds.",
    icon: "Palette",
    accent: ["var(--pink)", "var(--orange)"],
  },
  {
    slug: "cloud",
    title: "Cloud, DevOps & Care",
    tagline: "Deployed, secured, monitored and maintained.",
    summary:
      "Docker and Coolify deployments, security and compliance hardening, maintenance retainers and dedicated teams that stay after launch.",
    icon: "ServerCog",
    accent: ["var(--cyan)", "var(--violet)"],
  },
];

export const pillarBySlug = Object.fromEntries(pillars.map((p) => [p.slug, p])) as Record<
  Pillar["slug"],
  Pillar
>;
