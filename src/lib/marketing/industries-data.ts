/**
 * /story industries — Thai SME segments Tonbab targets, with the module
 * fit that makes each true. These are "built for" statements, not
 * customer claims (see CLAUDE.md: real stories only, with consent).
 */
import type { Bi } from "./compare-data";

export interface Industry {
	icon: string; // lucide icon name resolved in the page
	name: Bi;
	fit: Bi;
}

export const industries: Industry[] = [
	{
		icon: "Factory",
		name: { en: "Manufacturing & OEM", th: "โรงงานผลิต & OEM" },
		fit: {
			en: "BOM, work orders, lot genealogy, subcontracting, and job costs that close the loop from quote to delivery.",
			th: "BOM ใบสั่งผลิต สืบย้อนล็อต งานจ้างผลิตภายนอก และต้นทุนงานครบวงจรตั้งแต่เสนอราคาจนส่งมอบ"
		}
	},
	{
		icon: "Globe2",
		name: { en: "Trading & import", th: "เทรดดิ้ง & นำเข้า" },
		fit: {
			en: "RFQ price comparison, landed cost with FX/duty/freight, multi-warehouse stock, and CRM that knows reorder cycles.",
			th: "เปรียบเทียบราคา RFQ ต้นทุนนำเข้าพร้อม FX/อากร/ค่าขนส่ง สต็อกหลายคลัง และ CRM ที่รู้รอบสั่งซ้ำของลูกค้า"
		}
	},
	{
		icon: "ShoppingBag",
		name: { en: "Ecommerce & marketplace sellers", th: "อีคอมเมิร์ซ & แม่ค้ามาร์เก็ตเพลส" },
		fit: {
			en: "Shopee/Lazada sync, LINE OA + Facebook/IG chat in one inbox, pick-pack-ship with AWB, stock that never oversells.",
			th: "ซิงค์ Shopee/Lazada แชท LINE OA + Facebook/IG ในกล่องเดียว หยิบ-แพ็ก-ส่งพร้อม AWB และสต็อกที่ไม่ขายเกิน"
		}
	},
	{
		icon: "Sparkles",
		name: { en: "Beauty & wellness", th: "ความงาม & เวลเนส" },
		fit: {
			en: "POS on a tablet, lot/expiry tracking with FEFO for cosmetics, e-receipts, and customer reorder rhythms in CRM.",
			th: "POS บนแท็บเล็ต ติดตามล็อต/วันหมดอายุแบบ FEFO สำหรับเครื่องสำอาง e-receipt และจังหวะซื้อซ้ำของลูกค้าใน CRM"
		}
	},
	{
		icon: "UtensilsCrossed",
		name: { en: "Food & beverage production", th: "ผลิตอาหาร & เครื่องดื่ม" },
		fit: {
			en: "Recipe-style BOMs, FEFO lot picking, recall-ready traceability, QC hold — the compliance backbone F&B needs.",
			th: "BOM แบบสูตรอาหาร หยิบล็อต FEFO สืบย้อนพร้อมเรียกคืน กัก QC — โครงกระดูกด้านมาตรฐานที่ธุรกิจอาหารต้องมี"
		}
	},
	{
		icon: "Laptop",
		name: { en: "Software houses & agencies", th: "ซอฟต์แวร์เฮาส์ & เอเจนซี" },
		fit: {
			en: "Project-style job costing, expense claims, Thai HR with recruitment and careers pages. Codustry itself runs on Tonbab every day.",
			th: "ต้นทุนงานแบบโปรเจกต์ เบิกค่าใช้จ่าย งานบุคคลไทยพร้อมระบบสรรหาและหน้ารับสมัครงาน — Codustry เองก็ใช้ Tonbab ทุกวัน"
		}
	}
];
