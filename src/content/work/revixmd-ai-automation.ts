import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "revixmd-ai-automation",
  title: "HIPAA-compliant AI agents and automation for a medical billing company",
  client: "Revix MD",
  industry: "Healthcare, medical billing and RCM",
  location: "United States",
  services: ["healthcare-ai-automation", "ai-agents-automation", "security-compliance"],
  stack: [
    "n8n",
    "Claude API",
    "OpenAI API",
    "Model Context Protocol (MCP)",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Role-based access control",
    "Audit logging",
  ],
  timeline: "2025 to present",
  liveUrl: "https://revixmd.com",
  summary:
    "Process automation, HR and task management automation, and HIPAA-compliant AI agents for a US medical billing company, built on n8n with Claude and OpenAI behind a PHI-safe architecture.",
  challenge: [
    "Billers at Revix MD spent a large share of each day on repeat work: checking eligibility on payer portals, chasing claim status, sorting denials by hand and typing the same updates into several places. Onboarding a new biller and keeping track of who owned which task ran through spreadsheets and chat threads.",
    "Every one of those tasks touches protected health information, so the usual shortcut of pasting data into a chatbot was off the table. Any automation had to prove where PHI goes, who can see it and what the AI is allowed to do on its own, before the first workflow could run against real claims.",
  ],
  solution: [
    "We started with the processes that cost the most time and carried the least judgment. n8n workflows now pull eligibility and claim status data, build daily worklists for each biller from the practice management and clearinghouse data, raise alerts when an item is about to miss its deadline, and compile the client reporting that used to be assembled by hand.",
    "AI agents built on Claude and OpenAI handle the reasoning steps. A denial triage agent reads the denial codes, works out the likely root cause and drafts the appeal, but a biller approves every appeal before it goes out. HR and task management automation covers onboarding checklists, document collection, access provisioning and access removal when someone leaves.",
    "The architecture is what makes it HIPAA-compliant rather than merely clever. Model access runs under a business associate agreement, PHI is minimized or de-identified before inference, every agent action is written to an immutable audit log, roles and MCP tools are scoped to least privilege, and a human stays in the loop for anything that touches a claim decision.",
  ],
  results: [
    { value: "TODO: add figure", label: "biller hours saved per week" },
    { value: "TODO: add figure", label: "faster denial turnaround" },
    { value: "TODO: add figure", label: "shorter onboarding time for new billers" },
  ],
  featured: true,
  order: 3,
  accent: ["var(--cyan)", "var(--blue)"],
  seoTitle: "Revix MD Case Study: HIPAA-Compliant AI Agents for RCM",
  metaDescription:
    "How RevixPlus automated billing, HR and task management for Revix MD with HIPAA-compliant AI agents built on n8n, Claude and OpenAI behind a PHI-safe design.",
};

export default study;
