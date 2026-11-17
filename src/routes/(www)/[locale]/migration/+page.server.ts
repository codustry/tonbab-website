import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { HOME_CRUMB, faqJsonLd, marketingSeo } from "$lib/seo/site";
import { migrationFaq } from "$lib/marketing/migration-data";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const th = locale === "th";
  return {
    locale,
    seo: marketingSeo({
      url: event.url,
      cdnBaseUrl,
      locale,
      path: "/migration",
      title: th
        ? "ย้ายข้อมูลจากโปรแกรมบัญชีเดิม FlowAccount PEAK Express Xero | Tonbab"
        : "Migrate from FlowAccount, PEAK, Express, Xero, QuickBooks | Tonbab",
      description: th
        ? "บริการย้ายข้อมูลมา Tonbab จาก FlowAccount, PEAK, Express, Xero, QuickBooks และโปรแกรมบัญชีอื่น ผ่าน Excel: ลูกค้า ผู้ขาย สินค้า ยอดยกมา สมุดรายวันและเอกสารย้อนหลัง"
        : "Move to Tonbab from FlowAccount, PEAK, Express, Xero, QuickBooks and other software via Excel: customers, vendors, products, opening balances, past journals and documents.",
      breadcrumbs: [
        { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
        { name: th ? "ย้ายข้อมูล" : "Migration", path: "/migration" },
      ],
      jsonLd: [
        faqJsonLd(
          migrationFaq.map((f) => ({ q: f.q[locale], a: f.a[locale] })),
        ),
      ],
    }),
  };
};
