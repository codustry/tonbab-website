import { redirect } from "@sveltejs/kit";
import { cookieName } from "$lib/paraglide/runtime";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "$lib/i18n";
import type { Locale } from "$lib/server/content/types";
import type { PageServerLoad } from "./$types";

/**
 * Bare `/` has no content of its own — the public site lives under
 * `/th/...` and `/en/...`. Send the visitor to a localized URL so search
 * engines and shared links always land on one.
 *
 * Tonbab is Thai-first (owner, 2026-11-15): everyone lands on /th by
 * default — including visitors whose browser asks for English. The only
 * exception is a visitor who previously picked a language with the header
 * toggle, which writes the PARAGLIDE_LOCALE cookie. Accept-Language is
 * deliberately NOT consulted any more.
 *
 * The query string is kept so campaign links (`/?utm_source=…`) survive.
 */
export const load: PageServerLoad = async ({ cookies, url }) => {
  // NOTE: check membership against the RAW value, never `toLocale(...)`.
  // toLocale() coerces anything unknown to DEFAULT_LOCALE, so
  // `SUPPORTED_LOCALES.includes(toLocale(x))` is true for EVERY input —
  // an inert guard, and a bogus cookie (`zz`, `*`, `../x`) would then be
  // interpolated into the Location header and 404 the site root.
  const cookieLocale = cookies.get(cookieName);
  const locale =
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : DEFAULT_LOCALE;
  throw redirect(308, `/${locale}${url.search}`);
};
