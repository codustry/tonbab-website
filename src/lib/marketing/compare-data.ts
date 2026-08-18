/**
 * /compare page data — every factual cell verified against primary sources
 * during the Aug 2026 competitive research (vendor sites, official docs,
 * repos, Thai partner pricing pages). Dates in the source notes are the
 * verification dates. HONESTY RULES (see CLAUDE.md): never claim Thai
 * rivals lack Thai tax compliance; lead with the manufacturing gap,
 * transparent pricing, and the split-stack story.
 *
 * Tabular content carries {en, th} pairs inline (typed, both languages
 * ship together) — page chrome uses paraglide keys as usual.
 */
export type Bi = { en: string; th: string };
export type Verdict = "yes" | "no" | "partial";

export interface ThaiVendorRow {
	name: string;
	what: Bi;
	price: Bi;
	mfg: Verdict;
	mfgNote: Bi;
	enUi: Verdict;
}

export interface GlobalVendorRow {
	name: string;
	price: Bi;
	openSource: Bi | null;
	thaiBy: Bi;
	weakness: Bi;
}

export const thaiVendors: ThaiVendorRow[] = [
	{
		name: "FlowAccount",
		what: { en: "Accounting + POS", th: "บัญชี + POS" },
		price: { en: "Free → ฿5,490/yr", th: "ฟรี → ฿5,490/ปี" },
		mfg: "no",
		mfgNote: { en: "No BOM / work orders", th: "ไม่มี BOM / ใบสั่งผลิต" },
		enUi: "yes"
	},
	{
		name: "PEAK",
		what: { en: "Accounting (firm-oriented)", th: "บัญชี (เน้นสำนักงานบัญชี)" },
		price: { en: "Free → ฿3,500/mo", th: "ฟรี → ฿3,500/เดือน" },
		mfg: "no",
		mfgNote: {
			en: "Own manual documents a manual workaround — designed for buy-sell & service businesses",
			th: "คู่มือของ PEAK เองระบุว่าออกแบบเพื่อธุรกิจซื้อมาขายไปและบริการ พร้อมแนะนำวิธี workaround สำหรับงานผลิต"
		},
		enUi: "partial"
	},
	{
		name: "ZORT",
		what: { en: "Inventory / order management", th: "จัดการสต็อก / ออเดอร์" },
		price: { en: "฿1,800/3mo → ฿99,000/yr", th: "฿1,800/3เดือน → ฿99,000/ปี" },
		mfg: "no",
		mfgNote: { en: "Kitting only", th: "ทำได้แค่จัดชุดสินค้า (kitting)" },
		enUi: "yes"
	},
	{
		name: "Express",
		what: { en: "Accounting, on-premise only", th: "บัญชี ติดตั้งบนเครื่องเท่านั้น" },
		price: { en: "฿19,000–39,000 one-time", th: "฿19,000–39,000 ซื้อขาด" },
		mfg: "no",
		mfgNote: {
			en: "Documentation states: no production costing, no per-job cost",
			th: "เอกสารระบุ: ไม่รองรับระบบต้นทุนการผลิต และสรุปต้นทุนแยก Job ไม่ได้"
		},
		enUi: "partial"
	},
	{
		name: "Prosoft WINSpeed",
		what: { en: "Full ERP, mid-large", th: "ERP เต็มรูปแบบ ขนาดกลาง-ใหญ่" },
		price: {
			en: "Concealed — ~฿250k–2M implementation + 10%/yr MA",
			th: "ไม่เปิดเผยราคา — ประมาณ ฿250,000–2 ล้าน + ค่าดูแล 10%/ปี"
		},
		mfg: "yes",
		mfgNote: {
			en: "BOM, work orders, overhead allocation (cost accounting; no MRP/scheduling)",
			th: "มี BOM ใบสั่งผลิต ปันส่วนโสหุ้ย (เชิงบัญชีต้นทุน ไม่มี MRP/วางแผนกำลังผลิต)"
		},
		enUi: "yes"
	},
	{
		name: "Formula (CrystalSoft)",
		what: { en: "Accounting → ERP", th: "บัญชี → ERP" },
		price: {
			en: "฿150,000/5 users on-prem; ฿400/user/mo SaaS; MRP add-on quote-only",
			th: "฿150,000/5 ผู้ใช้ (on-prem); ฿400/ผู้ใช้/เดือน (SaaS); MRP เป็น add-on ต้องขอราคา"
		},
		mfg: "yes",
		mfgNote: { en: "MRP is a separate add-on, not in base", th: "MRP เป็นโมดูลเสริม ไม่อยู่ในชุดพื้นฐาน" },
		enUi: "partial"
	}
];

