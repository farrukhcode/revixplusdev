import type { Service } from "../types";

const service: Service = {
  slug: "chatbots-voice-agents",
  pillar: "ai",
  title: "Custom chatbots and voice agents that capture and qualify leads",
  shortTitle: "Chatbots & Voice Agents",
  eyebrow: "AI Solutions",
  seoTitle: "Custom AI Chatbots & Voice Agents for Business | RevixPlus",
  metaDescription:
    "Website concierges, WhatsApp and Instagram bots, and voice agents for support and booking, built on your content with lead capture and clean handoff.",
  keywords: [
    "custom chatbot development",
    "AI voice agent",
    "WhatsApp chatbot for business",
    "website AI assistant",
    "AI booking agent",
    "conversational AI agency",
  ],
  icon: "MessageSquare",
  heroPromise:
    "Most visitors leave with a question nobody answered. A concierge on your site, a bot in your WhatsApp inbox, or a voice agent on your phone line can answer it at two in the morning, qualify the lead, book the call and hand the conversation to a human with full context. Built on your real content, not a generic script.",
  pains: [
    {
      title: "Questions arrive after you close",
      body: "Prospects message at night and on weekends, get silence, and buy from whoever replies first. Your team wakes up to a queue of conversations that have already gone cold.",
    },
    {
      title: "Support answers the same thing daily",
      body: "Delivery times, pricing, how to reset a password, where the office is. The same thirty questions fill the inbox, and the people answering them cannot get to the hard cases.",
    },
    {
      title: "Bots that frustrate instead of help",
      body: 'The old chatbot loops through menu options, cannot understand a plain sentence, and has no way to reach a person. Customers learned to type "agent" and ignore everything else.',
    },
  ],
  deliverables: [
    "Website concierge widget",
    "WhatsApp and Instagram bots",
    "Voice agent with call handling",
    "Lead qualification flow",
    "Booking and calendar integration",
    "Human handoff with context",
    "Conversation analytics",
    "Tone and guardrail rules",
  ],
  approach: [
    {
      step: "Learn your business",
      body: "We ingest your site, FAQs, pricing, policies and past conversations, then define what the assistant may say, what it must never promise, and when it hands off to a person.",
    },
    {
      step: "Design the conversations",
      body: "Qualification questions, booking paths and support flows are written with your team and tested against real transcripts so the assistant sounds like you and asks what matters.",
    },
    {
      step: "Build and connect",
      body: "The assistant goes live on your site, WhatsApp, Instagram or phone line, connected to your calendar, CRM and ticketing tool so every lead and request lands where your team works.",
    },
    {
      step: "Tune on real traffic",
      body: "For the first month we review conversations weekly, fix gaps in knowledge, tighten guardrails, and report what people ask, where they convert, and where humans had to step in.",
    },
  ],
  stack: [
    "Claude API",
    "OpenAI Realtime",
    "Vercel AI SDK",
    "WhatsApp Business API",
    "Instagram Messaging API",
    "Twilio",
    "Cal.com",
    "HubSpot",
    "Next.js",
    "n8n",
  ],
  startingAt: {
    price: "from $3,500",
    timeline: "2 weeks",
    note: "One channel in the first release. Voice agents are quoted separately.",
  },
  relatedWork: ["thetoys", "revixmd-website", "sushi2500"],
  relatedServices: ["rag-knowledge-assistants", "ai-agents-automation", "social-media-marketing"],
  faqs: [
    {
      q: "What can a custom AI chatbot do for my business?",
      a: "A custom AI chatbot answers questions from your own content, qualifies leads with a short set of questions, books meetings on your calendar, and hands conversations to a human with full context. It works on your website, WhatsApp, Instagram or Messenger around the clock.",
    },
    {
      q: "How is this different from a generic chatbot plugin?",
      a: "A generic plugin follows a fixed menu and does not know your business. RevixPlus builds the assistant on your site content, pricing, policies and past conversations, adds guardrails on what it may promise, and connects it to your CRM and calendar so leads are captured.",
    },
    {
      q: "Can you build a WhatsApp chatbot for Pakistan or the UAE?",
      a: "Yes. We build WhatsApp Business API bots for order status, cash-on-delivery confirmations, catalog questions and lead capture, which fits markets like Pakistan and the UAE where WhatsApp is the main customer channel. The bot hands off to your team inside the same thread.",
    },
    {
      q: "What is an AI voice agent and when does it make sense?",
      a: "An AI voice agent answers phone calls, understands natural speech, and handles bookings, FAQs or intake before transferring to a person. It makes sense when a business misses calls after hours or spends staff time on routine phone requests like appointment scheduling.",
    },
    {
      q: "How much does a chatbot cost to build?",
      a: "A custom chatbot at RevixPlus starts at $3,500 for one channel, delivered in about two weeks with lead capture, handoff and a month of tuning. Voice agents and multi-channel deployments are quoted after a call, and monthly costs cover model and messaging usage.",
    },
  ],
  authorityLinks: [
    {
      label: "Anthropic: Prompt engineering overview",
      href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
    },
    {
      label: "Meta: WhatsApp Business Platform documentation",
      href: "https://developers.facebook.com/docs/whatsapp/",
    },
    {
      label: "OpenAI: Realtime API guide",
      href: "https://platform.openai.com/docs/guides/realtime",
    },
  ],
};

export default service;
