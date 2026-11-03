import type { ReactNode } from "react";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  crumbs?: { name: string; path: string }[];
  children?: ReactNode;
  className?: string;
}

/** Inner-page hero: breadcrumbs, eyebrow, H1, lead, optional actions. */
export function PageHeader({ eyebrow, title, lead, crumbs, children, className }: PageHeaderProps) {
  return (
    <header className={cn("container-x pt-32 pb-12 lg:pt-40 lg:pb-16", className)}>
      {crumbs?.length ? <Breadcrumbs items={crumbs} /> : null}
      {/* Above the fold: CSS entrances only, so nothing waits for hydration */}
      {eyebrow ? <p className="t-eyebrow enter mb-4">{eyebrow}</p> : null}
      <SplitHeading as="h1" className="t-h1 max-w-[20ch]" immediate>
        {title}
      </SplitHeading>
      {lead ? <div className="t-lead enter mt-6 max-w-[62ch]">{lead}</div> : null}
      {children ? (
        <div className="enter mt-8 flex flex-wrap gap-3" style={{ transitionDelay: "420ms" }}>
          {children}
        </div>
      ) : null}
    </header>
  );
}
