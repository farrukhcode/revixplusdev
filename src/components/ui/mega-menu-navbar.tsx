"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// VengeanceUI Mega Menu Navbar (@vengeanceui/mega-menu-navbar), adapted into parts that
// the header composes around the Spotlight Navbar: the dropdown shell, link groups, a
// featured card, a footer row and the mobile accordion. Theme tokens and .glass instead
// of zinc colors, Next <Link>, and closed panels/sections are invisible or inert so they
// never take focus.

export interface MegaMenuLink {
  label: string;
  href: string;
  meta?: string;
  /** Two theme colors for the swatch, e.g. a case study accent */
  accent?: readonly [string, string];
}

export interface MegaMenuGroup {
  title: string;
  href?: string;
  icon?: ReactNode;
  /** Icon color, a theme token */
  accent?: string;
  links: MegaMenuLink[];
}

/**
 * Dropdown shell. Its containing block is the header pill, so it drops centered below the
 * pill rather than below the trigger. pt-2.5 is the hover bridge across the gap.
 */
export function MegaMenuDropdown({ id, open, children }: { id: string; open: boolean; children: ReactNode }) {
  return (
    <div
      id={id}
      data-mega-dropdown=""
      className={cn(
        "absolute left-1/2 top-full -translate-x-1/2 pt-2.5",
        "transition-[opacity,translate,visibility] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none",
        open ? "visible opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0",
      )}
    >
      <div className="glass overflow-hidden rounded-[var(--r-lg)] bg-[color-mix(in_oklab,var(--card)_95%,transparent)] [box-shadow:var(--shadow-lift)]">
        {children}
      </div>
    </div>
  );
}

function GroupHeading({ group }: { group: MegaMenuGroup }) {
  const inner = (
    <>
      {group.icon ? (
        <span
          className="grid size-6 shrink-0 place-items-center rounded-md border border-border bg-muted"
          style={{ color: group.accent }}
        >
          {group.icon}
        </span>
      ) : null}
      {group.title}
    </>
  );
  const cls = "flex items-center gap-2 px-2 py-1 text-[0.8125rem] font-semibold text-fg";
  return group.href ? (
    <Link href={group.href} className={cn(cls, "rounded-lg transition-colors hover:text-violet")}>
      {inner}
    </Link>
  ) : (
    <p className={cls}>{inner}</p>
  );
}

/** A titled list of links: a service pillar, industries, case studies (links with a meta line get a swatch). */
export function MegaMenuGroupList({
  group,
  listClassName,
}: {
  group: MegaMenuGroup;
  listClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <GroupHeading group={group} />
      <ul className={cn("flex flex-col", listClassName)}>
        {group.links.map((link) => (
          <li key={link.href} className="min-w-0">
            {link.meta ? (
              <MegaMenuRichLink link={link} />
            ) : (
              <Link
                href={link.href}
                className="block rounded-lg px-2 py-1.5 text-[0.875rem] leading-snug text-fg-2 transition-colors hover:bg-muted hover:text-fg"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Link with an accent swatch and a meta line: case studies. */
export function MegaMenuRichLink({ link }: { link: MegaMenuLink }) {
  return (
    <Link
      href={link.href}
      className="flex min-w-0 items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
    >
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-lg text-[0.8125rem] font-semibold text-background"
        style={{
          background: link.accent
            ? `linear-gradient(135deg, ${link.accent[0]}, ${link.accent[1]})`
            : undefined,
        }}
      >
        {link.label.charAt(0)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[0.875rem] font-medium text-fg">{link.label}</span>
        {link.meta ? <span className="block truncate text-xs text-fg-3">{link.meta}</span> : null}
      </span>
    </Link>
  );
}

export interface MegaMenuFeatureProps {
  href: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  meta?: string;
  className?: string;
}

/** Featured card in a panel's last column. */
export function MegaMenuFeature({ href, icon, eyebrow, title, body, meta, className }: MegaMenuFeatureProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/feature flex flex-col self-start rounded-[var(--r-md)] border border-border p-4 transition-colors hover:border-violet/50",
        "bg-[linear-gradient(160deg,color-mix(in_oklab,var(--violet)_14%,transparent),transparent_65%)]",
        className,
      )}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--violet),var(--cyan))] text-background">
        {icon}
      </span>
      <span className="t-eyebrow mt-4">{eyebrow}</span>
      <span className="mt-1.5 text-[0.95rem] font-semibold leading-snug text-fg">{title}</span>
      <span className="mt-2 text-[0.8125rem] leading-relaxed text-fg-2">{body}</span>
      <span className="mt-auto flex items-center justify-between gap-3 pt-4 text-[0.8125rem]">
        {meta ? <span className="text-fg-3">{meta}</span> : null}
        <span className="inline-flex items-center gap-1 font-medium text-violet">
          See service
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/feature:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}

/** Bottom row of a panel: one line of context and the overview link. */
export function MegaMenuFooter({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/40 px-6 py-3">
      <p className="t-small text-fg-3">{children}</p>
      <Link
        href={href}
        className="group/all inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-violet"
      >
        {label}
        <ArrowRight className="size-4 transition-transform duration-200 group-hover/all:translate-x-0.5" />
      </Link>
    </div>
  );
}

/** Mobile drawer section. Closed content is inert so it never takes focus. */
export function MobileAccordion({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[1.05rem] text-fg transition-colors hover:bg-muted"
      >
        {title}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 text-fg-3 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <div
        id={id}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 px-2 pb-4 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
