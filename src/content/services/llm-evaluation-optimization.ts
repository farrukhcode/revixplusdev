import type { Service } from "../types";

const service: Service = {
  slug: "llm-evaluation-optimization",
  pillar: "ai",
  title: "LLM evaluation, fine-tuning and cost optimization",
  shortTitle: "LLM Evals & Optimization",
  eyebrow: "AI Solutions",
  seoTitle: "LLM Evaluation, Fine-Tuning & Cost Optimization | RevixPlus",
  metaDescription:
    "Evaluation sets, regression runs and guardrails for AI features you ship, plus model routing, caching and token budgets that cut your monthly model bill.",
  keywords: [
    "LLM evaluation",
    "AI model cost optimization",
    "LLM fine-tuning services",
    "prompt engineering consultant",
    "AI guardrails",
    "reduce OpenAI costs",
  ],
  icon: "Gauge",
  heroPromise:
    "Shipping an AI feature is the easy part. Knowing whether last week's prompt change made it worse, and why the model bill doubled, is the part most teams skip. We build evaluation sets from your real traffic, run regressions before every change, add guardrails, and route, cache and budget model calls so quality goes up while spend goes down.",
  pains: [
    {
      title: "Changes nobody can measure",
      body: "Someone edits a prompt, it feels better on three examples, and it ships. Two weeks later support tickets rise and nobody can prove which change caused it or roll it back with confidence.",
    },
    {
      title: "A model bill that keeps climbing",
      body: "Every request goes to the biggest model with the longest prompt. Usage grows, the invoice grows faster, and finance is asking for a number nobody on the engineering team can defend.",
    },
    {
      title: "Outputs that embarrass the brand",
      body: "The assistant occasionally invents a policy, leaks a system prompt, or answers off-topic. Without guardrails and tests, every incident is discovered by a customer first.",
    },
  ],
  deliverables: [
    "Evaluation set from real traffic",
    "Automated regression runs",
    "Accuracy and quality scorecards",
    "Input and output guardrails",
    "Model routing by task",
    "Prompt and response caching",
    "Token budgets and alerts",
    "Fine-tuning when it pays off",
  ],
  approach: [
    {
      step: "Baseline",
      body: "We sample real requests and outputs, label them with your team, and build an evaluation set that scores accuracy, format, safety and tone. This becomes the bar every change must pass.",
    },
    {
      step: "Instrument",
      body: "Every model call is logged with cost, latency, tokens and the prompt version. Within a week you can see which features, users and prompts drive spend and where quality dips.",
    },
    {
      step: "Optimize",
      body: "Cheaper models handle easy requests, caching removes repeated work, prompts shrink without losing accuracy, and budgets alert before overruns. Each change is proven on the eval set.",
    },
    {
      step: "Guard and fine-tune",
      body: "Guardrails catch injections, off-topic requests and policy violations. If format or tone still miss after prompting, we fine-tune a smaller model and compare it against the baseline.",
    },
  ],
  stack: [
    "Claude API",
    "OpenAI API",
    "Promptfoo",
    "LangSmith",
    "Vercel AI SDK",
    "Redis",
    "PostgreSQL",
    "Grafana",
    "Python",
    "TypeScript",
  ],
  startingAt: {
    price: "from $3,000",
    timeline: "2 weeks",
    note: "Covers one AI feature. Fine-tuning runs are quoted separately.",
  },
  relatedWork: ["difacto", "revixmd-ai-automation", "bankful"],
  relatedServices: ["ai-integration", "rag-knowledge-assistants", "security-compliance"],
  faqs: [
    {
      q: "What is LLM evaluation and why do we need it?",
      a: "LLM evaluation is the practice of scoring an AI feature's outputs against a fixed set of real examples so every prompt, model or retrieval change can be measured. Without it, teams ship changes on gut feel and discover regressions through customer complaints.",
    },
    {
      q: "How can we reduce our OpenAI or Claude API costs?",
      a: "You reduce model costs by routing simple requests to smaller models, caching repeated prompts and responses, trimming prompt length, setting token budgets per feature, and batching where latency allows. RevixPlus proves each change on your evaluation set before it ships.",
    },
    {
      q: "When does fine-tuning make sense instead of prompting?",
      a: "Fine-tuning makes sense when a feature needs a consistent format, tone or classification that prompting cannot reach reliably, and when volume is high enough that a smaller fine-tuned model saves money. Facts and knowledge still belong in retrieval, not in the fine-tune.",
    },
    {
      q: "What are AI guardrails?",
      a: "AI guardrails are checks on inputs and outputs that block prompt injection, off-topic requests, policy violations and leaked system instructions before they reach users. They run alongside the model and are tested with adversarial examples as part of the evaluation suite.",
    },
    {
      q: "How much does LLM optimization cost?",
      a: "LLM evaluation and optimization at RevixPlus starts at $3,000 for one feature over about two weeks, including the evaluation set, instrumentation and the first round of routing and caching. Clients usually recover the fee through lower monthly model spend within a quarter.",
    },
  ],
  authorityLinks: [
    {
      label: "Anthropic: Prompt caching",
      href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
    },
    {
      label: "OpenAI: Fine-tuning guide",
      href: "https://platform.openai.com/docs/guides/fine-tuning",
    },
    {
      label: "OWASP: Top 10 for LLM applications",
      href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    },
  ],
};

export default service;
