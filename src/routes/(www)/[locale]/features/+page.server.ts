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
    path: "/features",
    title: th
      ? "ฟีเจอร์ Tonbab: POS สต็อก จัดซื้อ การผลิต เงินเดือน ภาษีไทย | Tonbab"
      : "Tonbab Features: POS, Inventory, Procurement, Payroll, Thai Tax",
    description: th
      ? "รวมฟีเจอร์เด่นของ Tonbab ระบบ ERP ภาษาไทย: POS หน้าร้าน แอปหน้างาน โปรแกรมสต็อก ระบบจัดซื้อนำเข้า การผลิต เงินเดือน 50 ทวิ เชื่อม Shopee Lazada LINE OA และ e-GP"
      : "Every Tonbab differentiator in one place: POS, floor kiosks, inventory, landed-cost procurement, manufacturing, payroll, Thai tax, Shopee/Lazada/LINE OA and e-GP leads.",
    breadcrumbs: [
      { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
      { name: th ? "ฟีเจอร์" : "Features", path: "/features" },
    ],
  });
  return { locale, seo };
};
