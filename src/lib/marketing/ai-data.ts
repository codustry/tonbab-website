/**
 * /[locale]/ai content, plus the AI block on the home page. The page, its
 * Markdown twin (/md/<locale>/ai, llms-full.txt) and the FAQPage JSON-LD all
 * read from here, so they can never disagree.
 *
 * HONESTY RULES (CLAUDE.md). Every claim was checked on 2026-11-19 against the
 * app repo (codustry/workflow, origin/main) or the assistant's own docs:
 *
 *  Built-in AI = "Tonbab AI" (the main story). Owner, 2026-11-19: customer-facing
 *  copy never names the AI vendor — call it Tonbab AI. Never claim Tonbab built
 *  or trained its own model. Internally it
 *   - runs on Cloudflare Workers AI (same platform that hosts the app): $lib/server/ai/run.ts is the only code that
 *     calls the AI binding (unit test enforces it); models in
 *     $lib/shared/ai/models.ts. Optional AI Gateway with cache + logging OFF
 *     (skipCache, collectLog: false). Cloudflare: Workers AI keeps no customer
 *     content and doesn't train on it (developers.cloudflare.com/workers-ai/
 *     platform/data-usage/). No data-residency claim — there is no Thailand-only
 *     option.
 *   - weighted credits from one table ($lib/shared/ai/features.ts): receipt
 *     capture 1, AI Count 1 (2 when tiled). Refund on failure. Plan credits in
 *     plans.ts / PLAN_FACTS.
 *   - receipt capture: PR #1517 (/api/receipt-capture, ReceiptCapture.svelte,
 *     $lib/shared/ai/receipt-capture.ts): photo or PDF; Buddhist-era dates,
 *     tax-ID check digit, subtotal + VAT = total; input VAT only from a full tax
 *     invoice; vendor matched by tax ID then name; unsure fields highlighted;
 *     always a draft. My expenses (expense.self) and new vendor bill
 *     (accounting.post).
 *   - AI mark: AiBadge / AiCostNote on every AI feature (PR #1499).
 *   - Coming soon = docs/CLOUDFLARE-AI-PLAN.md (AI-5 slips, AI-6 Docs Q&A, AI-7
 *     chat assist, AI-9 nameplate OCR) and the schedule Gantt branch. No dates.
 *
 *  Your own assistant (secondary)
 *   - MCP: src/routes/mcp, $lib/server/api/mcp.ts (Streamable HTTP), OAuth 2.1
 *     with Client ID Metadata Documents + Dynamic Client Registration, PKCE
 *     ($lib/server/api/oauth.ts), or a company API key as a Bearer header.
 *   - Tools = the operation registry (ops-read.ts / ops-read-more.ts /
 *     ops-write.ts / ops-phase1.ts / ops-phase2.ts / ops-sales.ts /
 *     ops-migration.ts): 107 tools = 70 reads + 21 writes + 16 migration
 *     writes (checked 2026-11-21 after codustry/tonbab#1588 + #1589). Writes
 *     create drafts (PR, stock count, expense claim, quotation, stock
 *     adjustment, stock transfer, delivery note), requests a person approves
 *     (leave), CRM records / updates within the person's CRM scope (company,
 *     deal, activity, lead, work update, deal stage move, close won/lost), or
 *     master data (create/edit product + product photo, create/edit
 *     warehouse; plan limits enforced). Nothing is approved, posted or paid. Every write takes client_request_id (24 h retry key, same store as
 *     REST Idempotency-Key). Scopes re-checked against the person's role
 *     every call. API keys act as their
 *     creator with live permissions (#1524); CRM rows follow the reporting tree;
 *     tenant-guard.ts refuses any query not filtered to the caller's company.
 *   - Multi-company (#1530): the consent screen has a default company plus
 *     "Also allow these companies" (each ticked). Every tool takes `company`;
 *     each call re-checks membership + role in THAT company. Summary tools
 *     (sales_summary, ar_aging, ap_aging, profit_and_loss, stock_valuation)
 *     accept company "all" and answer per-company sections, never summed.
 *     API keys stay single-company. Payroll/salary/commission never exposed.
 *   - MCP never spends AI credits (mcp.ts has no credit call); it shares the
 *     plan's API quota (plans.ts API_LIMITS). Free is read-only.
 *   - Clients: Claude (support.claude.com custom connectors), Claude Code
 *     (code.claude.com/docs/en/mcp), ChatGPT developer mode / custom apps
 *     (OAuth only; Business/Enterprise/Edu), Gemini CLI (httpUrl + OAuth
 *     discovery). Left out: the Gemini app (custom apps limited to Spark tasks,
 *     OAuth problems reported) and Grok (auth for custom connectors not
 *     documented).
 */
import type { Bi } from "./compare-data";

export const MCP_URL = "https://api.tonbab.com/mcp";

export type AiState = "live" | "soon";

export interface BuiltInAi {
  key: string;
  title: Bi;
  body: Bi;
  /** Credits one use takes, as the app's weight table says. */
  credits: Bi;
  where: Bi;
  href?: string;
}

