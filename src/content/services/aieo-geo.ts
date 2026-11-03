import type { Service } from "../types";

const service: Service = {
  slug: "aieo-geo",
  pillar: "growth",
  title: "AI engine optimization: get cited by ChatGPT, Claude and Google AI",
  shortTitle: "AI Engine Optimization",
  eyebrow: "Growth Marketing",
  seoTitle: "AI Engine Optimization (AIEO / GEO) Services | RevixPlus",
  metaDescription:
    "Get your business cited in ChatGPT, Claude, Perplexity and Google AI Overviews. Schema, llms.txt, entity clarity and citeable pages, with AI referrals measured.",
  keywords: [
    "AI engine optimization",
    "AIEO services",
    "generative engine optimization",
    "GEO agency",
    "get cited by ChatGPT",
    "AI Overviews optimization",
    "llms.txt",
  ],
  icon: "BrainCircuit",
  heroPromise:
    "When a buyer asks ChatGPT or Perplexity who to hire, the answer comes from a handful of pages the model trusts. We make yours one of them: clear entity statements, structured data, quotable answers, an llms.txt file and fast indexing through Bing and IndexNow. Then we measure the referrals that AI assistants send, so you know it is working.",
  pains: [
    {
      title: "AI assistants never mention you",
      body: "People now ask ChatGPT and Perplexity for recommendations before they search. The answers name three or four companies, and yours is not one of them, because nothing on your site reads as a clear, quotable fact.",
    },
    {
      title: "Google AI Overviews skip your page",
      body: "Your page ranks on the first result page, yet the AI summary above it quotes a competitor. The summary favors pages with direct answers, structured data and consistent entity names, and yours has none of those.",
    },
    {
      title: "Nobody can measure AI traffic",
      body: "Visits from ChatGPT, Perplexity and Copilot arrive in analytics as direct or referral noise. Without a way to see them, nobody knows whether the work matters, so budget stays with channels you can count.",
    },
  ],
  deliverables: [
    "AI visibility audit",
    "Entity and brand statements",
    "Schema markup (Organization, FAQ, Service)",
    "llms.txt and llms-full.txt",
    "Citeable answer pages",
    "Bing Webmaster and IndexNow",
    "AI referral tracking",
    "Monthly citation report",
  ],
  approach: [
    {
      step: "Audit",
      body: "We ask ChatGPT, Claude, Perplexity and Google AI the questions your buyers ask, record who gets named and why, and compare their pages with yours line by line.",
    },
    {
      step: "Clarify",
      body: "We write plain entity statements about what you do, where you do it and who you serve, then repeat them consistently across your site, profiles and directories.",
    },
    {
      step: "Structure",
      body: "We add Organization, Service, FAQPage and Article schema, publish llms.txt, and rewrite key pages so each question gets a direct answer a model can lift verbatim.",
    },
    {
      step: "Distribute",
      body: "We submit to Bing Webmaster Tools and IndexNow, since ChatGPT and Copilot lean on Bing's index, and seed mentions on the sources models already cite.",
    },
    {
      step: "Measure",
      body: "We tag AI referrals in analytics, re-run the question set every month, and report which prompts now name you, which still do not, and what changes next.",
    },
  ],
  stack: [
    "Schema.org JSON-LD",
    "llms.txt",
    "Bing Webmaster Tools",
    "IndexNow",
    "Google Search Console",
    "Ahrefs Brand Radar",
    "Umami or GA4",
    "Next.js metadata API",
    "Perplexity and ChatGPT prompt sets",
  ],
  startingAt: {
    price: "from $1,500",
    timeline: "per month",
    note: "Pairs with SEO; the first month is mostly audit and structure.",
  },
  relatedWork: ["revixmd-website", "bankful"],
  relatedServices: ["seo", "content-marketing", "ai-strategy-readiness"],
  faqs: [
    {
      q: "What is AI engine optimization (AIEO) or GEO?",
      a: "AI engine optimization is the practice of making your business the source that AI assistants cite when they answer a buyer's question. It covers clear entity statements, structured data, direct answers on key pages, an llms.txt file and fast indexing. Some agencies call it generative engine optimization (GEO) or answer engine optimization. The goal is the same: be named in the answer.",
    },
    {
      q: "Does AIEO replace SEO?",
      a: "No, AIEO builds on SEO. AI assistants retrieve pages from the same indexes Google and Bing maintain, so a slow or poorly structured site struggles in both. We run the two as one program: SEO earns the crawl and the ranking, AIEO makes the page quotable and tracks whether assistants actually cite it.",
    },
    {
      q: "What is an llms.txt file and do I need one?",
      a: "An llms.txt file is a plain text page at your domain root that summarizes what your business does and links to your most important pages in a format language models can read quickly. It is a proposed convention rather than a formal standard, so it costs little and signals clarity. We publish it alongside structured data and a sitemap, never on its own.",
    },
    {
      q: "How do you measure whether AI assistants cite my business?",
      a: "We measure it two ways. First, a fixed set of buyer questions is run through ChatGPT, Claude, Perplexity and Google AI every month, and we log which companies get named. Second, referral traffic from AI domains is tagged separately in analytics so visits from assistants stop hiding inside direct traffic. Both numbers appear in your monthly report.",
    },
    {
      q: "How long until AI assistants start naming us?",
      a: "Expect the first citations within two to four months for specific, local or niche questions, and longer for broad category questions where large brands dominate. Models refresh their retrieval sources on different schedules, so Perplexity and Google AI usually react faster than ChatGPT. We set expectations per question in the audit rather than promising one date.",
    },
  ],
  authorityLinks: [
    {
      label: "Schema.org vocabulary",
      href: "https://schema.org/",
    },
    {
      label: "Google: AI features and your website",
      href: "https://developers.google.com/search/docs/appearance/ai-features",
    },
    {
      label: "IndexNow protocol",
      href: "https://www.indexnow.org/",
    },
  ],
};

export default service;
