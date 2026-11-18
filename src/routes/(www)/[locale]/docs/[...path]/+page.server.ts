import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { DOC_SECTIONS, getDoc, listDocs, renderDoc } from "$lib/server/docs";
import { HOME_CRUMB, marketingSeo } from "$lib/seo/site";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const doc = getDoc(locale, event.params.path);
  if (!doc || !doc.path) error(404, "Not found");
  const th = locale === "th";
  const { html, headings } = renderDoc(doc);
  const section = DOC_SECTIONS.find((s) => s.key === doc.section);
  // Previous / next within the whole docs order (sidebar order).
  const all = listDocs(locale).filter((d) => d.path);
  const i = all.findIndex((d) => d.path === doc.path);
  const pick = (d?: (typeof all)[number]) =>
    d ? { path: d.path, title: d.title } : null;
  return {
    locale,
    doc: {
      title: doc.title,
      description: doc.description,
      updated: doc.updated,
      path: doc.path,
      section: section?.label[locale] ?? doc.section,
    },
    html,
    headings,
    prev: pick(all[i - 1]),
    next: pick(all[i + 1]),
    seo: marketingSeo({
      url: event.url,
      cdnBaseUrl,
      locale,
      path: `/docs${doc.path}`,
      og: "docs",
      title: `${doc.title} | ${th ? "คู่มือ Tonbab" : "Tonbab Docs"}`,
      description: doc.description,
      breadcrumbs: [
        { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
        { name: th ? "คู่มือ" : "Docs", path: "/docs" },
        { name: doc.title, path: `/docs${doc.path}` },
      ],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: doc.title,
          description: doc.description,
          inLanguage: locale,
          dateModified: doc.updated || undefined,
          author: {
            "@type": "Organization",
            name: "Codustry",
            url: "https://www.codustry.com",
          },
          publisher: {
            "@type": "Organization",
            name: "Codustry",
            url: "https://www.codustry.com",
            logo: {
              "@type": "ImageObject",
              url: "https://www.tonbab.com/brand/codustry-logo.png",
            },
          },
          about: {
            "@type": "SoftwareApplication",
            name: "Tonbab (ต้นแบบ)",
            applicationCategory: "BusinessApplication",
          },
        },
      ],
    }),
  };
};
