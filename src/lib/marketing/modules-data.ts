/**
 * /modules/[module] content — bilingual pairs inline (same pattern and
 * rationale as compare-data.ts). Every feature listed here SHIPS TODAY in
 * the product (verified against the app's routes and release history) —
 * the honesty rules in CLAUDE.md apply to feature claims too.
 */
import type { Bi } from "./compare-data";

export interface ModuleFeature {
	title: Bi;
	body: Bi;
}

export interface ModuleContent {
	key: string;
	name: Bi;
	tagline: Bi;
	intro: Bi;
	features: ModuleFeature[];
	flow: Bi[];
}

export const modulesContent: ModuleContent[] = [
	{
		key: "operation",
		name: { en: "Operation — the ERP core", th: "Operation — หัวใจของ ERP" },
		tagline: {
			en: "Procurement, inventory, manufacturing, delivery, and job costing in one traceable loop.",
			th: "จัดซื้อ คลังสินค้า การผลิต การส่งของ และต้นทุนงาน ในวงจรเดียวที่ตรวจสอบย้อนกลับได้"
		},
		intro: {
			en: "From purchase request to delivery note, every step is captured, costed, and auditable. Open a Job Control and Tonbab links every PR, PO, work order and delivery to it — with the true cost rolling up live.",
			th: "ตั้งแต่ใบขอซื้อจนถึงใบส่งของ ทุกขั้นตอนถูกบันทึก คิดต้นทุน และตรวจสอบได้ เปิด Job Control หนึ่งใบ Tonbab จะเชื่อมทุก PR, PO, ใบสั่งผลิต และใบส่งของเข้าด้วยกัน — พร้อมต้นทุนจริงที่อัปเดตสด"
		},
		features: [
			{ title: { en: "Procurement with RFQ comparison", th: "จัดซื้อพร้อมเปรียบเทียบราคา (RFQ)" }, body: { en: "Multi-stage approval, vendor-grouped POs, per-line awards, and a price-comparison table that ranks quotes by landed cost for imports.", th: "อนุมัติหลายชั้น ใบสั่งซื้อจัดกลุ่มตามผู้ขาย เลือกผู้ชนะรายบรรทัด และตารางเปรียบเทียบราคาที่จัดอันดับตามต้นทุนนำเข้าจริง" } },
			{ title: { en: "Landed cost for imports", th: "ต้นทุนนำเข้า (Landed Cost)" }, body: { en: "FX, Incoterms, HS codes, duty and freight on an Import Cost Card — actual costs reconciled after arrival, SAP-MIRO style.", th: "FX, Incoterms, HS code, อากร และค่าขนส่ง บน Import Cost Card — กระทบต้นทุนจริงหลังของถึง สไตล์ SAP MIRO" } },
			{ title: { en: "Inventory at weighted-average cost", th: "คลังสินค้าต้นทุนเฉลี่ยถ่วงน้ำหนัก" }, body: { en: "Real-time stock across warehouses, transfers, adjustments with mandatory unit cost, full movement history.", th: "สต็อกเรียลไทม์ทุกคลัง โอนย้าย ปรับปรุงพร้อมบังคับต้นทุนต่อหน่วย ประวัติการเคลื่อนไหวครบ" } },
			{ title: { en: "BOM & work orders", th: "BOM และใบสั่งผลิต" }, body: { en: "Consume materials by BOM, route subcontract steps, snapshot planned cost at release and track variance to actual.", th: "ตัดวัตถุดิบตาม BOM ส่งงานจ้างภายนอก บันทึกต้นทุนแผน ณ ตอนปล่อยงาน และติดตามส่วนต่างกับต้นทุนจริง" } },
			{ title: { en: "Lot & serial traceability", th: "ติดตามล็อตและซีเรียล" }, body: { en: "FEFO picking, QC hold and quarantine, forward and backward genealogy — find every affected item in seconds.", th: "หยิบแบบ FEFO, กัก QC และ quarantine, สืบย้อนไปข้างหน้า-ถอยหลัง — หาสินค้าที่กระทบได้ในไม่กี่วินาที" } },
			{ title: { en: "Job costing that closes the loop", th: "ต้นทุนงานครบวงจร" }, body: { en: "POs, work orders, deliveries, expenses and service costs roll into one job view with a live budget bar.", th: "PO ใบสั่งผลิต การส่งของ ค่าใช้จ่าย และงานบริการ รวมเป็นมุมมองงานเดียว พร้อมแถบงบประมาณสด" } }
		],
		flow: [
			{ en: "Open a Job Control", th: "เปิด Job Control" },
			{ en: "PR → approval → vendor-grouped PO", th: "ใบขอซื้อ → อนุมัติ → PO จัดกลุ่มตามผู้ขาย" },
			{ en: "Receive, produce, ship — all costed", th: "รับของ ผลิต ส่งมอบ — คิดต้นทุนทุกขั้น" },
			{ en: "Close the job, export to accounting", th: "ปิดงาน ส่งออกให้ฝ่ายบัญชี" }
		]
	},
	{
		key: "people",
		name: { en: "People — Thai HR", th: "People — งานบุคคลแบบไทย" },
		tagline: {
			en: "Employees, leave, time, and recruitment — built on Thai labour law, not translated onto it.",
			th: "พนักงาน วันลา เวลาทำงาน และการสรรหา — สร้างบนกฎหมายแรงงานไทย ไม่ใช่แค่แปลทับ"
		},
		intro: {
			en: "Leave types seeded from Thai law, clock in/out with OT approval, recruitment with public careers pages, and payroll-ready monthly exports your payroll provider can consume directly.",
			th: "ประเภทวันลาตั้งต้นตามกฎหมายไทย ลงเวลาเข้า-ออกพร้อมอนุมัติ OT ระบบสรรหาพร้อมหน้ารับสมัครงานสาธารณะ และไฟล์สรุปรายเดือนที่ส่งให้ผู้ทำเงินเดือนได้ทันที"
		},
		features: [
			{ title: { en: "Thai leave law presets", th: "วันลาตามกฎหมายไทย" }, body: { en: "Sick, personal, annual, maternity and more — with gender eligibility, tenure gates, accrual, carry-over and encashment options.", th: "ลาป่วย ลากิจ พักร้อน ลาคลอด และอื่น ๆ — พร้อมเงื่อนไขเพศ อายุงาน การสะสม ยกยอด และแลกเงิน" } },
			{ title: { en: "Time & overtime", th: "เวลาทำงานและ OT" }, body: { en: "Clock in/out, exception classification, OT requests and approvals, monthly analytics.", th: "ลงเวลาเข้า-ออก จัดประเภทความผิดปกติ ขอ-อนุมัติ OT และสถิติรายเดือน" } },
			{ title: { en: "Recruitment with public careers pages", th: "สรรหาพร้อมหน้ารับสมัครงานสาธารณะ" }, body: { en: "ATS pipeline, full Thai application forms, offer management, interview self-scheduling, contract e-accept and onboarding.", th: "ไปป์ไลน์ผู้สมัคร ใบสมัครภาษาไทยครบถ้วน จัดการข้อเสนอ นัดสัมภาษณ์ด้วยตนเอง เซ็นสัญญาออนไลน์ และ onboarding" } },
			{ title: { en: "Employee self-service", th: "พนักงานทำรายการเอง" }, body: { en: "My leave, my time, my expense claims and cash advances — on any phone as an installable app.", th: "วันลา เวลาทำงาน เบิกค่าใช้จ่าย และเงินทดรองจ่ายของฉัน — บนมือถือทุกเครื่อง ติดตั้งเป็นแอปได้" } },
			{ title: { en: "Org chart & documents", th: "ผังองค์กรและเอกสาร" }, body: { en: "Hierarchy view, employee documents with expiry alerts, work anniversaries and new-hire dashboards.", th: "ผังสายบังคับบัญชา เอกสารพนักงานพร้อมแจ้งเตือนวันหมดอายุ วันครบรอบงาน และแดชบอร์ดพนักงานใหม่" } },
			{ title: { en: "Payroll-ready exports", th: "ไฟล์พร้อมทำเงินเดือน" }, body: { en: "Monthly time + leave PDF/Excel summaries for your payroll provider — Tonbab does not replace them, it feeds them clean data.", th: "สรุปเวลา + วันลารายเดือนเป็น PDF/Excel ให้ผู้ทำเงินเดือนของคุณ — Tonbab ไม่ได้มาแทน แต่ส่งข้อมูลสะอาดให้" } }
		],
		flow: [
			{ en: "Post a job on your careers page", th: "ลงประกาศงานบนหน้ารับสมัคร" },
			{ en: "Hire → contract e-accept → onboard", th: "รับเข้า → เซ็นสัญญาออนไลน์ → onboarding" },
			{ en: "Clock in, request leave & OT in-app", th: "ลงเวลา ลางาน ขอ OT ในแอป" },
			{ en: "Export month-end to payroll", th: "ส่งออกสิ้นเดือนให้ทำเงินเดือน" }
		]
	},
	{
		key: "commerce",
		name: { en: "Commerce + POS", th: "Commerce + POS" },
		tagline: {
			en: "Sell in-store and online with stock that is actually true.",
			th: "ขายหน้าร้านและออนไลน์ ด้วยสต็อกที่ตรงกับความจริง"
		},
		intro: {
			en: "A POS that installs on any tablet or phone, marketplace sync with Shopee and Lazada, chat from LINE OA and Facebook/Instagram in one inbox — all cutting the same inventory ledger as your factory floor.",
			th: "POS ที่ติดตั้งบนแท็บเล็ตหรือมือถือเครื่องไหนก็ได้ ซิงค์ Shopee และ Lazada แชทจาก LINE OA และ Facebook/Instagram ในกล่องเดียว — ทั้งหมดตัดสต็อกจากบัญชีเดียวกับโรงงานของคุณ"
		},
		features: [
			{ title: { en: "POS as an installable app", th: "POS ติดตั้งเป็นแอป" }, body: { en: "Product grid with categories, cart with line discounts, PromptPay QR and cards via Beam, 80mm receipts and e-receipts.", th: "ตารางสินค้าแบ่งหมวด ตะกร้าพร้อมส่วนลดรายบรรทัด PromptPay QR และบัตรผ่าน Beam ใบเสร็จ 80mm และ e-receipt" } },
			{ title: { en: "Thai VAT tax invoice", th: "ใบกำกับภาษีไทย" }, body: { en: "Full-form tax invoices with branch IDs, VAT-inclusive pricing modes, and import VAT handled on the purchasing side.", th: "ใบกำกับภาษีเต็มรูปพร้อมรหัสสาขา โหมดราคารวม VAT และ VAT นำเข้าจัดการฝั่งจัดซื้อ" } },
			{ title: { en: "Shopee & Lazada sync", th: "ซิงค์ Shopee และ Lazada" }, body: { en: "Order pull, stock push-back, ship push with carrier AWB labels — one OAuth connection per shop.", th: "ดึงออเดอร์ ส่งสต็อกกลับ แจ้งจัดส่งพร้อมป้าย AWB — เชื่อมต่อ OAuth ครั้งเดียวต่อร้าน" } },
			{ title: { en: "One chat inbox", th: "กล่องแชทเดียว" }, body: { en: "LINE OA, Facebook Messenger and Instagram DMs beside your orders and customers — reply where the context is.", th: "LINE OA, Facebook Messenger และ Instagram DM อยู่ข้างออเดอร์และข้อมูลลูกค้า — ตอบแชทตรงที่มีบริบท" } },
			{ title: { en: "Reserve, pick, pack, partial-ship", th: "จอง หยิบ แพ็ก ส่งบางส่วน" }, body: { en: "Stock reserves on order, pick/pack flow, per-line partial shipment with real stock issue at ship time.", th: "จองสต็อกเมื่อรับออเดอร์ หยิบ-แพ็กตามขั้นตอน ส่งบางส่วนรายบรรทัดพร้อมตัดสต็อกจริงตอนส่ง" } },
			{ title: { en: "Payment links", th: "ลิงก์รับชำระเงิน" }, body: { en: "Email or QR pay-links so customers pay on their own device; webhook confirms and cuts stock idempotently.", th: "ส่งลิงก์ชำระทางอีเมลหรือ QR ให้ลูกค้าจ่ายบนเครื่องตัวเอง webhook ยืนยันและตัดสต็อกแบบไม่ซ้ำ" } }
		],
		flow: [
			{ en: "Curate the POS catalog", th: "เลือกสินค้าขึ้นหน้าร้าน POS" },
			{ en: "Sell — store, marketplace, chat", th: "ขาย — หน้าร้าน มาร์เก็ตเพลส แชท" },
			{ en: "Pick, pack, ship with AWB", th: "หยิบ แพ็ก ส่งพร้อม AWB" },
			{ en: "Stock and costs stay true", th: "สต็อกและต้นทุนตรงเสมอ" }
		]
	},
	{
		key: "crm",
		name: { en: "CRM — B2B sales", th: "CRM — ทีมขาย B2B" },
		tagline: {
			en: "A CRM that knows when your customer is due to reorder — because it sees the orders.",
			th: "CRM ที่รู้ว่าลูกค้าถึงรอบสั่งซ้ำเมื่อไหร่ — เพราะเห็นออเดอร์จริง"
		},
		intro: {
			en: "Most CRMs guess. Tonbab's reorder-due queue is computed from real order history in the same database. Plan visits with photo + GPS check-in, run deal pipelines including a government-tender board, and convert a won deal straight into a Job Control.",
			th: "CRM ทั่วไปต้องเดา แต่คิวลูกค้าถึงรอบสั่งซ้ำของ Tonbab คำนวณจากประวัติออเดอร์จริงในฐานข้อมูลเดียวกัน วางแผนเยี่ยมลูกค้าพร้อมเช็คอินรูปถ่าย + GPS จัดการไปป์ไลน์ดีลรวมถึงบอร์ดงานประมูลราชการ และแปลงดีลที่ชนะเป็น Job Control ได้ทันที"
		},
		features: [
			{ title: { en: "Reorder-due worklist", th: "คิวลูกค้าถึงรอบสั่งซ้ำ" }, body: { en: "Daily queue of accounts due to buy again, from real purchase latency — not a guess field sales fill in.", th: "คิวรายวันของลูกค้าที่ถึงรอบซื้อซ้ำ จากช่วงเวลาสั่งซื้อจริง — ไม่ใช่ตัวเลขที่เซลส์กรอกเอง" } },
			{ title: { en: "Visit plans with check-in", th: "แผนเยี่ยมพร้อมเช็คอิน" }, body: { en: "Cadence-based visit planning; reps check in with photo and GPS, close visits with outcomes.", th: "วางแผนเยี่ยมตามรอบ เซลส์เช็คอินด้วยรูปถ่ายและ GPS ปิดการเยี่ยมพร้อมผลลัพธ์" } },
			{ title: { en: "Pipelines incl. government tenders", th: "ไปป์ไลน์รวมงานประมูลราชการ" }, body: { en: "Kanban deal boards with editable stages — including a dedicated tender board for งานประมูล.", th: "บอร์ดดีลแบบคัมบัง ปรับสเตจได้ — รวมบอร์ดเฉพาะสำหรับงานประมูลราชการ" } },
			{ title: { en: "Account 360", th: "มุมมองลูกค้า 360°" }, body: { en: "Every order, delivery, visit, deal and conversation for an account on one timeline.", th: "ทุกออเดอร์ การส่งของ การเยี่ยม ดีล และบทสนทนาของลูกค้า บนไทม์ไลน์เดียว" } },
			{ title: { en: "Won deal → Job Control", th: "ดีลชนะ → Job Control" }, body: { en: "Close-won creates the job that procurement and production execute — no re-keying between sales and ops.", th: "ปิดดีลชนะแล้วสร้างงานให้ฝ่ายจัดซื้อและผลิตต่อได้เลย — ไม่ต้องคีย์ซ้ำระหว่างฝ่ายขายกับปฏิบัติการ" } },
			{ title: { en: "Weighted forecast", th: "พยากรณ์ถ่วงน้ำหนัก" }, body: { en: "Stage-weighted pipeline forecast that management can defend, because the underlying orders are real.", th: "พยากรณ์ยอดขายถ่วงน้ำหนักตามสเตจ ที่ผู้บริหารกล้าอ้างอิง เพราะข้อมูลออเดอร์เบื้องหลังเป็นของจริง" } }
		],
		flow: [
			{ en: "Queue shows who is due today", th: "คิวบอกว่าวันนี้ควรติดต่อใคร" },
			{ en: "Visit, check in, log the outcome", th: "เยี่ยม เช็คอิน บันทึกผล" },
			{ en: "Move the deal through the board", th: "เลื่อนดีลบนบอร์ด" },
			{ en: "Win → job → delivery → reorder", th: "ชนะ → งาน → ส่งมอบ → สั่งซ้ำ" }
		]
	}
];

export function getModule(key: string): ModuleContent | undefined {
	return modulesContent.find((mc) => mc.key === key);
}
