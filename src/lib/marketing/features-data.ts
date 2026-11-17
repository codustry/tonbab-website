/**
 * /features/[feature] — one indexable page per differentiator. Bilingual
 * pairs inline (same pattern as modules-data.ts).
 *
 * HONESTY RULES (CLAUDE.md): every claim here was checked against the app
 * repo (codustry/workflow) on 2026-11-17 — routes, server modules and
 * plans.ts gates. Things that are not live say so with a `status` of
 * "dev" (in development) or "soon" (coming soon); Accounting features
 * carry the early-access label. Never upgrade a status without the code.
 *
 * Each page leads with `answer` — a short, factual "what is it" paragraph
 * that search snippets and AI answer engines can quote verbatim.
 */
import type { Bi } from "./compare-data";
import type { SuiteKey } from "./suite-data";

export type FeatureVisual =
  | "pos"
  | "kiosk"
  | "landed"
  | "channels"
  | "wht"
  | "stock"
  | "mfg"
  | "payroll"
  | "egp"
  | "mobile"
  | "security";
export type ChannelState = "live" | "dev" | "soon" | "off";

export interface FeatureContent {
  key: string;
  module: Exclude<SuiteKey, "platform">;
  /** Primary search phrase this page targets (one per page — no stuffing). */
  keyword: Bi;
  seoTitle: Bi;
  metaDescription: Bi;
  eyebrow: Bi;
  h1: Bi;
  lede: Bi;
  /** Answer-first definition, 40–70 words. */
  answer: Bi;
  visual: FeatureVisual;
  highlights: { title: Bi; body: Bi }[];
  /** Optional live/in-development matrix (sales channels). */
  statusRows?: {
    name: string | Bi;
    group: Bi;
    state: ChannelState;
    note?: Bi;
  }[];
  /** Plan / availability note, from plans.ts. */
  plan: Bi;
  earlyAccess?: boolean;
  faq: { q: Bi; a: Bi }[];
  related: string[];
  modules: string[];
}

