import type { Testimonial } from "./types";

/**
 * Placeholder testimonials. Every entry stays "TODO" until the client has
 * approved the exact words. Nothing here is published until status is "approved".
 */
export const testimonials: Testimonial[] = [
  {
    quote: "TODO: awaiting approved words from Meeshan Luxe Home",
    author: "TODO",
    role: "TODO",
    company: "Meeshan Luxe Home",
    work: "meeshan-luxe-home",
    status: "TODO",
  },
  {
    quote: "TODO: awaiting approved words from The Vitamin Company",
    author: "TODO",
    role: "TODO",
    company: "The Vitamin Company",
    work: "the-vitamin-company",
    status: "TODO",
  },
  {
    quote: "TODO: awaiting approved words from Sushi2500",
    author: "TODO",
    role: "TODO",
    company: "Sushi2500",
    work: "sushi2500",
    status: "TODO",
  },
  {
    quote: "TODO: awaiting approved words from Bankful",
    author: "TODO",
    role: "TODO",
    company: "Bankful",
    work: "bankful",
    status: "TODO",
  },
  {
    quote: "TODO: awaiting approved words from Revix MD",
    author: "TODO",
    role: "TODO",
    company: "Revix MD",
    work: "revixmd-ai-automation",
    status: "TODO",
  },
  {
    quote: "TODO: awaiting approved words from DiFacto",
    author: "TODO",
    role: "TODO",
    company: "DiFacto",
    work: "difacto",
    status: "TODO",
  },
];

export const approvedTestimonials = testimonials.filter((t) => t.status === "approved");
