import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { marketingContext } from "$lib/server/marketing/page";
import { getDoc, renderDoc } from "$lib/server/docs";
import { HOME_CRUMB, marketingSeo } from "$lib/seo/site";

export const load: PageServerLoad = async (event) => {
  const { locale, cdnBaseUrl } = await marketingContext(event);
  const doc = getDoc(locale, "");
  if (!doc) error(404, "Not found");
  const th = locale === "th";
  return {
    locale,
    intro: renderDoc(doc).html,
    title: doc.title,
    seo: marketingSeo({
      url: event.url,
      cdnBaseUrl,
      locale,
      path: "/docs",
      og: "docs",
      title: th
        ? "คู่มือการใช้งาน Tonbab — วิธีใช้ ERP ทีละขั้นตอน"
        : "Tonbab Help Docs — Step-by-Step ERP Guides",
      description: doc.description,
      breadcrumbs: [
        { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
        { name: th ? "คู่มือ" : "Docs", path: "/docs" },
      ],
    }),
  };
};
