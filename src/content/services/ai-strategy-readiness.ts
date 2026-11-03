import type { Service } from "../types";

const service: Service = {
  slug: "ai-strategy-readiness",
  pillar: "ai",
  title: "AI strategy and readiness assessment for growing businesses",
  shortTitle: "AI Strategy & Readiness",
  eyebrow: "AI Solutions",
  seoTitle: "AI Strategy & Readiness Assessment | RevixPlus",
  metaDescription:
    "A two-week AI readiness assessment that maps your processes, scores use cases, checks your data and hands you a costed 90-day roadmap you can actually execute.",
  keywords: [
    "AI readiness assessment",
    "AI strategy consulting",
    "AI roadmap for small business",
    "AI use case prioritization",
    "AI adoption plan",
  ],
  icon: "Compass",
  heroPromise:
    "Two weeks, one clear answer. We sit inside your operations, map every process that eats time, score where AI pays back fastest, check whether your data can support it, and hand you a 90-day roadmap with real costs attached. No vendor pitch, no slide deck theater, just a plan your team can start on Monday.",
  pains: [
    {
      title: "Everyone says AI, nobody says where",
      body: "Your leadership wants AI in the business, your vendors want to sell it, and your team keeps asking which process actually changes first. Months pass and nothing ships.",
    },
    {
      title: "Pilots that never leave the demo",
      body: "A chatbot got built, a few people tried it, and it quietly died. Without a scoring model and an owner, every experiment stays an experiment and the budget disappears.",
    },
    {
      title: "Your data is not ready and you don't know it",
      body: "Spreadsheets, PDFs, old CRM exports and three naming conventions. AI projects stall on data quality far more often than on models, and most teams find out too late.",
    },
  ],
  deliverables: [
    "Process and workflow map",
    "Scored AI use-case backlog",
    "Data readiness report",
    "Build versus buy analysis",
    "Cost and token budget model",
    "Risk and compliance review",
    "90-day execution roadmap",
    "Leadership briefing session",
  ],
  approach: [
    {
      step: "Discover",
      body: "We interview the people doing the work, shadow key workflows, and inventory your systems, data sources and current tools. Everything gets written down in one shared map.",
    },
    {
      step: "Score",
      body: "Every candidate use case is rated on value, effort, data readiness and risk. You see the math, not just the ranking, so the order of work is defensible.",
    },
    {
      step: "Model costs",
      body: "For the top use cases we estimate build cost, monthly model spend at real volume, and the savings or revenue they bring in. Numbers come with the assumptions behind them.",
    },
    {
      step: "Plan",
      body: "You get a 90-day roadmap with owners, milestones and a go or no-go gate after the first build. We present it to leadership and answer every question in the room.",
    },
  ],
  stack: [
    "Claude API",
    "OpenAI API",
    "Vector databases",
    "n8n",
    "Model Context Protocol",
    "PostgreSQL",
    "Notion",
    "Miro",
    "Google Workspace",
  ],
  startingAt: {
    price: "from $2,500",
    timeline: "2 weeks",
    note: "Credited against any build we start within 60 days.",
  },
  relatedWork: ["difacto", "revixmd-ai-automation", "hrms-saas"],
  relatedServices: ["ai-integration", "ai-agents-automation", "llm-evaluation-optimization"],
  faqs: [
    {
      q: "What does an AI readiness assessment include?",
      a: "An AI readiness assessment maps your processes, scores candidate use cases on value and effort, audits your data sources, models the cost of each option and produces a 90-day roadmap. At RevixPlus it takes two weeks and ends with a leadership briefing.",
    },
    {
      q: "How much does AI strategy consulting cost?",
      a: "AI strategy consulting at RevixPlus starts at $2,500 for a two-week assessment covering one business unit. Larger organizations with several departments or data systems get a scoped quote after a free 20-minute call, and the fee is credited against a build.",
    },
    {
      q: "Do we need clean data before starting an AI project?",
      a: "You do not need perfect data, but you do need to know its condition. The assessment includes a data readiness report that shows which sources can support AI today, which need cleanup, and what that cleanup costs before you commit to a build.",
    },
    {
      q: "Is an AI assessment worth it for a small business?",
      a: "An AI assessment is worth it for any business spending more than a few hours a week on repetitive document, data or communication work. Small teams often gain the most because one automation can remove a whole role's worth of manual effort.",
    },
    {
      q: "What happens after the assessment is delivered?",
      a: "After delivery you own the roadmap and can execute it with any team. Most clients ask RevixPlus to build the first use case, and the assessment fee is credited against that build when it starts within 60 days of the final briefing.",
    },
  ],
  authorityLinks: [
    {
      label: "Anthropic: Building with Claude documentation",
      href: "https://docs.anthropic.com/en/docs/overview",
    },
    {
      label: "OpenAI: Platform documentation",
      href: "https://platform.openai.com/docs/overview",
    },
    {
      label: "Model Context Protocol specification",
      href: "https://modelcontextprotocol.io/introduction",
    },
  ],
};

export default service;
