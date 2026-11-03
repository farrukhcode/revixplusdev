import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** False for content still marked "TODO" (an unconfirmed fact or pending figure), which is never shown. */
export const known = (value?: string): value is string => !!value && !value.startsWith("TODO");

/** "Farrukh Bilal" → "FB", for avatar fallbacks */
export const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

export function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Apple's momentum projection (Designing Fluid Interfaces, WWDC 2018) */
export function projectMomentum(velocityPxPerSec: number, decelerationRate = 0.998) {
  return ((velocityPxPerSec / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Rubber-band resistance past a boundary */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
