import type { RequestHandler } from "./$types";
import { llmsFullTxt } from "$lib/server/marketing/markdown";

/** GET /llms-full.txt — every marketing page as one Markdown file (EN + TH). */
export const GET: RequestHandler = () =>
  new Response(llmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
