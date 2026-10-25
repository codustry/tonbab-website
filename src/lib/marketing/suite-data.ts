/**
 * Landing-page content for the whole Tonbab suite — bilingual pairs inline
 * (same pattern as modules-data.ts). Honesty rules apply: every app and
 * capability listed here ships today in app.tonbab.com (verified against
 * the app's navigation + release history, Oct 2026). Stats are real counts
 * from live customer workspaces — never round them up into marketing fiction.
 *
 * Module colours mirror the product itself (MODULE_THEME in the app), so a
 * visitor who signs up sees the same colour language they saw here.
 */
import type { Bi } from "./compare-data";

export type SuiteKey = "operation" | "people" | "commerce" | "crm" | "service" | "platform";

export interface SuiteTheme {
	/** Solid swatch (dots, active tab bar). */
	solid: string;
	/** Soft icon chip. */
	chip: string;
	/** Accent text. */
	text: string;
	/** Soft wash behind cards / mock windows. */
	wash: string;
	/** Border on hover/active. */
	ring: string;
	/** Hex for inline SVG strokes. */
	hex: string;
}

export const SUITE_THEME: Record<SuiteKey, SuiteTheme> = {
	operation: { solid: "bg-blue-600", chip: "bg-blue-50 text-blue-700", text: "text-blue-700", wash: "bg-blue-50", ring: "border-blue-500", hex: "#2563eb" },
	people: { solid: "bg-violet-600", chip: "bg-violet-50 text-violet-700", text: "text-violet-700", wash: "bg-violet-50", ring: "border-violet-500", hex: "#7c3aed" },
	commerce: { solid: "bg-orange-500", chip: "bg-orange-50 text-orange-700", text: "text-orange-700", wash: "bg-orange-50", ring: "border-orange-500", hex: "#f97316" },
	crm: { solid: "bg-fuchsia-600", chip: "bg-fuchsia-50 text-fuchsia-700", text: "text-fuchsia-700", wash: "bg-fuchsia-50", ring: "border-fuchsia-500", hex: "#c026d3" },
	service: { solid: "bg-teal-600", chip: "bg-teal-50 text-teal-700", text: "text-teal-700", wash: "bg-teal-50", ring: "border-teal-500", hex: "#0d9488" },
	platform: { solid: "bg-slate-700", chip: "bg-slate-100 text-slate-700", text: "text-slate-700", wash: "bg-slate-50", ring: "border-slate-500", hex: "#334155" }
};

/** Rotating word in the hero headline. */
export const heroWords: { word: Bi; key: SuiteKey }[] = [
	{ word: { en: "factory", th: "โรงงาน" }, key: "operation" },
	{ word: { en: "purchasing team", th: "ทีมจัดซื้อ" }, key: "operation" },
	{ word: { en: "people", th: "ฝ่ายบุคคล" }, key: "people" },
	{ word: { en: "store", th: "หน้าร้าน" }, key: "commerce" },
	{ word: { en: "sales team", th: "ทีมขาย" }, key: "crm" },
	{ word: { en: "service crew", th: "ทีมบริการ" }, key: "service" }
];

export interface SuiteModule {
	key: Exclude<SuiteKey, "platform">;
	name: Bi;
	short: Bi;
	pitch: Bi;
	/** Three proof points shown under the hero window for the active tab. */
	points: Bi[];
}

