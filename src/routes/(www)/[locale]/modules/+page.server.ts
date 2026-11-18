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
    path: "/modules",
    title: th
      ? "7 โมดูลของระบบ ERP Tonbab: จัดซื้อ สต็อก POS CRM HR บริการ บัญชี"
      : "Tonbab ERP Modules: Operation, Commerce, CRM, People, Service, Docs, Accounting",
    description: th
      ? "Tonbab มี 7 โมดูลในฐานข้อมูลเดียว: Operation (จัดซื้อ คลัง ผลิต), Commerce (POS ออเดอร์ แชท), CRM, People (HR เงินเดือน), Service, Docs และบัญชี ทุกแพ็กเกจได้ทุกโมดูล รวมถึงบัญชี ต่างกันที่ขนาด"
      : "Seven modules, one database: Operation, Commerce (POS, orders, chat), CRM, People (HR, payroll), Service, Docs and Accounting. All in every plan, Accounting included; plans differ by size.",
    breadcrumbs: [
      { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
      { name: th ? "โมดูล" : "Modules", path: "/modules" },
    ],
  });
  return { locale, seo };
};
