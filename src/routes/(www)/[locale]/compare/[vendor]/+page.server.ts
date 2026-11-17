import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { getVendorCompare } from "$lib/marketing/compare-vendors";
import { HOME_CRUMB, marketingSeo } from "$lib/seo/site";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const v = getVendorCompare(event.params.vendor);
  if (!v) error(404, "Not found");
  const th = locale === "th";
  return {
    locale,
    vendorSlug: v.slug,
    seo: marketingSeo({
      url: event.url,
      cdnBaseUrl,
      locale,
      path: `/compare/${v.slug}`,
      title: th
        ? `Tonbab กับ ${v.name} ต่างกันอย่างไร? เปรียบเทียบตามจริง | Tonbab`
        : `Tonbab vs ${v.name}: An Honest Comparison | Tonbab`,
      description: th
        ? `เปรียบเทียบ Tonbab กับ ${v.name} แบบตรงไปตรงมา: ประเภทโปรแกรม ราคาที่เปิดเผย สต็อก การผลิต ภาษีไทย และกรณีที่ ${v.name} เหมาะกว่า พร้อมแหล่งอ้างอิง`
        : `A fair comparison of Tonbab and ${v.name}: product type, published pricing, inventory, manufacturing, Thai tax — and when ${v.name} is the better fit. Sources cited.`,
      breadcrumbs: [
        { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
        { name: th ? "เปรียบเทียบ" : "Compare", path: "/compare" },
        { name: `Tonbab vs ${v.name}`, path: `/compare/${v.slug}` },
      ],
    }),
  };
};
