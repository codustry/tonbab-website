import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { SUPPORTED_LOCALES } from "$lib/i18n";
import type { Locale } from "$lib/server/content/types";
import { pageMarkdown } from "$lib/server/marketing/markdown";
import { SITE_ORIGIN } from "$lib/seo/site";

/**
 * GET /md/<locale>/<path> — clean Markdown twin of a marketing page for AI
 * agents (e.g. /md/th/features/pos). The HTML page stays canonical: the
 * Link header points engines back to it so the twin never competes.
 */
export const GET: RequestHandler = ({ params }) => {
  const locale = params.locale as Locale;
  if (!SUPPORTED_LOCALES.includes(locale)) error(404, "Not found");
  const md = pageMarkdown(locale, params.path ?? "");
  if (!md) error(404, "Not found");
  const htmlPath = `/${locale}${params.path ? `/${params.path.replace(/\/+$/, "")}` : ""}`;
  return new Response(md + "\n", {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      Link: `<${SITE_ORIGIN}${htmlPath}>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
    },
  });
};
