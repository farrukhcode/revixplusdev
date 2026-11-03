import type { CaseStudy } from "../types";
import bankful from "./bankful";
import difacto from "./difacto";
import hisEnergy from "./his-energy";
import hockeystore from "./hockeystore";
import hostingPlatform from "./hosting-platform";
import hrmsSaas from "./hrms-saas";
import indibe from "./indibe";
import medallionDusk from "./medallion-dusk";
import meeshanLuxeHome from "./meeshan-luxe-home";
import revixmdAiAutomation from "./revixmd-ai-automation";
import revixmdWebsite from "./revixmd-website";
import sushi2500 from "./sushi2500";
import theVitaminCompany from "./the-vitamin-company";
import thetoys from "./thetoys";

export const caseStudies: CaseStudy[] = [
  difacto,
  bankful,
  revixmdAiAutomation,
  meeshanLuxeHome,
  indibe,
  hrmsSaas,
  thetoys,
  hostingPlatform,
  revixmdWebsite,
  theVitaminCompany,
  hisEnergy,
  sushi2500,
  medallionDusk,
  hockeystore,
];

export const featuredWork = caseStudies
  .filter((w) => w.featured)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const workBySlug = Object.fromEntries(caseStudies.map((w) => [w.slug, w])) as Record<
  string,
  CaseStudy
>;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return workBySlug[slug];
}
