/**
 * Branded Open Graph cards (1200×630 JPEG) for every marketing page, in
 * Thai and English → static/og/<slug>-<locale>.jpg. Slugs must match
 * marketingSeo()'s default (path with "/" → "-", "home" for /).
 *
 * Renders an HTML template per card with headless Chrome (macOS path by
 * default; override with CHROME=/path/to/chrome) and converts PNG → JPEG
 * with `sips` (macOS) — run `pnpm seo:og` after changing page titles and
 * commit the images.
 */
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  writeFileSync,
  rmSync,
  readFileSync,
  existsSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { features } from "../../src/lib/marketing/features-data";
import { modulesContent } from "../../src/lib/marketing/modules-data";
import { vendorCompares } from "../../src/lib/marketing/compare-vendors";

type Bi = { en: string; th: string };
type Card = { slug: string; eyebrow: Bi; title: Bi; color?: string };

const ROOT = resolve(import.meta.dirname, "../..");
const OUT = join(ROOT, "static/og");
const CHROME =
  process.env.CHROME ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MOD_COLOR: Record<string, string> = {
  operation: "#2563eb",
  people: "#7c3aed",
  commerce: "#f97316",
  crm: "#c026d3",
  service: "#0d9488",
  docs: "#0ea5e9",
  accounting: "#4f46e5",
};

const cards: Card[] = [
  {
    slug: "home",
    eyebrow: {
      th: "โปรแกรม ERP ภาษาไทยสำหรับ SME",
      en: "Thai-first cloud ERP for SMEs",
    },
    title: { th: "ระบบเดียว ดูแลครบทุกฝ่าย", en: "One system for every team" },
  },
  {
    slug: "what-is-tonbab",
    eyebrow: { th: "ข้อมูลโดยย่อ", en: "Key facts" },
    title: { th: "Tonbab (ต้นแบบ) คืออะไร?", en: "What is Tonbab (ต้นแบบ)?" },
  },
  {
    slug: "modules",
    eyebrow: { th: "7 โมดูล ฐานข้อมูลเดียว", en: "7 modules, one database" },
    title: {
      th: "จัดซื้อ สต็อก POS CRM HR บริการ บัญชี",
      en: "Purchasing, stock, POS, CRM, HR, service, accounting",
    },
  },
  ...modulesContent.map((m) => ({
    slug: `modules-${m.key}`,
    eyebrow: { th: "โมดูล", en: "Module" },
    title: { th: m.name.th, en: m.name.en },
    color: MOD_COLOR[m.key],
  })),
  {
    slug: "features",
    eyebrow: { th: "ฟีเจอร์", en: "Features" },
    title: { th: "สิ่งที่ระบบทั่วไปไม่มี", en: "What other systems leave out" },
  },
  ...features.map((f) => ({
    slug: `features-${f.key}`,
    eyebrow: f.eyebrow,
    title: f.h1,
    color: MOD_COLOR[f.module],
  })),
  {
    slug: "pricing",
    eyebrow: { th: "ราคา", en: "Pricing" },
    title: {
      th: "เริ่มฟรี แพ็กเกจเริ่ม ฿2,990/ปี",
      en: "Free to start, paid from ฿2,990/yr",
    },
  },
  {
    slug: "compare",
    eyebrow: { th: "เปรียบเทียบ", en: "Compare" },
    title: {
      th: "Tonbab เทียบกับ ERP และโปรแกรมบัญชีอื่น",
      en: "Tonbab vs other ERP and accounting software",
    },
  },
  ...vendorCompares.map((v) => ({
    slug: `compare-${v.slug}`,
    eyebrow: { th: "เปรียบเทียบตามจริง", en: "An honest comparison" },
    title: { th: `Tonbab กับ ${v.name}`, en: `Tonbab vs ${v.name}` },
  })),
  {
    slug: "migration",
    eyebrow: { th: "บริการย้ายข้อมูล", en: "Data migration" },
    title: {
      th: "ย้ายมา Tonbab โดยไม่ทิ้งประวัติเดิม",
      en: "Move to Tonbab, keep your history",
    },
  },
  {
    slug: "customers",
    eyebrow: { th: "ลูกค้า", en: "Customers" },
    title: {
      th: "บริษัทไทยที่ทำงานบน Tonbab ทุกวัน",
      en: "Thai companies running on Tonbab",
    },
  },
  {
    slug: "ai",
    eyebrow: { th: "Tonbab AI · มาพร้อมทุกแพ็กเกจ", en: "Tonbab AI · included in every plan" },
    title: {
      th: "AI ในงานทุกวัน ไม่ต้องสมัครเพิ่ม",
      en: "AI in your daily work, no extra subscription",
    },
    color: "#7c3aed",
  },
  {
    slug: "developers",
    eyebrow: { th: "API และ MCP", en: "API & MCP" },
    title: {
      th: "ให้ AI ทำงานกับข้อมูลของคุณ",
      en: "Let AI work with your data",
    },
  },
  {
    slug: "connect-claude",
    eyebrow: { th: "ตัวเชื่อมสำหรับ Claude", en: "Claude connector" },
    title: {
      th: "เชื่อมต่อ Tonbab กับ Claude",
      en: "Connect Tonbab to Claude",
    },
  },
  {
    slug: "docs",
    eyebrow: { th: "คู่มือการใช้งาน", en: "Help docs" },
    title: {
      th: "วิธีใช้ Tonbab ทีละขั้นตอน",
      en: "Step-by-step Tonbab guides",
    },
  },
  {
    slug: "story",
    eyebrow: { th: "เรื่องราวของเรา", en: "Our story" },
    title: {
      th: "ERP ที่สร้างจากงานจริงของธุรกิจไทย",
      en: "An ERP built inside real Thai operations",
    },
  },
];

