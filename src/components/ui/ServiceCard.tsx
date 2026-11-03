import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Surface } from "@/components/ui/Surface";
import type { Service } from "@/content/types";
import { Icon } from "./Icon";

export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  return (
    <Link href={`/services/${service.slug}`} className="block h-full" aria-label={service.title}>
      <Surface specular interactive className="flex h-full flex-col p-6">
        <span className="grid size-10 place-items-center rounded-xl bg-muted text-cyan">
          <Icon name={service.icon} className="size-5" />
        </span>
        <h3 className="t-h4 mt-4">{service.shortTitle}</h3>
        {!compact ? <p className="t-small mt-2 line-clamp-3 text-fg-2">{service.metaDescription}</p> : null}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="t-small text-fg-3">{service.startingAt.price}</span>
          <ArrowUpRight className="size-4 text-fg-2" aria-hidden="true" />
        </div>
      </Surface>
    </Link>
  );
}