/** Live today. */
export const builtInLive: BuiltInAi[] = [
  {
    key: "receipt",
    title: { th: "สแกนใบเสร็จและใบกำกับภาษี", en: "Receipt and tax-invoice scan" },
    body: {
      th: "ถ่ายรูปหรืออัปโหลด PDF แล้ว AI กรอกผู้ขาย เลขผู้เสียภาษี เลขที่เอกสาร วันที่ ยอดก่อน VAT, VAT และยอดรวมให้ ระบบตรวจเลขผู้เสียภาษีและยอดรวมเอง ช่องที่ไม่แน่ใจจะไฮไลต์ให้ตรวจ แล้วคุณกดส่งเอง",
      en: "Take a photo or upload a PDF and AI fills in the vendor, tax ID, document number, date, subtotal, VAT and total. Tonbab checks the tax ID and the totals itself, highlights anything it isn't sure of, and you submit.",
    },
    credits: { th: "1 เครดิตต่อใบ", en: "1 credit per document" },
    where: {
      th: "เบิกค่าใช้จ่ายของฉัน (People) · บันทึกบิลซื้อ (บัญชี)",
      en: "My expenses (People) · new vendor bill (Accounting)",
    },
    href: "/features/ai-receipt-scan",
  },
  {
    key: "count",
    title: { th: "นับของจากรูปถ่าย (AI Count)", en: "Count stock from a photo (AI Count)" },
    body: {
      th: "ในสถานีแพ็ก ถ่ายรูปกองท่อ กล่อง หรือขวด AI จุดบนทุกชิ้นที่เห็น พนักงานแตะแก้ แล้วเก็บจำนวนพร้อมรูปหลักฐาน ไม่ปรับสต็อกเอง",
      en: "In the pack station, photograph a pile of pipes, boxes or bottles. AI puts a dot on every item it sees, staff tap to correct, and the count is saved with a proof photo. It never changes stock by itself.",
    },
    credits: { th: "1–2 เครดิตต่อรูป", en: "1–2 credits per photo" },
    where: { th: "สถานีแพ็ก (คีออสก์คลังสินค้า)", en: "Pack station (warehouse kiosk)" },
    href: "/features/ai-count",
  },
];

/** In progress — shown as "coming soon" only, never with a date. */
export const builtInSoon: { key: string; title: Bi; body: Bi; module: Bi }[] = [
  {
    key: "gantt",
    module: { th: "Operation", en: "Operation" },
    title: { th: "แผนการผลิตแบบ Gantt พร้อม “✦ AI อธิบายแผน”", en: "Production schedule (Gantt) with “✦ AI explain the plan”" },
    body: {
      th: "ดูใบสั่งผลิตบนไทม์ไลน์ แล้วให้ AI สรุปเป็นภาษาคนว่าแผนนี้ติดตรงไหน",
      en: "See work orders on a timeline and let AI explain in plain words where the plan is stuck.",
    },
  },
  {
    key: "docs",
    module: { th: "Docs", en: "Docs" },
    title: { th: "ถาม-ตอบจากเอกสารบริษัท", en: "Q&A over your company docs" },
    body: {
      th: "ถามเช่น “คืนของให้ซัพพลายเออร์ทำยังไง” แล้วได้คำตอบพร้อมลิงก์ไปหน้า SOP ของบริษัทเอง เฉพาะหน้าที่คุณเปิดได้",
      en: "Ask “how do we return goods to a supplier?” and get an answer linked to your own SOP pages — only pages you can open.",
    },
  },
  {
    key: "chat",
    module: { th: "Commerce", en: "Commerce" },
    title: { th: "ร่างคำตอบในกล่องแชท", en: "Reply drafts in the chat inbox" },
    body: {
      th: "แนะนำคำตอบภาษาไทยจากออเดอร์และสต็อกจริง พนักงานแก้และกดส่งเอง ไม่ส่งอัตโนมัติ",
      en: "Suggested Thai replies based on the real order and stock. Staff edit and send — nothing is sent automatically.",
    },
  },
  {
    key: "slip",
    module: { th: "Commerce · บัญชี", en: "Commerce · Accounting" },
    title: { th: "อ่านสลิปโอนเงิน", en: "Payment-slip reading" },
    body: {
      th: "อ่านยอด เวลา และธนาคารจากสลิปที่ลูกค้าส่งมา AI ไม่เปลี่ยนสถานะเป็นจ่ายแล้วเอง",
      en: "Read the amount, time and bank from slips customers send. AI never marks anything paid by itself.",
    },
  },
  {
    key: "nameplate",
    module: { th: "Service · Operation", en: "Service · Operation" },
    title: { th: "อ่านป้ายรุ่นและหมายเลขซีเรียล", en: "Nameplate and serial reading" },
    body: {
      th: "ถ่ายรูปป้ายเครื่อง แล้วกรอกยี่ห้อ รุ่น และซีเรียลให้ พร้อมไฮไลต์ช่องที่ต้องตรวจ",
      en: "Photograph a machine's nameplate and the brand, model and serial are filled in, with fields to check highlighted.",
    },
  },
];

