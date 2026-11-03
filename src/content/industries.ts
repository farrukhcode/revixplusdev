import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "healthcare-rcm",
    title: "Healthcare & Medical Billing",
    headline: "Software, AI and growth for medical billing companies and practices",
    seoTitle: "Healthcare & Medical Billing Software, HIPAA-Compliant AI | RevixPlus",
    metaDescription:
      "Websites, HIPAA-compliant AI agents and automation for medical billing companies, dental billing teams, practices and telehealth. Built on our Revix MD work.",
    intro:
      "Billing companies run on repetitive work: eligibility checks, claim status calls, denial follow-up, onboarding new billers. We build the websites that bring in practices and the AI agents that take the repetitive work off your team, on an architecture designed for PHI. Revix MD, a US medical billing company, is where we proved it.",
    pains: [
      {
        title: "Billers spend hours inside payer portals",
        body: "Eligibility checks, claim status lookups and denial research eat the morning before anyone touches an actual appeal. The work is predictable, which is exactly why it should not be manual.",
      },
      {
        title: "Denials sit unworked for weeks",
        body: "Denied claims land in a queue with no triage. By the time someone reads the CARC code, the timely filing window is closing and the money is harder to recover.",
      },
      {
        title: "Onboarding and tasks live in spreadsheets",
        body: "New billers get access by email, training by shadowing, and tasks through chat threads. Nobody can see who owns what, and client reporting takes a full day each month.",
      },
    ],
    services: [
      "healthcare-ai-automation",
      "ai-agents-automation",
      "security-compliance",
      "wordpress-development",
      "seo",
      "content-marketing",
    ],
    work: ["revixmd-ai-automation", "revixmd-website"],
    faqs: [
      {
        q: "Can AI agents work medical billing tasks without exposing PHI?",
        a: "Yes, when the architecture is built for it. We sign a BAA with the model provider or run the model inside your own environment, strip or tokenize identifiers before inference, keep zero data retention, log every action, and keep a human approving anything that touches a claim, a patient or money.",
      },
      {
        q: "Which billing software and clearinghouses can you connect to?",
        a: "Any system with an API, an export or a portal we can automate. That includes practice management platforms such as Tebra, AdvancedMD and eClinicalWorks, and clearinghouses such as Availity and Waystar. We confirm the exact integration path during the one-week discovery before quoting.",
      },
      {
        q: "Is this only for medical billing, or dental billing too?",
        a: "Both, plus practices and telehealth providers. Dental billing has its own CDT codes and payer rules, and we have worked on dental billing content and workflows alongside medical ones. The agent catalog is the same; the code sets, payers and validation rules change per specialty.",
      },
      {
        q: "Do you also build the website and bring in new practices?",
        a: "Yes. We built and maintain the Revix MD site, write its SEO content, and run the lead forms and subscriber flows behind it. Healthcare clients usually start with either the site or the automation, then add the other once the first one is paying for itself.",
      },
    ],
    icon: "HeartPulse",
  },
  {
    slug: "ecommerce",
    title: "E-commerce & Retail",
    headline: "Stores that load fast, convert, and keep selling after launch",
    seoTitle: "E-commerce Development & Growth for Shopify and WooCommerce | RevixPlus",
    metaDescription:
      "Shopify, WooCommerce and custom stores for brands in Pakistan, the Gulf, Europe and the US, including cash on delivery markets. Built on The Toys and Meeshan.",
    intro:
      "We have launched and run stores for a toy brand, a luxury furniture brand, one of Pakistan's leading supplement companies and a multivendor cosmetics marketplace. That means we know cash on delivery, courier integrations, returns flows and the social creatives that drive traffic, not just the checkout page. A store is a business system, and we build the whole thing.",
    pains: [
      {
        title: "The theme looks fine but the store is slow",
        body: "Apps pile up, images ship uncompressed, and mobile shoppers wait four seconds for the product page. Every second costs orders, and the theme vendor cannot fix what the setup did.",
      },
      {
        title: "COD and courier logic is held together by hand",
        body: "Orders are confirmed over WhatsApp, courier labels are typed twice, and failed deliveries are reconciled in a spreadsheet at the end of the week. Growth makes the mess bigger.",
      },
      {
        title: "Traffic arrives, then nothing happens",
        body: "Ads bring visitors to a page with no urgency, no reviews and a checkout that asks for too much. The budget is spent before anyone has looked at where people actually drop off.",
      },
    ],
    services: [
      "ecommerce-development",
      "shopify-development",
      "social-media-marketing",
      "paid-advertising",
      "conversion-rate-optimization",
      "social-media-creatives",
    ],
    work: ["thetoys", "meeshan-luxe-home", "the-vitamin-company", "indibe"],
    faqs: [
      {
        q: "Shopify or WooCommerce, which one should we pick?",
        a: "Shopify when you want hosting, payments and apps handled for you and can live within its data model. WooCommerce when you need full control, custom checkout logic or a content-heavy site around the store. We have run both at scale and will recommend one in discovery based on your catalog and market.",
      },
      {
        q: "Can you handle cash on delivery markets like Pakistan and the Gulf?",
        a: "Yes. The Toys and The Vitamin Company both run nationwide cash on delivery in Pakistan. We set up order confirmation flows, courier integrations, failed delivery handling and the WhatsApp support that COD customers expect, so the operations side does not collapse as orders grow.",
      },
      {
        q: "Do you also run the marketing for the store?",
        a: "We can. Social creatives, paid ads, SEO and email automation are run by the same team that built the store, so changes to a landing page or a product feed happen the same day. The Toys is our own brand, and we publish its numbers as a live case study.",
      },
      {
        q: "What does a store launch cost and how long does it take?",
        a: "A Shopify store starts at $2,500 and about three weeks for a focused catalog. Custom marketplaces and multi-vendor setups are scoped separately after discovery. Every quote comes with a fixed price for the agreed scope and milestone billing as pages and features go live.",
      },
    ],
    icon: "ShoppingBag",
  },
  {
    slug: "fintech",
    title: "Fintech & Payments",
    headline: "Payment platforms, merchant tools and fraud defenses built to be trusted",
    seoTitle: "Fintech & Payments Software Development | RevixPlus",
    metaDescription:
      "Payment gateways, merchant dashboards, fraud and chargeback tools, and the marketing sites behind them, built on four years of Bankful's gateway.",
    intro:
      "Between 2019 and 2023 we built and maintained a payment gateway serving merchants on Shopify, WooCommerce, Magento, Wix and BigCommerce from a single Node.js codebase, with fraud monitoring and chargeback prevention on top. Fintech work rewards boring discipline: validated requests, signed webhooks, idempotent processing and staged releases. That is how we build it.",
    pains: [
      {
        title: "One integration per platform, five codebases to maintain",
        body: "Each e-commerce platform gets its own plugin and its own bugs. A change to the risk rules has to ship five times, and one of them always lags behind the others.",
      },
      {
        title: "Chargebacks arrive after the revenue is gone",
        body: "Fraud shows up as disputes weeks later. Without monitoring at authorization time, the merchant eats the fee, the gateway eats the risk, and nobody learns what the pattern was.",
      },
      {
        title: "Onboarding sites that lose merchants on the first page",
        body: "Compliance language and slow forms turn interested merchants away before underwriting even starts. The product is good, but the website reads like a legal notice.",
      },
    ],
    services: [
      "api-backend-engineering",
      "web-development",
      "security-compliance",
      "ai-agents-automation",
      "seo",
    ],
    work: ["bankful", "hosting-platform"],
    faqs: [
      {
        q: "Have you built payment infrastructure before?",
        a: "Yes. We spent four years on Bankful, a gateway for high-risk merchants, building the multi-platform integration layer, merchant dashboards, fraud monitoring and chargeback prevention tools. We also rebuilt its marketing and onboarding sites for Core Web Vitals and technical SEO, which lifted organic traffic.",
      },
      {
        q: "How do you handle security on payment projects?",
        a: "Request validation, webhook signature checks, idempotent processing, least-privilege credentials, encrypted secrets and staged releases with rollback plans are the baseline. We do not store card data ourselves; tokenization stays with the processor. Audit logs and monitoring with Sentry and Grafana are set up before launch, not after.",
      },
      {
        q: "Can AI help with fraud or risk work?",
        a: "In specific places. Agents can triage disputes, draft representment packages, summarize merchant risk files and flag anomalies for a human reviewer. We keep the model out of the authorization path and in the review path, where latency is acceptable and a person makes the final decision.",
      },
      {
        q: "Do you work with platforms other than Shopify and WooCommerce?",
        a: "Yes. The Bankful gateway served Shopify, WooCommerce, Magento, Wix and BigCommerce merchants from one codebase. We can add new platforms through the same adapter pattern, and we can build the merchant-facing dashboards and onboarding flows that sit in front of the processor.",
      },
    ],
    icon: "CreditCard",
  },
  {
    slug: "saas",
    title: "SaaS & Startups",
    headline: "From MVP to a product people pay for, with AI where it earns its place",
    seoTitle: "SaaS & Startup Product Development with AI | RevixPlus",
    metaDescription:
      "MVPs, admin portals, AI features and the infrastructure behind them for SaaS founders. We built DiFacto's AI invoice control and a full HRMS platform.",
    intro:
      "Early-stage products need a team that can ship the first version in weeks and still be around for version ten. We built the GenAI document analysis behind DiFacto, a Danish construction SaaS, from model training to the Next.js front end, and a full HRMS with separate admin and employee portals. Same stack, same people, from the first commit to production monitoring.",
    pains: [
      {
        title: "The MVP took six months and still is not live",
        body: "Scope grew, the agency changed developers twice, and the demo still runs on someone's laptop. Investors have seen slides but no users, and the runway is shorter than it was.",
      },
      {
        title: "AI is on the roadmap but nobody owns it",
        body: "The pitch promises intelligent features. The codebase has a single API call with no evaluation, no fallback and no idea what it costs per user. The first outage will come from the model.",
      },
      {
        title: "Infrastructure costs more than the revenue",
        body: "Managed services were easy to start and expensive to keep. Nobody set resource limits, backups are untested, and a single bad deploy would take the product down with no rollback.",
      },
    ],
    services: [
      "saas-mvp-development",
      "ai-integration",
      "rag-knowledge-assistants",
      "llm-evaluation-optimization",
      "cloud-devops-deployment",
      "ui-ux-design",
    ],
    work: ["difacto", "hrms-saas", "hosting-platform"],
    faqs: [
      {
        q: "How fast can you ship an MVP?",
        a: "A focused web app MVP starts at four weeks after a one-week discovery. The discovery produces a scoped backlog with acceptance criteria, so the build does not drift. We ship to a staging environment from the first week and move to production the moment the core flow works end to end.",
      },
      {
        q: "Can you add AI features to a product that already exists?",
        a: "Yes, and that is most of our AI work. We plug RAG assistants, document extraction, agents and automation into existing Next.js, Node.js, Python or PHP products without rewriting them. DiFacto is the reference: supplier invoices in many layouts, extracted and validated against quotes, replacing manual review.",
      },
      {
        q: "What happens after launch?",
        a: "You choose. Some founders take the code and hire in-house; we hand over documented repositories, infrastructure and runbooks. Others keep us on a care retainer or add a dedicated developer. Either way, monitoring with Sentry and Grafana, backups and rollback procedures are in place before we step back.",
      },
      {
        q: "Who owns the code and the accounts?",
        a: "You do, from the first day. Repositories live in your GitHub organization, infrastructure in your cloud or Coolify account, and model API keys in your name. We work inside your accounts rather than ours, so there is nothing to migrate when the engagement changes shape.",
      },
    ],
    icon: "Rocket",
  },
  {
    slug: "education",
    title: "Education & Training",
    headline: "Enrollment sites, learning platforms and content that fills the next cohort",
    seoTitle: "Education Website & Learning Platform Development | RevixPlus",
    metaDescription:
      "Program websites with enrollment workflows, learning platforms, student portals and the SEO and social campaigns that fill cohorts for education providers.",
    intro:
      "Education providers sell a decision, not a product, and the website has to carry a parent or a learner from first search to a submitted application. We have built program sites with enrollment workflows, student portals with role-based access, and the content and campaigns that keep applications coming in between intake dates.",
    pains: [
      {
        title: "Applications arrive as PDF attachments",
        body: "The enrollment form is a download, the follow-up is a phone call, and the admissions team retypes everything into a spreadsheet. Families drop out somewhere in the middle and nobody knows where.",
      },
      {
        title: "The LMS was chosen for the demo, not the students",
        body: "Teachers fight the platform, learners cannot find the next lesson on a phone, and progress reports require an export. The subscription renews anyway because migration feels impossible.",
      },
      {
        title: "Cohorts fill late or not at all",
        body: "Marketing starts three weeks before intake with a single post. There is no content answering the questions parents search for, so the program competes on price with everyone else.",
      },
    ],
    services: [
      "wordpress-development",
      "web-development",
      "chatbots-voice-agents",
      "seo",
      "content-marketing",
      "email-marketing-automation",
    ],
    work: ["hrms-saas", "revixmd-website"],
    faqs: [
      {
        q: "Can you build the enrollment workflow, not just the website?",
        a: "Yes. Multi-step application forms, document uploads, payment or deposit collection, automatic confirmations and an admin view of every applicant are part of the build. We have done this on WordPress with Gravity Forms and on custom Next.js stacks, depending on how much the workflow needs to grow.",
      },
      {
        q: "Do you build learning platforms or integrate existing ones?",
        a: "Both. For most providers we integrate a proven LMS and build the portal, reporting and single sign-on around it. When the teaching model does not fit any product, we build a custom platform with role-based portals, the same pattern we used for an HRMS with admin and employee views.",
      },
      {
        q: "How do you help fill cohorts?",
        a: "With content that answers the questions families actually search, an SEO structure around programs and locations, email sequences that follow up on every inquiry, and social campaigns timed to intake dates. We report applications, not impressions, so you can see which channel produced each enrollment.",
      },
      {
        q: "Can an AI assistant answer admissions questions?",
        a: "Yes, grounded in your own program pages, fee schedules and policies so it does not invent answers. It can collect the inquiry, book a call with admissions and hand off to a person when the question is outside its knowledge. We log every conversation so the team can improve the content behind it.",
      },
    ],
    icon: "GraduationCap",
  },
  {
    slug: "energy-industrial",
    title: "Energy & Industrial",
    headline: "Multilingual B2B sites and tools for energy and industrial companies",
    seoTitle: "Energy & Industrial B2B Website Development | RevixPlus",
    metaDescription:
      "Multilingual corporate sites, product catalogs, quote workflows and lead generation for energy, battery storage and industrial manufacturers, like HIS Energy.",
    intro:
      "Industrial buyers research for months and contact a vendor once. The website has to carry technical depth, multiple languages and a clear path to a quote without looking like a brochure from 2012. We built HIS Energy's battery energy storage site with WPML and the same approach applies to any company selling complex equipment across borders.",
    pains: [
      {
        title: "Technical content buried in PDFs",
        body: "Specifications, certifications and case studies live in downloads that search engines cannot read and buyers cannot compare. The sales team answers the same questions by email every week.",
      },
      {
        title: "Translations drift out of sync",
        body: "The German page is a year behind the English one. A product was discontinued in one language and still sells in another, and nobody is sure which version the distributor is quoting from.",
      },
      {
        title: "Quote requests go to a shared inbox",
        body: "Inquiries land in an inbox checked twice a day, with no record of what the buyer configured or which region they are in. Follow-up depends on who is in the office.",
      },
    ],
    services: [
      "wordpress-development",
      "web-development",
      "rag-knowledge-assistants",
      "seo",
      "aieo-geo",
      "maintenance-support-retainers",
    ],
    work: ["his-energy", "hosting-platform"],
    faqs: [
      {
        q: "Can you build multilingual sites that stay in sync?",
        a: "Yes. We build with WPML on WordPress or with locale routing on Next.js, with a single content source and translation workflows that flag what changed. Hreflang, per-language sitemaps and region-specific contact routing are part of the standard setup, not an add-on.",
      },
      {
        q: "How do you present technical products online?",
        a: "As structured, searchable data rather than PDFs. Product pages carry specifications in tables, certifications as filterable attributes and downloads as secondary resources. Buyers can compare models, and search engines can index the specifications, which is where industrial search traffic actually comes from.",
      },
      {
        q: "Can an assistant answer technical questions from our documentation?",
        a: "Yes. A RAG assistant grounded in your datasheets, manuals and certifications answers questions with sources, in the buyer's language, and routes anything commercial to sales with the full conversation attached. It removes the repeat questions from the inbox without inventing specifications.",
      },
      {
        q: "Do you handle hosting and ongoing updates?",
        a: "Yes. Our care retainer covers hosting on Docker-based infrastructure, updates, security patches, uptime monitoring and a monthly content change budget. Industrial sites change slowly but must never go down during a tender, so we monitor them like products rather than brochures.",
      },
    ],
    icon: "BatteryCharging",
  },
  {
    slug: "hospitality-food",
    title: "Hospitality & Food",
    headline: "Ordering, delivery and booking experiences that work on a phone at dinner time",
    seoTitle: "Restaurant Ordering, Delivery & Hospitality Websites | RevixPlus",
    metaDescription:
      "Online ordering, delivery zones, menus, bookings and local SEO for restaurants, cafes and hospitality brands, built on Sushi2500's Copenhagen site.",
    intro:
      "Food and hospitality orders happen on a phone, in a hurry, at the busiest hour of the day. We built the ordering and delivery site for Sushi2500 in Copenhagen and Central Zealand, with menus, delivery zones and checkout tuned for that moment. Local search and social are where the next customer finds you, so we build those in from the start.",
    pains: [
      {
        title: "Marketplace apps take a third of every order",
        body: "Delivery platforms bring customers but keep the margin and the customer data. The restaurant pays commission on regulars who would have ordered directly if the website made it easy.",
      },
      {
        title: "The menu is a photo of a PDF",
        body: "Prices change, the photo does not. Customers zoom in on a phone, give up and call. Search engines cannot read it, so the restaurant never shows up for the dishes it is known for.",
      },
      {
        title: "Nobody updates the social accounts",
        body: "Instagram shows a special from last spring. Reviews go unanswered. The one post a month comes from the owner's phone at midnight, with no plan behind it and no link to order.",
      },
    ],
    services: [
      "ecommerce-development",
      "wordpress-development",
      "social-media-marketing",
      "social-media-creatives",
      "seo",
      "chatbots-voice-agents",
    ],
    work: ["sushi2500", "thetoys"],
    faqs: [
      {
        q: "Can we take orders directly instead of through delivery apps?",
        a: "Yes. We build ordering with menus, modifiers, delivery zones, pickup times and online or cash payment, so regulars order from you directly and you keep the margin and the customer data. Sushi2500's site handles delivery across Copenhagen and Central Zealand this way.",
      },
      {
        q: "Do you handle local SEO and Google listings?",
        a: "Yes. Structured menu data, location pages, Google Business Profile management, review responses and local citations are part of our hospitality package. The goal is to appear for the dish and the neighborhood, not only for the restaurant name people already know.",
      },
      {
        q: "Can you run our social media too?",
        a: "Yes. We produce the creatives, plan the calendar around specials and seasons, post, reply and report. The same team runs The Toys, our own retail brand, so you can see the creative system and the results before you commit to a retainer.",
      },
      {
        q: "Can an assistant take bookings or answer menu questions?",
        a: "Yes. A chat or voice assistant grounded in your menu, hours and booking rules can answer allergen questions, take reservations and hand off to staff for anything unusual. It works on the website and on WhatsApp, which is where most customers already message you.",
      },
    ],
    icon: "UtensilsCrossed",
  },
];

export const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i])) as Record<
  string,
  Industry
>;
