import type { LayoutServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { DOC_SECTIONS, listDocs, searchIndex } from "$lib/server/docs";

export const load: LayoutServerLoad = async (event) => {
  const { locale } = await marketingContext(event);
  const docs = listDocs(locale).filter((d) => d.path);
  const nav = DOC_SECTIONS.map((s) => ({
    key: s.key,
    label: s.label[locale],
    earlyAccess: !!s.earlyAccess,
    pages: docs
      .filter((d) => d.section === s.key)
      .map((d) => ({
        path: d.path,
        title: d.title,
        description: d.description,
      })),
  })).filter((s) => s.pages.length);
  return { docsNav: nav, docsSearch: searchIndex(locale) };
};