export const suiteModules: SuiteModule[] = [
	{
		key: "operation",
		name: { en: "Operation", th: "Operation" },
		short: { en: "ERP core", th: "แกน ERP" },
		pitch: {
			en: "Purchase requests to delivery notes, with the true cost of every job rolling up live.",
			th: "ตั้งแต่ใบขอซื้อถึงใบส่งของ พร้อมต้นทุนจริงของทุกงานที่อัปเดตสด"
		},
		points: [
			{ en: "Job Control budget vs. actual, live", th: "งบประมาณเทียบต้นทุนจริงของ Job Control แบบสด" },
			{ en: "RFQ price comparison incl. import landed cost", th: "เทียบราคา RFQ รวมต้นทุนนำเข้า" },
			{ en: "Lots, serials and any unit of measure", th: "ล็อต ซีเรียล และหน่วยนับใดก็ได้" }
		]
	},
	{
		key: "people",
		name: { en: "People", th: "People" },
		short: { en: "HR & time", th: "บุคคลและเวลา" },
		pitch: {
			en: "Employees, leave, attendance and recruiting — built around Thai labour law.",
			th: "พนักงาน การลา เวลาทำงาน และการสรรหา — ออกแบบตามกฎหมายแรงงานไทย"
		},
		points: [
			{ en: "Leave quotas, comp days and a team calendar", th: "โควตาวันลา วันหยุดชดเชย และปฏิทินทีม" },
			{ en: "Attendance exceptions grouped per person", th: "ความผิดปกติของเวลาเข้างาน รวมเป็นรายคน" },
			{ en: "Recruit → e-sign contract → onboard", th: "สรรหา → เซ็นสัญญาออนไลน์ → รับเข้าทำงาน" }
		]
	},
	{
		key: "commerce",
		name: { en: "Commerce", th: "Commerce" },
		short: { en: "POS & channels", th: "หน้าร้านและช่องทางขาย" },
		pitch: {
			en: "A tablet POS, orders from every channel, and LINE / Facebook / Instagram chat in one inbox.",
			th: "POS บนแท็บเล็ต ออเดอร์จากทุกช่องทาง และแชท LINE / Facebook / Instagram ในกล่องเดียว"
		},
		points: [
			{ en: "PromptPay QR and card at the counter", th: "รับ PromptPay QR และบัตรที่หน้าร้าน" },
			{ en: "One chat inbox for LINE OA, Messenger, IG", th: "กล่องแชทเดียวสำหรับ LINE OA, Messenger, IG" },
			{ en: "Stock cuts from the same ERP inventory", th: "ตัดสต็อกจากคลังเดียวกับ ERP" }
		]
	},
	{
		key: "crm",
		name: { en: "CRM", th: "CRM" },
		short: { en: "B2B sales", th: "งานขาย B2B" },
		pitch: {
			en: "Pipelines, visit plans and a reorder-due list computed from real orders — plus government tenders.",
			th: "ไปป์ไลน์ แผนเยี่ยมลูกค้า และคิวถึงรอบสั่งซ้ำที่คำนวณจากออเดอร์จริง — รวมงานประมูลภาครัฐ"
		},
		points: [
			{ en: "Deals with product lines and weighted forecast", th: "ดีลพร้อมรายการสินค้าและพยากรณ์ถ่วงน้ำหนัก" },
			{ en: "e-GP tender leads fed in automatically", th: "ดึงงานประมูล e-GP เข้ามาอัตโนมัติ" },
			{ en: "Renewals and reorder reminders", th: "เตือนต่ออายุและรอบสั่งซื้อซ้ำ" }
		]
	},
	{
		key: "service",
		name: { en: "Service", th: "Service" },
		short: { en: "After-sales & repair", th: "บริการหลังการขายและงานซ่อม" },
		pitch: {
			en: "Repair and field-service jobs from intake to hand-back: quotes, parts, warranty, signatures.",
			th: "งานซ่อมและงานบริการนอกสถานที่ ตั้งแต่รับเครื่องถึงส่งคืน: ใบเสนอราคา อะไหล่ ประกัน ลายเซ็น"
		},
		points: [
			{ en: "Quote flows into the CRM pipeline", th: "ใบเสนอราคาเข้าไปป์ไลน์ CRM อัตโนมัติ" },
			{ en: "Parts from stock or a purchase request", th: "เบิกอะไหล่จากสต็อกหรือเปิดใบขอซื้อ" },
			{ en: "Technician day view with photos + signature", th: "หน้างานช่างรายวัน พร้อมรูปถ่ายและลายเซ็น" }
		]
	}
];

/** Lark-style use-case cards — each has a mini UI preview. */
export interface UseCase {
	key: "jobcost" | "approve" | "chat" | "field";
	module: SuiteKey;
	title: Bi;
	body: Bi;
}

