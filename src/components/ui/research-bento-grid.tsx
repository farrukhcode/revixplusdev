"use client";

import { Check } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { Surface } from "@/components/ui/Surface";
import { cn } from "@/lib/utils";

// VengeanceUI Developer Service Bento (@vengeanceui/research-bento-grid), adapted:
// motion/react, theme tokens and Surface cards, inline simple-icons paths (CC0) for
// tools from our own stack lists, real retainer price and line items as props,
// the pause panel reworked into the two-weeks-notice scaling rule, no grain filter
// or blurred blobs, and every loop stops offscreen and under reduced motion.

interface Tool {
  name: string;
  path: string;
}

// Names come from the `stack` arrays in src/content/work/*.ts and src/content/services/*.ts.
const TOOLS: readonly Tool[] = [
  {
    name: "Next.js",
    path: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z",
  },
  {
    name: "GitHub",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "Docker",
    path: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
  },
  {
    name: "Coolify",
    path: "M4.364 4.364V0h17.454v4.364zm0 13.09H0V4.365h4.364zm0 0h17.454v4.364H4.364ZM6.545 6.546v-1.7H22.3V2.182H24v4.363zm0 0v10.4h-1.7v-10.4ZM3.882 17.936v1.7h-1.7v-1.7ZM24 24H6.545v-1.7H22.3v-2.664H24Z",
  },
  {
    name: "Cloudflare",
    path: "M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727",
  },
  {
    name: "Shopify",
    path: "M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z",
  },
  {
    name: "n8n",
    path: "M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632",
  },
  {
    name: "Claude API",
    path: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
  },
];

const spring = { type: "spring", stiffness: 230, damping: 24 } as const;
const TAP = { x: -3, y: -30, rotate: -1.5 };
const REST = { x: 0, y: 0, rotate: 0 };

function ArrowCursor({
  label,
  inverted = false,
  live,
  active,
  delay = 0,
  className,
}: {
  label: string;
  inverted?: boolean;
  live: boolean;
  active?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute z-30 flex flex-col items-start", className)}
      animate={
        active ? TAP : live && active === undefined ? { x: 0, y: [0, -3, 0], rotate: [0, 1.5, 0] } : REST
      }
      transition={
        active !== undefined
          ? { duration: active ? 0.68 : 0.82, ease: [0.16, 1, 0.3, 1] }
          : live
            ? { duration: 4.6, delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            : { duration: 0.3 }
      }
    >
      <svg viewBox="0 0 26 30" fill="none" aria-hidden="true" className="h-auto w-[18px] sm:w-[22px]">
        <path
          d="M2.2 2.5 22 15.1l-9.4 2.1-4.1 9.1L2.2 2.5Z"
          className={inverted ? "fill-fg stroke-card" : "fill-primary stroke-card"}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "-mt-1 ml-3 whitespace-nowrap rounded-full px-2.5 py-1 font-semibold text-[12px] tracking-tight shadow-[var(--shadow-card)] sm:px-3 sm:text-[13px]",
          inverted ? "bg-fg text-background" : "bg-primary text-primary-foreground",
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Surface as="section" className={cn("overflow-hidden", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--glow),transparent_55%)]"
      />
      {children}
    </Surface>
  );
}

function FeatureCopy({
  title,
  children,
  className,
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-x-0 bottom-0 z-20 px-5 pb-5 sm:px-7 sm:pb-7", className)}>
      <h3 className="t-h4 text-fg">{title}</h3>
      <p className="t-small mt-2 max-w-[38ch] text-fg-2">{children}</p>
    </div>
  );
}

