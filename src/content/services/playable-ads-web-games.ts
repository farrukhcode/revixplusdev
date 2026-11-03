import type { Service } from "../types";

const service: Service = {
  slug: "playable-ads-web-games",
  pillar: "games",
  title: "Playable ads, HTML5 games and YouTube Playables for brands",
  shortTitle: "Playables & Web Games",
  eyebrow: "Game Development",
  seoTitle: "Playable Ads & HTML5 Game Development | YouTube Playables | RevixPlus",
  metaDescription:
    "Playable ad units for Meta and Google, lightweight HTML5 games for brand campaigns and YouTube Playables submissions. Built under size limits, from $3,000.",
  keywords: [
    "playable ads development",
    "HTML5 game development",
    "YouTube Playables developer",
    "branded games",
    "interactive ads",
  ],
  icon: "Play",
  heroPromise:
    "You get a game that runs instantly in a browser, an ad placement or the YouTube app, with no install and no loading screen worth mentioning. We build playable ad units that meet Meta and Google size limits, branded web games for campaigns and product launches, and submit titles to YouTube Playables. Everything ships with analytics so you know who played, for how long and what they did next.",
  pains: [
    {
      title: "Static ads get scrolled past",
      body: "Your creative competes with everything else in the feed and loses in under a second. A playable turns thirty seconds of attention into a memory of your brand and product.",
    },
    {
      title: "The campaign game is too heavy",
      body: "The agency delivered a thirty megabyte build that fails the ad network limits and stutters on mid-range phones. Most of your audience never gets past the loading screen.",
    },
    {
      title: "Nobody knows what the game achieved",
      body: "Sessions happened somewhere, but there is no link between plays, clicks and sales. The campaign ends and the only report anyone receives is a view count.",
    },
  ],
  deliverables: [
    "Playable ad units",
    "HTML5 branded games",
    "YouTube Playables build",
    "Size and performance optimization",
    "Ad network compliance",
    "Analytics and event tracking",
    "Localized versions",
    "Landing page integration",
  ],
  approach: [
    {
      step: "Define the one mechanic",
      body: "A playable has to teach itself in three seconds, so we pick one mechanic tied to your product and sketch the full thirty-second arc, including the end card and call to action.",
    },
    {
      step: "Build light",
      body: "We build with Phaser or plain TypeScript and canvas, compress every asset, and keep the bundle under network limits, typically two to five megabytes, without losing the polish.",
    },
    {
      step: "Test on real phones",
      body: "Each build runs on low-end Android devices and older iPhones over throttled connections. Frame rate, load time and input lag get fixed before anyone sees the creative.",
    },
    {
      step: "Ship to every channel",
      body: "The same core game is packaged for Meta, Google, AppLovin or Unity Ads, exported as a standalone web game, or submitted to YouTube Playables with their review requirements met.",
    },
  ],
  stack: [
    "Phaser",
    "PixiJS",
    "TypeScript",
    "Canvas and WebGL",
    "Howler.js",
    "Vite",
    "Meta Playables",
    "Google Ads HTML5",
    "YouTube Playables",
    "Google Analytics 4",
  ],
  startingAt: {
    price: "from $3,000",
    timeline: "3 weeks",
    note: "Covers one playable with localization in up to three languages. Multi-level branded games are quoted separately.",
  },
  relatedWork: ["thetoys", "indibe"],
  relatedServices: ["game-development", "paid-advertising", "social-media-creatives"],
  faqs: [
    {
      q: "What is a playable ad and where does it run?",
      a: "A playable ad is a short interactive demo, usually fifteen to thirty seconds, that runs inside an ad placement without installing anything. It appears in Meta's Facebook and Instagram feeds, Google and AppLovin ad networks and in other apps and games. Players try the experience, then tap through to your store or app listing.",
    },
    {
      q: "How big can a playable ad be?",
      a: "Limits vary by network and change over time, so we check them for each campaign. As a rule we aim for under two megabytes for Meta and under five for most other networks, with all assets inlined into a single HTML file. Lighter builds load faster and get shown to more people by the auction.",
    },
    {
      q: "What are YouTube Playables and can you get us listed?",
      a: "YouTube Playables is a section of the YouTube app and site where people play free browser games without leaving YouTube. Titles are submitted through YouTube's developer program and reviewed for quality, safety and performance. We build to their technical requirements, prepare the submission and handle feedback, though acceptance is YouTube's decision.",
    },
    {
      q: "Can a branded game be part of a larger campaign?",
      a: "Yes, that is where branded games perform best. We connect the game to a landing page, a product launch or a social campaign, add shareable scores and rewards, and track plays, completions and click-throughs in your analytics. The game becomes an entry point for the campaign rather than a standalone gimmick.",
    },
    {
      q: "How long does a playable take to produce?",
      a: "A single playable ad with one mechanic takes about three weeks from brief to delivery, including testing on devices and network compliance checks. A branded web game with several levels or a leaderboard takes four to six weeks. Localized variants and resized versions for other networks add a few days each.",
    },
  ],
  authorityLinks: [
    { label: "YouTube Playables", href: "https://www.youtube.com/playables" },
    { label: "Phaser game framework", href: "https://phaser.io/" },
    {
      label: "Canvas API, MDN Web Docs",
      href: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
    },
  ],
};

export default service;
