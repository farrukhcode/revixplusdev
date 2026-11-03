import type { TeamMember } from "./types";

export const team: TeamMember[] = [
  {
    name: "Farrukh Bilal",
    role: "Founder and CTO",
    bio: "Farrukh has spent more than ten years shipping production software for clients in Denmark, the US, the UK, the UAE and Pakistan. Since 2023 he has built generative AI into live products: RAG pipelines, Claude and OpenAI assistants, agents with MCP tools and n8n automation. He runs the infrastructure too, from Docker and Coolify to monitoring, and has led and mentored developer teams from Lahore.",
    linkedin: "https://www.linkedin.com/in/farrukhbilal/",
    status: "live",
  },
  {
    name: "Umair Saleem",
    role: "Designer",
    bio: "Umair designs RevixPlus interfaces, brand systems and creatives, from the first wireframe to the clickable prototype and the design system behind it.",
    status: "live",
  },
  {
    name: "Saqib Hassan",
    role: "Growth",
    bio: "Saqib runs growth for RevixPlus clients: SEO, AI engine optimization, social and paid campaigns, reported in one dashboard.",
    status: "live",
  },
  {
    name: "Jillani",
    role: "Developer",
    bio: "Jillani builds and ships RevixPlus products across web, mobile and AI integrations, from the first commit to production.",
    status: "live",
  },
];

export const liveTeam = team.filter((m) => m.status === "live");
