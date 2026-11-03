# RevixPlus — Logo Guidelines

## 1. The logo

- **Idea**: an R built from four modules; the gutter between them is the Plus. One team, every discipline: four parts make one letter.
- **Versions**: horizontal (primary) · stacked · symbol only · wordmark only.
- **Files** (all in `public/brand/`, served at `revixplus.com/brand/...`):

| File | Use |
|---|---|
| `revixplus-horizontal.svg` / `.png` | Primary logo on light backgrounds |
| `revixplus-horizontal-reversed.svg` / `.png` | Primary logo on dark backgrounds |
| `revixplus-horizontal-black.svg`, `-white.svg` | One-colour (fax, stamps, single-colour print, on photos) |
| `revixplus-stacked.svg` | Square formats, posters |
| `revixplus-symbol.svg` | Symbol in colour |
| `revixplus-symbol-black.svg`, `-white.svg` | One-colour symbol |
| `revixplus-app-icon.svg`, `revixplus-logo-512.png` | Avatars, app icon, structured-data logo |
| `revixplus-wordmark.svg` | Wordmark alone, only where the symbol already appears nearby |

The site's favicon and app icons (`src/app/icon.svg`, `favicon.ico`, `apple-icon.png`, `public/icon-*.png`) use the small-size cut of the symbol, whose gutters are wider so the Plus stays open at 16 px. In code the symbol and wordmark are the `Logo` and `Wordmark` components (`src/components/layout/HeaderBar.tsx`).

## 2. Clear space

Keep a clear zone of **one module** around the logo on all sides. A module is one of the symbol's square blocks (44 % of the symbol's height). The zone scales with the logo.

## 3. Minimum size

| Version | Screen | Print |
|---|---|---|
| Horizontal | 96 px wide | 25 mm wide |
| Symbol | 24 px (below that, the favicon cut) | 6 mm |

## 4. Colour

| Name | HEX | RGB | CMYK (approx.) | Pantone (approx.) | Use |
|---|---|---|---|---|---|
| Revix Violet | #5B34F0 | 91 52 240 | 62 78 0 6 | 2725 C | Symbol on light backgrounds, app tile |
| Revix Violet, on dark | #7050FF | 112 80 255 | 56 69 0 0 | 2725 C | Symbol on dark backgrounds (contrast) |
| Ink | #0B0B14 | 11 11 20 | 45 45 0 92 | Black 6 C | Wordmark, one-colour logo |
| Paper | #F6F6FB | 246 246 251 | 2 2 0 2 | — | Light backgrounds |
| Signal Lime (accent) | #B8F53D | 184 245 61 | 25 0 75 4 | 375 C | UI accents only, never in the logo |

Violet sits apart from the category's blue, and from the purple-to-cyan "AI gradient". The logo is always one flat colour per part: no gradients. Electric violet is outside the CMYK gamut, so check print proofs (or use the Pantone spot) before a print run.

**Approved logo/background pairs**: colour logo on white or Paper · reversed (violet symbol, white wordmark) on Ink · white logo on Revix Violet · black on white. On photos, use the white or black version on a calm area.

## 5. Typography

- Wordmark: Geist SemiBold, outlined, tracking −2 % with tightened Re, xP and Pl pairs. Never retype it.
- Site: Geist Sans (headings and body), Geist Mono (labels). Open Font License, free for logo and commercial use.

## 6. Don'ts

Don't stretch, squash or rotate · don't close or fill the Plus gutter · don't colour the four modules differently · don't add gradients, shadows, glows or outlines · don't rearrange or resize the parts of a lockup · don't place the colour logo on busy backgrounds · don't recreate the wordmark by typing it.

## 7. Before registering

A professional trademark search (USPTO, EUIPO, UK IPO, IPO Pakistan, UAE) and a reverse image search are needed before filing; this design has not been cleared.
