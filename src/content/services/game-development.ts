import type { Service } from "../types";

const service: Service = {
  slug: "game-development",
  pillar: "games",
  title: "Game development for mobile and web that keeps players coming back",
  shortTitle: "Game Development",
  eyebrow: "Game Development",
  seoTitle: "Game Development Studio | Unity, Godot, HTML5 Mobile Games | RevixPlus",
  metaDescription:
    "Mobile and web games with Unity, Godot and HTML5: casual and kids' games with ads, in-app purchases, LiveOps and store release, from $10,000.",
  keywords: [
    "game development studio",
    "mobile game development",
    "Unity game development",
    "Godot game developer",
    "casual game development",
  ],
  icon: "Gamepad2",
  heroPromise:
    "You get a finished game, not a prototype: built in Unity, Godot or HTML5, tested on real phones, monetized with ads or in-app purchases, and published on the App Store and Google Play under your account. Casual and kids' games are our focus, with mechanics tuned for short sessions and retention. After launch we run LiveOps so events, levels and offers keep the game alive.",
  pains: [
    {
      title: "Fun prototype, unfinished game",
      body: "A jam build or a freelancer's demo proved the mechanic works, then stalled at menus, saves, monetization and polish. The last twenty percent is where most games die.",
    },
    {
      title: "Players download, play once, leave",
      body: "Without onboarding, progression and a reason to come back tomorrow, day-one retention collapses fast. Ad spend buys installs that never turn into sessions, let alone revenue.",
    },
    {
      title: "Monetization was an afterthought",
      body: "Ads interrupt at the wrong moment, the shop sells nothing anyone wants, and the economy breaks within a week. Revenue stays flat while the reviews quietly drop.",
    },
  ],
  deliverables: [
    "Game design document",
    "Unity or Godot build",
    "HTML5 web version",
    "Art and animation integration",
    "Ads and in-app purchases",
    "Analytics and A/B testing",
    "App Store and Play release",
    "LiveOps and content updates",
  ],
  approach: [
    {
      step: "Design the core loop",
      body: "We write a short design document covering the mechanic, session length, progression and the economy, then prototype the core loop in a week to prove it is fun before building around it.",
    },
    {
      step: "Build the vertical slice",
      body: "One polished level with menus, saves, sound and the first monetization touchpoint shows exactly what the finished game will feel like. You play it on your own phone.",
    },
    {
      step: "Produce the content",
      body: "Levels, art, audio and features get built in sprints with weekly test builds. Analytics events go in from the start so we can read retention before launch, not after.",
    },
    {
      step: "Soft launch and tune",
      body: "A limited release in one or two countries measures retention, session length and revenue per user. We tune difficulty, ad placement and offers from the data before going wide.",
    },
    {
      step: "Launch and run LiveOps",
      body: "The game goes live worldwide with store assets, ratings prompts and crash monitoring. Seasonal events, new levels and offers follow on a calendar we agree with you.",
    },
  ],
  stack: [
    "Unity",
    "C#",
    "Godot",
    "GDScript",
    "Phaser",
    "TypeScript",
    "Firebase",
    "AdMob",
    "Unity Ads",
    "RevenueCat",
    "GameAnalytics",
    "Blender",
  ],
  startingAt: {
    price: "from $10,000",
    timeline: "8 weeks",
    note: "Covers a casual game with one core mechanic. Multiplayer and larger productions are scoped after the design document.",
  },
  relatedWork: ["thetoys", "hockeystore"],
  relatedServices: ["playable-ads-web-games", "mobile-app-development", "paid-advertising"],
  faqs: [
    {
      q: "Unity, Godot or HTML5: which engine should we use?",
      a: "Unity is the safest choice for mobile games that need ads, in-app purchases and a large asset ecosystem. Godot is lighter, free of royalties and excellent for 2D games with small teams. HTML5 with Phaser fits games that live in a browser, inside an ad or on YouTube Playables. We choose by platform and monetization, not habit.",
    },
    {
      q: "How much does it cost to develop a mobile game?",
      a: "A casual mobile game with one core mechanic, a few dozen levels, ads and in-app purchases starts from $10,000 and takes about eight weeks. Games with multiplayer, large content libraries or original 3D art typically run from $30,000 to $100,000. We give a fixed quote after the design document and the prototype week.",
    },
    {
      q: "Do you design games for kids?",
      a: "Yes, kids' games are a focus and they come with extra responsibility. We follow the Google Play Families and Apple Kids Category rules, avoid manipulative purchase patterns, keep ads age-appropriate or remove them entirely, and design for short sessions and parental peace of mind. Compliance reviews happen before submission, not after rejection.",
    },
    {
      q: "How do you make a game profitable?",
      a: "Profit comes from retention first and monetization second. We design progression and daily reasons to return, then place rewarded ads and purchases where they help the player rather than interrupt them. Analytics from soft launch tell us the real numbers, and LiveOps events keep revenue growing after the install spike fades.",
    },
    {
      q: "Can you publish the game under our studio account?",
      a: "Yes, we publish under your developer accounts so you own the listing, the reviews and the revenue from day one. We prepare store assets, age ratings, privacy declarations and release builds, handle review feedback and ship updates through the same accounts. Nothing about the game ever lives under our name.",
    },
  ],
  authorityLinks: [
    { label: "Unity documentation", href: "https://docs.unity3d.com/" },
    { label: "Godot Engine documentation", href: "https://docs.godotengine.org/en/stable/" },
    { label: "Kids apps on the App Store, Apple", href: "https://developer.apple.com/app-store/kids-apps/" },
  ],
};

export default service;
