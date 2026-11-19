/**
 * Plain-Markdown renderings of the marketing content for AI answer engines
 * (llms.txt, llms-full.txt and /md/<locale>/<page>). Built from the SAME
 * typed data the HTML pages render, so the two can never disagree.
 */
import type { Locale } from "$lib/server/content/types";
import {
  modulesContent,
  type ModuleContent,
} from "$lib/marketing/modules-data";
import { features, type FeatureContent } from "$lib/marketing/features-data";
import {
  vendorCompares,
  type VendorCompare,
} from "$lib/marketing/compare-vendors";
import { customers } from "$lib/marketing/customers-data";
import { getDoc, listDocs } from "$lib/server/docs";
import { migrationFaq } from "$lib/marketing/migration-data";
import { whatFaq } from "$lib/marketing/about-data";
import {
  aiFaq,
  aiSafety,
  assistants,
  builtInLive,
  builtInSoon,
  examplePrompts,
  MCP_URL,
} from "$lib/marketing/ai-data";
import {
  ENTITY,
  PLAN_FACTS,
  SITE_ORIGIN,
  SITE_UPDATED,
  SUPPORT_PACK_YEARLY,
  TRIAL_DAYS,
  type Bi,
} from "$lib/seo/site";

const baht = (n: number) => "฿" + n.toLocaleString("en-US");
const tr = (b: Bi | string, l: Locale) => (typeof b === "string" ? b : b[l]);
const url = (l: Locale, p: string) => `${SITE_ORIGIN}/${l}${p}`;

const STATE: Record<string, Bi> = {
  live: { en: "Live", th: "ใช้งานได้" },
  dev: { en: "In development", th: "กำลังพัฒนา" },
  soon: { en: "Coming soon", th: "เร็ว ๆ นี้" },
  off: { en: "Not available yet", th: "ยังไม่เปิด" },
};

export function pricingMd(l: Locale): string {
  const th = l === "th";
  const rows = PLAN_FACTS.map(
    (p) =>
      `| ${p.name} | ${p.seats}${p.from ? "+" : ""} | ${p.from ? (th ? "เริ่มต้น " : "from ") : ""}${baht(p.yearly)} | ${p.monthly === null ? (th ? "รายปีเท่านั้น" : "yearly only") : baht(p.monthly)} | ${p.aiCredits.toLocaleString("en-US")} |`,
  ).join("\n");
  return `${th ? "| แพ็กเกจ | ผู้ใช้ | รายปี | รายเดือน | เครดิต AI ต่อเดือน |" : "| Plan | Users | Yearly | Monthly | AI credits / month |"}
|---|---|---|---|---|
${rows}

${
  th
    ? `ราคาต่อบริษัท ก่อน VAT 7% · ทุกแพ็กเกจได้ทุกโมดูลและทุกฟีเจอร์ รวมถึงบัญชี ต่างกันที่ขนาด (หลายบริษัทและการควบคุมความปลอดภัยระดับองค์กรอยู่ใน Enterprise) · เครดิต AI: งาน AI ส่วนใหญ่ใช้ 1 เครดิต งานที่หนักกว่าใช้มากกว่านั้น (นับของจากรูปด้วย AI Count ใช้ 1–2 เครดิตต่อรูป ไม่ว่าจะนับได้กี่ชิ้น) เริ่มนับใหม่ทุกเดือนตามเวลาประเทศไทย · ทดลองแพ็กเกจ Business ฟรี ${TRIAL_DAYS} วัน แล้วใช้ต่อแบบ Free · แพ็กซัพพอร์ต Enterprise ${baht(SUPPORT_PACK_YEARLY)}/ปี · Onboarding ${baht(9900)} ครั้งเดียว · แพ็กเสริมช่องทางขาย (Shopee/Lazada) ${baht(2400)}/ปี`
    : `Per company, before 7% VAT · every plan includes every module and feature, Accounting included; plans differ by size (several companies and enterprise IT controls are Enterprise) · AI credits: most AI actions use 1 credit, heavier ones more (AI Count: 1–2 credits per photo, however many items), reset every month on Bangkok time · ${TRIAL_DAYS}-day Business trial, then Free · Enterprise support pack ${baht(SUPPORT_PACK_YEARLY)}/yr · Onboarding ${baht(9900)} once · Sales-channels add-on (Shopee/Lazada) ${baht(2400)}/yr`
}`;
}

