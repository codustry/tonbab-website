import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { FEATURE_REDIRECTS, getFeature } from "$lib/marketing/features-data";
import { HOME_CRUMB, faqJsonLd, marketingSeo } from "$lib/seo/site";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const key = event.params.feature;
  if (FEATURE_REDIRECTS[key])
    redirect(301, `/${locale}${FEATURE_REDIRECTS[key]}`);
  const f = getFeature(key);
  if (!f) error(404, "Not found");
  const t = (b: { en: string; th: string }) => b[locale];
  const seo = marketingSeo({
    url: event.url,
    cdnBaseUrl,
    locale,
    path: `/features/${f.key}`,
    title: t(f.seoTitle),
    description: t(f.metaDescription),
    breadcrumbs: [
      { name: t(HOME_CRUMB), path: "" },
      { name: locale === "th" ? "ฟีเจอร์" : "Features", path: "/features" },
      { name: t(f.keyword), path: `/features/${f.key}` },
    ],
    jsonLd: [faqJsonLd(f.faq.map((q) => ({ q: t(q.q), a: t(q.a) })))],
  });
  return { locale, seo, featureKey: f.key };
};
