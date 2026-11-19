import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import {
  HOME_CRUMB,
  faqJsonLd,
  marketingSeo,
  softwareJsonLd,
} from "$lib/seo/site";
import * as m from "$lib/paraglide/messages";

// Same nine Q&As the page renders (pricing/+page.svelte `faqs`).
const FAQ = [
  [m.pr_q1, m.pr_a1],
  [m.pr_q2, m.pr_a2],
  [m.pr_q3, m.pr_a3],
  [m.pr_q4, m.pr_a4],
  [m.pr_q5, m.pr_a5],
  [m.pr_q6, m.pr_a6],
  [m.pr_q7, m.pr_a7],
  [m.pr_q8, m.pr_a8],
  [m.pr_q9, m.pr_a9],
] as const;

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const th = locale === "th";
  const seo = marketingSeo({
    url: event.url,
    cdnBaseUrl,
    locale,
    path: "/pricing",
    title: th
      ? "ราคา Tonbab: เริ่มฟรี แพ็กเกจเริ่ม ฿2,990/ปี รวมโมดูลบัญชี"
      : "Tonbab Pricing: Free Plan, Paid Plans from ฿2,990/yr, Accounting Included",
    description: th
      ? "ราคาระบบ ERP Tonbab ต่อบริษัท ก่อน VAT: Free ฿0, Starter ฿2,990, Standard ฿9,900, Business ฿39,900 และ Enterprise เริ่ม ฿120,000 ต่อปี ทดลอง Business ฟรี 30 วัน"
      : "Tonbab ERP pricing per company, before VAT: Free ฿0, Starter ฿2,990, Standard ฿9,900, Business ฿39,900 and Enterprise from ฿120,000 per year. 30-day Business trial.",
    breadcrumbs: [
      { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
      { name: th ? "ราคา" : "Pricing", path: "/pricing" },
    ],
    jsonLd: [
      softwareJsonLd(locale),
      faqJsonLd(
        FAQ.map(([q, a]) => ({ q: q({}, { locale }), a: a({}, { locale }) })),
      ),
    ],
  });
  return { locale, seo };
};
