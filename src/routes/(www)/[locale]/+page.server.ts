import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { SUPPORTED_LOCALES } from "$lib/i18n";
import type { Locale } from "$lib/server/content/types";
import {
  canonicalUrl,
  resolveOrigin,
  websiteJsonLd,
  type PageSeo,
} from "$lib/seo";
import { trackView } from "$lib/server/analytics";
import { CONSENT_COOKIE, parseConsent } from "$lib/consent";
import {
  faqJsonLd,
  marketingSeo,
  organizationJsonLd,
  softwareJsonLd,
} from "$lib/seo/site";
import * as m from "$lib/paraglide/messages";

// The four Q&As rendered on the home page (+page.svelte `faqs`).
const HOME_FAQ = [
  [m.mkt_faq_q1, m.mkt_faq_a1],
  [m.mkt_faq_q6, m.mkt_faq_a6],
  [m.mkt_faq_q2, m.mkt_faq_a2],
  [m.mkt_faq_q4, m.mkt_faq_a4],
] as const;

export const load: PageServerLoad = async ({
  params,
  url,
  locals,
  cookies,
  platform,
}) => {
  if (!SUPPORTED_LOCALES.includes(params.locale as Locale)) {
    error(404, "Not found");
  }
  const locale = params.locale as Locale;
  const settings = await locals.content.getSettings().catch(() => null);
  const origin = resolveOrigin(url, settings?.cdnBaseUrl);
  const canonical = canonicalUrl(origin, `/${locale}`);
  const alternates: Partial<Record<Locale, string>> = {};
  for (const l of SUPPORTED_LOCALES) {
    alternates[l] = canonicalUrl(origin, `/${l}`);
  }

  const th = locale === "th";
  const base = marketingSeo({
    url,
    cdnBaseUrl: settings?.cdnBaseUrl,
    locale,
    path: "",
    og: "home",
    title: th
      ? "Tonbab (ต้นแบบ) — โปรแกรม ERP ออนไลน์ภาษาไทยสำหรับ SME เริ่มใช้ฟรี"
      : "Tonbab (ต้นแบบ) — Thai-First Cloud ERP for SMEs, Free to Start",
    description: th
      ? "ระบบ ERP ภาษาไทยครบทุกฝ่าย: จัดซื้อ สต็อก การผลิต POS CRM งานบริการ HR เงินเดือน และบัญชีไทย ในฐานข้อมูลเดียว ใช้ได้บนเว็บ มือถือ แท็บเล็ต เริ่มฟรี แพ็กเกจเริ่ม ฿2,990/ปี"
      : "Thai-first ERP for SMEs: purchasing, inventory, manufacturing, POS, CRM, service, HR, payroll and Thai accounting in one database. Free plan; paid from ฿2,990/yr.",
    jsonLd: [
      organizationJsonLd(),
      websiteJsonLd({
        url: canonical,
        name: "Tonbab (ต้นแบบ)",
        searchUrl: `${origin}/${locale}/search?q={search_term_string}`,
      }),
      softwareJsonLd(locale),
      faqJsonLd(
        HOME_FAQ.map(([q, a]) => ({
          q: q({}, { locale }),
          a: a({}, { locale }),
        })),
      ),
    ],
  });
  const seo: PageSeo = { ...base, canonical, alternates };

  if (platform?.env?.DB) {
    const consent = parseConsent(cookies.get(CONSENT_COOKIE));
    void trackView(
      platform.env.DB,
      { path: url.pathname, kind: "home" },
      consent,
    );
  }

  // v3.17 (D6): operator-configurable hero copy per locale. Missing
  // locale falls back to en; null tells the page to use its Paraglide
  // defaults (site_name / site_description).
  const heroTitle = settings?.homepageHeroTitle as
    | Partial<Record<Locale, string>>
    | undefined;
  const heroSubtitle = settings?.homepageHeroSubtitle as
    | Partial<Record<Locale, string>>
    | undefined;

  return {
    locale,
    seo,
    hero: {
      title: heroTitle?.[locale] ?? heroTitle?.en ?? null,
      subtitle: heroSubtitle?.[locale] ?? heroSubtitle?.en ?? null,
    },
  };
};
