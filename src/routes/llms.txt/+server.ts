import type { RequestHandler } from "./$types";
import { llmsTxt } from "$lib/server/marketing/markdown";

/** GET /llms.txt — curated Markdown index for LLMs (llmstxt.org). */
export const GET: RequestHandler = () =>
  new Response(llmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
