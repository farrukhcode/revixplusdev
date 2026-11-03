import type { Service } from "../types";

const service: Service = {
  slug: "cloud-devops-deployment",
  pillar: "cloud",
  title: "Cloud, Docker and Coolify deployment for apps that stay up",
  shortTitle: "Cloud & DevOps",
  eyebrow: "Cloud, DevOps & Care",
  seoTitle: "Cloud, Docker & Coolify Deployment Services | RevixPlus",
  metaDescription:
    "Host several production apps on one secured server with Docker, Coolify, Traefik and automatic TLS, plus GitHub deploys, backups and monitoring.",
  keywords: [
    "Coolify deployment services",
    "Docker hosting setup",
    "DevOps for small business",
    "self-hosted app deployment",
    "DigitalOcean server setup",
    "AWS deployment consultant",
  ],
  icon: "Server",
  heroPromise:
    "You should not pay five platforms to host five apps, and you should not lose a weekend when one of them goes down. We run production stacks on Docker with Coolify, Traefik and automatic TLS, deploy straight from GitHub, back up on a schedule, and watch everything with Sentry, Grafana and Prometheus. One server when that is enough, AWS when it is not.",
  pains: [
    {
      title: "Hosting bills that grew by accident",
      body: "A managed platform for the site, another for the API, a third for the database, each with its own invoice and its own dashboard. The total is more than a dedicated server and harder to understand.",
    },
    {
      title: "Deploys that depend on one person",
      body: "Releases happen by hand over SSH and only one developer knows the steps. Vacations become risks, rollbacks are guesswork, and nobody wants to deploy on a Friday.",
    },
    {
      title: "Outages you learn about from customers",
      body: "There is no monitoring beyond refreshing the page. A full disk or an expired certificate takes the store down, and the first alert is a WhatsApp message from a client.",
    },
  ],
  deliverables: [
    "Server provisioning and hardening",
    "Docker and Coolify setup",
    "Traefik with automatic TLS",
    "GitHub deploy pipelines",
    "Staging and preview environments",
    "Scheduled backups with restore tests",
    "Monitoring and alerting",
    "Runbooks and handover",
  ],
  approach: [
    {
      step: "Assess",
      body: "We inventory your apps, databases, domains and traffic, then size the infrastructure. Most small and mid-sized businesses fit comfortably on one well-run server with room to grow.",
    },
    {
      step: "Provision",
      body: "The server is hardened with SSH keys only, a firewall and automatic updates. Coolify, Docker and Traefik go on top, with DNS on Cloudflare and TLS certificates renewing themselves.",
    },
    {
      step: "Migrate and wire",
      body: "Each app gets a Dockerfile, environment variables, a health check and a GitHub deploy. We migrate with a cutover plan and keep the old environment until the new one proves itself.",
    },
    {
      step: "Watch and document",
      body: "Sentry catches errors, Prometheus and Grafana track resources, uptime checks alert your phone, and backups restore on a schedule we test. Runbooks cover every routine task.",
    },
  ],
  stack: [
    "Docker",
    "Coolify",
    "Traefik",
    "Nginx",
    "DigitalOcean",
    "AWS (EC2, S3, Route 53)",
    "Cloudflare",
    "GitHub Actions",
    "Sentry",
    "Grafana",
    "Prometheus",
    "Let's Encrypt",
  ],
  startingAt: {
    price: "from $1,500",
    timeline: "1 week",
    note: "One server, up to five apps. Multi-region or Kubernetes setups are quoted separately.",
  },
  relatedWork: ["hosting-platform", "thetoys", "revixmd-website"],
  relatedServices: ["security-compliance", "maintenance-support-retainers", "api-backend-engineering"],
  faqs: [
    {
      q: "What is Coolify and why do you use it?",
      a: "Coolify is an open-source, self-hosted platform that deploys apps and databases as Docker containers from Git repositories, with a Traefik reverse proxy and automatic TLS. We use it because it gives a single server the deploy workflow of a managed platform without the per-app pricing.",
    },
    {
      q: "Can one server really host several production apps?",
      a: "Yes. RevixPlus runs six to seven production apps, including WordPress and Node.js stacks, on a single DigitalOcean server with Coolify, each in its own container with health checks, persistent volumes and separate domains. Resource limits keep one app from starving another.",
    },
    {
      q: "When should we use AWS instead of a single server?",
      a: "You should use AWS or a similar cloud when you need multi-region availability, autoscaling for spiky traffic, managed databases with failover, or compliance controls a single server cannot provide. We assess traffic and risk first and only recommend the cloud when the numbers justify it.",
    },
    {
      q: "How do you handle backups and disaster recovery?",
      a: "We schedule database and volume backups to off-server storage, keep a retention window you choose, and run restore tests so the backups are proven, not assumed. The runbook includes the exact steps to rebuild the server from scratch and how long it takes.",
    },
    {
      q: "How much does a Docker and Coolify deployment cost?",
      a: "A Docker and Coolify deployment at RevixPlus starts at $1,500 for one hardened server with up to five apps, GitHub deploys, backups and monitoring, delivered in about a week. The server itself usually costs between $24 and $96 per month depending on size.",
    },
  ],
  authorityLinks: [
    {
      label: "Coolify documentation",
      href: "https://coolify.io/docs",
    },
    {
      label: "Docker: Production best practices",
      href: "https://docs.docker.com/build/building/best-practices/",
    },
    {
      label: "web.dev: Core Web Vitals",
      href: "https://web.dev/articles/vitals",
    },
  ],
};

export default service;
