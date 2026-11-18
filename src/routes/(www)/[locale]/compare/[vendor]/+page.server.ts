import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { getVendorCompare } from "$lib/marketing/compare-vendors";
import { HOME_CRUMB, faqJsonLd, marketingSeo } from "$lib/seo/site";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const v = getVendorCompare(event.params.vendor);
  if (!v) error(404, "Not found");
  const th = locale === "th";
  const t = (b: { th: string; en: string }) => (th ? b.th : b.en);
  return {
    locale,
    vendorSlug: v.slug,
    seo: marketingSeo({
      url: event.url,
      cdnBaseUrl,
      locale,
      path: `/compare/${v.slug}`,
      // The competitor's name leads: that is what people type ("FlowAccount vs …",
      // "ราคา FlowAccount", "ทางเลือก FlowAccount").
      title: th
        ? `${v.name} vs Tonbab: เทียบราคาและฟีเจอร์ 2569 | Tonbab`
        : `${v.name} vs Tonbab: Pricing & Features Compared (2026) | Tonbab`,
      description: th
        ? `${t(v.keyword)}? เทียบ ${v.name} กับ Tonbab แบบตรงไปตรงมา: ราคาแต่ละแพ็กเกจ ตัวอย่างค่าใช้จ่ายต่อปี บัญชี สต็อก การผลิต POS และกรณีที่ ${v.name} เหมาะกว่า พร้อมแหล่งอ้างอิง`
        : `Looking for a ${t(v.keyword)}? ${v.name} vs Tonbab compared fairly: every plan's price, a worked yearly cost, accounting, stock, manufacturing, POS — and when ${v.name} is the better fit. Sources cited.`,
      breadcrumbs: [
        { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
        { name: th ? "เปรียบเทียบ" : "Compare", path: "/compare" },
        { name: `${v.name} vs Tonbab`, path: `/compare/${v.slug}` },
      ],
      jsonLd: [faqJsonLd(v.faq.map((f) => ({ q: t(f.q), a: t(f.a) })))],
    }),
  };
};