function StackPanel({ live }: { live: boolean }) {
  const [selected, setSelected] = useState(0);
  // A click hands control to the visitor and stops the rotation.
  const [auto, setAuto] = useState(true);
  const cursorId = useId();

  useEffect(() => {
    if (!live || !auto) return;
    const t = setInterval(() => setSelected((s) => (s + 1) % TOOLS.length), 2600);
    return () => clearInterval(t);
  }, [live, auto]);

  return (
    <Panel className="min-h-[380px] sm:min-h-[340px] @min-[840px]:col-span-12 @min-[840px]:min-h-[320px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[78%] bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:36px_36px] bg-center [mask-image:radial-gradient(ellipse_at_50%_20%,black_20%,transparent_75%)]"
      />

      <ul className="absolute inset-x-4 top-6 z-10 mx-auto grid max-w-[780px] grid-cols-4 gap-2 sm:inset-x-7 sm:top-9 sm:grid-cols-8 sm:gap-2.5">
        {TOOLS.map((tool, i) => {
          const on = selected === i;
          return (
            <li key={tool.name} className={cn("relative", on && "z-20")}>
              <motion.button
                type="button"
                onClick={() => {
                  setAuto(false);
                  setSelected(i);
                }}
                aria-pressed={on}
                className={cn(
                  "relative flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-[var(--r-sm)] border bg-muted shadow-[var(--shadow-card)] transition-colors duration-200",
                  on ? "border-violet/50 text-violet" : "border-border text-fg hover:border-border-strong",
                )}
                animate={{ y: on ? -3 : 0, scale: on ? 1.03 : 1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                {on ? (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle,color-mix(in_oklab,var(--violet)_20%,transparent),transparent_70%)]"
                  />
                ) : null}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="relative size-[36%] fill-current">
                  <path d={tool.path} />
                </svg>
                <span
                  className={cn(
                    "relative text-[10px] leading-none sm:text-[11px]",
                    on ? "text-violet" : "text-fg-3",
                  )}
                >
                  {tool.name}
                </span>
              </motion.button>
              {on ? (
                <motion.div layoutId={cursorId} transition={spring} className="absolute top-[76%] left-[66%]">
                  <ArrowCursor label="You" live={live} delay={0.2} className="static" />
                </motion.div>
              ) : null}
            </li>
          );
        })}
      </ul>

      <ArrowCursor
        label="Your developer"
        inverted
        live={live}
        delay={0.9}
        className="top-[50%] left-[54%] sm:top-[54%] sm:left-[62%]"
      />

      <FeatureCopy title="Joins your repo, your Slack and your sprints.">
        A developer matched to your stack works in your tools. A senior lead reviews every pull request before
        your team merges it.
      </FeatureCopy>
    </Panel>
  );
}

function InvoicePanel({
  live,
  monthlyPrice,
  planName,
  lineItems,
}: {
  live: boolean;
  monthlyPrice: number;
  planName: string;
  lineItems: readonly string[];
}) {
  const [month, setMonth] = useState(1);
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(monthlyPrice);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => setMonth((m) => (m % 3) + 1), 3900);
    return () => clearInterval(t);
  }, [live]);

  return (
    <Panel className="min-h-[410px] sm:min-h-[340px] @min-[840px]:col-span-7 @min-[840px]:min-h-[320px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-fg opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle,currentColor .65px,transparent .75px)",
          backgroundSize: "11px 11px",
        }}
      />
      <div className="absolute inset-0 overflow-hidden sm:left-auto sm:w-[54%]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={month}
            className="absolute top-5 left-[8%] w-[84%] overflow-hidden rounded-[var(--r-md)] border border-border-strong bg-muted p-4 shadow-[var(--shadow-lift)] sm:right-5 sm:left-auto sm:w-[90%] sm:p-5"
            initial={{ y: 270, opacity: 0, rotate: -1.25 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 285, opacity: 0, rotate: 1.1 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-3 text-[12px] text-fg-3">
              <span className="truncate">{planName}</span>
              <span className="chip shrink-0 px-2 py-0.5 text-[11px]">Month {month}</span>
            </div>
            <p className="mt-3 flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-[12px] text-fg-3">from</span>
              <span className="text-gradient font-semibold text-[30px] tracking-tight">{price}</span>
              <span className="text-[13px] text-fg-3">per developer</span>
            </p>
            <ul className="mt-4 space-y-2 border-border border-t pt-4">
              {lineItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[12px] text-fg-2">
                  <Check className="size-3.5 shrink-0 text-cyan" aria-hidden="true" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fog above the invoice so the copy stays readable. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[50%] bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--card)_88%,transparent)_55%,var(--card)_85%)]"
      />

      <FeatureCopy className="sm:right-1/2 sm:pr-3" title="Senior hands, one monthly invoice.">
        Lead oversight and code review are part of the monthly rate, billed per developer.
      </FeatureCopy>
    </Panel>
  );
}

const RINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function ScalePanel({ live }: { live: boolean }) {
  const [scaled, setScaled] = useState(false);
  const [lit, setLit] = useState(false);

  // Every few seconds the button lights up and the cursor taps it, as a hint.
  useEffect(() => {
    if (!live) {
      setLit(false);
      return;
    }
    let off: ReturnType<typeof setTimeout> | undefined;
    const pulse = () => {
      setLit(true);
      off = setTimeout(() => setLit(false), 1500);
    };
    const first = setTimeout(pulse, 800);
    const loop = setInterval(pulse, 4400);
    return () => {
      clearTimeout(first);
      if (off) clearTimeout(off);
      clearInterval(loop);
    };
  }, [live]);

  return (
    <Panel className="min-h-[360px] sm:min-h-[340px] @min-[840px]:col-span-5 @min-[840px]:min-h-[320px]">
      <div className="absolute inset-x-0 top-0 flex h-[62%] items-center justify-center">
        {RINGS.map((ring) => (
          <div
            key={ring}
            aria-hidden
            className="absolute border border-border-strong"
            style={{
              width: 190 + ring * 23,
              height: 100 + ring * 16,
              borderRadius: 23 + ring * 3,
              opacity: Math.max(0.12, 0.7 - ring * 0.07),
            }}
          />
        ))}
        <motion.button
          type="button"
          onClick={() => setScaled((s) => !s)}
          aria-pressed={scaled}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.97 }}
          animate={{ scale: lit ? 1.012 : 1 }}
          transition={spring}
          className={cn(
            "relative z-10 flex h-[72px] min-w-[184px] items-center justify-center overflow-hidden rounded-[20px] border bg-card px-7 font-semibold text-[24px] tracking-tight shadow-[var(--shadow-lift)] transition-[border-color,color] duration-500",
            lit ? "border-primary text-primary-foreground" : "border-border-strong text-fg",
          )}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-primary"
            initial={false}
            animate={{ opacity: lit ? 1 : 0 }}
            transition={{ duration: lit ? 0.64 : 0.76, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="relative">{scaled ? "Scale down" : "Scale up"}</span>
        </motion.button>
        <ArrowCursor label="You" live={live} active={lit} delay={0.5} className="top-[70%] left-[57%]" />
      </div>

      <FeatureCopy title="Scale with two weeks notice.">
        {scaled
          ? "Fewer hours, or back to one developer? That change also takes effect with two weeks notice."
          : "Need a second developer or a different skill? Changes take effect with two weeks notice."}
      </FeatureCopy>
    </Panel>
  );
}

export interface ResearchBentoGridProps {
  /** Monthly price per developer in USD, from src/content/pricing.ts */
  monthlyPrice: number;
  planName: string;
  lineItems: readonly string[];
  className?: string;
}

export function ResearchBentoGrid({ monthlyPrice, planName, lineItems, className }: ResearchBentoGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const live = inView && !reduced;

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} className={cn("@container", className)}>
        <div className="grid grid-cols-1 gap-3 @min-[840px]:grid-cols-12">
          <StackPanel live={live} />
          <InvoicePanel live={live} monthlyPrice={monthlyPrice} planName={planName} lineItems={lineItems} />
          <ScalePanel live={live} />
        </div>
      </div>
    </MotionConfig>
  );
}

export default ResearchBentoGrid;
