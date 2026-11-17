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
    path: "/story",
    title: th
      ? "เรื่องราวของ Tonbab (ต้นแบบ) — ERP ที่สร้างจากงานจริงของธุรกิจไทย"
      : "The Tonbab (ต้นแบบ) Story — an ERP Built Inside Real Thai Operations",
    description: th
      ? "Tonbab เกิดจากการทำงานจริงในโรงงานและธุรกิจไทย พัฒนาโดย Codustry และใช้งานจริงทุกวัน อ่านที่มาของชื่อ ต้นแบบ และวิธีที่เราสร้างระบบ"
      : "Tonbab grew out of real Thai factories and businesses, built by Codustry and used every day. Read where the name ต้นแบบ comes from and how we build.",
    breadcrumbs: [
      { name: th ? HOME_CRUMB.th : HOME_CRUMB.en, path: "" },
      { name: th ? "เรื่องราวของเรา" : "Our story", path: "/story" },
    ],
  });
  return { locale, seo };
};
