import type { Service } from "../types";

const service: Service = {
  slug: "conversion-rate-optimization",
  pillar: "growth",
  title: "Conversion rate optimization and landing pages that close the gap",
  shortTitle: "Conversion Optimization",
  eyebrow: "Growth Marketing",
  seoTitle: "Conversion Rate Optimization & Landing Pages | RevixPlus",
  metaDescription:
    "Analytics audit, Clarity heatmaps, A/B tests, checkout and form fixes, and speed work that turns the traffic you already have into more leads and orders.",
  keywords: [
    "conversion rate optimization",
    "CRO agency",
    "landing page optimization",
    "A/B testing service",
    "checkout optimization",
    "website conversion audit",
    "heatmap analysis",
  ],
  icon: "MousePointerClick",
  heroPromise:
    "Doubling traffic is expensive. Doubling the share of visitors who act is usually cheaper, and the gains compound with every campaign you run afterward. We watch real sessions in Clarity, find where people hesitate or leave, fix forms, checkouts and speed, then run A/B tests with enough traffic to trust the result. Everything ships through our own developers.",
  pains: [
    {
      title: "Plenty of visitors, very few inquiries",
      body: "Thousands of people land on the site every month and a tiny fraction fill the form or buy. Nobody knows where the rest went, because the only data available is a bounce rate.",
    },
    {
      title: "Checkout loses people at the last step",
      body: "Shoppers reach the payment page and vanish. Shipping costs appear late, the form demands an account, or a coupon field tempts them to leave and hunt for a code they never find.",
    },
    {
      title: "Changes get made on opinion",
      body: "The button turned green because someone read that green converts. The headline changed because the owner preferred it. Without a test, nobody knows whether either change helped or quietly hurt.",
    },
  ],
  deliverables: [
    "Analytics and funnel audit",
    "Session recordings and heatmaps",
    "Form and checkout fixes",
    "Page speed improvements",
    "A/B test design and setup",
    "Landing page builds",
    "Copy and offer tests",
    "Prioritized fix backlog",
  ],
  approach: [
    {
      step: "Measure",
      body: "We check that analytics events fire correctly, map the funnel step by step, and install Microsoft Clarity so we can watch where real visitors scroll, click, hesitate and leave.",
    },
    {
      step: "Diagnose",
      body: "We review recordings and heatmaps against the funnel data, list every friction point we find, and rank them by how many people they affect and how easy they are to fix.",
    },
    {
      step: "Fix",
      body: "We ship the obvious wins first without waiting for a test: slow pages, broken mobile layouts, forms that ask too much, and checkout steps that surprise people with costs.",
    },
    {
      step: "Test",
      body: "We run A/B tests on the changes that could go either way, one variable at a time, and only call a winner once the sample size is large enough to trust.",
    },
    {
      step: "Repeat",
      body: "We keep a backlog of ideas ranked by expected impact, ship the next one as soon as a test concludes, and report conversion rate and revenue per visitor every month.",
    },
  ],
  stack: [
    "Microsoft Clarity",
    "Google Analytics 4",
    "Google Tag Manager",
    "PostHog or VWO",
    "PageSpeed Insights",
    "Hotjar",
    "Next.js",
    "Shopify and WooCommerce",
    "Figma",
  ],
  startingAt: {
    price: "from $1,500",
    timeline: "3 weeks for the audit and first fixes",
    note: "Ongoing testing from $900 a month.",
  },
  relatedWork: ["bankful", "the-vitamin-company", "sushi2500"],
  relatedServices: ["paid-advertising", "ui-ux-design", "web-development"],
  faqs: [
    {
      q: "What is a good conversion rate for a website?",
      a: "It depends on the industry and the traffic source, which is why we compare you with your own history rather than a universal benchmark. Ecommerce stores commonly convert between one and three percent of visitors, while lead forms for services often sit higher because the ask is smaller. A paid campaign landing page should beat the site average comfortably, or it is not doing its job.",
    },
    {
      q: "How much traffic do I need for A/B testing?",
      a: "A test needs enough conversions, not just visitors, to produce a trustworthy answer, and for most sites that means at least a few hundred conversions per variant over two to four weeks. Below that, we skip formal testing and rely on session recordings, usability reviews and clear best practices instead. Guessing from a tiny sample is worse than making an informed change and watching the trend.",
    },
    {
      q: "What do you look for in session recordings?",
      a: "We look for hesitation and frustration: rapid repeated clicks on something that is not a button, long pauses on a form field, scrolling up and down hunting for a price, and exits right after a cost or an error appears. Microsoft Clarity flags many of these automatically. A few dozen recordings usually reveal the same three or four problems, and those become the first fixes.",
    },
    {
      q: "Does page speed really affect conversions?",
      a: "Yes, measurably. Google's research, published on web.dev, links slower load times with higher bounce rates on mobile, and our own work rebuilding a payment gateway's marketing site around Core Web Vitals improved its organic traffic. Speed is usually the first thing we fix because it helps every page at once and does not need a test to justify it.",
    },
    {
      q: "Will CRO changes hurt my SEO?",
      a: "No, when done properly they help it. Faster pages, clearer headings and simpler layouts are rewarded by search engines as well as visitors. During A/B tests we follow Google's guidance: no cloaking, a canonical tag pointing to the original, and tests that end once a winner is found rather than running forever. The winning version is then published as the permanent page.",
    },
  ],
  authorityLinks: [
    {
      label: "web.dev: Why speed matters",
      href: "https://web.dev/articles/why-speed-matters",
    },
    {
      label: "Microsoft Clarity",
      href: "https://clarity.microsoft.com/",
    },
    {
      label: "Google: Website testing and Search",
      href: "https://developers.google.com/search/docs/crawling-indexing/website-testing",
    },
  ],
};

export default service;
