import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { RadialGlowButton } from "@/components/ui/radial-glow-button";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

// min-h, not h: on phones a long label wraps to two lines instead of overflowing the screen
const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 py-1.5 text-sm",
  md: "min-h-11 px-5 py-2 text-[0.95rem]",
  lg: "min-h-13 px-7 py-2.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
};

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;
type AnchorProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    "className" | "children" | "href"
  >;

/**
 * The site button, built on VengeanceUI: RadialGlowButton for primary actions,
 * InteractiveHoverButton (color fill on hover) for everything else. The button
 * itself never moves on hover. One API renders a Link, an <a> (external, mailto, tel) or a <button>.
 */
export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "secondary", size = "md", className, children, icon, ...rest } = props;
  const Comp = variant === "primary" ? RadialGlowButton : InteractiveHoverButton;

  let as: ElementType = "button";
  const extra: Record<string, unknown> = {};
  if ("href" in rest && typeof rest.href === "string") {
    as = /^https?:|^mailto:|^tel:/.test(rest.href) ? "a" : Link;
  } else {
    extra.type = (rest as ButtonProps).type ?? "button";
  }

  return (
    <Comp
      as={as}
      icon={icon}
      className={cn("max-w-full whitespace-normal text-balance sm:whitespace-nowrap", sizes[size], className)}
      {...(rest as Record<string, unknown>)}
      {...extra}
    >
      {children}
    </Comp>
  );
}
