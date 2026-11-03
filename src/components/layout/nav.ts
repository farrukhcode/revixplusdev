/** Header items. `menu` turns an item into a mega menu trigger (panels are built in SiteHeader). */
export const primaryNav = [
  { href: "/services", label: "Services", menu: "services" },
  { href: "/work", label: "Work", menu: "work" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = {
  Services: [
    { href: "/services/ai-integration", label: "AI integration" },
    { href: "/services/healthcare-ai-automation", label: "HIPAA-compliant AI agents" },
    { href: "/services/web-development", label: "Web development" },
    { href: "/services/mobile-app-development", label: "Mobile apps" },
    { href: "/services/ecommerce-development", label: "E-commerce" },
    { href: "/services/game-development", label: "Game development" },
    { href: "/services/seo", label: "SEO" },
    { href: "/services/aieo-geo", label: "AI engine optimization" },
    { href: "/services/social-media-marketing", label: "Social media marketing" },
  ],
  Company: [
    { href: "/work", label: "Work" },
    { href: "/process", label: "Process" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Industries: [
    { href: "/industries/healthcare-rcm", label: "Healthcare and medical billing" },
    { href: "/industries/ecommerce", label: "E-commerce" },
    { href: "/industries/fintech", label: "Fintech" },
    { href: "/industries/saas", label: "SaaS" },
    { href: "/industries/education", label: "Education" },
    { href: "/industries", label: "All industries" },
  ],
  Legal: [
    { href: "/legal/privacy", label: "Privacy" },
    { href: "/legal/terms", label: "Terms" },
    { href: "/legal/cookies", label: "Cookies" },
    { href: "/llms.txt", label: "llms.txt" },
  ],
} as const;
