import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "hrms-saas",
  title: "HRMS SaaS platform with admin and employee portals",
  client: "A European product company",
  industry: "HR software",
  location: "Europe",
  services: ["saas-mvp-development", "api-backend-engineering", "cloud-devops-deployment"],
  stack: [
    "Next.js",
    "NestJS",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "GitHub Actions",
    "Azure DevOps",
    "Sentry",
    "Grafana",
  ],
  timeline: "2024 to present",
  summary:
    "A multi-tenant HR management system with separate admin and employee portals, JWT authentication and role-based access, shipped with CI/CD and production monitoring.",
  challenge: [
    "The client ran HR on spreadsheets and email threads. Leave requests, documents and reviews lived in different places, and managers could not see who had approved what. They needed one system with a clear split between what HR administrators can do and what employees can see about themselves.",
    "Because the platform would hold personal data for every employee, access control could not be an afterthought. Each role needed exact permissions, every change needed to be traceable, and releases had to go out without downtime, since HR teams in several time zones would be using it all day.",
  ],
  solution: [
    "We designed the platform as two portals on one NestJS backend. The admin portal handles people, documents, leave policies and approvals, while the employee portal gives staff their own profile, requests and payslips. JWT authentication and role-based access control decide what each user can read or change.",
    "The data layer is PostgreSQL with Prisma migrations, indexes added where queries were slow, and automated backups with tested restores. Business requirements were turned into scoped tasks with acceptance criteria, and the REST API was built with input validation and consistent error handling throughout.",
    "Delivery runs through CI/CD on GitHub Actions and Azure DevOps pipelines with build agents, pre-release migration checks, rollback plans and post-deployment verification. Sentry, Grafana and Prometheus watch production, and short runbooks are kept for every incident so the next one is faster to resolve.",
  ],
  results: [
    { value: "2", label: "portals on one shared backend" },
    { value: "TODO: add figure", label: "employees onboarded to the platform" },
    { value: "TODO: add figure", label: "reduction in HR admin time" },
  ],
  featured: true,
  order: 6,
  accent: ["var(--lime)", "var(--blue)"],
  seoTitle: "HRMS SaaS Case Study: Admin and Employee Portals",
  metaDescription:
    "How RevixPlus built an HRMS SaaS platform with admin and employee portals, JWT auth, role-based access, Prisma on PostgreSQL, CI/CD pipelines and monitoring.",
};

export default study;