/** Privacy & safety — each line maps to code or the AI platform's own data-usage docs (see header). */
export const aiSafety: { key: string; title: Bi; body: Bi }[] = [
  {
    key: "infrastructure",
    title: { th: "ประมวลผลบนโครงสร้างพื้นฐานของเรา", en: "Processed on our infrastructure" },
    body: {
      th: "Tonbab AI ประมวลผลบนแพลตฟอร์มคลาวด์เดียวกับที่ระบบ Tonbab ทำงานอยู่ ไม่ส่งเอกสารของคุณไป ChatGPT, Claude, Gemini หรือแอป AI อื่น และไม่ต้องมีบัญชีกับบริการเหล่านั้น",
      en: "Tonbab AI runs on the same cloud platform that runs Tonbab. Your documents aren't sent to ChatGPT, Claude, Gemini or any other AI app, and no account with them is needed.",
    },
  },
  {
    key: "logging",
    title: { th: "ปิดการเก็บ log", en: "Logging off" },
    body: {
      th: "Tonbab AI ไม่เก็บ log และไม่แคชคำขอ เงื่อนไขของแพลตฟอร์มที่ใช้ประมวลผลระบุว่าไม่เก็บข้อมูลของลูกค้าหลังตอบคำขอ และไม่นำไปเทรนโมเดล ประวัติการใช้งานเก็บแค่ผลที่ได้ ไม่เก็บข้อความในเอกสาร",
      en: "Tonbab AI keeps no prompt logs and no cache, and the platform it runs on doesn't keep customer content after answering or use it to train models. The usage log records the outcome, not the document text.",
    },
  },
  {
    key: "tenant",
    title: { th: "แยกข้อมูลแต่ละบริษัท", en: "Each company kept apart" },
    body: {
      th: "ทุกการเรียก AI ผูกกับบริษัทของคุณ ผลลัพธ์ลงได้เฉพาะในข้อมูลของบริษัทนั้น ซึ่งฐานข้อมูลแยกแต่ละบริษัทออกจากกัน",
      en: "Every AI call is tied to your company, and results land only in that company's records, which the database keeps separate from every other company.",
    },
  },
  {
    key: "permissions",
    title: { th: "ทำได้ไม่เกินสิทธิ์ของคุณ", en: "Your permissions apply" },
    body: {
      th: "ปุ่ม AI แสดงเฉพาะคนที่มีสิทธิ์ทำงานนั้นอยู่แล้ว และผู้ช่วย AI ที่เชื่อมเองก็เห็นได้แค่ที่บทบาทของคุณเห็น",
      en: "An AI button only appears for people already allowed to do that job, and an assistant you connect sees only what your role can see.",
    },
  },
  {
    key: "drafts",
    title: { th: "เป็นฉบับร่างเสมอ", en: "Drafts, never auto-posted" },
    body: {
      th: "ใบเสร็จที่สแกนกลายเป็นฉบับร่างให้คุณตรวจก่อนส่ง AI Count ไม่ปรับสต็อก และไม่มี AI ตัวไหนอนุมัติ ลงบัญชี หรือจ่ายเงินแทนคน",
      en: "A scanned receipt becomes a draft you check before submitting, AI Count never changes stock, and no AI approves, posts or pays anything for you.",
    },
  },
  {
    key: "refund",
    title: { th: "ไม่สำเร็จ คืนเครดิต", en: "Failed? Credits back" },
    body: {
      th: "ถ้า AI อ่านไม่ออกหรือนับไม่สำเร็จ ระบบคืนเครดิตให้อัตโนมัติ เครดิตหมดก็ยังกรอกเองได้ตามปกติ",
      en: "If AI can't read a document or finish a count, the credits are given back automatically. Out of credits? You can still fill the form by hand.",
    },
  },
];

/** Real counts from the registry (see header): 70 reads + 21 writes + 16 migration writes = 107. */
export const MCP_TOOL_TOTAL = 107;
export const MCP_READ_TOTAL = 70;
/** Everyday writes: drafts, requests a person approves, CRM records and updates. */
export const MCP_WRITE_TOTAL = 21;
/** Writes that move history from the previous system, inside a migration job a person opens. */
export const MCP_MIGRATION_TOTAL = 16;

/**
 * What a connected assistant can reach, by area. `tools` = registry ops in
 * that area (the areas add up to MCP_TOOL_TOTAL). `writes` = what it can create
 * or change there.
 */
