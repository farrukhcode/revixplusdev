import type { CaseStudy } from "../types";

const study: CaseStudy = {
  slug: "hockeystore",
  title: "An ice hockey equipment store for the Danish market",
  client: "Hockeystore.dk",
  industry: "E-commerce, sports equipment",
  location: "Denmark",
  services: ["ecommerce-development", "web-development"],
  stack: ["ASP.NET", "C#", "jQuery", "SQL Server", "HTML", "CSS"],
  timeline: "TODO: confirm",
  liveUrl: "https://hockeystore.dk",
  summary:
    "An online store for ice hockey gear in Denmark, built on ASP.NET and C# with a jQuery front end, where players filter sticks, skates and pads by size, flex and level.",
  challenge: [
    "Hockey equipment is a specification-heavy purchase. A stick comes in flex ratings, curves and lengths, skates in widths and sizes, and protective gear in junior, intermediate and senior cuts. Players needed to filter by those attributes quickly, and the wrong combination means a return.",
    "The store already ran on a Microsoft stack, so the work had to fit ASP.NET and C# rather than start over on a new platform. Catalog data, variants and stock needed to stay in sync with the shop's existing systems while the front end got the filtering and speed customers expected.",
  ],
  solution: [
    "We built the storefront on ASP.NET with C# handling catalog, variants and orders against the existing database. Product attributes such as flex, curve, size and level are modeled as real variant data, so the filters on category pages return exactly the items that fit a given player.",
    "The front end uses jQuery for the interactive parts: attribute filters that update without a full reload, size guides in modals and a cart that reflects variant choices clearly. Pages are kept lean so the catalog browses quickly even with large images of every stick and skate.",
    "Checkout and delivery are set up for Danish customers, with local payment options and shipping rules, and the store is structured so the shop team can manage products and stock in one place. The result is a specialist store that behaves like one rather than a generic shop with hockey products in it.",
  ],
  results: [
    { value: "TODO: add figure", label: "products and variants listed" },
    { value: "TODO: add figure", label: "reduction in size-related returns" },
    { value: "TODO: add figure", label: "orders per month" },
  ],
  featured: false,
  accent: ["var(--blue)", "var(--cyan)"],
  seoTitle: "Hockeystore.dk Case Study: ASP.NET Hockey Store | RevixPlus",
  metaDescription:
    "How RevixPlus built Hockeystore.dk, an ice hockey equipment store for Denmark on ASP.NET and C#, with variant filters for stick flex, skate size and level.",
};

export default study;