export const useCases: UseCase[] = [
	{
		key: "jobcost",
		module: "operation",
		title: { en: "Know every job's true cost", th: "รู้ต้นทุนจริงของทุกงาน" },
		body: {
			en: "Purchases, stock issues, production and services post to the Job Control as they happen — no month-end spreadsheet.",
			th: "การซื้อ การเบิกของ การผลิต และค่าบริการ ลงที่ Job Control ทันทีที่เกิดขึ้น — ไม่ต้องรอทำ Excel สิ้นเดือน"
		}
	},
	{
		key: "approve",
		module: "platform",
		title: { en: "Approve from anywhere", th: "อนุมัติได้จากทุกที่" },
		body: {
			en: "Purchase requests, POs, leave and overtime land in one inbox on your phone, with email nudges.",
			th: "ใบขอซื้อ ใบสั่งซื้อ ใบลา และ OT รวมในกล่องเดียวบนมือถือ พร้อมอีเมลแจ้งเตือน"
		}
	},
	{
		key: "chat",
		module: "commerce",
		title: { en: "Sell at the counter and in chat", th: "ขายได้ทั้งหน้าร้านและในแชท" },
		body: {
			en: "Ring up a sale with PromptPay, or answer a LINE customer and turn the chat into an order.",
			th: "ขายหน้าร้านรับ PromptPay หรือตอบลูกค้าใน LINE แล้วเปลี่ยนแชทเป็นออเดอร์"
		}
	},
	{
		key: "field",
		module: "service",
		title: { en: "Field teams stay in sync", th: "ทีมภาคสนามทำงานสอดคล้องกัน" },
		body: {
			en: "Technicians and sales reps work from their phone: today's jobs, photos, GPS check-in, customer signature.",
			th: "ช่างและเซลส์ทำงานจากมือถือ: งานวันนี้ รูปถ่าย เช็คอิน GPS ลายเซ็นลูกค้า"
		}
	}
];

/** "One platform, every app" grid. icon = lucide name resolved in the page. */
export interface SuiteApp {
	module: SuiteKey;
	icon: string;
	name: Bi;
	body: Bi;
}

