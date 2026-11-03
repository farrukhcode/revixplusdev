/**
 * Home page story copy. Ten chapters. No em dashes anywhere in site copy.
 */
export const home = {
  hero: {
    eyebrow: "AI · Web · Mobile · Games · Growth",
    headline: "We build what's next for your business.",
    sub: "One senior team for software, AI integration, and the marketing that fills it with customers. From the first sketch to scale.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "Watch the story", href: "#problem" },
    trust: ["10+ years shipping", "50+ launches", "Clients in the US, UK, EU, UAE and Pakistan"],
  },
  problem: {
    eyebrow: "The problem",
    headline: "Every business has a next chapter. Most are stuck on this page.",
    beats: [
      {
        title: "Your site is slow and looks like 2019.",
        body: "Visitors judge in a second. A dated, heavy site loses the sale before anyone reads a word.",
      },
      {
        title: "Your team does by hand what software should.",
        body: "Copying data between tools, chasing status, rebuilding the same report. Hours that never come back.",
      },
      {
        title: "Customers now ask ChatGPT, and you are not in the answer.",
        body: "Search moved. If AI assistants cannot find and cite you, a growing share of buyers never will.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    headline: "One team. Every discipline. No hand-offs.",
    body: "Strategy, design, engineering, AI and marketing sit at the same table, so the product and the plan to sell it are built together.",
  },
  ai: {
    eyebrow: "AI, integrated",
    headline: "AI that works inside the tools you already run.",
    body: "We have shipped RAG pipelines, Claude and OpenAI assistants, MCP tool integrations and n8n automations into live products. We do not rip and replace. We plug intelligence into what you have, and we keep it safe.",
    proof: [
      { label: "DiFacto", detail: "AI invoice control for construction" },
      { label: "Revix MD", detail: "HIPAA-compliant agents for medical billing" },
    ],
    chatPrompt: "Ask what AI could do for your business",
    chatSuggestions: [
      "What would a HIPAA-compliant agent cost for a billing company?",
      "Can you add AI to our existing Shopify store?",
      "How do you keep our data private?",
    ],
  },
  work: {
    eyebrow: "Selected work",
    headline: "Proof, not promises.",
    body: "Products, stores and platforms we have built and run for clients in five countries.",
    cta: { label: "See all work", href: "/work" },
  },
  process: {
    eyebrow: "How we work",
    headline: "A process you can see from day one.",
    body: "Fixed-price discovery, weekly demos, and a launch plan agreed before we write code.",
  },
  growth: {
    eyebrow: "Growth",
    headline: "Built it? Now let's fill it.",
    body: "Search, AI answers, social and ads, run as one system with one dashboard.",
    panels: [
      {
        title: "SEO",
        value: 90,
        suffix: "+",
        metricLabel: "Lighthouse performance score on every page we ship",
        body: "Technical fixes, content silos and Core Web Vitals, measured monthly.",
        href: "/services/seo",
      },
      {
        title: "AI engine optimization",
        value: 5,
        suffix: "",
        metricLabel:
          "AI engines we optimize for: ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews",
        body: "llms.txt, schema, entity clarity and citeable pages so assistants quote you.",
        href: "/services/aieo-geo",
      },
      {
        title: "Social",
        value: 30,
        suffix: "+",
        metricLabel: "creatives a month from one templated system",
        body: "Reels, statics and a calendar that matches how your customers actually scroll.",
        href: "/services/social-media-marketing",
      },
      {
        title: "Paid ads",
        value: 7,
        suffix: " days",
        metricLabel: "from kickoff to live tracking and first campaigns",
        body: "Tracking first, then creative testing, retargeting and budget pacing.",
        href: "/services/paid-advertising",
      },
    ],
  },
  numbers: {
    eyebrow: "By the numbers",
    headline: "The numbers behind the story.",
  },
  voices: {
    eyebrow: "Client voices",
    headline: "What clients say.",
  },
  cta: {
    eyebrow: "Start a project",
    headline: "Let's write your next chapter.",
    body: "Reply within one business day. NDA on request.",
    doors: [
      {
        title: "Book a 20-minute call",
        body: "Bring the idea. Leave with a scope and a price range.",
        href: "booking",
        icon: "CalendarClock",
      },
      {
        title: "Book a free AI-readiness call",
        body: "Twenty minutes on where AI fits your business, and the three things to do first.",
        href: "/contact?topic=ai-readiness",
        icon: "Sparkles",
      },
      {
        title: "WhatsApp us",
        body: "Fastest for quick questions and quotes.",
        href: "whatsapp",
        icon: "MessageCircle",
      },
    ],
  },
} as const;
