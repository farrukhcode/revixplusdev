"use client";

import { ArrowRight, ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { Button } from "@/components/ui/Button";
import {
  MegaMenuFeature,
  type MegaMenuFeatureProps,
  MegaMenuFooter,
  type MegaMenuGroup,
  MegaMenuGroupList,
  type MegaMenuLink,
  MobileAccordion,
} from "@/components/ui/mega-menu-navbar";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { primaryNav } from "./nav";
import { ThemeToggle } from "./ThemeToggle";

export interface HeaderMenus {
  services: MegaMenuGroup[];
  feature?: Omit<MegaMenuFeatureProps, "className">;
  work: MegaMenuLink[];
  industries: MegaMenuLink[];
}

/** Puts each pillar in the shortest column so the three columns end at about the same height. */
function balance(groups: MegaMenuGroup[], count: number) {
  const columns: MegaMenuGroup[][] = Array.from({ length: count }, () => []);
  const height = (c: MegaMenuGroup[]) => c.reduce((n, g) => n + g.links.length + 2, 0);
  for (const g of groups) columns.reduce((a, b) => (height(b) < height(a) ? b : a)).push(g);
  return columns;
}

function ServicesPanel({ menus }: { menus: HeaderMenus }) {
  return (
    <div className="w-[min(62rem,calc(100vw-1.5rem))]">
      <div className="grid gap-x-4 gap-y-6 p-4 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_15rem]">
        {balance(menus.services, 3).map((column) => (
          <div key={column[0]?.title} className="flex flex-col gap-5">
            {column.map((group) => (
              <MegaMenuGroupList key={group.title} group={group} />
            ))}
          </div>
        ))}
        {menus.feature ? <MegaMenuFeature {...menus.feature} className="hidden lg:flex" /> : null}
      </div>
      <MegaMenuFooter href="/services" label="All services">
        Six pillars, thirty-one services, no hand-offs between agencies.
      </MegaMenuFooter>
    </div>
  );
}

function WorkPanel({ menus }: { menus: HeaderMenus }) {
  return (
    <div className="w-[min(52rem,calc(100vw-1.5rem))]">
      <div className="grid gap-x-4 gap-y-6 p-4 md:grid-cols-[1.75fr_1fr]">
        <MegaMenuGroupList
          group={{ title: "Featured work", href: "/work", links: menus.work }}
          listClassName="grid grid-cols-2 gap-0.5"
        />
        <div className="md:border-l md:border-border md:pl-4">
          <MegaMenuGroupList group={{ title: "Industries", links: menus.industries }} />
        </div>
      </div>
      <MegaMenuFooter href="/work" label="All work">
        Proof, not promises.
      </MegaMenuFooter>
    </div>
  );
}

/**
 * Floating pill. It minimizes while scrolling down and expands again on
 * scroll up or as soon as the pointer reaches it, so chrome never fights the story.
 * Services and Work open mega menu panels; on phones a drawer with accordion sections.
 */
export function HeaderBar({ menus }: { menus: HeaderMenus }) {
  const lenis = useLenis();
  const pathname = usePathname();
  const [minimized, setMinimized] = useState(false);
  // Pointer or keyboard focus on the pill expands it even while scrolled down
  const [peek, setPeek] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<"services" | "work" | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);

  // State persists across navigations in Next 16, so close the drawer on route change.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!lenis) return;
    const onScroll = ({ scroll, velocity }: { scroll: number; velocity: number }) => {
      const goingDown = velocity > 0.5 && scroll > lastY.current;
      const goingUp = velocity < -0.5;
      if (scroll < 80) setMinimized(false);
      else if (goingDown) setMinimized(true);
      else if (goingUp) setMinimized(false);
      lastY.current = scroll;
    };
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  // Drawer: Escape, a tap outside, or any link inside (same-page links too) closes it.
  useEffect(() => {
    const panel = drawer.current;
    if (!open || !panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.contains(t) && !menuButton.current?.contains(t)) setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a")) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    panel.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      panel.removeEventListener("click", onClick);
    };
  }, [open]);

  const panels = { services: <ServicesPanel menus={menus} />, work: <WorkPanel menus={menus} /> };
  const items = primaryNav.map((item) => ({
    ...item,
    panel: "menu" in item ? panels[item.menu] : undefined,
  }));
  const toggleSection = (s: "services" | "work") => setSection((cur) => (cur === s ? null : s));
  const collapsed = minimized && !open && !peek;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
        {/* The pill is the dropdowns' containing block. Its glass is a separate layer so the
            panels' own backdrop blur sees the page, not a nested backdrop root. */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: hover only previews the expanded pill; keyboard gets the same via focus */}
        <div
          onPointerEnter={(e) => e.pointerType === "mouse" && setPeek(true)}
          onPointerLeave={() => setPeek(false)}
          onFocus={() => setPeek(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPeek(false)}
          className={cn(
            "pointer-events-auto relative isolate flex items-center gap-1 pl-4 pr-1.5 [border-radius:var(--r-pill)]",
            "transition-[scale,opacity,height] duration-300 ease-[var(--ease-out)]",
            collapsed ? "h-11 scale-[0.96] opacity-90" : "h-12",
          )}
        >
          <span aria-hidden="true" className="glass absolute inset-0 -z-10 rounded-[inherit]" />
          <Link href="/" className="flex items-center gap-2 pr-2" aria-label={`${site.name} home`}>
            <Logo />
            <Wordmark className="hidden sm:block md:hidden lg:block" />
          </Link>

          <div
            className={cn(
              "hidden md:block",
              "transition-[max-width,opacity,visibility] duration-300 ease-[var(--ease-out)]",
              collapsed ? "invisible max-w-0 overflow-hidden opacity-0" : "max-w-[640px] opacity-100",
            )}
          >
            <SpotlightNavbar items={items} collapsed={collapsed} />
          </div>

          <div className="ml-1 flex items-center gap-1.5">
            <ThemeToggle />
            <Button href="/contact" variant="primary" size="sm" icon={<ArrowUpRight className="size-4" />}>
              Start a project
            </Button>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full text-fg-2 transition-colors hover:bg-muted hover:text-fg md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: a scrim, then the glass sheet with accordion sections */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[45] bg-background/60 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <nav
        ref={drawer}
        id="mobile-menu"
        aria-label="Mobile"
        inert={!open}
        data-lenis-prevent
        className={cn(
          "glass fixed inset-x-3 top-[4.25rem] z-[45] flex max-h-[calc(100dvh-5.5rem)] flex-col gap-0.5 overflow-y-auto overscroll-contain rounded-[var(--r-lg)] p-2 md:hidden",
          "transition-[translate,opacity] duration-[320ms] ease-[var(--ease-drawer)] motion-reduce:transition-none",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <MobileAccordion
          id="mobile-services"
          title="Services"
          open={section === "services"}
          onToggle={() => toggleSection("services")}
        >
          {menus.services.map((group) => (
            <MegaMenuGroupList key={group.title} group={group} listClassName="grid grid-cols-2 gap-x-1" />
          ))}
          <AllLink href="/services">All services</AllLink>
        </MobileAccordion>
        <MobileAccordion
          id="mobile-work"
          title="Work"
          open={section === "work"}
          onToggle={() => toggleSection("work")}
        >
          <MegaMenuGroupList group={{ title: "Featured work", href: "/work", links: menus.work }} />
          <MegaMenuGroupList
            group={{ title: "Industries", links: menus.industries }}
            listClassName="grid grid-cols-2 gap-x-1"
          />
          <AllLink href="/work">All work</AllLink>
        </MobileAccordion>
        {primaryNav
          .filter((item) => !("menu" in item))
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-3 text-[1.05rem] text-fg transition-colors hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        <div className="mt-1 border-t border-border px-2 pb-1 pt-3">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-2 py-1.5 text-[0.9375rem] text-fg-2 transition-colors hover:text-fg"
          >
            <MessageCircle className="size-[1.125rem] text-orange" aria-hidden="true" />
            WhatsApp us
          </a>
        </div>
      </nav>
    </>
  );
}

function AllLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 self-start rounded-lg px-2 py-1.5 text-sm font-medium text-violet"
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

/**
 * The symbol: an R built from four modules; the gutter between them is the Plus.
 * Revix Violet (--primary: #5B34F0 on light, #7050FF on dark). Master art and the
 * full kit live in public/brand/; usage rules in docs/BRAND.md.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="28 28 200 200" className={cn("size-6", className)} aria-hidden="true">
      <path
        fill="var(--primary)"
        d="M28 28H108V116H28Z M28 140H108V228H28Z M132 28H180A44 44 0 0 1 180 116H132Z M132 140H184L228 228H176Z"
      />
    </svg>
  );
}

/** "RevixPlus" in outlined Geist SemiBold with custom spacing. Height ≈ 0.71 × the symbol in a lockup. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="28 57 885 143" className={cn("h-[1.0625rem] w-auto", className)} aria-hidden="true">
      <path
        fill="currentColor"
        d="M28 197V59H85.7Q100.7 59 111.5 64.1Q122.4 69.1 128.4 78.5Q134.5 87.8 134.5 100.4Q134.5 112.8 127.6 121.5Q120.7 130.1 110.6 133.2Q130.4 136.2 132.1 157.1L135.6 197H110L107.1 160.8Q106.5 152.5 101.8 148.7Q97.2 144.9 86.3 144.9H53.3V197ZM53.3 122.8H84.1Q95.4 122.8 101.9 117.4Q108.4 112.1 108.4 102Q108.4 91.9 101.8 86.4Q95.2 81 83 81H53.3ZM199 199.3Q183.4 199.3 172 192.6Q160.5 185.9 154.3 173.7Q148.1 161.4 148.1 145.1Q148.1 128.8 154.3 116.5Q160.5 104.3 171.9 97.6Q183.2 90.9 198.4 90.9Q213.1 90.9 224.2 97.5Q235.3 104.1 241.4 116.5Q247.5 129 247.5 146.5V152.1H173.9Q174.5 165.7 181.3 172.6Q188.1 179.5 199.2 179.5Q216.1 179.5 220.7 165.1L246.2 166.7Q241.9 181.8 229.4 190.6Q216.8 199.3 199 199.3ZM173.9 135.4H221.9Q220.9 122.8 214.6 116.6Q208.3 110.5 198.4 110.5Q188.3 110.5 181.9 116.9Q175.5 123.3 173.9 135.4ZM293.4 197 255.5 93.2H281.7L308.1 171.9L334.6 93.2H360.8L322.9 197ZM374.6 197V93.2H399.4V197ZM374.2 79.4V57.3H400V79.4ZM418.3 197 455.6 144.1 419.6 93.2H446.6L470.4 128.6L493.7 93.2H521.1L485.3 144.3L522.4 197H495.4L470.7 159.7L445.9 197ZM540.3 197V59H593.7Q617.8 59 631.5 70.7Q645.2 82.3 645.2 102.9Q645.2 123.7 631.5 135.5Q617.8 147.2 593.7 147.2H565.5V197ZM565.5 125.3H592.5Q605.4 125.3 612.3 119.6Q619.2 114 619.2 102.9Q619.2 92.1 612.3 86.5Q605.4 81 592.5 81H565.5ZM685.2 197Q673.8 197 667 191.1Q660.3 185.3 660.3 172.5V59H685.2V170Q685.2 177.7 693 177.7H700.6V197ZM748.3 199.3Q732.4 199.3 723.3 189Q714.2 178.7 714.2 160.1V93.2H739V153.8Q739 167 743.4 173.1Q747.8 179.1 756.7 179.1Q766.6 179.1 772.2 172.4Q777.9 165.7 777.9 152.9V93.2H802.7V197H780L779.6 180.1Q771.5 199.3 748.3 199.3ZM868.4 199.3Q844.7 199.3 833.1 189.4Q821.4 179.5 820.2 164.3L845.7 163.2Q847 171.3 852.2 175.8Q857.3 180.3 868.6 180.3Q877.3 180.3 881.9 177.4Q886.5 174.6 886.5 168.6Q886.5 165.1 884.8 162.8Q883.2 160.4 878.4 158.7Q873.7 156.9 864.5 155.2Q848.8 152.5 839.9 148.5Q830.9 144.5 827.3 138.5Q823.7 132.5 823.7 123.5Q823.7 109.2 834.9 100Q846.1 90.9 867.6 90.9Q882.6 90.9 892.2 95.7Q901.8 100.4 906.8 108.3Q911.7 116.1 912.5 125.9L887.3 127Q886.9 119.6 882.2 114.8Q877.5 109.9 867.2 109.9Q858.5 109.9 853.9 113.4Q849.4 116.9 849.4 122.8Q849.4 129 853.7 132Q858.1 135 869.8 136.9Q885.7 139.3 895 143.3Q904.3 147.4 908.3 153.5Q912.3 159.7 912.3 168.2Q912.3 183.2 900.4 191.2Q888.4 199.3 868.4 199.3Z"
      />
    </svg>
  );
}
