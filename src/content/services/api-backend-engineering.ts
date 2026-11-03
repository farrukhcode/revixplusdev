import type { Service } from "../types";

const service: Service = {
  slug: "api-backend-engineering",
  pillar: "web-mobile",
  title: "API and backend engineering built to be trusted",
  shortTitle: "API & Backend",
  eyebrow: "Web & Mobile",
  seoTitle: "API & Backend Development | Node.js, NestJS, PostgreSQL | RevixPlus",
  metaDescription:
    "API and backend engineering with Node.js, NestJS and PostgreSQL. REST and GraphQL APIs, auth, webhooks and integrations that stay reliable, from $4,000.",
  keywords: [
    "backend development services",
    "API development agency",
    "NestJS development",
    "Node.js backend",
    "PostgreSQL database design",
  ],
  icon: "Code2",
  heroPromise:
    "You get an API your frontend, mobile app and partners can rely on: validated inputs, consistent errors, documented endpoints and a database designed for the queries you will actually run. We built a payment gateway that served merchants on five e-commerce platforms from one Node.js codebase, with webhook signature checks and idempotent processing, so reliability under real money is familiar territory.",
  pains: [
    {
      title: "Integrations break without warning",
      body: "A third-party API changed its response format, a webhook fired twice, and customers were charged double. Nobody noticed until the support tickets arrived the next morning.",
    },
    {
      title: "The database is the bottleneck",
      body: "Pages that loaded instantly with ten users crawl with ten thousand. Missing indexes, N+1 queries and no caching mean every new feature ships with a performance apology.",
    },
    {
      title: "Security was somebody else's job",
      body: "Tokens never expire, roles are checked in the frontend only, and secrets live in the repository. One audit from a customer's IT team and the deal stalls for months.",
    },
  ],
  deliverables: [
    "REST or GraphQL API",
    "NestJS or Node.js service",
    "PostgreSQL schema and migrations",
    "Auth with JWT, OAuth and RBAC",
    "Webhooks and event handling",
    "Third-party integrations",
    "API documentation",
    "Load and security testing",
    "Monitoring and alerts",
  ],
  approach: [
    {
      step: "Design the contract",
      body: "We write the API contract and data model before code: endpoints, payloads, error shapes and permission rules. Frontend and backend teams can then build in parallel against one document.",
    },
    {
      step: "Build with guardrails",
      body: "Input validation, typed responses, consistent error handling and least-privilege access are in the first commit. Webhooks verify signatures and every mutation is idempotent so retries never duplicate work.",
    },
    {
      step: "Tune the database",
      body: "Indexes, query plans and migrations are reviewed with EXPLAIN ANALYZE on realistic data volumes, with automated backups and a tested restore procedure in place well before launch day.",
    },
    {
      step: "Ship with observability",
      body: "The service deploys in Docker with health checks, structured logs, error tracking and dashboards, so when something fails you find out from an alert rather than from a customer.",
    },
  ],
  stack: [
    "Node.js",
    "NestJS",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "GraphQL",
    "OpenAPI",
    "Docker",
    "Grafana",
    "Sentry",
  ],
  startingAt: {
    price: "from $4,000",
    timeline: "2 weeks",
    note: "Covers a focused service or integration. Full platform backends are scoped after the contract is written.",
  },
  relatedWork: ["bankful", "difacto", "hrms-saas"],
  relatedServices: ["web-development", "ai-agents-automation", "cloud-devops-deployment"],
  faqs: [
    {
      q: "REST or GraphQL, which one do you recommend?",
      a: "REST is our default because it is simpler to cache, document and secure, and most partners expect it. GraphQL earns its place when many clients need different shapes of the same data, such as a web app, a mobile app and a partner portal sharing one backend. We pick based on who consumes the API.",
    },
    {
      q: "How do you make payment and webhook integrations reliable?",
      a: "Reliability comes from a few disciplines applied every time. Webhook signatures are verified before anything is processed, every event carries an idempotency key so duplicates are ignored, failures land in a retry queue with alerts, and test suites replay real provider payloads. This is how a gateway on five platforms stayed trustworthy under real volume.",
    },
    {
      q: "Can you work with our existing database?",
      a: "Yes, we work with existing PostgreSQL, MySQL and MongoDB databases every week. We start by reading the schema and the slowest queries, add indexes and fix the worst N+1 patterns, then plan larger changes as reversible migrations. You keep operating normally while the improvements roll out in small, tested steps.",
    },
    {
      q: "Will the API be documented for other developers?",
      a: "Yes, every API ships with an OpenAPI specification, example requests and responses, authentication instructions and a changelog. Partners and mobile teams can generate client code from it, and your own developers can test endpoints from the generated documentation page. Undocumented endpoints are a liability we do not leave behind.",
    },
    {
      q: "How do you handle authentication and permissions?",
      a: "Authentication uses short-lived JWT access tokens with refresh tokens, or OAuth when users sign in with Google, Microsoft or another provider. Permissions are enforced on the server through role-based access control, never only in the interface. Secrets live in environment variables, sessions can be revoked, and every sensitive action is logged.",
    },
  ],
  authorityLinks: [
    { label: "OWASP API Security Top 10", href: "https://owasp.org/www-project-api-security/" },
    { label: "PostgreSQL documentation", href: "https://www.postgresql.org/docs/" },
    { label: "OpenAPI Specification", href: "https://spec.openapis.org/oas/latest.html" },
  ],
};

export default service;
