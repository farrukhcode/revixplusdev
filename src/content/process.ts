import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    promise: "One fixed-price week that turns your idea into a scoped plan with a real number on it.",
    duration: "1 week, fixed price",
    outputs: [
      "Scoped backlog with acceptance criteria",
      "Architecture and integration map",
      "Fixed quote and milestone schedule",
    ],
  },
  {
    step: "02",
    title: "Design",
    promise: "Working prototypes you can click through, so decisions happen on screens, not slides.",
    duration: "1 to 2 weeks",
    outputs: [
      "Clickable prototype of every core flow",
      "Design system with tokens and components",
      "Content outline for each page or screen",
    ],
  },
  {
    step: "03",
    title: "Build",
    promise: "Weekly releases to a staging URL you can open on your phone, with a demo every Friday.",
    duration: "2 to 8 weeks by scope",
    outputs: [
      "Staging environment live from week one",
      "Typed, tested, reviewed code in your repository",
      "Weekly demo and written progress notes",
    ],
  },
  {
    step: "04",
    title: "Launch",
    promise: "Production deploy with monitoring, backups and rollback ready before the first visitor.",
    duration: "1 week",
    outputs: [
      "Docker deployment with health checks and SSL",
      "Analytics, error tracking and uptime alerts",
      "Handover docs, runbooks and account access",
    ],
  },
  {
    step: "05",
    title: "Grow",
    promise: "The same team that built it runs the search, social and ads that fill it with customers.",
    duration: "Monthly retainer",
    outputs: [
      "Monthly growth plan tied to revenue goals",
      "Content, creatives and campaigns shipped weekly",
      "One dashboard with leads, orders and spend",
    ],
  },
];
