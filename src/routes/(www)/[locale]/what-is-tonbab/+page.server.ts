import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import {
  HOME_CRUMB,
  faqJsonLd,
  marketingSeo,
  organizationJsonLd,
  softwareJsonLd,
} from "$lib/seo/site";
import { whatFaq } from "$lib/marketing/about-data";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const th = locale === "th";
  return {
    locale,
    seo: marketingSeo({
      url: event.url,
      cdnBaseUrl,
      locale,
      path: "/what-is-tonbab",
      title: th
        ? "Tonbab (ต้นแบบ) คืออะไร? ระบบ ERP ภาษาไทยสำหรับ SME"
        : "What is Tonbab (ต้นแบบ)? The Thai-first ERP for SMEs",
      description: th
        ? "Tonbab (ต้นแบบ) คือระบบ ERP ออนไลน์ภาษาไทยโดย Codustry: จัดซื้อ สต็อก การผลิต POS CRM บริการ บุคคล เงินเดือน และบัญชีไทยในฐานข้อมูลเดียว ข้อมูลบริษัท ราคา และการเชื่อมต่อ"
        : "Tonbab (ต้นแบบ) is Codustry's Thai-first cloud ERP for SMEs — every team in one database. Key facts, modules, pricing, customers and FAQ.",
      breadcrumbs: [
        { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
        {
          name: th ? "Tonbab คืออะไร" : "What is Tonbab",
          path: "/what-is-tonbab",
        },
      ],
      jsonLd: [
        organizationJsonLd(),
        softwareJsonLd(locale),
        faqJsonLd(whatFaq.map((f) => ({ q: f.q[locale], a: f.a[locale] }))),
      ],
    }),
  };
};
