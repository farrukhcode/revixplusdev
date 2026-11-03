"use client";

import { ChevronRight, Hammer, type LucideIcon, PenTool, Rocket, Search, TrendingUp } from "lucide-react";
import { MotionConfig, motion, useInView } from "motion/react";
import Image from "next/image";
import { Fragment, useRef } from "react";
import { Surface } from "@/components/ui/Surface";
import StatsCounter from "@/components/ui/stats-counter";
import { IsometricBox } from "@/components/ui/why-us-bento/isometric-box";
import { IsometricBoxes } from "@/components/ui/why-us-bento/isometric-boxes";
import { home } from "@/content/home";
import { processSteps } from "@/content/process";
import { site } from "@/content/site";
import { liveTeam as members } from "@/content/team";
import { cn, initials } from "@/lib/utils";

// VengeanceUI Why Us Bento (GitHub source, not in the registry), adapted:
// RevixPlus content from src/content, Surface cards and theme tokens instead of
// neutral/white/black, motion/react, lucide icons, team initials instead of
// avatar photos, the stats folded into the tall panel, and the pipeline ping
// paused offscreen. Reduced motion skips the hover motion (MotionConfig "user").

const STEP_ICONS: LucideIcon[] = [Search, PenTool, Hammer, Rocket, TrendingUp];
const AVATAR_TINTS = [
  "bg-violet/15 text-violet",
  "bg-cyan/15 text-cyan",
  "bg-pink/15 text-pink",
  "bg-lime/15 text-lime",
];
const ROLL_TITLE = home.ai.eyebrow;
const EASE = [0.33, 1, 0.68, 1] as const;

const panel = "relative flex flex-col p-6 sm:p-7 min-h-[200px]";
const title = "t-h4 text-fg";
const body = "t-small mt-2 text-fg-2";

function Watermark({ n, className }: { n: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      <span
        className={cn(
          "absolute -right-4 -bottom-10 select-none text-[8rem] font-bold leading-none text-muted transition-transform duration-700 motion-safe:group-hover:scale-105 sm:text-[10rem]",
          className,
        )}
      >
        {n}
      </span>
    </div>
  );
}

