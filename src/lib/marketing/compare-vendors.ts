/**
 * /compare/[vendor] — head-to-head pages for the Thai tools buyers most
 * often weigh Tonbab against. HONESTY RULES (CLAUDE.md):
 *  - every competitor fact cites a public source with a verification date;
 *  - never claim Thai rivals lack Thai tax compliance (they are strong there);
 *  - say when the other product is the better fit;
 *  - Tonbab's Accounting is invitation-only early access — say so.
 * Facts we could not verify from a public page are left out, not guessed.
 */
import type { Bi } from "./compare-data";

export interface VendorCompare {
  slug: string;
  name: string;
  keyword: Bi;
  verified: Bi;
  /** Public source page; empty when the fact comes from the Aug 2026 research notes (compare-data.ts). */
  sourceUrl: string;
  summary: Bi;
  rows: { label: Bi; them: Bi; tonbab: Bi }[];
  chooseThem: Bi[];
  chooseTonbab: Bi[];
}

const TONBAB_PRICE: Bi = {
  th: "Free ฿0 · Starter ฿2,990 · Standard ฿6,000 · Business ฿14,400 · Enterprise เริ่ม ฿42,000 ต่อปี (ก่อน VAT)",
  en: "Free ฿0 · Starter ฿2,990 · Standard ฿6,000 · Business ฿14,400 · Enterprise from ฿42,000 per year (before VAT)",
};
const TONBAB_TAX: Bi = {
  th: "มี — ใบกำกับภาษี ภ.พ.30 50 ทวิ ภ.ง.ด.3/53 (โมดูลบัญชี Early access) และ ภ.ง.ด.1 สปส. ในเงินเดือน",
  en: "Yes — tax invoices, PP30, 50 Tawi, PND 3/53 (Accounting, early access) and PND 1 / SSO in payroll",
};
const TONBAB_MFG: Bi = {
  th: "มี — BOM ใบสั่งผลิต ขั้นตอนผลิต ต้นทุนแผนเทียบจริง QC (Business ขึ้นไป)",
  en: "Yes — BOM, work orders, routing, planned-vs-actual cost, QC (Business and up)",
};

