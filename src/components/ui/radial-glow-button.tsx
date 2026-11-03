import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// VengeanceUI Radial Glow Button (@vengeanceui/radial-glow-button), adapted: the
// styles moved to globals.css (one copy instead of a <style> per instance), the
// gradient stops are theme tokens (--glow-*), and it is polymorphic like the
// other buttons so it can render a Link or an <a>.
export type RadialGlowButtonProps = ComponentPropsWithoutRef<"button"> & {
  as?: ElementType;
  href?: string;
  target?: string;
  rel?: string;
  icon?: ReactNode;
};

export function RadialGlowButton({
  as: Comp = "button",
  children,
  className,
  icon,
  ...props
}: RadialGlowButtonProps) {
  return (
    <Comp className={cn("rg-button", className)} {...props}>
      <span className="rg-shine" aria-hidden="true">
        <span />
      </span>
      <span className="rg-bg" aria-hidden="true" />
      <span className="rg-label">
        {children}
        {icon ? <span className="rg-icon">{icon}</span> : null}
      </span>
    </Comp>
  );
}

export default RadialGlowButton;
