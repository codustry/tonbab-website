import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { getModule } from "$lib/marketing/modules-data";
import { HOME_CRUMB, faqJsonLd, marketingSeo, type Bi } from "$lib/seo/site";

/**
 * One search intent per module page (Thai first). Titles ≤ ~60 chars of
 * meaning, descriptions ~120–155 chars; never repeat a feature page's
 * primary keyword here (features own "ระบบ POS", "โปรแกรมสต็อกสินค้า"...).
 */
const SEO: Record<string, { title: Bi; description: Bi; crumb: Bi }> = {
  operation: {
    crumb: { th: "Operation", en: "Operation" },
    title: {
      th: "โปรแกรม ERP สำหรับโรงงานและธุรกิจซื้อขาย: จัดซื้อ คลัง ผลิต ต้นทุนงาน | Tonbab",
      en: "ERP for Factories & Traders: Purchasing, Stock, Production, Job Cost | Tonbab",
    },
    description: {
      th: "Operation คือหัวใจ ERP ของ Tonbab: ใบขอซื้อ เทียบราคา RFQ ใบสั่งซื้อ รับของ ใบสั่งผลิต ใบส่งของ และ Job Control ที่รวมต้นทุนจริงแบบสด ตรวจสอบย้อนกลับได้ทุกขั้น",
      en: "Operation is Tonbab's ERP core: purchase requests, RFQ comparison, POs, goods receipt, work orders, delivery notes and a Job Control with live true cost — traceable at every step.",
    },
  },
  commerce: {
    crumb: { th: "Commerce", en: "Commerce" },
    title: {
      th: "ระบบขายหน้าร้านและออนไลน์: POS ออเดอร์ แชท LINE OA ในที่เดียว | Tonbab",
      en: "Retail & Online Sales: POS, Orders and LINE OA Chat in One Place | Tonbab",
    },
    description: {
      th: "Commerce รวม POS หน้าร้าน ออเดอร์ Shopee/Lazada กล่องแชท LINE OA Messenger Instagram ข้อมูลลูกค้า และรายงานยอดขาย บนสต็อกชุดเดียวกับคลังสินค้า",
      en: "Commerce brings the POS counter, Shopee/Lazada orders, a LINE OA/Messenger/Instagram inbox, customers and sales reports onto the same stock as the warehouse.",
    },
  },
  crm: {
    crumb: { th: "CRM", en: "CRM" },
    title: {
      th: "ระบบ CRM ภาษาไทย: ไปป์ไลน์ แผนเยี่ยมลูกค้า รอบสั่งซ้ำ KPI | Tonbab",
      en: "Thai CRM Software: Pipeline, Visit Plans, Reorder Due, KPIs | Tonbab",
    },
    description: {
      th: "ระบบ CRM สำหรับทีมขาย B2B ไทย: ไปป์ไลน์ดีล แผนเยี่ยมและเช็คอินด้วยรูปและ GPS คิวลูกค้าถึงรอบสั่งซ้ำจากออเดอร์จริง การต่ออายุสัญญา KPI และงานประมูล e-GP ใช้บนมือถือได้",
      en: "CRM for Thai B2B sales teams: deal pipeline, visit plans with photo + GPS check-ins, reorder-due queue from real orders, renewals, KPIs and e-GP tender leads — on mobile too.",
    },
  },
  people: {
    crumb: { th: "People", en: "People" },
    title: {
      th: "โปรแกรม HR ภาษาไทย: ข้อมูลพนักงาน วันลา เวลาทำงาน เงินเดือน | Tonbab",
      en: "Thai HR Software: Employees, Leave, Time and Payroll | Tonbab",
    },
    description: {
      th: "People คือระบบ HR ของ Tonbab: ทะเบียนพนักงานสองภาษา วันลาตามกฎหมายแรงงาน เวลาทำงาน สรรหา ประเมินผล และเงินเดือนพร้อม ภ.ง.ด.1 สปส. 50 ทวิ ข้อมูลอ่อนไหวแยกสิทธิ์",
      en: "People is Tonbab's HR: bilingual employee records, statutory leave, time, recruitment, performance and payroll with PND 1, SSO and 50 Tawi — sensitive data behind its own permissions.",
    },
  },
  service: {
    crumb: { th: "Service", en: "Service" },
    title: {
      th: "ระบบงานบริการและซ่อมบำรุง: ใบงานช่าง ภาคสนาม เช่าอุปกรณ์ | Tonbab",
      en: "Field Service & Maintenance Software: Jobs, Technicians, Rentals | Tonbab",
    },
    description: {
      th: "Service จัดการงานบริการหลังการขาย: รับแจ้ง ใบงาน มอบหมายช่าง เช็คอินหน้างาน ลายเซ็นลูกค้า อะไหล่จากสต็อก ประเมินราคา และการเช่าอุปกรณ์ ในระบบเดียวกับการขาย",
      en: "Service runs after-sales work: tickets, job orders, technician dispatch, on-site check-in, customer signature, parts from stock, estimates and equipment rental — in the same system as sales.",
    },
  },
  docs: {
    crumb: { th: "Docs", en: "Docs" },
    title: {
      th: "คลังความรู้บริษัท: SOP คู่มือ และวิกิภาษาไทย | Tonbab Docs",
      en: "Company Knowledge Base: SOPs, Manuals and Wiki | Tonbab Docs",
    },
    description: {
      th: "Docs คือวิกิของบริษัทใน Tonbab: เขียน SOP และคู่มือการทำงาน จัดหมวด กำหนดสิทธิ์ดู/แก้ ค้นหาได้ และลิงก์กับงานในระบบ เหมาะกับการอบรมพนักงานใหม่",
      en: "Docs is the company wiki inside Tonbab: write SOPs and manuals, organise spaces, set view/edit rights, search, and link to work in the system — ideal for onboarding.",
    },
  },
  accounting: {
    crumb: { th: "บัญชี", en: "Accounting" },
    title: {
      th: "โปรแกรมบัญชีออนไลน์ภาษาไทย ในระบบเดียวกับงานจริง (Early access) | Tonbab",
      en: "Thai Online Accounting Inside Your ERP (Early Access) | Tonbab",
    },
    description: {
      th: "โปรแกรมบัญชีของ Tonbab: ผังบัญชีไทย เอกสารขาย-ซื้อครบสาย ภ.พ.30 50 ทวิ ภ.ง.ด.3/53 กระทบยอดธนาคารที่เรียนรู้ได้ หลายสกุลเงิน สินทรัพย์ และงบการเงินสิ้นปี เปิดแบบเชิญ",
      en: "Thai accounting inside your ERP: Thai chart of accounts, full document chain, PP30, 50 Tawi, PND 3/53, bank reconciliation, multi-currency, fixed assets. Early access.",
    },
  },
};

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const mod = getModule(event.params.module);
  if (!mod) error(404, "Not found");
  const t = (b: Bi) => b[locale];
  const copy = SEO[mod.key];
  const th = locale === "th";
  const seo = marketingSeo({
    url: event.url,
    cdnBaseUrl,
    locale,
    path: `/modules/${mod.key}`,
    title: copy ? t(copy.title) : `${t(mod.name)} | Tonbab`,
    description: copy ? t(copy.description) : t(mod.tagline),
    breadcrumbs: [
      { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
      { name: th ? "โมดูล" : "Modules", path: "/modules" },
      { name: copy ? t(copy.crumb) : t(mod.name), path: `/modules/${mod.key}` },
    ],
    jsonLd: mod.faq.length
      ? [faqJsonLd(mod.faq.map((f) => ({ q: t(f.q), a: t(f.a) })))]
      : [],
  });
  return { locale, seo, moduleKey: mod.key };
};
