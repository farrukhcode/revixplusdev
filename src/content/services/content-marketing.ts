import type { Service } from "../types";

const service: Service = {
  slug: "content-marketing",
  pillar: "growth",
  title: "Content marketing and copywriting that ranks and converts",
  shortTitle: "Content Marketing",
  eyebrow: "Growth Marketing",
  seoTitle: "Content Marketing & Copywriting Services | RevixPlus",
  metaDescription:
    "Pillar pages, blog posts, case studies and email copy briefed against real search demand, drafted with AI help and edited by humans to a strict standard.",
  keywords: [
    "content marketing agency",
    "copywriting services",
    "blog writing service",
    "pillar page content",
    "case study writing",
    "SEO content writing",
    "B2B content marketing",
  ],
  icon: "FileText",
  heroPromise:
    "Most content fails for one of two reasons: it was written without a target query, or it reads like a machine wrote it. We fix both. Every piece starts with a brief tied to search demand and a stage in your funnel, drafts move fast with AI assistance, and a human editor rewrites until it sounds like a person who knows the subject.",
  pains: [
    {
      title: "The blog has fifty posts and no traffic",
      body: "Years of articles sit in the archive without a single page ranking for anything a buyer types. Each one was written about what the company wanted to say, not what customers were searching for.",
    },
    {
      title: "Everything reads like it was generated",
      body: "The posts are grammatically perfect and completely forgettable, full of the same phrases every competitor publishes. Readers sense it within a paragraph and leave, and search engines are learning to notice too.",
    },
    {
      title: "Nobody owns the calendar",
      body: "Content gets written when someone has a free afternoon, which means months pass between posts. There is no plan for which topics build authority, so effort scatters across subjects that never add up.",
    },
  ],
  deliverables: [
    "Keyword and topic research",
    "Content briefs per page",
    "Pillar and cluster pages",
    "Blog posts and guides",
    "Case study writing",
    "Website and landing page copy",
    "Email and newsletter copy",
    "Human editorial review",
  ],
  approach: [
    {
      step: "Research",
      body: "We map the questions your buyers ask at each stage, check search demand and what already ranks, and group topics into pillars and clusters that build authority together.",
    },
    {
      step: "Brief",
      body: "Every piece gets a one-page brief before writing: target query, reader, angle, outline, sources to cite, internal links and the action the reader should take at the end.",
    },
    {
      step: "Draft",
      body: "We produce first drafts quickly with AI assistance from the brief, then a human editor rewrites for voice, cuts filler, checks every fact and adds the specifics only an expert knows.",
    },
    {
      step: "Publish",
      body: "We format, add schema and images, link the piece into its cluster, and publish on a fixed weekly cadence so search engines and readers learn when to expect you.",
    },
    {
      step: "Refresh",
      body: "We review rankings each quarter, update pages that slipped, merge pieces that compete with each other, and retire posts that no longer earn their place in the index.",
    },
  ],
  stack: [
    "Ahrefs",
    "Google Search Console",
    "Claude and ChatGPT for drafting",
    "Grammarly and Hemingway",
    "Notion editorial calendar",
    "WordPress and Next.js MDX",
    "Schema.org Article markup",
    "Resend and Mailchimp",
  ],
  startingAt: {
    price: "from $1,000",
    timeline: "per month",
    note: "Four edited pieces a month, 1,200 to 2,000 words each, with briefs.",
  },
  relatedWork: ["revixmd-website", "bankful", "the-vitamin-company"],
  relatedServices: ["seo", "aieo-geo", "email-marketing-automation"],
  faqs: [
    {
      q: "Do you use AI to write content?",
      a: "Yes, for first drafts and research, and never for the final word. Every piece starts from a human-written brief, is drafted with AI assistance to save time, and is then rewritten by an editor who removes generic phrasing, checks facts against sources and adds the detail only someone who knows the subject would include. You get the speed without the machine sound.",
    },
    {
      q: "How many pieces of content do I need each month?",
      a: "Four well-briefed pieces a month is enough for most businesses to build a topic cluster within a quarter, and it is the base of our plan. Publishing more only helps if each piece still gets a brief and an editor. Sites in competitive niches, or those launching several service lines at once, usually move to eight or twelve pieces after the first quarter.",
    },
    {
      q: "What is a content brief and why does it matter?",
      a: "A content brief is a one-page plan written before any drafting: the target query, who is reading, the angle that beats the current top results, an outline, sources to cite, internal links and the action the reader should take. It matters because it is where ranking decisions happen. A great draft of the wrong brief still fails, while a plain draft of a sharp brief usually ranks.",
    },
    {
      q: "Can you write about technical or regulated industries?",
      a: "Yes. Our team has written for medical and dental billing, payments and fintech, construction software and energy storage, each with its own vocabulary and compliance rules. For regulated topics we cite primary sources such as government and standards bodies, avoid claims we cannot support, and route drafts through your subject expert before publishing. The editor's job is to sound credible to a professional reader.",
    },
    {
      q: "Who owns the content you produce?",
      a: "You do, fully and from the moment it is delivered. Every brief, draft, image and final piece is yours to publish, edit, repurpose or move to another agency. We keep no license and we do not reuse your content for other clients. If you ever leave, you take the editorial calendar, the keyword map and the source files with you.",
    },
  ],
  authorityLinks: [
    {
      label: "Google: Creating helpful, reliable, people-first content",
      href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    },
    {
      label: "Google: AI-generated content guidance",
      href: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content",
    },
    {
      label: "Schema.org Article",
      href: "https://schema.org/Article",
    },
  ],
};

export default service;
