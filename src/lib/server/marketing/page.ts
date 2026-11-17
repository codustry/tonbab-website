import { error } from "@sveltejs/kit";
import { SUPPORTED_LOCALES } from "$lib/i18n";
import type { Locale } from "$lib/server/content/types";

/**
 * Shared preamble for hand-built marketing routes: validate the locale
 * segment and read the CMS settings once (for cdnBaseUrl → canonical
 * origin). Settings failure never breaks a marketing page.
 */
export async function marketingContext(event: {
  params: Record<string, string>;
  locals: App.Locals;
}): Promise<{ locale: Locale; cdnBaseUrl: string | null }> {
  if (!SUPPORTED_LOCALES.includes(event.params.locale as Locale)) {
    error(404, "Not found");
  }
  const settings = await event.locals.content.getSettings().catch(() => null);
  return {
    locale: event.params.locale as Locale,
    cdnBaseUrl: (settings?.cdnBaseUrl as string | null | undefined) ?? null,
  };
}
