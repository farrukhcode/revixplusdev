import type { Service } from "../types";

const service: Service = {
  slug: "maintenance-support-retainers",
  pillar: "cloud",
  title: "Website and app maintenance retainers with real response times",
  shortTitle: "Maintenance & Support",
  eyebrow: "Cloud, DevOps & Care",
  seoTitle: "Website & App Maintenance Retainers | RevixPlus",
  metaDescription:
    "Monthly maintenance for WordPress, Shopify, Next.js and mobile apps: updates, uptime monitoring, fixes, small features and a report from a named engineer.",
  keywords: [
    "website maintenance retainer",
    "app maintenance services",
    "WordPress maintenance plan",
    "Shopify support retainer",
    "monthly developer retainer",
    "website support packages",
  ],
  icon: "Wrench",
  heroPromise:
    "Launch day is not the end of the work. Plugins need updates, dependencies need patches, forms break, and someone needs to answer when the site goes down at midnight. Our retainers give you a named engineer who knows your stack, a fixed monthly block of hours, uptime monitoring with alerts, and a short report every month on what changed and what we recommend next.",
  pains: [
    {
      title: "The developer who built it is gone",
      body: "The freelancer moved on, the agency closed the project, and now nobody knows how the site deploys or where the passwords live. Every small change becomes a new hiring process.",
    },
    {
      title: "Updates skipped until something breaks",
      body: "Plugin and framework updates pile up because nobody has time to test them. Then a security patch forces everything at once, something breaks, and the store is down on a weekday.",
    },
    {
      title: "Small requests that take weeks",
      body: "A banner change, a new form field, a price update. Each one waits for a quote, a scope and a slot, so simple work takes longer than it should and your team stops asking.",
    },
  ],
  deliverables: [
    "Named engineer on your account",
    "Monthly hours for fixes and features",
    "Core, plugin and dependency updates",
    "Uptime monitoring and alerts",
    "Staging tests before every update",
    "Backups with restore tests",
    "Security and performance checks",
    "Monthly change and recommendation report",
  ],
  approach: [
    {
      step: "Onboard",
      body: "We take over the codebase, hosting, DNS and credentials, document how everything deploys, set up staging, monitoring and backups, and fix the urgent issues found during the review.",
    },
    {
      step: "Maintain",
      body: "Updates are tested on staging and applied on a schedule, uptime checks alert us before customers notice, and backups are verified so a restore is a known procedure rather than a hope.",
    },
    {
      step: "Respond",
      body: "Requests go to a shared board with agreed response times. Fixes and small features draw from your monthly hours, and anything larger gets a short quote the same week.",
    },
    {
      step: "Report",
      body: "Each month you get a one-page summary of what we changed, hours used, uptime, performance scores and what we recommend next, so the site improves instead of just surviving.",
    },
  ],
  stack: [
    "WordPress",
    "Shopify",
    "WooCommerce",
    "Next.js",
    "React Native",
    "Docker and Coolify",
    "GitHub",
    "Uptime monitoring",
    "Sentry",
    "Cloudflare",
  ],
  startingAt: {
    price: "from $600",
    timeline: "per month",
    note: "Starter plan with 8 hours. Growth and Scale plans add hours, faster response and a weekly check-in.",
  },
  relatedWork: ["thetoys", "revixmd-website", "hosting-platform"],
  relatedServices: ["cloud-devops-deployment", "wordpress-development", "shopify-development"],
  faqs: [
    {
      q: "What is included in a website maintenance retainer?",
      a: "A RevixPlus maintenance retainer includes a named engineer, a monthly block of hours for fixes and small features, scheduled updates tested on staging, uptime monitoring, verified backups, security and performance checks, and a monthly report. Plans start at 8 hours per month.",
    },
    {
      q: "Which platforms do you maintain?",
      a: "We maintain WordPress and WooCommerce sites, Shopify stores, Next.js and Node.js applications, React Native mobile apps, and the Docker or cloud infrastructure they run on. If we did not build it, onboarding starts with a documented review of the codebase and hosting.",
    },
    {
      q: "What happens if we do not use all our hours?",
      a: "Unused hours roll over for one month on every plan, so a quiet month can fund a bigger change the next. We send a usage note mid-month so you can decide whether to queue work or save the hours for later.",
    },
    {
      q: "How fast do you respond to an outage?",
      a: "Outage alerts reach us automatically from uptime monitoring. On the Starter plan we respond within one business day, on Growth within four business hours, and on Scale within one hour during agreed coverage windows, with emergency coverage available by arrangement.",
    },
    {
      q: "How much does a maintenance plan cost?",
      a: "Maintenance plans at RevixPlus start at $600 per month for 8 hours of work plus monitoring, updates and reporting. Growth and Scale plans add hours, faster response times and a weekly check-in, and all plans run month to month with 30 days notice.",
    },
  ],
  authorityLinks: [
    {
      label: "web.dev: Core Web Vitals",
      href: "https://web.dev/articles/vitals",
    },
    {
      label: "OWASP: Vulnerable and outdated components",
      href: "https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/",
    },
    {
      label: "WordPress: Updating WordPress",
      href: "https://wordpress.org/documentation/article/updating-wordpress/",
    },
  ],
};

export default service;
