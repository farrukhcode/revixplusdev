"use client";

import type React from "react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

// VengeanceUI FAQ Accordion (@vengeanceui/faq-accordion). Neutral palette swapped
// for theme tokens; panels are labelled regions and hidden from AT while closed.
export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[];
  title?: string;
}

export function FaqAccordion({ items, title, className, ...props }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const id = useId();

  return (
    <div className={cn("w-full max-w-3xl mx-auto relative font-sans", className)} {...props}>
      {title && (
        <h2 className="text-center font-bold text-2xl md:text-3xl mb-10 text-muted-foreground">{title}</h2>
      )}

      <ul className="w-full mx-auto list-none p-0 flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-border bg-card">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={item.question}
              className={cn(
                "w-full relative transition-all duration-300 ease-in",
                "border-b border-border last:border-b-0",
              )}
            >
              <button
                type="button"
                id={`${id}-q${index}`}
                aria-controls={`${id}-a${index}`}
                className={cn(
                  "flex flex-row items-center justify-start w-full min-h-[60px] py-4 relative m-0 px-4 pl-14 cursor-pointer",
                  "border-l-[6px] md:border-l-[8px] transition-colors duration-200 text-left outline-none text-base md:text-lg",
                  "focus-visible:bg-muted",
                  isActive
                    ? "border-l-primary bg-muted text-foreground font-semibold"
                    : "border-l-border-strong bg-transparent text-muted-foreground hover:border-l-violet hover:text-foreground hover:bg-muted/60",
                )}
                onClick={() => setActiveIndex(isActive ? null : index)}
                aria-expanded={isActive}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-4 md:left-5 top-1/2 -translate-y-1/2 transition-all duration-200 leading-none",
                    isActive
                      ? "text-[32px] md:text-[36px] font-normal text-primary"
                      : "text-[24px] md:text-[28px] font-normal text-fg-3",
                  )}
                >
                  {isActive ? "-" : "+"}
                </span>

                <span className="pr-8">{item.question}</span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute right-6 block w-2 h-2 border-t-[3px] border-r-[3px] transition-transform duration-200 ease-in-out",
                    isActive ? "rotate-[-44deg] border-foreground" : "rotate-[133deg] border-fg-3",
                  )}
                />
              </button>

              <section
                id={`${id}-a${index}`}
                aria-labelledby={`${id}-q${index}`}
                aria-hidden={!isActive}
                className={cn(
                  "grid transition-all duration-300 ease-in-out w-full",
                  "border-l-[6px] md:border-l-[8px]",
                  isActive
                    ? "grid-rows-[1fr] border-l-primary bg-muted"
                    : "grid-rows-[0fr] border-l-border-strong bg-transparent",
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-row items-start justify-start w-full px-4 pl-14 pb-6 pt-2 text-base md:text-[1.0625rem] font-normal leading-relaxed text-muted-foreground">
                    <span>{item.answer}</span>
                  </div>
                </div>
              </section>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;
