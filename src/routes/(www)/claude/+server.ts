/**
 * Short link /claude → the Claude Connectors Directory listing once
 * CLAUDE_DIRECTORY_URL is set, else /{locale}/connect/claude (locale from the
 * visitor's language cookie, Thai by default). "claude" is in the hook's
 * UNPREFIXED_RESERVED so it isn't 308'd to /th/claude first.
 */
import { cookieName } from "$lib/paraglide/runtime";
import { DEFAULT_LOCALE, toLocale } from "$lib/i18n";
import { claudeShortLinkTarget } from "$lib/marketing/connect-claude-data";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ cookies }) => {
  const locale = toLocale(cookies.get(cookieName) ?? DEFAULT_LOCALE);
  return new Response(null, {
    status: 302,
    headers: {
      Location: claudeShortLinkTarget(locale),
      "Cache-Control": "no-store",
    },
  });
};