export function featureMd(f: FeatureContent, l: Locale): string {
  const th = l === "th";
  const parts = [
    `# ${tr(f.h1, l)}`,
    `${tr(f.eyebrow, l)} — ${url(l, `/features/${f.key}`)}`,
    tr(f.answer, l),
    `## ${th ? "ทำอะไรได้บ้าง" : "What it does"}`,
    f.highlights
      .map((h) => `- **${tr(h.title, l)}** — ${tr(h.body, l)}`)
      .join("\n"),
  ];
  if (f.statusRows) {
    parts.push(
      `## ${th ? "สถานะ (อัปเดต " + SITE_UPDATED + ")" : "Status (updated " + SITE_UPDATED + ")"}`,
      f.statusRows
        .map(
          (r) =>
            `- ${tr(r.name, l)} (${tr(r.group, l)}): ${tr(STATE[r.state], l)}`,
        )
        .join("\n"),
    );
  }
  parts.push(`${th ? "**แพ็กเกจ:**" : "**Plans:**"} ${tr(f.plan, l)}`);
  parts.push(
    `## ${th ? "คำถามที่พบบ่อย" : "FAQ"}`,
    f.faq.map((q) => `**${tr(q.q, l)}**\n${tr(q.a, l)}`).join("\n\n"),
  );
  return parts.join("\n\n");
}

export function moduleMd(m: ModuleContent, l: Locale): string {
  const th = l === "th";
  return [
    `# ${tr(m.name, l)}`,
    url(l, `/modules/${m.key}`),
    `${tr(m.tagline, l)} ${tr(m.intro, l)}`,
    `## ${th ? "ขั้นตอนการทำงาน" : "How it works"}`,
    m.workflow
      .map((s, i) => `${i + 1}. **${tr(s.title, l)}** — ${tr(s.body, l)}`)
      .join("\n"),
    ...m.featureGroups.flatMap((g) => [
      `## ${tr(g.title, l)}`,
      g.features
        .map((f) => `- **${tr(f.title, l)}**${f.ai ? " (✦ AI)" : ""} — ${tr(f.body, l)}`)
        .join("\n"),
    ]),
    `## ${th ? "เหมาะกับ" : "Who it's for"}`,
    m.whoFor.map((w) => `- ${tr(w, l)}`).join("\n"),
    `## ${th ? "คำถามที่พบบ่อย" : "FAQ"}`,
    m.faq.map((q) => `**${tr(q.q, l)}**\n${tr(q.a, l)}`).join("\n\n"),
  ].join("\n\n");
}

export function compareMd(v: VendorCompare, l: Locale): string {
  const th = l === "th";
  const parts = [
    `# ${th ? `${v.name} กับ Tonbab ต่างกันอย่างไร` : `${v.name} vs Tonbab`}`,
    url(l, `/compare/${v.slug}`),
    tr(v.summary, l),
    `| | ${v.name} | Tonbab |\n|---|---|---|\n` +
      v.rows
        .map((r) => `| ${tr(r.label, l)} | ${tr(r.them, l)} | ${tr(r.tonbab, l)} |`)
        .join("\n"),
  ];
  if (v.plans.length)
    parts.push(
      `## ${th ? `ราคา ${v.name}` : `${v.name} pricing`}`,
      v.plans.map((p) => `- **${tr(p.name, l)}** — ${tr(p.price, l)} · ${tr(p.note, l)}`).join("\n"),
    );
  if (v.plansNote) parts.push(tr(v.plansNote, l));
  if (v.scenario)
    parts.push(
      `## ${th ? "ตัวอย่างค่าใช้จ่ายต่อปี" : "Worked yearly cost"}: ${tr(v.scenario.title, l)}`,
      `- **${v.name}:** ${tr(v.scenario.them, l)} → ${tr(v.scenario.themTotal, l)}\n- **Tonbab:** ${tr(v.scenario.tonbab, l)} → ${tr(v.scenario.tonbabTotal, l)}` +
        (v.scenario.note ? `\n\n${tr(v.scenario.note, l)}` : ""),
    );
  for (const s of v.sections) parts.push(`## ${tr(s.h, l)}`, s.p.map((p) => tr(p, l)).join("\n\n"));
  parts.push(
    `**${th ? `เลือก ${v.name} ถ้า` : `Choose ${v.name} if`}:** ${v.chooseThem.map((c) => tr(c, l)).join(" ")}`,
    `**${th ? "เลือก Tonbab ถ้า" : "Choose Tonbab if"}:** ${v.chooseTonbab.map((c) => tr(c, l)).join(" ")}`,
    `## ${th ? "คำถามที่พบบ่อย" : "FAQ"}`,
    v.faq.map((q) => `**${tr(q.q, l)}**\n${tr(q.a, l)}`).join("\n\n"),
    `_${tr(v.verified, l)}${v.sources.length ? ` (${v.sources.map((s) => s.url).join(", ")})` : ""}_`,
  );
  return parts.join("\n\n");
}

