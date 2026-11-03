import type { Service } from "../types";

const service: Service = {
  slug: "ai-integration",
  pillar: "ai",
  title: "AI integration for existing platforms, without a rebuild",
  shortTitle: "AI Integration",
  eyebrow: "AI Solutions",
  seoTitle: "AI Integration Services for Existing Platforms | RevixPlus",
  metaDescription:
    "Add Claude and OpenAI features to the product you already run: document intelligence, extraction and validation pipelines, built in with tests and fallbacks.",
  keywords: [
    "AI integration services",
    "add AI to existing software",
    "LLM integration",
    "document intelligence",
    "Claude API integration",
    "OpenAI integration",
  ],
  icon: "Plug",
  heroPromise:
    "Your platform already works. We plug intelligence into it. Invoice extraction, document review, smart search, summaries, classification, all added to your existing Next.js, Node, PHP or Python codebase with schema validation, retries and fallback models so the feature degrades gracefully instead of taking your product down with it.",
  pains: [
    {
      title: "The rebuild nobody can afford",
      body: "Every AI agency wants to start from scratch. You have paying customers on the current platform and a roadmap that cannot pause for six months while someone rewrites what already works.",
    },
    {
      title: "Demos that break at real volume",
      body: "A prompt that looks perfect on ten sample documents fails on the eleventh layout. Without validation, retries and test sets, AI features embarrass you in front of customers.",
    },
    {
      title: "Costs that nobody forecast",
      body: "Model bills climb with usage and nobody owns the number. Features ship without caching, token budgets or model routing, and finance finds out when the invoice arrives.",
    },
  ],
  deliverables: [
    "Integration architecture doc",
    "Extraction and validation pipeline",
    "Schema-validated model outputs",
    "Retry and fallback-model logic",
    "Accuracy test set and reports",
    "Streaming UI components",
    "Usage and cost dashboard",
    "Handover and runbooks",
  ],
  approach: [
    {
      step: "Map the seam",
      body: "We read your codebase and data flows, then pick the smallest surface where AI adds value. The integration plan names every endpoint, model call and failure path before code starts.",
    },
    {
      step: "Build with test sets",
      body: "Real documents and records become the test set. Every prompt or model change runs against it, with field-level accuracy checks, before anything reaches your staging environment.",
    },
    {
      step: "Harden",
      body: "Outputs are validated against schemas, calls get retries, timeouts and a fallback model, and usage is metered per feature so cost and latency stay inside the budget we agreed.",
    },
    {
      step: "Ship and watch",
      body: "The feature goes live behind a flag, we monitor accuracy and spend for two weeks, tune, then hand over documentation and runbooks your team can maintain without us.",
    },
  ],
  stack: [
    "Claude API",
    "OpenAI API",
    "Next.js",
    "Node.js",
    "NestJS",
    "Python",
    "Zod",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "Sentry",
  ],
  startingAt: {
    price: "from $5,000",
    timeline: "3 weeks",
    note: "One feature, production-ready, with tests and monitoring.",
  },
  relatedWork: ["difacto", "revixmd-ai-automation", "bankful"],
  relatedServices: ["rag-knowledge-assistants", "llm-evaluation-optimization", "api-backend-engineering"],
  faqs: [
    {
      q: "Can you add AI to our existing software without rebuilding it?",
      a: "Yes. AI integration at RevixPlus means adding model calls, pipelines and UI to the codebase you already run. We have added document intelligence to live Next.js and Node.js products, including invoice extraction for a Danish construction SaaS, without a rewrite.",
    },
    {
      q: "How do you keep AI features from failing in production?",
      a: "We keep AI features reliable with schema validation on every output, retries with timeouts, a fallback model when the primary fails, and a test set of real records that runs before each prompt or model change. Failures degrade gracefully instead of breaking workflows.",
    },
    {
      q: "Which AI providers do you integrate?",
      a: "RevixPlus integrates Anthropic Claude, OpenAI, Azure OpenAI and AWS Bedrock, and self-hosted open models when data cannot leave your environment. We pick the provider per feature based on accuracy on your test set, latency, cost and compliance needs.",
    },
    {
      q: "How much does AI integration cost?",
      a: "AI integration starts at $5,000 for one production-ready feature delivered in about three weeks, including tests, monitoring and documentation. Ongoing model usage is billed by your provider, and we design caching and token budgets to keep it predictable.",
    },
    {
      q: "What kind of documents can AI extract data from?",
      a: "AI can extract structured data from invoices, purchase orders, contracts, claims, forms and reports in PDF, image or email form, across many layouts. We build the extraction pipeline, validate fields against your rules, and flag low-confidence results for human review.",
    },
  ],
  authorityLinks: [
    {
      label: "Anthropic: Tool use with Claude",
      href: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview",
    },
    {
      label: "OpenAI: Structured outputs guide",
      href: "https://platform.openai.com/docs/guides/structured-outputs",
    },
    {
      label: "OWASP: Top 10 for LLM applications",
      href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    },
  ],
};

export default service;
