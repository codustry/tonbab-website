import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { HOME_CRUMB, faqJsonLd, marketingSeo } from "$lib/seo/site";
import { claudeFaq } from "$lib/marketing/connect-claude-data";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const th = locale === "th";
  const seo = marketingSeo({
    url: event.url,
    cdnBaseUrl,
    locale,
    path: "/connect/claude",
    title: th
      ? "เชื่อมต่อ Tonbab กับ Claude: ถามข้อมูล ERP ด้วยภาษาไทย | Tonbab"
      : "Connect Tonbab to Claude: Ask Your ERP in Plain Language | Tonbab",
    description: th
      ? "เพิ่ม Tonbab ใน Claude แล้วถามเรื่อง CRM บัญชี สต็อก จัดซื้อ และวันลาได้เลย Claude ทำงานภายใต้สิทธิ์ของคุณ เลือกบริษัทเองได้ สร้างได้แค่ฉบับร่าง และยกเลิกได้ทุกเมื่อ"
      : "Add Tonbab to Claude and ask about CRM, accounting, stock, purchasing and leave. Claude acts within your permissions, only in the companies you choose, creates drafts only, and you can revoke it any time.",
    breadcrumbs: [
      { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
      { name: "AI", path: "/ai" },
      {
        name: th ? "เชื่อมต่อกับ Claude" : "Connect to Claude",
        path: "/connect/claude",
      },
    ],
    jsonLd: [
      faqJsonLd(claudeFaq.map((f) => ({ q: f.q[locale], a: f.a[locale] }))),
    ],
  });
  return { locale, seo };
};
