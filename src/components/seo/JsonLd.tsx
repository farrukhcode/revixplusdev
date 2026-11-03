import type { Thing, WithContext } from "schema-dts";

/** Renders one or more JSON-LD graphs. Content is ours, so the inline script is safe. */
export function JsonLd({ data }: { data: WithContext<Thing> | WithContext<Thing>[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data from our own typed content
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
          key={`jsonld-${i}`}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
