import type { Service } from "../types";

const service: Service = {
  slug: "security-compliance",
  pillar: "cloud",
  title: "Security hardening and GDPR, HIPAA and EU Accessibility Act compliance",
  shortTitle: "Security & Compliance",
  eyebrow: "Cloud, DevOps & Care",
  seoTitle: "Security Hardening, GDPR, HIPAA & Accessibility Compliance | RevixPlus",
  metaDescription:
    "Server hardening, Cloudflare Access, dependency audits, GDPR consent, HIPAA technical safeguards and WCAG 2.2 AA for the EU Accessibility Act.",
  keywords: [
    "website security hardening",
    "GDPR compliance for websites",
    "HIPAA technical safeguards",
    "European Accessibility Act compliance",
    "WCAG 2.2 AA audit",
    "server security audit",
  ],
  icon: "Lock",
  heroPromise:
    "Security work has a reputation for breaking things, so most businesses put it off until an auditor, a client or an attacker forces the issue. We harden servers and apps in small, reversible steps, add the GDPR, HIPAA and accessibility controls your market requires, and document everything so you can show your work when someone asks.",
  pains: [
    {
      title: "An admin panel open to the internet",
      body: "Your dashboards sit on public URLs with a password as the only lock. One leaked credential or one brute-force run and someone has your deployments, your database and your customers.",
    },
    {
      title: "Compliance questions you cannot answer",
      body: "A European client asks for your GDPR processing record, a US client asks about HIPAA safeguards, and a public-sector buyer asks for an accessibility statement. The honest answer today is a shrug.",
    },
    {
      title: "Dependencies nobody has updated",
      body: "The site runs on packages and plugins last updated years ago, with known vulnerabilities listed publicly. Fixing them feels risky, so they stay, and the risk grows every month.",
    },
  ],
  deliverables: [
    "Server and app hardening",
    "Cloudflare Access on admin panels",
    "Dependency and plugin audit",
    "GDPR consent and data map",
    "HIPAA technical safeguards",
    "WCAG 2.2 AA accessibility fixes",
    "Accessibility and privacy statements",
    "Compliance evidence pack",
  ],
  approach: [
    {
      step: "Audit",
      body: "We review servers, DNS, applications, dependencies and data flows against OWASP, GDPR, HIPAA Security Rule and WCAG 2.2 AA checklists, and rank findings by risk and effort.",
    },
    {
      step: "Harden safely",
      body: "Fixes ship one at a time with a rollback path: SSH keys only, firewalls, Cloudflare Access in front of admin panels, updated dependencies tested on staging before production.",
    },
    {
      step: "Add the controls",
      body: "Consent banners that actually block scripts, data retention rules, encryption, access logs, keyboard navigation, contrast and screen reader fixes, each verified against the standard.",
    },
    {
      step: "Document",
      body: "You receive a processing record, risk assessment, accessibility statement and an evidence pack with screenshots and configs, ready for clients, auditors and procurement forms.",
    },
  ],
  stack: [
    "Cloudflare Access",
    "Cloudflare WAF",
    "UFW and fail2ban",
    "Docker",
    "OWASP ZAP",
    "npm audit and Snyk",
    "WPScan",
    "axe-core",
    "Lighthouse",
    "Consent management platforms",
  ],
  startingAt: {
    price: "from $2,000",
    timeline: "2 weeks",
    note: "Audit plus hardening for one server and one application. HIPAA programs are scoped after a call.",
  },
  relatedWork: ["hosting-platform", "revixmd-ai-automation", "bankful"],
  relatedServices: ["cloud-devops-deployment", "healthcare-ai-automation", "maintenance-support-retainers"],
  faqs: [
    {
      q: "What does the European Accessibility Act require from websites?",
      a: "The European Accessibility Act, in force since June 2025, requires many e-commerce sites, apps and digital services sold in the EU to be accessible, with WCAG 2.1 and 2.2 AA as the practical benchmark. That means keyboard access, sufficient contrast, labeled forms and screen reader support.",
    },
    {
      q: "Is a cookie banner enough for GDPR compliance?",
      a: "No. GDPR compliance needs a consent banner that blocks non-essential scripts until consent is given, a record of what data you process and why, a retention policy, a privacy notice, and a way to handle access and deletion requests. RevixPlus sets up all of these.",
    },
    {
      q: "What are HIPAA technical safeguards?",
      a: "HIPAA technical safeguards are the access control, audit control, integrity, authentication and transmission security requirements in the Security Rule. In practice that means role-based access, MFA, encryption in transit and at rest, audit logs and session controls on any system handling PHI.",
    },
    {
      q: "Will security hardening break our website?",
      a: "It should not, and we work to make sure it does not. Every change is applied one at a time with a tested rollback, dependencies are updated on staging first, and admin protection like Cloudflare Access is added in front of your apps without changing the apps themselves.",
    },
    {
      q: "How much does a security and compliance audit cost?",
      a: "A security and compliance engagement at RevixPlus starts at $2,000 for an audit and hardening of one server and one application over about two weeks, including the evidence pack. Full HIPAA or multi-site GDPR programs are scoped after a short call.",
    },
  ],
  authorityLinks: [
    {
      label: "OWASP Top 10",
      href: "https://owasp.org/www-project-top-ten/",
    },
    {
      label: "W3C: WCAG 2.2 Quick Reference",
      href: "https://www.w3.org/WAI/WCAG22/quickref/",
    },
    {
      label: "HHS: HIPAA Security Rule",
      href: "https://www.hhs.gov/hipaa/for-professionals/security/index.html",
    },
  ],
  compliance: {
    title: "Standards we work against",
    items: [
      "OWASP Top 10 for web applications and OWASP Top 10 for LLM applications",
      "GDPR Articles 5, 6, 13, 30 and 32 for lawful basis, transparency, processing records and security",
      "HIPAA Security Rule administrative, physical and technical safeguards",
      "WCAG 2.2 Level AA as the benchmark for the European Accessibility Act",
      "Cloudflare Access with identity-provider login in front of every admin panel",
      "Evidence pack with configurations, scan results and screenshots for audits and procurement",
    ],
  },
};

export default service;
