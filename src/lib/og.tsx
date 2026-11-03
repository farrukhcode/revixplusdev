import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read at module scope: with cacheComponents, file reads inside the handler count as request-time
// I/O and the card would not be prerendered. Every card is prerendered by `next build`; the
// standalone server only imports this for an unknown slug (404, never rendered), and its trace keeps
// the fonts under node_modules/.pnpm, not at this path. So a failed read is kept, not thrown, and
// only surfaces if something actually renders.
const root = process.cwd();
const fonts = join(root, "node_modules/geist/dist/fonts/geist-sans");
const assets = await Promise.all([
  readFile(join(fonts, "Geist-SemiBold.ttf")).then(noKerning),
  readFile(join(fonts, "Geist-Regular.ttf")).then(noKerning),
  readFile(join(root, "public/brand/revixplus-horizontal-reversed.svg"), "base64"),
]).catch((error: Error) => error);

// ponytail: satori's opentype.js misreads Geist's GPOS pair kerning and opens uneven gaps between
// words. Renaming the table tag hides it: text renders unkerned but evenly spaced. Drop this once
// next/og handles Geist's GPOS.
function noKerning(font: Buffer) {
  font.write("XPOS", font.indexOf("GPOS"), "latin1");
  return font;
}

/** Cut at a word boundary so the line clamp rarely has to cut mid-word. */
const trim = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max)).replace(/[,.;:]$/, "")}…`;

const glow = (id: string, color: string, opacity: number) =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${opacity}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;

// Glows, a grid that fades out from the top right, and orbit lines with data nodes (the mark's dot).
const backdrop = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
${glow("v", "#7050ff", 0.55)}${glow("c", "#22e1f0", 0.32)}${glow("p", "#ff4fb0", 0.22)}
<pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity=".07"/></pattern>
<radialGradient id="f" cx=".78" cy=".2" r=".75"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<mask id="m"><rect width="1200" height="630" fill="url(#f)"/></mask>
</defs>
<rect width="1200" height="630" fill="#0a0a12"/>
<circle cx="1010" cy="90" r="560" fill="url(#v)"/>
<circle cx="60" cy="660" r="480" fill="url(#c)"/>
<circle cx="1160" cy="640" r="340" fill="url(#p)"/>
<rect width="1200" height="630" fill="url(#g)" mask="url(#m)"/>
<g transform="rotate(-18 980 150)" fill="none" stroke="#fff">
<ellipse cx="980" cy="150" rx="170" ry="64" stroke-opacity=".16"/>
<ellipse cx="980" cy="150" rx="300" ry="116" stroke-opacity=".11"/>
<ellipse cx="980" cy="150" rx="440" ry="172" stroke-opacity=".07"/>
</g>
<g transform="rotate(-18 980 150)">
<circle cx="1150" cy="150" r="5" fill="#22e1f0"/><circle cx="1150" cy="150" r="14" fill="#22e1f0" fill-opacity=".18"/>
<circle cx="830" cy="-12" r="4" fill="#a78bfa"/>
<circle cx="1100" cy="315" r="4" fill="#ff4fb0" fill-opacity=".8"/>
</g>
</svg>`;
const backdropSrc = `data:image/svg+xml;base64,${Buffer.from(backdrop).toString("base64")}`;

interface OgCard {
  /** Short label above the title, e.g. "Service" or "Case study · Fintech" */
  eyebrow: string;
  title: string;
  description?: string;
}

/** The 1200x630 card every opengraph-image route renders. */
export function ogImage({ eyebrow, title, description }: OgCard) {
  if (assets instanceof Error) throw assets;
  const [semiBold, regular, mark] = assets;
  // Long titles step down a size; anything past three lines is clamped with an ellipsis.
  const titleSize = title.length > 52 ? 58 : title.length > 34 ? 66 : 76;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 72px 52px",
        background: "#0a0a12",
        color: "#f1f1f7",
        fontFamily: "Geist",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain <img> */}
      <img
        src={backdropSrc}
        width={1200}
        height={630}
        alt=""
        style={{ position: "absolute", top: 0, left: 0 }}
      />

      {/* The reversed horizontal lockup (1205 x 256), so the brand type is exact */}
      <div style={{ display: "flex" }}>
        {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain <img> */}
        <img src={`data:image/svg+xml;base64,${mark}`} width={264} height={56} alt="" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1040 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 4,
              background: "linear-gradient(90deg, #22e1f0, #7050ff, #ff4fb0)",
            }}
          />
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8ef0f8",
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div
          style={{
            display: "block",
            lineClamp: 3,
            fontSize: titleSize,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: -titleSize * 0.03,
            color: "#ffffff",
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: "block",
              lineClamp: 2,
              marginTop: 22,
              fontSize: 27,
              lineHeight: 1.4,
              color: "rgba(241, 241, 247, 0.68)",
              maxWidth: 980,
            }}
          >
            {trim(description, 130)}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          color: "rgba(241, 241, 247, 0.55)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#22e1f0" }} />
          <div style={{ color: "#f1f1f7" }}>revixplus.com</div>
        </div>
        <div>Software · AI · Growth</div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: semiBold, weight: 600, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
