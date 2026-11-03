import type { Service } from "../types";

const service: Service = {
  slug: "saas-mvp-development",
  pillar: "web-mobile",
  title: "SaaS and MVP development, from idea to paying users",
  shortTitle: "SaaS & MVP",
  eyebrow: "Web & Mobile",
  seoTitle: "SaaS & MVP Development Agency | Launch in 8 Weeks | RevixPlus",
  metaDescription:
    "SaaS and MVP development: a working product with auth, billing, admin and analytics in eight weeks. Built in Next.js and Node.js by a senior team, from $15,000.",
  keywords: [
    "SaaS development agency",
    "MVP development services",
    "build an MVP",
    "SaaS product development",
    "startup software development",
  ],
  icon: "Rocket",
  heroPromise:
    "You get a working product in eight weeks: user accounts, subscription billing, an admin panel, analytics and the one feature your customers will pay for. We have built an HRMS platform with separate admin and employee portals and the AI invoice product DiFacto from first requirement to production, so we know which shortcuts are safe and which ones cost you later. The code is yours and ready to grow.",
  pains: [
    {
      title: "The idea is clear, the build is not",
      body: "You know the problem and the customer, but every agency quote is vague and every freelancer disappears halfway. Months pass and there is still nothing to show investors.",
    },
    {
      title: "The prototype cannot take real users",
      body: "A no-code demo or a rushed codebase got you a few signups, and now it crashes, leaks data or needs a rewrite before the next customer can be onboarded.",
    },
    {
      title: "Technical decisions are being made blind",
      body: "Without a senior engineer in the room, choices about architecture, hosting and data get made by whoever is loudest. Each one is expensive to undo a year later.",
    },
  ],
  deliverables: [
    "Product scoping workshop",
    "Next.js web application",
    "Authentication and roles",
    "Subscription billing",
    "Admin dashboard",
    "Usage analytics",
    "Automated tests and CI",
    "Docker deployment",
    "Investor-ready documentation",
  ],
  approach: [
    {
      step: "Cut the scope to what sells",
      body: "A two-day workshop turns the idea into a short list of must-have features with acceptance criteria. Everything else goes on a roadmap so version one ships in weeks.",
    },
    {
      step: "Architecture that can grow",
      body: "We choose a stack and data model that handles your first thousand customers without a rewrite, document the decisions, and keep infrastructure costs proportionate to revenue at every stage.",
    },
    {
      step: "Ship every week",
      body: "Each sprint ends with a deployed build you and early users can try. Feedback shapes the next sprint, and automated tests and code review protect what already works.",
    },
    {
      step: "Launch with the basics done right",
      body: "Billing, onboarding emails, error tracking, backups and a support inbox are in place before the first paying customer. You launch with a product, not a demo.",
    },
    {
      step: "Grow on real data",
      body: "After launch we read usage analytics with you, prioritize the next features, and offer a retainer or a dedicated developer so momentum does not stop at version one.",
    },
  ],
  stack: [
    "Next.js",
    "TypeScript",
    "NestJS",
    "PostgreSQL",
    "Prisma",
    "Stripe",
    "Resend",
    "Redis",
    "Docker",
    "GitHub Actions",
    "Sentry",
    "PostHog",
  ],
  startingAt: {
    price: "from $15,000",
    timeline: "8 weeks",
    note: "Includes the scoping workshop. Equity-plus-cash arrangements are considered case by case.",
  },
  relatedWork: ["difacto", "hrms-saas", "bankful"],
  relatedServices: ["ai-integration", "api-backend-engineering", "ui-ux-design"],
  faqs: [
    {
      q: "What does an MVP include and what does it leave out?",
      a: "An MVP includes the smallest set of features a customer will pay for, plus the basics every product needs: sign-up, login, billing, an admin view and analytics. It leaves out nice-to-have features, custom integrations and anything only one prospect asked for. The scoping workshop draws that line with you before the build starts.",
    },
    {
      q: "How long does it take to build a SaaS MVP?",
      a: "Eight weeks is the usual timeline from the scoping workshop to a product with paying users. Simpler tools can ship in six, and products with complex data models, AI features or marketplaces take ten to twelve. You see a deployed build every week, so progress is visible rather than promised.",
    },
    {
      q: "Can you add AI features to the product?",
      a: "Yes, and we have done it in production. DiFacto reads supplier invoices with a trained document model and validates them against price lists, all built by our team. We add AI where it creates value for the customer, keep costs predictable through model selection and caching, and test output quality before every release.",
    },
    {
      q: "What happens if we need to pivot halfway through?",
      a: "Pivots are normal and the process is built for them. Because the product ships weekly, you can change direction after any sprint without losing months of work. We re-scope the remaining sprints together, keep the parts that still fit and document what changed so investors and future developers understand the path.",
    },
    {
      q: "Who owns the product and can another team take over?",
      a: "You own everything: the code, the repository, the cloud accounts and the data. We build in TypeScript with documentation, tests and a Docker setup that any competent team can run. Many founders keep us on as their engineering team, but nothing in the way we build locks you into that choice.",
    },
  ],
  authorityLinks: [
    { label: "Next.js documentation", href: "https://nextjs.org/docs" },
    { label: "Stripe Billing documentation", href: "https://docs.stripe.com/billing" },
    { label: "OWASP Top Ten", href: "https://owasp.org/www-project-top-ten/" },
  ],
};

export default service;
