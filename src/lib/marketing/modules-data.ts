/**
 * /modules/[module] content — bilingual pairs inline (same pattern and
 * rationale as compare-data.ts). Every feature listed here SHIPS TODAY in
 * the product (verified against the app's routes and release history) —
 * the honesty rules in CLAUDE.md apply to feature claims too.
 *
 * heroArt points at brand illustrations served from the site's own media
 * library (/api/media/…). screenshot is a slot for REAL app screenshots:
 * when absent the page renders a styled placeholder figure, so future
 * /api/media/<id> URLs can be dropped in here without code changes.
 */
import type { Bi } from "./compare-data";

export interface ModuleFeature {
	title: Bi;
	body: Bi;
}

export interface ModuleFeatureGroup {
	title: Bi;
	features: ModuleFeature[];
}

export interface WorkflowStep {
	title: Bi;
	body: Bi;
}

export interface DiagramNode {
	label: Bi;
	sub?: Bi;
}

export interface FaqEntry {
	q: Bi;
	a: Bi;
}

export interface ModuleContent {
	key: string;
	name: Bi;
	tagline: Bi;
	intro: Bi;
	/** Brand hero illustration (site media library, 16:9, white bg). */
	heroArt: string;
	heroArtAlt: Bi;
	/** Real app screenshot — absent until we have one; placeholder renders instead. */
	screenshot?: string;
	screenshotCaption: Bi;
	workflow: WorkflowStep[];
	diagram: DiagramNode[];
	featureGroups: ModuleFeatureGroup[];
	whoFor: Bi[];
	faq: FaqEntry[];
	/** Keys of related modules for cross-links. */
	related: string[];
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
		heroArt: "/api/media/tnb-art-module-operation",
		heroArtAlt: {
			en: "Illustration of the Operation module: procurement, warehouse, production and job costing connected in one loop",
			th: "ภาพประกอบโมดูล Operation: จัดซื้อ คลังสินค้า การผลิต และต้นทุนงานเชื่อมกันเป็นวงจรเดียว"
		},
		screenshotCaption: {
			en: "The Job Control page — live budget bar with every linked document",
			th: "หน้า Job Control — แถบงบประมาณสดพร้อมเอกสารที่เชื่อมโยงทั้งหมด"
		},
		workflow: [
			{
				title: { en: "Open a Job Control", th: "เปิด Job Control" },
				body: {
					en: "A job is the anchor for a customer order or internal project. Everything that follows — purchases, production, deliveries, expenses — links back to it, so cost and status always have one home.",
					th: "งาน (Job) คือจุดยึดของออเดอร์ลูกค้าหรือโปรเจกต์ภายใน ทุกอย่างที่ตามมา — การซื้อ การผลิต การส่งของ ค่าใช้จ่าย — เชื่อมกลับมาที่งานนี้ ต้นทุนและสถานะจึงมีบ้านเดียวเสมอ"
				}
			},
			{
				title: { en: "Purchase request & approval", th: "ใบขอซื้อและการอนุมัติ" },
				body: {
					en: "Anyone who needs material raises a PR. Multi-stage approval routes it to the right approvers, and edits after approval trigger re-approval — nothing slips through changed.",
					th: "ใครต้องการวัตถุดิบก็เปิด PR ได้ ระบบอนุมัติหลายชั้นส่งเรื่องถึงผู้อนุมัติที่ถูกต้อง และการแก้ไขหลังอนุมัติต้องอนุมัติซ้ำ — ไม่มีรายการแอบแก้หลุดรอด"
				}
			},
			{
				title: { en: "RFQ price comparison", th: "เปรียบเทียบราคา (RFQ)" },
				body: {
					en: "Collect vendor quotes side by side and award per line. Domestic mode compares plain THB; international mode ranks quotes by landed cost — FX, duty and freight included — so the cheapest unit price doesn't fool you.",
					th: "รวบรวมใบเสนอราคาจากผู้ขายมาเทียบกันแล้วเลือกผู้ชนะเป็นรายบรรทัด โหมดในประเทศเทียบราคาบาทตรง ๆ โหมดนำเข้าจัดอันดับตามต้นทุนถึงคลัง — รวม FX อากร และค่าขนส่ง — ราคาต่อหน่วยที่ถูกที่สุดจึงหลอกคุณไม่ได้"
				}
			},
			{
				title: { en: "Purchase order — goods and services", th: "ใบสั่งซื้อ — สินค้าและบริการ" },
				body: {
					en: "Awards become vendor-grouped POs. Service lines (freight, subcontract work) live on the same PO and post their cost straight to the job at receipt — no fake SKUs.",
					th: "ผลการคัดเลือกกลายเป็น PO จัดกลุ่มตามผู้ขาย รายการบริการ (ค่าขนส่ง งานจ้างภายนอก) อยู่บน PO เดียวกันและลงต้นทุนเข้างานทันทีเมื่อรับมอบ — ไม่ต้องสร้าง SKU ปลอม"
				}
			},
			{
				title: { en: "Goods receipt into stock", th: "รับของเข้าคลัง" },
				body: {
					en: "Receiving posts stock at true landed cost and re-averages inventory value (weighted-average costing). For imports, the Import Cost Card reconciles estimated duty and freight against actuals after arrival.",
					th: "การรับของบันทึกสต็อกด้วยต้นทุนถึงคลังจริงและเฉลี่ยมูลค่าคงคลังใหม่ (ต้นทุนเฉลี่ยถ่วงน้ำหนัก) งานนำเข้าใช้ Import Cost Card กระทบยอดอากรและค่าขนส่งประมาณการกับค่าใช้จ่ายจริงหลังของถึง"
				}
			},
			{
				title: { en: "Work order & production", th: "ใบสั่งผลิต" },
				body: {
					en: "Release a work order and materials are consumed by BOM. Routing covers in-house and subcontract steps; planned cost is snapshotted at release so variance against actual is visible, and QC holds quarantine suspect lots.",
					th: "ปล่อยใบสั่งผลิตแล้ววัตถุดิบถูกตัดตาม BOM ขั้นตอนการผลิตครอบคลุมทั้งในโรงงานและงานจ้างภายนอก ระบบบันทึกต้นทุนแผน ณ ตอนปล่อยงานให้เห็นส่วนต่างกับต้นทุนจริง และ QC hold กักล็อตที่มีปัญหาได้"
				}
			},
			{
				title: { en: "Delivery note", th: "ใบส่งของ" },
				body: {
					en: "Ship finished goods on a delivery note that issues stock and carries its cost into the job. Lot and serial genealogy means any shipped item traces back to its inputs.",
					th: "ส่งสินค้าสำเร็จรูปด้วยใบส่งของที่ตัดสต็อกและนำต้นทุนเข้างาน ระบบสืบย้อนล็อตและซีเรียลทำให้สินค้าทุกชิ้นที่ส่งออกไปตามกลับถึงวัตถุดิบต้นทางได้"
				}
			},
			{
				title: { en: "Job costing closes the loop", th: "ปิดวงจรด้วยต้นทุนงาน" },
				body: {
					en: "POs, work orders, deliveries, services and expenses roll into one job view with a live budget bar. Close the job and hand clean numbers to your accountant — Tonbab feeds accounting, it doesn't pretend to be one.",
					th: "PO ใบสั่งผลิต การส่งของ งานบริการ และค่าใช้จ่าย รวมเป็นมุมมองงานเดียวพร้อมแถบงบประมาณสด ปิดงานแล้วส่งตัวเลขสะอาด ๆ ให้ฝ่ายบัญชี — Tonbab ป้อนข้อมูลให้ระบบบัญชี ไม่ได้แกล้งเป็นระบบบัญชีเสียเอง"
				}
			}
		],
		diagram: [
			{ label: { en: "PR", th: "ใบขอซื้อ" }, sub: { en: "request + approval", th: "ขอซื้อ + อนุมัติ" } },
			{ label: { en: "RFQ", th: "เทียบราคา" }, sub: { en: "landed-cost ranking", th: "จัดอันดับต้นทุนจริง" } },
			{ label: { en: "PO", th: "ใบสั่งซื้อ" }, sub: { en: "goods + services", th: "สินค้า + บริการ" } },
			{ label: { en: "Goods receipt", th: "รับของ" }, sub: { en: "stock at AVCO", th: "สต็อกต้นทุนเฉลี่ย" } },
			{ label: { en: "Work order", th: "ใบสั่งผลิต" }, sub: { en: "BOM + routing + QC", th: "BOM + ขั้นตอน + QC" } },
			{ label: { en: "Delivery note", th: "ใบส่งของ" }, sub: { en: "issue + trace", th: "ตัดสต็อก + สืบย้อน" } },
			{ label: { en: "Job costing", th: "ต้นทุนงาน" }, sub: { en: "live budget bar", th: "แถบงบประมาณสด" } }
		],
		featureGroups: [
			{
				title: { en: "Procurement", th: "จัดซื้อ" },
				features: [
					{ title: { en: "Multi-stage PR approval", th: "อนุมัติ PR หลายชั้น" }, body: { en: "Approval chains with re-approval on substitution or edit, and a history timeline on every request.", th: "สายอนุมัติหลายชั้น แก้ไขหรือเปลี่ยนสินค้าต้องอนุมัติซ้ำ พร้อมไทม์ไลน์ประวัติบนทุกใบขอซื้อ" } },
					{ title: { en: "RFQ price comparison", th: "ตารางเปรียบเทียบราคา" }, body: { en: "Quotes side by side, per-line awards, domestic THB mode and international landed-cost mode.", th: "ใบเสนอราคาเทียบกันเป็นตาราง เลือกผู้ชนะรายบรรทัด มีโหมดในประเทศ (บาท) และโหมดนำเข้า (ต้นทุนถึงคลัง)" } },
					{ title: { en: "Vendor-grouped POs", th: "PO จัดกลุ่มตามผู้ขาย" }, body: { en: "Awards collapse into one PO per vendor; agreed prices and minimum quantities live on the vendor-product record.", th: "ผลการคัดเลือกรวมเป็น PO เดียวต่อผู้ขาย ราคาตกลงและขั้นต่ำการสั่งซื้อเก็บบนข้อมูลผู้ขาย-สินค้า" } },
					{ title: { en: "Service PO lines", th: "รายการบริการบน PO" }, body: { en: "Freight and subcontract services on the same PO — no fake SKUs, cost posts to the job at receipt.", th: "ค่าขนส่งและงานจ้างภายนอกอยู่บน PO เดียวกัน — ไม่ต้องสร้าง SKU ปลอม ต้นทุนลงเข้างานเมื่อรับมอบ" } },
					{ title: { en: "Shortage-driven draft PRs", th: "ร่าง PR จากของขาด" }, body: { en: "Work-order material shortages pool by vendor into draft PRs — proposed for review, never auto-submitted.", th: "วัตถุดิบขาดจากใบสั่งผลิตถูกรวมตามผู้ขายเป็นร่าง PR — ระบบเสนอให้ตรวจ แต่ไม่ส่งอนุมัติเอง" } }
				]
			},
			{
				title: { en: "Imports & landed cost", th: "งานนำเข้าและต้นทุนถึงคลัง" },
				features: [
					{ title: { en: "Import Cost Card", th: "Import Cost Card" }, body: { en: "FX, Incoterms, HS codes, duty and freight per import — estimated at order, reconciled to actuals after arrival.", th: "FX, Incoterms, HS code, อากร และค่าขนส่งต่อการนำเข้าแต่ละครั้ง — ประมาณการตอนสั่ง กระทบยอดกับค่าจริงหลังของถึง" } },
					{ title: { en: "Landed cost into inventory", th: "ต้นทุนนำเข้าเข้าคลังจริง" }, body: { en: "Duty and freight land in the unit cost of stock, so margins and job costs use the true number.", th: "อากรและค่าขนส่งถูกรวมเข้าต้นทุนต่อหน่วยของสต็อก กำไรและต้นทุนงานจึงใช้ตัวเลขจริง" } },
					{ title: { en: "Per-vendor currency", th: "สกุลเงินรายผู้ขาย" }, body: { en: "A THB vendor inside an import RFQ stays plain THB — no FX noise where it doesn't belong.", th: "ผู้ขายในประเทศที่อยู่ใน RFQ นำเข้า ยังคงเป็นราคาบาทล้วน — ไม่มี FX มาปนในที่ที่ไม่ควรมี" } }
				]
			},
			{
				title: { en: "Inventory", th: "คลังสินค้า" },
				features: [
					{ title: { en: "Weighted-average costing", th: "ต้นทุนเฉลี่ยถ่วงน้ำหนัก" }, body: { en: "Real-time stock value across warehouses; adjustments require a unit cost so valuation never drifts silently.", th: "มูลค่าสต็อกเรียลไทม์ทุกคลัง การปรับปรุงต้องระบุต้นทุนต่อหน่วยเสมอ มูลค่าคลังจึงไม่เพี้ยนแบบเงียบ ๆ" } },
					{ title: { en: "Internal & external warehouses", th: "คลังภายในและภายนอก" }, body: { en: "Own warehouses plus subcontractor and customer locations — transfers move stock between all of them.", th: "คลังของบริษัทเอง บวกคลังที่ผู้รับจ้างช่วงและที่ลูกค้า — โอนย้ายสต็อกระหว่างกันได้ทั้งหมด" } },
					{ title: { en: "Lot & serial traceability", th: "ติดตามล็อตและซีเรียล" }, body: { en: "FEFO picking, QC hold and quarantine, forward and backward genealogy — find every affected item in seconds.", th: "หยิบแบบ FEFO, กัก QC และ quarantine, สืบย้อนไปข้างหน้า-ถอยหลัง — หาสินค้าที่กระทบได้ในไม่กี่วินาที" } },
					{ title: { en: "Full movement history", th: "ประวัติการเคลื่อนไหวครบ" }, body: { en: "Every receipt, issue, transfer and adjustment is a ledger entry with who, when, and which document.", th: "ทุกการรับ จ่าย โอน และปรับปรุง เป็นรายการบัญชีสต็อกที่บอกว่าใครทำ เมื่อไหร่ อ้างเอกสารใบไหน" } }
				]
			},
			{
				title: { en: "Manufacturing", th: "การผลิต" },
				features: [
					{ title: { en: "BOM consumption", th: "ตัดวัตถุดิบตาม BOM" }, body: { en: "Release a work order and materials issue by bill of materials, from whichever warehouse holds them.", th: "ปล่อยใบสั่งผลิตแล้ววัตถุดิบถูกตัดตามสูตรการผลิต จากคลังไหนก็ได้ที่มีของ" } },
					{ title: { en: "Routing with subcontract steps", th: "ขั้นตอนผลิตรวมงานจ้างภายนอก" }, body: { en: "Model in-house and outsourced steps in one route; subcontract cost arrives via service PO lines.", th: "วางขั้นตอนทั้งในโรงงานและจ้างภายนอกในเส้นทางเดียว ต้นทุนจ้างช่วงเข้ามาทางรายการบริการบน PO" } },
					{ title: { en: "Yield, scrap & variance", th: "ผลผลิต ของเสีย และส่วนต่าง" }, body: { en: "Planned cost snapshotted at release; record yield and scrap and see variance to actual per order.", th: "บันทึกต้นทุนแผน ณ ตอนปล่อยงาน กรอกผลผลิตและของเสียแล้วเห็นส่วนต่างกับต้นทุนจริงรายใบสั่ง" } },
					{ title: { en: "QC hold & quarantine", th: "กัก QC และ quarantine" }, body: { en: "Suspect lots are quarantined out of available stock until QC releases them.", th: "ล็อตที่สงสัยถูกกักออกจากสต็อกพร้อมใช้ จนกว่า QC จะปล่อยผ่าน" } }
				]
			},
			{
				title: { en: "Job costing & delivery", th: "ต้นทุนงานและการส่งมอบ" },
				features: [
					{ title: { en: "Live budget bar", th: "แถบงบประมาณสด" }, body: { en: "One job view rolls up PO commitments, material issues, services and expenses against budget, live.", th: "มุมมองงานเดียวรวมภาระผูกพันจาก PO การเบิกวัตถุดิบ งานบริการ และค่าใช้จ่าย เทียบงบประมาณแบบสด" } },
					{ title: { en: "Delivery notes that cost", th: "ใบส่งของที่คิดต้นทุน" }, body: { en: "Shipping issues stock at its true average cost and books it to the job — no end-of-month surprises.", th: "การส่งของตัดสต็อกด้วยต้นทุนเฉลี่ยจริงและบันทึกเข้างาน — ไม่มีเซอร์ไพรส์ตอนสิ้นเดือน" } },
					{ title: { en: "Hand-off to accounting", th: "ส่งต่อให้ฝ่ายบัญชี" }, body: { en: "Tonbab deliberately does not do bookkeeping — it closes the job with clean, exportable numbers for your accounting system.", th: "Tonbab ตั้งใจไม่ทำบัญชีแยกประเภทเอง — แต่ปิดงานด้วยตัวเลขสะอาดพร้อมส่งออกให้ระบบบัญชีของคุณ" } }
				]
			}
		],
		whoFor: [
			{ en: "Manufacturers and assemblers who need BOM, routing and true production cost per order.", th: "โรงงานผลิตและประกอบ ที่ต้องการ BOM ขั้นตอนผลิต และต้นทุนผลิตจริงรายออเดอร์" },
			{ en: "Importer-distributors who live and die by landed cost, FX and duty.", th: "ผู้นำเข้า-จัดจำหน่าย ที่อยู่ได้ด้วยต้นทุนถึงคลัง FX และอากรที่แม่นยำ" },
			{ en: "Project and made-to-order businesses that quote a job and must know if it made money.", th: "ธุรกิจรับทำตามสั่งหรือรายโปรเจกต์ ที่เสนอราคางานแล้วต้องรู้ว่างานนั้นกำไรหรือขาดทุน" },
			{ en: "Teams graduating from spreadsheets who want approvals and traceability without SAP-scale pain.", th: "ทีมที่โตเกินสเปรดชีต อยากได้การอนุมัติและการตรวจสอบย้อนกลับ โดยไม่ต้องเจ็บตัวระดับ SAP" }
		],
		faq: [
			{
				q: { en: "Does Tonbab include accounting?", th: "Tonbab มีระบบบัญชีไหม" },
				a: { en: "No — deliberately. Tonbab handles the operational documents and costing, then exports clean numbers for your accountant or accounting software. Most Thai SMEs already have an accountant they trust.", th: "ไม่มี — โดยตั้งใจ Tonbab ดูแลเอกสารปฏิบัติการและต้นทุน แล้วส่งออกตัวเลขสะอาด ๆ ให้สำนักงานบัญชีหรือโปรแกรมบัญชีของคุณ SME ไทยส่วนใหญ่มีนักบัญชีที่ไว้ใจอยู่แล้ว" }
			},
			{
				q: { en: "How is inventory valued?", th: "คลังสินค้าคิดมูลค่าอย่างไร" },
				a: { en: "Weighted-average cost (AVCO), recalculated on every receipt. Lot-tracked items pick by FEFO — first expired, first out.", th: "ต้นทุนเฉลี่ยถ่วงน้ำหนัก (AVCO) คำนวณใหม่ทุกครั้งที่รับของ สินค้าที่ติดตามล็อตหยิบแบบ FEFO — หมดอายุก่อน จ่ายก่อน" }
			},
			{
				q: { en: "Can it really handle imports?", th: "งานนำเข้าเอาอยู่จริงไหม" },
				a: { en: "Yes — the Import Cost Card carries FX, Incoterms, HS codes, duty and freight, estimates landed cost at order time, and reconciles against actual charges after the shipment arrives.", th: "ได้จริง — Import Cost Card เก็บ FX, Incoterms, HS code, อากร และค่าขนส่ง ประมาณต้นทุนถึงคลังตั้งแต่ตอนสั่ง และกระทบยอดกับค่าใช้จ่ายจริงหลังของถึง" }
			},
			{
				q: { en: "Do we have to adopt everything at once?", th: "ต้องใช้ทุกอย่างพร้อมกันเลยไหม" },
				a: { en: "No. Modules are enabled per organization — many teams start with purchasing and inventory, then switch on manufacturing and job costing when ready.", th: "ไม่ต้อง โมดูลเปิดใช้เป็นรายองค์กร หลายทีมเริ่มจากจัดซื้อกับคลังสินค้า แล้วค่อยเปิดการผลิตและต้นทุนงานเมื่อพร้อม" }
			}
		],
		related: ["crm", "commerce"]
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
		heroArt: "/api/media/tnb-art-module-people",
		heroArtAlt: {
			en: "Illustration of the People module: employee records, leave, time and recruitment for Thai teams",
			th: "ภาพประกอบโมดูล People: ทะเบียนพนักงาน วันลา เวลาทำงาน และการสรรหาสำหรับทีมไทย"
		},
		screenshotCaption: {
			en: "Employee self-service — leave, time and OT on any phone",
			th: "พนักงานทำรายการเอง — วันลา เวลาทำงาน และ OT บนมือถือทุกเครื่อง"
		},
		workflow: [
			{
				title: { en: "Post the job on your careers page", th: "ลงประกาศงานบนหน้ารับสมัคร" },
				body: {
					en: "Every organization gets a public careers page. Post a role and candidates apply through a full Thai application form — no third-party job-board account required.",
					th: "ทุกองค์กรมีหน้ารับสมัครงานสาธารณะของตัวเอง ลงประกาศแล้วผู้สมัครกรอกใบสมัครภาษาไทยฉบับเต็มได้เลย — ไม่ต้องพึ่งบัญชีเว็บหางานภายนอก"
				}
			},
			{
				title: { en: "Run candidates through the ATS", th: "คัดผู้สมัครผ่านไปป์ไลน์ ATS" },
				body: {
					en: "Move applicants through pipeline stages, let them self-schedule interviews, and manage offers in one place instead of a LINE group and a spreadsheet.",
					th: "เลื่อนผู้สมัครผ่านขั้นตอนคัดเลือก ให้ผู้สมัครเลือกเวลาสัมภาษณ์เอง และจัดการข้อเสนองานในที่เดียว แทนที่จะใช้กลุ่ม LINE กับสเปรดชีต"
				}
			},
			{
				title: { en: "Offer, contract e-accept, onboarding", th: "ข้อเสนอ เซ็นสัญญาออนไลน์ onboarding" },
				body: {
					en: "The chosen candidate accepts the contract online, submits onboarding documents, and converts into an employee record with one action — nothing re-keyed.",
					th: "ผู้สมัครที่ได้รับเลือกตอบรับสัญญาออนไลน์ ส่งเอกสาร onboarding แล้วแปลงเป็นทะเบียนพนักงานได้ในคลิกเดียว — ไม่ต้องคีย์ข้อมูลซ้ำ"
				}
			},
			{
				title: { en: "The employee record, in Thai", th: "ทะเบียนพนักงานแบบไทย" },
				body: {
					en: "Bilingual Thai/English names with nicknames, social security fields, documents with expiry alerts, and salary history gated behind a separate permission from ordinary personal data.",
					th: "ชื่อไทย/อังกฤษพร้อมชื่อเล่น ข้อมูลประกันสังคม เอกสารพนักงานพร้อมแจ้งเตือนวันหมดอายุ และประวัติเงินเดือนที่ล็อกสิทธิ์แยกจากข้อมูลส่วนตัวทั่วไป"
				}
			},
			{
				title: { en: "Daily life: leave, time, OT, expenses", th: "ชีวิตประจำวัน: ลา เวลา OT เบิกเงิน" },
				body: {
					en: "Staff clock in and out, request leave against Thai-law entitlements, submit OT for approval, and file expense claims and cash advances — all from a phone, as an installable app.",
					th: "พนักงานลงเวลาเข้า-ออก ขอลาตามสิทธิ์กฎหมายไทย ส่ง OT ให้อนุมัติ และเบิกค่าใช้จ่ายกับเงินทดรองจ่าย — ทั้งหมดจากมือถือ ติดตั้งเป็นแอปได้"
				}
			},
			{
				title: { en: "Month-end: export to payroll", th: "สิ้นเดือน: ส่งออกให้ทำเงินเดือน" },
				body: {
					en: "One export of the month's time, leave and OT as PDF/Excel for your payroll provider. Tonbab does not calculate payroll — it hands your provider clean inputs.",
					th: "ส่งออกเวลา วันลา และ OT ของเดือนเป็น PDF/Excel ให้ผู้ทำเงินเดือนในไฟล์เดียว Tonbab ไม่ได้คำนวณเงินเดือนเอง — แต่ส่งข้อมูลตั้งต้นสะอาด ๆ ให้ผู้ทำเงินเดือนของคุณ"
				}
			}
		],
		diagram: [
			{ label: { en: "Careers page", th: "หน้ารับสมัคร" }, sub: { en: "public job posts", th: "ประกาศงานสาธารณะ" } },
			{ label: { en: "ATS pipeline", th: "คัดผู้สมัคร" }, sub: { en: "interviews + offers", th: "สัมภาษณ์ + ข้อเสนอ" } },
			{ label: { en: "Contract e-accept", th: "เซ็นสัญญาออนไลน์" }, sub: { en: "onboarding docs", th: "เอกสาร onboarding" } },
			{ label: { en: "Employee record", th: "ทะเบียนพนักงาน" }, sub: { en: "Thai fields + RBAC", th: "ฟิลด์ไทย + สิทธิ์เข้าถึง" } },
			{ label: { en: "Leave · Time · OT", th: "ลา · เวลา · OT" }, sub: { en: "self-service app", th: "ทำรายการเองบนมือถือ" } },
			{ label: { en: "Expenses", th: "เบิกค่าใช้จ่าย" }, sub: { en: "claims + advances", th: "เบิกจ่าย + เงินทดรอง" } },
			{ label: { en: "Payroll export", th: "ส่งออกเงินเดือน" }, sub: { en: "PDF / Excel", th: "PDF / Excel" } }
		],
		featureGroups: [
			{
				title: { en: "Employee records", th: "ทะเบียนพนักงาน" },
				features: [
					{ title: { en: "Bilingual Thai/English names", th: "ชื่อไทย/อังกฤษ" }, body: { en: "First and last names in both languages plus nicknames, with display names composed automatically.", th: "ชื่อ-นามสกุลสองภาษา พร้อมชื่อเล่น ระบบประกอบชื่อที่แสดงให้อัตโนมัติ" } },
					{ title: { en: "Thai statutory fields", th: "ข้อมูลตามกฎหมายไทย" }, body: { en: "Social security and the employee fields Thai HR paperwork actually asks for — not a Western template with Thailand bolted on.", th: "ประกันสังคมและฟิลด์พนักงานที่เอกสาร HR ไทยถามจริง — ไม่ใช่ฟอร์มฝรั่งที่เอาประเทศไทยไปแปะทีหลัง" } },
					{ title: { en: "Salary behind its own permission", th: "เงินเดือนล็อกสิทธิ์แยก" }, body: { en: "Salary history is a separate permission from ordinary personal data — HR admins see it, line managers don't have to.", th: "ประวัติเงินเดือนใช้สิทธิ์แยกจากข้อมูลส่วนตัวทั่วไป — HR เห็นได้ หัวหน้างานไม่จำเป็นต้องเห็น" } },
					{ title: { en: "Documents with expiry alerts", th: "เอกสารพร้อมแจ้งเตือนหมดอายุ" }, body: { en: "Store employee documents and get alerted before certificates and IDs expire.", th: "เก็บเอกสารพนักงานและรับแจ้งเตือนก่อนใบรับรองหรือบัตรหมดอายุ" } },
					{ title: { en: "Org chart", th: "ผังองค์กร" }, body: { en: "Hierarchy view of who reports to whom, plus anniversaries and new-hire dashboards.", th: "ผังสายบังคับบัญชา พร้อมวันครบรอบงานและแดชบอร์ดพนักงานใหม่" } }
				]
			},
			{
				title: { en: "Leave", th: "วันลา" },
				features: [
					{ title: { en: "Thai leave-law presets", th: "ประเภทวันลาตามกฎหมายไทย" }, body: { en: "Sick, personal, annual, maternity and more, seeded from Thai labour law and editable to your policy.", th: "ลาป่วย ลากิจ พักร้อน ลาคลอด และอื่น ๆ ตั้งต้นตามกฎหมายแรงงานไทย และแก้ตามนโยบายบริษัทได้" } },
					{ title: { en: "Eligibility rules", th: "เงื่อนไขสิทธิ์การลา" }, body: { en: "Gender eligibility, tenure gates, accrual, carry-over and encashment options per leave type.", th: "เงื่อนไขเพศ อายุงาน การสะสมวันลา ยกยอด และแลกเงิน กำหนดได้รายประเภท" } },
					{ title: { en: "Request & approve in-app", th: "ขอ-อนุมัติในแอป" }, body: { en: "Staff see their remaining balance and request from a phone; approvers act from theirs.", th: "พนักงานเห็นวันลาคงเหลือและยื่นขอจากมือถือ ผู้อนุมัติกดอนุมัติจากมือถือเช่นกัน" } }
				]
			},
			{
				title: { en: "Time & overtime", th: "เวลาทำงานและ OT" },
				features: [
					{ title: { en: "Clock in / clock out", th: "ลงเวลาเข้า-ออก" }, body: { en: "Daily attendance with exception classification for late, absent and missing punches.", th: "บันทึกเวลารายวัน พร้อมจัดประเภทความผิดปกติ เช่น มาสาย ขาดงาน ลืมลงเวลา" } },
					{ title: { en: "OT requests & approval", th: "ขอและอนุมัติ OT" }, body: { en: "Overtime is requested and approved, not assumed — so the month-end numbers are defensible.", th: "OT ต้องขอและได้รับอนุมัติ ไม่ใช่นับเหมาเอาเอง — ตัวเลขสิ้นเดือนจึงมีที่มาที่ไป" } },
					{ title: { en: "Monthly analytics", th: "สถิติรายเดือน" }, body: { en: "Attendance and OT summaries per person and per team, ready before payroll day.", th: "สรุปเวลาทำงานและ OT รายคนรายทีม พร้อมก่อนวันทำเงินเดือน" } }
				]
			},
			{
				title: { en: "Expenses & payroll hand-off", th: "เบิกจ่ายและส่งต่อเงินเดือน" },
				features: [
					{ title: { en: "Expense claims", th: "เบิกค่าใช้จ่าย" }, body: { en: "Employees file claims with receipts; approvals happen in the same app.", th: "พนักงานยื่นเบิกพร้อมใบเสร็จ อนุมัติในแอปเดียวกัน" } },
					{ title: { en: "Cash advances", th: "เงินทดรองจ่าย" }, body: { en: "Request an advance for a trip or a job, then clear it against actual expenses.", th: "ขอเงินทดรองสำหรับทริปหรืองาน แล้วเคลียร์กับค่าใช้จ่ายจริงภายหลัง" } },
					{ title: { en: "Payroll-ready exports", th: "ไฟล์พร้อมทำเงินเดือน" }, body: { en: "Monthly time + leave PDF/Excel summaries for your payroll provider — Tonbab does not replace them, it feeds them clean data.", th: "สรุปเวลา + วันลารายเดือนเป็น PDF/Excel ให้ผู้ทำเงินเดือนของคุณ — Tonbab ไม่ได้มาแทน แต่ส่งข้อมูลสะอาดให้" } }
				]
			},
			{
				title: { en: "Recruitment", th: "การสรรหา" },
				features: [
					{ title: { en: "Public careers pages", th: "หน้ารับสมัครงานสาธารณะ" }, body: { en: "Your own hosted careers page with open roles and a full Thai application form.", th: "หน้ารับสมัครงานของบริษัทเอง พร้อมตำแหน่งที่เปิดรับและใบสมัครภาษาไทยครบถ้วน" } },
					{ title: { en: "ATS pipeline & self-scheduling", th: "ไปป์ไลน์ผู้สมัครและนัดสัมภาษณ์เอง" }, body: { en: "Stage-based candidate pipeline; candidates pick their own interview slots.", th: "ไปป์ไลน์คัดเลือกเป็นขั้นตอน ผู้สมัครเลือกช่วงเวลาสัมภาษณ์ได้ด้วยตนเอง" } },
					{ title: { en: "Offers & contract e-accept", th: "ข้อเสนอและเซ็นสัญญาออนไลน์" }, body: { en: "Send the offer, get the contract accepted online, collect onboarding documents.", th: "ส่งข้อเสนอ ให้ผู้สมัครตอบรับสัญญาออนไลน์ และเก็บเอกสาร onboarding" } },
					{ title: { en: "Convert to employee", th: "แปลงเป็นพนักงาน" }, body: { en: "One action turns an accepted candidate into an employee record with a start date — no re-keying.", th: "คลิกเดียว ผู้สมัครที่ตอบรับกลายเป็นทะเบียนพนักงานพร้อมวันเริ่มงาน — ไม่ต้องคีย์ซ้ำ" } }
				]
			}
		],
		whoFor: [
			{ en: "Thai SMEs whose HR still lives in paper forms, LINE groups and one overloaded spreadsheet.", th: "SME ไทยที่งาน HR ยังอยู่ในแบบฟอร์มกระดาษ กลุ่ม LINE และสเปรดชีตที่รับภาระเกินตัวหนึ่งไฟล์" },
			{ en: "Factories and field teams that need phone-first clock-in and OT approval.", th: "โรงงานและทีมภาคสนาม ที่ต้องลงเวลาและอนุมัติ OT ผ่านมือถือเป็นหลัก" },
			{ en: "Growing companies hiring regularly who want a real careers page and ATS without an extra subscription.", th: "บริษัทที่กำลังโตและรับคนสม่ำเสมอ อยากได้หน้ารับสมัครงานและ ATS จริง ๆ โดยไม่ต้องจ่ายค่าบริการเพิ่มอีกระบบ" },
			{ en: "Teams that already outsource payroll and just need clean monthly inputs for it.", th: "ทีมที่จ้างทำเงินเดือนภายนอกอยู่แล้ว และต้องการข้อมูลรายเดือนที่สะอาดส่งให้เท่านั้น" }
		],
		faq: [
			{
				q: { en: "Does Tonbab calculate payroll?", th: "Tonbab คำนวณเงินเดือนไหม" },
				a: { en: "No. Tonbab prepares the inputs — time, leave, OT — as monthly PDF/Excel exports for your payroll provider or accountant. Payroll tax filing stays with the experts you already use.", th: "ไม่ Tonbab เตรียมข้อมูลตั้งต้น — เวลา วันลา OT — เป็นไฟล์ PDF/Excel รายเดือนให้ผู้ทำเงินเดือนหรือนักบัญชีของคุณ การยื่นภาษีเงินเดือนยังอยู่กับมืออาชีพที่คุณใช้อยู่แล้ว" }
			},
			{
				q: { en: "Are the leave types really Thai-law based?", th: "ประเภทวันลาอิงกฎหมายไทยจริงไหม" },
				a: { en: "Yes — leave types are seeded from Thai labour-law entitlements (sick, personal, annual, maternity and more) and every rule is editable to match your own policy.", th: "จริง — ประเภทวันลาตั้งต้นจากสิทธิ์ตามกฎหมายแรงงานไทย (ลาป่วย ลากิจ พักร้อน ลาคลอด ฯลฯ) และทุกเงื่อนไขแก้ให้ตรงนโยบายบริษัทได้" }
			},
			{
				q: { en: "Who can see salaries?", th: "ใครเห็นเงินเดือนได้บ้าง" },
				a: { en: "Only roles granted the salary permission — it is separate from the permission for ordinary personal data, so managers can run their teams without seeing pay.", th: "เฉพาะบทบาทที่ได้รับสิทธิ์ดูเงินเดือน — แยกจากสิทธิ์ดูข้อมูลส่วนตัวทั่วไป หัวหน้างานจึงดูแลทีมได้โดยไม่เห็นเงินเดือน" }
			},
			{
				q: { en: "Do employees need to install anything?", th: "พนักงานต้องติดตั้งอะไรไหม" },
				a: { en: "No app store needed — Tonbab is an installable web app (PWA). Employees open a link on any phone and add it to their home screen.", th: "ไม่ต้องผ่าน app store — Tonbab เป็นเว็บแอปที่ติดตั้งได้ (PWA) พนักงานเปิดลิงก์บนมือถือเครื่องไหนก็ได้แล้วเพิ่มลงหน้าจอหลัก" }
			}
		],
		related: ["operation"]
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
		heroArt: "/api/media/tnb-art-module-commerce",
		heroArtAlt: {
			en: "Illustration of the Commerce module: POS, marketplaces and chat sharing one inventory ledger",
			th: "ภาพประกอบโมดูล Commerce: POS มาร์เก็ตเพลส และแชท ใช้บัญชีสต็อกเดียวกัน"
		},
		screenshotCaption: {
			en: "The POS — product grid, cart and PromptPay QR on a tablet",
			th: "หน้าจอ POS — ตารางสินค้า ตะกร้า และ PromptPay QR บนแท็บเล็ต"
		},
		workflow: [
			{
				title: { en: "Curate the catalog per store", th: "เลือกสินค้าขึ้นหน้าร้านแต่ละสาขา" },
				body: {
					en: "Your product master already exists in Tonbab. Choose which products each POS store sells and at what VAT-inclusive price — no duplicate product list to maintain.",
					th: "ฐานข้อมูลสินค้าของคุณอยู่ใน Tonbab อยู่แล้ว เลือกว่าร้าน POS แต่ละสาขาขายสินค้าตัวไหนในราคารวม VAT เท่าไร — ไม่ต้องดูแลรายการสินค้าซ้ำอีกชุด"
				}
			},
			{
				title: { en: "Sell at the counter", th: "ขายหน้าเคาน์เตอร์" },
				body: {
					en: "The POS installs on any tablet or phone as a web app. Cashiers ring up from a product grid, apply line discounts, and take cash, PromptPay QR or cards — QR and card payments run through Beam and confirm automatically.",
					th: "POS ติดตั้งบนแท็บเล็ตหรือมือถือเป็นเว็บแอป แคชเชียร์ขายจากตารางสินค้า ใส่ส่วนลดรายบรรทัด รับเงินสด PromptPay QR หรือบัตร — QR และบัตรวิ่งผ่าน Beam และยืนยันยอดอัตโนมัติ"
				}
			},
			{
				title: { en: "Close the shift", th: "ปิดกะ" },
				body: {
					en: "Open and close shifts per operator with cash reconciliation, so every baht in the drawer has a story. Receipts print at 80mm or go out as e-receipts.",
					th: "เปิด-ปิดกะรายพนักงานพร้อมกระทบยอดเงินสด เงินทุกบาทในลิ้นชักจึงมีที่มา ใบเสร็จพิมพ์ขนาด 80mm หรือส่งเป็น e-receipt ก็ได้"
				}
			},
			{
				title: { en: "Take orders from everywhere", th: "รับออเดอร์จากทุกช่องทาง" },
				body: {
					en: "Shopee and Lazada orders pull in automatically after a one-time per-shop connection. Staff can also key orders directly and send a payment link by email or QR — the webhook confirms payment and cuts stock exactly once.",
					th: "ออเดอร์จาก Shopee และ Lazada ดึงเข้ามาอัตโนมัติหลังเชื่อมต่อร้านครั้งเดียว พนักงานยังสร้างออเดอร์เองแล้วส่งลิงก์ชำระเงินทางอีเมลหรือ QR ได้ — webhook ยืนยันการจ่ายและตัดสต็อกเพียงครั้งเดียวแน่นอน"
				}
			},
			{
				title: { en: "Reserve, pick, pack", th: "จองสต็อก หยิบ แพ็ก" },
				body: {
					en: "Confirmed orders reserve stock so two channels can't sell the same unit. Warehouse staff work a pick/pack flow instead of screenshots in a chat group.",
					th: "ออเดอร์ที่ยืนยันแล้วจองสต็อกทันที สองช่องทางจึงขายของชิ้นเดียวกันซ้ำไม่ได้ ทีมคลังทำงานตามขั้นตอนหยิบ-แพ็ก แทนการส่งภาพหน้าจอในกลุ่มแชท"
				}
			},
			{
				title: { en: "Ship — including partial", th: "จัดส่ง — แยกส่งบางส่วนได้" },
				body: {
					en: "Ship whole orders or per-line partials; stock issues at actual ship time. Marketplace orders push tracking back with carrier AWB labels.",
					th: "ส่งทั้งออเดอร์หรือแยกส่งเป็นรายบรรทัด สต็อกถูกตัดเมื่อส่งจริง ออเดอร์มาร์เก็ตเพลสส่งเลขพัสดุกลับพร้อมป้าย AWB ของขนส่ง"
				}
			},
			{
				title: { en: "Answer chats beside the order", th: "ตอบแชทข้าง ๆ ออเดอร์" },
				body: {
					en: "Customer messages from LINE OA, Facebook Messenger and Instagram DMs arrive in one inbox next to that customer's orders — staff reply with the context in front of them.",
					th: "ข้อความลูกค้าจาก LINE OA, Facebook Messenger และ Instagram DM เข้ากล่องเดียว อยู่ข้างประวัติออเดอร์ของลูกค้าคนนั้น — พนักงานตอบโดยเห็นบริบทครบ"
				}
			},
			{
				title: { en: "One ledger stays true", th: "บัญชีสต็อกเดียว ตรงเสมอ" },
				body: {
					en: "POS sales, marketplace orders and factory movements all post to the same inventory ledger at weighted-average cost. Stock counts and margins mean the same thing everywhere.",
					th: "ยอดขาย POS ออเดอร์มาร์เก็ตเพลส และการเคลื่อนไหวฝั่งโรงงาน ลงบัญชีสต็อกเดียวกันด้วยต้นทุนเฉลี่ยถ่วงน้ำหนัก ตัวเลขสต็อกและกำไรจึงหมายถึงสิ่งเดียวกันทุกที่"
				}
			}
		],
		diagram: [
			{ label: { en: "Catalog", th: "แคตตาล็อก" }, sub: { en: "per-store curation", th: "เลือกสินค้ารายสาขา" } },
			{ label: { en: "POS sale", th: "ขายหน้าร้าน" }, sub: { en: "cash · QR · card", th: "เงินสด · QR · บัตร" } },
			{ label: { en: "Online orders", th: "ออเดอร์ออนไลน์" }, sub: { en: "Shopee · Lazada · links", th: "Shopee · Lazada · ลิงก์" } },
			{ label: { en: "Reserve", th: "จองสต็อก" }, sub: { en: "no double-sell", th: "ไม่ขายซ้ำซ้อน" } },
			{ label: { en: "Pick & pack", th: "หยิบ & แพ็ก" }, sub: { en: "warehouse flow", th: "ขั้นตอนฝั่งคลัง" } },
			{ label: { en: "Ship", th: "จัดส่ง" }, sub: { en: "AWB + partials", th: "AWB + แยกส่งได้" } },
			{ label: { en: "One stock ledger", th: "บัญชีสต็อกเดียว" }, sub: { en: "shared with factory", th: "ร่วมกับฝั่งโรงงาน" } }
		],
		featureGroups: [
			{
				title: { en: "Point of sale", th: "หน้าร้าน (POS)" },
				features: [
					{ title: { en: "Installs on any device", th: "ติดตั้งได้ทุกเครื่อง" }, body: { en: "An installable web app for tablets and phones — no proprietary hardware, no app store.", th: "เว็บแอปติดตั้งได้บนแท็บเล็ตและมือถือ — ไม่ต้องซื้อฮาร์ดแวร์เฉพาะ ไม่ต้องผ่าน app store" } },
					{ title: { en: "PromptPay QR & cards via Beam", th: "PromptPay QR และบัตรผ่าน Beam" }, body: { en: "Cashless payments confirm by webhook and cut stock idempotently — a retried webhook never double-sells.", th: "การชำระไร้เงินสดยืนยันผ่าน webhook และตัดสต็อกแบบไม่ซ้ำ — webhook ยิงซ้ำก็ไม่ตัดของสองรอบ" } },
					{ title: { en: "Shift open/close & reconcile", th: "เปิด-ปิดกะและกระทบยอด" }, body: { en: "Per-operator shifts with cash counts, so discrepancies surface the same day.", th: "กะรายพนักงานพร้อมนับเงินสด ส่วนต่างโผล่ให้เห็นภายในวันเดียวกัน" } },
					{ title: { en: "Receipts & e-receipts", th: "ใบเสร็จและ e-receipt" }, body: { en: "80mm printed receipts or digital receipts, plus line discounts recorded per sale.", th: "ใบเสร็จพิมพ์ 80mm หรือใบเสร็จดิจิทัล พร้อมบันทึกส่วนลดรายบรรทัดทุกการขาย" } },
					{ title: { en: "Thai full-form tax invoice", th: "ใบกำกับภาษีเต็มรูป" }, body: { en: "Full-form tax invoices with branch IDs and VAT-inclusive pricing modes.", th: "ใบกำกับภาษีเต็มรูปพร้อมรหัสสาขา และโหมดราคารวม VAT" } }
				]
			},
			{
				title: { en: "Orders & fulfillment", th: "ออเดอร์และการจัดส่ง" },
				features: [
					{ title: { en: "Reserve on order", th: "จองสต็อกเมื่อรับออเดอร์" }, body: { en: "Confirmed orders hold their stock so channels never fight over the last unit.", th: "ออเดอร์ที่ยืนยันแล้วล็อกสต็อกไว้ ช่องทางต่าง ๆ จึงไม่แย่งของชิ้นสุดท้ายกัน" } },
					{ title: { en: "Pick / pack flow", th: "ขั้นตอนหยิบ-แพ็ก" }, body: { en: "A worklist for warehouse staff from confirmation to handover.", th: "รายการงานให้ทีมคลังตั้งแต่ยืนยันจนส่งมอบขนส่ง" } },
					{ title: { en: "Partial shipment per line", th: "แยกส่งบางส่วนรายบรรทัด" }, body: { en: "Ship what's ready now; stock issues at real ship time, not at order time.", th: "ของพร้อมแค่ไหนส่งแค่นั้นก่อนได้ สต็อกถูกตัดตอนส่งจริง ไม่ใช่ตอนรับออเดอร์" } },
					{ title: { en: "Payment links", th: "ลิงก์รับชำระเงิน" }, body: { en: "Email or QR pay-links so customers pay on their own device; webhook confirms and cuts stock idempotently.", th: "ส่งลิงก์ชำระทางอีเมลหรือ QR ให้ลูกค้าจ่ายบนเครื่องตัวเอง webhook ยืนยันและตัดสต็อกแบบไม่ซ้ำ" } },
					{ title: { en: "Customers & insights", th: "ลูกค้าและข้อมูลเชิงลึก" }, body: { en: "Customer records with purchase history, plus a commerce dashboard of sales metrics.", th: "ข้อมูลลูกค้าพร้อมประวัติการซื้อ และแดชบอร์ดสรุปยอดขายฝั่ง Commerce" } }
				]
			},
			{
				title: { en: "Marketplaces", th: "มาร์เก็ตเพลส" },
				features: [
					{ title: { en: "Shopee & Lazada connection", th: "เชื่อมต่อ Shopee และ Lazada" }, body: { en: "One OAuth connection per shop — no API keys to copy around.", th: "เชื่อมต่อ OAuth ครั้งเดียวต่อร้าน — ไม่ต้องก๊อป API key ไปมา" } },
					{ title: { en: "Order pull", th: "ดึงออเดอร์เข้า" }, body: { en: "Marketplace orders land in the same order hub as POS and manual orders.", th: "ออเดอร์มาร์เก็ตเพลสเข้าศูนย์ออเดอร์เดียวกับ POS และออเดอร์ที่คีย์เอง" } },
					{ title: { en: "Stock push-back", th: "ส่งสต็อกกลับ" }, body: { en: "Tonbab pushes availability back to the marketplaces so listings reflect real stock.", th: "Tonbab ส่งจำนวนคงเหลือกลับไปมาร์เก็ตเพลส หน้าร้านออนไลน์จึงแสดงสต็อกจริง" } },
					{ title: { en: "Ship push with AWB", th: "แจ้งส่งพร้อม AWB" }, body: { en: "Mark shipped in Tonbab and the tracking plus carrier AWB label flow back to the marketplace.", th: "กดส่งใน Tonbab แล้วเลขพัสดุพร้อมป้าย AWB ของขนส่งไหลกลับไปมาร์เก็ตเพลสเอง" } }
				]
			},
			{
				title: { en: "Chat inbox", th: "กล่องแชท" },
				features: [
					{ title: { en: "LINE OA", th: "LINE OA" }, body: { en: "Messages to your LINE Official Account arrive in the shared inbox and staff reply from Tonbab.", th: "ข้อความถึง LINE Official Account เข้ากล่องรวม พนักงานตอบกลับจาก Tonbab ได้เลย" } },
					{ title: { en: "Facebook & Instagram DMs", th: "Facebook และ Instagram DM" }, body: { en: "Messenger and Instagram direct messages join the same inbox after connecting your pages.", th: "ข้อความ Messenger และ Instagram เข้ากล่องเดียวกันหลังเชื่อมต่อเพจของคุณ" } },
					{ title: { en: "Context beside the chat", th: "บริบทอยู่ข้างแชท" }, body: { en: "The customer's orders and details sit next to the conversation — no tab-switching to answer \"where is my order?\"", th: "ออเดอร์และข้อมูลลูกค้าอยู่ข้างบทสนทนา — ตอบคำถาม “ของถึงไหนแล้ว” ได้โดยไม่ต้องสลับแท็บ" } }
				]
			}
		],
		whoFor: [
			{ en: "Retailers and brand owners selling in-store and on Shopee/Lazada who are tired of stock drifting apart per channel.", th: "ร้านค้าปลีกและเจ้าของแบรนด์ที่ขายหน้าร้านและบน Shopee/Lazada แล้วเบื่อสต็อกแต่ละช่องทางไม่ตรงกัน" },
			{ en: "Manufacturers opening a storefront — factory stock and shop stock are finally the same number.", th: "โรงงานที่เปิดหน้าร้านขายเอง — สต็อกโรงงานกับสต็อกหน้าร้านเป็นตัวเลขเดียวกันเสียที" },
			{ en: "Shops that answer customers on LINE, Facebook and Instagram all day and lose track of who ordered what.", th: "ร้านที่ตอบลูกค้าทาง LINE, Facebook และ Instagram ทั้งวัน จนจำไม่ได้ว่าใครสั่งอะไรไปแล้ว" },
			{ en: "Anyone replacing a cash-only counter with PromptPay and cards without buying POS hardware.", th: "ธุรกิจที่อยากเปลี่ยนจากรับแต่เงินสดเป็น PromptPay และบัตร โดยไม่ต้องลงทุนฮาร์ดแวร์ POS" }
		],
		faq: [
			{
				q: { en: "What payment methods does the POS take?", th: "POS รับชำระเงินแบบไหนบ้าง" },
				a: { en: "Cash, PromptPay QR and cards. QR and card payments run through Beam and confirm by webhook; you can also send email/QR payment links for remote orders.", th: "เงินสด PromptPay QR และบัตร โดย QR กับบัตรวิ่งผ่าน Beam และยืนยันผ่าน webhook นอกจากนี้ยังส่งลิงก์ชำระเงินทางอีเมล/QR สำหรับออเดอร์ทางไกลได้" }
			},
			{
				q: { en: "Does the chat inbox cover Shopee and Lazada chat too?", th: "กล่องแชทรวมแชท Shopee และ Lazada ด้วยไหม" },
				a: { en: "Not yet — the inbox covers LINE OA, Facebook Messenger and Instagram DMs today. Shopee/Lazada buyer chat still happens in the seller apps; their orders, stock and shipping do sync with Tonbab.", th: "ยังไม่รวม — วันนี้กล่องแชทครอบคลุม LINE OA, Facebook Messenger และ Instagram DM ส่วนแชทผู้ซื้อ Shopee/Lazada ยังอยู่ในแอปผู้ขาย แต่ออเดอร์ สต็อก และการจัดส่งซิงค์กับ Tonbab แล้ว" }
			},
			{
				q: { en: "Do I need special POS hardware?", th: "ต้องซื้อฮาร์ดแวร์ POS ไหม" },
				a: { en: "No — the POS is an installable web app for any tablet or phone. For paper receipts it prints to standard 80mm receipt printers; e-receipts need no printer at all.", th: "ไม่ต้อง — POS เป็นเว็บแอปติดตั้งบนแท็บเล็ตหรือมือถือเครื่องไหนก็ได้ ใบเสร็จกระดาษพิมพ์กับเครื่องพิมพ์ใบเสร็จ 80mm มาตรฐาน หรือใช้ e-receipt ก็ไม่ต้องมีเครื่องพิมพ์เลย" }
			},
			{
				q: { en: "Can it issue a Thai tax invoice?", th: "ออกใบกำกับภาษีได้ไหม" },
				a: { en: "Yes — full-form tax invoices with branch IDs, with VAT-inclusive pricing handled correctly at the point of sale.", th: "ได้ — ใบกำกับภาษีเต็มรูปพร้อมรหัสสาขา และจัดการราคารวม VAT อย่างถูกต้องตั้งแต่จุดขาย" }
			}
		],
		related: ["operation", "crm"]
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
		heroArt: "/api/media/tnb-art-module-crm",
		heroArtAlt: {
			en: "Illustration of the CRM module: accounts, visit plans, pipeline board and the reorder loop",
			th: "ภาพประกอบโมดูล CRM: บัญชีลูกค้า แผนเยี่ยม บอร์ดไปป์ไลน์ และวงจรสั่งซื้อซ้ำ"
		},
		screenshotCaption: {
			en: "The pipeline board — deals with product lines, dragged between stages",
			th: "บอร์ดไปป์ไลน์ — ดีลพร้อมรายการสินค้า ลากเลื่อนระหว่างสเตจ"
		},
		workflow: [
			{
				title: { en: "Accounts and contacts, shared with ops", th: "บัญชีลูกค้าและผู้ติดต่อ ใช้ร่วมกับฝ่ายปฏิบัติการ" },
				body: {
					en: "CRM accounts are the same company records your delivery notes and orders already use — one database, so sales sees real purchase history, not a copy.",
					th: "บัญชีลูกค้าใน CRM คือข้อมูลบริษัทชุดเดียวกับที่ใบส่งของและออเดอร์ใช้อยู่แล้ว — ฐานข้อมูลเดียว ทีมขายจึงเห็นประวัติซื้อจริง ไม่ใช่สำเนา"
				}
			},
			{
				title: { en: "The reorder-due queue tells you who to call", th: "คิวถึงรอบสั่งซ้ำบอกว่าควรติดต่อใคร" },
				body: {
					en: "From each account's real purchase rhythm, Tonbab computes who is due — or overdue — to buy again and puts them in a daily worklist. No ML black box, just arithmetic on real orders.",
					th: "จากจังหวะการซื้อจริงของลูกค้าแต่ละราย Tonbab คำนวณว่าใครถึงรอบ — หรือเลยรอบ — สั่งซื้อซ้ำ แล้วจัดเป็นคิวงานรายวัน ไม่ใช่ ML กล่องดำ แต่เป็นเลขคณิตบนออเดอร์จริง"
				}
			},
			{
				title: { en: "Plan visits, check in on site", th: "วางแผนเยี่ยม เช็คอินหน้างาน" },
				body: {
					en: "Set a visit cadence per account. Reps check in with a photo and GPS, then close the visit with an outcome — managers see coverage without chasing reports.",
					th: "กำหนดรอบเยี่ยมรายลูกค้า เซลส์เช็คอินด้วยรูปถ่ายและ GPS แล้วปิดการเยี่ยมพร้อมผลลัพธ์ — ผู้จัดการเห็นความครอบคลุมโดยไม่ต้องตามทวงรายงาน"
				}
			},
			{
				title: { en: "Work deals on the pipeline board", th: "เดินดีลบนบอร์ดไปป์ไลน์" },
				body: {
					en: "Kanban boards with editable stages, including a dedicated board for government tenders. Deals carry product lines with quantities and prices — not just a value guess.",
					th: "บอร์ดคัมบังปรับสเตจได้ รวมบอร์ดเฉพาะสำหรับงานประมูลราชการ ดีลแนบรายการสินค้าพร้อมจำนวนและราคา — ไม่ใช่แค่ตัวเลขมูลค่าคาดเดา"
				}
			},
			{
				title: { en: "Forecast on weighted numbers", th: "พยากรณ์ด้วยตัวเลขถ่วงน้ำหนัก" },
				body: {
					en: "Stage-weighted pipeline forecasts and CRM reports management can defend, because the underlying orders and deals are in the same system.",
					th: "พยากรณ์ไปป์ไลน์ถ่วงน้ำหนักตามสเตจ และรายงาน CRM ที่ผู้บริหารกล้าอ้างอิง เพราะออเดอร์และดีลเบื้องหลังอยู่ในระบบเดียวกัน"
				}
			},
			{
				title: { en: "Win → Job Control → next reorder", th: "ชนะ → Job Control → รอบสั่งซ้ำถัดไป" },
				body: {
					en: "Close-won creates the Job Control that procurement and production execute. The resulting delivery feeds the account's purchase history — which schedules the next reorder-due entry. The loop closes itself.",
					th: "ปิดดีลชนะแล้วสร้าง Job Control ให้ฝ่ายจัดซื้อและผลิตดำเนินการต่อ การส่งมอบที่เกิดขึ้นกลายเป็นประวัติซื้อของลูกค้า — ซึ่งกำหนดรอบสั่งซ้ำครั้งถัดไปเอง วงจรปิดตัวมันเอง"
				}
			}
		],
		diagram: [
			{ label: { en: "Account", th: "บัญชีลูกค้า" }, sub: { en: "shared with ops", th: "ใช้ร่วมกับปฏิบัติการ" } },
			{ label: { en: "Reorder-due", th: "ถึงรอบสั่งซ้ำ" }, sub: { en: "from real orders", th: "จากออเดอร์จริง" } },
			{ label: { en: "Visit", th: "เยี่ยมลูกค้า" }, sub: { en: "photo + GPS check-in", th: "เช็คอินรูป + GPS" } },
			{ label: { en: "Deal", th: "ดีล" }, sub: { en: "product lines", th: "แนบรายการสินค้า" } },
			{ label: { en: "Forecast", th: "พยากรณ์" }, sub: { en: "stage-weighted", th: "ถ่วงน้ำหนักตามสเตจ" } },
			{ label: { en: "Won → Job", th: "ชนะ → งาน" }, sub: { en: "ops executes", th: "ส่งต่อฝ่ายปฏิบัติการ" } },
			{ label: { en: "Delivery", th: "ส่งมอบ" }, sub: { en: "feeds next reorder", th: "ป้อนรอบสั่งซ้ำถัดไป" } }
		],
		featureGroups: [
			{
				title: { en: "Accounts & contacts", th: "บัญชีลูกค้าและผู้ติดต่อ" },
				features: [
					{ title: { en: "One customer database", th: "ฐานลูกค้าเดียว" }, body: { en: "CRM accounts are the same records your documents use — no import/export between sales and ops.", th: "บัญชีลูกค้า CRM คือข้อมูลชุดเดียวกับเอกสารซื้อขาย — ไม่ต้อง import/export ระหว่างฝ่ายขายกับปฏิบัติการ" } },
					{ title: { en: "Contacts with roles", th: "ผู้ติดต่อพร้อมบทบาท" }, body: { en: "People at each account with their roles — who purchases, who decides — managed inside the CRM.", th: "รายชื่อคนของลูกค้าแต่ละราย พร้อมบทบาท — ใครสั่งซื้อ ใครตัดสินใจ — จัดการได้ใน CRM" } },
					{ title: { en: "Account 360", th: "มุมมองลูกค้า 360°" }, body: { en: "Every order, delivery, visit, deal and conversation for an account on one timeline.", th: "ทุกออเดอร์ การส่งของ การเยี่ยม ดีล และบทสนทนาของลูกค้า บนไทม์ไลน์เดียว" } }
				]
			},
			{
				title: { en: "Field sales", th: "งานขายภาคสนาม" },
				features: [
					{ title: { en: "Reorder-due worklist", th: "คิวลูกค้าถึงรอบสั่งซ้ำ" }, body: { en: "Daily queue of accounts due to buy again, from real purchase latency — not a guess field sales fill in.", th: "คิวรายวันของลูกค้าที่ถึงรอบซื้อซ้ำ จากช่วงเวลาสั่งซื้อจริง — ไม่ใช่ตัวเลขที่เซลส์กรอกเอง" } },
					{ title: { en: "Visit plans with cadence", th: "แผนเยี่ยมตามรอบ" }, body: { en: "Set how often each account should be visited and see who is overdue.", th: "กำหนดความถี่การเยี่ยมรายลูกค้า และเห็นทันทีว่ารายไหนเลยกำหนด" } },
					{ title: { en: "Photo + GPS check-in", th: "เช็คอินรูปถ่าย + GPS" }, body: { en: "Reps check in on site and close visits with outcomes — proof of coverage without paperwork.", th: "เซลส์เช็คอินหน้างานและปิดการเยี่ยมพร้อมผลลัพธ์ — มีหลักฐานการเข้าเยี่ยมโดยไม่ต้องทำรายงานเพิ่ม" } }
				]
			},
			{
				title: { en: "Pipeline & deals", th: "ไปป์ไลน์และดีล" },
				features: [
					{ title: { en: "Kanban boards, editable stages", th: "บอร์ดคัมบัง ปรับสเตจได้" }, body: { en: "Drag deals between stages; shape the pipeline to how you actually sell.", th: "ลากดีลระหว่างสเตจ ปรับไปป์ไลน์ให้ตรงกับวิธีขายจริงของคุณ" } },
					{ title: { en: "Government-tender board", th: "บอร์ดงานประมูลราชการ" }, body: { en: "A dedicated pipeline for งานประมูล with its own stages, beside your commercial board.", th: "ไปป์ไลน์เฉพาะสำหรับงานประมูลราชการ มีสเตจของตัวเอง อยู่คู่กับบอร์ดงานขายทั่วไป" } },
					{ title: { en: "Deals with product lines", th: "ดีลแนบรายการสินค้า" }, body: { en: "Line items with quantity and price on the deal itself, so value comes from something real.", th: "รายการสินค้าพร้อมจำนวนและราคาอยู่บนดีล มูลค่าดีลจึงมาจากของจริง" } },
					{ title: { en: "Weighted forecast & reports", th: "พยากรณ์ถ่วงน้ำหนักและรายงาน" }, body: { en: "Stage-weighted forecast and CRM reports drawn from the live pipeline.", th: "พยากรณ์ถ่วงน้ำหนักตามสเตจ และรายงาน CRM ที่ดึงจากไปป์ไลน์สด" } }
				]
			},
			{
				title: { en: "Closing the loop", th: "ปิดวงจรการขาย" },
				features: [
					{ title: { en: "Won deal → Job Control", th: "ดีลชนะ → Job Control" }, body: { en: "Close-won creates the job that procurement and production execute — no re-keying between sales and ops.", th: "ปิดดีลชนะแล้วสร้างงานให้ฝ่ายจัดซื้อและผลิตต่อได้เลย — ไม่ต้องคีย์ซ้ำระหว่างฝ่ายขายกับปฏิบัติการ" } },
					{ title: { en: "Delivery visibility", th: "เห็นสถานะส่งมอบ" }, body: { en: "Sales sees the deliveries against their accounts without asking ops for updates.", th: "ทีมขายเห็นการส่งมอบของลูกค้าตัวเอง โดยไม่ต้องเดินไปถามฝ่ายปฏิบัติการ" } },
					{ title: { en: "The reorder cycle", th: "วงจรสั่งซื้อซ้ำ" }, body: { en: "Each delivery updates purchase history, which schedules the account's next reorder-due entry automatically.", th: "การส่งมอบแต่ละครั้งอัปเดตประวัติซื้อ ซึ่งกำหนดรอบถึงกำหนดสั่งซ้ำครั้งถัดไปให้อัตโนมัติ" } }
				]
			}
		],
		whoFor: [
			{ en: "B2B distributors and manufacturers whose revenue is repeat orders from known accounts.", th: "ผู้จัดจำหน่ายและโรงงาน B2B ที่รายได้หลักคือออเดอร์ซ้ำจากลูกค้าประจำ" },
			{ en: "Sales teams with field reps who visit customers and need visit proof without extra paperwork.", th: "ทีมขายที่มีเซลส์วิ่งเยี่ยมลูกค้า และต้องการหลักฐานการเยี่ยมโดยไม่เพิ่มงานเอกสาร" },
			{ en: "Companies bidding on government tenders that need a separate pipeline for them.", th: "บริษัทที่เข้าประมูลงานราชการ และต้องการไปป์ไลน์แยกสำหรับงานประมูลโดยเฉพาะ" },
			{ en: "Owners tired of a standalone CRM that never matches the numbers in the ERP.", th: "เจ้าของกิจการที่เบื่อ CRM แยกระบบ ซึ่งตัวเลขไม่เคยตรงกับ ERP สักที" }
		],
		faq: [
			{
				q: { en: "Where does the reorder-due queue come from?", th: "คิวถึงรอบสั่งซ้ำมาจากไหน" },
				a: { en: "From each account's actual order history in the same database — Tonbab measures the account's real purchase rhythm and flags when the next order is due. It is transparent arithmetic, not a machine-learning score.", th: "จากประวัติออเดอร์จริงของลูกค้าแต่ละรายในฐานข้อมูลเดียวกัน — Tonbab วัดจังหวะการซื้อจริงแล้วแจ้งเมื่อถึงรอบสั่งครั้งถัดไป เป็นเลขคณิตที่โปร่งใส ไม่ใช่คะแนน machine learning" }
			},
			{
				q: { en: "Do we need the Commerce module to use CRM?", th: "ต้องใช้โมดูล Commerce ก่อนไหมถึงจะใช้ CRM ได้" },
				a: { en: "No — CRM works from the customer and document history in the operations core. Commerce adds retail channels, but B2B teams can run CRM without it.", th: "ไม่ต้อง — CRM ทำงานจากข้อมูลลูกค้าและประวัติเอกสารในแกน Operation อยู่แล้ว Commerce เพิ่มช่องทางค้าปลีกเข้ามา แต่ทีม B2B ใช้ CRM ได้โดยไม่ต้องเปิด" }
			},
			{
				q: { en: "Can we change the pipeline stages?", th: "แก้สเตจในไปป์ไลน์ได้ไหม" },
				a: { en: "Yes — stages are editable per pipeline, and you can run multiple boards, including a dedicated one for government tenders.", th: "ได้ — สเตจแก้ไขได้รายไปป์ไลน์ และเปิดหลายบอร์ดพร้อมกันได้ รวมถึงบอร์ดเฉพาะสำหรับงานประมูลราชการ" }
			},
			{
				q: { en: "What happens after we win a deal?", th: "ชนะดีลแล้วเกิดอะไรต่อ" },
				a: { en: "Close-won converts the deal into a Job Control — the same document procurement and production work from — so the order sales closed is the order ops delivers.", th: "การปิดดีลชนะแปลงดีลเป็น Job Control — เอกสารเดียวกับที่ฝ่ายจัดซื้อและผลิตใช้ทำงาน — ออเดอร์ที่ฝ่ายขายปิดได้จึงเป็นออเดอร์เดียวกับที่ฝ่ายปฏิบัติการส่งมอบ" }
			}
		],
		related: ["operation", "commerce"]
	}
];

export function getModule(key: string): ModuleContent | undefined {
	return modulesContent.find((mc) => mc.key === key);
}
