import type { Faq } from "./types";

export const generalFaqs: Faq[] = [
  {
    q: "How do you price projects?",
    a: "Every project starts with a fixed-price discovery week that ends in a scoped backlog and a firm quote. Builds are billed by milestone as features go live on staging, so you pay for working software, not hours. Retainers are monthly with 30 days notice. Published starting prices are in US dollars and exclude third-party fees.",
  },
  {
    q: "How long does a typical project take?",
    a: "A launch site takes about two weeks, a Shopify store three, a web app MVP four, and a mobile app six, each after a one-week discovery. AI integrations into an existing platform run about three weeks. Game MVPs take around eight. Larger or regulated scopes get their own schedule, set in discovery before anything is quoted.",
  },
  {
    q: "How does remote work across time zones actually function?",
    a: "We are based in Lahore and keep daily overlap with US and European hours by agreement, usually four hours a day. You get a shared channel, a staging URL that updates as we ship, written progress notes every week and a live demo every Friday. Nothing waits for a meeting, and nothing is hidden until a milestone.",
  },
  {
    q: "Who actually builds the work?",
    a: "The senior engineer who scopes your project builds it, reviews every change and answers your messages. Other developers on the team work under that review, and specialists in design, content and growth join as the project needs them. We do not resell your project to another agency or hand it to an unnamed contractor.",
  },
  {
    q: "Who owns the code, the accounts and the content?",
    a: "You do, from the first day. Repositories live in your GitHub organization, hosting runs in your cloud or Coolify account, and API keys, domains and ad accounts are registered in your name. If the engagement ends, nothing needs to be migrated. We keep access only as long as you want us working on it.",
  },
  {
    q: "Do you use AI tools to build, and who checks the output?",
    a: "Yes. We use Claude Code, Cursor and GitHub Copilot daily, and every AI-assisted change passes TypeScript strict mode, automated tests and a human pull-request review before it merges. Content follows the same rule: drafted with help, edited and fact-checked by a person. AI speeds up the work; it does not sign off on it.",
  },
  {
    q: "How do you handle HIPAA and GDPR requirements?",
    a: "We build to the requirements rather than around them. For HIPAA work we sign a BAA with the model provider or self-host, minimize PHI before inference, log every access and keep a human approving sensitive actions. For GDPR we document data flows, apply retention limits and keep EU data where you need it. We describe our work as HIPAA-compliant architecture, never as certified.",
  },
  {
    q: "What is the first step if we want to start?",
    a: "Book a 20-minute call or message us on WhatsApp with a few lines about what you are building. We will reply within one business day with questions and, if it fits, a proposal for the discovery week.",
  },
];