export const globalVendors: GlobalVendorRow[] = [
	{
		name: "SAP Business One",
		price: {
			en: "Quote-only; ~฿2,400–4,700/user/mo via Thai partners",
			th: "ต้องขอราคา; ~฿2,400–4,700/ผู้ใช้/เดือน ผ่านพาร์ทเนอร์ไทย"
		},
		openSource: null,
		thaiBy: { en: "Paid partner (VAR) add-ons", th: "Add-on ของพาร์ทเนอร์ (เสียเงินเพิ่ม)" },
		weakness: {
			en: "No SAP-delivered Thai localization — Thai deployments run on the Singapore/Australia base plus a paid add-on layer",
			th: "SAP ไม่มี localization ไทยอย่างเป็นทางการ — ระบบไทยต้องใช้ฐาน Singapore/Australia บวก add-on ของพาร์ทเนอร์"
		}
	},
	{
		name: "Odoo",
		price: {
			en: "~€24.90–37.40/user/mo (Thailand billed on the EUR list, ~฿800+/user/mo)",
			th: "~€24.90–37.40/ผู้ใช้/เดือน (ไทยคิดตามราคายุโรป ~฿800+/ผู้ใช้/เดือน)"
		},
		openSource: {
			en: "Community LGPLv3 — but Thai tax reports are Enterprise-only",
			th: "Community LGPLv3 — แต่รายงานภาษีไทยอยู่ใน Enterprise เท่านั้น"
		},
		thaiBy: {
			en: "Thin core + community (OCA) modules that lag versions",
			th: "แกนหลักบาง + โมดูลชุมชน (OCA) ที่ตามเวอร์ชันไม่ทัน"
		},
		weakness: {
			en: "Thai UI only ~69% translated on v19 (~37,000 untranslated strings, Odoo's own data); docs admit it cannot generate the 50 ทวิ WHT certificate",
			th: "UI ภาษาไทยแปลแล้ว ~69% บน v19 (เหลือ ~37,000 ข้อความ — ข้อมูลของ Odoo เอง); เอกสารระบุว่าออกหนังสือรับรอง 50 ทวิ ไม่ได้"
		}
	},
	{
		name: "ERPNext (Frappe)",
		price: { en: "$0 self-host; cloud from ~$5–50/mo", th: "$0 ติดตั้งเอง; คลาวด์เริ่ม ~$5–50/เดือน" },
		openSource: { en: "GPLv3", th: "GPLv3" },
		thaiBy: {
			en: "One community app by one company",
			th: "แอปชุมชนตัวเดียว จากบริษัทเดียว"
		},
		weakness: {
			en: "Exactly 1 Thai partner (also the localization author) — bus factor of one; no Thai chart of accounts in core; no e-Tax",
			th: "มีพาร์ทเนอร์ไทยเพียง 1 ราย (เป็นผู้เขียน localization เองด้วย); ไม่มีผังบัญชีไทยในแกนหลัก; ไม่มี e-Tax"
		}
	},
	{
		name: "Dynamics 365 BC",
		price: { en: "$80–110/user/mo", th: "$80–110/ผู้ใช้/เดือน" },
		openSource: null,
		thaiBy: { en: "Partner ISV apps on AppSource", th: "แอป ISV ของพาร์ทเนอร์บน AppSource" },
		weakness: {
			en: "Microsoft builds no Thai layer; a partner's own listing states WHT is \"not natively supported by the W1 version\"",
			th: "Microsoft ไม่ทำเลเยอร์ไทยเอง; เอกสารพาร์ทเนอร์ระบุว่า WHT \"ไม่รองรับใน W1 โดยตรง\""
		}
	},
	{
		name: "NetSuite",
		price: {
			en: "Quote-only; ~$999+/mo base + ~$99–199/user (third-party estimates)",
			th: "ต้องขอราคา; ~$999+/เดือน + ~$99–199/ผู้ใช้ (ตัวเลขจากแหล่งภายนอก)"
		},
		openSource: null,
		thaiBy: { en: "Oracle SuiteApps (partial)", th: "SuiteApps ของ Oracle (บางส่วน)" },
		weakness: {
			en: "ภ.พ.30 output is a reference doc \"not intended for submission\"; no Thai WHT certificates; needs the OneWorld edition",
			th: "แบบ ภ.พ.30 เป็นเอกสารอ้างอิง \"ไม่ได้มีไว้ยื่นจริง\"; ไม่มีหนังสือรับรองหัก ณ ที่จ่ายแบบไทย; ต้องใช้รุ่น OneWorld"
		}
	},
	{
		name: "Zoho",
		price: {
			en: "Books $10–200/mo/org; One $37/employee/mo — no THB billing at all",
			th: "Books $10–200/เดือน/องค์กร; One $37/พนักงาน/เดือน — ไม่มีการคิดเงินเป็นบาทเลย"
		},
		openSource: null,
		thaiBy: { en: "Nobody — no Thailand edition exists", th: "ไม่มีใครทำ — ไม่มี Thailand edition" },
		weakness: {
			en: "Books has no Thai UI (7 languages, Thai not among them) while zoho.com/th markets in Thai; WHT is a manual amount field — no 50 ทวิ, no ภ.พ.30, no e-Tax",
			th: "Books ไม่มี UI ภาษาไทย (มี 7 ภาษา ไม่มีไทย) ทั้งที่ zoho.com/th ทำการตลาดเป็นไทย; WHT เป็นช่องกรอกตัวเลขเอง — ไม่มี 50 ทวิ ไม่มี ภ.พ.30 ไม่มี e-Tax"
		}
	}
];

/** Verification note shown under the tables. */
export const sourceNote: Bi = {
	en: "All claims verified against vendor sites, official documentation, public repositories, and Thai partner pricing pages, August 2026. Prices change — check each vendor for current figures. PEAK, FlowAccount and AccRevo are genuinely strong on Thai tax (ภ.พ.30 / e-Tax) — that is exactly why they work well as the accounting layer beside Tonbab.",
	th: "ทุกข้อมูลตรวจสอบจากเว็บไซต์ผู้ขาย เอกสารทางการ ซอร์สโค้ดสาธารณะ และหน้าราคาพาร์ทเนอร์ไทย ณ สิงหาคม 2026 ราคาอาจเปลี่ยนแปลง — ตรวจสอบกับผู้ขายแต่ละราย ทั้งนี้ PEAK, FlowAccount และ AccRevo เก่งเรื่องภาษีไทยจริง (ภ.พ.30 / e-Tax) — นั่นคือเหตุผลที่ระบบเหล่านี้ทำงานร่วมกับ Tonbab ได้ดีในฐานะระบบบัญชี"
};
