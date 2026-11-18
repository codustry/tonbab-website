/**
 * Help docs (/[locale]/docs/...) — Markdown files in src/content/docs/<locale>/
 * <section>/<slug>.md with a small frontmatter block. Bundled at build time
 * (import.meta.glob ?raw), so a docs change ships with a deploy and is
 * reviewed as a PR like the rest of the marketing site. Content is our own
 * (trusted), rendered with `marked`.
 *
 * Every instruction in these files was checked against the app repo
 * (codustry/workflow) — keep it that way when editing.
 */
import { Marked } from "marked";
import type { Locale } from "$lib/server/content/types";
import type { Bi } from "$lib/seo/site";

const RAW = import.meta.glob("/src/content/docs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export interface DocMeta {
  locale: Locale;
  section: string;
  slug: string;
  /** Path after /<locale>/docs, e.g. "/operation/purchase-requests" ("" for the docs home). */
  path: string;
  title: string;
  description: string;
  order: number;
  updated: string;
}
export interface Doc extends DocMeta {
  body: string;
}
export interface DocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Sidebar order + labels. Unknown sections sort last under their key. */
export const DOC_SECTIONS: { key: string; label: Bi }[] =
  [
    {
      key: "getting-started",
      label: { th: "เริ่มต้นใช้งาน", en: "Getting started" },
    },
    {
      key: "operation",
      label: {
        th: "Operation — จัดซื้อ คลัง ผลิต",
        en: "Operation — buy, stock, make",
      },
    },
    {
      key: "commerce",
      label: {
        th: "Commerce — POS และช่องทางขาย",
        en: "Commerce — POS and channels",
      },
    },
    { key: "crm", label: { th: "CRM — งานขาย", en: "CRM — sales" } },
    {
      key: "people",
      label: {
        th: "People — บุคคลและเงินเดือน",
        en: "People — HR and payroll",
      },
    },
    { key: "service", label: { th: "Service — งานบริการ", en: "Service" } },
    {
      key: "docs",
      label: { th: "Docs — คลังความรู้", en: "Docs — company wiki" },
    },
    {
      key: "accounting",
      label: { th: "บัญชี", en: "Accounting" },
    },
    {
      key: "thai-compliance",
      label: { th: "ภาษีและกฎหมายไทย", en: "Thai tax and labour law" },
    },
    { key: "migration", label: { th: "ย้ายข้อมูล", en: "Migration" } },
    { key: "api", label: { th: "API และ MCP", en: "API and MCP" } },
    { key: "faq", label: { th: "คำถามที่พบบ่อย", en: "FAQ" } },
  ];

function parse(file: string, raw: string): Doc | null {
  const m = file.match(/\/src\/content\/docs\/(th|en)\/(.+)\.md$/);
  if (!m) return null;
  const locale = m[1] as Locale;
  const rel = m[2]; // "index" | "operation/purchase-requests"
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta: Record<string, string> = {};
  if (fm) {
    for (const line of fm[1].split("\n")) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (!kv) continue;
      let v = kv[2].trim();
      if (v.startsWith('"')) {
        try {
          v = JSON.parse(v);
        } catch {
          v = v.slice(1, -1);
        }
      }
      meta[kv[1]] = v;
    }
  }
  const isIndex = rel === "index";
  const [section, slug] = isIndex ? ["index", ""] : rel.split("/");
  return {
    locale,
    section: meta.section ?? section,
    slug: slug ?? "",
    path: isIndex ? "" : `/${rel}`,
    title: meta.title ?? rel,
    description: meta.description ?? "",
    order: Number(meta.order ?? 100),
    updated: meta.updated ?? "",
    body: fm ? raw.slice(fm[0].length) : raw,
  };
}

const ALL: Doc[] = Object.entries(RAW)
  .map(([f, raw]) => parse(f, raw))
  .filter((d): d is Doc => d !== null);

const sectionRank = (k: string) => {
  const i = DOC_SECTIONS.findIndex((s) => s.key === k);
  return i === -1 ? 999 : i;
};

export function listDocs(locale: Locale): DocMeta[] {
  return ALL.filter((d) => d.locale === locale)
    .sort(
      (a, b) =>
        sectionRank(a.section) - sectionRank(b.section) || a.order - b.order,
    )
    .map(({ body: _b, ...meta }) => meta);
}

export function getDoc(locale: Locale, path: string): Doc | undefined {
  const p = path ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";
  return ALL.find((d) => d.locale === locale && d.path === p);
}

/** Lightweight search corpus: title, description, headings, plain text (trimmed). */
export function searchIndex(
  locale: Locale,
): { path: string; title: string; text: string }[] {
  return ALL.filter((d) => d.locale === locale && d.path).map((d) => ({
    path: d.path,
    title: d.title,
    text: `${d.description} ${d.body.replace(/[#*_`>|[\]()-]/g, " ").replace(/\s+/g, " ")}`.slice(
      0,
      1500,
    ),
  }));
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";

/** Render Markdown → HTML with stable heading ids, and collect an H2/H3 outline. */
export function renderDoc(doc: Doc): { html: string; headings: DocHeading[] } {
  const headings: DocHeading[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        // Content never uses H1 (the page title is the H1); demote any stray one.
        const level = Math.min(Math.max(depth, 2), 4);
        let id = slugify(text);
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (level === 2 || level === 3)
          headings.push({ id, text: text.replace(/<[^>]+>/g, ""), level });
        return `<h${level} id="${id}">${text}</h${level}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external =
          /^https?:\/\//.test(href) &&
          !href.startsWith("https://www.tonbab.com");
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} rel="noopener" target="_blank">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
    },
  });
  // Wrap tables so wide ones scroll inside the article, not the page.
  const html = (marked.parse(doc.body, { async: false }) as string)
    .replace(/<table>/g, '<div class="doc-table"><table>')
    .replace(/<\/table>/g, "</table></div>");
  return { html, headings };
}
