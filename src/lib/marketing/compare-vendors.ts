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
 *    Starter since 2026-11-18; e-Tax Invoice is not supported yet.
 *
 * Re-verified 2026-11-18 (competitor pricing pages + docs). Prices before VAT.
 * Tonbab prices come from TONBAB_YEARLY below — when plans change, update it
 * and re-read every `scenario` (the verdict can flip).
 */
import type { Bi } from "./compare-data";

export type VendorCategory = "accounting" | "erp" | "inventory" | "pos" | "hr";

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
};

// ── Tonbab facts (mirror the product's plans.ts; per company per year, before VAT) ──
export const TONBAB_YEARLY = { starter: 2990, standard: 6000, business: 14400, enterprise: 42000, setup: 9900, channels: 2400, hikcentral: 2400 };
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
  "รวมในแพ็กเกจ Starter ขึ้นไป — ใบเสนอราคาถึงใบกำกับภาษี ใบเสร็จ บิลซื้อ สมุดบัญชี งบการเงิน",
  "Included from Starter — quotation to tax invoice, receipts, bills, ledger, financial statements",
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
  "หลายคลังทุกแพ็กเกจ · ล็อตและซีเรียล (Standard ขึ้นไป) · ต้นทุนถึงคลังสำหรับสินค้านำเข้า",
  "Multi-warehouse on every plan · lots and serials (Standard+) · landed cost for imports",
);
const TONBAB_POS = bi(
  "มีในทุกแพ็กเกจ — บัตรและพร้อมเพย์ผ่าน Beam, QR พร้อมเพย์ของร้าน, ตรวจสลิป (Starter+), ใบสั่งครัว (Standard+)",
  "On every plan — cards and PromptPay via Beam, your own PromptPay QR, slip checking (Starter+), kitchen tickets (Standard+)",
);
const TONBAB_HR = bi(
  "การลา เวลาทำงาน และเงินเดือน (Standard ขึ้นไป พนักงาน 50 คน · Business 200 คน)",
  "Leave, attendance and payroll (Standard+ for 50 staff · Business 200)",
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
      `ได้ หลายบริษัทให้สำนักงานบัญชีทำงานบน ${name} ต่อ และใช้ Tonbab ดูแลจัดซื้อ สต็อก การผลิต และหน้าร้าน แล้วส่งเอกสารที่สะอาดให้ฝ่ายบัญชี เมื่อพร้อมจะรวมบัญชีมาไว้ที่เดียวก็ทำได้ เพราะบัญชีรวมอยู่ในแพ็กเกจ Tonbab ตั้งแต่ Starter`,
      `Yes. Many companies keep their accounting firm on ${name} and run purchasing, stock, production and retail in Tonbab, handing over clean documents. When you want one system, Tonbab's accounting is already in every plan from Starter.`,
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
    verified: bi("ข้อมูล FlowAccount ตรวจจากหน้าราคาและศูนย์ช่วยเหลือของ FlowAccount เมื่อ 18 พ.ย. 2569", "FlowAccount facts checked on FlowAccount's pricing page and help centre, 18 Nov 2026"),
    sources: [{ label: "flowaccount.com/pricing", url: "https://flowaccount.com/pricing" }],
    summary: bi(
      "FlowAccount เป็นโปรแกรมบัญชีออนไลน์ยอดนิยมของไทย เด่นเรื่องออกเอกสารขาย ภาษี และ e-Tax ราคาเริ่มต้นเข้าถึงง่าย ส่วน Tonbab เป็น ERP ที่มีบัญชีรวมอยู่ตั้งแต่แพ็กเกจ Starter พร้อมจัดซื้อ สต็อกหลายคลัง การผลิต POS CRM และเงินเดือนในฐานข้อมูลเดียว เหมาะกับธุรกิจที่งานก่อนถึงบัญชีซับซ้อน เช่น โรงงาน ผู้นำเข้า และร้านที่มีหลายสาขา",
      "FlowAccount is a popular Thai online accounting app — strong on sales documents, tax and e-Tax, with an easy entry price. Tonbab is an ERP with accounting included from the Starter plan, plus purchasing, multi-warehouse stock, manufacturing, POS, CRM and payroll in one database — a fit when the work before the books is complex: factories, importers, multi-branch shops.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("โปรแกรมบัญชีออนไลน์ + MobilePOS", "Online accounting + MobilePOS"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย (ต่อปี)", "Published price (per year)", bi("Free · Standard ฿1,990 · Pro ฿2,990 · Pro Business ฿5,490 · เงินเดือนเป็นผลิตภัณฑ์แยก", "Free · Standard ฿1,990 · Pro ฿2,990 · Pro Business ฿5,490 · payroll is a separate product"), TONBAB_PRICE),
      row("ผู้ใช้", "Users", bi("Free/Standard 1 คน · Pro ขึ้นไปไม่จำกัด", "Free/Standard 1 · Pro and up unlimited"), TONBAB_USERS),
      row("บัญชีและภาษีไทย", "Accounting & Thai tax", bi("มี — จุดแข็งหลัก รวม e-Tax", "Yes — a core strength, including e-Tax"), TONBAB_ACC),
      row("สต็อก", "Inventory", bi("เริ่มที่ Pro · หลายคลัง (สูงสุด 50) ใน Pro Business · ไม่พบล็อต/ซีเรียล", "From Pro · multiple warehouses (up to 50) on Pro Business · lots/serials not found"), TONBAB_STOCK),
      row("การผลิต (BOM / ใบสั่งผลิต)", "Manufacturing (BOM / work orders)", bi("ไม่มี — มี BOQ สำหรับงานรับเหมา", "No — a BOQ document for contracting only"), TONBAB_MFG),
      row("จัดซื้อเทียบราคา (RFQ)", "Purchasing RFQ comparison", bi("ไม่พบ", "Not found"), bi("มี โหมดในประเทศและนำเข้า (Standard ขึ้นไป)", "Yes, domestic and import modes (Standard+)")),
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
      title: bi("บริษัทซื้อมาขายไป 10 คน มี 2 คลัง ต้องการบัญชี สต็อก และเงินเดือนพนักงาน 10 คน", "A 10-person trading company with 2 warehouses that needs accounting, stock and payroll for 10 staff"),
      them: bi("Pro Business ฿5,490 (หลายคลัง) + FlowAccount Payroll ฿2,990", "Pro Business ฿5,490 (multi-warehouse) + FlowAccount Payroll ฿2,990"),
      themTotal: bi("≈ ฿8,480 ต่อปี", "≈ ฿8,480 per year"),
      tonbab: bi(`Standard ${B.standard} — บัญชี สต็อก 5 คลัง ล็อต เงินเดือน 50 คน ผู้ใช้ 10 คน พร้อม CRM และ POS`, `Standard ${B.standard} — accounting, stock in 5 warehouses, lots, payroll for 50, 10 users, with CRM and POS`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("ถ้าต้องการ e-Tax Invoice หรือมีคนทำงานบัญชีอย่างเดียวมากกว่า 10 คน FlowAccount Pro ที่ผู้ใช้ไม่จำกัดคุ้มกว่า", "If you need e-Tax Invoice, or more than 10 people working only in the books, FlowAccount Pro with unlimited users is the better deal."),
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
      { q: bi("Tonbab ถูกกว่า FlowAccount ไหม?", "Is Tonbab cheaper than FlowAccount?"), a: bi(`ขึ้นกับสิ่งที่ใช้ ถ้าใช้บัญชีอย่างเดียว FlowAccount Standard ฿1,990/ปี ถูกกว่า ถ้าต้องการบัญชี สต็อกหลายคลัง และเงินเดือน Tonbab Standard ${B.standard}/ปี ครอบคลุมทั้งหมดในราคาเดียว ส่วน FlowAccount Pro Business + Payroll รวมประมาณ ฿8,480/ปี (ราคาก่อน VAT ณ 18 พ.ย. 2569)`, `It depends. For accounting alone, FlowAccount Standard at ฿1,990/yr is cheaper. For accounting plus multi-warehouse stock and payroll, Tonbab Standard covers it all for ${B.standard}/yr, while FlowAccount Pro Business + Payroll comes to about ฿8,480/yr (before VAT, 18 Nov 2026).`) },
      { q: bi("Tonbab ออกใบกำกับภาษีได้ไหม?", "Can Tonbab issue tax invoices?"), a: bi("ได้ ในโมดูลบัญชี (Starter ขึ้นไป) มีใบเสนอราคา ใบแจ้งหนี้/ใบกำกับภาษี ใบวางบิล ใบเสร็จ ใบลดหนี้ รายงาน ภ.พ.30 และหัก ณ ที่จ่าย แต่ยังไม่รองรับ e-Tax Invoice", "Yes. Accounting (Starter and up) issues quotations, invoices/tax invoices, billing notes, receipts and credit notes, with PP30 and withholding-tax reports. e-Tax Invoice is not supported yet.") },
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
      "PEAK เป็นโปรแกรมบัญชีออนไลน์ที่สำนักงานบัญชีไทยนิยม เด่นเรื่องภาษี e-Tax และงานบัญชีครบ ส่วน Tonbab เป็น ERP ที่มีบัญชีรวมอยู่ตั้งแต่ Starter และเน้นงานปฏิบัติการ ตั้งแต่จัดซื้อ สต็อก การผลิต จนถึงหน้าร้านและงานขาย",
      "PEAK is an online accounting app favoured by Thai accounting firms — strong on tax, e-Tax and complete bookkeeping. Tonbab is an ERP with accounting included from Starter, focused on operations: purchasing, stock and manufacturing through to retail and sales.",
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
      title: bi("บริษัท 10 คน ต้องการบัญชีและสต็อกพร้อมล็อตสินค้า", "A 10-person company that needs accounting and stock with lots"),
      them: bi("PEAK PRO ฿9,000 (10 ผู้ใช้ FIFO ล็อต) · เงินเดือนคิดแยก", "PEAK PRO ฿9,000 (10 users, FIFO, lots) · payroll extra"),
      themTotal: bi("≈ ฿9,000+ ต่อปี", "≈ ฿9,000+ per year"),
      tonbab: bi(`Standard ${B.standard} — 10 ผู้ใช้ บัญชี ล็อตและซีเรียล เงินเดือน CRM POS`, `Standard ${B.standard} — 10 users, accounting, lots and serials, payroll, CRM, POS`),
      tonbabTotal: bi(`${B.standard} ต่อปี`, `${B.standard} per year`),
      note: bi("ถ้าต้องการ e-Tax Invoice หรือทำงานร่วมกับสำนักงานบัญชีที่ใช้ PEAK อยู่แล้ว PEAK ยังเป็นตัวเลือกที่ดี", "If you need e-Tax Invoice or work with an accounting firm already on PEAK, PEAK remains a good choice."),
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
    verified: bi("ข้อมูล MineERP ตรวจจาก mineerp.com/pricing และเว็บไซต์ MineERP เมื่อ 18 พ.ย. 2569", "MineERP facts checked on mineerp.com/pricing and the MineERP website, 18 Nov 2026"),
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
      tonbab: bi(`Business ${B.business} (25 ผู้ใช้ การผลิต บัญชี เงินเดือน) + บริการตั้งค่า ${B.setup} ถ้าต้องการ`, `Business ${B.business} (25 users, manufacturing, accounting, payroll) + optional ${B.setup} setup`),
      tonbabTotal: bi(`${baht(TONBAB_YEARLY.business)}–${baht(TONBAB_YEARLY.business + TONBAB_YEARLY.setup)} ปีแรก`, `${baht(TONBAB_YEARLY.business)}–${baht(TONBAB_YEARLY.business + TONBAB_YEARLY.setup)} first year`),
      note: bi("MineERP มีการวางแผนการผลิตด้วย AI และทีมวางระบบให้ ค่าวางระบบนั้นรวมบริการที่ปรึกษาที่ Tonbab ไม่ได้รวมไว้ในราคาแพ็กเกจ", "MineERP includes AI production scheduling and a hands-on implementation team; its onboarding fee buys consulting that Tonbab doesn't bundle into the plan price."),
    },
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("ทั้งสองระบบเป็น ERP บนคลาวด์ของไทยที่เข้าใจงานโรงงาน MineERP เน้นการวางแผนและจัดลำดับการผลิตลึก พร้อมทีมวางระบบ Tonbab เน้นให้ทุกฝ่ายอยู่ในระบบเดียว ตั้งแต่จัดซื้อ การผลิต จนถึงบัญชี หน้าร้าน CRM และเงินเดือน", "Both are Thai cloud ERPs that understand factories. MineERP goes deep on production planning and scheduling, with an implementation team. Tonbab puts every department in one system — purchasing and production through to accounting, retail, CRM and payroll."),
        bi("MineERP ไม่มีบัญชีในตัวและเชื่อมกับ FlowAccount แทน ใน Tonbab การรับสินค้า เบิกวัตถุดิบ และส่งของลงบัญชีด้วยต้นทุนจริงในระบบเดียว", "MineERP has no built-in accounting and links to FlowAccount instead. In Tonbab, goods receipts, material issues and deliveries post to the ledger at real cost in the same system."),
      ] },
      { h: bi("ราคาและวิธีเริ่มต้น", "Price and how you start"), p: [
        bi(`MineERP คิดตามจำนวนผู้ใช้ เริ่ม ฿46,800/ปี บวกค่าวางระบบ ฿50,000 ขึ้นไป Tonbab คิดต่อบริษัท Business ${B.business}/ปี สำหรับ 25 ผู้ใช้ สมัครแล้วใช้ได้ทันทีพร้อมทดลอง 30 วัน`, `MineERP prices by user tier from ฿46,800/yr plus onboarding from ฿50,000. Tonbab prices per company — Business is ${B.business}/yr for 25 users — and you can start today with a 30-day trial.`),
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
      { q: bi("MineERP ราคาเท่าไร?", "How much does MineERP cost?"), a: bi("ตามหน้า mineerp.com/pricing (18 พ.ย. 2569) แพ็กเกจ Trader เริ่ม ฿46,800/ปี (5 ผู้ใช้) และ Manufacturer เริ่ม ฿70,800/ปี (5 ผู้ใช้) บวกค่าวางระบบ ฿50,000–140,000 ครั้งเดียว ราคาก่อน VAT", "Per mineerp.com/pricing (18 Nov 2026): Trader from ฿46,800/yr (5 users) and Manufacturer from ฿70,800/yr (5 users), plus a one-time onboarding fee of ฿50,000–140,000, before VAT.") },
      { q: bi("MineERP มีระบบบัญชีไหม?", "Does MineERP include accounting?"), a: bi("ไม่มีในตัว เว็บไซต์ระบุว่าส่งออกเป็น Excel หรือเชื่อม FlowAccount ผ่าน API ส่วน Tonbab มีบัญชีรวมในแพ็กเกจ Starter ขึ้นไป", "Not built in — its site says it exports to Excel or connects to FlowAccount by API. Tonbab includes accounting from the Starter plan.") },
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
    verified: bi("ข้อมูล ZORT ตรวจจาก zortout.com/package เมื่อ 18 พ.ย. 2569", "ZORT facts checked on zortout.com/package, 18 Nov 2026"),
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
      title: bi("ร้านออนไลน์ทีม 5 คน 2 คลัง ขายบน Shopee ประมาณ 2,000 ออเดอร์ต่อเดือน", "A 5-person online shop with 2 warehouses selling on Shopee, ~2,000 orders a month"),
      them: bi("Professional ฿15,000 + ผู้ใช้เพิ่ม 2 คน ฿7,800", "Professional ฿15,000 + 2 extra users ฿7,800"),
      themTotal: bi("≈ ฿22,800 ต่อปี (ไม่รวมบัญชี)", "≈ ฿22,800 per year (no accounting)"),
      tonbab: bi(`Business ${B.business} + ทุกช่องทางขาย ${B.channels} — 25 ผู้ใช้ ออเดอร์ไม่จำกัด บัญชี POS`, `Business ${B.business} + all sales channels ${B.channels} — 25 users, unlimited orders, accounting, POS`),
      tonbabTotal: bi(`${baht(TONBAB_YEARLY.business + TONBAB_YEARLY.channels)} ต่อปี`, `${baht(TONBAB_YEARLY.business + TONBAB_YEARLY.channels)} per year`),
      note: bi("ZORT ทำงานเชื่อมมาร์เก็ตเพลสมานานและเชี่ยวชาญด้านนี้ ถ้าธุรกิจคุณคือขายออนไลน์ล้วน ควรทดลองทั้งสองระบบกับร้านจริงก่อนตัดสินใจ", "ZORT has long, focused experience with marketplace sync. If you sell purely online, trial both with your real shops before deciding."),
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
      { q: bi("ZORT ราคาเท่าไร?", "How much does ZORT cost?"), a: bi("ตาม zortout.com/package (18 พ.ย. 2569) Starter ฿6,300/ปี Professional ฿15,000/ปี Business ฿24,000/ปี หรือจ่ายรายไตรมาส ผู้ใช้เพิ่ม ฿3,900/คน/ปี", "Per zortout.com/package (18 Nov 2026): Starter ฿6,300/yr, Professional ฿15,000/yr, Business ฿24,000/yr, or quarterly; extra users ฿3,900/yr each.") },
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
      "Express เป็นโปรแกรมบัญชีแบบติดตั้งบนเครื่องที่ธุรกิจไทยใช้มานาน นักบัญชีคุ้นเคย ส่วน Tonbab เป็นระบบคลาวด์ ใช้ได้ทุกที่ทุกอุปกรณ์ มีบัญชีรวมตั้งแต่ Starter และครอบคลุมงานผลิต สต็อก POS และงานขาย",
      "Express is long-established Thai on-premise accounting software that accountants know well. Tonbab is cloud-based, works on any device, includes accounting from Starter, and covers manufacturing, stock, POS and sales.",
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
    verified: bi("ข้อมูล Prosoft ตรวจจาก prosoftwinspeed.com และหน้าราคา myAccount Cloud เมื่อ 18 พ.ย. 2569", "Prosoft facts checked on prosoftwinspeed.com and the myAccount Cloud price page, 18 Nov 2026"),
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
      { q: bi("Prosoft WINSpeed ราคาเท่าไร?", "How much does Prosoft WINSpeed cost?"), a: bi("Prosoft ไม่เปิดเผยราคาตั้ง เว็บไซต์ WINSpeed ระบุว่าไลเซนส์และการวางระบบอยู่ราว ฿250,000–2,000,000 ขึ้นกับจำนวนผู้ใช้และการปรับแต่ง และค่าดูแลรายปี 10% ของมูลค่าซอฟต์แวร์ (ตรวจ 18 พ.ย. 2569)", "Prosoft publishes no list price. The WINSpeed site gives roughly ฿250,000–2,000,000 for licence and implementation depending on users and customisation, with yearly maintenance at 10% of software value (checked 18 Nov 2026).") },
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
    verified: bi("ราคา Odoo ตรวจจาก odoo.com/th_TH/pricing เมื่อ 18 พ.ย. 2569 ข้อมูลภาษาไทยและภาษีไทยจากเอกสารของ Odoo ตรวจเมื่อ ส.ค. 2569", "Odoo prices checked on odoo.com/th_TH/pricing, 18 Nov 2026; Thai-language and Thai-tax facts from Odoo's documentation, Aug 2026"),
    sources: [{ label: "odoo.com/th_TH/pricing", url: "https://www.odoo.com/th_TH/pricing" }],
    summary: bi(
      "Odoo เป็น ERP ระดับโลกที่มีแอปมากมายและปรับแต่งได้สูง คิดราคาต่อผู้ใช้เป็นดอลลาร์ และมักต้องใช้พาร์ทเนอร์วางระบบ Tonbab เป็น ERP ที่สร้างเพื่อธุรกิจไทยตั้งแต่ต้น ภาษาไทยครบทุกหน้า คิดราคาต่อบริษัทเป็นเงินบาท และสมัครใช้เองได้",
      "Odoo is a global ERP with a huge app catalogue and deep customisation, priced per user in US dollars and usually implemented by a partner. Tonbab was built for Thai businesses from day one — fully Thai interface, per-company pricing in baht, self-serve signup.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("ERP ระดับโลก แอปจำนวนมาก", "Global ERP with many apps"), TONBAB_TYPE),
      row("ราคาที่เปิดเผย", "Published price", bi("Standard US$16.90/ผู้ใช้/เดือน (รายปี) · Custom US$32.00 · ไม่มีราคาเงินบาท", "Standard US$16.90/user/mo (yearly) · Custom US$32.00 · no THB price"), TONBAB_PRICE),
      row("ภาษาไทยในหน้าจอ", "Thai interface", bi("แปลไทยราว 69% บน v19 (ข้อมูลของ Odoo, ส.ค. 2569)", "About 69% translated to Thai on v19 (Odoo's own data, Aug 2026)"), TONBAB_LANG),
      row("ภาษีไทย", "Thai tax", bi("รายงานภาษีไทยอยู่ใน Enterprise · เอกสารระบุว่าออก 50 ทวิ ไม่ได้", "Thai tax reports are Enterprise-only · docs say it can't produce the 50 Tawi certificate"), TONBAB_TAX),
      row("การผลิต", "Manufacturing", bi("มี — MRP เต็มรูปแบบ", "Yes — full MRP"), TONBAB_MFG),
      row("การวางระบบ", "Implementation", bi("ส่วนใหญ่ผ่านพาร์ทเนอร์ คิดค่าบริการแยก", "Usually through a partner, billed separately"), bi(`สมัครเองได้ทันที หรือบริการตั้งค่า ${B.setup}`, `Self-serve today, or a ${B.setup} setup service`)),
    ],
    plans: [
      { name: same("One App Free"), price: same("US$0"), note: bi("แอปเดียว ผู้ใช้ไม่จำกัด", "One app, unlimited users") },
      { name: same("Standard"), price: bi("US$16.90/ผู้ใช้/เดือน (รายปี) · US$21.10 รายเดือน", "US$16.90/user/mo yearly · US$21.10 monthly"), note: bi("ทุกแอปบน Odoo Online · ปีแรกมีส่วนลด", "All apps on Odoo Online · first-year discount") },
      { name: same("Custom"), price: bi("US$32.00/ผู้ใช้/เดือน (รายปี) · US$40.00 รายเดือน", "US$32.00/user/mo yearly · US$40.00 monthly"), note: bi("Studio หลายบริษัท API ภายนอก Odoo.sh หรือติดตั้งเอง", "Studio, multi-company, external API, Odoo.sh or on-premise") },
    ],
    plansNote: bi("หน้าราคาภาษาไทยของ Odoo แสดงเป็นดอลลาร์สหรัฐ ค่าวางระบบของพาร์ทเนอร์ไม่รวม", "Odoo's Thai pricing page shows US dollars. Partner implementation fees are extra."),
    scenario: {
      title: bi("บริษัท 20 ผู้ใช้ ต้องการสต็อก ผลิต บัญชี และ CRM", "A 20-user company that needs stock, manufacturing, accounting and CRM"),
      them: bi("Odoo Standard 20 ผู้ใช้ × US$16.90 × 12 เดือน + ค่าวางระบบของพาร์ทเนอร์", "Odoo Standard 20 users × US$16.90 × 12 months + partner implementation"),
      themTotal: bi("≈ US$4,056 ต่อปี (≈ ฿130,000 ที่ราว 33 บาท/ดอลลาร์) + ค่าวางระบบ", "≈ US$4,056 per year (≈ ฿130,000 at about 33 THB/USD) + implementation"),
      tonbab: bi(`Business ${B.business} — 25 ผู้ใช้ ทุกโมดูล`, `Business ${B.business} — 25 users, every module`),
      tonbabTotal: bi(`${B.business} ต่อปี`, `${B.business} per year`),
      note: bi("อัตราแลกเปลี่ยนเป็นตัวเลขประมาณของเรา ไม่ใช่ของ Odoo ถ้าต้องการปรับแต่งระบบมาก หรือใช้แอปที่ Tonbab ไม่มี Odoo ยืดหยุ่นกว่า", "The exchange rate is our approximation, not Odoo's. If you need heavy customisation or apps Tonbab doesn't have, Odoo is more flexible."),
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
      { q: bi("Odoo ราคาเท่าไรในไทย?", "How much is Odoo in Thailand?"), a: bi("หน้าราคาภาษาไทยของ Odoo (18 พ.ย. 2569) แสดง Standard US$16.90 และ Custom US$32.00 ต่อผู้ใช้ต่อเดือนเมื่อจ่ายรายปี ไม่รวมค่าวางระบบของพาร์ทเนอร์", "Odoo's Thai pricing page (18 Nov 2026) shows Standard at US$16.90 and Custom at US$32.00 per user per month billed yearly, excluding partner implementation.") },
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
      row("เงินเดือน", "Payroll", bi("เริ่มที่ Basic (Lite ไม่มีเงินเดือน)", "From Basic (Lite has no payroll)"), bi("Standard ขึ้นไป — ภ.ง.ด.1 ประกันสังคม สลิป", "Standard+ — PND 1, social security, payslips")),
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
    verified: bi("ข้อมูล Loyverse ตรวจจาก loyverse.com/pricing เมื่อ 18 พ.ย. 2569", "Loyverse facts checked on loyverse.com/pricing, 18 Nov 2026"),
    sources: [{ label: "loyverse.com/pricing", url: "https://loyverse.com/pricing" }],
    summary: bi(
      "Loyverse เป็นแอป POS ฟรีที่ร้านเล็กทั่วโลกและในไทยนิยม ใช้ง่าย มีบริการเสริมรายเดือนเป็นดอลลาร์ Tonbab มี POS ทุกแพ็กเกจรวมแพ็กเกจ Free และต่อกับสต็อก จัดซื้อ การผลิต และบัญชีในระบบเดียว รับพร้อมเพย์และตรวจสลิปแบบไทย",
      "Loyverse is a free POS app popular with small shops worldwide and in Thailand — easy, with monthly add-ons in US dollars. Tonbab includes POS on every plan, Free included, connected to stock, purchasing, manufacturing and accounting in one system, with Thai PromptPay and slip checking.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("แอป POS ร้านค้าและร้านอาหาร", "POS app for shops and restaurants"), TONBAB_TYPE),
      row("ราคา", "Price", bi("POS ฟรี · สต็อกขั้นสูง US$25/ร้าน/เดือน · จัดการพนักงาน US$5/คน/เดือน", "POS free · advanced inventory US$25/store/mo · employee management US$5/person/mo"), TONBAB_PRICE),
      row("พร้อมเพย์และสลิป", "PromptPay and slips", bi("ไม่พบในหน้าราคา", "Not on the pricing page"), bi("QR พร้อมเพย์ของร้าน พร้อมรูปสลิป · ตรวจสลิปอัตโนมัติ (Starter+)", "Your own PromptPay QR with slip photo · automatic slip checking (Starter+)")),
      row("สต็อกและจัดซื้อ", "Stock and purchasing", bi("สต็อกพื้นฐานฟรี · ขั้นสูงเป็นบริการเสริม", "Basic stock free · advanced is an add-on"), bi("สต็อกหลายคลัง จัดซื้อ PR/PO รับสินค้า ในระบบเดียว", "Multi-warehouse stock, PR/PO purchasing, goods receipt in one system")),
      row("บัญชีและภาษีไทย", "Accounting & Thai tax", bi("ไม่มี", "No"), TONBAB_ACC),
    ],
    plans: [
      { name: same("POS"), price: bi("ฟรี", "Free"), note: bi("ขาย สะสมแต้ม จอครัว หลายสาขา สต็อกพื้นฐาน", "Sales, loyalty, kitchen display, multi-store, basic stock") },
      { name: bi("สต็อกขั้นสูง", "Advanced inventory"), price: bi("US$25/ร้าน/เดือน", "US$25/store/mo"), note: bi("ใบสั่งซื้อ โอนสต็อก นับสต็อก", "Purchase orders, transfers, counts") },
      { name: bi("จัดการพนักงาน", "Employee management"), price: bi("US$5/คน/เดือน", "US$5/person/mo"), note: bi("สิทธิ์ เวลาเข้างาน", "Permissions, time clock") },
    ],
    sections: [
      { h: bi("ต่างกันตรงไหน", "The real difference"), p: [
        bi("Loyverse เป็นจุดเริ่มต้นที่ดีสำหรับร้านเดียวที่อยากได้ POS ฟรี Tonbab เหมาะเมื่อร้านโตขึ้นและต้องการให้หน้าร้านต่อกับคลัง การสั่งซื้อ การผลิต และบัญชี โดยไม่ต้องคีย์ข้อมูลซ้ำ", "Loyverse is a great free starting point for a single shop. Tonbab fits once the shop grows and the counter needs to connect to the warehouse, purchasing, production and the books without re-keying."),
      ] },
    ],
    chooseThem: [bi("ร้านเดียว ต้องการ POS ฟรีที่ใช้ง่ายที่สุด", "You run one shop and want the simplest free POS.")],
    chooseTonbab: [
      bi("ต้องการรับพร้อมเพย์และตรวจสลิปแบบไทย", "You want Thai PromptPay with slip checking."),
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
    verified: bi("ข้อมูล Wongnai POS ตรวจจาก wongnai.com/pos เมื่อ 18 พ.ย. 2569", "Wongnai POS facts checked on wongnai.com/pos, 18 Nov 2026"),
    sources: [{ label: "wongnai.com/pos", url: "https://www.wongnai.com/pos" }],
    summary: bi(
      "Wongnai POS เป็นระบบ POS สำหรับร้านอาหารที่เชื่อมกับ LINE MAN และเครือข่าย Wongnai ได้ดี เหมาะกับร้านอาหารที่รับออเดอร์เดลิเวอรี Tonbab มี POS พร้อมใบสั่งครัว และต่อกับสต็อกวัตถุดิบ จัดซื้อ บัญชี และ HR ในระบบเดียว",
      "Wongnai POS is a restaurant POS tightly linked with LINE MAN and the Wongnai network — a strong fit for restaurants taking delivery orders. Tonbab has POS with kitchen tickets, connected to ingredient stock, purchasing, accounting and HR in one system.",
    ),
    rows: [
      row("ประเภท", "What it is", bi("POS ร้านอาหาร", "Restaurant POS"), TONBAB_TYPE),
      row("ราคา (ต่อร้าน)", "Price (per shop)", bi("Quick Service เริ่ม ฿1,090/เดือน · Full Service เริ่ม ฿1,790/เดือน · ฮาร์ดแวร์แยก", "Quick Service from ฿1,090/mo · Full Service from ฿1,790/mo · hardware separate"), TONBAB_PRICE),
      row("เดลิเวอรี", "Delivery", bi("รับออเดอร์ LINE MAN เข้าระบบ — จุดแข็งหลัก", "LINE MAN orders flow in — a core strength"), bi("ช่องทาง LINE และมาร์เก็ตเพลสเป็นบริการเสริม (Business) · ยังไม่เชื่อม LINE MAN", "LINE and marketplace channels as an add-on (Business) · no LINE MAN link yet")),
      row("ครัว", "Kitchen", bi("จอครัว (KDS)", "Kitchen display (KDS)"), bi("ใบสั่งครัวและหลายเครื่องพิมพ์ (Standard+)", "Kitchen tickets and multiple printers (Standard+)")),
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
];

export const getVendorCompare = (slug: string) => vendorCompares.find((v) => v.slug === slug);

/** Up to `n` other comparisons, same category first. */
export const relatedCompares = (v: VendorCompare, n = 6) =>
  [
    ...vendorCompares.filter((x) => x.slug !== v.slug && x.category === v.category),
    ...vendorCompares.filter((x) => x.slug !== v.slug && x.category !== v.category),
  ].slice(0, n);
