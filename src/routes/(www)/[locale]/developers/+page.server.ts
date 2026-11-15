import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { SUPPORTED_LOCALES } from "$lib/i18n";
import type { Locale } from "$lib/server/content/types";
import { canonicalUrl, resolveOrigin, type PageSeo } from "$lib/seo";

export const load: PageServerLoad = async ({ params, url, locals }) => {
  if (!SUPPORTED_LOCALES.includes(params.locale as Locale)) {
    error(404, "Not found");
  }
  const locale = params.locale as Locale;
  const settings = await locals.content.getSettings().catch(() => null);
  const origin = resolveOrigin(url, settings?.cdnBaseUrl);
  const alternates: Partial<Record<Locale, string>> = {};
  for (const l of SUPPORTED_LOCALES) {
    alternates[l] = canonicalUrl(origin, `/${l}/developers`);
  }
  const seo: PageSeo = {
    title:
      locale === "th" ? "นักพัฒนาและ AI — Tonbab" : "Developers & AI — Tonbab",
    description:
      locale === "th"
        ? "REST API, webhook ที่ลงลายเซ็น และตัวเชื่อม AI (MCP) สำหรับ Claude และ ChatGPT — ภายใต้สิทธิ์ของแต่ละคนเสมอ"
        : "Tonbab's REST API, signed webhooks and the MCP AI connector for Claude and ChatGPT — always within each person's own permissions.",
    canonical: canonicalUrl(origin, `/${locale}/developers`),
    locale,
    alternates,
    ogType: "website",
  };
  return { locale, seo };
};