export const mcpCoverage: { key: string; area: Bi; reads: Bi; tools: number; writes?: Bi }[] = [
  {
    key: "accounting",
    area: { th: "บัญชี", en: "Accounting" },
    reads: {
      th: "สรุปยอดขาย ลูกหนี้และเจ้าหนี้ค้างชำระตามอายุ กำไรขาดทุน งบทดลอง บัญชีแยกประเภท ใบแจ้งหนี้ บิลซื้อ ใบเสนอราคา รับ-จ่ายเงิน ผังบัญชี บัญชีธนาคาร (แสดงเลข 4 ตัวท้าย) สินทรัพย์ถาวร รหัส VAT และอัตราภาษีหัก ณ ที่จ่ายที่ใช้บ่อย",
      en: "Sales summary, receivables and payables aging, profit and loss, trial balance, general ledger, invoices, bills, quotations, receipts and payments, chart of accounts, bank accounts (last 4 digits only), fixed assets, VAT codes and the usual withholding-tax rates",
    },
    writes: { th: "ฉบับร่างใบเสนอราคา", en: "Draft quotation" },
    tools: 16,
  },
  {
    key: "stock",
    area: { th: "สินค้าและสต็อก", en: "Products and stock" },
    reads: {
      th: "สินค้า หน่วยนับ ยอดคงเหลือ คลัง ความเคลื่อนไหว ใบปรับยอดและใบโอนย้าย ล็อต ซีเรียล มูลค่าสต็อก (เฉพาะคนที่เห็นต้นทุน)",
      en: "Products, units of measure, stock levels, warehouses, movements, stock adjustments and transfers, lots, serials, stock valuation (only for people who can see costs)",
    },
    writes: {
      th: "เพิ่มและแก้ไขสินค้า (พร้อมรูปสินค้า) และคลัง ฉบับร่างใบตรวจนับ ใบปรับยอด และใบโอนย้ายสต็อก (คนกดบันทึกเอง)",
      en: "Add and edit products (with a product photo) and warehouses; draft stock counts, stock adjustments and stock transfers (a person posts them)",
    },
    tools: 19,
  },
  {
    key: "procurement",
    area: { th: "จัดซื้อ", en: "Purchasing" },
    reads: { th: "ใบขอซื้อ ใบสั่งซื้อ ใบรับสินค้า", en: "Purchase requests, purchase orders, goods receipts" },
    writes: { th: "ฉบับร่างใบขอซื้อ", en: "Draft purchase request" },
    tools: 7,
  },
  {
    key: "sales",
    area: { th: "งานขาย", en: "Sales" },
    reads: { th: "ออเดอร์และใบส่งของ", en: "Sales orders and delivery notes" },
    writes: { th: "สร้างและแก้ไขฉบับร่างใบส่งของ (คนออกเอกสารเอง)", en: "Create and edit delivery note drafts (a person issues them)" },
    tools: 6,
  },
  {
    key: "crm",
    area: { th: "ลูกค้า ผู้ขาย และ CRM", en: "Customers, vendors and CRM" },
    reads: {
      th: "บริษัทคู่ค้า ผู้ติดต่อ ลีด ดีล ไปป์ไลน์และขั้นตอนการขาย กิจกรรม และรายงานไปป์ไลน์ ทั้งมูลค่าดีลที่เปิดอยู่ ยอดคาดการณ์ อัตราปิดการขาย และเหตุผลที่แพ้ดีล (ดีลและลีดเห็นตามสายงานเหมือนในแอป)",
      en: "Companies, contacts, leads, deals, pipelines and stages, activities, and the pipeline report: open value, forecast, win rate and lost reasons (deals and leads follow your reporting line, like the app)",
    },
    writes: {
      th: "ลูกค้า/ผู้ขาย ลีด ดีล กิจกรรม อัปเดตงาน ย้ายขั้นตอนหรือปิดดีลที่คุณดูแลเป็นได้หรือแพ้",
      en: "Customer/vendor, lead, deal, activity, work update; move a deal you're responsible for to another stage, or close it won or lost",
    },
    tools: 16,
  },
  {
    key: "people",
    area: { th: "บุคลากร", en: "People" },
    reads: {
      th: "รายชื่อพนักงาน (ข้อมูลติดต่อเท่านั้น) วันลาคงเหลือของฉัน ใบลา ใบเบิกค่าใช้จ่าย ไม่มีเงินเดือนหรือเลขบัตรประชาชน",
      en: "Employee directory (contact details only), my leave balance, leave requests, expense claims. Never salary or ID numbers",
    },
    writes: {
      th: "ใบลาของตัวเอง (ผู้อนุมัติเป็นคนตัดสิน) และฉบับร่างใบเบิกค่าใช้จ่ายของตัวเอง",
      en: "Your own leave request (your approver decides) and your own expense claim draft",
    },
    tools: 7,
  },
  {
    key: "make-service",
    area: { th: "การผลิตและงานบริการ", en: "Manufacturing and service" },
    reads: {
      th: "ใบสั่งผลิต Job Control พร้อมงบและต้นทุน (ต้นทุนเฉพาะคนที่เห็นต้นทุน) สูตรการผลิต (BOM) งานซ่อมบริการ และตารางงานช่าง",
      en: "Work orders, job controls with budget and cost (cost only for people who can see costs), bills of materials, service jobs and the technician schedule",
    },
    tools: 9,
  },
  {
    key: "docs",
    area: { th: "Docs", en: "Docs" },
    reads: { th: "ค้นหน้าเอกสาร อ่านหน้า และแถวในฐานข้อมูล", en: "Search pages, read a page, database rows" },
    tools: 3,
  },
  {
    key: "account",
    area: { th: "งานรออนุมัติ คุณ และบริษัท", en: "Approvals, you and your companies" },
    reads: {
      th: "งานที่รอคุณอนุมัติ (ใบขอซื้อ ใบเบิกค่าใช้จ่าย ใบลา โอที และอื่น ๆ) รอนานสุดกี่วันพร้อมลิงก์ไปตัดสินใจใน Tonbab ฉันเป็นใคร บริษัทที่เชื่อมไว้และบทบาทในแต่ละบริษัท สมาชิกในบริษัท (ให้ผู้ช่วยเรียกชื่อคนได้ถูก) เหตุการณ์ล่าสุด",
      en: "What's waiting for your approval (purchase requests, expense claims, leave, overtime and more), how long the oldest has waited and a link to decide it in Tonbab; who am I, the companies connected and your role in each, company members (so the assistant can name people), recent events",
    },
    tools: 5,
  },
  {
    key: "migration",
    area: { th: "ย้ายข้อมูลจากระบบเดิม", en: "Moving from your previous system" },
    reads: {
      th: "ผู้ติดต่อ สินค้า บัญชีธนาคาร ยอดยกมา บัญชีแยกประเภท เอกสาร รับ-จ่ายเงิน ภาษีหัก ณ ที่จ่าย สินทรัพย์ถาวร และประวัติการซื้อ ทำภายในงานย้ายข้อมูลที่คนเปิดไว้ มีการทดลองนำเข้า ดูก่อนย้อนกลับ และกระทบยอดก่อนมีคนอนุมัติ",
      en: "Contacts, products, bank accounts, opening balances, the ledger, documents, payments, withholding tax, fixed assets and purchase history, inside a migration job a person opens, with dry runs, a rollback preview and a reconciliation before anyone signs off",
    },
    tools: 19,
  },
];

