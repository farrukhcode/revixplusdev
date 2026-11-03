import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Surface } from "@/components/ui/Surface";
import { legal } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

type LegalKey = keyof typeof legal;
const keys = Object.keys(legal) as LegalKey[];

// Every slug is prerendered from local content (generateStaticParams), so awaiting params
// never waits on data; opt out of the instant-shell check rather than add a fallback nobody sees.
export const instant = false;

export async function generateStaticParams() {
  return keys.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = legal[slug as LegalKey];
  if (!doc) return {};
  return pageMetadata({
    title: doc.title,
    description: `${doc.title} for RevixPlus.`,
    path: `/legal/${slug}`,
    noIndex: true,
  });
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = legal[slug as LegalKey];
  if (!doc) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={doc.title}
        lead={`Last updated ${doc.updated}.`}
        crumbs={[{ name: doc.title, path: `/legal/${slug}` }]}
      />
      <div className="container-x pb-16">
        <Surface className="mx-auto max-w-3xl p-6 sm:p-10">
          {doc.sections.map((s) => (
            <section key={s.heading} className="mb-8 last:mb-0">
              <h2 className="t-h4">{s.heading}</h2>
              <p className="t-body mt-2 text-fg-2">{s.body}</p>
            </section>
          ))}
        </Surface>
      </div>
    </>
  );
}
