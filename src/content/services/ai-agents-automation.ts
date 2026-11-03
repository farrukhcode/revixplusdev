import type { Service } from "../types";

const service: Service = {
  slug: "ai-agents-automation",
  pillar: "ai",
  title: "AI agents and workflow automation with n8n and MCP",
  shortTitle: "AI Agents & Automation",
  eyebrow: "AI Solutions",
  seoTitle: "AI Agents & Workflow Automation (n8n, MCP) | RevixPlus",
  metaDescription:
    "Agents that read and act on your CRM, Notion, email and databases through least-privilege MCP tools, with n8n workflows and human approval gates.",
  keywords: [
    "AI agents development",
    "workflow automation agency",
    "n8n automation services",
    "MCP tool integration",
    "business process automation with AI",
    "AI automation consultant",
  ],
  icon: "Workflow",
  heroPromise:
    "The work that eats your team's day is usually a chain of small steps across five tools. We build agents that handle the chain: read the ticket, look up the record, draft the reply, update the CRM, ask a human before anything irreversible. Each tool the agent can touch is scoped to the least privilege it needs, and every action is logged.",
  pains: [
    {
      title: "Five tools, zero connection",
      body: "Leads land in a form, get copied into the CRM, chased by email and tracked in a spreadsheet. Every handoff is a person pasting data, and every paste is a chance for something to fall through.",
    },
    {
      title: "Automations that nobody trusts",
      body: "An earlier bot sent the wrong email to a client or overwrote a record. Now the team double-checks everything it does, which means the automation saves nothing and costs attention.",
    },
    {
      title: "Agents with the keys to everything",
      body: "Plenty of agent demos run with admin credentials and no audit trail. One bad prompt or one injected instruction and the agent can delete, export or email anything it can reach.",
    },
  ],
  deliverables: [
    "Process audit and automation map",
    "n8n workflows with error handling",
    "Agents with scoped MCP tools",
    "Human approval gates",
    "CRM, Notion and email connectors",
    "Action logs and audit trail",
    "Monitoring and failure alerts",
    "Team training and runbooks",
  ],
  approach: [
    {
      step: "Map the chain",
      body: "We document each step, system and decision in the workflow, mark which steps are deterministic and which need judgment, and decide where a human must approve before an action.",
    },
    {
      step: "Build the tools",
      body: "Each system the agent touches gets an MCP tool with the narrowest permissions possible, read-only where it can be, and validation on every input before anything is written.",
    },
    {
      step: "Wire and test",
      body: "n8n orchestrates triggers, retries and branches while the agent handles the judgment steps. We replay real historical cases through the flow and review every action it proposes.",
    },
    {
      step: "Run with oversight",
      body: "The workflow goes live with approval gates, logs and alerts. After two weeks of supervised runs, you decide which gates to relax, and we hand over runbooks for maintenance.",
    },
  ],
  stack: [
    "n8n",
    "Model Context Protocol",
    "Claude API",
    "OpenAI API",
    "HubSpot",
    "Notion",
    "Slack",
    "Gmail and Outlook",
    "PostgreSQL",
    "Docker",
    "Webhooks",
  ],
  startingAt: {
    price: "from $4,000",
    timeline: "3 weeks",
    note: "One end-to-end workflow with up to four connected systems.",
  },
  relatedWork: ["revixmd-ai-automation", "hrms-saas", "difacto"],
  relatedServices: ["healthcare-ai-automation", "ai-integration", "chatbots-voice-agents"],
  faqs: [
    {
      q: "What is the difference between an AI agent and a workflow automation?",
      a: "A workflow automation follows fixed rules: when X happens, do Y. An AI agent handles the steps that need judgment, such as reading a message, deciding what it asks for and drafting a response. RevixPlus combines both, with n8n for the rules and agents for the judgment.",
    },
    {
      q: "What is MCP and why does it matter for agents?",
      a: "MCP, the Model Context Protocol, is an open standard for giving AI models access to tools and data through defined interfaces. It matters because each tool can be scoped to specific permissions, so an agent reads a CRM record without being able to delete the account.",
    },
    {
      q: "Can agents take actions without a human checking?",
      a: "Agents can act autonomously for low-risk, reversible steps, and should pause for human approval before anything irreversible: sending to a client, moving money, deleting records. RevixPlus builds approval gates into every workflow and lets you relax them as trust is earned.",
    },
    {
      q: "Which systems can you connect?",
      a: "We connect anything with an API or webhook: HubSpot, Salesforce, Notion, Slack, Gmail, Outlook, Google Sheets, Airtable, Shopify, WooCommerce, Stripe, PostgreSQL and MySQL databases, and internal tools. n8n has hundreds of connectors and custom nodes cover the rest.",
    },
    {
      q: "How much does AI workflow automation cost?",
      a: "AI workflow automation at RevixPlus starts at $4,000 for one end-to-end workflow connecting up to four systems, delivered in about three weeks with logging and approval gates. Self-hosted n8n runs on your server, so ongoing costs are mostly model usage.",
    },
  ],
  authorityLinks: [
    {
      label: "Model Context Protocol: Introduction",
      href: "https://modelcontextprotocol.io/introduction",
    },
    {
      label: "n8n documentation",
      href: "https://docs.n8n.io/",
    },
    {
      label: "Anthropic: Building effective agents",
      href: "https://www.anthropic.com/research/building-effective-agents",
    },
  ],
};

export default service;
