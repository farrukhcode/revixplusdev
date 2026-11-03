#!/usr/bin/env node
/**
 * Generates public/work/<slug>.webp for every case study with a liveUrl.
 * Run locally: pnpm screenshots   (needs: pnpm add -D playwright && npx playwright install chromium)
 * Then set `image: "/work/<slug>.webp"` in the case study module (or run with --write to do it for you).
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(new URL(".", import.meta.url).pathname, "..");
const workDir = path.join(root, "src/content/work");
const outDir = path.join(root, "public/work");
const write = process.argv.includes("--write");

const files = (await readdir(workDir)).filter((f) => f.endsWith(".ts") && f !== "index.ts");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

for (const file of files) {
  const src = await readFile(path.join(workDir, file), "utf8");
  const slug = file.replace(/\.ts$/, "");
  const url = src.match(/liveUrl:\s*"([^"]+)"/)?.[1];
  if (!url) {
    console.log(`skip ${slug}: no liveUrl`);
    continue;
  }
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1500);
    const out = path.join(outDir, `${slug}.webp`);
    await page.screenshot({
      path: out,
      type: "webp",
      quality: 82,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
    console.log(`ok   ${slug} -> public/work/${slug}.webp`);
    if (write && !/image:\s*"/.test(src)) {
      const patched = src.replace(/(\n\s*featured:)/, `\n  image: "/work/${slug}.webp",$1`);
      await writeFile(path.join(workDir, file), patched);
    }
  } catch (err) {
    console.log(`fail ${slug}: ${err.message}`);
  }
}

await browser.close();