export const features: FeatureContent[] = [
  {
    key: "pos",
    module: "commerce",
    keyword: { th: "ระบบ POS", en: "POS system" },
    seoTitle: {
      th: "ระบบ POS หน้าร้าน ตัดสต็อกทันที รับ PromptPay | Tonbab",
      en: "POS System for Thai Shops — Live Stock, PromptPay | Tonbab",
    },
    metaDescription: {
      th: "ระบบ POS ขายหน้าร้านบนแท็บเล็ต iPad และ Sunmi รับเงินสด PromptPay และบัตร ตัดสต็อกทันที ปิดกะกระทบยอด พิมพ์ใบเสร็จ 80 มม. เริ่มใช้ฟรี",
      en: "Tablet POS for Thai shops: cash, PromptPay and card, stock deducted on every sale, shift close reconciliation and 80 mm receipts. Runs on iPad, Android and Sunmi. Free plan.",
    },
    eyebrow: { th: "Commerce · POS หน้าร้าน", en: "Commerce · Point of sale" },
    h1: {
      th: "ระบบ POS หน้าร้าน ที่ต่อกับสต็อกและบัญชีจริง",
      en: "A POS that shares one stock ledger with the rest of your business",
    },
    lede: {
      th: "ขายหน้าร้านบนแท็บเล็ตหรือเครื่อง Sunmi รับเงินได้ทุกแบบ ทุกบิลตัดสต็อกในคลังเดียวกับที่ฝ่ายจัดซื้อและโกดังใช้",
      en: "Sell from a tablet or Sunmi device, take every payment type, and every bill deducts stock from the same ledger purchasing and the warehouse use.",
    },
    answer: {
      th: "ระบบ POS ของ Tonbab คือแอปขายหน้าร้านแบบติดตั้งได้ (PWA) ที่ใช้บนแท็บเล็ต iPad Android หรือเครื่อง Sunmi รับเงินสด PromptPay และบัตร ตัดสต็อกทันทีเมื่อขาย มีเปิด-ปิดกะพร้อมกระทบยอดเงินสด พิมพ์ใบเสร็จ และดูยอดขายรายร้านได้ในระบบ ERP เดียวกับจัดซื้อและคลังสินค้า",
      en: "Tonbab POS is an installable web app (PWA) for iPad, Android tablets and Sunmi devices. It takes cash, PromptPay and card, deducts stock at the moment of sale, opens and closes shifts with a cash count, prints receipts and reports sales per shop — inside the same ERP as purchasing and inventory.",
    },
    visual: "pos",
    highlights: [
      {
        title: { th: "รับเงินได้ทุกแบบ", en: "Every payment type" },
        body: {
          th: "เงินสดพร้อมคำนวณเงินทอน PromptPay QR และบัตรผ่าน Beam Checkout ยืนยันยอดอัตโนมัติ",
          en: "Cash with change calculation, PromptPay QR, and card through Beam Checkout with automatic confirmation.",
        },
      },
      {
        title: { th: "ตัดสต็อกทันที", en: "Stock out on every sale" },
        body: {
          th: "ทุกบิลตัดสต็อกจากคลังของร้านนั้น ฝ่ายจัดซื้อเห็นยอดคงเหลือจริงโดยไม่ต้องกระทบยอดสิ้นวัน",
          en: "Each bill issues stock from that shop's warehouse, so purchasing sees the real balance without an end-of-day sync.",
        },
      },
      {
        title: { th: "เปิด-ปิดกะ กระทบยอด", en: "Shift open, close and count" },
        body: {
          th: "เปิดกะด้วยเงินทอนตั้งต้น ปิดกะนับเงินจริงเทียบยอดระบบ เห็นส่วนต่างทันที",
          en: "Open with a float, close with a counted cash total, and see the difference against the system immediately.",
        },
      },
      {
        title: { th: "ใบเสร็จและเครื่องพิมพ์", en: "Receipts and printers" },
        body: {
          th: "พิมพ์ใบเสร็จภาษาไทย 80 มม. หรือหัวพิมพ์ในเครื่อง Sunmi และส่งใบเสร็จทางอีเมลได้",
          en: "Thai 80 mm receipts on a LAN printer or a Sunmi's built-in head, plus email receipts.",
        },
      },
      {
        title: { th: "หลายร้าน หลายแบรนด์", en: "Several shops and brands" },
        body: {
          th: "แยกร้าน เครื่อง และแบรนด์ แต่ละร้านมีคลัง เมนู และรายงานของตัวเอง",
          en: "Separate shops, devices and brands, each with its own warehouse, menu and reports.",
        },
      },
      {
        title: { th: "พนักงานเข้าด้วย PIN", en: "Cashiers sign in with a PIN" },
        body: {
          th: "เครื่องเดียวใช้หลายคน ทุกบิลบันทึกว่าใครขาย ใช้โหมดคีออสก์ในแอป iOS/Android ได้",
          en: "One device, many cashiers — every bill records who sold it. Works in kiosk mode in the iOS/Android app.",
        },
      },
    ],
    plan: {
      th: "ทุกแพ็กเกจใช้ POS ได้ — Free 1 ร้าน/1 เครื่อง, Starter 1/2, Standard 2/5, Business 5/10, Enterprise ไม่จำกัด",
      en: "POS is in every plan — Free 1 shop/1 device, Starter 1/2, Standard 2/5, Business 5/10, Enterprise unlimited.",
    },
    faq: [
      {
        q: {
          th: "ระบบ POS ของ Tonbab ใช้กับอุปกรณ์อะไรได้บ้าง?",
          en: "Which devices does Tonbab POS run on?",
        },
        a: {
          th: "ใช้บนเบราว์เซอร์ของ iPad แท็บเล็ต Android และเครื่อง Sunmi ได้ ติดตั้งเป็นแอปบนหน้าจอ หรือใช้แอป Tonbab บน iOS/Android ในโหมดคีออสก์",
          en: "Any modern browser on iPad, Android tablets and Sunmi devices. Install it to the home screen, or use the Tonbab iOS/Android app in kiosk mode.",
        },
      },
      {
        q: { th: "รับ PromptPay ได้ไหม?", en: "Does it take PromptPay?" },
        a: {
          th: "ได้ แสดง PromptPay QR ที่หน้าจอ และรับบัตรเครดิตผ่าน Beam Checkout ได้ด้วย",
          en: "Yes — a PromptPay QR shows on screen, and cards are accepted through Beam Checkout.",
        },
      },
      {
        q: { th: "POS ฟรีจริงไหม?", en: "Is the POS really free?" },
        a: {
          th: "แพ็กเกจ Free ใช้ POS ได้ 1 ร้าน 1 เครื่อง ไม่มีค่าใช้จ่าย ต้องการเพิ่มร้านหรือเครื่องค่อยอัปเกรด",
          en: "The Free plan includes one shop and one device at no cost. Upgrade when you need more shops or devices.",
        },
      },
    ],
    related: ["kiosk", "sales-channels", "inventory"],
    modules: ["commerce", "operation"],
  },
  {
    key: "kiosk",
    module: "operation",
    keyword: {
      th: "ระบบหน้างาน คีออสก์ แพ็กสินค้า",
      en: "shop-floor kiosk apps",
    },
    seoTitle: {
      th: "แอปหน้างาน: สถานีแพ็กสินค้า สถานีผลิต POS เข้าด้วย PIN | Tonbab",
      en: "Shop-Floor Kiosk Apps: Pack Station, Production, POS | Tonbab",
    },
    metaDescription: {
      th: "แอปคีออสก์สำหรับหน้างาน: สแกนแพ็กตามใบส่งของและพิมพ์ใบปะหน้าภาษาไทย เบิกวัตถุดิบและบันทึกผลผลิตตามใบสั่งผลิต POS หน้าร้าน พนักงานเข้าด้วย PIN บนเครื่องเดียว",
      en: "Floor kiosk apps: scan-to-pack with Thai labels, issue materials and record output on work orders, and a POS counter — operators sign in with a PIN.",
    },
    eyebrow: { th: "แอปคีออสก์ · หน้างาน", en: "Kiosk apps · On the floor" },
    h1: {
      th: "แอปหน้างาน หนึ่งเครื่อง หลายคน เข้าด้วย PIN",
      en: "Floor apps: one device, many operators, a PIN each",
    },
    lede: {
      th: "วางแท็บเล็ตไว้ที่โต๊ะแพ็ก ไลน์ผลิต หรือหน้าร้าน ทุกอย่างที่พนักงานทำลงในข้อมูลชุดเดียวกับที่ออฟฟิศเห็น",
      en: "Put a tablet at the packing bench, the line or the counter — everything operators do lands in the records the office sees.",
    },
    answer: {
      th: "แอปคีออสก์ของ Tonbab คือแอปเล็กสำหรับหน้างานที่ใช้เครื่องเดียวร่วมกันหลายคน พนักงานเข้าด้วย PIN ของตัวเอง ระบบจำว่าเครื่องเป็นสถานีอะไร มีสามสถานี: แพ็กสินค้า (สแกนบาร์โค้ดตามใบส่งของและพิมพ์ใบปะหน้า) ผลิต (เบิกวัตถุดิบและบันทึกผลผลิต) และ POS หน้าร้าน",
      en: "Tonbab kiosk apps are small floor apps on a shared device: each operator signs in with their own PIN and the device remembers which station it is. There are three stations — pack (scan barcodes against a delivery note and print the label), production (issue materials and record output) and the POS counter.",
    },
    visual: "kiosk",
    highlights: [
      {
        title: {
          th: "สถานีแพ็ก สแกน-แพ็ก-พิมพ์",
          en: "Pack station: scan, pack, print",
        },
        body: {
          th: "เปิดใบส่งของ สแกนสินค้าทีละชิ้น ระบบกันแพ็กเกินจำนวน แล้วพิมพ์ใบปะหน้าภาษาไทยบนเครื่อง Sunmi",
          en: "Open a delivery note, scan each item — over-packing is blocked — then print a Thai label on a Sunmi device.",
        },
      },
      {
        title: { th: "สถานีผลิต", en: "Production station" },
        body: {
          th: "พนักงานไลน์ผลิตเบิกวัตถุดิบตามใบสั่งผลิต บันทึกผลผลิตและของเสีย โดยไม่ต้องเข้าระบบหลังบ้าน",
          en: "Line operators issue materials to a work order and record output and scrap — no back-office login needed.",
        },
      },
      {
        title: { th: "POS หน้าร้าน", en: "POS counter" },
        body: {
          th: "หน้าจอขายเต็มจอ เปิดค้างบนแท็บเล็ตหน้าร้าน แคชเชียร์สลับกันด้วย PIN",
          en: "A full-screen register that stays open on the counter tablet; cashiers switch with a PIN.",
        },
      },
      {
        title: { th: "ผูกเครื่องเป็นสถานี", en: "Pair a device to a station" },
        body: {
          th: "ผู้ดูแลจับคู่เครื่องกับสถานีครั้งเดียว เครื่องเปิดแอปที่ถูกต้องเองทุกครั้ง",
          en: "An admin pairs the device once; from then on it opens the right station by itself.",
        },
      },
      {
        title: { th: "รู้ว่าใครทำ", en: "Every action has a name" },
        body: {
          th: "ทุกการแพ็ก เบิก และขาย บันทึกชื่อพนักงานที่เข้าด้วย PIN ตรวจย้อนได้",
          en: "Every pack, issue and sale records the operator who signed in with the PIN.",
        },
      },
      {
        title: {
          th: "โหมดคีออสก์ในแอปมือถือ",
          en: "Kiosk mode in the native app",
        },
        body: {
          th: "แอป Tonbab บน iOS และ Android สลับเป็นโหมดคีออสก์ได้ ไม่ต้องติดตั้งแอปแยก",
          en: "The Tonbab app for iOS and Android switches into kiosk mode — no separate app to install.",
        },
      },
    ],
    plan: {
      th: "สถานีแพ็กและ POS ใช้ได้ทุกแพ็กเกจ สถานีผลิตใช้กับโมดูลการผลิต (Business ขึ้นไป)",
      en: "Pack and POS stations are in every plan; the production station needs manufacturing (Business and up).",
    },
    faq: [
      {
        q: {
          th: "ต้องซื้ออุปกรณ์พิเศษไหม?",
          en: "Do I need special hardware?",
        },
        a: {
          th: "ไม่ต้อง แท็บเล็ตทั่วไปใช้ได้ ถ้าต้องการพิมพ์ใบปะหน้าในตัว แนะนำเครื่อง Sunmi ที่มีหัวพิมพ์",
          en: "No — any tablet works. For built-in label printing, a Sunmi device with a print head is recommended.",
        },
      },
      {
        q: {
          th: "พนักงานต้องมีบัญชีผู้ใช้ของตัวเองไหม?",
          en: "Does every operator need a user account?",
        },
        a: {
          th: "ไม่ต้องเป็นผู้ใช้เต็มรูปแบบ ผู้ดูแลสร้างผู้ปฏิบัติงานพร้อม PIN ให้ใช้เฉพาะหน้าคีออสก์",
          en: "No. Admins create operators with a PIN that only opens the kiosk station.",
        },
      },
    ],
    related: ["pos", "manufacturing", "mobile"],
    modules: ["operation", "commerce"],
  },
  {
    key: "inventory",
    module: "operation",
    keyword: { th: "โปรแกรมสต็อกสินค้า", en: "inventory management software" },
    seoTitle: {
      th: "โปรแกรมสต็อกสินค้าออนไลน์ หลายคลัง ล็อต ซีเรียล | Tonbab",
      en: "Inventory Management Software — Multi-Warehouse, Lots | Tonbab",
    },
    metaDescription: {
      th: "โปรแกรมสต็อกสินค้าออนไลน์: หลายคลัง โอนย้าย ปรับยอด ล็อตและซีเรียล หน่วยนับแปลงได้ ต้นทุนเฉลี่ยหรือ FIFO ตามล็อต ทุกการรับ-จ่ายผูกกับเอกสาร ตรวจสอบย้อนได้",
      en: "Cloud inventory software: multiple warehouses, transfers, adjustments, lots and serials, unit conversion, average or FIFO-by-lot costing — every movement tied to its source document.",
    },
    eyebrow: { th: "Operation · คลังสินค้า", en: "Operation · Inventory" },
    h1: {
      th: "โปรแกรมสต็อกสินค้า ที่ทุกการเคลื่อนไหวมีเอกสารรองรับ",
      en: "Inventory where every movement has a document behind it",
    },
    lede: {
      th: "รับของ เบิก ผลิต ขาย และส่ง — ทุกการเคลื่อนไหวของสต็อกเกิดจากเอกสารจริง ยอดคงเหลือจึงตรงกับต้นทุน",
      en: "Receiving, issuing, production, sales and delivery — every stock movement comes from a real document, so balances and cost agree.",
    },
    answer: {
      th: "ระบบสต็อกของ Tonbab บันทึกทุกการเคลื่อนไหวของสินค้าจากเอกสารต้นทาง เช่น ใบรับสินค้า ใบสั่งผลิต ใบส่งของ และบิล POS รองรับหลายคลัง การโอนย้าย การปรับยอด ล็อตและซีเรียล การแปลงหน่วยนับ และคิดต้นทุนแบบถัวเฉลี่ยถ่วงน้ำหนักหรือ FIFO ตามล็อต",
      en: "Tonbab inventory records every stock movement from its source document — goods receipt, work order, delivery note or POS bill. It supports multiple warehouses, transfers, adjustments, lots and serials, unit-of-measure conversion, and weighted-average or FIFO-by-lot costing.",
    },
    visual: "stock",
    highlights: [
      {
        title: {
          th: "หลายคลัง ในและนอก",
          en: "Internal and external warehouses",
        },
        body: {
          th: "แยกคลังของบริษัทกับคลังที่ผู้รับจ้างผลิตหรือลูกค้าถือไว้ โอนย้ายได้ทุกแบบ",
          en: "Separate your own warehouses from stock held at subcontractors or customers, and transfer between any of them.",
        },
      },
      {
        title: { th: "ล็อตและซีเรียล", en: "Lots and serials" },
        body: {
          th: "ผูกล็อตอัตโนมัติเมื่อรับและจ่าย สืบย้อนสินค้าที่ส่งออกไปถึงวัตถุดิบต้นทาง",
          en: "Lots bind automatically on receipt and issue; trace any shipped item back to its inputs.",
        },
      },
      {
        title: { th: "หน่วยนับแปลงได้", en: "Unit conversion" },
        body: {
          th: "ซื้อเป็นกิโลกรัม ผลิตเป็นมิลลิลิตร ขายเป็นชิ้น ระบบแปลงหน่วยและเตือนเมื่อกรอกผิดหน่วย",
          en: "Buy in kilograms, produce in millilitres, sell in pieces — conversions are applied and wrong-unit entries are flagged.",
        },
      },
      {
        title: { th: "ต้นทุนที่ถูกต้อง", en: "Correct cost" },
        body: {
          th: "ต้นทุนเฉลี่ยถ่วงน้ำหนักหรือ FIFO ตามล็อต ค่านำเข้าจริงเข้าต้นทุนสต็อกที่ใบรับสินค้า",
          en: "Weighted-average or FIFO by lot; actual import costs land in stock value at goods receipt.",
        },
      },
      {
        title: { th: "จองสต็อกให้ออเดอร์", en: "Reserved for orders" },
        body: {
          th: "ออเดอร์ที่ยืนยันแล้วจองสต็อกไว้ เห็นยอดพร้อมขายจริง ไม่ขายของที่สัญญาไว้แล้ว",
          en: "Confirmed orders reserve stock, so available-to-sell is real and promised goods aren't sold twice.",
        },
      },
      {
        title: { th: "ส่งออกและตรวจสอบ", en: "Export and audit" },
        body: {
          th: "ดูประวัติการเคลื่อนไหวทุกรายการ ส่งออก Excel ได้ ทุกบรรทัดลิงก์กลับเอกสารต้นทาง",
          en: "A full movement ledger, Excel export, and every line links back to its source document.",
        },
      },
    ],
    plan: {
      th: "ทุกแพ็กเกจ — Free 2 คลัง 300 สินค้า; ล็อตและซีเรียลเริ่มที่ Standard",
      en: "Every plan — Free has 2 warehouses and 300 products; lots and serials start on Standard.",
    },
    faq: [
      {
        q: {
          th: "นำเข้ารายการสินค้าและยอดยกมาจาก Excel ได้ไหม?",
          en: "Can I import products and opening balances from Excel?",
        },
        a: {
          th: "ได้ นำเข้าสินค้าและยอดยกมาพร้อมต้นทุนจาก Excel หรือให้ทีมเราช่วยย้ายข้อมูล",
          en: "Yes — import products and opening balances with cost from Excel, or let our team migrate them.",
        },
      },
      {
        q: {
          th: "ใช้คิดต้นทุนแบบไหน?",
          en: "Which costing methods are supported?",
        },
        a: {
          th: "ถัวเฉลี่ยถ่วงน้ำหนัก หรือ FIFO ตามล็อตสำหรับบริษัทที่ต้องการ",
          en: "Weighted average, or FIFO by lot for companies that need it.",
        },
      },
    ],
    related: ["international-procurement", "manufacturing", "kiosk"],
    modules: ["operation"],
  },
  {
    key: "international-procurement",
    module: "operation",
    keyword: { th: "ระบบจัดซื้อ", en: "procurement software" },
    seoTitle: {
      th: "ระบบจัดซื้อและนำเข้า เทียบราคา RFQ ด้วยต้นทุนถึงคลัง | Tonbab",
      en: "Procurement Software with Landed-Cost RFQ Comparison | Tonbab",
    },
    metaDescription: {
      th: "ระบบจัดซื้อ: ใบขอซื้อ อนุมัติหลายขั้น เทียบราคาผู้ขายในประเทศและต่างประเทศด้วยต้นทุนถึงคลัง (FX ค่าขนส่ง อากร) ผู้ขายแต่ละรายใช้สกุลเงินของตัวเอง รองรับสั่งของจีน CNY",
      en: "Procurement software: purchase requests, multi-step approval, and RFQ comparison that ranks domestic and overseas quotes by landed cost (FX, freight, duty), with per-vendor currency.",
    },
    eyebrow: {
      th: "จุดเด่น · จัดซื้อต่างประเทศ",
      en: "Differentiator · International procurement",
    },
    h1: {
      th: "ระบบจัดซื้อที่เทียบผู้ขายทั่วโลก ด้วยต้นทุนถึงคลัง",
      en: "Procurement that compares vendors worldwide by landed cost",
    },
    lede: {
      th: "ราคาต่อหน่วยที่ถูกที่สุดไม่ใช่ข้อเสนอที่ดีที่สุดเสมอไป Tonbab รวมอัตราแลกเปลี่ยน ค่าขนส่ง อากร และพิธีการ แล้วจัดอันดับให้",
      en: "The cheapest unit price isn't always the best deal. Tonbab adds FX, freight, duty and clearance, then ranks the quotes for you.",
    },
    answer: {
      th: "ระบบจัดซื้อของ Tonbab เริ่มจากใบขอซื้อ ผ่านสายอนุมัติ ไปสู่การเปรียบเทียบราคา (RFQ) ถ้ามีใบเสนอราคาเป็นสกุลต่างประเทศ ระบบสลับเป็นโหมดระหว่างประเทศ คำนวณต้นทุนถึงคลังเป็นบาทจากราคา อัตราแลกเปลี่ยน ค่าขนส่ง อากร และพิธีการ แล้วจัดอันดับ ผู้ขายไทยยังแสดงเป็นบาทล้วน",
      en: "Tonbab procurement runs from purchase request through approval to an RFQ comparison. When a quote is in a foreign currency, the comparison switches to international mode and ranks quotes by landed cost in THB — price, exchange rate, freight, duty and clearance. Thai vendors stay in plain baht.",
    },
    visual: "landed",
    highlights: [
      {
        title: {
          th: "ใบขอซื้อและอนุมัติหลายขั้น",
          en: "Requests and multi-step approval",
        },
        body: {
          th: "ใครต้องการของก็เปิดใบขอซื้อได้ แก้หลังอนุมัติต้องอนุมัติใหม่ ไม่มีรายการแอบแก้",
          en: "Anyone can raise a request; edits after approval trigger re-approval, so nothing slips through changed.",
        },
      },
      {
        title: { th: "สองโหมดอัตโนมัติ", en: "Two modes, chosen for you" },
        body: {
          th: "โหมดในประเทศเทียบบาทตรง ๆ โหมดระหว่างประเทศจัดอันดับตามต้นทุนถึงคลัง ระบบเลือกจากสกุลเงินของผู้ขาย",
          en: "Domestic mode compares plain THB; international mode ranks by landed cost. The vendor currencies decide.",
        },
      },
      {
        title: { th: "สกุลเงินรายผู้ขาย", en: "Currency per vendor" },
        body: {
          th: "USD CNY EUR และสกุลอื่น ผู้ขายแต่ละรายใช้สกุลของตัวเอง ไม่ต้องแปลงเองในสเปรดชีต",
          en: "USD, CNY, EUR and more — each vendor quotes in its own currency, with no spreadsheet conversions.",
        },
      },
      {
        title: {
          th: "ยืนยันผู้ชนะ แล้วลงต้นทุนจริง",
          en: "Award, then post real cost",
        },
        body: {
          th: "เลือกผู้ชนะรายบรรทัด ออกใบสั่งซื้อแยกตามผู้ขาย ค่านำเข้าจริงลงที่ใบรับสินค้าและเข้าต้นทุนสต็อก",
          en: "Award per line, raise vendor-grouped POs, and post actual import costs at goods receipt into stock value.",
        },
      },
      {
        title: { th: "สั่งจากจีน Taobao", en: "Buying from China" },
        body: {
          th: "บันทึกใบสั่งซื้อเป็นหยวนแล้วแปลงเป็นบาท รวมค่าขนส่งแบบ DDP เข้าต้นทุน",
          en: "Record orders in CNY, convert to THB, and fold DDP freight into cost.",
        },
      },
      {
        title: {
          th: "ราคาตกลงและผู้ขายหลัก",
          en: "Agreed prices and preferred vendors",
        },
        body: {
          th: "เก็บราคาตกลงพร้อมวันที่ ราคาที่หมดอายุไม่ถูกใช้สร้างใบสั่งซื้ออัตโนมัติ",
          en: "Store dated agreed prices; stale prices never auto-create a PO.",
        },
      },
    ],
    plan: {
      th: "ใบขอซื้อและใบสั่งซื้อใช้ได้ทุกแพ็กเกจ การเปรียบเทียบราคา RFQ เริ่มที่ Standard",
      en: "Requests and POs are in every plan; RFQ price comparison starts on Standard.",
    },
    faq: [
      {
        q: {
          th: "ต้นทุนถึงคลัง (landed cost) คืออะไร?",
          en: "What is landed cost?",
        },
        a: {
          th: "คือต้นทุนจริงของสินค้าเมื่อถึงคลัง รวมราคาสินค้า อัตราแลกเปลี่ยน ค่าขนส่ง อากร และค่าพิธีการ ใช้เทียบผู้ขายต่างประเทศกับในประเทศอย่างยุติธรรม",
          en: "The real cost of goods once they reach your warehouse: price, exchange rate, freight, duty and clearance. It lets you compare overseas and local vendors fairly.",
        },
      },
      {
        q: {
          th: "ถ้าค่าใช้จ่ายจริงต่างจากที่ประมาณไว้?",
          en: "What if actual costs differ from the estimate?",
        },
        a: {
          th: "ลงค่านำเข้าจริงที่ใบรับสินค้า ระบบปรับต้นทุนสต็อกตามจริง",
          en: "Post the actual import costs at goods receipt and stock value follows the actuals.",
        },
      },
    ],
    related: ["inventory", "manufacturing", "thai-tax"],
    modules: ["operation"],
  },
  {
    key: "manufacturing",
    module: "operation",
    keyword: { th: "โปรแกรมการผลิต", en: "manufacturing software" },
    seoTitle: {
      th: "โปรแกรมการผลิต BOM ใบสั่งผลิต ต้นทุนการผลิต | Tonbab",
      en: "Manufacturing Software for SMEs — BOM, Work Orders | Tonbab",
    },
    metaDescription: {
      th: "โปรแกรมการผลิตสำหรับโรงงาน SME: BOM ใบสั่งผลิต ขั้นตอนผลิตในโรงงานและจ้างภายนอก ผลผลิตและของเสีย ต้นทุนแผนเทียบจริง QC กักล็อต และสืบย้อนล็อต",
      en: "Manufacturing software for SME factories: BOMs, work orders, in-house and subcontract routing, yield and scrap, planned-vs-actual cost, QC hold and lot genealogy.",
    },
    eyebrow: { th: "Operation · การผลิต", en: "Operation · Manufacturing" },
    h1: {
      th: "โปรแกรมการผลิต ที่รู้ต้นทุนจริงของทุกใบสั่งผลิต",
      en: "Manufacturing that knows the real cost of every work order",
    },
    lede: {
      th: "จาก BOM ถึงสินค้าสำเร็จรูป วัตถุดิบถูกตัด ผลผลิตถูกบันทึก และต้นทุนไหลเข้า Job Control เอง",
      en: "From BOM to finished goods: materials are consumed, output is recorded and cost flows into the Job Control by itself.",
    },
    answer: {
      th: "โมดูลการผลิตของ Tonbab ใช้ BOM กำหนดวัตถุดิบ ปล่อยใบสั่งผลิตแล้วตัดวัตถุดิบตามสูตร รองรับขั้นตอนผลิตทั้งในโรงงานและจ้างภายนอก บันทึกผลผลิตและของเสีย เก็บต้นทุนแผน ณ ตอนปล่อยงานเพื่อเทียบกับต้นทุนจริง กักล็อตที่ไม่ผ่าน QC และสืบย้อนล็อตได้",
      en: "Tonbab manufacturing uses BOMs to define materials, consumes them when a work order is released, supports in-house and subcontract routing steps, records yield and scrap, snapshots planned cost at release for variance against actual, quarantines lots on QC hold and keeps lot genealogy.",
    },
    visual: "mfg",
    highlights: [
      {
        title: { th: "BOM และสูตรการผลิต", en: "BOMs" },
        body: {
          th: "กำหนดวัตถุดิบต่อหน่วยผลิต หน่วยผลิตต่างจากหน่วยซื้อได้ ต้นทุน BOM คำนวณให้",
          en: "Define materials per unit; production units can differ from purchase units; BOM cost is computed.",
        },
      },
      {
        title: {
          th: "ขั้นตอนในโรงงานและจ้างภายนอก",
          en: "In-house and subcontract routing",
        },
        body: {
          th: "ส่งวัตถุดิบให้ผู้รับจ้างผลิตโดยสต็อกยังติดตามได้ในคลังภายนอก",
          en: "Send materials to a subcontractor while the stock stays tracked in an external warehouse.",
        },
      },
      {
        title: { th: "ผลผลิต ของเสีย ส่วนต่าง", en: "Yield, scrap, variance" },
        body: {
          th: "บันทึกผลผลิตและของเสีย เห็นส่วนต่างต้นทุนแผนกับจริงทุกใบสั่งผลิต",
          en: "Record yield and scrap and see planned-vs-actual variance on every work order.",
        },
      },
      {
        title: { th: "QC กักล็อต", en: "QC hold" },
        body: {
          th: "ล็อตที่สงสัยถูกกักไว้ ใช้หรือส่งไม่ได้จนกว่าจะปล่อย",
          en: "Suspect lots are quarantined and cannot be used or shipped until released.",
        },
      },
      {
        title: {
          th: "ของขาด สร้างใบขอซื้อรวม",
          en: "Shortages pooled into one PR",
        },
        body: {
          th: "วัตถุดิบไม่พอ ระบบเตือน (ไม่บล็อก) และรวมของขาดตามผู้ขายเป็นใบขอซื้อเดียว",
          en: "Shortages warn without blocking and pool by vendor into one purchase request.",
        },
      },
      {
        title: { th: "หน้างานผลิตบนแท็บเล็ต", en: "Production kiosk" },
        body: {
          th: "พนักงานไลน์ผลิตเบิกและบันทึกผลผลิตจากแท็บเล็ตด้วย PIN",
          en: "Line operators issue materials and record output from a tablet with a PIN.",
        },
      },
    ],
    plan: {
      th: "การผลิตอยู่ในแพ็กเกจ Business ขึ้นไป",
      en: "Manufacturing is in Business and Enterprise.",
    },
    faq: [
      {
        q: { th: "เหมาะกับโรงงานแบบไหน?", en: "Which factories is it for?" },
        a: {
          th: "โรงงาน SME ที่ผลิตตามออเดอร์หรือผลิตเก็บสต็อก ทั้งผลิตเองและจ้างผลิตบางขั้นตอน",
          en: "SME factories making to order or to stock, including those that subcontract some steps.",
        },
      },
      {
        q: {
          th: "มี MRP วางแผนกำลังการผลิตไหม?",
          en: "Is there MRP capacity scheduling?",
        },
        a: {
          th: "ยังไม่มีการวางแผนกำลังการผลิตแบบละเอียด ระบบเน้นต้นทุนจริง ของขาด และการสืบย้อน",
          en: "Not detailed capacity scheduling. The focus is real cost, shortages and traceability.",
        },
      },
    ],
    related: ["inventory", "kiosk", "international-procurement"],
    modules: ["operation"],
  },
  {
    key: "thai-tax",
    module: "accounting",
    earlyAccess: true,
    keyword: {
      th: "หนังสือรับรองหัก ณ ที่จ่าย 50 ทวิ",
      en: "Thai withholding tax certificate (50 Tawi)",
    },
    seoTitle: {
      th: "ออกหนังสือรับรองหัก ณ ที่จ่าย 50 ทวิ ภ.พ.30 ภ.ง.ด.3/53 | Tonbab",
      en: "Thai Tax: 50 Tawi WHT Certificates, VAT PP30, PND 3/53 | Tonbab",
    },
    metaDescription: {
      th: "ออกหนังสือรับรองการหักภาษี ณ ที่จ่าย (50 ทวิ) จากการจ่ายเงินอัตโนมัติ พร้อมเลขผู้เสียภาษีและที่อยู่ผู้รับเงิน รายงานภาษีซื้อ-ขาย ภ.พ.30 และ ภ.ง.ด.3/53 ส่งออกไฟล์สำหรับยื่น",
      en: "Issue Thai withholding tax certificates (50 Tawi) straight from payments with the payee's tax ID and address, plus VAT reports, PP30 and PND 3/53 exports for filing.",
    },
    eyebrow: {
      th: "บัญชี · ภาษีไทย · Early access",
      en: "Accounting · Thai tax · Early access",
    },
    h1: {
      th: "ภาษีไทยครบ ตั้งแต่ 50 ทวิ ถึง ภ.พ.30",
      en: "Thai tax done properly — from 50 Tawi to PP30",
    },
    lede: {
      th: "จ่ายเงินแล้วได้หนังสือรับรอง 50 ทวิ ทันที สิ้นเดือนได้รายงานภาษีพร้อมยื่น ไม่ต้องกรอกซ้ำ",
      en: "Pay a vendor and the 50 Tawi certificate is ready; at month end the tax reports are ready to file — nothing re-typed.",
    },
    answer: {
      th: "หนังสือรับรองการหักภาษี ณ ที่จ่าย (50 ทวิ) คือเอกสารที่ผู้จ่ายเงินต้องออกให้ผู้รับเงินเมื่อหักภาษี ณ ที่จ่าย Tonbab ออก 50 ทวิ จากรายการจ่ายเงินพร้อมเลขผู้เสียภาษีและที่อยู่ของผู้รับเงิน รวมยอดเข้า ภ.ง.ด.3/53 และทำรายงานภาษีซื้อ-ขายกับ ภ.พ.30 ให้ ฝั่งเงินเดือนออก 50 ทวิ รายพนักงานได้ด้วย",
      en: "A 50 Tawi certificate is the document a Thai payer must give a payee when withholding tax. Tonbab issues it from the payment with the payee's tax ID and address, totals it into PND 3/53, and prepares the VAT purchase/sales reports and PP30. Payroll issues per-employee 50 Tawi too.",
    },
    visual: "wht",
    highlights: [
      {
        title: { th: "50 ทวิ จากการจ่ายเงิน", en: "50 Tawi from the payment" },
        body: {
          th: "บันทึกจ่ายพร้อมหัก ณ ที่จ่าย ระบบออกหนังสือรับรองที่มีเลขผู้เสียภาษีและที่อยู่ผู้รับเงินครบ พิมพ์หรือส่ง PDF ได้",
          en: "Record a payment with withholding and the certificate is issued with the payee's tax ID and address — print it or send the PDF.",
        },
      },
      {
        title: { th: "ภ.ง.ด.3 และ ภ.ง.ด.53", en: "PND 3 and PND 53" },
        body: {
          th: "ยอดหัก ณ ที่จ่ายรวมเป็นรายงานรายเดือน แยกบุคคลธรรมดาและนิติบุคคล ส่งออกไฟล์สำหรับยื่น",
          en: "Withholding totals roll into monthly reports, split by individual and company payees, exported for filing.",
        },
      },
      {
        title: { th: "VAT และ ภ.พ.30", en: "VAT and PP30" },
        body: {
          th: "ใบกำกับภาษี รายงานภาษีซื้อ-ภาษีขาย และ ภ.พ.30 จากเอกสารในระบบโดยตรง",
          en: "Tax invoices, purchase and sales VAT reports and PP30 straight from the documents in the system.",
        },
      },
      {
        title: { th: "ผังบัญชีไทยพร้อมใช้", en: "Thai chart of accounts" },
        body: {
          th: "เริ่มด้วยผังบัญชีมาตรฐานไทย สมุดรายวัน แยกประเภท งบทดลอง และงบการเงินสิ้นปี",
          en: "Start from a standard Thai chart of accounts with journals, ledger, trial balance and year-end statements.",
        },
      },
      {
        title: {
          th: "เติมข้อมูลจากเลขผู้เสียภาษี",
          en: "Fill from the tax ID",
        },
        body: {
          th: "กรอกเลขประจำตัวผู้เสียภาษี ระบบดึงชื่อและที่อยู่ผู้ขายจากกรมสรรพากรให้",
          en: "Enter a tax ID and the vendor's name and address are filled from the Revenue Department.",
        },
      },
      {
        title: { th: "ฝั่งบุคคล", en: "On the payroll side" },
        body: {
          th: "ภ.ง.ด.1 ภ.ง.ด.1ก สปส.1-10 และ 50 ทวิ รายพนักงาน อยู่ในโมดูล People",
          en: "PND 1, PND 1 Kor, SSO 1-10 and per-employee 50 Tawi live in the People module.",
        },
      },
    ],
    plan: {
      th: "โมดูลบัญชีเปิดแบบเชิญ (Early access) ใช้งานจริงแล้วกับบริษัทกลุ่มแรก ภาษีเงินเดือนอยู่ใน People (Standard ขึ้นไป)",
      en: "Accounting is invitation-only early access, already in daily use at the first companies. Payroll tax lives in People (Standard and up).",
    },
    faq: [
      {
        q: {
          th: "ใครต้องออกหนังสือรับรอง 50 ทวิ?",
          en: "Who has to issue a 50 Tawi certificate?",
        },
        a: {
          th: "ผู้จ่ายเงินที่หักภาษี ณ ที่จ่าย เช่น บริษัทที่จ่ายค่าบริการหรือค่าจ้าง ต้องออกให้ผู้รับเงินเป็นหลักฐาน",
          en: "Any payer that withholds tax — for example a company paying for services or wages — must give the payee the certificate as evidence.",
        },
      },
      {
        q: {
          th: "โมดูลบัญชีเปิดให้ทุกคนหรือยัง?",
          en: "Is Accounting open to everyone?",
        },
        a: {
          th: "ยังเปิดแบบเชิญ ติดต่อ sales@codustry.com หากต้องการเข้าร่วม ระหว่างนี้ Tonbab ส่งออกเอกสารให้โปรแกรมบัญชีที่คุณใช้อยู่ได้",
          en: "Not yet — it is invitation-only. Email sales@codustry.com to join. Meanwhile Tonbab exports documents for your current accounting software.",
        },
      },
    ],
    related: ["payroll", "international-procurement", "security"],
    modules: ["accounting", "people"],
  },
  {
    key: "payroll",
    module: "people",
    keyword: { th: "โปรแกรมเงินเดือน", en: "Thai payroll software" },
    seoTitle: {
      th: "โปรแกรมเงินเดือน ประกันสังคม ภ.ง.ด.1 50 ทวิ | Tonbab",
      en: "Thai Payroll Software — SSO, PND 1, 50 Tawi | Tonbab",
    },
    metaDescription: {
      th: "โปรแกรมเงินเดือนสำหรับ SME ไทย: คำนวณเงินเดือน ประกันสังคมพร้อมเพดานที่ตั้งค่าได้ ภ.ง.ด.1 ภ.ง.ด.1ก 50 ทวิ รายพนักงาน วันลาตามกฎหมาย และสิทธิ์ดูเงินเดือนเฉพาะ HR",
      en: "Payroll for Thai SMEs: salary runs, social security with a configurable cap, PND 1 / PND 1 Kor, per-employee 50 Tawi, statutory leave, and salary visible to HR only.",
    },
    eyebrow: { th: "People · เงินเดือน", en: "People · Payroll" },
    h1: {
      th: "โปรแกรมเงินเดือน ตามกฎหมายไทย ในระบบเดียวกับ HR",
      en: "Payroll by Thai rules, in the same system as HR",
    },
    lede: {
      th: "ข้อมูลพนักงาน วันลา และเวลาทำงานอยู่ที่เดียวกับเงินเดือน ปิดงวดแล้วได้รายงานยื่นและร่างสมุดรายวันให้บัญชี",
      en: "Employee records, leave and time sit next to payroll; close the run and get filing reports plus a draft journal for accounting.",
    },
    answer: {
      th: "โปรแกรมเงินเดือนของ Tonbab อยู่ในโมดูล People คำนวณเงินเดือนรายงวด ประกันสังคมตามเพดานค่าจ้างที่ตั้งค่าได้ ออกรายงาน ภ.ง.ด.1 ภ.ง.ด.1ก สปส.1-10 และหนังสือรับรอง 50 ทวิ รายพนักงาน ข้อมูลเงินเดือนเห็นได้เฉพาะผู้ได้รับสิทธิ์ที่ระดับฐานข้อมูล",
      en: "Tonbab payroll is part of the People module. It calculates each pay run, applies social security with a configurable wage cap, and produces PND 1, PND 1 Kor, SSO 1-10 and per-employee 50 Tawi. Salary data is visible only to permitted roles, enforced in the database.",
    },
    visual: "payroll",
    highlights: [
      {
        title: { th: "รอบเงินเดือน", en: "Pay runs" },
        body: {
          th: "เปิดงวด คำนวณรายได้ รายการหัก ประกันสังคม และภาษี ตรวจแล้วปิดงวด",
          en: "Open a run, compute earnings, deductions, social security and tax, review and close.",
        },
      },
      {
        title: { th: "รายงานยื่นภาครัฐ", en: "Government filings" },
        body: {
          th: "ภ.ง.ด.1 ภ.ง.ด.1ก และ สปส.1-10 ส่งออกเป็นไฟล์ พร้อม 50 ทวิ รายพนักงาน",
          en: "PND 1, PND 1 Kor and SSO 1-10 exports, plus per-employee 50 Tawi.",
        },
      },
      {
        title: {
          th: "สิทธิ์ดูเงินเดือนแยกชั้น",
          en: "Salary behind its own permission",
        },
        body: {
          th: "เงินเดือนเห็นเฉพาะ Admin/HR ข้อมูลบัตรประชาชนและบัญชีธนาคารแยกสิทธิ์อีกชั้น",
          en: "Salary is Admin/HR-only; ID card and bank details sit behind a separate tier.",
        },
      },
      {
        title: { th: "วันลาตามกฎหมายแรงงาน", en: "Statutory leave" },
        body: {
          th: "ประเภทวันลาตามกฎหมาย วันหยุดชดเชย และวันหยุดนักขัตฤกษ์ อนุมัติจากมือถือ",
          en: "Statutory leave types, compensatory days and public holidays, approved from a phone.",
        },
      },
      {
        title: { th: "เวลาทำงาน", en: "Time and attendance" },
        body: {
          th: "บันทึกเข้า-ออกงาน ตั้งเวลาผ่อนผันการมาสายรายบริษัท",
          en: "Clock-in records with a per-company late grace period.",
        },
      },
      {
        title: { th: "ส่งต่อบัญชี", en: "Hand-off to accounting" },
        body: {
          th: "ปิดงวดแล้วได้ร่างสมุดรายวันเงินเดือนให้นักบัญชีตรวจ (สำหรับบริษัทในโมดูลบัญชี)",
          en: "Closing a run drafts the payroll journal for the accountant (for companies on Accounting).",
        },
      },
    ],
    plan: {
      th: "เงินเดือนเริ่มที่แพ็กเกจ Standard",
      en: "Payroll starts on the Standard plan.",
    },
    faq: [
      {
        q: {
          th: "เพดานประกันสังคมเปลี่ยน ต้องรออัปเดตไหม?",
          en: "If the social security cap changes, do I wait for an update?",
        },
        a: {
          th: "ไม่ต้อง เพดานค่าจ้างตั้งค่าได้เองในระบบ",
          en: "No — the wage cap is a setting you can change yourself.",
        },
      },
      {
        q: {
          th: "นำเข้าข้อมูลเงินเดือนเดิมได้ไหม?",
          en: "Can I import past payroll?",
        },
        a: {
          th: "ได้ ใช้แม่แบบ Excel นำเข้าประวัติเงินเดือน หรือให้ทีมเราช่วย",
          en: "Yes, with an Excel import template, or with our team's help.",
        },
      },
    ],
    related: ["thai-tax", "security", "mobile"],
    modules: ["people"],
  },
  {
    key: "sales-channels",
    module: "commerce",
    keyword: {
      th: "เชื่อมต่อ Shopee Lazada LINE OA",
      en: "Shopee Lazada LINE OA integration",
    },
    seoTitle: {
      th: "เชื่อม Shopee Lazada และแชท LINE OA Messenger ในระบบเดียว | Tonbab",
      en: "Shopee & Lazada Order Sync + LINE OA, Messenger Inbox | Tonbab",
    },
    metaDescription: {
      th: "ดึงออเดอร์ Shopee และ Lazada อัตโนมัติ รวมแชท LINE OA Messenger และ Instagram ในกล่องเดียว ตัดสต็อกจากคลังเดียวกับ POS — TikTok Shop และ LINE Shopping เร็ว ๆ นี้",
      en: "Pull Shopee and Lazada orders automatically and answer LINE OA, Messenger and Instagram in one inbox, all on the same stock as your POS. TikTok Shop and LINE Shopping coming soon.",
    },
    eyebrow: {
      th: "Commerce · ช่องทางขายและแชท",
      en: "Commerce · Channels and chat",
    },
    h1: {
      th: "ทุกช่องทางขายและแชท ไหลเข้าที่เดียว",
      en: "Every sales channel and chat, in one place",
    },
    lede: {
      th: "ออเดอร์จากหน้าร้านและมาร์เก็ตเพลส แชทจาก LINE และ Meta รวมในระบบเดียวกับสต็อกและลูกค้า เราบอกชัดว่าอะไรใช้ได้แล้วและอะไรยังพัฒนาอยู่",
      en: "Orders from the counter and marketplaces, chats from LINE and Meta, in one system with your stock and customers — and we say plainly what is live and what is still in development.",
    },
    answer: {
      th: "Tonbab Commerce เชื่อม Shopee และ Lazada ผ่าน Open Platform แบบ OAuth รายร้าน แล้วดึงออเดอร์อัตโนมัติแบบไม่ซ้ำ ส่วนแชทตอบได้สองทางจาก LINE OA, Messenger และ Instagram ในกล่องเดียว การส่งยอดสต็อกกลับร้านออนไลน์อยู่ระหว่างพัฒนา TikTok Shop และ LINE Shopping จะตามมาเร็ว ๆ นี้ และแชทของ Shopee/Lazada ยังไม่เปิด",
      en: "Tonbab Commerce connects Shopee and Lazada through their Open Platforms with per-shop OAuth and pulls orders automatically without duplicates. LINE OA, Messenger and Instagram chats are answered two-way in one inbox. Stock push-back to marketplaces is in development, TikTok Shop and LINE Shopping are coming soon, and Shopee/Lazada chat is not available.",
    },
    visual: "channels",
    statusRows: [
      {
        name: "POS",
        group: { th: "ช่องทางขาย", en: "Sales channel" },
        state: "live",
      },
      {
        name: "Shopee",
        group: { th: "ช่องทางขาย", en: "Sales channel" },
        state: "live",
        note: { th: "ดึงออเดอร์อัตโนมัติ", en: "Automatic order pull" },
      },
      {
        name: "Lazada",
        group: { th: "ช่องทางขาย", en: "Sales channel" },
        state: "live",
        note: { th: "ดึงออเดอร์อัตโนมัติ", en: "Automatic order pull" },
      },
      {
        name: {
          th: "ส่งสต็อกกลับร้านออนไลน์",
          en: "Stock push-back to marketplaces",
        },
        group: { th: "ช่องทางขาย", en: "Sales channel" },
        state: "dev",
      },
      {
        name: "TikTok Shop",
        group: { th: "ช่องทางขาย", en: "Sales channel" },
        state: "soon",
      },
      {
        name: "LINE Shopping",
        group: { th: "ช่องทางขาย", en: "Sales channel" },
        state: "soon",
      },
      { name: "LINE OA", group: { th: "แชท", en: "Chat" }, state: "live" },
      { name: "Messenger", group: { th: "แชท", en: "Chat" }, state: "live" },
      { name: "Instagram DM", group: { th: "แชท", en: "Chat" }, state: "live" },
      {
        name: { th: "แชท Shopee / Lazada", en: "Shopee / Lazada chat" },
        group: { th: "แชท", en: "Chat" },
        state: "off",
      },
    ],
    highlights: [
      {
        title: {
          th: "ออเดอร์มาร์เก็ตเพลสอัตโนมัติ",
          en: "Marketplace orders, automatically",
        },
        body: {
          th: "เชื่อมร้าน Shopee และ Lazada ด้วย OAuth รายร้าน ระบบดึงออเดอร์ใหม่เข้ามาเองโดยไม่ซ้ำ",
          en: "Connect each Shopee and Lazada shop with OAuth; new orders arrive by themselves, never duplicated.",
        },
      },
      {
        title: { th: "กล่องแชทเดียว", en: "One inbox" },
        body: {
          th: "ตอบ LINE OA, Messenger และ Instagram จากหน้าจอเดียว เห็นประวัติลูกค้าและออเดอร์ข้างแชท",
          en: "Reply to LINE OA, Messenger and Instagram from one screen, with the customer's history and orders beside the chat.",
        },
      },
      {
        title: { th: "สต็อกชุดเดียว", en: "One stock ledger" },
        body: {
          th: "ออเดอร์ทุกช่องทางจองและตัดสต็อกจากคลังเดียวกับ POS และโกดัง",
          en: "Orders from every channel reserve and issue stock from the same ledger as the POS and warehouse.",
        },
      },
      {
        title: { th: "แพ็กและจัดส่ง", en: "Pick, pack, ship" },
        body: {
          th: "ออเดอร์ไหลต่อไปที่สถานีแพ็ก สแกนแพ็กและพิมพ์ใบปะหน้า รองรับส่งบางส่วน",
          en: "Orders flow on to the pack station — scan, pack, print the label — with partial shipments.",
        },
      },
      {
        title: {
          th: "ลูกค้าคนเดียว ทุกช่องทาง",
          en: "One customer across channels",
        },
        body: {
          th: "รวมตัวตนลูกค้าจากแชทและออเดอร์ เห็นยอดซื้อและความถี่",
          en: "Customer identities from chats and orders are linked, with spend and frequency.",
        },
      },
      {
        title: { th: "ซื่อตรงเรื่องสถานะ", en: "Honest about status" },
        body: {
          th: "แพลตฟอร์มไม่อนุญาตให้ร้านเริ่มแชทก่อน (เช่นกฎ 24 ชม. ของ Meta) ระบบจึงไม่แสดงว่าส่งสำเร็จถ้าส่งไม่ได้จริง",
          en: "Platforms don't let shops start chats (e.g. Meta's 24-hour rule), so Tonbab never shows a message as delivered when it can't be.",
        },
      },
    ],
    plan: {
      th: "แชท LINE OA และ Meta ใช้ได้ใน Commerce; Shopee/Lazada อยู่ในแพ็กเสริมช่องทางขาย ฿3,600/ปี (รวมใน Enterprise)",
      en: "LINE OA and Meta chat are part of Commerce; Shopee/Lazada are in the sales-channels add-on, ฿3,600/yr (included in Enterprise).",
    },
    faq: [
      {
        q: {
          th: "Tonbab ส่งยอดสต็อกกลับไป Shopee/Lazada ได้หรือยัง?",
          en: "Does Tonbab push stock back to Shopee/Lazada yet?",
        },
        a: {
          th: "ยังไม่ได้ ฟีเจอร์นี้อยู่ระหว่างพัฒนา ตอนนี้ระบบดึงออเดอร์เข้ามาและตัดสต็อกในคลัง Tonbab",
          en: "Not yet — it is in development. Today Tonbab pulls orders in and deducts stock in its own ledger.",
        },
      },
      {
        q: {
          th: "รองรับ TikTok Shop และ LINE Shopping ไหม?",
          en: "Do you support TikTok Shop and LINE Shopping?",
        },
        a: {
          th: "อยู่ในแผน เร็ว ๆ นี้ ยังไม่เปิดให้เชื่อมต่อ",
          en: "They are planned and coming soon; they can't be connected yet.",
        },
      },
      {
        q: {
          th: "ตอบแชทลูกค้าใน Shopee/Lazada ได้ไหม?",
          en: "Can I answer Shopee/Lazada chats?",
        },
        a: {
          th: "ยังไม่ได้ แชทที่ตอบได้ตอนนี้คือ LINE OA, Messenger และ Instagram",
          en: "Not yet. Live chat channels today are LINE OA, Messenger and Instagram.",
        },
      },
    ],
    related: ["pos", "kiosk", "inventory"],
    modules: ["commerce"],
  },
  {
    key: "egp-tender-leads",
    module: "crm",
    keyword: {
      th: "งานประมูลภาครัฐ e-GP",
      en: "Thai government tender (e-GP) leads",
    },
    seoTitle: {
      th: "ติดตามงานประมูลภาครัฐ e-GP ทุกวัน เข้า CRM อัตโนมัติ | Tonbab",
      en: "Thai e-GP Government Tender Leads, Daily in Your CRM | Tonbab",
    },
    metaDescription: {
      th: "เลือกหน่วยงานและคำค้น ระบบอ่านประกาศจัดซื้อจัดจ้างภาครัฐ e-GP ของกรมบัญชีกลางทุกวัน ไฮไลต์งานที่ตรงกับธุรกิจ กดเดียวสร้างดีลใน CRM พร้อมสรุปทางอีเมลวันละครั้ง",
      en: "Tonbab reads Thai e-GP procurement announcements daily for your agencies and keywords, highlights matches, turns one into a CRM deal in a click and emails a digest.",
    },
    eyebrow: { th: "CRM · งานประมูลภาครัฐ", en: "CRM · Government tenders" },
    h1: {
      th: "งานประมูล e-GP เข้ามาให้ทุกเช้า",
      en: "e-GP tenders in your pipeline every morning",
    },
    lede: {
      th: "สำหรับธุรกิจที่ขายให้ภาครัฐ ไม่ต้องเปิดเว็บไซต์ e-GP ไล่ดูเองทุกวันอีกต่อไป",
      en: "For businesses that sell to government — no more checking the e-GP site by hand every day.",
    },
    answer: {
      th: "ฟีเจอร์งานประมูล e-GP ของ Tonbab อ่านประกาศจัดซื้อจัดจ้างจากระบบ e-GP ของกรมบัญชีกลางทุกวันตามหน่วยงานที่เลือก ไฮไลต์ประกาศที่ตรงคำค้นของบริษัท แสดงประกาศที่ไม่ตรงด้วยเพื่อหาคำค้นที่ลืมใส่ กดเดียวสร้างดีลใน CRM และส่งสรุปทางอีเมลวันละครั้ง",
      en: "Tonbab's e-GP feature reads procurement announcements from the Comptroller General's Department e-GP system every day for the agencies you choose, highlights those matching your keywords, still shows non-matches so you can spot missing keywords, creates a CRM deal in one click and emails one daily digest.",
    },
    visual: "egp",
    highlights: [
      {
        title: {
          th: "เลือกหน่วยงานและคำค้น",
          en: "Choose agencies and keywords",
        },
        body: {
          th: "ตั้งหน่วยงานที่สนใจและคำค้นของบริษัทครั้งเดียว ระบบทำงานทุกวัน",
          en: "Set the agencies and your keywords once; it runs every day.",
        },
      },
      {
        title: { th: "ไฮไลต์ที่ตรงงาน", en: "Matches highlighted" },
        body: {
          th: "ประกาศที่ตรงคำค้นถูกเน้น ประกาศอื่นยังดูได้ ไม่พลาดคำที่ลืมใส่",
          en: "Matches stand out; the rest stay visible so you never miss a forgotten keyword.",
        },
      },
      {
        title: { th: "กดเดียวเข้าไปป์ไลน์", en: "One click to the pipeline" },
        body: {
          th: "เปลี่ยนประกาศเป็นดีลใน CRM พร้อมหน่วยงานและลิงก์ประกาศ",
          en: "Turn an announcement into a CRM deal with the agency and link attached.",
        },
      },
      {
        title: { th: "สรุปวันละครั้ง", en: "One digest a day" },
        body: {
          th: "อีเมลสรุปวันละครั้ง ไม่แจ้งเตือนรบกวนทีละประกาศ",
          en: "A single daily email instead of a ping per announcement.",
        },
      },
    ],
    plan: {
      th: "งานประมูล e-GP อยู่ในแพ็กเกจ Business ขึ้นไป",
      en: "e-GP tender leads are in Business and Enterprise.",
    },
    faq: [
      {
        q: { th: "ข้อมูลมาจากไหน?", en: "Where does the data come from?" },
        a: {
          th: "จากประกาศสาธารณะในระบบ e-GP ของกรมบัญชีกลาง",
          en: "From the public announcements in the Comptroller General's Department e-GP system.",
        },
      },
    ],
    related: ["mobile", "security", "sales-channels"],
    modules: ["crm"],
  },
  {
    key: "mobile",
    module: "operation",
    keyword: { th: "แอป ERP บนมือถือ", en: "mobile ERP app" },
    seoTitle: {
      th: "แอป ERP บนมือถือ iOS Android และ PWA อนุมัติได้ทุกที่ | Tonbab",
      en: "Mobile ERP App for iOS, Android and PWA | Tonbab",
    },
    metaDescription: {
      th: "ใช้ Tonbab บนมือถือและแท็บเล็ต: ติดตั้งจากเบราว์เซอร์ (PWA) หรือแอป iOS/Android ที่สลับเป็นโหมดคีออสก์ได้ อนุมัติใบขอซื้อ ใบลา และ OT ระหว่างเดินทาง",
      en: "Run Tonbab on phones and tablets: install from the browser (PWA) or use the iOS/Android app with kiosk mode. Approve purchase requests, leave and OT on the go.",
    },
    eyebrow: { th: "แพลตฟอร์ม · มือถือ", en: "Platform · Mobile" },
    h1: {
      th: "ใช้ได้ทุกที่ ตั้งแต่โต๊ะผู้บริหารถึงหน้างาน",
      en: "Everywhere — from the manager's desk to the shop floor",
    },
    lede: {
      th: "หน้าจอเดียวกันบนคอมพิวเตอร์ มือถือ และแท็บเล็ต ไม่ต้องมีแอปแยกต่อแผนก",
      en: "The same screens on desktop, phone and tablet — no separate app per department.",
    },
    answer: {
      th: "Tonbab ใช้ได้บนคอมพิวเตอร์ มือถือ และแท็บเล็ต ติดตั้งเป็นแอปจากเบราว์เซอร์ได้ (PWA) และมีแอป Tonbab สำหรับ iOS และ Android ที่สลับเป็นโหมดคีออสก์ได้ ผู้บริหารอนุมัติใบขอซื้อ ใบลา และ OT จากมือถือพร้อมอีเมลแจ้งเตือน",
      en: "Tonbab works on desktop, phone and tablet. Install it from the browser as a PWA, or use the Tonbab app for iOS and Android, which can switch into kiosk mode. Managers approve purchase requests, leave and OT from their phone with email notifications.",
    },
    visual: "mobile",
    highlights: [
      {
        title: { th: "PWA ติดตั้งได้", en: "Installable PWA" },
        body: {
          th: "เพิ่มลงหน้าจอ iPhone และ Android ได้ทันที ไม่ต้องผ่าน App Store",
          en: "Add it to the home screen on iPhone and Android instantly.",
        },
      },
      {
        title: { th: "แอป iOS และ Android", en: "iOS and Android app" },
        body: {
          th: "แอป Tonbab ตัวเดียว ใช้ได้ทั้งพนักงานทั่วไปและโหมดคีออสก์",
          en: "One Tonbab app for everyday staff and kiosk mode.",
        },
      },
      {
        title: { th: "อนุมัติระหว่างเดินทาง", en: "Approve on the go" },
        body: {
          th: "ใบขอซื้อ ใบลา และ OT อนุมัติจากมือถือ พร้อมอีเมลแจ้งเตือน",
          en: "Purchase requests, leave and OT approved from a phone, with email alerts.",
        },
      },
      {
        title: { th: "เซลส์ภาคสนาม", en: "Field sales" },
        body: {
          th: "แผนเยี่ยมลูกค้า เช็คอินด้วยรูปและ GPS จากมือถือ",
          en: "Visit plans and check-ins with photo and GPS from a phone.",
        },
      },
    ],
    plan: { th: "ทุกแพ็กเกจ", en: "Every plan." },
    faq: [
      {
        q: { th: "ต้องดาวน์โหลดแอปไหม?", en: "Do I have to download an app?" },
        a: {
          th: "ไม่จำเป็น ใช้ผ่านเบราว์เซอร์หรือติดตั้งเป็น PWA ได้ แอป iOS/Android มีไว้สำหรับคนที่ต้องการโหมดคีออสก์หรือแอปแบบเนทีฟ",
          en: "No. Use the browser or install the PWA; the iOS/Android app is there for kiosk mode or a native app.",
        },
      },
    ],
    related: ["kiosk", "pos", "security"],
    modules: ["operation", "people", "crm"],
  },
  {
    key: "security",
    module: "operation",
    keyword: { th: "ความปลอดภัยข้อมูล ERP", en: "ERP data security" },
    seoTitle: {
      th: "ความปลอดภัยข้อมูล: แยกข้อมูลรายบริษัท สิทธิ์ระดับฟิลด์ SSO | Tonbab",
      en: "Security: Row-Level Tenant Isolation, Field Permissions, SSO | Tonbab",
    },
    metaDescription: {
      th: "ความปลอดภัยที่บังคับในฐานข้อมูล: Row-Level Security แยกข้อมูลทุกบริษัท บทบาทและสิทธิ์ สิทธิ์ข้อมูลอ่อนไหวอย่างเงินเดือนและบัตรประชาชน SSO และประวัติการแก้ไข",
      en: "Security enforced in the database: row-level tenant isolation on every table, roles and permissions, field-level tiers for salary and ID data, SSO and an edit history.",
    },
    eyebrow: { th: "แพลตฟอร์ม · ความปลอดภัย", en: "Platform · Security" },
    h1: {
      th: "ข้อมูลของคุณ เห็นได้เฉพาะคนที่ควรเห็น",
      en: "Your data, seen only by the people who should see it",
    },
    lede: {
      th: "ความปลอดภัยถูกบังคับที่ฐานข้อมูล ไม่ใช่แค่ซ่อนปุ่มในหน้าจอ",
      en: "Security is enforced in the database, not just by hiding buttons.",
    },
    answer: {
      th: "Tonbab แยกข้อมูลแต่ละบริษัทด้วย Row-Level Security ที่ระดับฐานข้อมูลในทุกตาราง กำหนดบทบาทและสิทธิ์ได้ ข้อมูลอ่อนไหวอย่างเงินเดือน บัตรประชาชน และบัญชีธนาคารมีสิทธิ์แยกชั้น รองรับ SSO ด้วยบัญชี Microsoft ขององค์กร และบันทึกประวัติว่าใครแก้อะไร เมื่อไร",
      en: "Tonbab isolates every company's data with database-level row-level security on every table. Roles and permissions are configurable, sensitive fields such as salary, ID card and bank details have their own permission tiers, organisation Microsoft accounts can sign in with SSO, and edits are recorded with who, what and when.",
    },
    visual: "security",
    highlights: [
      {
        title: { th: "แยกข้อมูลรายบริษัท", en: "Tenant isolation" },
        body: {
          th: "ทุกตารางบังคับแยกข้อมูลแต่ละบริษัทด้วย Row-Level Security",
          en: "Every table enforces per-company isolation with row-level security.",
        },
      },
      {
        title: { th: "บทบาทและสิทธิ์", en: "Roles and permissions" },
        body: {
          th: "กำหนดว่าใครเห็นหรือแก้อะไรได้ตามบทบาท (Standard ขึ้นไป)",
          en: "Decide who can see or change what, by role (Standard and up).",
        },
      },
      {
        title: { th: "สิทธิ์ระดับฟิลด์", en: "Field-level tiers" },
        body: {
          th: "เงินเดือน บัตรประชาชน บัญชีธนาคาร เห็นเฉพาะผู้ได้รับสิทธิ์",
          en: "Salary, ID card and bank details visible only to permitted roles.",
        },
      },
      {
        title: { th: "SSO บัญชีองค์กร", en: "Organisation SSO" },
        body: {
          th: "เข้าระบบด้วยบัญชี Microsoft ขององค์กร (Business ขึ้นไป)",
          en: "Sign in with your organisation's Microsoft account (Business and up).",
        },
      },
      {
        title: { th: "ประวัติการแก้ไข", en: "Edit history" },
        body: {
          th: "เอกสารสำคัญบันทึกว่าใครทำอะไร เมื่อไร และแก้อะไรไป",
          en: "Key documents record who did what, when and what changed.",
        },
      },
      {
        title: {
          th: "หลายบริษัทในบัญชีเดียว",
          en: "Several companies, one login",
        },
        body: {
          th: "สลับบริษัทในคลิกเดียว ข้อมูลแยกกันเด็ดขาด (เต็มรูปแบบใน Enterprise)",
          en: "Switch company in one click with strict separation (full multi-company on Enterprise).",
        },
      },
    ],
    plan: {
      th: "การแยกข้อมูลรายบริษัทใช้กับทุกแพ็กเกจ",
      en: "Tenant isolation applies to every plan.",
    },
    faq: [
      {
        q: { th: "ข้อมูลเก็บที่ไหน?", en: "Where is data stored?" },
        a: {
          th: "บนโครงสร้างคลาวด์ที่เข้ารหัสข้อมูลขณะจัดเก็บ ติดต่อทีมขายเพื่อขอรายละเอียดด้านความปลอดภัยเพิ่มเติม",
          en: "On managed cloud infrastructure with encryption at rest. Ask our sales team for a detailed security overview.",
        },
      },
    ],
    related: ["payroll", "mobile", "thai-tax"],
    modules: ["operation", "people"],
  },
];

/**
 * Requested /features/* URLs that already have a canonical home elsewhere —
 * 301 there instead of publishing duplicate content.
 */
export const FEATURE_REDIRECTS: Record<string, string> = {
  accounting: "/modules/accounting",
  crm: "/modules/crm",
  "api-mcp": "/developers",
  api: "/developers",
  mcp: "/developers",
  "field-sales": "/modules/crm",
};

export function getFeature(key: string): FeatureContent | undefined {
  return features.find((f) => f.key === key);
}
