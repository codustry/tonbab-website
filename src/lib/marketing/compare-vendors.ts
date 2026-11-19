/**
 * /compare/[vendor] — head-to-head pages for the tools Thai buyers search for
 * and weigh Tonbab against ("FlowAccount vs Tonbab", "ทางเลือก PEAK", …).
 *
 * HONESTY RULES (CLAUDE.md):
 *  - every competitor fact cites a public source with a verification date;
 *    a fact we could not find on a public page is left out, never guessed;
 *  - third-party estimates are labelled as estimates;
 *  - never claim Thai rivals lack Thai tax compliance (they are strong there);
 *  - say plainly when the other product is the better fit;
 *  - Tonbab facts mirror the product (plans.ts) — Accounting is included from
 *    every plan, and since 2026-11-18 EVERY feature is on every plan (plans
 *    differ by size); e-Tax Invoice is not supported yet.
 *
 * Re-verified 2026-11-18 (competitor pricing pages + docs); prices re-checked and
 * 11 vendors added 2026-11-19. Prices before VAT.
 * Tonbab prices come from TONBAB_YEARLY below — when plans change, update it
 * and re-read every `scenario` (the verdict can flip).
 */
import type { Bi } from "./compare-data";

export type VendorCategory = "accounting" | "erp" | "inventory" | "pos" | "hr" | "crm";

export interface VendorSource {
  label: string;
  url: string;
}

export interface VendorPlan {
  name: Bi;
  price: Bi;
  note: Bi;
}

export interface VendorCompare {
  slug: string;
  name: string;
  category: VendorCategory;
  /** What people type: used in the meta description ("ทางเลือก FlowAccount"). */
  keyword: Bi;
  verified: Bi;
  sources: VendorSource[];
  summary: Bi;
  rows: { label: Bi; them: Bi; tonbab: Bi }[];
  /** Their published plans (empty when they publish none). */
  plans: VendorPlan[];
  plansNote?: Bi;
  /** A worked yearly-cost example for one realistic company. */
  scenario?: {
    title: Bi;
    them: Bi;
    themTotal: Bi;
    tonbab: Bi;
    tonbabTotal: Bi;
    note?: Bi;
  };
  sections: { h: Bi; p: Bi[] }[];
  chooseThem: Bi[];
  chooseTonbab: Bi[];
  faq: { q: Bi; a: Bi }[];
}

const bi = (th: string, en: string): Bi => ({ th, en });
const same = (s: string): Bi => ({ th: s, en: s });

export const CATEGORY_LABEL: Record<VendorCategory, Bi> = {
  accounting: bi("โปรแกรมบัญชี", "Accounting software"),
  erp: bi("ระบบ ERP", "ERP systems"),
  inventory: bi("สต็อกและออเดอร์ออนไลน์", "Inventory & online orders"),
  pos: bi("ระบบ POS หน้าร้าน", "POS systems"),
  hr: bi("HR และเงินเดือน", "HR & payroll"),
  crm: bi("CRM และงานขาย", "CRM & sales"),
};

// ── Tonbab facts (mirror the product's plans.ts; per company per year, before VAT) ──
export const TONBAB_YEARLY = { starter: 2990, standard: 9900, business: 39900, enterprise: 120000, setup: 9900, channels: 2400, hikcentral: 2400 };
const baht = (n: number) => "฿" + n.toLocaleString("en-US");
const B = {
  starter: baht(TONBAB_YEARLY.starter),
  standard: baht(TONBAB_YEARLY.standard),
  business: baht(TONBAB_YEARLY.business),
  enterprise: baht(TONBAB_YEARLY.enterprise),
  setup: baht(TONBAB_YEARLY.setup),
  channels: baht(TONBAB_YEARLY.channels),
  hikcentral: baht(TONBAB_YEARLY.hikcentral),
};

const TONBAB_PRICE = bi(
  `Free ฿0 · Starter ${B.starter} · Standard ${B.standard} · Business ${B.business} · Enterprise เริ่ม ${B.enterprise} ต่อปี (ราคาต่อบริษัท ไม่ใช่ต่อคน)`,
  `Free ฿0 · Starter ${B.starter} · Standard ${B.standard} · Business ${B.business} · Enterprise from ${B.enterprise} per year (per company, not per user)`,
);
const TONBAB_TYPE = bi(
  "ERP บนคลาวด์ครบทุกฝ่าย: บัญชี จัดซื้อ สต็อก ผลิต POS CRM HR งานบริการ เอกสาร",
  "All-department cloud ERP: accounting, purchasing, stock, manufacturing, POS, CRM, HR, service, docs",
);
const TONBAB_ACC = bi(
  "มีในทุกแพ็กเกจ รวม Free — ใบเสนอราคาถึงใบกำกับภาษี ใบเสร็จ บิลซื้อ สมุดบัญชี งบการเงิน",
  "On every plan, Free included — quotation to tax invoice, receipts, bills, ledger, financial statements",
);
const TONBAB_TAX = bi(
  "ภ.พ.30 · 50 ทวิ · ภ.ง.ด.3/53 ในบัญชี และ ภ.ง.ด.1 · ประกันสังคม ในเงินเดือน · ยังไม่รองรับ e-Tax Invoice",
  "PP30 · 50 Tawi · PND 3/53 in Accounting, PND 1 · social security in payroll · no e-Tax Invoice yet",
);
const TONBAB_MFG = bi(
  "มี — BOM ใบสั่งผลิต ขั้นตอนผลิต ต้นทุนแผนเทียบจริง QC",
  "Yes — BOM, work orders, routing, planned-vs-actual cost, QC",
);
const TONBAB_STOCK = bi(
  "หลายคลังทุกแพ็กเกจ · ล็อตและซีเรียล · ต้นทุนถึงคลังสำหรับสินค้านำเข้า",
  "Multi-warehouse on every plan · lots and serials · landed cost for imports",
);
const TONBAB_POS = bi(
  "มีในทุกแพ็กเกจ — บัตรและพร้อมเพย์ผ่าน Beam, QR พร้อมเพย์ของร้านพร้อมรูปสลิป, ใบสั่งครัว",
  "On every plan — cards and PromptPay via Beam, your own PromptPay QR with slip photo, kitchen tickets",
);
const TONBAB_HR = bi(
  "การลา เวลาทำงาน และเงินเดือน ทุกแพ็กเกจ (พนักงาน Free/Starter 10 · Standard 50 · Business 200 คน)",
  "Leave, attendance and payroll on every plan (10 staff on Free/Starter · 50 on Standard · 200 on Business)",
);
const TONBAB_USERS = bi("Starter 5 · Standard 10 · Business 25 · Enterprise 100+ คน", "Starter 5 · Standard 10 · Business 25 · Enterprise 100+ users");
const TONBAB_LANG = bi("ไทยและอังกฤษครบทุกหน้า สลับได้ทันที", "Full Thai and English, switch any time");
const TONBAB_APP = bi("เว็บ แอป iOS/Android และโหมดคีออสก์หน้างาน", "Web, iOS/Android app and floor kiosk mode");
const TONBAB_CRM = bi("มีในตัว — บัญชีลูกค้า ดีล ไปป์ไลน์ เยี่ยมลูกค้า", "Built in — accounts, deals, pipeline, visits");
const TONBAB_API = bi("REST API + ตัวเชื่อม AI (MCP) ทุกแพ็กเกจ", "REST API + AI connector (MCP) on every plan");

const row = (th: string, en: string, them: Bi, tonbab: Bi) => ({ label: bi(th, en), them, tonbab });

// Shared FAQ answers.
const faqMigrate = (name: string) => ({
  q: bi(`ย้ายข้อมูลจาก ${name} มา Tonbab ได้ไหม?`, `Can I move my data from ${name} to Tonbab?`),
  a: bi(
    `ได้ ส่งออกรายชื่อลูกค้า ผู้ขาย สินค้า และยอดยกมาจาก ${name} เป็น Excel แล้วนำเข้า Tonbab ด้วยเครื่องมือนำเข้าในระบบ หรือให้ทีมเราตั้งค่าและย้ายข้อมูลให้ (บริการตั้งค่าเริ่มต้น ${B.setup} ครั้งเดียว) ประวัติเอกสารเดิมเก็บไว้อ้างอิงที่ระบบเดิมได้`,
    `Yes. Export customers, suppliers, products and opening balances from ${name} to Excel and bring them in with Tonbab's import tools — or have our team set up and migrate for you (onboarding service ${B.setup} one-time). Keep old document history in the old system for reference.`,
  ),
});
const faqTry = {
  q: bi("ทดลองใช้ Tonbab ได้อย่างไร?", "How do I try Tonbab?"),
  a: bi(
    "สมัครที่ app.tonbab.com/signup บริษัทใหม่ได้ใช้แพ็กเกจ Business ฟรี 30 วัน ไม่ต้องใช้บัตร หมดช่วงทดลองแล้วเลือกแพ็กเกจหรือใช้ Free ต่อ ข้อมูลยังอยู่ครบ",
    "Sign up at app.tonbab.com/signup. Every new company gets the Business plan free for 30 days, no card needed. Afterwards pick a plan or stay on Free — your data stays.",
  ),
};
const youtUse = (name: string) => ({
  h: bi("ใช้คู่กันได้ไหม", "Can you use both?"),
  p: [
    bi(
      `ได้ หลายบริษัทให้สำนักงานบัญชีทำงานบน ${name} ต่อ และใช้ Tonbab ดูแลจัดซื้อ สต็อก การผลิต และหน้าร้าน แล้วส่งเอกสารที่สะอาดให้ฝ่ายบัญชี เมื่อพร้อมจะรวมบัญชีมาไว้ที่เดียวก็ทำได้ เพราะบัญชีรวมอยู่ในทุกแพ็กเกจของ Tonbab`,
      `Yes. Many companies keep their accounting firm on ${name} and run purchasing, stock, production and retail in Tonbab, handing over clean documents. When you want one system, Tonbab's accounting is already in every plan.`,
    ),
  ],
});

