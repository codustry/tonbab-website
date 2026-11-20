import type { Bi } from "./compare-data";

export const whatFaq: { q: Bi; a: Bi }[] = [
  {
    q: { th: "Tonbab (ต้นแบบ) คืออะไร?", en: "What is Tonbab (ต้นแบบ)?" },
    a: {
      th: "Tonbab (ต้นแบบ) คือระบบ ERP ออนไลน์ภาษาไทยสำหรับ SME พัฒนาโดยบริษัท โคดัสทรี (ประเทศไทย) จำกัด รวมจัดซื้อ สต็อก การผลิต POS CRM งานบริการ บุคคลและเงินเดือน คลังความรู้ และบัญชีไทย ไว้ในฐานข้อมูลเดียว ใช้งานที่ app.tonbab.com บนเว็บ มือถือ และแท็บเล็ต เริ่มใช้ฟรี",
      en: "Tonbab (ต้นแบบ) is a Thai-first cloud ERP for SMEs, built by Codustry (Thailand) Co., Ltd. It keeps purchasing, inventory, manufacturing, POS, CRM, service, HR & payroll, a company wiki and Thai accounting in one database, at app.tonbab.com on web, phone and tablet. There is a free plan.",
    },
  },
  {
    q: { th: "ชื่อ ต้นแบบ แปลว่าอะไร?", en: "What does the name mean?" },
    a: {
      th: "ต้นแบบ แปลว่า Master Plan — แบบแปลนหลักที่ทุกฝ่ายทำงานตาม",
      en: 'ต้นแบบ (Tonbab) means "master plan" in Thai — the blueprint every team works from.',
    },
  },
  {
    q: { th: "Tonbab ราคาเท่าไร?", en: "How much does Tonbab cost?" },
    a: {
      th: "มีแพ็กเกจ Free ฿0 (ผู้ใช้ 1 คน), Starter ฿2,990/ปี (5 คน), Standard ฿9,900/ปี (10 คน), Business ฿39,900/ปี (25 คน) และ Enterprise เริ่มต้น ฿120,000/ปี (100 คนขึ้นไป) ราคาก่อน VAT 7% จ่ายรายเดือนได้ที่หนึ่งในสิบของราคารายปี ทุกแพ็กเกจได้ทุกโมดูลและทุกฟีเจอร์ รวมถึงบัญชี ต่างกันที่ขนาด เช่น จำนวนผู้ใช้ พื้นที่ และเครดิต AI ต่อเดือน (Free 30, Starter 300, Standard 1,000, Business 3,000, Enterprise 10,000)",
      en: "Free ฿0 (1 user), Starter ฿2,990/yr (5 users), Standard ฿9,900/yr (10), Business ฿39,900/yr (25) and Enterprise from ฿120,000/yr (100+), before 7% VAT. Monthly billing is one tenth of the yearly price. Every plan includes every module and feature, Accounting included; plans differ by size, such as users, storage and monthly AI credits (Free 30, Starter 300, Standard 1,000, Business 3,000, Enterprise 10,000).",
    },
  },
  {
    q: {
      th: "Tonbab ต่างจากโปรแกรมบัญชีออนไลน์อย่างไร?",
      en: "How is Tonbab different from online accounting software?",
    },
    a: {
      th: "โปรแกรมบัญชีเน้นเอกสารขาย-ซื้อและภาษี Tonbab เป็น ERP ที่ครอบคลุมงานก่อนถึงบัญชีด้วย เช่น จัดซื้อพร้อมเทียบราคาต้นทุนถึงคลัง การผลิตตาม BOM ต้นทุนงาน POS แอปหน้างาน CRM และเงินเดือน และมีโมดูลบัญชีไทยของ Tonbab เองในทุกแพ็กเกจ",
      en: "Accounting software focuses on sales/purchase documents and tax. Tonbab is an ERP that also covers the work before the books — landed-cost purchasing, BOM manufacturing, job costing, POS, floor kiosks, CRM and payroll. Tonbab's own Thai Accounting module is included in every plan.",
    },
  },
  {
    q: {
      th: "ใช้กับ AI อย่าง ChatGPT หรือ Claude ได้ไหม?",
      en: "Does it work with AI assistants like ChatGPT or Claude?",
    },
    a: {
      th: "ได้ Tonbab มี MCP server ที่ผู้ช่วย AI ซึ่งรองรับ MCP เชื่อมต่อด้วย OAuth เฉพาะบริษัทที่ผู้ใช้ติ๊กและตามบทบาทของผู้ใช้ในแต่ละบริษัท (93 เครื่องมือ รวมถึงบัญชี สต็อก จัดซื้อ CRM งานรออนุมัติ และวันลา) และมี REST API สำหรับ Zapier, Make หรือระบบภายใน การเขียนผ่าน API สร้างได้เฉพาะฉบับร่างหรือคำขอให้คนตรวจและอนุมัติ ไม่มีการลงบัญชีหรือจ่ายเงินให้",
      en: "Yes. Tonbab has an MCP server that MCP-capable assistants connect to with OAuth, limited to the companies the user ticks and their role in each (93 tools, including accounting, stock, purchasing, CRM, approvals and leave), plus a REST API for Zapier, Make or in-house systems. Writes through the API create drafts or requests for a person to review and approve; nothing is posted or paid.",
    },
  },
];
