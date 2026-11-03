import type { Service } from "../types";

const service: Service = {
  slug: "web-development",
  pillar: "web-mobile",
  title: "Web application development with Next.js and Node.js",
  shortTitle: "Web Development",
  eyebrow: "Web & Mobile",
  seoTitle: "Web Application Development Agency | Next.js & Node.js | RevixPlus",
  metaDescription:
    "Custom web application development with Next.js, React and Node.js. Fast, accessible, SEO-ready apps built in TypeScript, tested and deployed, from $8,000.",
  keywords: [
    "web application development",
    "Next.js development agency",
    "Node.js development",
    "React development services",
    "custom web app development",
  ],
  icon: "Globe",
  heroPromise:
    "You get a web application that loads in under two seconds, passes Core Web Vitals, and works for every visitor, including the ones using a keyboard or a screen reader. We build in TypeScript with strict mode on, write tests for the parts that matter, and deploy to infrastructure we run. Ten years of production apps for clients in Denmark, the US, the UK and the UAE stand behind it.",
  pains: [
    {
      title: "Your current site is slow and it shows",
      body: "Visitors leave before the page finishes loading, Google scores you poorly, and every campaign you run pays for traffic that bounces. A slow site quietly taxes everything else you do.",
    },
    {
      title: "The last agency left you a mess",
      body: "Nobody on your side can explain the code, deployments happen by hand, and every small change takes a week to ship. You are paying for fear instead of progress.",
    },
    {
      title: "Your app cannot keep up with the business",
      body: "New features bolt onto an old foundation, the database strains under real traffic, and the team spends more time patching than building. Growth is stuck waiting on the software.",
    },
  ],
  deliverables: [
    "Next.js App Router frontend",
    "Node.js or NestJS API",
    "PostgreSQL schema and migrations",
    "Authentication and roles",
    "Automated test suite",
    "CI/CD pipeline",
    "Docker deployment",
    "Performance and SEO audit",
    "Handover documentation",
  ],
  approach: [
    {
      step: "Discovery and scope",
      body: "We map the users, the flows and the integrations in a one week discovery, then write acceptance criteria you can check against. Fixed price, no surprises later.",
    },
    {
      step: "Design and architecture",
      body: "Wireframes and a clickable prototype come first, followed by the data model, API contracts and infrastructure plan. You approve the shape of the product before code starts.",
    },
    {
      step: "Build in weekly sprints",
      body: "Every week ships working software to a staging URL you can click through. TypeScript strict mode, code review and automated tests gate every merge, including the AI-assisted ones.",
    },
    {
      step: "Launch and measure",
      body: "We deploy to Docker on your cloud or ours, wire up monitoring and analytics, and run a Core Web Vitals check before the domain goes live. Then we watch it.",
    },
  ],
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "Prisma",
    "Tailwind CSS",
    "Docker",
    "GitHub Actions",
    "Playwright",
    "Sentry",
  ],
  startingAt: {
    price: "from $8,000",
    timeline: "4 weeks",
    note: "Discovery week included. Larger platforms are scoped after discovery.",
  },
  relatedWork: ["difacto", "hrms-saas", "bankful"],
  relatedServices: ["api-backend-engineering", "ui-ux-design", "cloud-devops-deployment"],
  faqs: [
    {
      q: "How long does a custom web application take to build?",
      a: "Most web applications take four to ten weeks from discovery to launch. A content-driven site with a few integrations lands near four weeks. A product with user accounts, payments and an admin area usually needs eight to ten. We give you a fixed timeline after the discovery week, and you see working software every week until launch.",
    },
    {
      q: "Why build with Next.js instead of plain React or WordPress?",
      a: "Next.js gives you server rendering, static pages and API routes in one framework, which means faster loads and better search rankings than a plain React app. WordPress is the right call for content sites that editors update daily. When your product has logins, dashboards or custom logic, Next.js with a Node.js backend is the better foundation.",
    },
    {
      q: "Do you take over web applications another team built?",
      a: "Yes, and it starts with a paid code audit. We read the codebase, check the database and deployment setup, and send you a written report with risks ranked by cost. From there we either stabilize what exists or plan a staged rebuild, and you keep running the business while we work in the background.",
    },
    {
      q: "Who owns the code and where does it run?",
      a: "You own the code, the repository and every account from day one. We build on GitHub under your organization and deploy with Docker to your cloud provider or to a server we manage for you on DigitalOcean. There is no lock-in: any developer who knows TypeScript can pick the project up from the documentation we leave.",
    },
    {
      q: "How do you keep the application fast and accessible after launch?",
      a: "Speed and accessibility are checked before every release, not once at launch. Lighthouse runs in the CI pipeline and blocks merges that drop Core Web Vitals, and we test keyboard navigation and screen reader labels on new screens. If you want ongoing care, a maintenance retainer covers updates, monitoring and small improvements each month.",
    },
  ],
  authorityLinks: [
    { label: "Core Web Vitals, web.dev", href: "https://web.dev/articles/vitals" },
    { label: "Next.js documentation", href: "https://nextjs.org/docs" },
    { label: "WCAG overview, W3C", href: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
  ],
};

export default service;