export const vendorCompares: VendorCompare[] = [
  {
    slug: "flowaccount",
    name: "FlowAccount",
    keyword: { th: "Tonbab กับ FlowAccount", en: "Tonbab vs FlowAccount" },
    verified: {
      th: "ข้อมูล FlowAccount ตรวจจาก flowaccount.com/pricing เมื่อ 17 พ.ย. 2569",
      en: "FlowAccount facts checked on flowaccount.com/pricing, 17 Nov 2026",
    },
    sourceUrl: "https://flowaccount.com/pricing",
    summary: {
      th: "FlowAccount เป็นโปรแกรมบัญชีออนไลน์ยอดนิยมของไทย เด่นเรื่องเอกสารขายและภาษี ส่วน Tonbab เป็นระบบ ERP ที่รวมจัดซื้อ สต็อก การผลิต POS CRM และเงินเดือนไว้ในฐานข้อมูลเดียว เหมาะกับธุรกิจที่งานก่อนถึงบัญชีซับซ้อน เช่น โรงงานและผู้นำเข้า",
      en: "FlowAccount is a popular Thai online accounting app, strong on sales documents and tax. Tonbab is an ERP that keeps purchasing, stock, manufacturing, POS, CRM and payroll in one database — a fit for businesses whose work before the books is complex, such as factories and importers.",
    },
    rows: [
      {
        label: { th: "ประเภท", en: "What it is" },
        them: {
          th: "โปรแกรมบัญชีออนไลน์ + POS",
          en: "Online accounting + POS",
        },
        tonbab: { th: "ระบบ ERP ครบทุกฝ่าย", en: "All-department ERP" },
      },
      {
        label: { th: "ราคาที่เปิดเผย", en: "Published price" },
        them: {
          th: "Free · Standard ฿1,990 · Pro ฿2,990 · Pro Business ฿5,490 ต่อปี; เงินเดือนเป็นผลิตภัณฑ์แยก ฿2,990/ปี",
          en: "Free · Standard ฿1,990 · Pro ฿2,990 · Pro Business ฿5,490 per year; payroll is a separate product at ฿2,990/yr",
        },
        tonbab: TONBAB_PRICE,
      },
      {
        label: { th: "สต็อกสินค้า", en: "Inventory" },
        them: {
          th: "มีในแพ็กเกจ Pro หลายคลังใน Pro Business",
          en: "In Pro; multiple warehouses in Pro Business",
        },
        tonbab: {
          th: "ทุกแพ็กเกจ หลายคลัง ล็อต ซีเรียล (Standard ขึ้นไป)",
          en: "Every plan; multi-warehouse; lots and serials on Standard+",
        },
      },
      {
        label: {
          th: "การผลิต (BOM / ใบสั่งผลิต)",
          en: "Manufacturing (BOM / work orders)",
        },
        them: {
          th: "ไม่พบในหน้าราคา (มี BOQ สำหรับงานรับเหมา)",
          en: "Not listed on the pricing page (a BOQ document for contracting is)",
        },
        tonbab: TONBAB_MFG,
      },
      {
        label: {
          th: "จัดซื้อเทียบราคาต้นทุนถึงคลัง",
          en: "Landed-cost RFQ comparison",
        },
        them: { th: "ไม่พบในหน้าราคา", en: "Not listed on the pricing page" },
        tonbab: {
          th: "มี โหมดในประเทศและระหว่างประเทศ (Standard ขึ้นไป)",
          en: "Yes, domestic and international modes (Standard+)",
        },
      },
      {
        label: { th: "ภาษีไทย", en: "Thai tax" },
        them: { th: "มี — จุดแข็งหลัก", en: "Yes — a core strength" },
        tonbab: TONBAB_TAX,
      },
    ],
    chooseThem: [
      {
        th: "ต้องการโปรแกรมบัญชีและออกเอกสารอย่างเดียว ไม่มีงานสต็อกหรือการผลิตซับซ้อน",
        en: "You only need accounting and documents, without complex stock or production.",
      },
      {
        th: "นักบัญชีหรือสำนักงานบัญชีของคุณใช้ FlowAccount อยู่แล้ว",
        en: "Your accountant or accounting firm already works in FlowAccount.",
      },
    ],
    chooseTonbab: [
      {
        th: "มีโรงงาน ผลิตตาม BOM หรือจ้างผลิต และต้องการรู้ต้นทุนจริงต่องาน",
        en: "You manufacture to a BOM or subcontract and need real cost per job.",
      },
      {
        th: "นำเข้าสินค้าและต้องเทียบผู้ขายด้วยต้นทุนถึงคลัง",
        en: "You import and need to compare vendors by landed cost.",
      },
      {
        th: "ต้องการ POS แอปหน้างาน CRM และ HR ในระบบเดียวกับสต็อก",
        en: "You want POS, floor kiosks, CRM and HR in the same system as stock.",
      },
    ],
  },
  {
    slug: "peak",
    name: "PEAK",
    keyword: { th: "Tonbab กับ PEAK", en: "Tonbab vs PEAK" },
    verified: {
      th: "ข้อมูล PEAK จากคู่มือการใช้งานสาธารณะของ PEAK ตรวจเมื่อ ส.ค. 2569 — ราคาปัจจุบันโปรดดูที่ peakaccount.com",
      en: "PEAK facts from PEAK's public help centre, checked Aug 2026 — see peakaccount.com for current prices",
    },
    sourceUrl: "https://peakaccount.com",
    summary: {
      th: "PEAK เป็นโปรแกรมบัญชีออนไลน์ที่สำนักงานบัญชีไทยนิยม เด่นเรื่องภาษีและงานบัญชี ส่วน Tonbab เป็น ERP ที่เน้นงานปฏิบัติการ ตั้งแต่จัดซื้อ สต็อก การผลิต ถึงหน้าร้านและงานขาย",
      en: "PEAK is an online accounting app favoured by Thai accounting firms, strong on tax and bookkeeping. Tonbab is an ERP focused on operations — purchasing, stock and manufacturing through to retail and sales.",
    },
    rows: [
      {
        label: { th: "ประเภท", en: "What it is" },
        them: {
          th: "โปรแกรมบัญชีออนไลน์ (เน้นสำนักงานบัญชี)",
          en: "Online accounting (firm-oriented)",
        },
        tonbab: { th: "ระบบ ERP ครบทุกฝ่าย", en: "All-department ERP" },
      },
      {
        label: { th: "ราคาที่เปิดเผย", en: "Published price" },
        them: {
          th: "ดูที่เว็บไซต์ PEAK / ขอใบเสนอราคา",
          en: "See PEAK's website / request a quote",
        },
        tonbab: TONBAB_PRICE,
      },
      {
        label: {
          th: "การผลิต (BOM / ใบสั่งผลิต)",
          en: "Manufacturing (BOM / work orders)",
        },
        them: {
          th: "คู่มือของ PEAK ระบุว่าออกแบบเพื่อธุรกิจซื้อมาขายไปและบริการ พร้อมวิธี workaround สำหรับงานผลิต",
          en: "PEAK's own manual says it is designed for trading and service businesses, with a workaround for production",
        },
        tonbab: TONBAB_MFG,
      },
      {
        label: { th: "ภาษีไทย", en: "Thai tax" },
        them: { th: "มี — จุดแข็งหลัก", en: "Yes — a core strength" },
        tonbab: TONBAB_TAX,
      },
      {
        label: { th: "หน้าจอภาษาอังกฤษ", en: "English interface" },
        them: { th: "บางส่วน", en: "Partial" },
        tonbab: { th: "ครบทุกหน้า สลับได้ทันที", en: "Full, switch any time" },
      },
    ],
    chooseThem: [
      {
        th: "สำนักงานบัญชีของคุณทำงานบน PEAK และคุณต้องการเฉพาะงานบัญชี",
        en: "Your accounting firm works in PEAK and you only need bookkeeping.",
      },
    ],
    chooseTonbab: [
      {
        th: "ต้องการ ERP สำหรับงานผลิต สต็อก และจัดซื้อ ที่ต่อกับบัญชีในระบบเดียว",
        en: "You need an ERP for production, stock and purchasing joined to the books in one system.",
      },
      {
        th: "ทีมมีทั้งคนไทยและต่างชาติ ต้องการหน้าจอสองภาษาเต็มรูปแบบ",
        en: "Your team is mixed Thai and foreign and needs a fully bilingual interface.",
      },
    ],
  },
  {
    slug: "express",
    name: "Express",
    keyword: { th: "Tonbab กับ Express", en: "Tonbab vs Express" },
    verified: {
      th: "ข้อมูล Express จากเว็บไซต์และเอกสารของผู้พัฒนา ตรวจเมื่อ ส.ค. 2569",
      en: "Express facts from the vendor's website and documentation, checked Aug 2026",
    },
    sourceUrl: "",
    summary: {
      th: "Express เป็นโปรแกรมบัญชีแบบติดตั้งบนเครื่องที่ธุรกิจไทยใช้มานาน ส่วน Tonbab เป็นระบบคลาวด์ ใช้ได้ทุกที่ทุกอุปกรณ์ และครอบคลุมงานผลิต สต็อก POS และงานขาย",
      en: "Express is long-established Thai on-premise accounting software. Tonbab is cloud-based, works on any device, and covers manufacturing, stock, POS and sales.",
    },
    rows: [
      {
        label: { th: "ประเภท", en: "What it is" },
        them: {
          th: "โปรแกรมบัญชี ติดตั้งบนเครื่อง",
          en: "Accounting, installed on-premise",
        },
        tonbab: {
          th: "ERP บนคลาวด์ เว็บ มือถือ แท็บเล็ต",
          en: "Cloud ERP on web, phone and tablet",
        },
      },
      {
        label: { th: "ราคาที่เปิดเผย", en: "Published price" },
        them: {
          th: "฿19,000–39,000 ซื้อขาด (ส.ค. 2569)",
          en: "฿19,000–39,000 one-time (Aug 2026)",
        },
        tonbab: TONBAB_PRICE,
      },
      {
        label: {
          th: "ต้นทุนการผลิต / ต้นทุนรายงาน",
          en: "Production / per-job costing",
        },
        them: {
          th: "เอกสารระบุว่าไม่รองรับระบบต้นทุนการผลิต และสรุปต้นทุนแยก Job ไม่ได้",
          en: "Documentation states no production costing and no per-job cost summary",
        },
        tonbab: {
          th: "มี — ต้นทุนงาน (Job Control) และต้นทุนใบสั่งผลิต",
          en: "Yes — Job Control costing and work-order cost",
        },
      },
      {
        label: { th: "ภาษีไทย", en: "Thai tax" },
        them: { th: "มี", en: "Yes" },
        tonbab: TONBAB_TAX,
      },
      {
        label: {
          th: "ใช้นอกออฟฟิศ / มือถือ",
          en: "Away from the office / mobile",
        },
        them: { th: "ติดตั้งบนเครื่อง", en: "Installed on a PC" },
        tonbab: {
          th: "ใช้ได้ทุกที่ มีแอป iOS/Android",
          en: "Anywhere, with iOS/Android apps",
        },
      },
    ],
    chooseThem: [
      {
        th: "ต้องการโปรแกรมที่ติดตั้งในเครื่องและไม่ต้องการออนไลน์",
        en: "You want software installed locally and don't want to be online.",
      },
    ],
    chooseTonbab: [
      {
        th: "ทีมทำงานหลายที่ และต้องการให้ทุกฝ่ายเห็นข้อมูลชุดเดียวแบบเรียลไทม์",
        en: "Your team works in several places and every department should see the same live data.",
      },
      {
        th: "ต้องการต้นทุนงานและต้นทุนการผลิต",
        en: "You need job costing and production costing.",
      },
    ],
  },
];

export const getVendorCompare = (slug: string) =>
  vendorCompares.find((v) => v.slug === slug);
