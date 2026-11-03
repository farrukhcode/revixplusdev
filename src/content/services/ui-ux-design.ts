import type { Service } from "../types";

const service: Service = {
  slug: "ui-ux-design",
  pillar: "web-mobile",
  title: "UI/UX and product design that people understand instantly",
  shortTitle: "UI/UX Design",
  eyebrow: "Web & Mobile",
  seoTitle: "UI/UX & Product Design | Figma, Prototypes, Design Systems | RevixPlus",
  metaDescription:
    "UI/UX and product design: research, user flows, wireframes, Figma design systems and clickable prototypes with developer handoff. Accessible design from $2,000.",
  keywords: [
    "UI UX design agency",
    "product design services",
    "Figma design system",
    "app UI design",
    "website UX design",
  ],
  icon: "PenTool",
  heroPromise:
    "You get screens that make the next step obvious, a design system your developers can build from without guessing, and a prototype you can put in front of customers before a line of code exists. We design the way Apple describes fluid interfaces: instant feedback, motion that explains, and accessibility built in rather than audited later. Because we also build what we design, handoff is a conversation, not a handover.",
  pains: [
    {
      title: "Users get lost and quietly leave",
      body: "Sign-ups stall on step two, the main action hides behind a menu, and support answers the same question daily. The product works, but nobody can tell from the outside.",
    },
    {
      title: "Every screen looks like a different app",
      body: "Three developers, three button styles, four shades of blue. Without a design system each new feature adds inconsistency, and the product feels less trustworthy with every release.",
    },
    {
      title: "Developers are guessing at the details",
      body: "Static mockups leave out hover states, errors, empty screens and loading. The team fills the gaps on the fly and the result never quite matches what was approved.",
    },
  ],
  deliverables: [
    "User research and interviews",
    "User flows and wireframes",
    "High-fidelity Figma screens",
    "Design system and tokens",
    "Clickable prototype",
    "Motion and interaction specs",
    "Accessibility review",
    "Developer handoff package",
  ],
  approach: [
    {
      step: "Understand the user",
      body: "We interview customers or review support tickets, analytics and recordings to learn where people struggle. The findings become a short brief with the jobs the interface has to do.",
    },
    {
      step: "Map the flows",
      body: "Wireframes and flow diagrams settle structure before visuals: what is on each screen, what comes next, what happens when something goes wrong. You review and we iterate quickly.",
    },
    {
      step: "Design the system",
      body: "Colors, type, spacing and components become tokens and a Figma library, then the screens are built from that library so every state and every size stays consistent.",
    },
    {
      step: "Prototype and test",
      body: "A clickable prototype goes in front of real users or your team. We watch, fix what confuses people and repeat until the flow holds up without anyone explaining it.",
    },
    {
      step: "Hand off with specs",
      body: "Developers receive annotated screens, interaction and motion specs, accessibility notes and a component map. When we build it ourselves, the designer stays in every sprint.",
    },
  ],
  stack: [
    "Figma",
    "FigJam",
    "Figma Variables",
    "Framer",
    "Motion",
    "Maze",
    "Hotjar",
    "Storybook",
    "WCAG 2.2",
    "Apple HIG",
    "Material 3",
  ],
  startingAt: {
    price: "from $2,000",
    timeline: "2 weeks",
    note: "Covers a focused flow or a marketing site. Full product design systems are scoped after research.",
  },
  relatedWork: ["difacto", "hrms-saas", "indibe"],
  relatedServices: ["web-development", "mobile-app-development", "conversion-rate-optimization"],
  faqs: [
    {
      q: "What is the difference between UI and UX design?",
      a: "UX design decides what the product does and in what order: the flows, the structure, the words and the logic behind each screen. UI design decides how it looks and responds: layout, color, type, components and motion. We do both together because a beautiful screen with a confusing flow still loses the user.",
    },
    {
      q: "Do you run user research or can we skip it?",
      a: "You can skip formal interviews on small projects, but we never skip evidence. At minimum we review analytics, session recordings and support tickets, which takes a day and prevents weeks of rework. For new products, five to eight short customer interviews change design decisions more than any other activity we offer.",
    },
    {
      q: "Will the designs be accessible?",
      a: "Yes, accessibility is part of the design, not a report at the end. Color contrast, touch target sizes, focus states, text scaling and screen reader labels are checked against WCAG 2.2 AA on every screen. This also matters legally for clients in the European Union under the European Accessibility Act, in force since 2025.",
    },
    {
      q: "How do you hand designs off to developers?",
      a: "Developers get a Figma file with a component library, design tokens, annotated screens, every interaction state and a short motion spec with durations and easing. We walk the team through it on a call and stay available for questions. When our own engineers build the product, the designer remains in every sprint.",
    },
    {
      q: "Can you redesign an existing product without a full rebuild?",
      a: "Yes, and this is a common request. We audit the current product, keep the structure users already understand, and introduce a design system screen by screen so the engineering team can roll changes out gradually. Users see steady improvement rather than a shock, and the business never pauses for a big relaunch.",
    },
  ],
  authorityLinks: [
    {
      label: "Apple Human Interface Guidelines",
      href: "https://developer.apple.com/design/human-interface-guidelines/",
    },
    { label: "WCAG 2.2, W3C", href: "https://www.w3.org/TR/WCAG22/" },
    { label: "Material Design 3, Google", href: "https://m3.material.io/" },
  ],
};

export default service;
