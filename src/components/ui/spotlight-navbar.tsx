"use client";

import { ChevronDown } from "lucide-react";
import { animate } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { MegaMenuDropdown } from "@/components/ui/mega-menu-navbar";
import { cn } from "@/lib/utils";

// VengeanceUI Spotlight Navbar (@vengeanceui/spotlight-navbar), adapted:
// Next <Link> + active item from the pathname, theme tokens instead of the
// .dark observer and styled-jsx, and no React state update per mousemove.
// Items with a `panel` are disclosure buttons for a mega menu dropdown: mouse hover opens,
// Enter/Space toggles, Tab walks into the open panel, Escape closes. The glows sit in the
// bar's grid cell and fade out before its ends, so they never reach the pill's rounded edge.
export interface NavItem {
  label: string;
  href: string;
  panel?: ReactNode;
}

export interface SpotlightNavbarProps {
  items: readonly NavItem[];
  /** Forces dropdowns closed, e.g. while the header is minimized */
  collapsed?: boolean;
  className?: string;
}

const glowMask =
  "[mask-image:linear-gradient(90deg,transparent,black_2rem,black_calc(100%-2rem),transparent)]";

export function SpotlightNavbar({ items, collapsed = false, className }: SpotlightNavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const activeIndex = items.findIndex((i) => pathname === i.href || pathname.startsWith(`${i.href}/`));
  const [hovering, setHovering] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pointerType = useRef("");
  const id = useId();

  // Close on route change and when the header collapses.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenIndex(null);
  }
  if (collapsed && openIndex !== null) setOpenIndex(null);

  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const centerOf = (index: number) => {
      const item = nav.querySelector(`[data-index="${index}"]`);
      if (!item) return null;
      const navRect = nav.getBoundingClientRect();
      const r = item.getBoundingClientRect();
      return r.left - navRect.left + r.width / 2;
    };

    const onMove = (e: MouseEvent) => {
      // Inside an open panel the spotlight stays on its trigger.
      if ((e.target as Element).closest("[data-mega-dropdown]")) return;
      const x = e.clientX - nav.getBoundingClientRect().left;
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };
    const onEnter = () => setHovering(true);
    const onLeave = () => {
      setHovering(false);
      const target = centerOf(activeIndex);
      if (target === null) return;
      animate(spotlightX.current, target, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          spotlightX.current = v;
          nav.style.setProperty("--spotlight-x", `${v}px`);
        },
      });
    };

    nav.addEventListener("mousemove", onMove);
    nav.addEventListener("mouseenter", onEnter);
    nav.addEventListener("mouseleave", onLeave);
    return () => {
      nav.removeEventListener("mousemove", onMove);
      nav.removeEventListener("mouseenter", onEnter);
      nav.removeEventListener("mouseleave", onLeave);
    };
  }, [activeIndex]);

  // The active-item glow springs to the current page's link.
  useEffect(() => {
    const nav = navRef.current;
    const item = nav?.querySelector(`[data-index="${activeIndex}"]`);
    if (!nav || !item) return;
    const navRect = nav.getBoundingClientRect();
    const r = item.getBoundingClientRect();
    const controls = animate(ambienceX.current, r.left - navRect.left + r.width / 2, {
      type: "spring",
      stiffness: 200,
      damping: 20,
      onUpdate: (v) => {
        ambienceX.current = v;
        nav.style.setProperty("--ambience-x", `${v}px`);
      },
    });
    return () => controls.stop();
  }, [activeIndex]);

  // While a panel is open: Escape closes it (focus goes back to its trigger), and so do a
  // pointer down outside the nav and a click on any link inside the panel.
  useEffect(() => {
    const nav = navRef.current;
    if (openIndex === null || !nav) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (nav.contains(document.activeElement)) {
        nav.querySelector<HTMLElement>(`[data-index="${openIndex}"]`)?.focus();
      }
      setOpenIndex(null);
    };
    const onDown = (e: PointerEvent) => {
      if (!nav.contains(e.target as Node)) setOpenIndex(null);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("[data-mega-dropdown] a")) setOpenIndex(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    nav.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      nav.removeEventListener("click", onClick);
    };
  }, [openIndex]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Hover is for mice only; a touch tap goes through the click toggle instead.
  const hoverTo = (index: number | null) => (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    setOpenIndex(index);
  };
  const leave = (index: number) => (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setOpenIndex((o) => (o === index ? null : o)), 150);
  };

  const itemClass = "rounded-full py-2 text-[0.9rem] font-medium transition-colors duration-200";

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={cn(
        "grid h-10",
        "[--spotlight-color:color-mix(in_oklab,var(--foreground)_10%,transparent)] [--ambience-color:var(--violet)]",
        className,
      )}
    >
      {/* Moving spotlight, follows the mouse */}
      <div
        aria-hidden="true"
        className={cn("pointer-events-none transition-opacity duration-300 [grid-area:1/1]", glowMask)}
        style={{
          opacity: hovering ? 1 : 0,
          background:
            "radial-gradient(120px circle at var(--spotlight-x) 100%, var(--spotlight-color) 0%, transparent 50%)",
        }}
      />

      {/* Active page glow along the bottom edge */}
      <div
        aria-hidden="true"
        className={cn("pointer-events-none h-[2px] self-end [grid-area:1/1]", glowMask)}
        style={{
          opacity: activeIndex >= 0 ? 1 : 0,
          background:
            "radial-gradient(60px circle at var(--ambience-x) 0%, var(--ambience-color) 0%, transparent 100%)",
        }}
      />

      {/* Not positioned on purpose: dropdowns position against the header pill */}
      <ul className="z-10 flex h-full items-center px-2 [grid-area:1/1]">
        {items.map((item, idx) => {
          const active = activeIndex === idx;
          if (!item.panel) {
            return (
              <li key={item.href} className="flex h-full items-center" onPointerEnter={hoverTo(null)}>
                <Link
                  href={item.href}
                  data-index={idx}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    itemClass,
                    "px-3.5",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          }
          const open = openIndex === idx;
          const panelId = `${id}-panel-${idx}`;
          return (
            <li
              key={item.href}
              className="flex h-full items-center"
              onPointerEnter={hoverTo(idx)}
              onPointerLeave={leave(idx)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setOpenIndex((o) => (o === idx ? null : o));
                }
              }}
            >
              <button
                type="button"
                data-index={idx}
                aria-expanded={open}
                aria-controls={panelId}
                onPointerDown={(e) => {
                  pointerType.current = e.pointerType;
                }}
                onClick={() => {
                  // A mouse already opened it on hover, so its click keeps it open; keyboard and touch toggle.
                  const mouse = pointerType.current === "mouse";
                  pointerType.current = "";
                  setOpenIndex((o) => (o === idx && !mouse ? null : idx));
                }}
                className={cn(
                  itemClass,
                  "inline-flex items-center gap-1 pl-3.5 pr-2.5",
                  active || open ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-3.5 opacity-60 transition-transform duration-200",
                    open && "rotate-180",
                  )}
                />
              </button>
              <MegaMenuDropdown id={panelId} open={open}>
                {item.panel}
              </MegaMenuDropdown>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
