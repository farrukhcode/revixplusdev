import type { PillarSlug, Service } from "../types";
import aiAgentsAutomation from "./ai-agents-automation";
import aiIntegration from "./ai-integration";
import aiStrategyReadiness from "./ai-strategy-readiness";
import aieoGeo from "./aieo-geo";
import apiBackendEngineering from "./api-backend-engineering";
import brandingGraphicDesign from "./branding-graphic-design";
import chatbotsVoiceAgents from "./chatbots-voice-agents";
import cloudDevopsDeployment from "./cloud-devops-deployment";
import contentMarketing from "./content-marketing";
import conversionRateOptimization from "./conversion-rate-optimization";
import dedicatedTeams from "./dedicated-teams";
import ecommerceDevelopment from "./ecommerce-development";
import emailMarketingAutomation from "./email-marketing-automation";
import gameDevelopment from "./game-development";
import healthcareAiAutomation from "./healthcare-ai-automation";
import llmEvaluationOptimization from "./llm-evaluation-optimization";
import maintenanceSupportRetainers from "./maintenance-support-retainers";
import mobileAppDevelopment from "./mobile-app-development";
import paidAdvertising from "./paid-advertising";
import playableAdsWebGames from "./playable-ads-web-games";
import ragKnowledgeAssistants from "./rag-knowledge-assistants";
import saasMvpDevelopment from "./saas-mvp-development";
import securityCompliance from "./security-compliance";
import seo from "./seo";
import shopifyDevelopment from "./shopify-development";
import socialMediaCreatives from "./social-media-creatives";
import socialMediaMarketing from "./social-media-marketing";
import uiUxDesign from "./ui-ux-design";
import videoEditingMotionGraphics from "./video-editing-motion-graphics";
import webDevelopment from "./web-development";
import wordpressDevelopment from "./wordpress-development";

/** Ordered as they appear in navigation and on the services overview. */
export const services: Service[] = [
  aiStrategyReadiness,
  aiIntegration,
  ragKnowledgeAssistants,
  aiAgentsAutomation,
  chatbotsVoiceAgents,
  llmEvaluationOptimization,
  healthcareAiAutomation,
  webDevelopment,
  mobileAppDevelopment,
  ecommerceDevelopment,
  shopifyDevelopment,
  wordpressDevelopment,
  saasMvpDevelopment,
  apiBackendEngineering,
  uiUxDesign,
  gameDevelopment,
  playableAdsWebGames,
  seo,
  aieoGeo,
  socialMediaMarketing,
  paidAdvertising,
  contentMarketing,
  emailMarketingAutomation,
  conversionRateOptimization,
  brandingGraphicDesign,
  videoEditingMotionGraphics,
  socialMediaCreatives,
  cloudDevopsDeployment,
  securityCompliance,
  maintenanceSupportRetainers,
  dedicatedTeams,
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<string, Service>;

export function servicesByPillar(pillar: PillarSlug) {
  return services.filter((s) => s.pillar === pillar);
}

export function getService(slug: string): Service | undefined {
  return serviceBySlug[slug];
}