export const vendorCompares: VendorCompare[] = [
  // ────────────────────────────────────────────────────────── FlowAccount
  {
    slug: "flowaccount",
    name: "FlowAccount",
    category: "accounting",
    keyword: bi("ทางเลือก FlowAccount", "FlowAccount alternative"),
    verified: bi("ข้อมูล FlowAccount ตรวจจากหน้าราคาและศูนย์ช่วยเหลือของ FlowAccount เมื่อ 18 พ.ย. 2569 ราคาตรวจซ้ำ 19 พ.ย. 2569", "FlowAccount facts checked on FlowAccount's pricing page and help centre, 18 Nov 2026; prices re-checked 19 Nov 2026"),
    sources: [{ label: "flowaccount.com/pricing", url: "https://flowaccount.com/pricing" }],
    summary: bi(
      "FlowAccount เป็นโปรแกรมบัญชีออนไลน์ยอดนิยมของไทย เด่นเรื่องออกเอกสารขาย ภาษี และ e-Tax ราคาเริ่มต้นเข้าถึงง่าย ส่วน Tonbab เป็น ERP ที่มีบัญชีรวมอยู่ในทุกแพ็กเกจ พร้อมจัดซื้อ สต็อกหลายคลัง การผลิต POS CRM และเงินเดือนในฐานข้อมูลเดียว เหมาะกับธุรกิจที่งานก่อนถึงบัญชีซับซ้อน เช่น โรงงาน ผู้นำเข้า และร้านที่มีหลายสาขา",
      "FlowAccount is a popular Thai online accounting app — strong on sales documents, tax and e-Tax, with an easy entry price. Tonbab is an ERP with accounting included in every plan, plus purchasing, multi-warehouse stock, manufacturing, POS, CRM and payroll in one database — a fit when the work before the books is complex: factories, importers, multi-branch shops.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("โปรแกรมบัญชีออนไลน์ + MobilePOS", "Online accounting + MobilePOS"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย (ต่อปี)", "Published price (per year)", bi("Free · Standard ฿1,990 · Pro ฿2,990 · Pro Business ฿5,490 · เงินเดือนเป็นผลิตภัณฑ์แยก", "Free · Standard ฿1,990 · Pro ฿2,990 · Pro Business ฿5,490 · payroll is a separate product"), TONBAB_PRICE),
      row("ผู้ใช้", "Users", bi("Free/Standard 1 คน · Pro ขึ้นไปไม่จำกัด", "Free/Standard 1 · Pro and up unlimited"), TONBAB_USERS),
      row("บัญชีและภาษีไทย", "Accounting & Thai tax", bi("มี — จุดแข็งหลัก รวม e-Tax", "Yes — a core strength, including e-Tax"), TONBAB_ACC),
      row("สต็อก", "Inventory", bi("เริ่มที่ Pro · หลายคลัง (สูงสุด 50) ใน Pro Business · ไม่พบล็อต/ซีเรียล", "From Pro · multiple warehouses (up to 50) on Pro Business · lots/serials not found"), TONBAB_STOCK),
      row("การผลิต (BOM / ใบสั่งผลิต)", "Manufacturing (BOM / work orders)", bi("ไม่มี — มี BOQ สำหรับงานรับเหมา", "No — a BOQ document for contracting only"), TONBAB_MFG),
      row("จัดซื้อเทียบราคา (RFQ)", "Purchasing RFQ comparison", bi("ไม่พบ", "Not found"), bi("มี โหมดในประเทศและนำเข้า", "Yes, domestic and import modes")),
      row("POS หน้าร้าน", "POS", bi("MobilePOS ทุกแพ็กเกจ", "MobilePOS on every plan"), TONBAB_POS),
      row("เงินเดือน", "Payroll", bi("FlowAccount Payroll (ผลิตภัณฑ์แยก)", "FlowAccount Payroll (separate product)"), TONBAB_HR),
      row("CRM", "CRM", bi("ไม่มีในตัว เชื่อม Readyplanet CRM", "Not built in; integrates Readyplanet CRM"), TONBAB_CRM),
      row("API", "API", bi("Open API ใน Pro Business", "Open API on Pro Business"), TONBAB_API),
    ],
    plans: [
      { name: same("Free"), price: same("฿0"), note: bi("1 ผู้ใช้ เอกสารขายพื้นฐาน", "1 user, basic sales documents") },
      { name: same("Standard"), price: bi("฿1,990/ปี หรือ ฿199/เดือน", "฿1,990/yr or ฿199/mo"), note: bi("1 ผู้ใช้", "1 user") },
      { name: same("Pro"), price: bi("฿2,990/ปี หรือ ฿299/เดือน", "฿2,990/yr or ฿299/mo"), note: bi("ผู้ใช้ไม่จำกัด สต็อก เอกสารซื้อ", "Unlimited users, stock, purchase documents") },
      { name: same("Pro Business"), price: bi("฿5,490/ปี หรือ ฿549/เดือน", "฿5,490/yr or ฿549/mo"), note: bi("หลายคลัง Open API เชื่อม Shopee/Lazada/TikTok (+฿299/ร้าน/เดือน)", "Multi-warehouse, Open API, Shopee/Lazada/TikTok links (+฿299/store/mo)") },
    ],
    plansNote: bi("ราคารายเดือนมีโปรโมชันเป็นช่วง ๆ เงินเดือน (Payroll) ขายแยก", "Monthly prices run promotions from time to time. Payroll is sold separately."),
    scenario: {
      title: bi("บริษัท 10 คน มี 2 คลัง ต้องการบัญชี สต็อก เงินเดือน และอยากติดตามลูกค้าและดีลด้วย", "A 10-person company with 2 warehouses that needs accounting, stock and payroll, and wants to track customers and deals"),
      them: bi("Pro Business ฿5,490 (หลายคลัง) + FlowAccount Payroll ฿2,990", "Pro Business ฿5,490 (multi-warehouse) + FlowAccount Payroll ฿2,990"),
      themTotal: bi("≈ ฿8,480 ต่อปี + ระบบ CRM แยก", "≈ ฿8,480 per year + a separate CRM"),
      tonbab: bi(`Standard ${B.standard} — บัญชี สต็อก 5 คลัง ล็อต เงินเดือน 50 คน ผู้ใช้ 10 คน พร้อม CRM และ POS`, `Standard ${B.standard} — accounting, stock in 5 warehouses, lots, payroll for 50, 10 users, with CRM and POS`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("สำหรับบัญชี สต็อก และเงินเดือนอย่างเดียว FlowAccount ถูกกว่าราว ฿1,400 ต่อปี Tonbab คุ้มเมื่อคุณใช้ CRM POS RFQ หรือการผลิตในระบบเดียวกันด้วย ถ้าต้องการ e-Tax Invoice หรือมีคนทำบัญชีอย่างเดียวมากกว่า 10 คน FlowAccount Pro ที่ผู้ใช้ไม่จำกัดคุ้มกว่า", "For accounting, stock and payroll alone, FlowAccount is about ฿1,400 a year cheaper. Tonbab pays off when you also run CRM, POS, RFQs or production in the same system. If you need e-Tax Invoice, or more than 10 people working only in the books, FlowAccount Pro with unlimited users is the better deal."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("FlowAccount เริ่มจากงานบัญชีแล้วขยายไปหาสต็อกและ POS ส่วน Tonbab เริ่มจากงานปฏิบัติการจริงในโรงงานและคลัง แล้วมีบัญชีอยู่ในระบบเดียวกัน เอกสารรับสินค้า เบิกจ่าย และส่งของจึงลงบัญชีด้วยต้นทุนจริงโดยไม่ต้องคีย์ซ้ำ", "FlowAccount starts from the books and reaches out to stock and POS. Tonbab starts from real operations in factories and warehouses, with the books in the same system — so goods receipts, issues and deliveries post to the ledger at real cost without re-keying."),
        bi("ถ้าธุรกิจคุณคือออกใบกำกับภาษีและเก็บเงิน FlowAccount ทำได้ดีมากในราคาที่ถูก แต่ถ้าคุณผลิตสินค้า นำเข้า หรือต้องรู้ต้นทุนต่องาน ระบบบัญชีอย่างเดียวจะไม่เห็นข้อมูลก่อนถึงบัญชี", "If your business is issuing tax invoices and collecting money, FlowAccount does that very well and cheaply. If you manufacture, import or need cost per job, an accounting app alone can't see what happens before the books."),
      ] },
      { h: bi("ราคา: จ่ายต่อบริษัท ไม่ใช่ต่อผลิตภัณฑ์", "Pricing: per company, not per product"), p: [
        bi("FlowAccount แยกเงินเดือนและการเชื่อมช่องทางขายออนไลน์เป็นค่าใช้จ่ายเพิ่ม Tonbab คิดราคาต่อบริษัท ทุกแพ็กเกจได้ทุกโมดูล จำนวนผู้ใช้และขีดจำกัดเพิ่มตามแพ็กเกจ", "FlowAccount charges extra for payroll and marketplace links. Tonbab prices per company: every plan includes every module, with users and limits growing by plan."),
      ] },
      youtUse("FlowAccount"),
    ],
    chooseThem: [
      bi("ต้องการโปรแกรมบัญชีและออกเอกสารอย่างเดียว ไม่มีงานสต็อกหรือการผลิตซับซ้อน", "You only need accounting and documents, without complex stock or production."),
      bi("ต้องออก e-Tax Invoice ตอนนี้", "You need e-Tax Invoice today."),
      bi("สำนักงานบัญชีของคุณทำงานบน FlowAccount อยู่แล้ว", "Your accounting firm already works in FlowAccount."),
    ],
    chooseTonbab: [
      bi("ผลิตตาม BOM หรือจ้างผลิต และต้องรู้ต้นทุนจริงต่องาน", "You manufacture to a BOM or subcontract and need real cost per job."),
      bi("นำเข้าสินค้าและต้องเทียบผู้ขายด้วยต้นทุนถึงคลัง", "You import and compare vendors by landed cost."),
      bi("อยากได้บัญชี POS CRM HR และสต็อกในระบบเดียว ราคาเดียว", "You want accounting, POS, CRM, HR and stock in one system at one price."),
    ],
    faq: [
      { q: bi("Tonbab ถูกกว่า FlowAccount ไหม?", "Is Tonbab cheaper than FlowAccount?"), a: bi(`ไม่ถ้าใช้แค่บัญชี — FlowAccount Standard ฿1,990/ปี และ Pro ฿2,990/ปี ถูกกว่า สำหรับบัญชี สต็อกหลายคลัง และเงินเดือน FlowAccount Pro Business + Payroll รวมประมาณ ฿8,480/ปี ส่วน Tonbab Standard ${B.standard}/ปี ซึ่งรวม CRM POS RFQ และล็อตสินค้าไว้ในราคาเดียวกัน (ราคาก่อน VAT ณ 18 พ.ย. 2569)`, `Not for accounting alone — FlowAccount Standard (฿1,990/yr) and Pro (฿2,990/yr) are cheaper. For accounting, multi-warehouse stock and payroll, FlowAccount Pro Business + Payroll is about ฿8,480/yr; Tonbab Standard is ${B.standard}/yr and also includes CRM, POS, RFQs and lots (before VAT, 18 Nov 2026).`) },
      { q: bi("Tonbab ออกใบกำกับภาษีได้ไหม?", "Can Tonbab issue tax invoices?"), a: bi("ได้ ในโมดูลบัญชี (ทุกแพ็กเกจ) มีใบเสนอราคา ใบแจ้งหนี้/ใบกำกับภาษี ใบวางบิล ใบเสร็จ ใบลดหนี้ รายงาน ภ.พ.30 และหัก ณ ที่จ่าย แต่ยังไม่รองรับ e-Tax Invoice", "Yes. Accounting (every plan) issues quotations, invoices/tax invoices, billing notes, receipts and credit notes, with PP30 and withholding-tax reports. e-Tax Invoice is not supported yet.") },
      faqMigrate("FlowAccount"),
      faqTry,
    ],
  },

  // ─────────────────────────────────────────────────────────────── PEAK
  {
    slug: "peak",
    name: "PEAK",
    category: "accounting",
    keyword: bi("ทางเลือก PEAK", "PEAK alternative"),
    verified: bi("ข้อมูล PEAK ตรวจจากหน้าแพ็กเกจและคู่มือของ PEAK เมื่อ 18 พ.ย. 2569", "PEAK facts checked on PEAK's package page and help centre, 18 Nov 2026"),
    sources: [
      { label: "peakaccount.com/software-package", url: "https://www.peakaccount.com/software-package" },
      { label: "PEAK help: manufacturing", url: "https://intercom.help/peak/en/articles/14086754" },
    ],
    summary: bi(
      "PEAK เป็นโปรแกรมบัญชีออนไลน์ที่สำนักงานบัญชีไทยนิยม เด่นเรื่องภาษี e-Tax และงานบัญชีครบ ส่วน Tonbab เป็น ERP ที่มีบัญชีรวมอยู่ในทุกแพ็กเกจ และเน้นงานปฏิบัติการ ตั้งแต่จัดซื้อ สต็อก การผลิต จนถึงหน้าร้านและงานขาย",
      "PEAK is an online accounting app favoured by Thai accounting firms — strong on tax, e-Tax and complete bookkeeping. Tonbab is an ERP with accounting in every plan, focused on operations: purchasing, stock and manufacturing through to retail and sales.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("โปรแกรมบัญชีออนไลน์ (เน้นสำนักงานบัญชี)", "Online accounting (firm-oriented)"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย (ต่อปี)", "Published price (per year)", same("FREE · e-Document ฿2,500 · BASIC ฿5,000 · PRO ฿9,000 · PRO Plus ฿12,000 · PREMIUM ฿35,000"), TONBAB_PRICE),
      row("ผู้ใช้", "Users", bi("1 / 3 / 5 / 10 / 10 / 20 คนตามแพ็กเกจ", "1 / 3 / 5 / 10 / 10 / 20 by plan"), TONBAB_USERS),
      row("บัญชีและภาษีไทย", "Accounting & Thai tax", bi("มี — จุดแข็งหลัก รวม e-Tax", "Yes — a core strength, including e-Tax"), TONBAB_ACC),
      row("สต็อก", "Inventory", bi("10 คลังใน BASIC/PRO · ไม่จำกัดตั้งแต่ PRO Plus · FIFO และล็อตใน PRO", "10 warehouses on BASIC/PRO · unlimited from PRO Plus · FIFO and lots on PRO"), TONBAB_STOCK),
      row("การผลิต (BOM / ใบสั่งผลิต)", "Manufacturing (BOM / work orders)", bi("ไม่มีโมดูลผลิต — คู่มือของ PEAK ระบุว่าออกแบบเพื่อธุรกิจซื้อมาขายไปและบริการ และแนะนำให้บันทึกผ่านใบเบิกสินค้าแทน", "No production module — PEAK's own help says it is designed for trading and service businesses and suggests a workaround with material requisitions"), TONBAB_MFG),
      row("POS หน้าร้าน", "POS", bi("ไม่มีในตัว เชื่อมระบบ POS ผ่าน API", "Not built in; connects to POS systems by API"), TONBAB_POS),
      row("เงินเดือน", "Payroll", same("PEAK Payroll"), TONBAB_HR),
      row("CRM", "CRM", bi("ไม่พบ (มีสมุดรายชื่อผู้ติดต่อ)", "Not found (contact list only)"), TONBAB_CRM),
      row("API", "API", bi("มี (เครดิต API ใน PRO Plus/PREMIUM)", "Yes (API credits on PRO Plus/PREMIUM)"), TONBAB_API),
    ],
    plans: [
      { name: same("FREE"), price: same("฿0"), note: bi("1 ผู้ใช้", "1 user") },
      { name: same("e-Document"), price: bi("฿2,500/ปี", "฿2,500/yr"), note: bi("3 ผู้ใช้", "3 users") },
      { name: same("BASIC"), price: bi("฿5,000/ปี", "฿5,000/yr"), note: bi("5 ผู้ใช้ · 10 คลัง", "5 users · 10 warehouses") },
      { name: same("PRO"), price: bi("฿9,000/ปี", "฿9,000/yr"), note: bi("10 ผู้ใช้ · FIFO ล็อต", "10 users · FIFO, lots") },
      { name: same("PRO Plus"), price: bi("฿12,000/ปี", "฿12,000/yr"), note: bi("10 ผู้ใช้ · คลังไม่จำกัด · เชื่อมมาร์เก็ตเพลส", "10 users · unlimited warehouses · marketplace links") },
      { name: same("PREMIUM"), price: bi("฿35,000/ปี", "฿35,000/yr"), note: bi("20 ผู้ใช้ (ราคาโปรถึงสิ้นปี 2569)", "20 users (promo price to end of 2026)") },
    ],
    plansNote: bi("เอกสารไม่จำกัดทุกแพ็กเกจ เกินโควตาฟรีมีแพ็กเกจเครดิตเริ่ม ฿0.50/รายการ ตั้งแต่ 1 ส.ค. 2569", "Unlimited documents on every plan; above the free quota, credit packs from ฿0.50 per item since 1 Aug 2026."),
    scenario: {
      title: bi("บริษัท 10 คน ต้องการบัญชี สต็อกพร้อมล็อตสินค้า และเงินเดือน", "A 10-person company that needs accounting, stock with lots, and payroll"),
      them: bi("PEAK PRO ฿9,000 (10 ผู้ใช้ FIFO ล็อต) · เงินเดือนคิดแยก", "PEAK PRO ฿9,000 (10 users, FIFO, lots) · payroll extra"),
      themTotal: bi("฿9,000 ต่อปี + PEAK Payroll", "฿9,000 per year + PEAK Payroll"),
      tonbab: bi(`Standard ${B.standard} — 10 ผู้ใช้ บัญชี ล็อตและซีเรียล เงินเดือนรวมแล้ว พร้อม CRM และ POS`, `Standard ${B.standard} — 10 users, accounting, lots and serials, payroll included, plus CRM and POS`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("ราคาใกล้เคียงกัน ถ้าต้องการบัญชีอย่างเดียว ต้องการ e-Tax Invoice หรือทำงานกับสำนักงานบัญชีที่ใช้ PEAK อยู่แล้ว PEAK ยังเป็นตัวเลือกที่ดี", "The prices are close. If you only need accounting, need e-Tax Invoice, or work with an accounting firm already on PEAK, PEAK remains a good choice."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("PEAK สร้างมาเพื่อนักบัญชี งานภาษี การปิดงบ และการทำงานร่วมกับสำนักงานบัญชีทำได้ดีมาก Tonbab สร้างจากงานโรงงานและคลังจริง แล้วมีบัญชีอยู่ในฐานข้อมูลเดียวกัน ข้อมูลจากจัดซื้อ คลัง ผลิต และหน้าร้านจึงไหลเข้าบัญชีเอง", "PEAK is built for accountants — tax, closing and collaboration with accounting firms are excellent. Tonbab grew out of real factory and warehouse work, with the books in the same database, so purchasing, stock, production and retail flow into accounting on their own."),
        bi("สำหรับโรงงาน คู่มือของ PEAK เองระบุว่าระบบออกแบบเพื่อธุรกิจซื้อมาขายไปและบริการ ใน Tonbab มี BOM ใบสั่งผลิต และต้นทุนแผนเทียบจริงในตัว", "For factories, PEAK's own manual says it is designed for trading and service businesses. Tonbab has BOMs, work orders and planned-vs-actual cost built in."),
      ] },
      youtUse("PEAK"),
    ],
    chooseThem: [
      bi("สำนักงานบัญชีของคุณทำงานบน PEAK และคุณต้องการเฉพาะงานบัญชี", "Your accounting firm works in PEAK and you only need bookkeeping."),
      bi("ต้องออก e-Tax Invoice ตอนนี้", "You need e-Tax Invoice today."),
    ],
    chooseTonbab: [
      bi("ผลิตสินค้าและต้องการ BOM ใบสั่งผลิต และต้นทุนการผลิตจริง", "You manufacture and need BOMs, work orders and real production cost."),
      bi("ต้องการ POS CRM และเงินเดือนในระบบเดียวกับบัญชีและสต็อก", "You want POS, CRM and payroll in the same system as the books and stock."),
      bi("ทีมมีทั้งคนไทยและต่างชาติ ต้องการหน้าจอสองภาษาเต็มรูปแบบ", "Your team is mixed Thai and foreign and needs a fully bilingual interface."),
    ],
    faq: [
      { q: bi("PEAK มีระบบผลิตไหม?", "Does PEAK have manufacturing?"), a: bi("ไม่มีโมดูลผลิตในตัว คู่มือของ PEAK (มี.ค. 2569) ระบุว่าโปรแกรมออกแบบสำหรับธุรกิจซื้อมาขายไปและบริการ และแนะนำให้โรงงานบันทึกผ่านใบเบิกสินค้า", "Not as a module. PEAK's help article (Mar 2026) says the product is designed for trading and service businesses and suggests factories record production through material requisitions.") },
      { q: bi("Tonbab กับ PEAK อันไหนถูกกว่า?", "Which is cheaper, Tonbab or PEAK?"), a: bi(`สำหรับ 10 ผู้ใช้ PEAK PRO ราคา ฿9,000/ปี (บัญชี) ส่วน Tonbab Standard ${B.standard}/ปี รวมบัญชี สต็อก เงินเดือน CRM และ POS สำหรับ 20 ผู้ใช้ PEAK PREMIUM ฿35,000/ปี ส่วน Tonbab Business ${B.business}/ปี สำหรับ 25 ผู้ใช้ (ราคาก่อน VAT ณ 18 พ.ย. 2569)`, `For 10 users, PEAK PRO is ฿9,000/yr for accounting; Tonbab Standard is ${B.standard}/yr including accounting, stock, payroll, CRM and POS. For 20 users, PEAK PREMIUM is ฿35,000/yr; Tonbab Business is ${B.business}/yr for 25 users (before VAT, 18 Nov 2026).`) },
      faqMigrate("PEAK"),
      faqTry,
    ],
  },

  // ─────────────────────────────────────────────────────────── MineERP
  {
    slug: "mineerp",
    name: "MineERP",
    category: "erp",
    keyword: bi("ทางเลือก MineERP", "MineERP alternative"),
    verified: bi("ข้อมูล MineERP ตรวจจาก mineerp.com/pricing และเว็บไซต์ MineERP เมื่อ 19 พ.ย. 2569", "MineERP facts checked on mineerp.com/pricing and the MineERP website, 19 Nov 2026"),
    sources: [{ label: "mineerp.com/pricing", url: "https://mineerp.com/pricing" }],
    summary: bi(
      "MineERP เป็น ERP บนคลาวด์ของไทยสำหรับโรงงานและธุรกิจซื้อมาขายไป มีงานผลิต BOM วางแผนการผลิต และสต็อกครบ ขายเป็นแพ็กเกจตามจำนวนผู้ใช้พร้อมค่าวางระบบ Tonbab เป็น ERP สำหรับ SME เช่นกัน แต่มีบัญชี POS CRM และ HR ในตัว ราคาต่อบริษัท และสมัครใช้ได้เองทันที",
      "MineERP is a Thai cloud ERP for factories and trading companies, with manufacturing, BOMs, production scheduling and stock, sold in user tiers plus an onboarding fee. Tonbab is also an SME ERP, but with accounting, POS, CRM and HR built in, per-company pricing, and self-serve signup.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ERP บนคลาวด์ เน้นงานโรงงานและเทรดดิ้ง", "Cloud ERP for factory and trading operations"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย (ต่อปี)", "Published price (per year)", bi("Trader 5 ผู้ใช้ ฿46,800 · Manufacturer 5 ผู้ใช้ ฿70,800 · สูงสุด ฿187,200 (30 ผู้ใช้)", "Trader 5 users ฿46,800 · Manufacturer 5 users ฿70,800 · up to ฿187,200 (30 users)"), TONBAB_PRICE),
      row("ค่าวางระบบ", "Onboarding fee", bi("฿50,000–140,000 ครั้งเดียว ตามจำนวนผู้ใช้", "฿50,000–140,000 one-time, by user count"), bi(`สมัครใช้เองได้ฟรี หรือบริการตั้งค่า ${B.setup} ครั้งเดียว`, `Self-serve at no cost, or a ${B.setup} one-time setup service`)),
      row("การผลิต", "Manufacturing", bi("มี — BOM หลายระดับ Routing คำนวณวัตถุดิบ วางแผนผลิตด้วย AI (Gantt) ต้นทุนงาน", "Yes — multi-level BOM, routing, material calculation, AI scheduling (Gantt), job costing"), TONBAB_MFG),
      row("สต็อก", "Inventory", bi("หลายคลัง ล็อต/ซีเรียล สแกน QR", "Multi-warehouse, lot/serial, QR scanning"), TONBAB_STOCK),
      row("บัญชีและภาษีไทย", "Accounting & Thai tax", bi("ไม่มีบัญชีในตัว — ส่งออก Excel หรือเชื่อม FlowAccount ผ่าน API", "No built-in accounting — exports to Excel or connects to FlowAccount by API"), TONBAB_ACC),
      row("POS", "POS", bi("มี (อยู่ในงานขาย)", "Yes (under sales)"), TONBAB_POS),
      row("HR / เงินเดือน", "HR / payroll", bi("ไม่พบ", "Not found"), TONBAB_HR),
      row("CRM", "CRM", bi("ไม่พบ", "Not found"), TONBAB_CRM),
    ],
    plans: [
      { name: same("Trader"), price: bi("฿46,800–118,800/ปี", "฿46,800–118,800/yr"), note: bi("5–30 ผู้ใช้ (เฉลี่ย ฿3,900–9,900/เดือน เมื่อจ่ายรายปี)", "5–30 users (฿3,900–9,900/mo billed yearly)") },
      { name: same("Manufacturer"), price: bi("฿70,800–187,200/ปี", "฿70,800–187,200/yr"), note: bi("5–30 ผู้ใช้ (เฉลี่ย ฿5,900–15,600/เดือน เมื่อจ่ายรายปี)", "5–30 users (฿5,900–15,600/mo billed yearly)") },
      { name: bi("ค่าวางระบบ", "Onboarding"), price: same("฿50,000 / ฿90,000 / ฿140,000"), note: bi("≤5 / 6–20 / 21–30 ผู้ใช้ ครั้งเดียว", "≤5 / 6–20 / 21–30 users, one-time") },
    ],
    plansNote: bi("MineERP แจ้งสิทธิ์อุดหนุน depa 50% สูงสุด ฿200,000 หน้าแรกของเว็บไซต์แสดงราคาบางแพ็กเกจต่างจากหน้าราคา เราอ้างอิงหน้า /pricing", "MineERP advertises a depa subsidy of 50% up to ฿200,000. Its home page shows some prices that differ from /pricing; we cite /pricing."),
    scenario: {
      title: bi("โรงงาน 10 คน ต้องการ BOM ใบสั่งผลิต สต็อก และบัญชี", "A 10-person factory that needs BOMs, work orders, stock and accounting"),
      them: bi("Manufacturer 10 ผู้ใช้ ฿87,000/ปี + ค่าวางระบบ ฿90,000 (ปีแรก) + โปรแกรมบัญชีแยก", "Manufacturer 10 users ฿87,000/yr + onboarding ฿90,000 (first year) + separate accounting software"),
      themTotal: bi("≈ ฿177,000 ปีแรก (ไม่รวมบัญชี)", "≈ ฿177,000 first year (accounting not included)"),
      tonbab: bi(`Standard ${B.standard} (10 ผู้ใช้ การผลิต บัญชี เงินเดือน ทุกฟีเจอร์) + บริการตั้งค่า ${B.setup} ถ้าต้องการ`, `Standard ${B.standard} (10 users, manufacturing, accounting, payroll — every feature) + optional ${B.setup} setup`),
      tonbabTotal: bi(`${baht(TONBAB_YEARLY.standard)}–${baht(TONBAB_YEARLY.standard + TONBAB_YEARLY.setup)} ปีแรก`, `${baht(TONBAB_YEARLY.standard)}–${baht(TONBAB_YEARLY.standard + TONBAB_YEARLY.setup)} first year`),
      note: bi("MineERP มีการวางแผนการผลิตด้วย AI และทีมวางระบบให้ ค่าวางระบบนั้นรวมบริการที่ปรึกษาที่ Tonbab ไม่ได้รวมไว้ในราคาแพ็กเกจ", "MineERP includes AI production scheduling and a hands-on implementation team; its onboarding fee buys consulting that Tonbab doesn't bundle into the plan price."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("ทั้งสองระบบเป็น ERP บนคลาวด์ของไทยที่เข้าใจงานโรงงาน MineERP เน้นการวางแผนและจัดลำดับการผลิตลึก พร้อมทีมวางระบบ Tonbab เน้นให้ทุกฝ่ายอยู่ในระบบเดียว ตั้งแต่จัดซื้อ การผลิต จนถึงบัญชี หน้าร้าน CRM และเงินเดือน", "Both are Thai cloud ERPs that understand factories. MineERP goes deep on production planning and scheduling, with an implementation team. Tonbab puts every department in one system — purchasing and production through to accounting, retail, CRM and payroll."),
        bi("MineERP ไม่มีบัญชีในตัวและเชื่อมกับ FlowAccount แทน ใน Tonbab การรับสินค้า เบิกวัตถุดิบ และส่งของลงบัญชีด้วยต้นทุนจริงในระบบเดียว", "MineERP has no built-in accounting and links to FlowAccount instead. In Tonbab, goods receipts, material issues and deliveries post to the ledger at real cost in the same system."),
      ] },
      { h: bi("ราคาและวิธีเริ่มต้น", "Price and how you start"), p: [
        bi(`MineERP คิดตามจำนวนผู้ใช้ เริ่ม ฿46,800/ปี บวกค่าวางระบบ ฿50,000 ขึ้นไป Tonbab คิดต่อบริษัท ทุกแพ็กเกจได้ทุกฟีเจอร์ ต่างกันแค่ขนาด เช่น Standard ${B.standard}/ปี สำหรับ 10 ผู้ใช้ หรือ Business ${B.business}/ปี สำหรับ 25 ผู้ใช้ สมัครแล้วใช้ได้ทันทีพร้อมทดลอง 30 วัน`, `MineERP prices by user tier from ฿46,800/yr plus onboarding from ฿50,000. Tonbab prices per company with every feature on every plan — e.g. Standard at ${B.standard}/yr for 10 users or Business at ${B.business}/yr for 25 — and you can start today with a 30-day trial.`),
      ] },
    ],
    chooseThem: [
      bi("ต้องการวางแผนและจัดลำดับการผลิตด้วย AI แบบ Gantt", "You want AI production scheduling on a Gantt chart."),
      bi("ต้องการทีมที่ปรึกษาเข้ามาวางระบบให้ทั้งโรงงาน และใช้สิทธิ์อุดหนุน depa", "You want a consulting team to implement the whole factory, using a depa subsidy."),
    ],
    chooseTonbab: [
      bi("ต้องการบัญชีในระบบเดียวกับการผลิตและสต็อก ไม่ต้องเชื่อมโปรแกรมแยก", "You want accounting in the same system as production and stock, with no separate app to connect."),
      bi("ต้องการ POS CRM และ HR/เงินเดือนด้วย", "You also need POS, CRM and HR/payroll."),
      bi("อยากเริ่มเองได้ทันทีด้วยงบที่ต่ำกว่า", "You want to start yourself today, on a smaller budget."),
    ],
    faq: [
      { q: bi("MineERP ราคาเท่าไร?", "How much does MineERP cost?"), a: bi("ตามหน้า mineerp.com/pricing (19 พ.ย. 2569) แพ็กเกจ Trader เริ่ม ฿46,800/ปี (5 ผู้ใช้) และ Manufacturer เริ่ม ฿70,800/ปี (5 ผู้ใช้) บวกค่าวางระบบ ฿50,000–140,000 ครั้งเดียว ราคาก่อน VAT", "Per mineerp.com/pricing (19 Nov 2026): Trader from ฿46,800/yr (5 users) and Manufacturer from ฿70,800/yr (5 users), plus a one-time onboarding fee of ฿50,000–140,000, before VAT.") },
      { q: bi("MineERP มีระบบบัญชีไหม?", "Does MineERP include accounting?"), a: bi("ไม่มีในตัว เว็บไซต์ระบุว่าส่งออกเป็น Excel หรือเชื่อม FlowAccount ผ่าน API ส่วน Tonbab มีบัญชีรวมในทุกแพ็กเกจ", "Not built in — its site says it exports to Excel or connects to FlowAccount by API. Tonbab includes accounting in every plan.") },
      faqMigrate("MineERP"),
      faqTry,
    ],
  },

  // ────────────────────────────────────────────────────────────── ZORT
  {
    slug: "zort",
    name: "ZORT",
    category: "inventory",
    keyword: bi("ทางเลือก ZORT", "ZORT alternative"),
    verified: bi("ข้อมูล ZORT ตรวจจาก zortout.com/package เมื่อ 19 พ.ย. 2569", "ZORT facts checked on zortout.com/package, 19 Nov 2026"),
    sources: [{ label: "zortout.com/package", url: "https://zortout.com/package" }],
    summary: bi(
      "ZORT เป็นระบบจัดการสต็อกและออเดอร์ออนไลน์ที่ร้านค้าบนมาร์เก็ตเพลสในไทยนิยม เด่นเรื่องดึงออเดอร์และตัดสต็อกข้าม Shopee Lazada TikTok Tonbab เป็น ERP ที่มีสต็อก จัดซื้อ การผลิต POS บัญชี และ HR ในระบบเดียว คิดราคาต่อบริษัทแทนต่อผู้ใช้",
      "ZORT is an inventory and online-order system popular with Thai marketplace sellers — strong at pulling orders and syncing stock across Shopee, Lazada and TikTok. Tonbab is an ERP with stock, purchasing, manufacturing, POS, accounting and HR in one system, priced per company instead of per user.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ระบบสต็อกและออเดอร์ออนไลน์ (OMS)", "Inventory and online order management (OMS)"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย (ต่อปี)", "Published price (per year)", bi("Starter ฿6,300 · Professional ฿15,000 · Business ฿24,000 (หรือรายไตรมาส)", "Starter ฿6,300 · Professional ฿15,000 · Business ฿24,000 (or quarterly)"), TONBAB_PRICE),
      row("ผู้ใช้", "Users", bi("1–3 คน · เพิ่มผู้ใช้ ฿3,900/คน/ปี", "1–3 users · extra user ฿3,900/yr each"), TONBAB_USERS),
      row("ออเดอร์ต่อเดือน", "Orders per month", bi("1,000–2,000 · เพิ่ม 1,000 ออเดอร์ ฿3,500/ปี", "1,000–2,000 · +1,000 orders ฿3,500/yr"), bi("Free 300 · Starter 1,000 · Standard 3,000 · Business ไม่จำกัด", "Free 300 · Starter 1,000 · Standard 3,000 · Business unlimited")),
      row("ช่องทางขายออนไลน์", "Marketplace channels", bi("จุดแข็งหลัก — 1–3 ช่องทางตามแพ็กเกจ เพิ่ม ฿5,200/ช่องทาง/ปี", "Core strength — 1–3 channels by plan, +฿5,200/channel/yr"), bi(`LINE Shopee Lazada Meta Shopify TikTok — บริการเสริม ${B.channels}/ปี (Business)`, `LINE, Shopee, Lazada, Meta, Shopify, TikTok — ${B.channels}/yr add-on (Business)`)),
      row("การผลิต", "Manufacturing", bi("ทำได้แค่จัดชุดสินค้า (kitting)", "Kitting only"), TONBAB_MFG),
      row("บัญชี", "Accounting", bi("เชื่อมกับ PEAK และโปรแกรมบัญชีอื่น", "Connects to PEAK and other accounting apps"), TONBAB_ACC),
      row("HR / เงินเดือน", "HR / payroll", bi("ไม่มี", "No"), TONBAB_HR),
    ],
    plans: [
      { name: same("Starter"), price: bi("฿1,800/3 เดือน หรือ ฿6,300/ปี", "฿1,800/3 mo or ฿6,300/yr"), note: bi("1,000 ออเดอร์/เดือน · 1 ผู้ใช้ · 1 คลัง", "1,000 orders/mo · 1 user · 1 warehouse") },
      { name: same("Professional"), price: bi("฿4,500/3 เดือน หรือ ฿15,000/ปี", "฿4,500/3 mo or ฿15,000/yr"), note: bi("2,000 ออเดอร์ · 3 ผู้ใช้ · 2 คลัง · 1 ช่องทาง", "2,000 orders · 3 users · 2 warehouses · 1 channel") },
      { name: same("Business"), price: bi("฿8,000/3 เดือน หรือ ฿24,000/ปี", "฿8,000/3 mo or ฿24,000/yr"), note: bi("2,000 ออเดอร์ · 3 ผู้ใช้ · 2 คลัง · 3 ช่องทาง", "2,000 orders · 3 users · 2 warehouses · 3 channels") },
    ],
    plansNote: bi("ไม่มีแพ็กเกจรายเดือน บริการเสริมต่อปี: ผู้ใช้ +1 ฿3,900 · คลัง +1 ฿3,900 · ช่องทาง +1 ฿5,200 · ออเดอร์ +1,000 ฿3,500", "No plain monthly plan. Yearly add-ons: +1 user ฿3,900 · +1 warehouse ฿3,900 · +1 channel ฿5,200 · +1,000 orders ฿3,500."),
    scenario: {
      title: bi("ร้านทีม 5 คน 2 คลัง ประมาณ 2,000 ออเดอร์ต่อเดือน ขายบนมาร์เก็ตเพลส", "A 5-person shop with 2 warehouses, ~2,000 orders a month, selling on marketplaces"),
      them: bi("Professional ฿15,000 + ผู้ใช้เพิ่ม 2 คน ฿7,800", "Professional ฿15,000 + 2 extra users ฿7,800"),
      themTotal: bi("≈ ฿22,800 ต่อปี (ไม่รวมบัญชี)", "≈ ฿22,800 per year (accounting not included)"),
      tonbab: bi(`Business ${B.business} + ทุกช่องทางขาย ${B.channels} — 25 ผู้ใช้ ออเดอร์ไม่จำกัด บัญชี POS`, `Business ${B.business} + all sales channels ${B.channels} — 25 users, unlimited orders, accounting, POS`),
      tonbabTotal: bi(`${baht(TONBAB_YEARLY.business + TONBAB_YEARLY.channels)} ต่อปี`, `${baht(TONBAB_YEARLY.business + TONBAB_YEARLY.channels)} per year`),
      note: bi(`ถ้าธุรกิจคุณคือขายบนมาร์เก็ตเพลสเป็นหลัก ZORT ถูกกว่าและเชี่ยวชาญด้านนี้มานาน Tonbab คุ้มเมื่อคุณมีหน้าร้าน ขายส่ง ผลิตเอง หรือต้องการบัญชีและเงินเดือนในระบบเดียว ถ้าไม่ต้องดึงออเดอร์จากมาร์เก็ตเพลส Standard ${B.standard} รองรับ 3,000 ออเดอร์ต่อเดือนและ 10 ผู้ใช้`, `If you mostly sell on marketplaces, ZORT is cheaper and has long, focused experience there. Tonbab pays off when you also run a shop counter, wholesale or your own production, or want accounting and payroll in one system. Without marketplace order sync, Standard at ${B.standard} covers 3,000 orders a month and 10 users.`),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("ZORT ทำเรื่องเดียวและทำได้ดี คือรวมออเดอร์จากหลายช่องทางและตัดสต็อกให้ตรงกัน Tonbab ครอบคลุมงานทั้งบริษัท ตั้งแต่สั่งซื้อจากซัพพลายเออร์ ผลิต เก็บสต็อก ขายหน้าร้านและออนไลน์ จนถึงบัญชีและเงินเดือน", "ZORT does one thing well: gathering orders from many channels and keeping stock in sync. Tonbab covers the whole company — buying from suppliers, producing, storing, selling in store and online, through to accounting and payroll."),
        bi("ZORT คิดราคาตามผู้ใช้ คลัง และช่องทาง ซึ่งเพิ่มขึ้นเร็วเมื่อทีมโต Tonbab คิดต่อบริษัท Business ได้ 25 ผู้ใช้และคลัง 10 แห่งในราคาเดียว", "ZORT prices by user, warehouse and channel, which climbs quickly as the team grows. Tonbab prices per company — Business includes 25 users and 10 warehouses at one price."),
      ] },
    ],
    chooseThem: [
      bi("ขายออนไลน์บนมาร์เก็ตเพลสเป็นหลัก และต้องการระบบที่เชี่ยวชาญด้านนี้โดยเฉพาะ", "You sell mainly on marketplaces and want a specialist tool for that."),
      bi("ทีมเล็ก 1–3 คน และใช้โปรแกรมบัญชีแยกอยู่แล้ว", "Your team is 1–3 people and you already use separate accounting software."),
    ],
    chooseTonbab: [
      bi("มีทั้งหน้าร้าน ออนไลน์ และขายส่ง และต้องการทุกช่องทางในสต็อกชุดเดียว", "You sell in store, online and wholesale and want every channel on one stock."),
      bi("ผลิตหรือแพ็กสินค้าเอง ต้องการ BOM และต้นทุนจริง", "You produce or pack your own products and need BOMs and real cost."),
      bi("ทีมโตเกิน 3 คน และอยากได้บัญชีกับเงินเดือนในระบบเดียว", "Your team is past 3 people and you want accounting and payroll in the same system."),
    ],
    faq: [
      { q: bi("ZORT ราคาเท่าไร?", "How much does ZORT cost?"), a: bi("ตาม zortout.com/package (19 พ.ย. 2569) Starter ฿6,300/ปี Professional ฿15,000/ปี Business ฿24,000/ปี หรือจ่ายรายไตรมาส ผู้ใช้เพิ่ม ฿3,900/คน/ปี", "Per zortout.com/package (19 Nov 2026): Starter ฿6,300/yr, Professional ฿15,000/yr, Business ฿24,000/yr, or quarterly; extra users ฿3,900/yr each.") },
      faqMigrate("ZORT"),
      faqTry,
    ],
  },

  // ─────────────────────────────────────────────────────────── Express
  {
    slug: "express",
    name: "Express",
    category: "accounting",
    keyword: bi("ทางเลือกโปรแกรมบัญชี Express", "Express accounting alternative"),
    verified: bi("ข้อมูล Express จากเว็บไซต์และเอกสารของผู้พัฒนา ตรวจเมื่อ ส.ค. 2569 — ราคาปัจจุบันโปรดสอบถามตัวแทนจำหน่าย", "Express facts from the vendor's website and documentation, checked Aug 2026 — ask a dealer for current prices"),
    sources: [],
    summary: bi(
      "Express เป็นโปรแกรมบัญชีแบบติดตั้งบนเครื่องที่ธุรกิจไทยใช้มานาน นักบัญชีคุ้นเคย ส่วน Tonbab เป็นระบบคลาวด์ ใช้ได้ทุกที่ทุกอุปกรณ์ มีบัญชีรวมในทุกแพ็กเกจ และครอบคลุมงานผลิต สต็อก POS และงานขาย",
      "Express is long-established Thai on-premise accounting software that accountants know well. Tonbab is cloud-based, works on any device, includes accounting in every plan, and covers manufacturing, stock, POS and sales.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("โปรแกรมบัญชี ติดตั้งบนเครื่อง", "Accounting, installed on-premise"), bi("ERP บนคลาวด์ เว็บ มือถือ แท็บเล็ต", "Cloud ERP on web, phone and tablet")),
      row("ราคาที่เปิดเผย", "Published price", bi("฿19,000–39,000 ซื้อขาด (ส.ค. 2569)", "฿19,000–39,000 one-time (Aug 2026)"), TONBAB_PRICE),
      row("ต้นทุนการผลิต / ต้นทุนรายงาน", "Production / per-job costing", bi("เอกสารระบุว่าไม่รองรับระบบต้นทุนการผลิต และสรุปต้นทุนแยก Job ไม่ได้", "Documentation states no production costing and no per-job cost summary"), bi("มี — ต้นทุนงาน (Job Control) และต้นทุนใบสั่งผลิต", "Yes — Job Control costing and work-order cost")),
      row("บัญชีและภาษีไทย", "Accounting & Thai tax", bi("มี — จุดแข็งหลัก", "Yes — a core strength"), TONBAB_TAX),
      row("ใช้นอกออฟฟิศ / มือถือ", "Away from the office / mobile", bi("ติดตั้งบนเครื่อง", "Installed on a PC"), TONBAB_APP),
    ],
    plans: [],
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Express ซื้อขาดและทำงานบนเครื่องในออฟฟิศ เหมาะกับฝ่ายบัญชีที่ทำงานที่โต๊ะเดียว Tonbab ทำงานบนคลาวด์ ทุกฝ่ายเห็นข้อมูลชุดเดียวกันแบบเรียลไทม์ ไม่ต้องดูแลเซิร์ฟเวอร์หรือสำรองข้อมูลเอง", "Express is a one-time purchase that runs on an office PC — fine for an accounting team at one desk. Tonbab runs in the cloud: every department sees the same live data, with no server or backups to look after."),
      ] },
      youtUse("Express"),
    ],
    chooseThem: [bi("ต้องการโปรแกรมที่ติดตั้งในเครื่องและไม่ต้องการออนไลน์", "You want software installed locally and don't want to be online.")],
    chooseTonbab: [
      bi("ทีมทำงานหลายที่ และต้องการให้ทุกฝ่ายเห็นข้อมูลชุดเดียวแบบเรียลไทม์", "Your team works in several places and every department should see the same live data."),
      bi("ต้องการต้นทุนงานและต้นทุนการผลิต", "You need job costing and production costing."),
    ],
    faq: [faqMigrate("Express"), faqTry],
  },

  // ─────────────────────────────────────────────────────────── Prosoft
  {
    slug: "prosoft",
    name: "Prosoft WINSpeed",
    category: "erp",
    keyword: bi("ทางเลือก Prosoft WINSpeed และ myAccount Cloud", "Prosoft WINSpeed and myAccount Cloud alternative"),
    verified: bi("ข้อมูล Prosoft ตรวจจาก prosoftwinspeed.com และหน้าราคา myAccount Cloud เมื่อ 19 พ.ย. 2569", "Prosoft facts checked on prosoftwinspeed.com and the myAccount Cloud price page, 19 Nov 2026"),
    sources: [
      { label: "prosoftwinspeed.com", url: "https://www.prosoftwinspeed.com/" },
      { label: "myAccount Cloud price", url: "https://www.myaccount-cloud.com/Article/Detail/58639" },
    ],
    summary: bi(
      "Prosoft เป็นผู้พัฒนาซอฟต์แวร์บัญชีและ ERP รายใหญ่ของไทย WINSpeed เป็น ERP เต็มรูปแบบสำหรับองค์กรขนาดกลางถึงใหญ่ วางระบบผ่านทีมงาน ส่วน myAccount Cloud เป็นโปรแกรมบัญชีสำหรับ SME POS เงินเดือน และ CRM เป็นผลิตภัณฑ์แยก Tonbab รวมทุกอย่างไว้ในระบบเดียว ราคาเดียว สมัครใช้เองได้",
      "Prosoft is a major Thai accounting and ERP developer. WINSpeed is a full ERP for mid-to-large companies, implemented by a project team; myAccount Cloud is SME accounting. POS, payroll and CRM are separate Prosoft products. Tonbab puts everything in one system, at one price, and you can sign up yourself.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("WINSpeed: ERP (คลาวด์หรือติดตั้งเอง) · myAccount Cloud: บัญชี SME", "WINSpeed: ERP (cloud or on-premise) · myAccount Cloud: SME accounting"), TONBAB_TYPE),
      row("ราคา", "Price", bi("WINSpeed ไม่มีราคาตั้ง — ไลเซนส์+วางระบบราว ฿250,000–2,000,000 ค่าดูแล 10%/ปี · myAccount Cloud ฿5,000–19,000/ปี ไม่รวมค่าเช่าคลาวด์", "WINSpeed has no list price — licence + implementation roughly ฿250,000–2,000,000, 10%/yr maintenance · myAccount Cloud ฿5,000–19,000/yr excluding cloud hosting"), TONBAB_PRICE),
      row("การผลิต", "Manufacturing", bi("WINSpeed มีวางแผนการผลิตและต้นทุน · myAccount Cloud ไม่พบ", "WINSpeed has production planning and costing · not found in myAccount Cloud"), TONBAB_MFG),
      row("บัญชีและภาษีไทย", "Accounting & Thai tax", bi("มี — จุดแข็งหลัก รวม e-Tax", "Yes — a core strength, including e-Tax"), TONBAB_ACC),
      row("POS / เงินเดือน / CRM", "POS / payroll / CRM", bi("ผลิตภัณฑ์แยก (Prosoft POS, HRMI, CRM) เชื่อมกันผ่าน API", "Separate products (Prosoft POS, HRMI, CRM) connected by API"), bi("อยู่ในระบบเดียว ฐานข้อมูลเดียว", "In one system, one database")),
      row("เริ่มใช้งาน", "Getting started", bi("ผ่านทีมขายและวางระบบ · myAccount ทดลอง 60 วัน", "Through sales and implementation · myAccount 60-day trial"), bi("สมัครเองได้ทันที ทดลอง Business 30 วัน", "Sign up yourself today, 30-day Business trial")),
    ],
    plans: [
      { name: bi("myAccount Cloud (รายปี)", "myAccount Cloud (yearly)"), price: same("฿5,000 / ฿9,000 / ฿10,800 / ฿19,000"), note: bi("1 / 5 / 10 / ไม่จำกัดผู้ใช้ (10 ผู้ใช้เป็นราคาโปร ปกติ ฿15,000) ไม่รวมค่าเช่าคลาวด์", "1 / 5 / 10 / unlimited users (10 users is a promo, normally ฿15,000); cloud hosting extra") },
      { name: bi("myAccount Cloud (ซื้อขาด)", "myAccount Cloud (perpetual)"), price: same("฿19,000 / ฿29,000 / ฿39,000 / ฿49,000"), note: bi("1 / 5 / 10 / ไม่จำกัดผู้ใช้ · บริการเสริม ฿9,000/ตัว", "1 / 5 / 10 / unlimited users · add-ons ฿9,000 each") },
      { name: same("WINSpeed"), price: bi("ไม่เปิดเผย ราว ฿250,000–2,000,000", "Not published, roughly ฿250,000–2,000,000"), note: bi("ไลเซนส์ + วางระบบ ค่าดูแลรายปี 10% ของมูลค่าซอฟต์แวร์", "Licence + implementation; maintenance 10% of software value per year") },
    ],
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Prosoft มีผลิตภัณฑ์ครบแต่แยกเป็นหลายตัว คุณซื้อบัญชี POS เงินเดือน และ CRM แยกกันแล้วเชื่อมเข้าหากัน Tonbab ออกแบบเป็นระบบเดียวตั้งแต่ต้น เอกสารทุกใบอยู่ในฐานข้อมูลเดียวกัน", "Prosoft covers a lot, but as separate products — you buy accounting, POS, payroll and CRM separately and connect them. Tonbab was designed as one system from the start, with every document in one database."),
        bi("WINSpeed เหมาะกับองค์กรที่มีงบวางระบบหลักแสนถึงหลักล้าน Tonbab เหมาะกับ SME ที่อยากเริ่มเร็ว จ่ายรายปีต่อบริษัท และไม่ต้องมีโครงการวางระบบ", "WINSpeed suits organisations with implementation budgets in the hundreds of thousands to millions of baht. Tonbab suits SMEs that want to start quickly, pay yearly per company, and skip the implementation project."),
      ] },
    ],
    chooseThem: [
      bi("องค์กรขนาดกลางถึงใหญ่ ต้องการปรับแต่งระบบมากและมีงบวางระบบ", "You're a mid-to-large organisation that needs heavy customisation and has an implementation budget."),
      bi("ต้องการติดตั้งระบบบนเซิร์ฟเวอร์ของตัวเอง หรือต้องการ e-Tax Invoice ตอนนี้", "You need the system on your own servers, or e-Tax Invoice today."),
    ],
    chooseTonbab: [
      bi("ต้องการบัญชี สต็อก ผลิต POS CRM และเงินเดือนในระบบเดียว ไม่ต้องเชื่อมหลายโปรแกรม", "You want accounting, stock, production, POS, CRM and payroll in one system without connecting several products."),
      bi("อยากเริ่มใช้ภายในวันนี้ ด้วยงบหลักพันถึงหลักหมื่นต่อปี", "You want to start today, on a budget of thousands rather than hundreds of thousands per year."),
    ],
    faq: [
      { q: bi("Prosoft WINSpeed ราคาเท่าไร?", "How much does Prosoft WINSpeed cost?"), a: bi("Prosoft ไม่เปิดเผยราคาตั้ง เว็บไซต์ WINSpeed ระบุว่าไลเซนส์และการวางระบบอยู่ราว ฿250,000–2,000,000 ขึ้นกับจำนวนผู้ใช้และการปรับแต่ง และค่าดูแลรายปี 10% ของมูลค่าซอฟต์แวร์ (ตรวจ 19 พ.ย. 2569)", "Prosoft publishes no list price. The WINSpeed site gives roughly ฿250,000–2,000,000 for licence and implementation depending on users and customisation, with yearly maintenance at 10% of software value (checked 19 Nov 2026).") },
      faqMigrate("Prosoft"),
      faqTry,
    ],
  },

  // ──────────────────────────────────────────────────────────── Odoo
  {
    slug: "odoo",
    name: "Odoo",
    category: "erp",
    keyword: bi("ทางเลือก Odoo", "Odoo alternative"),
    verified: bi("ราคา Odoo ตรวจจาก odoo.com/th_TH/pricing เมื่อ 19 พ.ย. 2569 ข้อมูลภาษาไทยและภาษีไทยจากเอกสารของ Odoo ตรวจเมื่อ ส.ค. 2569", "Odoo prices checked on odoo.com/th_TH/pricing, 19 Nov 2026; Thai-language and Thai-tax facts from Odoo's documentation, Aug 2026"),
    sources: [{ label: "odoo.com/th_TH/pricing", url: "https://www.odoo.com/th_TH/pricing" }],
    summary: bi(
      "Odoo เป็น ERP ระดับโลกที่มีแอปมากมายและปรับแต่งได้สูง คิดราคาต่อผู้ใช้เป็นดอลลาร์ และมักต้องใช้พาร์ทเนอร์วางระบบ Tonbab เป็น ERP ที่สร้างเพื่อธุรกิจไทยตั้งแต่ต้น ภาษาไทยครบทุกหน้า คิดราคาต่อบริษัทเป็นเงินบาท และสมัครใช้เองได้",
      "Odoo is a global ERP with a huge app catalogue and deep customisation, priced per user in US dollars and usually implemented by a partner. Tonbab was built for Thai businesses from day one — fully Thai interface, per-company pricing in baht, self-serve signup.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ERP ระดับโลก แอปจำนวนมาก", "Global ERP with many apps"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย", "Published price", bi("Standard US$16.90/ผู้ใช้/เดือน (รายปี; ลูกค้าใหม่ 12 เดือนแรก US$13.50) · Custom US$32.00 (US$25.50) · ไม่มีราคาเงินบาท", "Standard US$16.90/user/mo (yearly; US$13.50 for new customers' first 12 months) · Custom US$32.00 (US$25.50) · no THB price"), TONBAB_PRICE),
      row("ภาษาไทยในหน้าจอ", "Thai interface", bi("แปลไทยราว 69% บน v19 (ข้อมูลของ Odoo, ส.ค. 2569)", "About 69% translated to Thai on v19 (Odoo's own data, Aug 2026)"), TONBAB_LANG),
      row("ภาษีไทย", "Thai tax", bi("รายงานภาษีไทยอยู่ใน Enterprise · เอกสารระบุว่าออก 50 ทวิ ไม่ได้", "Thai tax reports are Enterprise-only · docs say it can't produce the 50 Tawi certificate"), TONBAB_TAX),
      row("การผลิต", "Manufacturing", bi("มี — MRP เต็มรูปแบบ", "Yes — full MRP"), TONBAB_MFG),
      row("การวางระบบ", "Implementation", bi("ส่วนใหญ่ผ่านพาร์ทเนอร์ คิดค่าบริการแยก", "Usually through a partner, billed separately"), bi(`สมัครเองได้ทันที หรือบริการตั้งค่า ${B.setup}`, `Self-serve today, or a ${B.setup} setup service`)),
    ],
    plans: [
      { name: same("One App Free"), price: same("US$0"), note: bi("แอปเดียว ผู้ใช้ไม่จำกัด", "One app, unlimited users") },
      { name: same("Standard"), price: bi("US$16.90/ผู้ใช้/เดือน (รายปี) · US$21.10 รายเดือน", "US$16.90/user/mo yearly · US$21.10 monthly"), note: bi("ทุกแอปบน Odoo Online · ลูกค้าใหม่ลดเหลือ US$13.50 ใน 12 เดือนแรก", "All apps on Odoo Online · US$13.50 for new customers' first 12 months") },
      { name: same("Custom"), price: bi("US$32.00/ผู้ใช้/เดือน (รายปี) · US$40.00 รายเดือน", "US$32.00/user/mo yearly · US$40.00 monthly"), note: bi("Studio หลายบริษัท API ภายนอก Odoo.sh หรือติดตั้งเอง · ลูกค้าใหม่ลดเหลือ US$25.50 ใน 12 เดือนแรก", "Studio, multi-company, external API, Odoo.sh or on-premise · US$25.50 for new customers' first 12 months") },
      { name: same("Light User"), price: bi("US$5.90/ผู้ใช้/เดือน", "US$5.90/user/mo"), note: bi("ผู้ใช้สิทธิ์จำกัด", "Limited-access users") },
    ],
    plansNote: bi("หน้าราคาภาษาไทยของ Odoo แสดงเป็นดอลลาร์สหรัฐ ส่วนลดลูกค้าใหม่มีอายุ 12 เดือน ค่าวางระบบของพาร์ทเนอร์ไม่รวม", "Odoo's Thai pricing page shows US dollars; the new-customer discount lasts 12 months. Partner implementation fees are extra."),
    scenario: {
      title: bi("บริษัท 20 ผู้ใช้ ต้องการสต็อก ผลิต บัญชี และ CRM", "A 20-user company that needs stock, manufacturing, accounting and CRM"),
      them: bi("Odoo Standard 20 ผู้ใช้ × US$16.90 × 12 เดือน + ค่าวางระบบของพาร์ทเนอร์", "Odoo Standard 20 users × US$16.90 × 12 months + partner implementation"),
      themTotal: bi("≈ US$4,056 ต่อปี (≈ ฿130,000 ที่ราว 33 บาท/ดอลลาร์) + ค่าวางระบบ", "≈ US$4,056 per year (≈ ฿130,000 at about 33 THB/USD) + implementation"),
      tonbab: bi(`Business ${B.business} — 25 ผู้ใช้ ทุกโมดูล`, `Business ${B.business} — 25 users, every module`),
      tonbabTotal: bi(`${B.business} ต่อปี`, `${B.business} per year`),
      note: bi("อัตราแลกเปลี่ยนเป็นตัวเลขประมาณของเรา ไม่ใช่ของ Odoo ปีแรกลูกค้าใหม่จ่าย US$13.50 (≈ US$3,240 ต่อปีสำหรับ 20 ผู้ใช้) ถ้าต้องการปรับแต่งระบบมาก หรือใช้แอปที่ Tonbab ไม่มี Odoo ยืดหยุ่นกว่า", "The exchange rate is our approximation, not Odoo's. In the first year a new customer pays US$13.50 (≈ US$3,240 a year for 20 users). If you need heavy customisation or apps Tonbab doesn't have, Odoo is more flexible."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Odoo ยืดหยุ่นมากและมีแอปเกือบทุกอย่าง แต่ภาษาไทยและภาษีไทยไม่ได้อยู่ในแกนหลัก ต้องพึ่งพาร์ทเนอร์หรือโมดูลชุมชน Tonbab ออกแบบเอกสาร ภาษี และหน้าจอเป็นภาษาไทยตั้งแต่ต้น", "Odoo is very flexible with an app for almost everything, but Thai language and Thai tax aren't in its core — you rely on partners or community modules. Tonbab designs documents, tax and the interface in Thai from the start."),
        bi("Odoo คิดต่อผู้ใช้ ค่าใช้จ่ายจึงโตตามจำนวนคน Tonbab คิดต่อบริษัท Business ได้ 25 ผู้ใช้ในราคาเดียว", "Odoo charges per user, so cost grows with headcount. Tonbab charges per company — Business includes 25 users at one price."),
      ] },
    ],
    chooseThem: [
      bi("ต้องการปรับแต่งระบบลึก หรือใช้แอปเฉพาะทางที่ Tonbab ยังไม่มี", "You need deep customisation or specialised apps Tonbab doesn't have yet."),
      bi("มีพาร์ทเนอร์ Odoo ที่ไว้ใจได้และงบวางระบบ", "You have a trusted Odoo partner and an implementation budget."),
    ],
    chooseTonbab: [
      bi("ต้องการหน้าจอและเอกสารภาษาไทยครบ พร้อมภาษีไทยในตัว", "You want a complete Thai interface and documents, with Thai tax built in."),
      bi("ต้องการราคาเป็นเงินบาทต่อบริษัท ไม่ใช่ดอลลาร์ต่อผู้ใช้", "You want per-company pricing in baht, not dollars per user."),
    ],
    faq: [
      { q: bi("Odoo ราคาเท่าไรในไทย?", "How much is Odoo in Thailand?"), a: bi("หน้าราคาภาษาไทยของ Odoo (19 พ.ย. 2569) แสดง Standard US$16.90 และ Custom US$32.00 ต่อผู้ใช้ต่อเดือนเมื่อจ่ายรายปี ลูกค้าใหม่ได้ส่วนลดเหลือ US$13.50 และ US$25.50 ใน 12 เดือนแรก ไม่รวมค่าวางระบบของพาร์ทเนอร์", "Odoo's Thai pricing page (19 Nov 2026) shows Standard at US$16.90 and Custom at US$32.00 per user per month billed yearly, discounted to US$13.50 and US$25.50 for a new customer's first 12 months, excluding partner implementation.") },
      faqMigrate("Odoo"),
      faqTry,
    ],
  },

  // ──────────────────────────────────────────────────── SAP Business One
  {
    slug: "sap-business-one",
    name: "SAP Business One",
    category: "erp",
    keyword: bi("ทางเลือก SAP Business One", "SAP Business One alternative"),
    verified: bi("ข้อมูล SAP Business One จากหน้าพาร์ทเนอร์ในไทยและแหล่งราคาภายนอก ตรวจเมื่อ 18 พ.ย. 2569 — SAP ไม่เผยแพร่ราคาตั้ง", "SAP Business One facts from Thai partner pages and third-party price sources, checked 18 Nov 2026 — SAP publishes no list price"),
    sources: [
      { label: "Humanica Thai localization add-on", url: "https://www.humanica.com/en/?p=11789" },
      { label: "NS Solutions Thailand", url: "https://global.nssol.nipponsteel.com/th/our-solutions/solutions/erp/sap-business-one.html" },
      { label: "Seidor price guide (estimate)", url: "https://www.seidor.com/en-es/blog-pyme/full-guide-pricing-and-licenses-sap-business-one" },
    ],
    summary: bi(
      "SAP Business One เป็น ERP ระดับโลกสำหรับธุรกิจขนาดกลาง แบรนด์แข็งแรงและครบเครื่อง ขายและวางระบบผ่านพาร์ทเนอร์ ภาษีไทยมาจากโมดูลเสริมของพาร์ทเนอร์ Tonbab เป็น ERP ไทยที่มีภาษีไทยในตัว ราคาเปิดเผยต่อบริษัท และเริ่มใช้ได้ทันทีโดยไม่ต้องมีโครงการวางระบบหลายเดือน",
      "SAP Business One is a global ERP for mid-sized companies — a strong brand and very complete, sold and implemented through partners, with Thai tax from partner add-ons. Tonbab is a Thai ERP with Thai tax built in, published per-company pricing, and no months-long implementation project.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ERP ระดับโลกสำหรับธุรกิจขนาดกลาง", "Global ERP for mid-sized companies"), TONBAB_TYPE),
      row("ราคา", "Price", bi("SAP ไม่เผยแพร่ราคา · ประมาณการภายนอก US$110–219/ผู้ใช้/เดือน + วางระบบ US$25,000–100,000", "SAP publishes no price · third-party estimates US$110–219/user/mo + implementation US$25,000–100,000"), TONBAB_PRICE),
      row("ภาษีไทย", "Thai tax", bi("ผ่านโมดูลเสริมของพาร์ทเนอร์ (VAT WHT e-Tax ภ.พ.30 ภ.ง.ด.3/53)", "Through partner add-ons (VAT, WHT, e-Tax, PP30, PND 3/53)"), TONBAB_TAX),
      row("ระยะเวลาวางระบบ", "Implementation time", bi("พาร์ทเนอร์ระบุโดยทั่วไป 6–12 เดือน", "Partners cite 6–12 months typically"), bi("เริ่มใช้ได้วันแรก ตั้งค่าเสร็จในไม่กี่วัน", "Usable on day one, set up in days")),
      row("การผลิต", "Manufacturing", bi("มี — BOM และการผลิต", "Yes — BOM and production"), TONBAB_MFG),
    ],
    plans: [],
    plansNote: bi("SAP ไม่เผยแพร่ราคาตั้ง และพาร์ทเนอร์ในไทยที่เราตรวจไม่ได้แสดงราคาเงินบาท ตัวเลขข้างต้นเป็นประมาณการจากแหล่งภายนอก", "SAP publishes no list price and the Thai partners we checked show no baht prices; the figures above are third-party estimates."),
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("SAP Business One เหมาะกับบริษัทที่ต้องการมาตรฐานระดับโลก เช่น บริษัทลูกของต่างชาติที่รายงานกลับบริษัทแม่ แต่ต้องใช้งบและเวลาวางระบบสูง Tonbab เหมาะกับ SME ไทยที่อยากได้ระบบครบ ใช้ภาษาไทยเต็มรูปแบบ และเริ่มได้ทันที", "SAP Business One suits companies that need a global standard — for example, subsidiaries reporting to a foreign parent — but it takes a large budget and a long implementation. Tonbab suits Thai SMEs that want a complete, fully Thai system they can start using now."),
      ] },
    ],
    chooseThem: [
      bi("บริษัทแม่ใช้ SAP และต้องการให้ระบบตรงกัน", "Your parent company runs SAP and you need to match it."),
      bi("มีงบและเวลาสำหรับโครงการวางระบบหลายเดือน", "You have the budget and time for a multi-month implementation."),
    ],
    chooseTonbab: [
      bi("SME ที่ต้องการ ERP ครบในงบหลักหมื่นต่อปี", "You're an SME that wants a complete ERP for tens of thousands of baht per year."),
      bi("ต้องการภาษีไทยในตัว ไม่พึ่งโมดูลเสริม", "You want Thai tax built in, not as an add-on."),
    ],
    faq: [
      { q: bi("SAP Business One ราคาเท่าไรในไทย?", "How much is SAP Business One in Thailand?"), a: bi("SAP และพาร์ทเนอร์ในไทยที่เราตรวจไม่เผยแพร่ราคาเงินบาท ประมาณการจากแหล่งภายนอกอยู่ราว US$110–219 ต่อผู้ใช้ต่อเดือนสำหรับคลาวด์ บวกค่าวางระบบ US$25,000–100,000 ราคาจริงขึ้นกับพาร์ทเนอร์และขอบเขตงาน", "SAP and the Thai partners we checked don't publish baht prices. Third-party estimates put cloud at about US$110–219 per user per month plus US$25,000–100,000 implementation; real quotes depend on the partner and scope.") },
      faqMigrate("SAP Business One"),
      faqTry,
    ],
  },

  // ──────────────────────────────────────────────────────────── empeo
  {
    slug: "empeo",
    name: "empeo",
    category: "hr",
    keyword: bi("ทางเลือก empeo", "empeo alternative"),
    verified: bi("ข้อมูล empeo ตรวจจาก empeo.com/pricing (ตารางราคามีผล 15 ต.ค. 2569) เมื่อ 18 พ.ย. 2569", "empeo facts checked on empeo.com/pricing (price table effective 15 Oct 2026), 18 Nov 2026"),
    sources: [{ label: "empeo.com/pricing", url: "https://www.empeo.com/pricing" }],
    summary: bi(
      "empeo เป็นระบบ HR และเงินเดือนของไทยที่ครบและลึกด้านงานบุคคล ตั้งแต่เงินเดือน ประเมินผล KPI/OKR จนถึง engagement คิดราคาตามจำนวนพนักงาน Tonbab มี HR การลา เวลาทำงาน และเงินเดือนอยู่ในระบบเดียวกับบัญชี สต็อก และการขาย",
      "empeo is a Thai HR and payroll system that goes deep on people work — payroll, performance, KPI/OKR and engagement — priced by headcount. Tonbab has HR, leave, attendance and payroll in the same system as accounting, stock and sales.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ระบบ HR และเงินเดือน", "HR and payroll system"), TONBAB_TYPE),
      row("ราคา (≤20 พนักงาน)", "Price (≤20 staff)", bi("Lite ฿690 · Basic ฿1,290 · Pro ฿3,090 ต่อเดือน (รายปี = 10 เท่า)", "Lite ฿690 · Basic ฿1,290 · Pro ฿3,090 per month (yearly = 10×)"), bi(`Standard ${B.standard}/ปี (พนักงาน 50 คน) รวมทุกโมดูล`, `Standard ${B.standard}/yr (50 staff), every module included`)),
      row("เงินเดือน", "Payroll", bi("เริ่มที่ Basic (Lite ไม่มีเงินเดือน)", "From Basic (Lite has no payroll)"), bi("ทุกแพ็กเกจ — ภ.ง.ด.1 ประกันสังคม สลิป", "Every plan — PND 1, social security, payslips")),
      row("ประเมินผล / KPI", "Performance / KPI", bi("Pro และ Pro+ (PMS KPI OKR)", "Pro and Pro+ (PMS, KPI, OKR)"), bi("KPI สำหรับทีมขายใน CRM · ยังไม่มีระบบประเมินผล HR เต็มรูปแบบ", "Sales KPIs in CRM · no full HR performance system yet")),
      row("เครื่องสแกนเวลา", "Time clocks", bi("บริการเสริม เช่น เช็กอินด้วยพิกัด ฿50/คน/เดือน", "Add-ons such as geo check-in ฿50/person/mo"), bi(`เชื่อม HikCentral (บริการเสริม ${B.hikcentral}/ปี)`, `HikCentral link (${B.hikcentral}/yr add-on)`)),
      row("บัญชี สต็อก การขาย", "Accounting, stock, sales", bi("ไม่มี (ระบบ HR โดยเฉพาะ)", "No (HR-only)"), bi("มีในระบบเดียวกัน", "In the same system")),
    ],
    plans: [
      { name: bi("≤10 พนักงาน", "≤10 staff"), price: bi("฿390 / ฿690 / ฿1,690 / ฿2,090 / ฿4,690 ต่อเดือน", "฿390 / ฿690 / ฿1,690 / ฿2,090 / ฿4,690 per month"), note: same("Lite / Basic / Pro / Pro+ / Enterprise") },
      { name: bi("≤25 พนักงาน", "≤25 staff"), price: bi("฿790 / ฿1,540 / ฿3,790 / ฿4,990 / ฿9,900 ต่อเดือน", "฿790 / ฿1,540 / ฿3,790 / ฿4,990 / ฿9,900 per month"), note: same("Lite / Basic / Pro / Pro+ / Enterprise") },
      { name: bi("≤50 พนักงาน", "≤50 staff"), price: bi("฿1,390 / ฿2,890 / ฿6,990 / ฿9,790 / ฿17,900 ต่อเดือน", "฿1,390 / ฿2,890 / ฿6,990 / ฿9,790 / ฿17,900 per month"), note: same("Lite / Basic / Pro / Pro+ / Enterprise") },
    ],
    plansNote: bi("รายปีเท่ากับ 10 เท่าของรายเดือน เกิน 500 คนติดต่อฝ่ายขาย", "Yearly is 10× the monthly price; above 500 staff, contact sales."),
    scenario: {
      title: bi("บริษัท 20 คน ต้องการเงินเดือน การลา และเวลาทำงาน", "A 20-person company that needs payroll, leave and attendance"),
      them: bi("empeo Basic (≤20 พนักงาน) ฿1,290 × 10", "empeo Basic (≤20 staff) ฿1,290 × 10"),
      themTotal: bi("฿12,900 ต่อปี (HR อย่างเดียว)", "฿12,900 per year (HR only)"),
      tonbab: bi(`Standard ${B.standard} — เงินเดือน 50 คน การลา เวลาทำงาน พร้อมบัญชี สต็อก POS CRM`, `Standard ${B.standard} — payroll for 50, leave, attendance, plus accounting, stock, POS, CRM`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("ถ้างาน HR คือหัวใจ ต้องการประเมินผล KPI/OKR และ engagement แบบลึก empeo ครบกว่า", "If HR is the centre of your needs — performance reviews, KPI/OKR, engagement — empeo goes deeper."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("empeo เป็นผู้เชี่ยวชาญด้าน HR โดยเฉพาะ Tonbab ใส่ HR และเงินเดือนไว้ในระบบเดียวกับงานทั้งบริษัท พนักงานคนเดียวกันจึงเป็นทั้งผู้ใช้ระบบ ผู้อนุมัติ และพนักงานในเงินเดือน ไม่ต้องดูแลรายชื่อพนักงานสองที่", "empeo is an HR specialist. Tonbab puts HR and payroll in the same system as the rest of the company, so the same person is a user, an approver and an employee on payroll — no second staff list to maintain."),
      ] },
    ],
    chooseThem: [
      bi("ต้องการระบบประเมินผล KPI/OKR และ engagement แบบลึก", "You need deep performance, KPI/OKR and engagement tools."),
      bi("มีระบบ ERP อยู่แล้ว ต้องการแค่ HR", "You already have an ERP and only need HR."),
    ],
    chooseTonbab: [
      bi("ต้องการเงินเดือนและ HR ในระบบเดียวกับบัญชี สต็อก และการขาย", "You want payroll and HR in the same system as accounting, stock and sales."),
      bi("อยากจ่ายราคาเดียวต่อบริษัท แทนการจ่ายตามจำนวนพนักงาน", "You'd rather pay one per-company price than pay by headcount."),
    ],
    faq: [
      { q: bi("empeo ราคาเท่าไร?", "How much does empeo cost?"), a: bi("ตาม empeo.com/pricing (ตารางมีผล 15 ต.ค. 2569) สำหรับ ≤20 พนักงาน Lite ฿690 Basic ฿1,290 Pro ฿3,090 ต่อเดือน รายปีเท่ากับ 10 เท่าของรายเดือน แพ็กเกจ Lite ไม่มีเงินเดือน", "Per empeo.com/pricing (table effective 15 Oct 2026), for ≤20 staff: Lite ฿690, Basic ฿1,290, Pro ฿3,090 per month; yearly is 10× monthly. Lite has no payroll.") },
      faqMigrate("empeo"),
      faqTry,
    ],
  },

  // ────────────────────────────────────────────────────────── Loyverse
  {
    slug: "loyverse",
    name: "Loyverse",
    category: "pos",
    keyword: bi("ทางเลือก Loyverse POS", "Loyverse POS alternative"),
    verified: bi("ข้อมูล Loyverse ตรวจจาก loyverse.com/pricing เมื่อ 19 พ.ย. 2569", "Loyverse facts checked on loyverse.com/pricing, 19 Nov 2026"),
    sources: [{ label: "loyverse.com/pricing", url: "https://loyverse.com/pricing" }],
    summary: bi(
      "Loyverse เป็นแอป POS ฟรีที่ร้านเล็กทั่วโลกและในไทยนิยม ใช้ง่าย มีบริการเสริมรายเดือนเป็นดอลลาร์ Tonbab มี POS ทุกแพ็กเกจรวมแพ็กเกจ Free และต่อกับสต็อก จัดซื้อ การผลิต และบัญชีในระบบเดียว รับพร้อมเพย์และตรวจสลิปแบบไทย",
      "Loyverse is a free POS app popular with small shops worldwide and in Thailand — easy, with monthly add-ons in US dollars. Tonbab includes POS on every plan, Free included, connected to stock, purchasing, manufacturing and accounting in one system, with Thai PromptPay and slip checking.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("แอป POS ร้านค้าและร้านอาหาร", "POS app for shops and restaurants"), TONBAB_TYPE),
      row("ราคา", "Price", bi("POS ฟรี · สต็อกขั้นสูง US$25/ร้าน/เดือน · จัดการพนักงาน US$5/คน/เดือน", "POS free · advanced inventory US$25/store/mo · employee management US$5/person/mo"), TONBAB_PRICE),
      row("พร้อมเพย์และสลิป", "PromptPay and slips", bi("ไม่พบในหน้าราคา", "Not on the pricing page"), bi("QR พร้อมเพย์ของร้าน พร้อมรูปสลิป · เชื่อมบัญชีตรวจสลิปของร้านเอง (EasySlip, Thunder, SlipOK)", "Your own PromptPay QR with slip photo · connect your own slip-check account (EasySlip, Thunder, SlipOK)")),
      row("สต็อกและจัดซื้อ", "Stock and purchasing", bi("สต็อกพื้นฐานฟรี · ขั้นสูงเป็นบริการเสริม", "Basic stock free · advanced is an add-on"), bi("สต็อกหลายคลัง จัดซื้อ PR/PO รับสินค้า ในระบบเดียว", "Multi-warehouse stock, PR/PO purchasing, goods receipt in one system")),
      row("บัญชีและภาษีไทย", "Accounting & Thai tax", bi("ไม่มี", "No"), TONBAB_ACC),
    ],
    plans: [
      { name: same("POS"), price: bi("ฟรี", "Free"), note: bi("ขาย สะสมแต้ม จอครัว หลายสาขา สต็อกพื้นฐาน", "Sales, loyalty, kitchen display, multi-store, basic stock") },
      { name: bi("สต็อกขั้นสูง", "Advanced inventory"), price: bi("US$25/ร้าน/เดือน หรือ US$250/ปี", "US$25/store/mo or US$250/yr"), note: bi("ใบสั่งซื้อ โอนสต็อก นับสต็อก", "Purchase orders, transfers, counts") },
      { name: bi("จัดการพนักงาน", "Employee management"), price: bi("US$5/คน/เดือน หรือ US$50/ปี", "US$5/person/mo or US$50/yr"), note: bi("สิทธิ์ เวลาเข้างาน", "Permissions, time clock") },
      { name: bi("ประวัติการขายไม่จำกัด", "Unlimited sales history"), price: bi("US$5/ร้าน/เดือน หรือ US$50/ปี", "US$5/store/mo or US$50/yr"), note: bi("แพ็กเกจฟรีดูรายงานย้อนหลัง 31 วัน", "The free plan shows the last 31 days of analytics") },
    ],
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Loyverse เป็นจุดเริ่มต้นที่ดีสำหรับร้านเดียวที่อยากได้ POS ฟรี Tonbab เหมาะเมื่อร้านโตขึ้นและต้องการให้หน้าร้านต่อกับคลัง การสั่งซื้อ การผลิต และบัญชี โดยไม่ต้องคีย์ข้อมูลซ้ำ", "Loyverse is a great free starting point for a single shop. Tonbab fits once the shop grows and the counter needs to connect to the warehouse, purchasing, production and the books without re-keying."),
      ] },
    ],
    chooseThem: [bi("ร้านเดียว ต้องการ POS ฟรีที่ใช้ง่ายที่สุด", "You run one shop and want the simplest free POS.")],
    chooseTonbab: [
      bi("ต้องการรับพร้อมเพย์ด้วย QR ของร้านพร้อมรูปสลิป", "You want Thai PromptPay on your own QR, with slip photos."),
      bi("ผลิตหรือแพ็กสินค้าเอง และต้องการบัญชีในระบบเดียวกับหน้าร้าน", "You produce or pack your own products and want accounting in the same system as the counter."),
    ],
    faq: [faqMigrate("Loyverse"), faqTry],
  },

  // ──────────────────────────────────────────────────────── Wongnai POS
  {
    slug: "wongnai-pos",
    name: "Wongnai POS",
    category: "pos",
    keyword: bi("ทางเลือก Wongnai POS", "Wongnai POS alternative"),
    verified: bi("ข้อมูล Wongnai POS ตรวจจาก wongnai.com/pos เมื่อ 19 พ.ย. 2569", "Wongnai POS facts checked on wongnai.com/pos, 19 Nov 2026"),
    sources: [{ label: "wongnai.com/pos", url: "https://www.wongnai.com/pos" }],
    summary: bi(
      "Wongnai POS เป็นระบบ POS สำหรับร้านอาหารที่เชื่อมกับ LINE MAN และเครือข่าย Wongnai ได้ดี เหมาะกับร้านอาหารที่รับออเดอร์เดลิเวอรี Tonbab มี POS พร้อมใบสั่งครัว และต่อกับสต็อกวัตถุดิบ จัดซื้อ บัญชี และ HR ในระบบเดียว",
      "Wongnai POS is a restaurant POS tightly linked with LINE MAN and the Wongnai network — a strong fit for restaurants taking delivery orders. Tonbab has POS with kitchen tickets, connected to ingredient stock, purchasing, accounting and HR in one system.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("POS ร้านอาหาร", "Restaurant POS"), TONBAB_TYPE),
      row("ราคา (ต่อร้าน)", "Price (per shop)", bi("Quick Service เริ่ม ฿1,090/เดือน · Full Service เริ่ม ฿1,790/เดือน · ฮาร์ดแวร์แยก", "Quick Service from ฿1,090/mo · Full Service from ฿1,790/mo · hardware separate"), TONBAB_PRICE),
      row("เดลิเวอรี", "Delivery", bi("รับออเดอร์ LINE MAN เข้าระบบ — จุดแข็งหลัก", "LINE MAN orders flow in — a core strength"), bi("ช่องทาง LINE และมาร์เก็ตเพลสเป็นบริการเสริม (Business) · ยังไม่เชื่อม LINE MAN", "LINE and marketplace channels as an add-on (Business) · no LINE MAN link yet")),
      row("ครัว", "Kitchen", bi("จอครัว (KDS)", "Kitchen display (KDS)"), bi("ใบสั่งครัวและหลายเครื่องพิมพ์ (ทุกแพ็กเกจ)", "Kitchen tickets and multiple printers (every plan)")),
      row("วัตถุดิบและบัญชี", "Ingredients and accounting", bi("ไม่พบบัญชีในตัว", "No built-in accounting found"), bi("ตัดสต็อกตามสูตร จัดซื้อ บัญชี เงินเดือน ในระบบเดียว", "Recipe stock deduction, purchasing, accounting, payroll in one system")),
    ],
    plans: [
      { name: same("Quick Service"), price: bi("เริ่ม ฿1,090/เดือน (฿13,080/ปี)", "From ฿1,090/mo (฿13,080/yr)"), note: bi("ต่อร้าน ไม่รวมฮาร์ดแวร์", "Per shop, hardware extra") },
      { name: same("Full Service"), price: bi("เริ่ม ฿1,790/เดือน (฿21,480/ปี)", "From ฿1,790/mo (฿21,480/yr)"), note: bi("ต่อร้าน ไม่รวมฮาร์ดแวร์", "Per shop, hardware extra") },
      { name: same("Enterprise"), price: bi("ขอใบเสนอราคา", "Quote"), note: bi("หลายสาขา", "Multi-branch") },
    ],
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("ถ้าเดลิเวอรีผ่าน LINE MAN คือรายได้หลัก Wongnai POS ได้เปรียบชัดเจน Tonbab เหมาะกับร้านหรือแบรนด์ที่มีครัวกลาง ผลิตเอง หรือมีหลายธุรกิจ และต้องการให้หน้าร้านต่อกับวัตถุดิบ จัดซื้อ และบัญชีในระบบเดียว", "If LINE MAN delivery is your main revenue, Wongnai POS has a clear edge. Tonbab fits restaurants and brands with a central kitchen, their own production or several businesses, where the counter must connect to ingredients, purchasing and the books."),
      ] },
    ],
    chooseThem: [bi("ร้านอาหารที่พึ่งเดลิเวอรี LINE MAN เป็นหลัก", "Your restaurant relies mainly on LINE MAN delivery.")],
    chooseTonbab: [
      bi("มีครัวกลางหรือผลิตสินค้าเอง ต้องการต้นทุนวัตถุดิบจริง", "You have a central kitchen or make your own products and need real ingredient cost."),
      bi("ต้องการบัญชีและเงินเดือนพนักงานในระบบเดียวกับหน้าร้าน", "You want accounting and staff payroll in the same system as the counter."),
    ],
    faq: [faqMigrate("Wongnai POS"), faqTry],
  },

  // ───────────────────────────────────────────────────────── Bplus ERP
  {
    slug: "bplus",
    name: "Bplus ERP",
    category: "erp",
    keyword: bi("ทางเลือก Bplus ERP (Business Plus)", "Bplus ERP (Business Plus) alternative"),
    verified: bi("ข้อมูล Bplus ตรวจจากหน้าผลิตภัณฑ์และคู่มือติดตั้งบน businessplus.co.th เมื่อ 19 พ.ย. 2569 — Bplus ไม่เปิดเผยราคา", "Bplus facts checked on businessplus.co.th product pages and installation manual, 19 Nov 2026 — Bplus publishes no prices"),
    sources: [
      { label: "businessplus.co.th — Business Plus ERP", url: "https://www.businessplus.co.th/Product/business-plus-erp-c009" },
      { label: "businessplus.co.th — products", url: "https://www.businessplus.co.th/" },
      { label: "Bplus ERP v3.0 installation manual (PDF)", url: "https://www.businessplus.co.th/images/content2022/MNSP01-57%20%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%81%E0%B8%81%E0%B8%A3%E0%B8%A1%20ERP%20v3.0(Standalone).pdf" },
    ],
    summary: bi(
      "Bplus (Business Plus) เป็นโปรแกรมบัญชีบริหารและ ERP ของบริษัทไทยที่โรงงานและบริษัทจัดจำหน่ายใช้กันมานาน มีบัญชี จัดซื้อ ขาย คลังพร้อมล็อต/ซีเรียล/FIFO และ MRP จาก BOM ส่วน POS เงินเดือน (HRM) และขายหน้ารถ (Van Sales) เป็นผลิตภัณฑ์แยก ติดตั้งบนเครื่อง Windows Tonbab เป็นระบบคลาวด์ที่รวมทุกฝ่ายในฐานข้อมูลเดียว ราคาเปิดเผยต่อบริษัท",
      "Bplus (Business Plus) is a long-established Thai management-accounting and ERP package used by factories and distributors — accounting, purchasing, sales, warehouse with lot/serial/FIFO, and MRP from BOMs. POS, payroll (HRM) and van sales are separate products, installed on Windows PCs. Tonbab is cloud-based with every department in one database and published per-company prices.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ERP/โปรแกรมบัญชีบริหาร ติดตั้งบนเครื่อง Windows (ตามคู่มือติดตั้ง)", "ERP / management accounting installed on Windows (per the installation manual)"), TONBAB_TYPE),
      row("ราคา", "Price", bi("ราคาไม่เปิดเผย / quote only — ติดต่อฝ่ายขาย", "ราคาไม่เปิดเผย / quote only — contact sales"), TONBAB_PRICE),
      row("การผลิต", "Manufacturing", bi("MRP II จาก BOM เทียบต้นทุนมาตรฐานกับจริง · หน้าผลิตภัณฑ์ระบุว่าไม่รวมการควบคุมการผลิตระดับเครื่องจักร", "MRP II from BOMs with standard-vs-actual cost · the product page says machine-level shop-floor control is not included"), TONBAB_MFG),
      row("สต็อก", "Inventory", bi("คลังสินค้า Lot/Serial/FIFO คำนวณ EOQ", "Warehouse with lot/serial/FIFO and EOQ"), TONBAB_STOCK),
      row("บัญชีและภาษีไทย", "Accounting & Thai tax", bi("มี — บัญชีและการเงินเป็นแกนหลัก", "Yes — accounting and finance are the core"), TONBAB_ACC),
      row("POS / เงินเดือน", "POS / payroll", bi("ผลิตภัณฑ์แยก: Bplus POS และ Bplus HRM (Payroll)", "Separate products: Bplus POS and Bplus HRM (Payroll)"), bi("อยู่ในระบบเดียว ฐานข้อมูลเดียว", "In one system, one database")),
      row("ใช้นอกออฟฟิศ / มือถือ", "Away from the office / mobile", bi("โปรแกรมติดตั้งบนเครื่อง · Van Sales บนมือถือเป็นผลิตภัณฑ์แยก", "Installed program · mobile Van Sales is a separate product"), TONBAB_APP),
    ],
    plans: [],
    plansNote: bi("Bplus ไม่แสดงราคาซอฟต์แวร์บนเว็บไซต์ ต้องขอใบเสนอราคาจากฝ่ายขาย", "Bplus shows no software prices on its website; ask its sales team for a quote."),
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Bplus เป็นระบบที่นักบัญชีและฝ่ายคลังในโรงงานไทยคุ้นเคย งาน MRP ล็อตและ FIFO ครบ แต่ทำงานบนเครื่องในออฟฟิศ และแยก POS เงินเดือน และขายหน้ารถเป็นโปรแกรมต่างหาก Tonbab ทำงานบนคลาวด์ ทุกฝ่ายตั้งแต่จัดซื้อ ผลิต หน้าร้าน CRM จนถึงเงินเดือนอยู่ในฐานข้อมูลเดียว เปิดใช้จากมือถือได้", "Bplus is familiar to accountants and warehouse teams in Thai factories, with solid MRP, lots and FIFO — but it runs on office PCs and splits POS, payroll and van sales into separate programs. Tonbab runs in the cloud with purchasing, production, retail, CRM and payroll in one database, usable from a phone."),
        bi("ถ้าคุณใช้ Bplus อยู่และพอใจกับงานบัญชี ใช้ Tonbab ดูแลงานหน้างาน แล้วส่งข้อมูลให้ฝ่ายบัญชีก็ได้ เมื่อพร้อมจะรวมบัญชีมาไว้ที่เดียว บัญชีของ Tonbab รวมอยู่ในทุกแพ็กเกจแล้ว", "If you run Bplus and are happy with the books, you can run floor work in Tonbab and hand data to accounting. When you want one system, Tonbab's accounting is already in every plan."),
      ] },
    ],
    chooseThem: [
      bi("ต้องการโปรแกรมติดตั้งบนเครื่องในออฟฟิศ และทีมบัญชีคุ้นเคยกับ Bplus อยู่แล้ว", "You want software installed on office PCs and your accounting team already knows Bplus."),
      bi("ต้องการ MRP II แบบดั้งเดิมพร้อมทีมบริการของผู้พัฒนามาติดตั้งที่บริษัท", "You want classic MRP II with the vendor's own team installing on site."),
    ],
    chooseTonbab: [
      bi("ต้องการให้ทุกฝ่ายและทุกสาขาเห็นข้อมูลชุดเดียวบนคลาวด์ ใช้จากมือถือได้", "You want every department and branch on the same cloud data, usable from a phone."),
      bi("ต้องการ POS CRM และเงินเดือนในระบบเดียวกับบัญชีและการผลิต ไม่ต้องซื้อหลายโปรแกรม", "You want POS, CRM and payroll in the same system as accounting and production, not several programs."),
      bi("ต้องการรู้ราคาก่อนคุยกับฝ่ายขาย และเริ่มเองได้ทันที", "You want to see the price before talking to sales, and start yourself today."),
    ],
    faq: [
      { q: bi("Bplus ERP ราคาเท่าไร?", "How much does Bplus ERP cost?"), a: bi("Bplus ไม่เปิดเผยราคาบนเว็บไซต์ (ตรวจ 19 พ.ย. 2569) ต้องติดต่อฝ่ายขายเพื่อขอใบเสนอราคา ส่วน Tonbab เปิดเผยราคาต่อบริษัท เริ่ม Free และ Starter ฿2,990/ปี ก่อน VAT", "Bplus doesn't publish prices on its website (checked 19 Nov 2026) — ask its sales team for a quote. Tonbab publishes per-company prices, from Free and Starter at ฿2,990/yr before VAT.") },
      { q: bi("Bplus มีระบบผลิตไหม?", "Does Bplus have manufacturing?"), a: bi("มี หน้าผลิตภัณฑ์ของ Bplus ระบุว่ามีการวางแผนการผลิตและ MRP II จาก BOM เทียบต้นทุนมาตรฐานกับต้นทุนจริง แต่ไม่รวมการควบคุมการผลิตระดับเครื่องจักร", "Yes. Bplus's product page lists production planning and MRP II from BOMs with standard-vs-actual cost, but not machine-level shop-floor control.") },
      faqMigrate("Bplus"),
      faqTry,
    ],
  },

  // ─────────────────────────────────── Microsoft Dynamics 365 Business Central
  {
    slug: "business-central",
    name: "Microsoft Dynamics 365 Business Central",
    category: "erp",
    keyword: bi("ทางเลือก Microsoft Dynamics 365 Business Central", "Microsoft Dynamics 365 Business Central alternative"),
    verified: bi("ราคา Business Central ตรวจจากหน้าราคาของ Microsoft และสถานะประเทศไทยจากเอกสาร Microsoft Learn เมื่อ 19 พ.ย. 2569", "Business Central prices checked on Microsoft's pricing page, and Thailand status on Microsoft Learn, 19 Nov 2026"),
    sources: [
      { label: "microsoft.com — Business Central pricing", url: "https://www.microsoft.com/en-us/dynamics-365/products/business-central/pricing" },
      { label: "Microsoft Learn — country/regional availability", url: "https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/compliance/apptest-countries-and-translations" },
    ],
    summary: bi(
      "Business Central เป็น ERP สำหรับธุรกิจขนาดกลางของ Microsoft ครบทั้งการเงิน ซัพพลายเชน คลัง และ (ในแพ็กเกจ Premium) การผลิตและงานบริการ ต่อกับ Microsoft 365 ได้ดี คิดราคาต่อผู้ใช้เป็นดอลลาร์ และในประเทศไทยภาษีไทยกับภาษาไทยมาจากแอปของพาร์ทเนอร์ Tonbab เป็น ERP ไทยที่มีภาษีไทยในตัว ราคาต่อบริษัทเป็นเงินบาท",
      "Business Central is Microsoft's ERP for mid-sized companies — finance, supply chain, warehousing and, on Premium, manufacturing and service — and it fits tightly with Microsoft 365. It is priced per user in dollars, and in Thailand the Thai localization and Thai translation come from partner apps. Tonbab is a Thai ERP with Thai tax built in, priced per company in baht.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ERP บนคลาวด์ของ Microsoft สำหรับธุรกิจขนาดกลาง", "Microsoft's cloud ERP for mid-sized companies"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย", "Published price", bi("Essentials US$80 · Premium US$110 · Team Members US$8 ต่อผู้ใช้ต่อเดือน จ่ายรายปี", "Essentials US$80 · Premium US$110 · Team Members US$8 per user per month, paid yearly"), TONBAB_PRICE),
      row("ภาษีไทยและภาษาไทย", "Thai tax and Thai language", bi("Microsoft ระบุว่าประเทศไทย localize โดยพาร์ทเนอร์ (บนฐาน W1) และคำแปลภาษาไทยของแอปมาจากพาร์ทเนอร์", "Microsoft lists Thailand as partner-localized (on the W1 base), with the Thai application translation provided by partners"), TONBAB_TAX),
      row("การผลิตและงานบริการ", "Manufacturing and service", bi("อยู่ใน Premium", "On Premium"), bi("ทุกแพ็กเกจ — BOM ใบสั่งผลิต งานซ่อมและบริการ", "Every plan — BOM, work orders, repair and service jobs")),
      row("การวางระบบ", "Implementation", bi("Microsoft แนะนำให้ซื้อและวางระบบผ่านพาร์ทเนอร์", "Microsoft directs purchases and implementation to partners"), bi(`สมัครเองได้ทันที หรือบริการตั้งค่า ${B.setup}`, `Self-serve today, or a ${B.setup} setup service`)),
      row("POS / HR / เงินเดือน", "POS / HR / payroll", bi("ไม่อยู่ในแพ็กเกจหลัก — ใช้แอปเสริมจากพาร์ทเนอร์", "Not in the core plans — partner add-on apps"), bi("มีในทุกแพ็กเกจ", "On every plan")),
    ],
    plans: [
      { name: same("Essentials"), price: bi("US$80/ผู้ใช้/เดือน (จ่ายรายปี)", "US$80/user/mo (paid yearly)"), note: bi("การเงิน ซัพพลายเชน คลัง โปรเจกต์ รวม Copilot", "Finance, supply chain, warehousing, projects, includes Copilot") },
      { name: same("Premium"), price: bi("US$110/ผู้ใช้/เดือน (จ่ายรายปี)", "US$110/user/mo (paid yearly)"), note: bi("ทุกอย่างใน Essentials + การผลิต + งานบริการ", "Everything in Essentials + manufacturing + service management") },
      { name: same("Team Members"), price: bi("US$8/ผู้ใช้/เดือน (จ่ายรายปี)", "US$8/user/mo (paid yearly)"), note: bi("ดูข้อมูล อนุมัติ และแก้ไขบางรายการ", "Read, approve and update selected records") },
    ],
    plansNote: bi("Microsoft ระบุว่าราคาเป็นข้อมูลประกอบ อาจต่างกันตามสกุลเงินและประเทศ ค่าแอปภาษีไทยและค่าวางระบบของพาร์ทเนอร์ไม่รวม", "Microsoft says prices are for information and may vary by currency and country. Partner Thai-localization apps and implementation are extra."),
    scenario: {
      title: bi("โรงงาน 10 ผู้ใช้ ต้องการการผลิต สต็อก และบัญชีพร้อมภาษีไทย", "A 10-user factory that needs manufacturing, stock and accounting with Thai tax"),
      them: bi("Premium 10 ผู้ใช้ × US$110 × 12 เดือน + แอปภาษีไทยของพาร์ทเนอร์ + ค่าวางระบบ", "Premium 10 users × US$110 × 12 months + partner Thai-localization app + implementation"),
      themTotal: bi("≈ US$13,200 ต่อปี (≈ ฿435,600 ที่ราว 33 บาท/ดอลลาร์) + พาร์ทเนอร์", "≈ US$13,200 per year (≈ ฿435,600 at about 33 THB/USD) + partner fees"),
      tonbab: bi(`Standard ${B.standard} — 10 ผู้ใช้ การผลิต บัญชี ภาษีไทย เงินเดือน POS CRM`, `Standard ${B.standard} — 10 users, manufacturing, accounting, Thai tax, payroll, POS, CRM`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("อัตราแลกเปลี่ยนเป็นตัวเลขประมาณของเรา Business Central ลึกกว่ามากด้านการเงินหลายบริษัท ซัพพลายเชน และการปรับแต่ง และเข้ากับ Microsoft 365 ถ้าบริษัทแม่ใช้ Microsoft หรือคุณต้องการระบบระดับนั้น ค่าใช้จ่ายที่สูงกว่าอาจคุ้ม", "The exchange rate is our approximation. Business Central goes much deeper on multi-company finance, supply chain and customisation, and fits Microsoft 365. If your group runs Microsoft or you need that depth, the higher cost can be worth it."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Business Central เป็น ERP มาตรฐานสากลที่ต้องวางระบบผ่านพาร์ทเนอร์ และในไทยต้องใช้แอปภาษีไทยของพาร์ทเนอร์ Tonbab สร้างจากเอกสารและภาษีไทยตั้งแต่ต้น ใช้ภาษาไทยครบทุกหน้า และเริ่มใช้เองได้ในวันเดียว", "Business Central is an international-standard ERP implemented through partners, and in Thailand it needs a partner's Thai-localization app. Tonbab was built on Thai documents and tax from the start, is fully Thai, and you can start yourself in a day."),
        bi("Business Central คิดต่อผู้ใช้ ทุกคนที่ทำงานในระบบเต็มรูปแบบต้องมีไลเซนส์ Essentials หรือ Premium Tonbab คิดต่อบริษัท Standard ได้ 10 ผู้ใช้ และ Business ได้ 25 ผู้ใช้ในราคาเดียว", "Business Central charges per user — everyone working fully in the system needs an Essentials or Premium licence. Tonbab charges per company: Standard covers 10 users and Business 25 at one price."),
      ] },
    ],
    chooseThem: [
      bi("บริษัทแม่หรือกลุ่มบริษัทใช้ Microsoft Dynamics และต้องการระบบเดียวกัน", "Your parent company or group runs Microsoft Dynamics and you need to match it."),
      bi("ต้องการการเงินหลายบริษัท ซัพพลายเชน และการปรับแต่งระดับลึกผ่านพาร์ทเนอร์", "You need deep multi-company finance, supply chain and partner customisation."),
    ],
    chooseTonbab: [
      bi("ต้องการภาษีไทยและภาษาไทยในตัว ไม่ต้องพึ่งแอปของพาร์ทเนอร์", "You want Thai tax and Thai language built in, not from a partner app."),
      bi("ต้องการราคาเป็นเงินบาทต่อบริษัท และ POS HR เงินเดือนในระบบเดียว", "You want per-company pricing in baht, with POS, HR and payroll in the same system."),
    ],
    faq: [
      { q: bi("Business Central ราคาเท่าไรในไทย?", "How much is Business Central in Thailand?"), a: bi("หน้าราคาของ Microsoft (19 พ.ย. 2569) แสดง Essentials US$80 และ Premium US$110 ต่อผู้ใช้ต่อเดือน จ่ายรายปี Team Members US$8 ไม่รวมแอปภาษีไทยและค่าวางระบบของพาร์ทเนอร์ ราคาในไทยอาจต่างตามสกุลเงิน", "Microsoft's pricing page (19 Nov 2026) shows Essentials at US$80 and Premium at US$110 per user per month, paid yearly, and Team Members at US$8 — excluding partner Thai-localization apps and implementation. Thai pricing may differ by currency.") },
      { q: bi("Business Central รองรับภาษีไทยไหม?", "Does Business Central support Thai tax?"), a: bi("เอกสาร Microsoft Learn ระบุว่าประเทศไทยเป็นประเทศที่พาร์ทเนอร์ทำ localization บนเวอร์ชันสากล (W1) และคำแปลภาษาไทยของแอปมาจากพาร์ทเนอร์ จึงขึ้นกับแอปของพาร์ทเนอร์ที่คุณเลือก", "Microsoft Learn lists Thailand as partner-localized on the international (W1) version, with the Thai application translation from partners — so it depends on the partner app you choose.") },
      faqMigrate("Business Central"),
      faqTry,
    ],
  },

  // ─────────────────────────────────────────────────────────── ERPNext
  {
    slug: "erpnext",
    name: "ERPNext",
    category: "erp",
    keyword: bi("ทางเลือก ERPNext", "ERPNext alternative"),
    verified: bi("ข้อมูล ERPNext และ Frappe Cloud ตรวจจาก frappe.io/erpnext/pricing เมื่อ 19 พ.ย. 2569", "ERPNext and Frappe Cloud facts checked on frappe.io/erpnext/pricing, 19 Nov 2026"),
    sources: [{ label: "frappe.io/erpnext/pricing", url: "https://frappe.io/erpnext/pricing" }],
    summary: bi(
      "ERPNext เป็น ERP โอเพนซอร์ส (GPL-3.0) จาก Frappe ใช้ฟรีถ้าติดตั้งเอง หรือเช่าบน Frappe Cloud ที่คิดตามเว็บไซต์/เซิร์ฟเวอร์ไม่ใช่ต่อผู้ใช้ มีบัญชี จัดซื้อ สต็อก การผลิต POS และ CRM ปรับแต่งได้มาก Tonbab เป็น ERP สำเร็จรูปที่สร้างเพื่อธุรกิจไทย ภาษาไทยและภาษีไทยพร้อมใช้ ไม่ต้องดูแลเซิร์ฟเวอร์",
      "ERPNext is an open-source (GPL-3.0) ERP from Frappe — free if you host it yourself, or hosted on Frappe Cloud priced per site/server, not per user. It covers accounting, purchasing, stock, manufacturing, POS and CRM, and is highly customisable. Tonbab is a ready-to-use ERP built for Thai businesses, with Thai language and Thai tax out of the box and no servers to run.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ERP โอเพนซอร์ส ติดตั้งเองหรือเช่าคลาวด์", "Open-source ERP, self-hosted or cloud-hosted"), TONBAB_TYPE),
      row("ราคา", "Price", bi("ซอฟต์แวร์ฟรี (GPL-3.0) · Frappe Cloud: เว็บไซต์เริ่ม US$5/เดือน เซิร์ฟเวอร์เริ่ม US$20/เดือน · ไม่คิดต่อผู้ใช้", "Software free (GPL-3.0) · Frappe Cloud: sites from US$5/mo, servers from US$20/mo · not per user"), TONBAB_PRICE),
      row("การผลิต", "Manufacturing", bi("มี — โมดูล Manufacturing", "Yes — Manufacturing module"), TONBAB_MFG),
      row("ภาษีไทย", "Thai tax", bi("ไม่พบโมดูลภาษีไทยในหน้าของ Frappe — ต้องปรับเองหรือใช้พาร์ทเนอร์", "No Thai tax module found on Frappe's pages — customise yourself or use a partner"), TONBAB_TAX),
      row("HR / เงินเดือน", "HR / payroll", bi("Frappe HR (แอปแยก ฟรีเช่นกัน)", "Frappe HR (a separate app, also free)"), TONBAB_HR),
      row("การดูแลระบบ", "Running it", bi("ติดตั้งเองต้องดูแลเซิร์ฟเวอร์ อัปเกรด และสำรองข้อมูลเอง · การวางระบบผ่านพาร์ทเนอร์", "Self-hosting means running servers, upgrades and backups yourself · implementation via partners"), bi(`ไม่ต้องดูแลเซิร์ฟเวอร์ สมัครแล้วใช้ได้ทันที หรือบริการตั้งค่า ${B.setup}`, `No servers to run — sign up and go, or a ${B.setup} setup service`)),
    ],
    plans: [
      { name: bi("ติดตั้งเอง", "Self-hosted"), price: bi("฿0 ค่าซอฟต์แวร์", "฿0 software"), note: bi("GPL-3.0 ไม่มีฟีเจอร์เสียเงิน ค่าเซิร์ฟเวอร์และการดูแลเป็นของคุณ", "GPL-3.0, no paid features; servers and upkeep are yours") },
      { name: same("Frappe Cloud — Site"), price: bi("เริ่ม US$5/เดือน", "From US$5/mo"), note: bi("เว็บไซต์เดียวบนเซิร์ฟเวอร์ที่ใช้ร่วมกัน", "One site on shared servers") },
      { name: same("Frappe Cloud — Server"), price: bi("เริ่ม US$20/เดือน · ระดับสูงเริ่ม US$125/เดือน", "From US$20/mo · higher tier from US$125/mo"), note: bi("เซิร์ฟเวอร์เฉพาะ วางได้หลายเว็บไซต์", "A dedicated VM for several sites") },
    ],
    plansNote: bi("Enterprise ขอใบเสนอราคา ค่าวางระบบของพาร์ทเนอร์ไม่รวม", "Enterprise is quoted; partner implementation is extra."),
    scenario: {
      title: bi("บริษัท 20 ผู้ใช้ ต้องการสต็อก ผลิต บัญชีพร้อมภาษีไทย และเงินเดือน", "A 20-user company that needs stock, manufacturing, accounting with Thai tax, and payroll"),
      them: bi("ERPNext ฟรี + เซิร์ฟเวอร์ Frappe Cloud เริ่ม US$20/เดือน + การปรับภาษีไทย เอกสารไทย และเงินเดือนไทยโดยทีมของคุณหรือพาร์ทเนอร์", "ERPNext free + Frappe Cloud server from US$20/mo + Thai tax, Thai documents and Thai payroll set up by your team or a partner"),
      themTotal: bi("ค่าซอฟต์แวร์และโฮสต์เริ่มราว US$240 ต่อปี + ค่าปรับแต่งและดูแล", "Software and hosting from about US$240 per year + customisation and upkeep"),
      tonbab: bi(`Business ${B.business} — 25 ผู้ใช้ ภาษีไทย เงินเดือน 200 คน ไม่ต้องดูแลเซิร์ฟเวอร์`, `Business ${B.business} — 25 users, Thai tax, payroll for 200, no servers to run`),
      tonbabTotal: bi(`${B.business} ต่อปี`, `${B.business} per year`),
      note: bi("ค่าซอฟต์แวร์ของ ERPNext ถูกกว่าชัดเจน ถ้าคุณมีทีมไอทีหรือพาร์ทเนอร์ที่ทำภาษีไทยให้ได้ ERPNext ยืดหยุ่นกว่าและเป็นเจ้าของโค้ดเอง Tonbab คุ้มเมื่อคุณอยากได้ภาษีไทยพร้อมใช้และไม่อยากดูแลระบบเอง", "ERPNext's software cost is clearly lower. If you have an IT team or a partner who can do Thai tax, ERPNext is more flexible and you own the code. Tonbab pays off when you want Thai tax ready to use and no system to maintain."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("ERPNext ให้อิสระเต็มที่ ทั้งโค้ดเปิดและติดตั้งที่ไหนก็ได้ แต่ภาระการตั้งค่าภาษีไทย แบบฟอร์มเอกสารไทย การอัปเกรด และการสำรองข้อมูลเป็นของคุณ Tonbab ทำส่วนนี้ให้แล้ว แลกกับการเป็นบริการคลาวด์ที่ไม่ติดตั้งเองได้", "ERPNext gives you full freedom — open code, host anywhere — but Thai tax setup, Thai document layouts, upgrades and backups are on you. Tonbab has done that work, in exchange for being a cloud service you can't self-host."),
      ] },
    ],
    chooseThem: [
      bi("มีทีมไอทีหรือพาร์ทเนอร์ ERPNext และต้องการเป็นเจ้าของโค้ดหรือติดตั้งบนเซิร์ฟเวอร์ของตัวเอง", "You have an IT team or an ERPNext partner and want to own the code or host on your own servers."),
      bi("ต้องการปรับแต่งระบบลึกด้วยตัวเอง", "You want to customise the system deeply yourself."),
    ],
    chooseTonbab: [
      bi("ต้องการภาษีไทย เอกสารไทย และเงินเดือนไทยพร้อมใช้ตั้งแต่วันแรก", "You want Thai tax, Thai documents and Thai payroll ready from day one."),
      bi("ไม่อยากดูแลเซิร์ฟเวอร์ การอัปเกรด และการสำรองข้อมูลเอง", "You don't want to run servers, upgrades and backups yourself."),
    ],
    faq: [
      { q: bi("ERPNext ฟรีจริงไหม?", "Is ERPNext really free?"), a: bi("ซอฟต์แวร์ฟรีและเป็นโอเพนซอร์ส GPL-3.0 ตามหน้าของ Frappe (19 พ.ย. 2569) ถ้าติดตั้งเองไม่มีค่าไลเซนส์ ถ้าเช่าบน Frappe Cloud เว็บไซต์เริ่ม US$5/เดือน และเซิร์ฟเวอร์เริ่ม US$20/เดือน ค่าวางระบบและการปรับภาษีไทยคิดแยก", "The software is free and open source (GPL-3.0) per Frappe's page (19 Nov 2026). Self-hosting has no licence fee; on Frappe Cloud, sites start at US$5/mo and servers at US$20/mo. Implementation and Thai-tax customisation are extra.") },
      faqMigrate("ERPNext"),
      faqTry,
    ],
  },

  // ────────────────────────────────────────────────────────── HumanSoft
  {
    slug: "humansoft",
    name: "HumanSoft",
    category: "hr",
    keyword: bi("ทางเลือก HumanSoft", "HumanSoft alternative"),
    verified: bi("ข้อมูล HumanSoft ตรวจจาก humansoft.co.th/price (ราคาอัปเดต 1 มี.ค. 2569) เมื่อ 19 พ.ย. 2569", "HumanSoft facts checked on humansoft.co.th/price (prices updated 1 Mar 2026), 19 Nov 2026"),
    sources: [
      { label: "humansoft.co.th/price", url: "https://www.humansoft.co.th/price" },
      { label: "humansoft.co.th", url: "https://www.humansoft.co.th/" },
    ],
    summary: bi(
      "HumanSoft เป็นระบบ HR และเงินเดือนของไทยสำหรับ SME คิดราคาตามช่วงจำนวนพนักงาน มีเงินเดือน ภาษี ประกันสังคม ลงเวลาหลายวิธี และงานเอกสารผ่านแอปหรือ LINE รวมการตั้งค่าและย้ายข้อมูลในราคา Tonbab มี HR การลา เวลาทำงาน และเงินเดือนอยู่ในระบบเดียวกับบัญชี สต็อก และการขาย",
      "HumanSoft is a Thai HR and payroll system for SMEs, priced by headcount band — payroll, tax, social security, many clock-in methods, and requests through an app or LINE, with setup and data import included. Tonbab has HR, leave, attendance and payroll in the same system as accounting, stock and sales.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ระบบ HR และเงินเดือนบนคลาวด์", "Cloud HR and payroll system"), TONBAB_TYPE),
      row("ราคา (1–10 พนักงาน)", "Price (1–10 staff)", bi("BASIC ฿590 · STANDARD ฿1,190 · ADVANCED ฿1,390 · PROFESSIONAL ฿1,890 ต่อเดือน (รายปีจ่าย 10 เดือน)", "BASIC ฿590 · STANDARD ฿1,190 · ADVANCED ฿1,390 · PROFESSIONAL ฿1,890 per month (yearly = 10 months)"), bi(`Starter ${B.starter}/ปี (พนักงาน 10 คน) หรือ Standard ${B.standard}/ปี (50 คน) รวมทุกโมดูล`, `Starter ${B.starter}/yr (10 staff) or Standard ${B.standard}/yr (50 staff), every module`)),
      row("เงินเดือนและภาษี", "Payroll and tax", bi("ทุกแพ็กเกจ — ภ.ง.ด.1 สปส.1-10 50 ทวิ กองทุนสำรองเลี้ยงชีพ", "Every plan — PND 1, SSO 1-10, 50 Tawi, provident fund"), bi("ทุกแพ็กเกจ — ภ.ง.ด.1 ประกันสังคม สลิป", "Every plan — PND 1, social security, payslips")),
      row("ลงเวลา", "Time clock", bi("ลายนิ้วมือ GPS QR · แอปมือถือ สแกนหน้า Wi-Fi Beacon ตั้งแต่ STANDARD · เชื่อมเครื่อง ADMS ฿5,000/เครื่อง", "Fingerprint, GPS, QR · mobile app, face scan, Wi-Fi, Beacon from STANDARD · ADMS device link ฿5,000/device"), bi(`เช็กอินในแอป และเชื่อม HikCentral (บริการเสริม ${B.hikcentral}/ปี)`, `Check-in in the app, and a HikCentral link (${B.hikcentral}/yr add-on)`)),
      row("ประเมินผล / สรรหา", "Performance / recruiting", bi("PROFESSIONAL — ประเมินผล KPI สรรหาออนไลน์ ทดลองงาน อบรม e-Learning", "PROFESSIONAL — evaluations, KPI, online recruiting, probation, training, e-Learning"), bi("สรรหาและหน้ารับสมัครงานทุกแพ็กเกจ · KPI ทีมขายใน CRM · ยังไม่มีระบบประเมินผล HR เต็มรูปแบบ", "Recruiting and careers page on every plan · sales KPIs in CRM · no full HR performance system yet")),
      row("บัญชี สต็อก การขาย", "Accounting, stock, sales", bi("ไม่มี (ระบบ HR โดยเฉพาะ)", "No (HR-only)"), bi("มีในระบบเดียวกัน", "In the same system")),
    ],
    plans: [
      { name: bi("1–10 พนักงาน", "1–10 staff"), price: bi("฿590 / ฿1,190 / ฿1,390 / ฿1,890 ต่อเดือน", "฿590 / ฿1,190 / ฿1,390 / ฿1,890 per month"), note: same("BASIC / STANDARD / ADVANCED / PROFESSIONAL") },
      { name: bi("11–25 พนักงาน", "11–25 staff"), price: bi("฿790 / ฿1,990 / ฿2,890 / ฿3,790 ต่อเดือน", "฿790 / ฿1,990 / ฿2,890 / ฿3,790 per month"), note: same("BASIC / STANDARD / ADVANCED / PROFESSIONAL") },
      { name: bi("26–50 พนักงาน", "26–50 staff"), price: bi("฿1,290 / ฿2,890 / ฿4,790 / ฿6,390 ต่อเดือน", "฿1,290 / ฿2,890 / ฿4,790 / ฿6,390 per month"), note: same("BASIC / STANDARD / ADVANCED / PROFESSIONAL") },
    ],
    plansNote: bi("ราคาไม่รวม VAT 7% จ่ายรายปีเท่ากับ 10 เดือน รวมการตั้งค่า นำเข้าข้อมูลพนักงานและประวัติ อบรมออนไลน์ และซัพพอร์ตทุกวัน เครื่องสแกนนิ้ว/หน้าคิดแยก เกิน 500 คนขอใบเสนอราคา", "Prices exclude 7% VAT; yearly billing is 10 months' price. Setup, employee and history import, online training and daily support are included; fingerprint/face devices are extra. Above 500 staff, quoted."),
    scenario: {
      title: bi("บริษัท 20 คน ต้องการเงินเดือน การลา และให้พนักงานลงเวลาและยื่นเอกสารผ่านมือถือ", "A 20-person company that needs payroll, leave, and staff clocking in and filing requests on their phones"),
      them: bi("HumanSoft STANDARD (11–25 พนักงาน) ฿1,990 × 10", "HumanSoft STANDARD (11–25 staff) ฿1,990 × 10"),
      themTotal: bi("฿19,900 ต่อปี (HR อย่างเดียว)", "฿19,900 per year (HR only)"),
      tonbab: bi(`Standard ${B.standard} — เงินเดือน 50 คน การลา เวลาทำงาน พร้อมบัญชี สต็อก POS CRM`, `Standard ${B.standard} — payroll for 50, leave, attendance, plus accounting, stock, POS, CRM`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("ถ้าต้องการแค่คำนวณเงินเดือนโดยไม่ใช้แอปมือถือ HumanSoft BASIC (11–25 คน) ราว ฿7,900 ต่อปีถูกกว่า HumanSoft มีวิธีลงเวลาหลากหลายกว่า รองรับเครื่องสแกนนิ้วและหน้า และรวมทีมตั้งค่าและย้ายข้อมูลให้ ถ้า HR คืองานหลักที่ต้องการ HumanSoft ครบกว่า", "If you only need payroll without the mobile app, HumanSoft BASIC (11–25 staff) at about ฿7,900 a year is cheaper. HumanSoft has more clock-in methods, supports fingerprint and face devices, and includes setup and data migration. If HR is your main need, HumanSoft goes further."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("HumanSoft เชี่ยวชาญงาน HR ไทยโดยเฉพาะ ตั้งแต่ลงเวลาหลายรูปแบบจนถึงประเมินผลและอบรม Tonbab ใส่ HR และเงินเดือนไว้ในระบบเดียวกับงานทั้งบริษัท พนักงานคนเดียวกันจึงเป็นทั้งผู้ใช้ ผู้อนุมัติใบขอซื้อ และพนักงานในเงินเดือน และค่าแรงไหลเข้าบัญชีในระบบเดียว", "HumanSoft specialises in Thai HR — from many clock-in methods to evaluations and training. Tonbab puts HR and payroll in the same system as the rest of the company, so one person is a user, a purchase approver and an employee on payroll, and wages flow into the books in the same system."),
      ] },
    ],
    chooseThem: [
      bi("ต้องการระบบ HR โดยเฉพาะ พร้อมเครื่องสแกนนิ้ว/หน้า และวิธีลงเวลาหลายแบบ", "You want a dedicated HR system with fingerprint/face devices and many clock-in methods."),
      bi("ต้องการประเมินผล KPI อบรม และ e-Learning ในระบบ HR", "You need evaluations, KPI, training and e-Learning in your HR system."),
      bi("มีระบบบัญชีและ ERP อยู่แล้ว ต้องการแค่ HR", "You already have accounting and an ERP and only need HR."),
    ],
    chooseTonbab: [
      bi("ต้องการเงินเดือนและ HR ในระบบเดียวกับบัญชี สต็อก และการขาย", "You want payroll and HR in the same system as accounting, stock and sales."),
      bi("อยากจ่ายราคาเดียวต่อบริษัทที่รวมทุกโมดูล", "You'd rather pay one per-company price that covers every module."),
    ],
    faq: [
      { q: bi("HumanSoft ราคาเท่าไร?", "How much does HumanSoft cost?"), a: bi("ตาม humansoft.co.th/price (ราคาอัปเดต 1 มี.ค. 2569 ตรวจ 19 พ.ย. 2569) สำหรับ 1–10 พนักงาน BASIC ฿590 STANDARD ฿1,190 ADVANCED ฿1,390 PROFESSIONAL ฿1,890 ต่อเดือน จ่ายรายปีเท่ากับ 10 เดือน ราคาไม่รวม VAT", "Per humansoft.co.th/price (prices updated 1 Mar 2026, checked 19 Nov 2026), for 1–10 staff: BASIC ฿590, STANDARD ฿1,190, ADVANCED ฿1,390, PROFESSIONAL ฿1,890 per month; yearly billing is 10 months' price, before VAT.") },
      faqMigrate("HumanSoft"),
      faqTry,
    ],
  },

  // ──────────────────────────────────────────────── Tigersoft (Humanica)
  {
    slug: "tigersoft",
    name: "Tigersoft (Tiger OpenSpace)",
    category: "hr",
    keyword: bi("ทางเลือกโปรแกรมเงินเดือน Tigersoft", "Tigersoft payroll alternative"),
    verified: bi("ข้อมูล Tigersoft ตรวจจากหน้าโปรแกรม HR ของ Humanica เมื่อ 19 พ.ย. 2569 — ไม่เปิดเผยราคา", "Tigersoft facts checked on Humanica's HR software page, 19 Nov 2026 — no prices published"),
    sources: [{ label: "humanica.com — Tigersoft", url: "https://www.humanica.com/th/hr-program/tigersoft/" }],
    summary: bi(
      "Tigersoft เป็นซอฟต์แวร์ HR ของไทย (ปัจจุบันอยู่ในกลุ่ม Humanica) ที่โรงงานและองค์กรไทยใช้คู่กับเครื่องสแกนลงเวลามานาน มีข้อมูลบุคคล เวลาทำงานกะซับซ้อน โอที เงินเดือน และแอปพนักงาน ติดตั้งในบริษัทหรือใช้บนคลาวด์ (Tiger OpenSpace) ได้ Tonbab มี HR และเงินเดือนในระบบเดียวกับบัญชี สต็อก และการขาย",
      "Tigersoft is Thai HR software (now part of the Humanica group) long used by Thai factories and organisations alongside time-clock hardware — personnel records, complex shifts, overtime, payroll and an employee app, on-premise or in the cloud (Tiger OpenSpace). Tonbab has HR and payroll in the same system as accounting, stock and sales.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ซอฟต์แวร์ HR และเงินเดือน ติดตั้งในบริษัทหรือคลาวด์ (Tiger OpenSpace)", "HR and payroll software, on-premise or cloud (Tiger OpenSpace)"), TONBAB_TYPE),
      row("ราคา", "Price", bi("ราคาไม่เปิดเผย / quote only", "ราคาไม่เปิดเผย / quote only"), TONBAB_PRICE),
      row("เวลาทำงานและกะ", "Time and shifts", bi("รองรับกะซับซ้อน การลา และคำนวณโอที — จุดแข็ง", "Complex shift patterns, leave and overtime calculation — a strength"), bi(`การลาและเวลาทำงานทุกแพ็กเกจ · เชื่อม HikCentral (บริการเสริม ${B.hikcentral}/ปี)`, `Leave and attendance on every plan · HikCentral link (${B.hikcentral}/yr add-on)`)),
      row("เงินเดือนและกฎหมายไทย", "Payroll and Thai statutory", bi("ภ.ง.ด.1 ภ.ง.ด.91 สปส.1-10 กองทุนสำรองเลี้ยงชีพ ไฟล์โอนธนาคาร", "PND 1, PND 91, SSO 1-10, provident fund, bank transfer files"), bi("ภ.ง.ด.1 ประกันสังคม สลิป ทุกแพ็กเกจ", "PND 1, social security, payslips on every plan")),
      row("แอปพนักงาน", "Employee app", bi("ESS บนเว็บ/มือถือ — เช็กอิน GPS สลิปออนไลน์ ยื่นลา", "Web/mobile ESS — GPS check-in, e-payslips, leave requests"), TONBAB_APP),
      row("บัญชี สต็อก การขาย", "Accounting, stock, sales", bi("ไม่มี (ระบบ HR โดยเฉพาะ)", "No (HR-only)"), bi("มีในระบบเดียวกัน", "In the same system")),
    ],
    plans: [],
    plansNote: bi("หน้าของ Humanica ไม่แสดงราคา Tigersoft ต้องติดต่อฝ่ายขาย", "Humanica's page shows no Tigersoft prices; contact sales."),
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Tigersoft เหมาะกับโรงงานที่มีกะซับซ้อนและใช้เครื่องสแกนลงเวลาจำนวนมาก และต้องการระบบ HR ที่ติดตั้งในบริษัทได้ Tonbab เหมาะกับ SME ที่อยากได้เงินเดือนในระบบเดียวกับจัดซื้อ การผลิต บัญชี และหน้าร้าน ราคาเปิดเผยและสมัครใช้เองได้", "Tigersoft suits factories with complex shifts and many time clocks that want HR software they can install on-premise. Tonbab suits SMEs that want payroll in the same system as purchasing, production, accounting and retail, with published prices and self-serve signup."),
      ] },
    ],
    chooseThem: [
      bi("มีกะการทำงานซับซ้อนและเครื่องสแกนลงเวลาหลายเครื่องในโรงงาน", "You run complex shifts with many time clocks on the factory floor."),
      bi("ต้องการติดตั้งระบบ HR บนเซิร์ฟเวอร์ของบริษัทเอง", "You need the HR system on your own servers."),
    ],
    chooseTonbab: [
      bi("ต้องการเงินเดือนในระบบเดียวกับบัญชี สต็อก และการขาย", "You want payroll in the same system as accounting, stock and sales."),
      bi("อยากรู้ราคาก่อน และเริ่มเองได้ทันที", "You want to know the price up front and start yourself today."),
    ],
    faq: [
      { q: bi("Tigersoft ราคาเท่าไร?", "How much does Tigersoft cost?"), a: bi("หน้าโปรแกรม HR ของ Humanica (ตรวจ 19 พ.ย. 2569) ไม่แสดงราคา Tigersoft ต้องติดต่อฝ่ายขาย ส่วน Tonbab รวมเงินเดือนในทุกแพ็กเกจ เช่น Standard ฿9,900/ปี สำหรับพนักงาน 50 คน ก่อน VAT", "Humanica's HR software page (checked 19 Nov 2026) shows no Tigersoft prices — contact sales. Tonbab includes payroll on every plan, e.g. Standard at ฿9,900/yr for 50 staff, before VAT.") },
      faqMigrate("Tigersoft"),
      faqTry,
    ],
  },

  // ─────────────────────────────────────────────────────────────── Ocha
  {
    slug: "ocha",
    name: "Ocha POS",
    category: "pos",
    keyword: bi("ทางเลือก Ocha POS", "Ocha POS alternative"),
    verified: bi("ข้อมูล Ocha ตรวจจาก ocha.in.th/product และหน้าแรกของ Ocha เมื่อ 19 พ.ย. 2569", "Ocha facts checked on ocha.in.th/product and Ocha's home page, 19 Nov 2026"),
    sources: [
      { label: "ocha.in.th/product", url: "https://ocha.in.th/product" },
      { label: "ocha.in.th", url: "https://ocha.in.th/" },
    ],
    summary: bi(
      "Ocha เป็นแอป POS ร้านอาหารของไทย (ปัจจุบันอยู่ภายใต้ Sea Limited เจ้าของ Shopee) มีจัดการโต๊ะ รวม/แยกบิล ส่งออเดอร์เข้าครัว สต็อกวัตถุดิบ และรับพร้อมเพย์ผ่าน ShopeePay ราคาซอฟต์แวร์ต่อเดือนต่อร้าน Tonbab มี POS ทุกแพ็กเกจ ต่อกับสต็อก จัดซื้อ การผลิต บัญชี และ HR ในระบบเดียว",
      "Ocha is a Thai restaurant POS (now under Sea Limited, Shopee's parent) with table management, split/merge bills, kitchen order printing, ingredient stock and PromptPay through ShopeePay, priced monthly per shop. Tonbab includes POS on every plan, connected to stock, purchasing, production, accounting and HR in one system.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("แอป POS ร้านอาหารบนแท็บเล็ตหรือเครื่อง Sunmi", "Restaurant POS app on a tablet or Sunmi terminal"), TONBAB_TYPE),
      row("ราคา (ต่อร้าน)", "Price (per shop)", bi("฿799/เดือนบนแท็บเล็ต · ฿250/เดือนบนเครื่อง Sunmi ที่ซื้อจาก Ocha · ชุดเครื่อง ฿16,990–26,900 (แถมซอฟต์แวร์ 3 เดือน)", "฿799/mo on a tablet · ฿250/mo on a Sunmi bought from Ocha · hardware bundles ฿16,990–26,900 (3 months' software free)"), TONBAB_PRICE),
      row("หน้าร้านอาหาร", "Restaurant floor", bi("จัดการโต๊ะ รวม/แยกบิล รับออเดอร์บนมือถือพนักงาน ส่งเข้าเครื่องพิมพ์ครัว — จุดแข็ง", "Tables, merge/split bills, staff phone ordering, kitchen printing — a strength"), bi("ใบสั่งครัวและหลายเครื่องพิมพ์ (ทุกแพ็กเกจ)", "Kitchen tickets and multiple printers (every plan)")),
      row("พร้อมเพย์", "PromptPay", bi("ShopeePay ปิดบิลอัตโนมัติ รองรับพร้อมเพย์", "ShopeePay auto-closes bills, supports PromptPay"), bi("QR พร้อมเพย์ของร้านพร้อมรูปสลิป หรือบัตรและพร้อมเพย์ผ่าน Beam", "Your own PromptPay QR with slip photo, or cards and PromptPay via Beam")),
      row("สต็อกและจัดซื้อ", "Stock and purchasing", bi("สต็อกวัตถุดิบเรียลไทม์ แจ้งเตือนใกล้หมด", "Real-time ingredient stock, low-stock alerts"), bi("สต็อกหลายคลัง ตัดตามสูตร จัดซื้อ PR/PO รับสินค้า", "Multi-warehouse stock, recipe deduction, PR/PO purchasing, goods receipt")),
      row("บัญชีและเงินเดือน", "Accounting and payroll", bi("ไม่พบในหน้าของ Ocha", "Not found on Ocha's pages"), bi("มีในระบบเดียวกัน", "In the same system")),
    ],
    plans: [
      { name: bi("ซอฟต์แวร์บนแท็บเล็ต", "Software on a tablet"), price: bi("฿799/เดือน", "฿799/mo"), note: bi("iOS และ Android ต่อร้าน", "iOS and Android, per shop") },
      { name: bi("ซอฟต์แวร์บนเครื่อง Sunmi", "Software on Sunmi"), price: bi("฿250/เดือน", "฿250/mo"), note: bi("เฉพาะเครื่อง Sunmi ที่ซื้อจาก Ocha", "Only on a Sunmi bought from Ocha") },
      { name: bi("ชุดเครื่อง Ocha POS", "Ocha POS hardware"), price: bi("฿16,990–26,900", "฿16,990–26,900"), note: bi("ราคาพิเศษ แถมซอฟต์แวร์ 3 เดือน สำหรับ 1 ร้าน", "Special prices, 3 months' software free, for 1 shop") },
    ],
    plansNote: bi("ทดลองใช้ฟรี 14 วัน อุปกรณ์เสริม เช่น เครื่องพิมพ์ครัว ฿5,500 ลิ้นชัก ฿2,500 ขายแยก", "14-day free trial. Accessories such as a kitchen printer (฿5,500) or cash drawer (฿2,500) are sold separately."),
    scenario: {
      title: bi("ร้านอาหาร 1 สาขา ใช้แท็บเล็ตที่มีอยู่แล้ว 1–2 เครื่อง", "A single-branch restaurant using 1–2 tablets it already owns"),
      them: bi("Ocha บนแท็บเล็ต ฿799 × 12 เดือน", "Ocha on a tablet ฿799 × 12 months"),
      themTotal: bi("฿9,588 ต่อปี (POS อย่างเดียว)", "฿9,588 per year (POS only)"),
      tonbab: bi(`Starter ${B.starter} — 1 ร้าน 2 เครื่อง POS ใบสั่งครัว สต็อก จัดซื้อ บัญชี เงินเดือน 10 คน`, `Starter ${B.starter} — 1 shop, 2 POS devices, kitchen tickets, stock, purchasing, accounting, payroll for 10`),
      tonbabTotal: bi(`${B.starter} ต่อปี`, `${B.starter} per year`),
      note: bi("ถ้าซื้อเครื่อง Sunmi จาก Ocha ค่าซอฟต์แวร์เหลือ ฿3,000 ต่อปี ใกล้เคียง Tonbab Starter Ocha สร้างมาเพื่อร้านอาหารโดยเฉพาะ งานโต๊ะ รวม/แยกบิล และรับออเดอร์บนมือถือพนักงานคล่องตัวกว่า ถ้าร้านคุณเป็นร้านนั่งทานเต็มรูปแบบ Ocha อาจเหมาะกว่า", "If you buy a Sunmi from Ocha, the software drops to ฿3,000 a year — about the same as Tonbab Starter. Ocha is built for restaurants: tables, merge/split bills and staff phone ordering are smoother. For a full-service sit-down restaurant, Ocha may be the better fit."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Ocha เน้นหน้าร้านอาหารให้ลื่นที่สุด Tonbab เหมาะกับร้านหรือแบรนด์ที่มีครัวกลาง ผลิตสินค้าเอง หรือขายส่งด้วย และต้องการให้หน้าร้านต่อกับวัตถุดิบ จัดซื้อ บัญชี และเงินเดือนพนักงานโดยไม่ต้องคีย์ซ้ำ", "Ocha focuses on making the restaurant floor as smooth as possible. Tonbab fits shops and brands with a central kitchen, their own production or wholesale, where the counter must connect to ingredients, purchasing, accounting and staff payroll without re-keying."),
      ] },
    ],
    chooseThem: [
      bi("ร้านอาหารนั่งทานที่ต้องการจัดการโต๊ะ รวม/แยกบิล และรับออเดอร์บนมือถือพนักงาน", "You run a sit-down restaurant that needs tables, merge/split bills and staff phone ordering."),
      bi("ต้องการรับพร้อมเพย์ผ่าน ShopeePay และชุดเครื่องพร้อมใช้จากผู้ให้บริการรายเดียว", "You want PromptPay through ShopeePay and ready-made hardware from one provider."),
    ],
    chooseTonbab: [
      bi("มีครัวกลางหรือผลิตสินค้าเอง ต้องการต้นทุนวัตถุดิบและจัดซื้อในระบบเดียว", "You have a central kitchen or make your own products and want ingredient cost and purchasing in one system."),
      bi("ต้องการบัญชีและเงินเดือนพนักงานในระบบเดียวกับหน้าร้าน", "You want accounting and staff payroll in the same system as the counter."),
    ],
    faq: [
      { q: bi("Ocha POS ราคาเท่าไร?", "How much does Ocha POS cost?"), a: bi("ตาม ocha.in.th/product (19 พ.ย. 2569) ค่าซอฟต์แวร์บนแท็บเล็ต ฿799/เดือน บนเครื่อง Sunmi ที่ซื้อจาก Ocha ฿250/เดือน และชุดเครื่อง Ocha POS ราคาพิเศษ ฿16,990–26,900 แถมซอฟต์แวร์ 3 เดือน", "Per ocha.in.th/product (19 Nov 2026): software on a tablet is ฿799/mo, on a Sunmi bought from Ocha ฿250/mo, and Ocha POS hardware bundles are ฿16,990–26,900 with 3 months' software free.") },
      faqMigrate("Ocha"),
      faqTry,
    ],
  },

  // ─────────────────────────────────────────────────────────── StoreHub
  {
    slug: "storehub",
    name: "StoreHub",
    category: "pos",
    keyword: bi("ทางเลือก StoreHub POS", "StoreHub POS alternative"),
    verified: bi("ข้อมูล StoreHub ตรวจจาก storehub.com/th/pricing เมื่อ 19 พ.ย. 2569", "StoreHub facts checked on storehub.com/th/pricing, 19 Nov 2026"),
    sources: [{ label: "storehub.com/th/pricing", url: "https://www.storehub.com/th/pricing" }],
    summary: bi(
      "StoreHub เป็นระบบ POS บนคลาวด์สำหรับร้านค้าปลีก ร้านอาหาร และธุรกิจบริการ มีสต็อก ฐานข้อมูลลูกค้า สะสมแต้ม หลายสาขา และขายออนไลน์ คิดราคารายเดือนต่อร้าน Tonbab มี POS ทุกแพ็กเกจ ต่อกับสต็อกหลายคลัง จัดซื้อ การผลิต บัญชี และ HR ในระบบเดียว",
      "StoreHub is a cloud POS for retail, F&B and service businesses — stock, customer database, loyalty, multi-outlet and online selling — priced monthly per outlet. Tonbab includes POS on every plan, connected to multi-warehouse stock, purchasing, production, accounting and HR in one system.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("POS บนคลาวด์ ค้าปลีก ร้านอาหาร บริการ", "Cloud POS for retail, F&B and services"), TONBAB_TYPE),
      row("ราคา", "Price", bi("เริ่มต้น ฿990 · กลาง ฿1,999 · โปร ฿4,800 ต่อเดือน (รวม 1 จุดคิดเงิน 1 สาขา)", "Starter ฿990 · Mid ฿1,999 · Pro ฿4,800 per month (1 register, 1 outlet included)"), TONBAB_PRICE),
      row("หลายสาขา", "Multiple outlets", bi("ตั้งแต่แพ็คเกจกลาง · สาขาและจุดคิดเงินเพิ่มเป็น add-on (ไม่แสดงราคา)", "From the Mid plan · extra outlets and registers are add-ons (prices not shown)"), bi("Free/Starter 1 ร้าน · Standard 2 · Business 5 · เครื่อง POS 1/2/5/10", "1 shop on Free/Starter · 2 on Standard · 5 on Business · POS devices 1/2/5/10")),
      row("ลูกค้าและสะสมแต้ม", "Customers and loyalty", bi("ฐานข้อมูลลูกค้า สะสมแต้ม แคมเปญ SMS — จุดแข็ง", "Customer database, loyalty, SMS campaigns — a strength"), TONBAB_CRM),
      row("สต็อกและจัดซื้อ", "Stock and purchasing", bi("สต็อกพื้นฐาน + ซัพพลายเออร์ · เชิงลึกและโอนคลังในแพ็คเกจกลาง", "Basic stock + suppliers · advanced stock and transfers on Mid"), TONBAB_STOCK),
      row("บัญชีและเงินเดือน", "Accounting and payroll", bi("ไม่พบในหน้าราคา", "Not found on the pricing page"), bi("มีในระบบเดียวกัน", "In the same system")),
      row("API", "API", bi("แพ็คเกจโปร", "Pro plan"), TONBAB_API),
    ],
    plans: [
      { name: bi("เริ่มต้น", "Starter"), price: bi("฿990/เดือน", "฿990/mo"), note: bi("POS สต็อกพื้นฐาน ฐานข้อมูลลูกค้า ซัพพลายเออร์ รายงานพื้นฐาน", "POS, basic stock, customer database, suppliers, basic reports") },
      { name: bi("กลาง", "Mid"), price: bi("฿1,999/เดือน", "฿1,999/mo"), note: bi("หลายสาขา สต็อกเชิงลึก โอนคลัง แจ้งเตือนสต็อก รายงานเชิงลึก", "Multi-outlet, advanced stock, transfers, stock alerts, advanced reports") },
      { name: bi("โปร", "Pro"), price: bi("฿4,800/เดือน", "฿4,800/mo"), note: bi("ที่ปรึกษาส่วนตัว API ปรับแต่งพื้นฐาน Workflow Automation", "Account manager, API, basic customisation, workflow automation") },
    ],
    plansNote: bi("ทุกแพ็คเกจรวม 1 จุดคิดเงินและ 1 สาขา หน้าราคามีตัวเลือกจ่ายรายปีแต่ไม่แสดงราคารายปีหรือราคา add-on ไม่ระบุเรื่อง VAT", "Every plan includes 1 register and 1 outlet. The page offers yearly billing but shows no yearly or add-on prices, and doesn't state VAT."),
    scenario: {
      title: bi("ร้านค้าปลีก 2 สาขา ต้องการ POS สต็อกแยกสาขาและโอนสินค้าระหว่างสาขา", "A 2-outlet retailer that needs POS, per-outlet stock and transfers between outlets"),
      them: bi("แพ็คเกจกลาง ฿1,999 × 12 เดือน + สาขาที่ 2 (add-on ราคาไม่เปิดเผย)", "Mid plan ฿1,999 × 12 months + a 2nd outlet (add-on, price not published)"),
      themTotal: bi("≈ ฿23,988 ต่อปี + ค่าสาขาที่ 2", "≈ ฿23,988 per year + the 2nd outlet"),
      tonbab: bi(`Standard ${B.standard} — 2 ร้าน 5 เครื่อง POS 5 คลัง จัดซื้อ บัญชี เงินเดือน`, `Standard ${B.standard} — 2 shops, 5 POS devices, 5 warehouses, purchasing, accounting, payroll`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("StoreHub มีระบบสะสมแต้ม แคมเปญ SMS และซัพพอร์ตทุกวันรวมวันหยุด ถ้าการตลาดกับลูกค้าประจำคือหัวใจของร้าน StoreHub ครบกว่า", "StoreHub has built-in loyalty, SMS campaigns and daily support including holidays. If marketing to repeat customers is the heart of your shop, StoreHub goes further."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("StoreHub เป็น POS ที่เน้นหน้าร้านและการดึงลูกค้ากลับมาซื้อซ้ำ Tonbab เหมาะเมื่อหน้าร้านเป็นส่วนหนึ่งของธุรกิจที่ใหญ่กว่า เช่น มีโกดัง ขายส่ง นำเข้า หรือผลิตเอง และต้องการบัญชีกับเงินเดือนในระบบเดียว", "StoreHub is a POS centred on the counter and repeat customers. Tonbab fits when retail is one part of a bigger business — a warehouse, wholesale, imports or your own production — and you want accounting and payroll in the same system."),
      ] },
    ],
    chooseThem: [
      bi("ร้านค้าปลีกหรือร้านอาหารที่ต้องการระบบสะสมแต้มและแคมเปญ SMS ในตัว", "You run retail or F&B and want built-in loyalty and SMS campaigns."),
      bi("ต้องการซัพพอร์ตทุกวันรวมวันหยุดและที่ปรึกษาส่วนตัว (แพ็คเกจโปร)", "You want daily support including holidays and a dedicated account manager (Pro)."),
    ],
    chooseTonbab: [
      bi("มีโกดัง ขายส่ง หรือผลิตเอง และต้องการสต็อกชุดเดียวทุกช่องทาง", "You have a warehouse, wholesale or your own production and want one stock across channels."),
      bi("ต้องการบัญชี ภาษีไทย และเงินเดือนในระบบเดียวกับหน้าร้าน", "You want accounting, Thai tax and payroll in the same system as the counter."),
    ],
    faq: [
      { q: bi("StoreHub ราคาเท่าไร?", "How much does StoreHub cost?"), a: bi("ตาม storehub.com/th/pricing (19 พ.ย. 2569) แพ็คเกจเริ่มต้น ฿990 กลาง ฿1,999 และโปร ฿4,800 ต่อเดือน ทุกแพ็คเกจรวม 1 จุดคิดเงินและ 1 สาขา จุดคิดเงินและสาขาเพิ่มเป็น add-on", "Per storehub.com/th/pricing (19 Nov 2026): Starter ฿990, Mid ฿1,999 and Pro ฿4,800 per month, each with 1 register and 1 outlet; extra registers and outlets are add-ons.") },
      faqMigrate("StoreHub"),
      faqTry,
    ],
  },

  // ─────────────────────────────────────────────────────────── Page365
  {
    slug: "page365",
    name: "Page365",
    category: "inventory",
    keyword: bi("ทางเลือก Page365", "Page365 alternative"),
    verified: bi("ข้อมูล Page365 ตรวจจาก page365.net/pricing และหน้าแรกของ Page365 เมื่อ 19 พ.ย. 2569", "Page365 facts checked on page365.net/pricing and Page365's home page, 19 Nov 2026"),
    sources: [
      { label: "page365.net/pricing", url: "https://www.page365.net/pricing" },
      { label: "page365.net", url: "https://www.page365.net/" },
    ],
    summary: bi(
      "Page365 เป็นระบบหลังบ้านสำหรับร้านขายออนไลน์ทางแชท รวมแชท Facebook LINE OA Instagram เปิดบิลออนไลน์ รับชำระ ส่งของ ไลฟ์ขายของ และสต็อกที่ซิงก์กับ Shopee Lazada TikTok Shop ราคาเข้าถึงง่าย Tonbab เป็น ERP ที่มีกล่องแชท LINE OA Messenger Instagram และดึงออเดอร์ Shopee Lazada อยู่ในระบบเดียวกับสต็อก การผลิต บัญชี และ HR",
      "Page365 is a back office for chat-commerce sellers — Facebook, LINE OA and Instagram chats, online bills, payments, shipping, live selling, and stock synced with Shopee, Lazada and TikTok Shop — at an accessible price. Tonbab is an ERP whose LINE OA, Messenger and Instagram inbox and Shopee/Lazada order pull sit in the same system as stock, production, accounting and HR.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ระบบขายของออนไลน์ผ่านแชท (chat commerce)", "Chat-commerce back office"), TONBAB_TYPE),
      row("ราคา (ต่อปี)", "Price (per year)", same("Solo ฿4,990 · Pro ฿8,990 · ProLive ฿18,990 · SME ฿39,900 · Enterprise ฿150,000"), TONBAB_PRICE),
      row("แอดมิน / บิลต่อเดือน", "Admins / bills per month", bi("2–25 แอดมิน · 800–50,000 บิล ตามแพ็กเกจ", "2–25 admins · 800–50,000 bills by plan"), bi("ผู้ใช้ Starter 5 · Standard 10 · Business 25 · ออเดอร์ 1,000 / 3,000 / ไม่จำกัด", "Users 5 / 10 / 25 · orders 1,000 / 3,000 / unlimited (Starter / Standard / Business)")),
      row("แชทและไลฟ์", "Chat and live selling", bi("แชท FB LINE OA IG รวมที่เดียว ตอบอัตโนมัติ บรอดแคสต์ ไลฟ์ FB/IG เปิดบิลอัตโนมัติ — จุดแข็งหลัก", "FB, LINE OA, IG chats in one place, auto-replies, broadcasts, FB/IG live selling with auto bills — the core strength"), bi(`กล่องแชท LINE OA Messenger Instagram ตอบสองทาง — อยู่ในบริการเสริมช่องทางขาย ${B.channels}/ปี (Business)`, `Two-way LINE OA, Messenger, Instagram inbox — in the sales-channels add-on, ${B.channels}/yr (Business)`)),
      row("มาร์เก็ตเพลส", "Marketplaces", bi("ซิงก์สต็อกกับ Shopee Lazada TikTok Shop", "Stock sync with Shopee, Lazada, TikTok Shop"), bi("ดึงออเดอร์ Shopee Lazada อัตโนมัติ · ส่งสต็อกกลับกำลังพัฒนา · TikTok Shop เร็ว ๆ นี้", "Automatic Shopee/Lazada order pull · stock push-back in development · TikTok Shop coming soon")),
      row("ขนส่งและชำระเงิน", "Shipping and payments", bi("Page365 Express · โอน พร้อมเพย์ บัตร · ตรวจสลิป ฿0.20/ครั้ง", "Page365 Express · transfer, PromptPay, card · slip check ฿0.20 each"), TONBAB_POS),
      row("การผลิต / บัญชี / เงินเดือน", "Manufacturing / accounting / payroll", bi("ไม่พบ (มีใบเสร็จและใบกำกับภาษี)", "Not found (receipts and tax invoices available)"), bi("มีในระบบเดียวกัน", "In the same system")),
    ],
    plans: [
      { name: same("Solo"), price: bi("฿799/เดือน หรือ ฿4,990/ปี", "฿799/mo or ฿4,990/yr"), note: bi("2 แอดมิน · 800 บิล · 3,000 แชทต่อเดือน", "2 admins · 800 bills · 3,000 chats a month") },
      { name: same("Pro"), price: bi("฿1,499/เดือน หรือ ฿8,990/ปี", "฿1,499/mo or ฿8,990/yr"), note: bi("4 แอดมิน · 2,000 บิล · 8,000 แชท", "4 admins · 2,000 bills · 8,000 chats") },
      { name: same("ProLive"), price: bi("฿2,999/เดือน หรือ ฿18,990/ปี", "฿2,999/mo or ฿18,990/yr"), note: bi("8 แอดมิน · 8,000 บิล · 15,000 แชท", "8 admins · 8,000 bills · 15,000 chats") },
      { name: same("SME"), price: bi("฿5,999/เดือน หรือ ฿39,900/ปี", "฿5,999/mo or ฿39,900/yr"), note: bi("15 แอดมิน · 20,000 บิล · 30,000 แชท", "15 admins · 20,000 bills · 30,000 chats") },
      { name: same("Enterprise"), price: bi("฿150,000/ปี", "฿150,000/yr"), note: bi("25 แอดมิน · 50,000 บิล · 200,000 แชท · รายปีเท่านั้น", "25 admins · 50,000 bills · 200,000 chats · yearly only") },
    ],
    plansNote: bi("ตรวจสลิป ฿0.20/ครั้ง ข้อความ LINE OA และการเชื่อม API (Enterprise) คิดเพิ่ม หน้าราคาไม่ระบุว่ารวม VAT หรือไม่", "Slip checks ฿0.20 each; LINE OA messaging and API integration (Enterprise) cost extra. The pricing page doesn't say whether VAT is included."),
    scenario: {
      title: bi("ร้านขายออนไลน์ทางแชท 4 แอดมิน ราว 2,000 บิลต่อเดือน", "A chat-commerce shop with 4 admins and about 2,000 bills a month"),
      them: bi("Page365 Pro รายปี", "Page365 Pro, yearly"),
      themTotal: bi("฿8,990 ต่อปี", "฿8,990 per year"),
      tonbab: bi(`Business ${B.business} + ช่องทางขายและกล่องแชท ${B.channels} — 25 ผู้ใช้ ออเดอร์ไม่จำกัด บัญชี สต็อก เงินเดือน`, `Business ${B.business} + sales channels and inbox ${B.channels} — 25 users, unlimited orders, accounting, stock, payroll`),
      tonbabTotal: bi(`${baht(TONBAB_YEARLY.business + TONBAB_YEARLY.channels)} ต่อปี`, `${baht(TONBAB_YEARLY.business + TONBAB_YEARLY.channels)} per year`),
      note: bi(`สำหรับร้านที่ขายผ่านแชทและไลฟ์เป็นหลัก Page365 ถูกกว่ามากและเชี่ยวชาญกว่า ทั้งไลฟ์ขายของ ขนส่ง และซิงก์ TikTok Shop Tonbab คุ้มเมื่อคุณผลิตเอง ขายส่ง มีหน้าร้าน หรือต้องการบัญชีและเงินเดือนในระบบเดียว ถ้าไม่ต้องใช้กล่องแชท Standard ${B.standard} รองรับ 3,000 ออเดอร์ต่อเดือน`, `For shops selling mainly through chat and live streams, Page365 is far cheaper and more specialised — live selling, shipping and TikTok Shop sync. Tonbab pays off when you produce, wholesale, run a counter, or want accounting and payroll in one system. Without the chat inbox, Standard at ${B.standard} covers 3,000 orders a month.`),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Page365 ทำให้การขายผ่านแชทและไลฟ์ครบจบ ตั้งแต่ทักแชทจนถึงส่งของ Tonbab ครอบคลุมทั้งบริษัท ออเดอร์จากแชทและมาร์เก็ตเพลสตัดสต็อกชุดเดียวกับหน้าร้าน โกดัง และการผลิต แล้วลงบัญชีในระบบเดียว", "Page365 makes chat and live selling complete, from the first message to shipping. Tonbab covers the whole company: orders from chat and marketplaces draw on the same stock as the counter, warehouse and production, and post to the books in one system."),
      ] },
    ],
    chooseThem: [
      bi("ขายผ่านแชท Facebook LINE Instagram และไลฟ์เป็นหลัก", "You sell mainly through Facebook, LINE and Instagram chat and live streams."),
      bi("ต้องการบริการขนส่งในตัวและซิงก์ TikTok Shop", "You want built-in shipping and TikTok Shop sync."),
    ],
    chooseTonbab: [
      bi("ผลิตหรือแพ็กสินค้าเอง ต้องการ BOM และต้นทุนจริง", "You produce or pack your own products and need BOMs and real cost."),
      bi("มีหน้าร้าน ขายส่ง และออนไลน์ และต้องการบัญชีกับเงินเดือนในระบบเดียว", "You sell in store, wholesale and online and want accounting and payroll in the same system."),
    ],
    faq: [
      { q: bi("Page365 ราคาเท่าไร?", "How much does Page365 cost?"), a: bi("ตาม page365.net/pricing (19 พ.ย. 2569) Solo ฿4,990/ปี Pro ฿8,990/ปี ProLive ฿18,990/ปี SME ฿39,900/ปี และ Enterprise ฿150,000/ปี หรือจ่ายรายเดือนเริ่ม ฿799 (ยกเว้น Enterprise)", "Per page365.net/pricing (19 Nov 2026): Solo ฿4,990/yr, Pro ฿8,990/yr, ProLive ฿18,990/yr, SME ฿39,900/yr and Enterprise ฿150,000/yr, or monthly from ฿799 (not Enterprise).") },
      faqMigrate("Page365"),
      faqTry,
    ],
  },

  // ─────────────────────────────────────────────────────────── HubSpot
  {
    slug: "hubspot",
    name: "HubSpot CRM",
    category: "crm",
    keyword: bi("ทางเลือก HubSpot CRM", "HubSpot CRM alternative"),
    verified: bi("ราคา HubSpot ตรวจจาก hubspot.com/pricing/crm และ /pricing/sales เมื่อ 19 พ.ย. 2569", "HubSpot prices checked on hubspot.com/pricing/crm and /pricing/sales, 19 Nov 2026"),
    sources: [
      { label: "hubspot.com/pricing/crm", url: "https://www.hubspot.com/pricing/crm" },
      { label: "hubspot.com/pricing/sales", url: "https://www.hubspot.com/pricing/sales" },
    ],
    summary: bi(
      "HubSpot เป็น CRM ระดับโลกที่เด่นเรื่องการตลาด อีเมล และการติดตามลูกค้าอัตโนมัติ มี CRM ฟรีสำหรับ 2 ผู้ใช้ แพ็กเกจเสียเงินคิดต่อที่นั่งเป็นดอลลาร์ Tonbab มี CRM อยู่ในระบบเดียวกับใบเสนอราคา สต็อก การผลิต และบัญชี ราคาต่อบริษัทเป็นเงินบาท",
      "HubSpot is a global CRM strong in marketing, email and sales automation, with a free CRM for 2 users and paid plans per seat in dollars. Tonbab has CRM in the same system as quotations, stock, manufacturing and accounting, priced per company in baht.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("CRM การตลาดและงานขายระดับโลก", "Global marketing and sales CRM"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย", "Published price", bi("Free 2 ผู้ใช้ · Sales Hub Starter US$20 · Professional US$90 (รายปี) · Enterprise US$150 ต่อที่นั่งต่อเดือน", "Free for 2 users · Sales Hub Starter US$20 · Professional US$90 (yearly) · Enterprise US$150 per seat per month"), TONBAB_PRICE),
      row("ค่าเริ่มต้นใช้งาน", "Onboarding fee", bi("Professional US$1,500 · Enterprise US$3,500 ครั้งเดียว", "Professional US$1,500 · Enterprise US$3,500 one-time"), bi(`ไม่มีค่าบังคับ · บริการตั้งค่า ${B.setup} ถ้าต้องการ`, `None required · optional ${B.setup} setup service`)),
      row("การตลาดอัตโนมัติ", "Marketing automation", bi("จุดแข็งหลัก — อีเมล ลำดับการติดตาม แคมเปญ", "Core strength — email, sequences, campaigns"), bi("ไม่ใช่จุดเน้น — CRM เน้นบัญชีลูกค้า ดีล และเยี่ยมลูกค้า", "Not a focus — CRM centres on accounts, deals and visits")),
      row("ใบเสนอราคา สต็อก บัญชี", "Quotes, stock, accounting", bi("ไม่มีสต็อกและบัญชีไทยในตัว", "No built-in stock or Thai accounting"), bi("ใบเสนอราคาถึงใบกำกับภาษี สต็อก ผลิต ในระบบเดียว", "Quotation to tax invoice, stock and production in one system")),
      row("ภาษีไทย", "Thai tax", bi("ไม่ใช่โปรแกรมบัญชี", "Not an accounting product"), TONBAB_TAX),
    ],
    plans: [
      { name: same("Free"), price: same("US$0"), note: bi("สูงสุด 2 ผู้ใช้ 1,000 รายชื่อ", "Up to 2 users, 1,000 contacts") },
      { name: same("Sales Hub Starter"), price: bi("US$20/ที่นั่ง/เดือน", "US$20/seat/mo"), note: bi("โปรลูกค้าใหม่ US$7 เมื่อจ่ายรายปี หรือ US$10 รายเดือน", "New-customer promo US$7 paid yearly or US$10 monthly") },
      { name: same("Sales Hub Professional"), price: bi("US$90/ที่นั่ง/เดือน (รายปี) · US$100 รายเดือน", "US$90/seat/mo (yearly) · US$100 monthly"), note: bi("ค่าเริ่มต้นใช้งาน US$1,500", "US$1,500 onboarding") },
      { name: same("Sales Hub Enterprise"), price: bi("US$150/ที่นั่ง/เดือน", "US$150/seat/mo"), note: bi("ค่าเริ่มต้นใช้งาน US$3,500", "US$3,500 onboarding") },
    ],
    plansNote: bi("ราคาเป็นดอลลาร์สหรัฐ ไม่รวมภาษี หน้าราคาแสดง Professional เป็น US$90 หรือ US$100 โดยไม่ระบุชัด เราอ่านว่า US$90 เมื่อผูกรายปี", "Prices are in US dollars, before tax. The page shows Professional as US$90 or US$100 without labelling them; we read US$90 as the yearly-commitment rate."),
    scenario: {
      title: bi("ทีมขาย 5 คน ต้องการไปป์ไลน์ ใบเสนอราคา และต่อกับสต็อกและบัญชี", "A 5-person sales team that needs pipelines and quotations connected to stock and accounting"),
      them: bi("Sales Hub Professional 5 ที่นั่ง × US$90 × 12 + ค่าเริ่มต้น US$1,500 + โปรแกรมบัญชี/สต็อกแยก", "Sales Hub Professional 5 seats × US$90 × 12 + US$1,500 onboarding + separate accounting/stock software"),
      themTotal: bi("≈ US$6,900 ปีแรก (≈ ฿227,700 ที่ราว 33 บาท/ดอลลาร์)", "≈ US$6,900 first year (≈ ฿227,700 at about 33 THB/USD)"),
      tonbab: bi(`Standard ${B.standard} — 10 ผู้ใช้ ลูกค้า 5,000 ดีลเปิด 1,000 พร้อมใบเสนอราคา สต็อก บัญชี`, `Standard ${B.standard} — 10 users, 5,000 customers, 1,000 open deals, with quotations, stock and accounting`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("อัตราแลกเปลี่ยนเป็นตัวเลขประมาณของเรา ถ้าต้องการแค่จดลูกค้าและดีล HubSpot Free (2 ผู้ใช้) ไม่มีค่าใช้จ่าย หรือ Starter ราคาถูกกว่ามาก ถ้าการตลาดอัตโนมัติ อีเมล และลำดับการติดตามคือหัวใจ HubSpot ครบกว่า Tonbab มาก", "The exchange rate is our approximation. If you only need to log customers and deals, HubSpot Free (2 users) costs nothing, and Starter is far cheaper. If marketing automation, email and sequences are the heart of your sales, HubSpot goes much further than Tonbab."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("HubSpot เริ่มจากการตลาดและการหาลูกค้า Tonbab เริ่มจากงานหลังการขาย ดีลที่ปิดได้กลายเป็นใบเสนอราคา ใบสั่งขาย การจัดส่ง และใบกำกับภาษีในระบบเดียว ฝ่ายขายเห็นสต็อกและสถานะการผลิตจริงก่อนรับปากลูกค้า", "HubSpot starts from marketing and lead generation. Tonbab starts from what happens after the sale: a won deal becomes a quotation, sales order, delivery and tax invoice in one system, and sales sees real stock and production status before promising a date."),
      ] },
    ],
    chooseThem: [
      bi("ต้องการการตลาดอัตโนมัติ อีเมล และลำดับการติดตามลูกค้าระดับลึก", "You need deep marketing automation, email and sales sequences."),
      bi("ทีมเล็กมาก และ CRM ฟรีสำหรับ 2 ผู้ใช้เพียงพอ", "Your team is tiny and a free CRM for 2 users is enough."),
    ],
    chooseTonbab: [
      bi("ต้องการให้ดีลต่อกับใบเสนอราคา สต็อก การผลิต และใบกำกับภาษีในระบบเดียว", "You want deals connected to quotations, stock, production and tax invoices in one system."),
      bi("ต้องการราคาเป็นเงินบาทต่อบริษัท ไม่ใช่ดอลลาร์ต่อที่นั่ง", "You want per-company pricing in baht, not dollars per seat."),
    ],
    faq: [
      { q: bi("HubSpot CRM ราคาเท่าไร?", "How much is HubSpot CRM?"), a: bi("หน้าราคาของ HubSpot (19 พ.ย. 2569) มี CRM ฟรีสำหรับ 2 ผู้ใช้ Sales Hub Starter ปกติ US$20/ที่นั่ง/เดือน (โปรลูกค้าใหม่เริ่ม US$7) Professional US$90 พร้อมค่าเริ่มต้น US$1,500 และ Enterprise US$150 พร้อมค่าเริ่มต้น US$3,500 ไม่รวมภาษี", "HubSpot's pricing pages (19 Nov 2026) list a free CRM for 2 users, Sales Hub Starter at normally US$20/seat/mo (new-customer promo from US$7), Professional at US$90 with US$1,500 onboarding, and Enterprise at US$150 with US$3,500 onboarding, before tax.") },
      faqMigrate("HubSpot"),
      faqTry,
    ],
  },

  // ───────────────────────────────────────────────────── Bigin by Zoho
  {
    slug: "bigin",
    name: "Bigin by Zoho CRM",
    category: "crm",
    keyword: bi("ทางเลือก Bigin by Zoho CRM", "Bigin by Zoho CRM alternative"),
    verified: bi("ราคา Bigin ตรวจจาก bigin.com/pricing เมื่อ 19 พ.ย. 2569 (แสดงเป็นดอลลาร์)", "Bigin prices checked on bigin.com/pricing, 19 Nov 2026 (shown in US dollars)"),
    sources: [{ label: "bigin.com/pricing", url: "https://www.bigin.com/pricing.html" }],
    summary: bi(
      "Bigin เป็น CRM แบบไปป์ไลน์สำหรับธุรกิจขนาดเล็กจาก Zoho ใช้ง่าย ราคาต่อผู้ใช้ต่ำ มีแพ็กเกจฟรี 1 ผู้ใช้ และต่อกับแอปอื่นของ Zoho ได้ Tonbab มี CRM อยู่ในระบบเดียวกับใบเสนอราคา สต็อก การผลิต บัญชี และ HR ราคาต่อบริษัทเป็นเงินบาท",
      "Bigin is Zoho's pipeline CRM for small businesses — simple, low per-user pricing, a free plan for 1 user, and it connects to other Zoho apps. Tonbab has CRM in the same system as quotations, stock, manufacturing, accounting and HR, priced per company in baht.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("CRM แบบไปป์ไลน์สำหรับธุรกิจเล็ก", "Pipeline CRM for small businesses"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย", "Published price", bi("Free 1 ผู้ใช้ · Express US$7 · Premier US$12 · Bigin 360 US$18 ต่อผู้ใช้ต่อเดือน (รายปี)", "Free for 1 user · Express US$7 · Premier US$12 · Bigin 360 US$18 per user per month (yearly)"), TONBAB_PRICE),
      row("ไปป์ไลน์ / รายการ", "Pipelines / records", bi("1 / 3 / 5 / 15 ไปป์ไลน์ · 500 ถึง 1,000,000 รายการ", "1 / 3 / 5 / 15 pipelines · 500 to 1,000,000 records"), bi("ลูกค้า 200 / 1,000 / 5,000 / ไม่จำกัด · ดีลเปิด 50 / 200 / 1,000 / ไม่จำกัด (Free ถึง Business)", "Customers 200 / 1,000 / 5,000 / unlimited · open deals 50 / 200 / 1,000 / unlimited (Free to Business)")),
      row("ใบเสนอราคา สต็อก บัญชี", "Quotes, stock, accounting", bi("ไม่อยู่ใน Bigin — ใช้แอปอื่นของ Zoho หรือโปรแกรมแยก", "Not in Bigin — other Zoho apps or separate software"), bi("ใบเสนอราคาถึงใบกำกับภาษี สต็อก ผลิต ในระบบเดียว", "Quotation to tax invoice, stock and production in one system")),
      row("ภาษีไทย", "Thai tax", bi("ไม่ใช่โปรแกรมบัญชี", "Not an accounting product"), TONBAB_TAX),
    ],
    plans: [
      { name: same("Free"), price: same("US$0"), note: bi("1 ผู้ใช้ · 1 ไปป์ไลน์ · 500 รายการ", "1 user · 1 pipeline · 500 records") },
      { name: same("Express"), price: bi("US$7/ผู้ใช้/เดือน (รายปี) · US$9 รายเดือน", "US$7/user/mo yearly · US$9 monthly"), note: bi("3 ไปป์ไลน์ · 50,000 รายการ", "3 pipelines · 50,000 records") },
      { name: same("Premier"), price: bi("US$12/ผู้ใช้/เดือน (รายปี) · US$15 รายเดือน", "US$12/user/mo yearly · US$15 monthly"), note: bi("5 ไปป์ไลน์ · 100,000 รายการ · AI 1,000 เครดิต/เดือน", "5 pipelines · 100,000 records · 1,000 AI credits/mo") },
      { name: same("Bigin 360"), price: bi("US$18/ผู้ใช้/เดือน (รายปี) · US$21 รายเดือน", "US$18/user/mo yearly · US$21 monthly"), note: bi("15 ไปป์ไลน์ · 1,000,000 รายการ · AI 3,000 เครดิต/เดือน", "15 pipelines · 1,000,000 records · 3,000 AI credits/mo") },
    ],
    plansNote: bi("ราคาแสดงเป็นดอลลาร์ (มี INR EUR GBP ให้เลือก) VAT/GST คิดเพิ่ม ราคาในไทยอาจต่างตามสกุลเงินที่ Zoho เรียกเก็บ", "Prices shown in US dollars (INR, EUR and GBP also offered); VAT/GST is added. Thai pricing may differ by the currency Zoho bills in."),
    scenario: {
      title: bi("ทีมขาย 5 คน ต้องการไปป์ไลน์หลายแบบ และอยากให้ดีลต่อกับใบเสนอราคาและสต็อก", "A 5-person sales team that needs several pipelines and wants deals tied to quotations and stock"),
      them: bi("Bigin Premier 5 ผู้ใช้ × US$12 × 12 เดือน + โปรแกรมใบเสนอราคา/สต็อก/บัญชีแยก", "Bigin Premier 5 users × US$12 × 12 months + separate quotation/stock/accounting software"),
      themTotal: bi("≈ US$720 ต่อปี (≈ ฿23,760 ที่ราว 33 บาท/ดอลลาร์) + ระบบอื่น", "≈ US$720 per year (≈ ฿23,760 at about 33 THB/USD) + other systems"),
      tonbab: bi(`Starter ${B.starter} — 5 ผู้ใช้ ลูกค้า 1,000 ดีลเปิด 200 พร้อมใบเสนอราคา สต็อก บัญชี · ถ้าลูกค้าเกิน 1,000 ราย Standard ${B.standard}`, `Starter ${B.starter} — 5 users, 1,000 customers, 200 open deals, with quotations, stock and accounting · Standard ${B.standard} above 1,000 customers`),
      tonbabTotal: bi(`${B.starter}–${B.standard} ต่อปี`, `${B.starter}–${B.standard} per year`),
      note: bi("อัตราแลกเปลี่ยนเป็นตัวเลขประมาณของเรา Bigin Express (US$7) หรือแพ็กเกจฟรีถูกและง่ายมากสำหรับ CRM อย่างเดียว และต่อกับแอป Zoho อื่นได้ ถ้าคุณใช้ Zoho อยู่แล้วหรือต้องการแค่ไปป์ไลน์ Bigin เหมาะกว่า", "The exchange rate is our approximation. Bigin Express (US$7) or the free plan is very cheap and simple for CRM alone, and connects to other Zoho apps. If you already use Zoho or only need a pipeline, Bigin is the better fit."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Bigin เป็น CRM ที่เบาและใช้ง่าย เหมาะกับการเริ่มเก็บลูกค้าและดีล Tonbab ใส่ CRM ไว้ในระบบเดียวกับงานหลังการขาย ดีลที่ปิดได้ต่อไปเป็นใบเสนอราคา ใบสั่งขาย การจัดส่ง และใบกำกับภาษี โดยไม่ต้องย้ายข้อมูลข้ามระบบ", "Bigin is a light, easy CRM for starting to track customers and deals. Tonbab puts CRM in the same system as everything after the sale: a won deal flows into a quotation, sales order, delivery and tax invoice without moving data between systems."),
      ] },
    ],
    chooseThem: [
      bi("ต้องการแค่ไปป์ไลน์การขายที่ง่ายและถูก", "You only need a simple, cheap sales pipeline."),
      bi("ใช้แอปของ Zoho อยู่แล้วและอยากให้ต่อกัน", "You already use Zoho apps and want them connected."),
    ],
    chooseTonbab: [
      bi("ต้องการให้ดีลต่อกับใบเสนอราคา สต็อก และใบกำกับภาษีในระบบเดียว", "You want deals connected to quotations, stock and tax invoices in one system."),
      bi("ต้องการบัญชี POS และเงินเดือนในระบบเดียวกับ CRM", "You want accounting, POS and payroll in the same system as your CRM."),
    ],
    faq: [
      { q: bi("Bigin ราคาเท่าไร?", "How much does Bigin cost?"), a: bi("ตาม bigin.com/pricing (19 พ.ย. 2569) Free สำหรับ 1 ผู้ใช้ Express US$7 Premier US$12 และ Bigin 360 US$18 ต่อผู้ใช้ต่อเดือนเมื่อจ่ายรายปี VAT คิดเพิ่ม", "Per bigin.com/pricing (19 Nov 2026): Free for 1 user, Express US$7, Premier US$12 and Bigin 360 US$18 per user per month billed yearly; VAT is added.") },
      faqMigrate("Bigin"),
      faqTry,
    ],
  },

  // ──────────────────────────────────────────────── Readyplanet R-CRM
  {
    slug: "readyplanet-crm",
    name: "Readyplanet R-CRM",
    category: "crm",
    keyword: bi("ทางเลือก Readyplanet R-CRM", "Readyplanet R-CRM alternative"),
    verified: bi("ข้อมูล R-CRM ตรวจจาก readyplanet.com/crm เมื่อ 19 พ.ย. 2569", "R-CRM facts checked on readyplanet.com/crm, 19 Nov 2026"),
    sources: [{ label: "readyplanet.com/crm", url: "https://www.readyplanet.com/crm" }],
    summary: bi(
      "R-CRM เป็นระบบ CRM บริหารทีมขายของ Readyplanet บริษัทไทย ออกแบบเพื่อธุรกิจไทย มีลีด ไปป์ไลน์ ใบเสนอราคาพร้อมอนุมัติ ออเดอร์ เช็กอินเซลส์ เป้ายอดขาย และรับลีดจาก Facebook ต่อกับ R-ChatCenter ได้ Tonbab มี CRM อยู่ในระบบเดียวกับสต็อก การผลิต บัญชี และ HR ราคาต่อบริษัท",
      "R-CRM is the sales-team CRM from Thai company Readyplanet, designed for Thai businesses — leads, pipelines, quotations with approval, orders, sales check-in, sales targets and Facebook lead capture, connecting to R-ChatCenter. Tonbab has CRM in the same system as stock, manufacturing, accounting and HR, priced per company.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("CRM บริหารทีมขาย สร้างเพื่อธุรกิจไทย", "Sales-team CRM built for Thai businesses"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย", "Published price", bi("Platinum ฿31,500/ปี หรือ ฿53,500/2 ปี (3 ผู้ใช้) · ผู้ใช้เพิ่ม ฿10,500/คน/ปี", "Platinum ฿31,500/yr or ฿53,500/2 yrs (3 users) · extra user ฿10,500/yr each"), TONBAB_PRICE),
      row("ลูกค้าและลีด", "Contacts and leads", bi("500,000 รายชื่อ · ลีดและบัญชีไม่จำกัด · 10 ไปป์ไลน์", "500,000 contacts · unlimited leads and accounts · 10 pipelines"), bi("ลูกค้า 200 / 1,000 / 5,000 / ไม่จำกัด · ดีลเปิด 50 / 200 / 1,000 / ไม่จำกัด (Free ถึง Business)", "Customers 200 / 1,000 / 5,000 / unlimited · open deals 50 / 200 / 1,000 / unlimited (Free to Business)")),
      row("งานขายภาคสนาม", "Field sales", bi("เช็กอินเซลส์ เป้ายอดขาย อนุมัติใบเสนอราคา", "Sales check-in, targets, quotation approval"), bi("เยี่ยมลูกค้าและเช็กอิน KPI ทีมขาย ทุกแพ็กเกจ", "Field visits with check-in and sales KPIs on every plan")),
      row("ลีดออนไลน์และแชท", "Online leads and chat", bi("รับลีด Facebook · API นำเข้า/ส่งออกลีด · ต่อ R-ChatCenter", "Facebook leads · lead import/export API · R-ChatCenter link"), bi(`กล่องแชท LINE OA Messenger Instagram (บริการเสริม ${B.channels}/ปี Business) · REST API`, `LINE OA, Messenger, Instagram inbox (${B.channels}/yr add-on, Business) · REST API`)),
      row("สต็อก บัญชี เงินเดือน", "Stock, accounting, payroll", bi("ไม่มี (มีออเดอร์ ใบเสนอราคา ใบแจ้งหนี้ในระบบ CRM)", "No (orders, quotations and invoices inside the CRM)"), bi("สต็อก ผลิต บัญชีพร้อมภาษีไทย เงินเดือน ในระบบเดียว", "Stock, production, accounting with Thai tax, payroll in one system")),
    ],
    plans: [
      { name: same("Platinum (1 ปี)"), price: same("฿31,500"), note: bi("3 ผู้ใช้ · 500,000 รายชื่อ · ใบเสนอราคา ออเดอร์ ใบแจ้งหนี้ไม่จำกัด", "3 users · 500,000 contacts · unlimited quotations, orders, invoices") },
      { name: same("Platinum (2 ปี)"), price: bi("฿53,500 (เฉลี่ย ฿26,750/ปี)", "฿53,500 (avg ฿26,750/yr)"), note: bi("เหมือน 1 ปี", "Same as 1 year") },
      { name: bi("เพิ่มเติม", "Add-ons"), price: bi("ผู้ใช้ ฿10,500/คน/ปี · รายชื่อ ฿5,000/100,000/ปี", "User ฿10,500/yr · contacts ฿5,000 per 100,000/yr"), note: bi("เฉพาะลูกค้า Platinum", "Platinum customers only") },
    ],
    plansNote: bi("ราคาไม่รวม VAT 7% และไม่รวมค่าติดตั้งและโดเมนใหม่ (เริ่ม ฿600/ปี) ทดลองใช้ฟรี 14 วัน", "Prices exclude 7% VAT and installation/new domain (from ฿600/yr). 14-day free trial."),
    scenario: {
      title: bi("ทีมขาย 5 คน ลูกค้าราว 3,000 ราย ต้องการไปป์ไลน์ ใบเสนอราคา และเช็กอินเยี่ยมลูกค้า", "A 5-person sales team with about 3,000 customers that needs pipelines, quotations and visit check-in"),
      them: bi("R-CRM Platinum ฿31,500 (3 ผู้ใช้) + ผู้ใช้เพิ่ม 2 คน ฿21,000", "R-CRM Platinum ฿31,500 (3 users) + 2 extra users ฿21,000"),
      themTotal: bi("฿52,500 ต่อปี (CRM อย่างเดียว)", "฿52,500 per year (CRM only)"),
      tonbab: bi(`Standard ${B.standard} — 10 ผู้ใช้ ลูกค้า 5,000 ดีลเปิด 1,000 เยี่ยมลูกค้า พร้อมสต็อก บัญชี เงินเดือน`, `Standard ${B.standard} — 10 users, 5,000 customers, 1,000 open deals, field visits, plus stock, accounting, payroll`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("R-CRM รองรับรายชื่อได้มากกว่ามาก (500,000) มีระบบอนุมัติใบเสนอราคา รับลีด Facebook และซัพพอร์ตทางโทรศัพท์ 24 ชั่วโมง ถ้าทีมขายใหญ่ที่เน้นลีดออนไลน์คือหัวใจ R-CRM เป็นตัวเลือกที่ดี", "R-CRM holds far more contacts (500,000), has quotation approval, Facebook lead capture and 24-hour phone support. If a large sales team working online leads is the heart of your business, R-CRM is a good choice."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("R-CRM เป็น CRM ไทยที่เน้นบริหารทีมขายและลีดออนไลน์ Tonbab ใส่ CRM ไว้ในระบบเดียวกับงานหลังการขาย ฝ่ายขายเห็นสต็อกและสถานะการผลิตจริง และดีลที่ปิดได้ต่อเป็นใบสั่งขาย การจัดส่ง และใบกำกับภาษีในระบบเดียว", "R-CRM is a Thai CRM focused on managing the sales team and online leads. Tonbab puts CRM in the same system as everything after the sale: sales sees real stock and production status, and a won deal becomes a sales order, delivery and tax invoice in one system."),
      ] },
    ],
    chooseThem: [
      bi("ทีมขายจัดการลีดออนไลน์จำนวนมาก (Facebook, เว็บไซต์) และต้องการระบบอนุมัติใบเสนอราคา", "Your sales team handles many online leads (Facebook, website) and needs quotation approval."),
      bi("ใช้บริการอื่นของ Readyplanet อยู่แล้ว เช่น R-ChatCenter หรือเว็บไซต์", "You already use other Readyplanet services such as R-ChatCenter or its websites."),
    ],
    chooseTonbab: [
      bi("ต้องการให้ CRM ต่อกับสต็อก การผลิต และบัญชีในระบบเดียว", "You want CRM connected to stock, production and accounting in one system."),
      bi("อยากได้ผู้ใช้มากกว่าในราคาต่อบริษัท แทนการจ่ายต่อผู้ใช้", "You want more users at a per-company price instead of paying per user."),
    ],
    faq: [
      { q: bi("Readyplanet R-CRM ราคาเท่าไร?", "How much does Readyplanet R-CRM cost?"), a: bi("ตาม readyplanet.com/crm (19 พ.ย. 2569) แพ็กเกจ Platinum ฿31,500/ปี หรือ ฿53,500/2 ปี สำหรับ 3 ผู้ใช้ ผู้ใช้เพิ่ม ฿10,500/คน/ปี ราคาไม่รวม VAT และค่าติดตั้ง", "Per readyplanet.com/crm (19 Nov 2026): Platinum is ฿31,500/yr or ฿53,500 for 2 years for 3 users; extra users ฿10,500/yr each, before VAT and installation.") },
      faqMigrate("R-CRM"),
      faqTry,
    ],
  },
];

export const getVendorCompare = (slug: string) => vendorCompares.find((v) => v.slug === slug);

/** Up to `n` other comparisons, same category first. */
export const relatedCompares = (v: VendorCompare, n = 6) =>
  [
    ...vendorCompares.filter((x) => x.slug !== v.slug && x.category === v.category),
    ...vendorCompares.filter((x) => x.slug !== v.slug && x.category !== v.category),
  ].slice(0, n);