export interface ExamplePrompt {
  prompt: Bi;
  /** MCP tools (operation registry) the assistant calls. */
  tools: string[];
  draft?: boolean;
  /** Uses company: "all" — one answer section per company, never summed. */
  multiCompany?: boolean;
}

/** Each prompt is answerable with operations in ops-read.ts / ops-read-more.ts / ops-write.ts. */
export const examplePrompts: ExamplePrompt[] = [
  {
    prompt: { th: "สรุปยอดขายเดือนนี้ตามลูกค้า", en: "Summarize this month's sales by customer" },
    tools: ["sales_summary"],
  },
  {
    prompt: { th: "ลูกค้าคนไหนค้างจ่ายเกิน 30 วัน", en: "Which customers are more than 30 days overdue?" },
    tools: ["ar_aging"],
  },
  {
    prompt: { th: "กำไรขาดทุนเดือนนี้", en: "What's our profit and loss this month?" },
    tools: ["profit_and_loss"],
  },
  {
    prompt: { th: "ใบลาของฉันเหลือกี่วัน", en: "How many leave days do I have left?" },
    tools: ["my_leave_balance"],
  },
  {
    prompt: {
      th: "ยอดขายเดือนนี้ของทุกบริษัทที่ฉันดูแล แยกให้ดูทีละบริษัท",
      en: "This month's sales for each of my companies, one by one",
    },
    tools: ["list_my_companies", "sales_summary"],
    multiCompany: true,
  },
  {
    prompt: { th: "PO ไหนค้างรับของบ้าง", en: "Which POs are still waiting for delivery?" },
    tools: ["list_purchase_orders", "get_purchase_order"],
  },
  {
    prompt: { th: "สกรู M6 เหลือคลังไหนเท่าไหร่", en: "How many M6 screws are left in each warehouse?" },
    tools: ["get_stock_levels"],
  },
  {
    prompt: { th: "สร้างใบขอซื้อสกรู M6 500 ตัว", en: "Create a purchase request for 500 M6 screws" },
    tools: ["list_products", "create_purchase_request_draft"],
    draft: true,
  },
  {
    prompt: { th: "ร่างใบโอนสกรู M6 200 ตัวจากโรงงานไปหน้าร้าน", en: "Draft a transfer of 200 M6 screws from the factory to the shop" },
    tools: ["list_warehouses", "list_products", "create_stock_transfer_draft"],
    draft: true,
  },
  {
    prompt: { th: "SOP การคืนของให้ซัพพลายเออร์เขียนไว้ว่าอะไร", en: "What does our SOP say about returning goods to a supplier?" },
    tools: ["search_docs", "get_doc"],
  },
  {
    prompt: { th: "มีอะไรรอฉันอนุมัติบ้าง", en: "What's waiting for my approval?" },
    tools: ["list_my_approvals"],
  },
  {
    prompt: { th: "ไปป์ไลน์เดือนนี้เป็นยังไง อัตราปิดการขายเท่าไหร่", en: "How does our pipeline look, and what's our win rate?" },
    tools: ["crm_pipeline_report"],
  },
  {
    prompt: { th: "เปิดใบเบิกค่าแท็กซี่ไปหาลูกค้าเมื่อวาน 450 บาท", en: "Start an expense claim for yesterday's 450-baht taxi to a customer" },
    tools: ["create_expense_claim_draft"],
    draft: true,
  },
];

export interface AssistantGuide {
  key: "claude" | "chatgpt" | "gemini" | "claude-code";
  name: string;
  where: Bi;
  steps: Bi[];
  code?: string;
  note: Bi;
  doc: string;
}