/** /ai — built-in AI first, your own assistant (MCP) second. */
export function aiMd(l: Locale): string {
  const th = l === "th";
  return [
    `# ${th ? "AI ใน Tonbab" : "AI in Tonbab"}`,
    url(l, "/ai"),
    th
      ? "Tonbab AI (AI ในตัวของ Tonbab) รวมอยู่ในทุกแพ็กเกจผ่านเครดิต AI รายเดือน ไม่ต้องสมัคร AI เพิ่ม และเป็นฉบับร่างให้คนตรวจเสมอ นอกจากนี้ยังเชื่อมผู้ช่วย AI ของคุณเอง (Claude, ChatGPT, Gemini CLI) ผ่าน MCP ได้ โดยไม่ใช้เครดิต AI"
      : "Tonbab AI, the AI built into Tonbab, is included in every plan through monthly AI credits — no extra AI subscription, and always a draft a person checks. You can also connect your own assistant (Claude, ChatGPT, Gemini CLI) over MCP, which doesn't use AI credits.",
    `## ${th ? "AI ในตัว ใช้ได้แล้ววันนี้" : "Built-in AI, live now"}`,
    builtInLive
      .map(
        (f) =>
          `- **${tr(f.title, l)}** (✦ AI · ${tr(f.credits, l)}) — ${tr(f.body, l)} ${th ? "อยู่ที่" : "Where"}: ${tr(f.where, l)}.${f.href ? ` ${url(l, f.href)}` : ""}`,
      )
      .join("\n"),
    `## ${th ? "เร็ว ๆ นี้" : "Coming soon"}`,
    builtInSoon.map((s) => `- **${tr(s.title, l)}** (${tr(s.module, l)}) — ${tr(s.body, l)}`).join("\n"),
    `## ${th ? "ความเป็นส่วนตัวและความปลอดภัย" : "Privacy and safety"}`,
    aiSafety.map((p) => `- **${tr(p.title, l)}** — ${tr(p.body, l)}`).join("\n"),
    `## ${th ? "เครดิต AI ต่อเดือน" : "AI credits per month"}`,
    PLAN_FACTS.map((p) => `- ${p.name}: ${p.aiCredits.toLocaleString("en-US")}`).join("\n") +
      `\n\n${th ? "งาน AI ส่วนใหญ่ใช้ 1 เครดิต งานที่หนักกว่าใช้มากกว่านั้น สแกนใบเสร็จ 1 เครดิต AI Count 1–2 เครดิตต่อรูป" : "Most AI actions use 1 credit, heavier ones more: receipt scan 1, AI Count 1–2 per photo."} ${url(l, "/pricing")}`,
    `## ${th ? "ใช้ Tonbab ผ่าน AI ที่คุณใช้อยู่ (ทางเลือกเสริม)" : "Use Tonbab from the AI you already use (optional)"}`,
    th
      ? `MCP server ของ Tonbab: ${MCP_URL} เข้าสู่ระบบด้วย OAuth เลือกบริษัทและสิทธิ์เอง ไม่ใช้เครดิต AI ของ Tonbab การดึงข้อมูลนับตามโควตา API ของแพ็กเกจ แพ็กเกจฟรีอ่านได้อย่างเดียว`
      : `Tonbab's MCP server: ${MCP_URL}. Sign in with OAuth and choose the company and permissions. It doesn't use Tonbab AI credits; data calls count toward the plan's API quota. Free is read-only.`,
    `### ${th ? "ตัวอย่างคำถาม" : "Example prompts"}`,
    examplePrompts
      .map((p) => `- “${tr(p.prompt, l)}” → ${p.tools.map((x) => `\`${x}\``).join(", ")}${p.draft ? (th ? " (ฉบับร่าง)" : " (draft)") : ""}`)
      .join("\n"),
    ...assistants.flatMap((a) => [
      `### ${a.name} — ${tr(a.where, l)}`,
      a.steps.map((s, i) => `${i + 1}. ${tr(s, l)}`).join("\n") +
        (a.code ? `\n\n\`\`\`\n${a.code}\n\`\`\`` : "") +
        `\n\n${tr(a.note, l)} (${a.doc})`,
    ]),
    `${th ? "รายละเอียดเพิ่มเติม" : "More"}: ${url(l, "/developers")} · ${url(l, "/docs/api/api-and-mcp-quickstart")}`,
    `## ${th ? "คำถามที่พบบ่อย" : "FAQ"}`,
    aiFaq.map((q) => `**${tr(q.q, l)}**\n${tr(q.a, l)}`).join("\n\n"),
  ].join("\n\n");
}

