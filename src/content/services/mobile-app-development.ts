import type { Service } from "../types";

const service: Service = {
  slug: "mobile-app-development",
  pillar: "web-mobile",
  title: "Mobile app development for iOS and Android",
  shortTitle: "Mobile Apps",
  eyebrow: "Web & Mobile",
  seoTitle: "Mobile App Development Agency | iOS & Android | React Native | RevixPlus",
  metaDescription:
    "Mobile app development for iOS and Android with React Native and Expo. Push notifications, payments, offline mode and store submission handled, from $12,000.",
  keywords: [
    "mobile app development",
    "React Native development agency",
    "iOS app development",
    "Android app development",
    "Expo app development",
  ],
  icon: "Smartphone",
  heroPromise:
    "You get one codebase that ships to the App Store and Google Play, built with React Native and Expo so updates reach users in days rather than release cycles. Push notifications, payments, offline mode and analytics are part of the build, not add-ons. We handle store listings, review feedback and the first production release, then stay on for the updates that follow.",
  pains: [
    {
      title: "Two native teams, double the cost",
      body: "Separate iOS and Android codebases mean every feature is built twice, tested twice and fixed twice. Budgets drain on duplication while the roadmap barely moves forward each quarter.",
    },
    {
      title: "The app exists but nobody uses it",
      body: "Downloads happened, retention did not. Slow screens, missing push notifications and a confusing first run push people back to the browser or to a competitor within days.",
    },
    {
      title: "Store rejections keep delaying launch",
      body: "Apple's review bounced the build twice, the privacy labels are wrong, and the marketing date already passed. Nobody on the team has shipped through the stores before.",
    },
  ],
  deliverables: [
    "React Native and Expo app",
    "iOS and Android builds",
    "Push notifications",
    "In-app payments and subscriptions",
    "Offline-first data sync",
    "Backend API and admin",
    "App Store and Play listing",
    "Crash and usage analytics",
  ],
  approach: [
    {
      step: "Scope the first release",
      body: "We define the screens, the platforms and the integrations for version one, then write acceptance criteria. Features that can wait go on a roadmap instead of the first build.",
    },
    {
      step: "Design for both platforms",
      body: "Figma screens follow Apple and Google guidelines where they differ and share a system where they agree. You tap through a prototype on your own phone before development starts.",
    },
    {
      step: "Build and test on devices",
      body: "Weekly builds go to TestFlight and Google Play internal testing. We test on real devices, fix performance before features pile up, and keep the backend in step with the app.",
    },
    {
      step: "Submit and launch",
      body: "We prepare screenshots, privacy details and store listings, handle review feedback, and ship the first release. Over-the-air updates then reach users without waiting for store approval.",
    },
  ],
  stack: [
    "React Native",
    "Expo",
    "TypeScript",
    "Flutter",
    "Node.js",
    "PostgreSQL",
    "Firebase",
    "RevenueCat",
    "Stripe",
    "Sentry",
    "EAS Build",
  ],
  startingAt: {
    price: "from $12,000",
    timeline: "6 weeks",
    note: "Covers one app on both platforms with a backend. Native Swift or Kotlin work is quoted separately.",
  },
  relatedWork: ["hrms-saas", "difacto", "bankful"],
  relatedServices: ["api-backend-engineering", "ui-ux-design", "saas-mvp-development"],
  faqs: [
    {
      q: "Should we build with React Native or go fully native?",
      a: "React Native is the right choice for most business apps because one codebase covers iOS and Android and a single team maintains it. We recommend native Swift or Kotlin only when the app depends on heavy graphics, low-level hardware access or platform features React Native cannot reach yet. We will tell you which applies to your idea during discovery.",
    },
    {
      q: "How much does a mobile app cost to build?",
      a: "Mobile apps start from $12,000 for a focused first release on both platforms, including a backend and store submission. Apps with marketplaces, live chat, video or complex offline logic usually land between $25,000 and $60,000. We quote a fixed price after discovery, and you can phase features across releases to control spend.",
    },
    {
      q: "Do you handle App Store and Google Play submission?",
      a: "Yes, we handle the whole submission. That covers developer account setup under your name, screenshots and listing copy, privacy nutrition labels, review responses and the first production release. Rejections are common for first-time publishers, so we check guideline compliance before each build goes out rather than after a rejection arrives.",
    },
    {
      q: "Can the app work offline and sync later?",
      a: "Yes, offline-first is a design decision we make early rather than a feature bolted on later. Data is stored on the device, changes queue while the connection is down, and sync resolves conflicts when it returns. This matters for field teams, delivery riders and anyone using the app in a basement, a plane or a rural area.",
    },
    {
      q: "What happens after the app launches?",
      a: "Launch is the start of the useful part. We monitor crashes and usage from day one, ship over-the-air fixes within hours when needed, and plan the next release from real behavior rather than guesses. A monthly retainer covers operating system updates, store policy changes and the improvements users ask for.",
    },
  ],
  authorityLinks: [
    { label: "Expo documentation", href: "https://docs.expo.dev/" },
    { label: "React Native documentation", href: "https://reactnative.dev/docs/getting-started" },
    {
      label: "App Store Review Guidelines, Apple",
      href: "https://developer.apple.com/app-store/review/guidelines/",
    },
  ],
};

export default service;