export const suiteApps: SuiteApp[] = [
	// Operation
	{ module: "operation", icon: "Briefcase", name: { en: "Job Control", th: "Job Control" }, body: { en: "One job, every linked document, budget vs. actual cost live.", th: "งานเดียว เอกสารที่เกี่ยวข้องทั้งหมด งบเทียบต้นทุนจริงแบบสด" } },
	{ module: "operation", icon: "ShoppingCart", name: { en: "Purchasing", th: "จัดซื้อ" }, body: { en: "PR → RFQ price comparison → PO, with approvals and auto-PR for shortages.", th: "PR → เทียบราคา RFQ → PO พร้อมสายอนุมัติและเปิด PR อัตโนมัติเมื่อของขาด" } },
	{ module: "operation", icon: "PackageCheck", name: { en: "Goods Receipt", th: "รับสินค้า" }, body: { en: "Receive against the PO; stock, lots and cost post in one step.", th: "รับของตาม PO สต็อก ล็อต และต้นทุนลงในขั้นตอนเดียว" } },
	{ module: "operation", icon: "Boxes", name: { en: "Inventory", th: "คลังสินค้า" }, body: { en: "Multi-warehouse balances, transfers, adjustments, serials and lots at average cost.", th: "ยอดคงเหลือหลายคลัง โอนย้าย ปรับยอด ซีเรียลและล็อต คิดต้นทุนถัวเฉลี่ย" } },
	{ module: "operation", icon: "Factory", name: { en: "Manufacturing", th: "การผลิต" }, body: { en: "BOMs, work orders, routing, yield/scrap, QC hold and genealogy.", th: "BOM ใบสั่งผลิต ขั้นตอนการผลิต ของเสีย QC และการสืบย้อนวัตถุดิบ" } },
	{ module: "operation", icon: "Truck", name: { en: "Delivery Notes", th: "ใบส่งของ" }, body: { en: "Ship from stock, cost the job, print the Thai delivery note.", th: "ส่งของจากสต็อก ลงต้นทุนงาน พิมพ์ใบส่งของภาษาไทย" } },
	{ module: "operation", icon: "ReceiptText", name: { en: "Expenses", th: "เบิกค่าใช้จ่าย" }, body: { en: "Staff claims with receipts, approvals and job allocation.", th: "เบิกค่าใช้จ่ายพร้อมใบเสร็จ อนุมัติ และปันส่วนเข้างาน" } },
	// People
	{ module: "people", icon: "Users", name: { en: "Directory & org chart", th: "รายชื่อและผังองค์กร" }, body: { en: "Bilingual employee records with permission-tiered pay and ID fields.", th: "ข้อมูลพนักงานสองภาษา ข้อมูลเงินเดือนและบัตรประชาชนแยกสิทธิ์การเห็น" } },
	{ module: "people", icon: "CalendarDays", name: { en: "Leave", th: "การลา" }, body: { en: "Thai leave types and quotas, half days, comp days, approvals.", th: "ประเภทวันลาตามกฎหมายไทย โควตา ลาครึ่งวัน วันหยุดชดเชย และอนุมัติ" } },
	{ module: "people", icon: "Clock", name: { en: "Time & attendance", th: "เวลาทำงาน" }, body: { en: "Clock data, late/early exceptions and overtime requests.", th: "ข้อมูลเข้า-ออกงาน มาสาย/กลับก่อน และคำขอ OT" } },
	{ module: "people", icon: "CalendarRange", name: { en: "Team calendar", th: "ปฏิทินทีม" }, body: { en: "Who is in, who is on leave, and public holidays — at a glance.", th: "ใครทำงาน ใครลา และวันหยุดนักขัตฤกษ์ — เห็นในหน้าเดียว" } },
	{ module: "people", icon: "UserPlus", name: { en: "Recruitment", th: "สรรหาบุคลากร" }, body: { en: "Job posts, applicants, interviews, e-accepted contracts, onboarding.", th: "ประกาศงาน ผู้สมัคร นัดสัมภาษณ์ สัญญาตอบรับออนไลน์ และการรับเข้า" } },
	{ module: "people", icon: "UserCircle", name: { en: "Self-service", th: "บริการตนเอง" }, body: { en: "Staff see their own leave balance, time and expense claims.", th: "พนักงานดูวันลาคงเหลือ เวลาทำงาน และการเบิกของตัวเอง" } },
	// Commerce
	{ module: "commerce", icon: "Store", name: { en: "POS", th: "POS หน้าร้าน" }, body: { en: "Installable tablet POS — PromptPay QR and card, 80 mm receipts.", th: "POS ติดตั้งบนแท็บเล็ต — PromptPay QR และบัตร ใบเสร็จ 80 มม." } },
	{ module: "commerce", icon: "ShoppingBag", name: { en: "Orders", th: "ออเดอร์" }, body: { en: "Every channel's orders with payment, pick-pack and shipments.", th: "ออเดอร์ทุกช่องทาง พร้อมการชำระเงิน แพ็ก และจัดส่ง" } },
	{ module: "commerce", icon: "MessageCircle", name: { en: "Chat inbox", th: "กล่องแชท" }, body: { en: "LINE OA, Facebook Messenger and Instagram DMs, assigned to agents.", th: "LINE OA, Facebook Messenger และ Instagram DM มอบหมายให้แอดมิน" } },
	{ module: "commerce", icon: "Users", name: { en: "Customers", th: "ลูกค้า" }, body: { en: "One customer across chat, POS and orders, with purchase insight.", th: "ลูกค้าคนเดียวกันทั้งแชท POS และออเดอร์ พร้อมข้อมูลการซื้อ" } },
	{ module: "commerce", icon: "CreditCard", name: { en: "Payments", th: "การชำระเงิน" }, body: { en: "PromptPay and cards via Beam, plus manual transfer slips.", th: "PromptPay และบัตรผ่าน Beam รวมถึงสลิปโอนเงิน" } },
	// CRM
	{ module: "crm", icon: "Kanban", name: { en: "Deals", th: "ดีล" }, body: { en: "Kanban pipelines with product lines, tags and editable stages.", th: "ไปป์ไลน์คัมบังพร้อมรายการสินค้า แท็ก และสเตจที่ปรับได้" } },
	{ module: "crm", icon: "Building2", name: { en: "Accounts & contacts", th: "ลูกค้าและผู้ติดต่อ" }, body: { en: "The same companies your documents use, with contact roles.", th: "บริษัทชุดเดียวกับที่เอกสารใช้ พร้อมบทบาทของผู้ติดต่อ" } },
	{ module: "crm", icon: "CalendarClock", name: { en: "Sales plan", th: "แผนการขาย" }, body: { en: "Today's calls and visits, photo + GPS close-out, reorder-due list.", th: "สายโทรและการเยี่ยมวันนี้ ปิดงานด้วยรูป + GPS และคิวถึงรอบสั่งซ้ำ" } },
	{ module: "crm", icon: "Landmark", name: { en: "Government tenders", th: "งานประมูลภาครัฐ" }, body: { en: "e-GP announcements matched to your keywords, straight into a pipeline.", th: "ประกาศ e-GP ที่ตรงกับคีย์เวิร์ดของคุณ เข้าไปป์ไลน์โดยตรง" } },
	{ module: "crm", icon: "RefreshCw", name: { en: "Renewals", th: "การต่ออายุ" }, body: { en: "Contracts and maintenance coming due, before the customer asks.", th: "สัญญาและงานบำรุงรักษาที่ใกล้ครบกำหนด ก่อนลูกค้าทวง" } },
	{ module: "crm", icon: "BarChart3", name: { en: "Forecast & reports", th: "พยากรณ์และรายงาน" }, body: { en: "Weighted forecast, goals per rep, win/loss reports.", th: "พยากรณ์ถ่วงน้ำหนัก เป้าหมายรายคน รายงานชนะ/แพ้" } },
	// Service
	{ module: "service", icon: "Wrench", name: { en: "Service jobs", th: "งานบริการ" }, body: { en: "Intake → inspect → quote → repair → test → hand back, on one job.", th: "รับเครื่อง → ตรวจ → เสนอราคา → ซ่อม → ทดสอบ → ส่งคืน ในงานเดียว" } },
	{ module: "service", icon: "UserCheck", name: { en: "Technician app", th: "แอปช่าง" }, body: { en: "Today's visits, checklists, photos and customer signature.", th: "งานวันนี้ เช็กลิสต์ รูปถ่าย และลายเซ็นลูกค้า" } },
	{ module: "service", icon: "ShieldCheck", name: { en: "Warranty & loaners", th: "ประกันและเครื่องสำรอง" }, body: { en: "Warranty checked at intake; loaner units tracked out and back.", th: "ตรวจประกันตอนรับเครื่อง ติดตามเครื่องสำรองที่ให้ยืม" } },
	{ module: "service", icon: "CalendarRange", name: { en: "Maintenance plans", th: "แผนบำรุงรักษา" }, body: { en: "Preventive maintenance that opens the next job when it is due.", th: "บำรุงรักษาเชิงป้องกัน เปิดงานถัดไปให้เมื่อถึงกำหนด" } },
	// Platform
	{ module: "platform", icon: "LayoutDashboard", name: { en: "Home dashboard", th: "หน้าหลัก" }, body: { en: "What needs you, this week's team schedule, and 30-day pulse.", th: "งานที่รอคุณ ตารางทีมสัปดาห์นี้ และภาพรวม 30 วัน" } },
	{ module: "platform", icon: "Inbox", name: { en: "Approvals inbox", th: "กล่องอนุมัติ" }, body: { en: "Every approval across modules in one place.", th: "ทุกการอนุมัติจากทุกโมดูลในที่เดียว" } },
	{ module: "platform", icon: "MonitorSmartphone", name: { en: "Kiosk apps", th: "แอปคีออสก์" }, body: { en: "Pack, Manufacture and POS stations with PIN operator login.", th: "สถานีแพ็กของ ผลิต และ POS เข้าใช้ด้วย PIN ของพนักงาน" } },
	{ module: "platform", icon: "KeyRound", name: { en: "SSO & roles", th: "SSO และสิทธิ์" }, body: { en: "Microsoft sign-in for your organisation, role-based permissions per company.", th: "เข้าระบบด้วยบัญชี Microsoft ขององค์กร สิทธิ์ตามบทบาทรายบริษัท" } },
	{ module: "platform", icon: "FileSpreadsheet", name: { en: "Import & export", th: "นำเข้า/ส่งออกข้อมูล" }, body: { en: "Bring products, companies and stock in from Excel.", th: "นำสินค้า บริษัท และสต็อกเข้าจาก Excel" } }
];

