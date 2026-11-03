import type { Service } from "../types";

const service: Service = {
  slug: "ecommerce-development",
  pillar: "web-mobile",
  title: "E-commerce development that turns visitors into orders",
  shortTitle: "E-commerce",
  eyebrow: "Web & Mobile",
  seoTitle: "E-commerce Development | Shopify, WooCommerce, Headless | RevixPlus",
  metaDescription:
    "E-commerce development on Shopify, WooCommerce and headless Next.js. Fast storefronts, optimized checkout, payments and cash on delivery, built from $2,500.",
  keywords: [
    "ecommerce development agency",
    "online store development",
    "headless ecommerce Next.js",
    "WooCommerce development",
    "ecommerce website design",
  ],
  icon: "ShoppingCart",
  heroPromise:
    "You get a store that loads fast on a phone, makes the product obvious, and gets people through checkout without friction. We have launched stores for supplements, furniture, jewelry, sushi delivery, hockey gear, cosmetics and toys, across Shopify, WooCommerce and headless Next.js storefronts. Cash on delivery, local gateways and international cards all work the way your market expects.",
  pains: [
    {
      title: "Traffic arrives, carts get abandoned",
      body: "Ads bring people in, then a slow product page, a surprise shipping fee or a clumsy checkout sends them away. You pay for every click and keep less than you should.",
    },
    {
      title: "The platform fights the business",
      body: "Your theme was never built for your catalog, every promotion needs a developer, and the plugins conflict with each other. Running a sale feels like a risk instead of a routine.",
    },
    {
      title: "Growth stalls at the first market",
      body: "Selling into a second country means new currencies, taxes, payment methods and shipping rules. The store that worked at home breaks the moment you try to expand it.",
    },
  ],
  deliverables: [
    "Shopify or WooCommerce store",
    "Headless Next.js storefront",
    "Custom theme and design",
    "Checkout and payment setup",
    "Cash on delivery flows",
    "Product and inventory sync",
    "Speed and SEO optimization",
    "Analytics and conversion tracking",
    "Launch and training",
  ],
  approach: [
    {
      step: "Pick the right platform",
      body: "We look at catalog size, markets, margins and your team before recommending Shopify, WooCommerce or a headless build. The cheapest platform to run for years wins, not the trendiest.",
    },
    {
      step: "Design around the product",
      body: "Product pages, collection pages and checkout get designed first because that is where money changes hands. Everything else supports those three screens and stays out of the way.",
    },
    {
      step: "Build, migrate, integrate",
      body: "We build the theme, migrate products and customers, and connect payments, shipping, accounting and marketing tools. Test orders run through every path, including cash on delivery and returns.",
    },
    {
      step: "Launch and optimize",
      body: "The store goes live with speed checks, tracking in place and your team trained on daily operations. Then we read the data and improve the pages that leak the most orders.",
    },
  ],
  stack: [
    "Shopify",
    "Shopify Plus",
    "WooCommerce",
    "Next.js",
    "Liquid",
    "Stripe",
    "PayPal",
    "Klaviyo",
    "Google Analytics 4",
    "Meta Pixel",
    "Cloudflare",
  ],
  startingAt: {
    price: "from $2,500",
    timeline: "3 weeks",
    note: "Headless storefronts and marketplaces are scoped after discovery.",
  },
  relatedWork: ["meeshan-luxe-home", "the-vitamin-company", "indibe"],
  relatedServices: ["shopify-development", "conversion-rate-optimization", "paid-advertising"],
  faqs: [
    {
      q: "Which e-commerce platform should we choose?",
      a: "Shopify fits most product businesses because hosting, payments and security come built in and the app ecosystem covers most needs. WooCommerce fits content-heavy brands already on WordPress or those who want full control of hosting and cost. A headless Next.js storefront makes sense when design, speed or a custom catalog outgrow both. We recommend after seeing your numbers.",
    },
    {
      q: "Can you set up cash on delivery and local payment methods?",
      a: "Yes, and we do it often for stores in Pakistan, the UAE and other cash on delivery markets. We configure COD with order confirmation steps that cut fake orders, add local gateways alongside international cards, and set shipping rules per region. The checkout shows each customer only the options that work where they live.",
    },
    {
      q: "How fast will the store be?",
      a: "Fast enough to pass Google's Core Web Vitals on mobile, which is where most of your shoppers are. We keep themes lean, compress and lazy-load images, limit third-party scripts and test on mid-range phones over a slow connection. Speed is checked before launch and again after every theme or app change.",
    },
    {
      q: "Will you migrate our existing store and customers?",
      a: "Yes, migrations are part of the build. Products, variants, images, customers, order history and discount codes move across with URL redirects in place so search rankings survive the switch. We run the old and new stores in parallel during testing, then cut over on a quiet day with a rollback plan ready.",
    },
    {
      q: "What does it cost to run the store after launch?",
      a: "Running costs depend on the platform. Shopify charges a monthly plan plus transaction fees, WooCommerce needs hosting and occasional plugin licenses, and a headless store needs a small server we can manage for you. We list every recurring cost before you commit, and a maintenance retainer covers updates, monitoring and small changes.",
    },
  ],
  authorityLinks: [
    {
      label: "Cart abandonment research, Baymard Institute",
      href: "https://baymard.com/lists/cart-abandonment-rate",
    },
    { label: "Shopify developer documentation", href: "https://shopify.dev/docs" },
    { label: "Core Web Vitals, web.dev", href: "https://web.dev/articles/vitals" },
  ],
};

export default service;
