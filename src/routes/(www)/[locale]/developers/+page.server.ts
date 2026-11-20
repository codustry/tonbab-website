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
    path: "/developers",
    title: th
      ? "API และ MCP เชื่อม ERP กับ ChatGPT Claude Zapier | Tonbab"
      : "Tonbab API & MCP — Connect Your ERP to Claude, ChatGPT, Zapier",
    description: th
      ? "REST API, webhook ที่ลงลายเซ็น และ MCP server ให้ผู้ช่วย AI อย่าง Claude และ ChatGPT ทำงานกับข้อมูลบริษัทของคุณ ภายใต้สิทธิ์ของแต่ละคน เขียนได้เฉพาะฉบับร่างหรือคำขอที่คนอนุมัติ"
      : "Tonbab's REST API, signed webhooks and MCP server let Claude, ChatGPT, Zapier and Make work with your company data — always within each person's permissions, writes as drafts or requests a person approves.",
    breadcrumbs: [
      { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
      { name: th ? "นักพัฒนาและ AI" : "Developers & AI", path: "/developers" },
    ],
  });
  return { locale, seo };
};
