import type { PageServerLoad } from "./$types";

/**
 * /pitch — the customer keynote, presented from the website by the sales
 * team. Public by URL but noindex (a sales tool, not a landing page): the
 * X-Robots-Tag header plus the meta tag in +page.svelte.
 */
export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({ "X-Robots-Tag": "noindex, nofollow" });
  return {};
};