/** The connected loop: one order travelling through every module. */
export interface LoopStep {
	module: SuiteKey;
	doc: Bi;
	title: Bi;
	body: Bi;
}

export const loopSteps: LoopStep[] = [
	{ module: "crm", doc: { en: "Deal won", th: "ปิดดีล" }, title: { en: "Sales closes the deal", th: "ทีมขายปิดดีล" }, body: { en: "The deal already carries product lines and prices. Winning it opens a Job Control — nobody re-keys the order.", th: "ดีลมีรายการสินค้าและราคาอยู่แล้ว เมื่อชนะจะเปิด Job Control ให้ทันที — ไม่มีใครต้องคีย์ออเดอร์ซ้ำ" } },
	{ module: "operation", doc: { en: "Job Control", th: "Job Control" }, title: { en: "The job sets the budget", th: "งานกำหนดงบประมาณ" }, body: { en: "Every later document links back here, so cost against budget is visible from day one.", th: "เอกสารทุกใบหลังจากนี้เชื่อมกลับมาที่งานนี้ เห็นต้นทุนเทียบงบได้ตั้งแต่วันแรก" } },
	{ module: "operation", doc: { en: "PR → PO", th: "PR → PO" }, title: { en: "Purchasing sources the parts", th: "จัดซื้อหาวัตถุดิบ" }, body: { en: "Shortages pool into one purchase request per vendor; RFQs compare quotes, including import landed cost.", th: "ของที่ขาดรวมเป็นใบขอซื้อเดียวต่อผู้ขาย RFQ เทียบราคารวมต้นทุนนำเข้า" } },
	{ module: "operation", doc: { en: "Goods receipt", th: "รับสินค้า" }, title: { en: "Stock arrives, costed", th: "ของเข้าคลังพร้อมต้นทุน" }, body: { en: "Receiving posts stock, lots and average cost in one step — and releases the PO commitment.", th: "การรับของลงสต็อก ล็อต และต้นทุนถัวเฉลี่ยในขั้นเดียว — และปลดยอดผูกพัน PO" } },
	{ module: "operation", doc: { en: "Work order", th: "ใบสั่งผลิต" }, title: { en: "Production builds it", th: "ฝ่ายผลิตลงมือผลิต" }, body: { en: "Materials consume from stock, yield and scrap are recorded, QC can hold a batch.", th: "เบิกวัตถุดิบจากสต็อก บันทึกผลผลิตและของเสีย QC กักล็อตได้" } },
	{ module: "operation", doc: { en: "Delivery note", th: "ใบส่งของ" }, title: { en: "Delivered to the customer", th: "ส่งมอบให้ลูกค้า" }, body: { en: "Stock goes out, the job's cost is final, and the customer's purchase history updates.", th: "ตัดสต็อกออก ต้นทุนงานสรุป และประวัติการซื้อของลูกค้าอัปเดต" } },
	{ module: "service", doc: { en: "Service job", th: "งานบริการ" }, title: { en: "After-sales care", th: "ดูแลหลังการขาย" }, body: { en: "Warranty is checked at intake; repairs, parts and labour post back to a job.", th: "ตรวจประกันตอนรับเครื่อง งานซ่อม อะไหล่ และค่าแรงลงกลับเข้างาน" } },
	{ module: "crm", doc: { en: "Reorder due", th: "ถึงรอบสั่งซ้ำ" }, title: { en: "…and the next order", th: "…และออเดอร์ถัดไป" }, body: { en: "From the real purchase rhythm, CRM puts the customer back on the rep's list when they are due again.", th: "จากจังหวะการซื้อจริง CRM จะใส่ลูกค้ากลับในคิวของเซลส์เมื่อถึงรอบอีกครั้ง" } }
];

