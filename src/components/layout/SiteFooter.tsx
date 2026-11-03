import Link from "next/link";
import { AnimatedFooter } from "@/components/ui/animated-footer";
import { site } from "@/content/site";
import { footerNav } from "./nav";
import { Logo, Wordmark } from "./SiteHeader";

const socials = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Instagram", href: site.social.instagram },
  { label: "GitHub", href: site.social.github },
];

async function Year() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    // Bottom padding clears the fixed MobileDock on phones.
    <footer className="container-x pb-28 pt-24 md:pb-10">
      <div className="surface overflow-hidden">
        <div className="grid gap-10 p-6 sm:p-10 xl:grid-cols-[1.3fr_3fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${site.name} home`}>
              <Logo className="size-8" />
              <Wordmark className="h-[1.42rem]" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="t-body mt-5 block text-fg-2 underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              {site.email}
            </a>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="t-small text-fg-3 transition-colors hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {Object.entries(footerNav).map(([group, links]) => (
              <nav key={group} aria-label={group}>
                <h3 className="t-eyebrow mb-3">{group}</h3>
                <ul className="space-y-2">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="t-small text-fg-2 underline-offset-4 transition-colors hover:text-fg hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <AnimatedFooter heading={site.name} />

        <p className="t-small border-t border-border px-6 py-4 text-fg-3 sm:px-10">
          © <Year /> {site.name}
        </p>
      </div>
    </footer>
  );
}
