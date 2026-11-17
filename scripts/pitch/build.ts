/**
 * Builds /pitch from the Slides-artifact export.
 *
 * Input  (committed):  src/content/pitch/{deck.json,deck.css,slides/*.html}
 *                      — the deck's project/ files, byte-for-byte as exported.
 *                      static/pitch/assets/<blobId>.<ext> — the deck's
 *                      /_blob/<id> asset files (PNG screenshots → WebP).
 * Output (committed):  src/lib/pitch/deck.generated.ts
 *
 * Transforms: /_blob/<id> → /pitch/assets/<id>.<ext>; <x-icon name> → inline
 * Lucide SVG; deck.css scoped under .deck (it styles bare section/h1/p);
 * speaker-note <aside> split out; slide numbers baked in (the CSS counter
 * can't count slides that are display:none). Run: pnpm pitch:build
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve, extname, basename } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const SRC = join(ROOT, "src/content/pitch");
const OUT_ASSETS = join(ROOT, "static/pitch/assets");
const OUT_TS = join(ROOT, "src/lib/pitch/deck.generated.ts");

const ICONS: Record<string, string> = {
  Verified: "badge-check",
  CheckCircle: "circle-check",
  Users: "users",
  Search: "search",
  PaperPlane: "send",
  Clock: "clock",
  Lock: "lock",
  Lightning: "zap",
  Home: "house",
  Chart: "chart-column",
  Book: "book-open",
  Warning: "triangle-alert",
  Star: "star",
  Lightbulb: "lightbulb",
  Key: "key",
  Globe: "globe",
  Database: "database",
  Activity: "activity",
  Wrench: "wrench",
  Tool: "hammer",
  Settings: "settings",
  Link: "link",
  GraduationCap: "graduation-cap",
  Cloud: "cloud",
  Chat: "message-circle",
};
function lucideSvg(name: string): string {
  const file = join(
    ROOT,
    "node_modules/lucide-svelte/dist/icons",
    `${ICONS[name] ?? "circle"}.svelte`,
  );
  const node = JSON.parse(
    readFileSync(file, "utf8").match(/const iconNode = (\[.*\]);/)![1],
  ) as [string, Record<string, string>][];
  const inner = node
    .map(
      ([tag, attrs]) =>
        `<${tag} ${Object.entries(attrs)
          .filter(([k]) => k !== "key")
          .map(([k, v]) => `${k}="${v}"`)
          .join(" ")}/>`,
    )
    .join("");
  return `<svg class="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

// ── assets live in static/pitch/assets (served as-is). A fresh PNG export is
// converted to WebP in place (cwebp, q 86) and the PNG removed.
const assetExt = new Map<string, string>();
for (const f of readdirSync(OUT_ASSETS)) {
  const id = basename(f, extname(f));
  let ext = extname(f).slice(1);
  if (ext === "png") {
    execFileSync("cwebp", [
      "-quiet",
      "-q",
      "86",
      join(OUT_ASSETS, f),
      "-o",
      join(OUT_ASSETS, `${id}.webp`),
    ]);
    rmSync(join(OUT_ASSETS, f));
    ext = "webp";
  }
  assetExt.set(id, ext);
}

// ── slides
const deck = JSON.parse(readFileSync(join(SRC, "deck.json"), "utf8")) as {
  title: string;
  order: string[];
  sections: Record<string, { description: string; start: string }>;
};
const sectionStarts = new Map(
  Object.values(deck.sections).map((s) => [s.start, s.description]),
);
const slides = deck.order.map((id, i) => {
  let html = readFileSync(join(SRC, "slides", `${id}.html`), "utf8");
  const notes = (html.match(/<aside>([\s\S]*?)<\/aside>/)?.[1] ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  html = html.replace(/<aside>[\s\S]*?<\/aside>/, "");
  html = html.replace(/\/?_blob\/([0-9a-f]{32})/g, (_m, bid: string) => {
    const ext = assetExt.get(bid);
    if (!ext) throw new Error(`slide ${id}: missing asset ${bid}`);
    return `/pitch/assets/${bid}.${ext}`;
  });
  html = html.replace(/<x-icon name="(\w+)"><\/x-icon>/g, (_m, n: string) =>
    lucideSvg(n),
  );
  html = html.replace(
    /<div class="pnum"><\/div>/,
    `<div class="pnum">${i + 1}</div>`,
  );
  // Off-screen slides shouldn't download their screenshots until needed.
  html = html.replace(
    /<img (?![^>]*loading=)/g,
    i < 2 ? "<img " : '<img loading="lazy" ',
  );
  return {
    id,
    html: html.trim(),
    notes,
    section: sectionStarts.get(id) ?? null,
  };
});

// ── CSS: scope every rule under .deck
const css = readFileSync(join(SRC, "deck.css"), "utf8");
const scoped = css
  .replace(/(^|})\s*([^{}@]+)\{/g, (_m, close: string, sel: string) => {
    const out = sel
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        if (s === ":root" || s === "body") return ".deck";
        if (/^(from|to|\d+%)$/.test(s)) return s; // keyframe steps
        return `.deck ${s}`;
      })
      .join(", ");
    return `${close}\n${out} {`;
  })
  .replace(/\.deck \.pnum::after \{ content: counter\(page\); \}/, "");

mkdirSync(join(ROOT, "src/lib/pitch"), { recursive: true });
writeFileSync(
  OUT_TS,
  `// GENERATED by scripts/pitch/build.ts from src/content/pitch — do not edit.\n` +
    `export const deckTitle = ${JSON.stringify(deck.title)};\n` +
    `export const deckCss = ${JSON.stringify(scoped)};\n` +
    `export const slides: { id: string; html: string; notes: string; section: string | null }[] = ${JSON.stringify(slides)};\n`,
);
console.log(`pitch: ${slides.length} slides, ${assetExt.size} assets`);