export const thaiPoints: { title: Bi; body: Bi; icon: string }[] = [
	{ icon: "Languages", title: { en: "Thai and English, everywhere", th: "ไทยและอังกฤษ ทุกหน้าจอ" }, body: { en: "Every screen, document and email in both languages — switch per person.", th: "ทุกหน้าจอ เอกสาร และอีเมลมีทั้งสองภาษา — เลือกได้รายคน" } },
	{ icon: "QrCode", title: { en: "PromptPay built in", th: "รองรับ PromptPay" }, body: { en: "PromptPay QR and card payments at the POS, settled automatically.", th: "รับ PromptPay QR และบัตรที่ POS กระทบยอดอัตโนมัติ" } },
	{ icon: "MessageCircle", title: { en: "LINE where your customers are", th: "LINE ที่ลูกค้าคุณอยู่" }, body: { en: "LINE OA conversations land in the same inbox as Facebook and Instagram.", th: "แชท LINE OA เข้ากล่องเดียวกับ Facebook และ Instagram" } },
	{ icon: "Landmark", title: { en: "e-GP tenders", th: "งานประมูล e-GP" }, body: { en: "Government procurement announcements matched and pushed into your pipeline.", th: "ประกาศจัดซื้อจัดจ้างภาครัฐ คัดกรองและส่งเข้าไปป์ไลน์ของคุณ" } },
	{ icon: "Scale", title: { en: "Thai labour rules", th: "ตามกฎหมายแรงงานไทย" }, body: { en: "Leave types, comp days and withholding tax on service billing, the Thai way.", th: "ประเภทวันลา วันหยุดชดเชย และหัก ณ ที่จ่ายในงานบริการ แบบไทย" } },
	{ icon: "Smartphone", title: { en: "Installs like an app", th: "ติดตั้งได้เหมือนแอป" }, body: { en: "Add to home screen on iPhone, Android or a tablet — no app store needed.", th: "เพิ่มลงหน้าจอโฮมบน iPhone, Android หรือแท็บเล็ต — ไม่ต้องผ่าน App Store" } }
];

