import type { Bi } from "./compare-data";

/** Visible FAQ on /migration — also emitted as FAQPage JSON-LD. */
export const migrationFaq: { q: Bi; a: Bi }[] = [
  {
    q: {
      th: "ย้ายข้อมูลจากโปรแกรมบัญชีเดิมมา Tonbab ได้ไหม?",
      en: "Can I move from my current accounting software to Tonbab?",
    },
    a: {
      th: "ได้ เราย้ายข้อมูลจาก FlowAccount, PEAK, Express, Xero, QuickBooks และโปรแกรมบัญชีอื่น ๆ ผ่านไฟล์ Excel ที่ส่งออกจากโปรแกรมเดิม ทั้งข้อมูลหลักและประวัติย้อนหลัง",
      en: "Yes. We migrate from FlowAccount, PEAK, Express, Xero, QuickBooks and other accounting software through the Excel exports of your current system — master data and history.",
    },
  },
  {
    q: { th: "ย้ายอะไรได้บ้าง?", en: "What can be migrated?" },
    a: {
      th: "รายชื่อลูกค้าและผู้ขาย สินค้าและยอดยกมาพร้อมต้นทุน ผังบัญชี สมุดรายวันย้อนหลัง เอกสารขายและใบเสร็จ ค่าใช้จ่าย การจ่ายเงิน และภาษีหัก ณ ที่จ่าย — เอกสารที่นำเข้าเชื่อมกับรายการบัญชีโดยไม่ลงบัญชีซ้ำ",
      en: "Customers and vendors, products and opening stock with cost, chart of accounts, past journals, sales documents and receipts, expenses, payments and withholding tax — imported documents link to their vouchers without being posted twice.",
    },
  },
  {
    q: { th: "มีค่าใช้จ่ายไหม?", en: "Does it cost anything?" },
    a: {
      th: "นำเข้าจาก Excel ด้วยตัวเองได้ฟรี ถ้าต้องการให้ทีมเราตั้งค่าและย้ายข้อมูลให้ มีบริการ Onboarding ฿9,900 ครั้งเดียว (ก่อน VAT) หรือรวมอยู่ในแพ็กซัพพอร์ต Enterprise",
      en: "Self-service Excel import is free. If you want our team to set up and migrate for you, Onboarding is ฿9,900 once (before VAT), or included in the Enterprise support pack.",
    },
  },
  {
    q: {
      th: "ต้องหยุดใช้โปรแกรมเดิมทันทีไหม?",
      en: "Do I have to stop using my current software straight away?",
    },
    a: {
      th: "ไม่ต้อง เปิดใช้ Tonbab ทีละโมดูล เริ่มจากจุดที่เจ็บที่สุด เช่น จัดซื้อหรือสต็อก แล้วค่อยย้ายส่วนอื่นเมื่อพร้อม",
      en: "No. Turn Tonbab on one module at a time — start where it hurts most, such as purchasing or stock — and move the rest when you're ready.",
    },
  },
];
