import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { HOME_CRUMB, marketingSeo } from "$lib/seo/site";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const th = locale === "th";
  const seo = marketingSeo({
    url: event.url,
    cdnBaseUrl,
    locale,
    path: "/compare",
    title: th
      ? "เปรียบเทียบโปรแกรม ERP และโปรแกรมบัญชีในไทย: Tonbab, FlowAccount, PEAK, Odoo, SAP"
      : "Compare ERP Software in Thailand: Tonbab vs FlowAccount, PEAK, Odoo, SAP B1",
    description: th
      ? "เทียบ Tonbab กับโปรแกรมบัญชีไทยและ ERP ต่างประเทศ: ราคา งานผลิต ภาษาไทย และภาษีไทย พร้อมแหล่งอ้างอิงและวันที่ตรวจสอบ เขียนอย่างเป็นธรรม"
      : "Tonbab compared with Thai accounting apps and global ERPs on price, manufacturing, Thai language and Thai tax — with dated sources, written fairly.",
    breadcrumbs: [
      { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
      { name: th ? "เปรียบเทียบ" : "Compare", path: "/compare" },
    ],
  });
  return { locale, seo };
};
