import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { HOME_CRUMB, faqJsonLd, marketingSeo } from "$lib/seo/site";
import { aiFaq } from "$lib/marketing/ai-data";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const th = locale === "th";
  const seo = marketingSeo({
    url: event.url,
    cdnBaseUrl,
    locale,
    path: "/ai",
    title: th
      ? "AI ในโปรแกรม ERP: สแกนใบเสร็จ นับของจากรูป เชื่อม Claude ChatGPT | Tonbab"
      : "AI in Tonbab ERP: Receipt Scan, Photo Counting, Claude & ChatGPT | Tonbab",
    description: th
      ? "AI ในตัว Tonbab ทำงานบน Cloudflare Workers AI สแกนใบเสร็จเข้าเบิกค่าใช้จ่ายและบิลซื้อ นับของจากรูปถ่าย รวมในทุกแพ็กเกจผ่านเครดิต AI รายเดือน ปิดการเก็บ log และเชื่อม Claude, ChatGPT หรือ Gemini CLI ของคุณผ่าน MCP ได้"
      : "Tonbab's built-in AI runs on Cloudflare Workers AI: scan receipts into expenses and bills, count stock from a photo — included in every plan through monthly AI credits, logging off. Optionally connect your own Claude, ChatGPT or Gemini CLI over MCP.",
    breadcrumbs: [
      { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
      { name: "AI", path: "/ai" },
    ],
    jsonLd: [faqJsonLd(aiFaq.map((f) => ({ q: f.q[locale], a: f.a[locale] })))],
  });
  return { locale, seo };
};