function factsMd(l: Locale): string {
  const th = l === "th";
  return [
    `- **${th ? "ชื่อ" : "Name"}:** Tonbab (ต้นแบบ) — ${th ? "แปลว่า Master Plan" : '"master plan" in Thai'}`,
    `- **${th ? "ประเภท" : "Category"}:** ${th ? "ระบบ ERP ออนไลน์ (SaaS) ภาษาไทยสำหรับ SME" : "Thai-first cloud ERP (SaaS) for SMEs"}`,
    `- **${th ? "ผู้พัฒนา" : "Made by"}:** ${ENTITY.publisher.legalName} (${ENTITY.publisher.legalNameTh}) — ${ENTITY.publisher.url}`,
    `- **${th ? "เข้าใช้งาน" : "App"}:** ${ENTITY.appUrl} · ${th ? "สมัคร" : "Sign up"}: ${ENTITY.signupUrl}`,
    `- **${th ? "ภาษา" : "Languages"}:** ${th ? "ไทย (หลัก) และอังกฤษ" : "Thai (primary) and English"}`,
    `- **${th ? "อุปกรณ์" : "Platforms"}:** ${th ? "เว็บ, PWA, แอป iOS/Android (มีโหมดคีออสก์)" : "Web, PWA, iOS/Android app (with kiosk mode)"}`,
    `- **API:** REST + MCP (${ENTITY.apiDocsUrl})`,
    `- **${th ? "ติดต่อฝ่ายขาย" : "Sales"}:** ${ENTITY.email} · ${ENTITY.phoneDisplay}`,
    `- **${th ? "ลูกค้า (ได้รับอนุญาตให้แสดงชื่อ)" : "Customers (named with permission)"}:** ${customers.map((c) => tr(c.name, l) + (c.brand ? ` (${c.brand})` : "")).join(", ")}`,
  ].join("\n");
}

/** Short index per the llms.txt proposal: summary + curated links. */
export function llmsTxt(): string {
  const link = (l: Locale, p: string, title: string, note?: string) =>
    `- [${title}](${url(l, p)})${note ? `: ${note}` : ""}`;
  return `# Tonbab (ต้นแบบ)

> Tonbab (ต้นแบบ) is a Thai-first cloud ERP for SMEs by Codustry (Thailand) Co., Ltd. One database for purchasing, inventory, manufacturing, POS, sales channels and chat, CRM, field service, HR and payroll, a company wiki, and Thai accounting (included in every plan). Thai and English, on web, iOS and Android. Free plan; paid plans from ฿2,990/year before VAT. Sign up at ${ENTITY.signupUrl}. Sales: ${ENTITY.email}, ${ENTITY.phoneDisplay}.

Facts are current as of ${SITE_UPDATED}. Full content in one file: ${SITE_ORIGIN}/llms-full.txt. Every page also has a Markdown version under ${SITE_ORIGIN}/md/<locale>/<path> (e.g. ${SITE_ORIGIN}/md/en/features/pos).

## Overview
${link("en", "/what-is-tonbab", "What is Tonbab?", "definition, key facts, pricing table, FAQ")}
${link("th", "/what-is-tonbab", "Tonbab คืออะไร (ภาษาไทย)")}
${link("en", "/pricing", "Pricing", `Free ฿0 (1 user), Starter ฿2,990 (5 users), Standard ฿9,900 (10), Business ฿39,900 (25), Enterprise from ฿120,000 per year (100+); monthly AI credits ${PLAN_FACTS.map((p) => p.aiCredits.toLocaleString("en-US")).join(" / ")}`)}
${link("en", "/customers", "Customers")}

## Modules
${modulesContent.map((m) => link("en", `/modules/${m.key}`, m.name.en, m.tagline.en)).join("\n")}

## Features
${features.map((f) => link("en", `/features/${f.key}`, f.keyword.en, f.lede.en)).join("\n")}
${link("en", "/ai", "AI in Tonbab", "Tonbab AI built in (receipt scan, AI Count), included through monthly AI credits; connect Claude, ChatGPT or Gemini CLI over MCP")}
${link("en", "/developers", "API and MCP", "REST API, signed webhooks and an MCP server for Claude, ChatGPT and other MCP clients")}
${link("en", "/migration", "Data migration", "from FlowAccount, PEAK, Express, Xero, QuickBooks and others via Excel")}

## Help docs
${listDocs("en")
  .filter((d) => d.path)
  .map((d) => link("en", `/docs${d.path}`, d.title, d.description))
  .join("\n")}

## Comparisons
${link("en", "/compare", "Tonbab vs Thai and global ERPs")}
${vendorCompares.map((v) => link("en", `/compare/${v.slug}`, `${v.name} vs Tonbab`)).join("\n")}

## Optional
${link("en", "/story", "Our story")}
- [API reference](${ENTITY.apiDocsUrl})
- [Codustry](${ENTITY.publisher.url})
`;
}

