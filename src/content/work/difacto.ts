import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "difacto",
  title: "AI invoice control for Danish construction companies",
  client: "DiFacto",
  industry: "Construction SaaS",
  location: "Denmark",
  services: ["ai-integration", "llm-evaluation-optimization", "saas-mvp-development"],
  stack: ["Next.js", "React", "Node.js", "REST APIs", "Document analysis model", "PostgreSQL", "TypeScript"],
  timeline: "2023 to present",
  liveUrl: "https://difacto.dk",
  summary:
    "A GenAI SaaS that reads supplier invoices in any layout, pulls out line items and prices, and checks them against quotes and price lists.",
  challenge: [
    "Construction companies in Denmark receive supplier invoices in dozens of layouts, and every one of them had to be checked by hand against the quote and the agreed price list. The work was slow, it depended on a few experienced people, and overcharges slipped through whenever the team was busy.",
    "DiFacto wanted a product that could do that review automatically, but a demo that worked on five clean PDFs was not enough. The extraction had to hold up on scanned pages, odd table formats and partial data, and the business needed to trust the output before letting it replace a human check.",
  ],
  solution: [
    "We trained the document analysis model on real construction invoices and pricing data, then built the extraction and validation pipeline around it. Each invoice is parsed into structured line items, prices are matched to the quote and the price list, and anything that does not reconcile is flagged for a person to look at.",
    "Quality is enforced with test sets of real invoices, field-level accuracy checks and regression runs before every model or prompt change. Schema validation, retries, fallback models and timeouts mean a bad page degrades to a flagged item rather than a broken workflow, which is what made the client comfortable going live.",
    "The full stack is ours as well. Node.js REST services expose the pipeline, a Next.js and React front end gives the finance team a review queue with clear accept and reject actions, and the whole product runs as a SaaS so each construction company gets its own workspace and history.",
  ],
  results: [
    { value: "TODO: add figure", label: "manual invoice review replaced" },
    { value: "TODO: add figure", label: "field-level accuracy on test set" },
    { value: "TODO: add figure", label: "invoice layouts supported" },
  ],
  featured: true,
  order: 1,
  accent: ["var(--violet)", "var(--cyan)"],
  seoTitle: "DiFacto Case Study: AI Invoice Control SaaS | RevixPlus",
  metaDescription:
    "How RevixPlus built DiFacto, a GenAI SaaS that reads supplier invoices in any layout and validates prices against quotes for Danish construction companies.",
};

export default study;
