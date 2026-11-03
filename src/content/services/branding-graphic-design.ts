import type { Service } from "../types";

const service: Service = {
  slug: "branding-graphic-design",
  pillar: "creative",
  title: "Branding and graphic design that makes you recognizable",
  shortTitle: "Branding & Design",
  eyebrow: "Creative",
  seoTitle: "Branding & Graphic Design Services | RevixPlus",
  metaDescription:
    "Logo and identity, brand guidelines, pitch decks, print, packaging and social templates, designed as one system so every touchpoint looks like one company.",
  keywords: [
    "branding agency",
    "logo design",
    "brand identity design",
    "brand guidelines",
    "graphic design services",
    "pitch deck design",
    "packaging design",
  ],
  icon: "Palette",
  heroPromise:
    "A brand is what people recognize before they read a word. We design the logo, color, type and layout rules as one system, write them down in guidelines your team can actually follow, and then apply them to the things you ship every week: decks, packaging, social templates, print. Design that holds together across a hundred touchpoints is what makes a company look established.",
  pains: [
    {
      title: "The logo was made in a hurry",
      body: "It was designed years ago in an afternoon, it falls apart at small sizes, and it looks nothing like the product you sell today. Every new customer meets the company through it first.",
    },
    {
      title: "Every department uses different colors",
      body: "Sales has one deck template, marketing has another, and the website uses a third shade of blue. Customers see five versions of the brand and quietly conclude that nobody is in charge.",
    },
    {
      title: "New designs take weeks to produce",
      body: "Each flyer, label or post starts from a blank canvas because there are no templates or rules. Simple requests queue up behind a freelancer, and launches slip while everyone waits for artwork.",
    },
  ],
  deliverables: [
    "Logo and identity system",
    "Color and typography rules",
    "Brand guidelines document",
    "Pitch and sales decks",
    "Packaging and label design",
    "Print and signage",
    "Social media templates",
    "Website design tokens",
  ],
  approach: [
    {
      step: "Discover",
      body: "We interview you and a few customers, review competitors side by side, and agree on the one or two qualities the brand must communicate before any sketch is drawn.",
    },
    {
      step: "Explore",
      body: "We present three distinct directions for the logo and visual language, each shown on real things such as a storefront, a phone screen and a business card, then refine the one you choose.",
    },
    {
      step: "Systemize",
      body: "We build the full system around the chosen direction: color palette with usage rules, type scale, spacing, iconography, photo style, and how the logo behaves at every size.",
    },
    {
      step: "Apply",
      body: "We design the templates you use most, usually decks, social posts, documents and packaging, so your team can produce on-brand material without a designer in the loop.",
    },
    {
      step: "Hand over",
      body: "We deliver guidelines, editable source files, exported assets in every format, and design tokens for your developers, then stay available for the first launches that use them.",
    },
  ],
  stack: [
    "Figma",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe InDesign",
    "Adobe Express",
    "Canva templates",
    "Google Slides and PowerPoint",
    "Design tokens (CSS, JSON)",
  ],
  startingAt: {
    price: "from $1,200",
    timeline: "2 weeks",
    note: "Logo and core identity. Full guidelines and templates from $3,500.",
  },
  relatedWork: ["thetoys", "revixmd-website", "meeshan-luxe-home"],
  relatedServices: ["social-media-creatives", "ui-ux-design", "web-development"],
  faqs: [
    {
      q: "What is included in a brand identity package?",
      a: "The core package includes a primary logo with horizontal, stacked and icon versions, a color palette with usage rules, a typography pairing with a type scale, and a short guidelines document showing correct and incorrect use. Files arrive in vector and raster formats for print, web and social. Larger packages add templates for decks, documents, packaging and social posts, plus design tokens for developers.",
    },
    {
      q: "How long does a branding project take?",
      a: "A logo and core identity take about two weeks from kickoff to final files, with one round of direction choices and two rounds of refinement built in. A full system with guidelines, templates and packaging usually takes four to six weeks. The schedule depends mostly on how quickly feedback comes back, so we set review dates at the start and keep to them.",
    },
    {
      q: "Can you refresh our existing brand instead of starting over?",
      a: "Yes, and it is often the better choice when customers already recognize you. A refresh keeps the equity in your name and mark while fixing what no longer works: a logo that breaks at small sizes, colors that fail accessibility checks, or type that looks dated. We show you the old and new side by side so the change feels like growth rather than a replacement.",
    },
    {
      q: "Do you design pitch decks and sales presentations?",
      a: "Yes. Decks are one of the most requested items because they are where the brand meets investors and buyers. We design a master template with slide layouts for the stories you tell most, such as problem, solution, traction and pricing, then build the first deck with your content inside it. Your team can produce every later version in Google Slides, PowerPoint or Keynote without a designer.",
    },
    {
      q: "Will the brand work on our website and app too?",
      a: "Yes, because we design it with developers in the room. Every color, font size and spacing value is exported as design tokens that drop straight into CSS or a component library, so the website and app match the guidelines exactly instead of approximately. When RevixPlus also builds the site, the brand system and the interface are designed together from the first week.",
    },
  ],
  authorityLinks: [
    {
      label: "W3C: Understanding WCAG color contrast",
      href: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
    },
    {
      label: "Figma Help Center",
      href: "https://help.figma.com/",
    },
    {
      label: "Adobe Express",
      href: "https://www.adobe.com/express/",
    },
  ],
};

export default service;