/** Only clients that can really connect to Tonbab's MCP (see header). */
export const assistants: AssistantGuide[] = [
  {
    key: "claude",
    name: "Claude",
    where: { th: "claude.ai · แอปเดสก์ท็อป · มือถือ", en: "claude.ai · desktop app · mobile" },
    steps: [
      {
        th: "ใน Claude เปิด Settings › Connectors (บางเวอร์ชันอยู่ใต้ Customize) แล้วกด Add custom connector",
        en: "In Claude, open Settings › Connectors (under Customize in some versions) and choose Add custom connector.",
      },
      { th: "ตั้งชื่อ Tonbab แล้ววาง URL ด้านล่าง", en: "Name it Tonbab and paste the URL below." },
      {
        th: "กด Connect เข้าสู่ระบบ Tonbab เลือกบริษัทหลัก ติ๊กบริษัทอื่นที่ให้ใช้ได้ (ถ้ามี) เลือกสิทธิ์ แล้วกดอนุญาต",
        en: "Click Connect, sign in to Tonbab, pick your default company, tick any other companies it may use, choose permissions, then allow.",
      },
    ],
    code: MCP_URL,
    note: {
      th: "แพ็กเกจ Team/Enterprise ของ Claude ให้เจ้าของบัญชีองค์กรเพิ่มตัวเชื่อมก่อน แพ็กเกจฟรีของ Claude เพิ่มตัวเชื่อมแบบกำหนดเองได้ 1 ตัว ตัวเชื่อมที่เพิ่มบนเว็บใช้ในแอปมือถือได้ด้วย",
      en: "On Claude Team or Enterprise an organization owner adds the connector first. Claude's free plan allows one custom connector. A connector added on the web also works in the mobile apps.",
    },
    doc: "https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp",
  },
  {
    key: "chatgpt",
    name: "ChatGPT",
    where: { th: "chatgpt.com (เว็บ)", en: "chatgpt.com (web)" },
    steps: [
      {
        th: "ผู้ดูแล workspace เปิด Developer mode / การสร้างตัวเชื่อม MCP แบบกำหนดเอง",
        en: "A workspace admin turns on Developer mode / custom MCP connectors.",
      },
      {
        th: "ใน ChatGPT ไปที่ Settings › Apps (Connectors) › Create แล้ววาง URL ด้านล่าง เลือกเข้าสู่ระบบแบบ OAuth",
        en: "In ChatGPT go to Settings › Apps (Connectors) › Create, paste the URL below and choose OAuth sign-in.",
      },
      {
        th: "เข้าสู่ระบบ Tonbab เลือกบริษัทหลัก ติ๊กบริษัทอื่นที่ให้ใช้ได้ (ถ้ามี) เลือกสิทธิ์ แล้วกดอนุญาต",
        en: "Sign in to Tonbab, pick your default company, tick any other companies it may use, choose permissions, then allow.",
      },
    ],
    code: MCP_URL,
    note: {
      th: "ตามเอกสารของ OpenAI ตอนนี้เปิดให้ workspace แบบ Business, Enterprise และ Edu เชื่อมได้ด้วย OAuth เท่านั้น (ใช้ API key ไม่ได้) และ ChatGPT อาจถามยืนยันก่อนสร้างฉบับร่าง",
      en: "Per OpenAI's docs this is available to Business, Enterprise and Edu workspaces today, OAuth only (API keys don't work here), and ChatGPT may ask you to confirm before it creates a draft.",
    },
    doc: "https://help.openai.com/en/articles/12584461",
  },
  {
    key: "gemini",
    name: "Gemini CLI",
    where: { th: "เทอร์มินัล (สำหรับนักพัฒนา)", en: "Terminal (for developers)" },
    steps: [
      { th: "เพิ่ม Tonbab ในไฟล์ ~/.gemini/settings.json ตามตัวอย่างด้านล่าง", en: "Add Tonbab to ~/.gemini/settings.json as below." },
      {
        th: "เปิด gemini แล้วพิมพ์ /mcp auth tonbab เพื่อเข้าสู่ระบบ Tonbab ในเบราว์เซอร์",
        en: "Start gemini and run /mcp auth tonbab to sign in to Tonbab in your browser.",
      },
      { th: "เลือกบริษัทหลัก ติ๊กบริษัทอื่นที่ให้ใช้ได้ (ถ้ามี) เลือกสิทธิ์ แล้วกดอนุญาต", en: "Pick your default company, tick any other companies it may use, choose permissions, then allow." },
    ],
    code: `{\n  "mcpServers": {\n    "tonbab": { "httpUrl": "${MCP_URL}" }\n  }\n}`,
    note: {
      th: "ใช้ httpUrl (ไม่ใช่ url) Gemini CLI ค้นหาการเข้าสู่ระบบ OAuth ของ Tonbab ให้เอง ส่วนแอป Gemini บนเว็บและมือถือยังเพิ่มตัวเชื่อมเองแบบนี้ไม่ได้ทั่วไป เราจึงไม่ได้ระบุไว้",
      en: "Use httpUrl (not url); Gemini CLI discovers Tonbab's OAuth sign-in by itself. The Gemini web and mobile app doesn't generally let you add your own connector like this yet, so we don't list it.",
    },
    doc: "https://geminicli.com/docs/tools/mcp-server/",
  },
  {
    key: "claude-code",
    name: "Claude Code",
    where: { th: "เทอร์มินัล (สำหรับนักพัฒนา)", en: "Terminal (for developers)" },
    steps: [
      { th: "รันคำสั่งด้านล่างครั้งเดียว", en: "Run the command below once." },
      { th: "ใน Claude Code พิมพ์ /mcp แล้วเลือก tonbab เพื่อเข้าสู่ระบบ", en: "In Claude Code, run /mcp and pick tonbab to sign in." },
      { th: "เลือกบริษัทหลัก ติ๊กบริษัทอื่นที่ให้ใช้ได้ (ถ้ามี) เลือกสิทธิ์ แล้วกดอนุญาต", en: "Pick your default company, tick any other companies it may use, choose permissions, then allow." },
    ],
    code: `claude mcp add --transport http tonbab ${MCP_URL}`,
    note: {
      th: "สคริปต์ที่ทำงานเองใช้ API key ของบริษัทแทนได้ โดยส่งเป็น header Authorization: Bearer",
      en: "For unattended scripts you can use a company API key instead, sent as an Authorization: Bearer header.",
    },
    doc: "https://code.claude.com/docs/en/mcp",
  },
];

