import type { Service } from "../types";

const service: Service = {
  slug: "email-marketing-automation",
  pillar: "growth",
  title: "Email and SMS marketing automation that sells while you sleep",
  shortTitle: "Email & SMS Automation",
  eyebrow: "Growth Marketing",
  seoTitle: "Email & SMS Marketing Automation Services | RevixPlus",
  metaDescription:
    "Welcome, abandoned cart, win-back and nurture flows in Klaviyo, Mailchimp or Resend, with segmentation and deliverability handled. Measured in revenue per send.",
  keywords: [
    "email marketing automation",
    "Klaviyo agency",
    "abandoned cart emails",
    "email flows ecommerce",
    "SMS marketing",
    "Mailchimp automation",
    "lead nurture sequences",
  ],
  icon: "Mail",
  heroPromise:
    "The customers you already have are the cheapest ones to sell to again, and email is still the channel that reaches them without an algorithm in the way. We build the flows that run on their own, from welcome series to abandoned cart to win-back, segment your list so the right person gets the right message, and keep deliverability clean so the messages land.",
  pains: [
    {
      title: "A big list that never hears from you",
      body: "Thousands of customers and subscribers sit in the database, and the only email they ever receive is an occasional sale announcement. Every one of them cost money to acquire, and that money is idle.",
    },
    {
      title: "Carts get abandoned and forgotten",
      body: "Shoppers add products, get distracted, and never come back because nothing reminds them. The store loses the sale it was seconds away from closing, and it happens dozens of times a week.",
    },
    {
      title: "Emails land in spam or promotions",
      body: "Open rates have slid for months because authentication was never set up, the list has not been cleaned, and every send goes to everyone. Inbox providers have quietly decided you are noise.",
    },
  ],
  deliverables: [
    "Platform setup and migration",
    "Welcome and onboarding flows",
    "Abandoned cart and browse flows",
    "Win-back and re-engagement",
    "Segmentation strategy",
    "Campaign design and copy",
    "SMS flows and compliance",
    "Deliverability and authentication",
  ],
  approach: [
    {
      step: "Audit",
      body: "We review your platform, list health, authentication records, existing flows and the last six months of sends to find where revenue leaks and which fixes pay back first.",
    },
    {
      step: "Fix",
      body: "We set up SPF, DKIM and DMARC, clean inactive contacts, warm the sending domain if needed, and connect your store or CRM so events like purchases trigger the right flow.",
    },
    {
      step: "Build",
      body: "We write and design the core flows in priority order, usually welcome, abandoned cart, post-purchase and win-back, each with timing, branching and exit rules documented.",
    },
    {
      step: "Segment",
      body: "We split the list by behavior, purchase history and engagement, so campaigns go to people likely to act and the rest are left alone until there is a reason to write.",
    },
    {
      step: "Optimize",
      body: "We test subject lines, send times and offers one variable at a time, report revenue per flow and per send each month, and retire anything that stops earning.",
    },
  ],
  stack: [
    "Klaviyo",
    "Mailchimp",
    "Resend and React Email",
    "Shopify and WooCommerce",
    "HubSpot",
    "n8n",
    "Twilio SMS",
    "Google Postmaster Tools",
    "Litmus",
  ],
  startingAt: {
    price: "from $700",
    timeline: "per month",
    note: "Setup and the first four flows in month one, then campaigns and optimization.",
  },
  relatedWork: ["the-vitamin-company", "meeshan-luxe-home", "medallion-dusk"],
  relatedServices: ["ecommerce-development", "conversion-rate-optimization", "ai-agents-automation"],
  faqs: [
    {
      q: "Which email flows should every online store have?",
      a: "Four flows do most of the work: a welcome series for new subscribers, an abandoned cart reminder, a post-purchase sequence that asks for reviews and suggests related products, and a win-back flow for customers who have gone quiet. Browse abandonment and back-in-stock alerts come next. We build them in that order so revenue starts arriving in the first month.",
    },
    {
      q: "Klaviyo, Mailchimp or something else?",
      a: "Klaviyo is our default for Shopify and WooCommerce stores because its event tracking and segmentation are built for commerce. Mailchimp suits service businesses and smaller lists that mostly send campaigns. For products with developers in house we often build on Resend with React Email, which costs less and lives inside your codebase. We recommend one in the audit based on your list size, platform and budget.",
    },
    {
      q: "How do you improve email deliverability?",
      a: "Deliverability comes down to authentication, list hygiene and sending behavior. We publish SPF, DKIM and DMARC records, remove contacts who have not opened in months, warm up any new sending domain gradually, and stop sending every campaign to the whole list. Google Postmaster Tools then shows us domain reputation and spam rates, which we check every week so a problem is caught before open rates collapse.",
    },
    {
      q: "Is SMS marketing worth adding?",
      a: "SMS is worth it for stores with repeat purchases and time-sensitive offers, because messages are read within minutes, but it needs explicit consent and careful frequency. We add SMS only after the email flows are working, limit it to a few high-value moments such as cart recovery and restocks, and handle opt-in language and quiet hours for each country you sell in.",
    },
    {
      q: "How do you report on email performance?",
      a: "We report revenue per flow, revenue per campaign and revenue per recipient, alongside open, click and unsubscribe rates, in one monthly page. Flows are tracked separately from campaigns so you can see what runs on its own versus what needed a send. Deliverability metrics from Postmaster Tools appear on the same page, because a drop there explains most sudden drops everywhere else.",
    },
  ],
  authorityLinks: [
    {
      label: "Klaviyo Help Center",
      href: "https://help.klaviyo.com/",
    },
    {
      label: "Mailchimp Marketing Resources",
      href: "https://mailchimp.com/resources/",
    },
    {
      label: "Google: Email sender guidelines",
      href: "https://support.google.com/mail/answer/81126",
    },
  ],
};

export default service;
