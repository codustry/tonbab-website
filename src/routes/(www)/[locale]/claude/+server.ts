/**
 * Short link /th/claude, /en/claude → the Claude Connectors Directory listing
 * once CLAUDE_DIRECTORY_URL is set, else /{locale}/connect/claude. 302 (not
 * 301/308) and no-store, so changing the constant takes effect on the next
 * deploy without stale browser or edge caches.
 */
import { error } from "@sveltejs/kit";
import { SUPPORTED_LOCALES } from "$lib/i18n";
import type { Locale } from "$lib/server/content/types";
import { claudeShortLinkTarget } from "$lib/marketing/connect-claude-data";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ params }) => {
  const locale = params.locale as Locale;
  if (!SUPPORTED_LOCALES.includes(locale)) error(404, "Not found");
  return new Response(null, {
    status: 302,
    headers: {
      Location: claudeShortLinkTarget(locale),
      "Cache-Control": "no-store",
    },
  });
};
