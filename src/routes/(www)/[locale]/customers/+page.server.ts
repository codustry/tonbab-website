import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { HOME_CRUMB, marketingSeo } from "$lib/seo/site";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const th = locale === "th";
  return {
    locale,
    seo: marketingSeo({
      url: event.url,
      cdnBaseUrl,
      locale,
      path: "/customers",
      title: th
        ? "ลูกค้าที่ใช้ Tonbab — บริษัทไทยที่ทำงานบนระบบ ERP ของเรา"
        : "Tonbab Customers — Thai Companies Running on Tonbab",
      description: th
        ? "บริษัทไทยที่ใช้ Tonbab ทุกวัน: Kinetic Engineering, LE HORM, Kirirhom (N-Rich 78), Alta Trade & Supply, Amnuay Foods, แหลมทองอิเล็คทริค กรุ๊ป และศรีมิตรก่อสร้าง"
        : "Thai companies on Tonbab every day: Kinetic Engineering, LE HORM, Kirirhom (N-Rich 78), Alta Trade & Supply, Amnuay Foods, Laemthong Electric, Srimitr Construction.",
      breadcrumbs: [
        { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
        { name: th ? "ลูกค้า" : "Customers", path: "/customers" },
      ],
    }),
  };
};