/** Real counts from live customer workspaces (queried 25 Oct 2026). */
export const realStats: { value: string; label: Bi }[] = [
	{ value: "8,850+", label: { en: "stock movements posted", th: "รายการเคลื่อนไหวสต็อก" } },
	{ value: "1,000+", label: { en: "products managed", th: "สินค้าที่บริหาร" } },
	{ value: "439", label: { en: "delivery notes issued", th: "ใบส่งของที่ออกแล้ว" } },
	{ value: "5 + 3", label: { en: "modules + kiosk apps", th: "โมดูล + แอปคีออสก์" } }
];

export const kiosks: { icon: string; name: Bi; body: Bi }[] = [
	{ icon: "Package", name: { en: "Pack station", th: "สถานีแพ็กของ" }, body: { en: "Pick, pack and ship delivery notes from a tablet at the packing bench.", th: "หยิบ แพ็ก และส่งของตามใบส่งของจากแท็บเล็ตที่โต๊ะแพ็ก" } },
	{ icon: "Factory", name: { en: "Manufacture station", th: "สถานีผลิต" }, body: { en: "Operators start, record output and scrap on work orders at the line.", th: "พนักงานเริ่มงาน บันทึกผลผลิตและของเสียของใบสั่งผลิตที่ไลน์ผลิต" } },
	{ icon: "Store", name: { en: "POS counter", th: "เคาน์เตอร์ POS" }, body: { en: "A full-screen register that stays open on the counter tablet.", th: "หน้าจอขายเต็มจอ เปิดค้างไว้บนแท็บเล็ตหน้าร้าน" } }
];