export function WhyUsBento({ className }: { className?: string }) {
  const pipeline = useRef<HTMLDivElement>(null);
  const pipelineInView = useInView(pipeline);

  return (
    <MotionConfig reducedMotion="user">
      <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
        {/* 01: AI, integrated (wide) */}
        <Surface
          as={motion.div}
          initial="initial"
          whileHover="hover"
          className={cn(panel, "group justify-center md:col-span-2")}
        >
          <Watermark n="01" />
          <IsometricBox className="pointer-events-none absolute top-1/2 right-4 hidden w-44 -translate-y-1/2 sm:block md:w-52 lg:right-6 xl:right-8 xl:w-64" />
          <div className="relative sm:w-3/5">
            <h3 className={cn(title, "relative flex overflow-hidden")}>
              <span className="sr-only">{ROLL_TITLE}</span>
              <span aria-hidden="true" className="flex">
                {ROLL_TITLE.split("").map((l, i) => (
                  <motion.span
                    // biome-ignore lint/suspicious/noArrayIndexKey: letters repeat
                    key={i}
                    className="inline-block"
                    variants={{ initial: { y: 0 }, hover: { y: "-100%" } }}
                    transition={{ duration: 0.3, delay: i * 0.02, ease: EASE }}
                  >
                    {l === " " ? " " : l}
                  </motion.span>
                ))}
              </span>
              <span aria-hidden="true" className="absolute inset-0 flex text-violet">
                {ROLL_TITLE.split("").map((l, i) => (
                  <motion.span
                    // biome-ignore lint/suspicious/noArrayIndexKey: letters repeat
                    key={i}
                    className="inline-block"
                    variants={{ initial: { y: "100%" }, hover: { y: 0 } }}
                    transition={{ duration: 0.3, delay: i * 0.02, ease: EASE }}
                  >
                    {l === " " ? " " : l}
                  </motion.span>
                ))}
              </span>
            </h3>
            <p className={body}>{home.ai.body}</p>
          </div>
        </Surface>

        {/* 02: The numbers (tall, brand fill) */}
        <Surface
          className={cn(
            panel,
            "group justify-between gap-8 border-transparent text-primary-foreground md:col-span-2 lg:col-span-1 lg:row-span-2",
            "bg-[linear-gradient(160deg,var(--primary),color-mix(in_oklab,var(--primary)_70%,var(--blue)))]",
          )}
        >
          <Watermark n="02" className="text-primary-foreground/10" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(to_right,color-mix(in_oklab,var(--primary-foreground)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--primary-foreground)_7%,transparent)_1px,transparent_1px)] bg-size-[28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
          />
          <p className="relative text-xs font-semibold tracking-[0.14em] uppercase text-primary-foreground/80">
            {home.numbers.eyebrow}
          </p>
          <dl className="relative grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 lg:grid-cols-2">
            {site.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end">
                <dt className="t-small mt-1 text-primary-foreground/80">{s.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight lg:text-5xl">
                  {/* block: the counter's -100px inView margin also insets the sides, so a narrow
                      left-aligned span near the phone edge would never start counting */}
                  <StatsCounter value={s.value} suffix={s.suffix} className="block" />
                </dd>
              </div>
            ))}
          </dl>
          <h3 className="t-h4 relative">{home.numbers.headline}</h3>
        </Surface>

        {/* 03: Senior team */}
        <Surface
          as={motion.div}
          initial="initial"
          whileHover="hover"
          className={cn(panel, "group justify-between")}
        >
          <Watermark n="03" />
          <ul className="relative mb-6 flex h-10 items-center" aria-label="The team">
            {members.map((m, i) => (
              <motion.li
                key={m.name}
                title={`${m.name}, ${m.role}`}
                className={cn(
                  "grid size-10 place-items-center overflow-hidden rounded-full text-sm font-semibold ring-4 ring-card",
                  AVATAR_TINTS[i % AVATAR_TINTS.length],
                  i > 0 && "-ml-1.5",
                )}
                style={{ zIndex: members.length - i }}
                variants={{
                  initial: { x: 0, y: 0, rotate: 0 },
                  hover: { x: i * 12, y: i % 2 === 0 ? -4 : 4, rotate: (i - 1.5) * 6 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {m.photo ? (
                  <Image src={m.photo} alt="" width={40} height={40} className="size-full object-cover" />
                ) : (
                  <span aria-hidden="true">{initials(m.name)}</span>
                )}
                <span className="sr-only">
                  {m.name}, {m.role}
                </span>
              </motion.li>
            ))}
          </ul>
          <div className="relative">
            <h3 className={title}>Senior hands on every project</h3>
            <p className={body}>
              The person who scopes your project builds it, reviews every pull request and answers your
              messages.
            </p>
          </div>
        </Surface>

        {/* 04: No hand-offs (process pipeline) */}
        <Surface className={cn(panel, "group justify-between")}>
          <Watermark n="04" />
          <div ref={pipeline} className="relative mb-6 flex max-w-sm items-start justify-between">
            {processSteps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Rocket;
              const last = i === processSteps.length - 1;
              return (
                <Fragment key={step.step}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="relative grid size-9 place-items-center rounded-full bg-muted text-fg">
                      <Icon className="size-4" aria-hidden="true" />
                      {last && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-0 rounded-full bg-violet/25",
                            pipelineInView && "motion-safe:animate-ping",
                          )}
                        />
                      )}
                    </div>
                    <span className="font-mono text-[9px] font-semibold tracking-wide text-fg-2 uppercase xl:text-[10px] xl:tracking-wider">
                      {step.title}
                    </span>
                  </div>
                  {!last && (
                    <ChevronRight
                      aria-hidden="true"
                      className="mt-3 size-3 shrink-0 text-border-strong xl:mt-2.5 xl:size-4 transition-colors duration-300 group-hover:text-violet"
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
          <div className="relative">
            <h3 className={title}>No hand-offs</h3>
            <p className={body}>{processSteps[processSteps.length - 1]?.promise}</p>
          </div>
        </Surface>

        {/* 05: Every discipline (wide bottom) */}
        <Surface className={cn(panel, "group justify-center md:col-span-2 lg:col-span-3 lg:min-h-[228px]")}>
          <Watermark n="05" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          >
            <IsometricBoxes className="absolute right-4 -bottom-1 hidden w-60 sm:block md:right-10 md:w-72 lg:w-96 xl:right-20" />
          </div>
          <div className="relative sm:w-1/2">
            <h3 className={title}>Every discipline at one table</h3>
            <p className={cn(body, "max-w-xl")}>{home.services.body}</p>
          </div>
        </Surface>
      </div>
    </MotionConfig>
  );
}

export default WhyUsBento;