const fontDir = join(ROOT, "node_modules/@fontsource/ibm-plex-sans-thai/files");
const font = (w: number, sub: string) =>
  `file://${join(fontDir, `ibm-plex-sans-thai-${sub}-${w}-normal.woff2`)}`;
const logo = readFileSync(join(ROOT, "static/brand/tonbab-logo.svg"), "utf8");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function html(c: Card, l: "th" | "en"): string {
  const accent = c.color ?? "#2E5CE6";
  return `<!doctype html><html lang="${l}"><head><meta charset="utf-8"><style>
@font-face{font-family:P;font-weight:500;src:url(${font(500, "thai")}),url(${font(500, "latin")})}
@font-face{font-family:P;font-weight:700;src:url(${font(700, "thai")}),url(${font(700, "latin")})}
@font-face{font-family:P;font-weight:500;src:url(${font(500, "latin")});unicode-range:U+0000-00FF,U+20AC,U+0E3F}
@font-face{font-family:P;font-weight:700;src:url(${font(700, "latin")});unicode-range:U+0000-00FF,U+20AC,U+0E3F}
*{margin:0;box-sizing:border-box}html,body{width:1200px;height:630px}
body{font-family:P,sans-serif;background:#F7F6F3;color:#17161C;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(46,92,230,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(46,92,230,.08) 1px,transparent 1px);background-size:40px 40px}
.bar{position:absolute;left:0;top:0;bottom:0;width:18px;background:${accent}}
.wrap{position:absolute;inset:72px 88px 64px 104px;display:flex;flex-direction:column}
.logo svg{height:64px;width:auto}
.eyebrow{margin-top:auto;font-size:30px;font-weight:500;color:${accent}}
h1{margin-top:14px;font-size:${l === "th" ? 66 : 64}px;line-height:${l === "th" ? 1.3 : 1.12};font-weight:700;letter-spacing:${l === "th" ? "0" : "-0.02em"};max-width:980px}
.foot{margin-top:28px;display:flex;justify-content:space-between;font-size:24px;color:#5b5a63}
.amber{display:inline-block;width:14px;height:14px;border-radius:50%;background:#F5A623;margin-right:10px;vertical-align:middle}
</style></head><body><div class="grid"></div><div class="bar"></div><div class="wrap">
<div class="logo">${logo}</div>
<p class="eyebrow">${esc(c.eyebrow[l])}</p>
<h1>${esc(c.title[l])}</h1>
<div class="foot"><span><span class="amber"></span>www.tonbab.com</span><span>${l === "th" ? "ผลิตภัณฑ์ของ Codustry" : "A product of Codustry"}</span></div>
</div></body></html>`;
}

function shoot(
  htmlFile: string,
  png: string,
  w: number,
  h: number,
  transparent = false,
) {
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      ...(transparent ? ["--default-background-color=00000000"] : []),
      `--window-size=${w},${h}`,
      `--screenshot=${png}`,
      "--virtual-time-budget=3000",
      `file://${htmlFile}`,
    ],
    { stdio: "ignore" },
  );
}

if (!existsSync(CHROME))
  throw new Error(`Chrome not found at ${CHROME} — set CHROME=`);
mkdirSync(OUT, { recursive: true });
const tmp = join(tmpdir(), `tonbab-og-${process.pid}`);
mkdirSync(tmp, { recursive: true });
// ONLY=docs,pricing regenerates just those cards.
const only = process.env.ONLY?.split(",");
for (const c of cards.filter((x) => !only || only.includes(x.slug))) {
  for (const l of ["th", "en"] as const) {
    const f = join(tmp, `${c.slug}-${l}.html`);
    const png = join(tmp, `${c.slug}-${l}.png`);
    writeFileSync(f, html(c, l));
    shoot(f, png, 1200, 630);
    execFileSync(
      "sips",
      [
        "-s",
        "format",
        "jpeg",
        "-s",
        "formatOptions",
        "60",
        png,
        "--out",
        join(OUT, `${c.slug}-${l}.jpg`),
      ],
      { stdio: "ignore" },
    );
    console.log(`og/${c.slug}-${l}.jpg`);
  }
}
// Raster Codustry logo for Organization JSON-LD (Google wants ≥112 px, not SVG).
const lf = join(tmp, "codustry.html");
writeFileSync(
  lf,
  `<!doctype html><style>html,body{margin:0;background:transparent}img{display:block;width:600px;height:auto;margin:20px}</style><img src="file://${join(ROOT, "static/brand/codustry-logo.svg")}">`,
);
shoot(lf, join(ROOT, "static/brand/codustry-logo.png"), 640, 135, true);
rmSync(tmp, { recursive: true, force: true });
console.log(`done: ${cards.length * 2} cards`);