/** Everything, both languages — for engines that ingest one document. */
export function llmsFullTxt(): string {
  const out: string[] = [];
  for (const l of ["en", "th"] as Locale[]) {
    const th = l === "th";
    out.push(
      `# ${th ? "Tonbab (ต้นแบบ) — ข้อมูลฉบับเต็ม (ภาษาไทย)" : "Tonbab (ต้นแบบ) — full reference (English)"}`,
      `${th ? "อัปเดต" : "Updated"} ${SITE_UPDATED} · ${SITE_ORIGIN}/${l}`,
      `## ${th ? "ข้อมูลโดยย่อ" : "Key facts"}\n\n${factsMd(l)}`,
      whatFaq.map((q) => `**${tr(q.q, l)}**\n${tr(q.a, l)}`).join("\n\n"),
      `## ${th ? "ราคา" : "Pricing"}\n\n${pricingMd(l)}`,
      ...modulesContent.map((m) =>
        moduleMd(m, l).replace(/^# /, "## ").replace(/\n## /g, "\n### "),
      ),
      ...features.map((f) =>
        featureMd(f, l).replace(/^# /, "## ").replace(/\n## /g, "\n### "),
      ),
      aiMd(l).replace(/^# /, "## ").replace(/\n### /g, "\n#### ").replace(/\n## /g, "\n### "),
      `## ${th ? "บริการย้ายข้อมูล" : "Data migration"}\n\n` +
        migrationFaq
          .map((q) => `**${tr(q.q, l)}**\n${tr(q.a, l)}`)
          .join("\n\n"),
      ...vendorCompares.map((v) => compareMd(v, l).replace(/^# /, "## ")),
      `## ${th ? "คู่มือการใช้งาน" : "Help docs"}`,
      ...listDocs(l)
        .filter((d) => d.path)
        .map((d) => {
          const full = getDoc(l, d.path.slice(1))!;
          return `### ${d.title}\n${SITE_ORIGIN}/${l}/docs${d.path}\n\n${full.body.trim().replace(/^### /gm, "##### ").replace(/^## /gm, "#### ")}`;
        }),
      "---",
    );
  }
  return out.join("\n\n") + "\n";
}

/** /md/<locale>/<path> — Markdown twin of a marketing page, or null. */
export function pageMarkdown(l: Locale, path: string): string | null {
  const p = path.replace(/^\/+|\/+$/g, "");
  if (p === "" || p === "what-is-tonbab") {
    return [
      `# ${l === "th" ? "Tonbab (ต้นแบบ) คืออะไร" : "What is Tonbab (ต้นแบบ)?"}`,
      factsMd(l),
      whatFaq.map((q) => `**${tr(q.q, l)}**\n${tr(q.a, l)}`).join("\n\n"),
    ].join("\n\n");
  }
  if (p === "ai") return aiMd(l);
  if (p === "pricing")
    return `# ${l === "th" ? "ราคา Tonbab" : "Tonbab pricing"}\n\n${pricingMd(l)}`;
  if (p === "migration")
    return (
      `# ${l === "th" ? "ย้ายข้อมูลมา Tonbab" : "Migrating to Tonbab"}\n\n` +
      migrationFaq.map((q) => `**${tr(q.q, l)}**\n${tr(q.a, l)}`).join("\n\n")
    );
  if (p === "docs" || p.startsWith("docs/")) {
    const d = getDoc(l, p.slice(5));
    return d ? `# ${d.title}\n\n${d.description}\n\n${d.body.trim()}` : null;
  }
  const [section, key] = p.split("/");
  if (section === "features" && key) {
    const f = features.find((x) => x.key === key);
    return f ? featureMd(f, l) : null;
  }
  if (section === "modules" && key) {
    const m = modulesContent.find((x) => x.key === key);
    return m ? moduleMd(m, l) : null;
  }
  if (section === "compare" && key) {
    const v = vendorCompares.find((x) => x.slug === key);
    return v ? compareMd(v, l) : null;
  }
  return null;
}
