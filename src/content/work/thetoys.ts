import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "thetoys",
  title: "A kids' toy store and the social creative system behind it",
  client: "The Toys (RevixPlus growth lab)",
  industry: "E-commerce, kids' toys and clothing",
  location: "Pakistan",
  services: ["ecommerce-development", "social-media-creatives", "social-media-marketing"],
  stack: [
    "Custom storefront",
    "Docker",
    "Coolify",
    "WhatsApp Business",
    "Instagram",
    "Facebook",
    "Meta Business Suite",
    "Cash on delivery logistics",
  ],
  timeline: "2025 to present",
  liveUrl: "https://thetoys.pk",
  summary:
    "A nationwide cash-on-delivery toy store for Pakistani families, paired with a bright, age-segmented social creative system on Instagram and Facebook that we run as our own growth lab.",
  challenge: [
    "Parents in Pakistan buy toys on trust. They want to pay on delivery, return something that disappoints, and reach a human on WhatsApp when a parcel is late. A store that could not offer all three would not get a second order, no matter how good the product photos looked.",
    "On social media the brand was starting from zero followers in a feed full of resellers posting blurry supplier images. The creatives had to look like a real brand from day one, speak to parents by their child's age, and be cheap enough to produce several times a week.",
  ],
  solution: [
    "We built thetoys.pk around the way families actually shop. Products are organized by type, from building blocks to remote control vehicles, and by age from newborn to 14 plus. Cash on delivery is front and center, delivery is free over Rs. 2,999, returns are easy within 7 days, and WhatsApp support is one tap away on every page.",
    "The social creative system is a set of templates rather than one-off posts. Bright 3D-style type, product-hero photography and a consistent footer bar with the logo and phone number make every post recognizable. Campaigns are segmented by age, such as learning and play toys for 4 to 6 year olds, and mixed between reels and statics.",
    "Instagram is now Meta Verified with 514 followers and Facebook sits at 276, both growing from a standing start. Because we own the brand, we run our exact social, SEO and paid playbook on it and publish the numbers, so prospective clients can see the method working rather than take our word for it.",
  ],
  results: [
    { value: "TODO: add figure", label: "orders delivered nationwide" },
    { value: "TODO: add figure", label: "follower growth since launch" },
    { value: "TODO: add figure", label: "average engagement per post" },
  ],
  featured: true,
  order: 7,
  accent: ["var(--orange)", "var(--pink)"],
  seoTitle: "The Toys Case Study: COD Toy Store and Social Creatives",
  metaDescription:
    "How RevixPlus built thetoys.pk, a nationwide cash-on-delivery toy store, and the age-segmented Instagram and Facebook creative system it runs as a growth lab.",
};

export default study;
