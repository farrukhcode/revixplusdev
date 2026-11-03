import type { Service } from "../types";

const service: Service = {
  slug: "healthcare-ai-automation",
  pillar: "ai",
  title: "HIPAA-compliant AI agents and automation for medical billing companies",
  shortTitle: "Healthcare AI & RCM Automation",
  eyebrow: "AI Solutions for Healthcare",
  seoTitle: "HIPAA-Compliant AI Agents for Medical Billing & RCM | RevixPlus",
  metaDescription:
    "AI agents and n8n automation for medical billing companies: eligibility, claim follow-up, denial triage, HR and tasks, built to HIPAA Security Rule safeguards.",
  keywords: [
    "HIPAA compliant AI agents",
    "medical billing automation",
    "RCM automation services",
    "AI for medical billing companies",
    "denial management automation",
    "AI agents for healthcare billing",
    "medical billing workflow automation",
  ],
  icon: "ShieldCheck",
  heroPromise:
    "Your billers spend their day on payer portals, claim status calls, denial worklists and spreadsheets. We build agents that do the repetitive parts, from eligibility checks to denial triage to daily task lists, on an architecture built to HIPAA Security Rule safeguards. Delivered for Revix MD, a US medical billing company, including HR and task management automation.",
  pains: [
    {
      title: "Billers lose hours to payer portals",
      body: "Checking eligibility, pulling claim status and copying results into the practice management system is the same clicking, every day, for every claim. Skilled billers do clerical work while denials wait.",
    },
    {
      title: "Denials sit unworked past the deadline",
      body: "Denied claims pile up faster than anyone can categorize them. Timely filing windows close, appeals never get drafted, and revenue that was earned is quietly written off at month end.",
    },
    {
      title: "Onboarding and tasks live in chat threads",
      body: "New hires get access by email request, training by word of mouth, and daily work through WhatsApp messages. Nobody can see who owns what, which accounts are late, or how productive each biller is.",
    },
  ],
  deliverables: [
    "RCM process and PHI data map",
    "HIPAA-aligned agent architecture",
    "Eligibility and claim status agents",
    "Denial triage with appeal drafts",
    "AR worklist prioritization",
    "HR onboarding automation",
    "Daily task and SLA automation",
    "Client KPI reporting agent",
    "Audit logs and compliance docs",
  ],
  approach: [
    {
      step: "Map the revenue cycle",
      body: "We sit with your billers and map every step from eligibility to payment posting, mark where PHI flows, and pick the two or three workflows where automation returns the most hours first.",
    },
    {
      step: "Design for PHI",
      body: "Every agent gets a least-privilege tool set, PHI is minimized or de-identified before any model call, and the provider sits under a BAA or runs inside your own environment.",
    },
    {
      step: "Build with approval gates",
      body: "Agents draft, prioritize and prepare. A biller approves anything that touches a claim, a patient or a payment. Historical cases are replayed through the flow before it sees live data.",
    },
    {
      step: "Automate the operation",
      body: "n8n handles onboarding, access provisioning, daily worklists, SLA alerts and weekly productivity reports, so managers see the whole operation without chasing updates in chat.",
    },
    {
      step: "Run, audit, expand",
      body: "We go live on one client account, review audit logs and accuracy weekly, deliver the compliance documentation your clients ask for, then extend the agents to the next workflow.",
    },
  ],
  stack: [
    "Claude API under BAA",
    "Azure OpenAI",
    "AWS Bedrock",
    "Self-hosted models via Docker",
    "n8n (self-hosted)",
    "Model Context Protocol",
    "PostgreSQL with encryption",
    "Clearinghouse APIs",
    "Practice management integrations",
    "Cloudflare Access",
    "Audit logging",
  ],
  startingAt: {
    price: "from $7,500",
    timeline: "4 weeks",
    note: "First release covers two agents plus HR and task automation for one client account.",
  },
  relatedWork: ["revixmd-ai-automation", "revixmd-website", "difacto"],
  relatedServices: ["ai-agents-automation", "security-compliance", "rag-knowledge-assistants"],
  faqs: [
    {
      q: "Can AI agents be HIPAA compliant?",
      a: "Yes, when the architecture around them follows the HIPAA Security Rule. That means a signed BAA with the model provider or a self-hosted model, PHI minimization before inference, encryption, role-based access, audit logs and human review of any action that affects a claim or a patient.",
    },
    {
      q: "Does Claude or ChatGPT sign a Business Associate Agreement?",
      a: "Anthropic, OpenAI, Microsoft Azure OpenAI and AWS Bedrock all offer Business Associate Agreements on qualifying enterprise or API plans, with terms that vary by provider. RevixPlus confirms the BAA and data retention terms before any PHI reaches a model, or deploys a self-hosted model instead.",
    },
    {
      q: "Which medical billing tasks can AI agents automate?",
      a: "AI agents can automate eligibility and benefits verification, claim status checks, denial categorization and appeal drafting, AR worklist prioritization, patient payment reminders, coding suggestions for biller review, and the reporting of days in AR, clean-claim rate and denial rate to clients.",
    },
    {
      q: "Can AI work denials without exposing PHI?",
      a: "AI can triage denials with minimal PHI exposure. The agent receives denial codes, payer, claim amounts and de-identified clinical context, classifies the root cause, and drafts the appeal. Patient identifiers are re-attached only inside your system, by a biller, at send time.",
    },
    {
      q: "What does HIPAA-compliant AI automation cost for a billing company?",
      a: "HIPAA-compliant AI automation at RevixPlus starts at $7,500 for a four-week first release covering two agents plus HR and task management automation for one client account. Monthly costs cover model usage under BAA, hosting, and an optional support retainer.",
    },
  ],
  authorityLinks: [
    {
      label: "HHS: HIPAA Security Rule",
      href: "https://www.hhs.gov/hipaa/for-professionals/security/index.html",
    },
    {
      label: "HHS: Business Associates guidance",
      href: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html",
    },
    {
      label: "Centers for Medicare & Medicaid Services",
      href: "https://www.cms.gov",
    },
  ],
  compliance: {
    title: "How we keep PHI safe",
    items: [
      "Business Associate Agreement with the model provider (Anthropic, OpenAI, Azure OpenAI or AWS Bedrock), or a self-hosted model inside your VPC via Docker when no BAA is acceptable",
      "PHI minimization and de-identification before inference, so the model only sees what the task needs",
      "Zero data retention with the provider and no training on client data",
      "Encryption in transit (TLS 1.2 or newer) and at rest (AES-256)",
      "Role-based access control and multi-factor authentication for every user and service account",
      "Least-privilege MCP tools scoped per agent, read-only wherever the task allows",
      "Immutable audit logs of every agent action and every PHI access",
      "Human-in-the-loop approval for anything that touches a claim decision, a patient or money",
      "Risk assessment, incident response plan and breach-notification procedure delivered with the system",
      "Workforce training material for your billers and managers",
    ],
  },
  catalog: {
    title: "The agent and automation catalog",
    items: [
      {
        name: "Eligibility and benefits verification agent",
        body: "Checks coverage, copays, deductibles and authorization requirements before the visit, through payer APIs or portals, and writes the result back to your practice management system.",
      },
      {
        name: "Claim status and follow-up agent",
        body: "Pulls claim status from clearinghouses and payer portals on a schedule, flags claims stuck past your threshold, and prepares the follow-up note or call sheet for the biller.",
      },
      {
        name: "Denial triage agent",
        body: "Reads CARC and RARC codes, classifies the root cause, checks timely filing limits, and drafts the appeal or corrected claim for a biller to approve before anything is sent.",
      },
      {
        name: "AR worklist prioritizer",
        body: "Ranks open accounts by age, balance, payer behavior and filing deadlines so each biller starts the day on the accounts most likely to pay and most at risk of being lost.",
      },
      {
        name: "Patient statement and payment-reminder agent",
        body: "Sends statements and reminders by the channel each patient consented to, answers balance questions from approved content, and routes disputes to a person with the full history.",
      },
      {
        name: "Coding and documentation assistant",
        body: "Suggests CPT and ICD-10 codes from encounter documentation with the supporting text highlighted, for a certified coder or biller to confirm, reject or edit before submission.",
      },
      {
        name: "HR and onboarding automation",
        body: "n8n workflows generate offer letters, collect documents, provision system access, assign training checklists, track completion, and revoke access on the day someone leaves.",
      },
      {
        name: "Task management automation",
        body: "Builds daily biller worklists from practice management and clearinghouse data, raises SLA alerts in Slack or WhatsApp when accounts go stale, and compiles weekly productivity reports.",
      },
      {
        name: "Client reporting agent",
        body: "Compiles days in AR, clean-claim rate, denial rate and collections per client each month, writes the commentary for a manager to review, and delivers the report on schedule.",
      },
    ],
  },
};

export default service;
