import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "hosting-platform",
  title: "Seven production apps on one server with Coolify",
  client: "RevixPlus (internal)",
  industry: "Cloud and DevOps",
  location: "Pakistan, serving US and EU traffic",
  services: ["cloud-devops-deployment", "security-compliance", "maintenance-support-retainers"],
  stack: [
    "DigitalOcean",
    "Coolify",
    "Docker",
    "Traefik",
    "Let's Encrypt",
    "Cloudflare",
    "Cloudflare Access",
    "Namecheap DNS",
    "GitHub",
    "Linux",
  ],
  timeline: "2024 to present",
  summary:
    "A multi-app hosting platform that runs six to seven production sites, WordPress and MERN alike, as Docker containers deployed from GitHub on one cost-efficient DigitalOcean droplet.",
  challenge: [
    "Each site we ran had its own hosting plan, its own login and its own way of deploying. Costs added up, nobody could say with confidence which server a given domain lived on, and a small change like a TLS renewal or a PHP update turned into a risky evening of manual work.",
    "The sites also had nothing in common technically. Some are WordPress, some are MERN stacks like revixmd.com, revixplus.com and thetoys.pk, and the DNS was split between Cloudflare and Namecheap. Consolidating them had to happen without downtime and without weakening the security of any of them.",
  ],
  solution: [
    "We moved everything onto one DigitalOcean droplet running Coolify. Every app is a Docker container built and deployed from its GitHub repository, so a push to the main branch is the whole release process. Persistent volumes keep uploads and databases safe across rebuilds, and health checks restart anything that misbehaves.",
    "Traefik sits in front as the reverse proxy and issues TLS certificates automatically for every domain. DNS stays where each domain already lived, on Cloudflare or Namecheap, pointed at the server. That meant no domain migrations and no email disruption while the sites moved across one at a time.",
    "Security was handled without blocking anything. Access is by SSH key only, the Coolify dashboard lives on a subdomain of a spare domain behind Cloudflare Access so it cannot be tied to the live sites, and the admin surface is never exposed directly. The result is enterprise-style hosting at a fraction of the usual cost.",
  ],
  results: [
    { value: "6 to 7", label: "production apps on one server" },
    { value: "1", label: "deployment process for every stack" },
    { value: "TODO: add figure", label: "monthly hosting cost saved" },
  ],
  featured: true,
  order: 8,
  accent: ["var(--cyan)", "var(--violet)"],
  seoTitle: "Coolify Hosting Case Study: 7 Apps on One Server",
  metaDescription:
    "How RevixPlus runs seven production WordPress and MERN apps as Docker containers on one DigitalOcean droplet with Coolify, Traefik TLS and Cloudflare Access.",
};

export default study;
