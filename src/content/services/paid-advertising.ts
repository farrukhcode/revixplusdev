import type { Service } from "../types";

const service: Service = {
  slug: "paid-advertising",
  pillar: "growth",
  title: "Paid advertising on Google, Meta, LinkedIn and TikTok that pays back",
  shortTitle: "Paid Advertising",
  eyebrow: "Growth Marketing",
  seoTitle: "Paid Advertising Agency: Google, Meta, LinkedIn, TikTok Ads | RevixPlus",
  metaDescription:
    "Google, Meta, LinkedIn and TikTok campaigns with proper tracking, creative testing, retargeting and landing pages from one team. Reported on cost per lead.",
  keywords: [
    "paid advertising agency",
    "Google Ads management",
    "Meta ads agency",
    "LinkedIn ads B2B",
    "TikTok ads",
    "PPC management",
    "retargeting campaigns",
  ],
  icon: "Megaphone",
  heroPromise:
    "Ad budgets get wasted in two places: tracking that reports the wrong numbers, and landing pages that leak the clicks you paid for. We set up conversion tracking before spending a dollar, test creatives in small batches, retarget the people who showed intent, and build the landing pages ourselves. You see cost per lead and cost per sale, not just clicks.",
  pains: [
    {
      title: "Spend goes up, leads do not",
      body: "The platform dashboard shows cheap clicks and a healthy click-through rate, yet the sales inbox stays quiet. Money is buying attention from people who were never going to become customers.",
    },
    {
      title: "Tracking says one thing, sales say another",
      body: "Meta reports forty conversions, Google reports thirty, and your CRM shows twelve. With pixels firing twice or not at all, every optimization decision is being made on numbers nobody trusts.",
    },
    {
      title: "The landing page undoes the ad",
      body: "A sharp ad sends people to a slow homepage with six competing buttons and a form that asks for too much. Most of the budget is spent before anyone reaches the offer.",
    },
  ],
  deliverables: [
    "Conversion tracking setup",
    "Campaign structure and audiences",
    "Ad creative testing",
    "Dedicated landing pages",
    "Retargeting funnels",
    "Budget pacing and bidding",
    "Weekly optimization",
    "Cost per lead reporting",
  ],
  approach: [
    {
      step: "Track",
      body: "We install and verify server-side and browser tracking, define one conversion per campaign, and reconcile platform numbers against your CRM before any budget is spent.",
    },
    {
      step: "Build",
      body: "We design the landing page around the ad's promise, strip it to one action, make it load in under two seconds on mobile, and connect the form to your inbox.",
    },
    {
      step: "Launch",
      body: "We start with a small daily budget across three or four creative angles, let the data separate winners from losers over one to two weeks, and cut the losers quickly.",
    },
    {
      step: "Retarget",
      body: "We follow up with people who visited, watched or added to cart, using a different message at each stage, because warm audiences convert at a fraction of the cold cost.",
    },
    {
      step: "Scale",
      body: "We raise budgets on what works in steps of twenty to thirty percent, rotate creatives before fatigue sets in, and report cost per lead and cost per sale every week.",
    },
  ],
  stack: [
    "Google Ads",
    "Meta Ads Manager",
    "LinkedIn Campaign Manager",
    "TikTok Ads Manager",
    "Google Tag Manager",
    "Conversions API",
    "Google Analytics 4",
    "Microsoft Clarity",
    "Next.js landing pages",
  ],
  startingAt: {
    price: "from $800",
    timeline: "per month, plus ad spend",
    note: "Management fee covers up to $5,000 monthly spend; above that we quote a percentage.",
  },
  relatedWork: ["thetoys", "the-vitamin-company", "meeshan-luxe-home"],
  relatedServices: ["conversion-rate-optimization", "social-media-creatives", "email-marketing-automation"],
  faqs: [
    {
      q: "How much should I spend on ads to start?",
      a: "Most small businesses can learn what works with $1,000 to $2,000 a month in ad spend over the first two months, enough to test a few creative angles and reach statistical confidence on one conversion. Below that, results take longer to read. We recommend a budget per market in the kickoff, and we will tell you if it is too small to be useful.",
    },
    {
      q: "Which platform is best for my business?",
      a: "Google Search captures people already looking for what you sell, so it suits services and high-intent products. Meta and TikTok create demand with visual creatives, which works for consumer brands and stores. LinkedIn costs more per click but reaches decision makers for B2B offers. We usually begin with one intent channel and one discovery channel, then shift budget toward the winner.",
    },
    {
      q: "Do you build the landing pages too?",
      a: "Yes, and we think it is the most important part. Our developers build dedicated landing pages in Next.js or inside your existing WordPress or Shopify site, each with one offer, one form and a load time under two seconds on mobile. Sending paid traffic to a generic homepage is the fastest way to waste a budget, so we rarely do it.",
    },
    {
      q: "How do you fix tracking that does not match my sales?",
      a: "We rebuild it from the conversion backward. Each campaign gets one defined conversion event, installed through Google Tag Manager and the Conversions API so it survives browser blockers, then tested with real submissions before launch. Every month we reconcile platform-reported conversions with your CRM or order system and adjust attribution windows so the numbers you optimize on are the numbers you bank.",
    },
    {
      q: "Is there a minimum contract for ad management?",
      a: "We ask for three months. The first month is mostly setup and testing, the second is where winners emerge, and the third is where scaling starts to show a stable cost per lead. Shorter engagements tend to end right before the data becomes useful. After three months, the agreement runs month to month and you can pause whenever you need.",
    },
  ],
  authorityLinks: [
    {
      label: "Google Ads Help",
      href: "https://support.google.com/google-ads",
    },
    {
      label: "Meta Business: Advertising",
      href: "https://www.facebook.com/business/ads",
    },
    {
      label: "LinkedIn Ads",
      href: "https://business.linkedin.com/marketing-solutions/ads",
    },
  ],
};

export default service;
