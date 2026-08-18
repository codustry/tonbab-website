import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { SUPPORTED_LOCALES } from "$lib/i18n";
import type { Locale } from "$lib/server/content/types";
import { canonicalUrl, resolveOrigin, type PageSeo } from "$lib/seo";
import { getModule } from "$lib/marketing/modules-data";

export const load: PageServerLoad = async ({ params, url, locals }) => {
  if (!SUPPORTED_LOCALES.includes(params.locale as Locale)) {
    error(404, "Not found");
  }
  const mod = getModule(params.module);
  if (!mod) error(404, "Not found");
  const locale = params.locale as Locale;
  const settings = await locals.content.getSettings().catch(() => null);
  const origin = resolveOrigin(url, settings?.cdnBaseUrl);
  const alternates: Partial<Record<Locale, string>> = {};
  for (const l of SUPPORTED_LOCALES) {
    alternates[l] = canonicalUrl(origin, `/${l}/modules/${mod.key}`);
  }
  const name = locale === "th" ? mod.name.th : mod.name.en;
  const seo: PageSeo = {
    title: `${name} — Tonbab`,
    canonical: canonicalUrl(origin, `/${locale}/modules/${mod.key}`),
    locale,
    alternates,
    ogType: "website",
  };
  return { locale, seo, moduleKey: mod.key };
};