export const aiFaq: { q: Bi; a: Bi }[] = [
  {
    q: { th: "ต้องสมัคร ChatGPT, Claude หรือ Gemini เพิ่มไหม?", en: "Do I need a ChatGPT, Claude or Gemini subscription?" },
    a: {
      th: "ไม่ต้อง Tonbab AI อย่างสแกนใบเสร็จและ AI Count อยู่ในระบบแล้ว และรวมอยู่ในแพ็กเกจผ่านเครดิต AI รายเดือน การเชื่อมผู้ช่วย AI ของคุณเองเป็นทางเลือกเสริมเท่านั้น",
      en: "No. Tonbab AI, such as receipt scan and AI Count, is built in and included in your plan through monthly AI credits. Connecting your own assistant is optional.",
    },
  },
  {
    q: { th: "เครดิต AI คืออะไร หมดแล้วเป็นยังไง?", en: "What are AI credits, and what if they run out?" },
    a: {
      th: "ทุกแพ็กเกจได้เครดิต AI ทุกเดือน: Free 30, Starter 300, Standard 1,000, Business 3,000 และ Enterprise 10,000 งาน AI ส่วนใหญ่ใช้ 1 เครดิต งานที่หนักกว่าใช้มากกว่านั้น สแกนใบเสร็จใช้ 1 เครดิต AI Count ใช้ 1–2 เครดิตต่อรูป ปุ่ม AI บอกจำนวนเครดิตก่อนกด เครดิตหมดแล้วยังกรอกเองได้ตามปกติ และเริ่มนับใหม่ทุกเดือนตามเวลาประเทศไทย",
      en: "Every plan gets monthly AI credits: Free 30, Starter 300, Standard 1,000, Business 3,000 and Enterprise 10,000. Most AI actions use 1 credit and heavier ones more: a receipt scan is 1, AI Count is 1–2 per photo. The AI button shows the cost before you tap. If credits run out you can still fill things in by hand, and they reset every month on Bangkok time.",
    },
  },
  {
    q: { th: "เชื่อม Claude หรือ ChatGPT แล้วใช้เครดิต AI ของ Tonbab ไหม?", en: "Does connecting Claude or ChatGPT use Tonbab AI credits?" },
    a: {
      th: "ไม่ใช้ ผู้ช่วยคิดและตอบด้วยบัญชี AI ของคุณเอง ฝั่ง Tonbab นับแค่จำนวนครั้งที่เรียกข้อมูลตามโควตา API ของแพ็กเกจ (Free อ่านได้ 300 ครั้งต่อวัน Starter 3,000 ครั้ง) แพ็กเกจฟรีอ่านได้อย่างเดียว ส่วนการสร้างฉบับร่างและคำขอเริ่มที่ Starter",
      en: "No. The assistant thinks and answers on your own AI account. Tonbab only counts the data calls against your plan's API quota (Free reads 300 calls a day, Starter 3,000). Free is read-only; creating drafts and requests starts at Starter.",
    },
  },
  {
    q: { th: "Claude เห็นบริษัทไหนบ้าง?", en: "Which companies can Claude see?" },
    a: {
      th: "เฉพาะบริษัทที่คุณติ๊กตอนเชื่อมต่อ ทั้งบริษัทหลักและบริษัทอื่นที่เลือกเพิ่ม และในแต่ละบริษัทจะเห็นได้แค่ที่บทบาทของคุณในบริษัทนั้นเห็น เป็นแอดมินในบริษัทหนึ่งไม่ได้แปลว่าเป็นแอดมินในอีกบริษัท ทุกครั้งที่ถาม ระบบตรวจสิทธิ์ใหม่ในบริษัทนั้น ถ้าถามรวมทุกบริษัท คำตอบจะแยกเป็นทีละบริษัท ไม่รวมยอดข้ามบริษัท สิ่งที่สร้างยังเป็นฉบับร่างหรือคำขอให้คนอนุมัติเท่านั้น ใช้ได้เหมือนกันกับ ChatGPT และ Gemini CLI",
      en: "Only the companies you tick when you connect: your default company plus any others you choose. In each one it sees only what your role in that company can see — being an admin in one company gives nothing in another — and every call is re-checked there. Ask across all your companies and the answer comes back one company at a time, never added together. Anything it creates is still a draft or a request a person approves. The same applies to ChatGPT and Gemini CLI.",
    },
  },
  {
    q: { th: "AI แม่นแค่ไหน?", en: "How accurate is the AI?" },
    a: {
      th: "เราไม่อ้างตัวเลขความแม่นยำ เพราะทุกงานออกแบบให้คนตรวจ สแกนใบเสร็จตรวจเลขผู้เสียภาษีและยอดรวมให้ และไฮไลต์ช่องที่ไม่แน่ใจ AI Count แสดงทุกจุดให้แก้ก่อนเก็บ และทุกอย่างเป็นฉบับร่างจนกว่าคุณจะส่ง",
      en: "We don't quote an accuracy figure, because every feature is built for a person to check. Receipt scan checks the tax ID and totals and highlights fields it isn't sure of, AI Count shows every dot to correct before saving, and everything stays a draft until you submit it.",
    },
  },
  {
    q: { th: "AI อนุมัติ ลงบัญชี หรือจ่ายเงินแทนเราได้ไหม?", en: "Can AI approve, post or pay anything?" },
    a: {
      th: "ไม่ได้ AI ในตัวเตรียมฉบับร่างเท่านั้น ผู้ช่วยที่เชื่อมผ่าน MCP สร้างได้แค่ฉบับร่าง (ใบขอซื้อ ใบตรวจนับ ใบเบิกค่าใช้จ่าย ใบเสนอราคา ใบปรับยอดและใบโอนย้ายสต็อก ใบส่งของ) เพิ่มหรือแก้ไขสินค้าและคลัง ใบลาของตัวเองที่ผู้อนุมัติเป็นคนตัดสิน และงาน CRM ของคุณเอง (ลีด ดีล กิจกรรม อัปเดตงาน ย้ายขั้นตอนหรือปิดดีลที่คุณดูแล) ส่วนงานที่รอคุณอนุมัติ ผู้ช่วยแค่บอกว่ามีอะไรรออยู่ คนยังเป็นผู้ส่ง อนุมัติ ลงบัญชี และจ่ายเงินใน Tonbab ถ้าการเชื่อมต่อหลุดแล้วส่งซ้ำ ระบบบันทึกเพียงครั้งเดียว",
      en: "No. Built-in AI only prepares drafts. An assistant connected over MCP can only create drafts (purchase requests, stock counts, expense claims, quotations, stock adjustments and transfers, delivery notes), add or edit products and warehouses, leave requests for yourself that your approver decides, and your own CRM work (leads, deals, activities, work updates, moving or closing a deal you're responsible for). For approvals it only tells you what's waiting. People still submit, approve, post and pay in Tonbab, and if a connection drops and a request is sent twice, it is saved once.",
    },
  },
  {
    q: { th: "ข้อมูลของเราถูกนำไปฝึก AI ไหม?", en: "Is our data used to train AI?" },
    a: {
      th: "Tonbab AI ไม่นำข้อมูลไปเทรนโมเดล แพลตฟอร์มที่ใช้ประมวลผลไม่เก็บข้อมูลของลูกค้าหลังตอบคำขอ และเราปิดการเก็บ log ไว้ ถ้าเชื่อมผู้ช่วยของคุณเอง ข้อมูลที่ผู้ช่วยดึงไปจะอยู่ภายใต้เงื่อนไขของผู้ให้บริการนั้น ควรตรวจการตั้งค่าข้อมูลในแพ็กเกจที่คุณใช้",
      en: "Not with Tonbab AI: your data isn't used to train models, the platform it runs on doesn't keep customer content after answering, and our logging is off. If you connect your own assistant, what it reads falls under that provider's terms — check the data settings of your plan with them.",
    },
  },
  {
    q: { th: "ปิดการเชื่อมผู้ช่วย AI ทั้งบริษัทได้ไหม?", en: "Can we turn assistant connections off for the whole company?" },
    a: {
      th: "ได้ ผู้ดูแลระบบปิดสวิตช์ “อนุญาตการเชื่อมต่อ AI (MCP)” ในหน้าตั้งค่า API ได้ทันที และแต่ละคนยกเลิกการเชื่อมต่อของตัวเองได้ทุกเมื่อในแท็บแอปที่เชื่อมต่อ",
      en: "Yes. An admin can switch off “Allow AI connectors (MCP)” in API settings and it takes effect immediately, and each person can disconnect their own connections any time from the Connected apps tab.",
    },
  },
];
