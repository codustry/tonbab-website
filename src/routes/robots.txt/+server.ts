import { resolveOrigin } from "$lib/seo";
import type { RequestHandler } from "./$types";

/** Never crawled: CMS admin + JSON endpoints. */
const AI_PRIVATE_PATHS = ["/admin/", "/api/"];

/**
 * Search + AI crawler tokens, as published by each vendor (checked
 * 2026-11-17). Grouped: search indexers, AI search / answer bots, user-
 * triggered fetchers, and training crawlers (allowed by owner choice).
 */
const AI_AGENTS = [
  // Search engines (Bing powers ChatGPT search + Copilot)
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
  "YandexBot",
  // AI search / answer engines
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "DuckAssistBot",
  "meta-webindexer",
  // User-triggered fetchers (a person asked an assistant to read a page)
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
  "MistralAI-User",
  "meta-externalfetcher",
  // Model training / grounding (owner opted in)
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
];

/**
 * GET /robots.txt
 *
 * Per-environment. Production allows all; staging emits Disallow: /
 * to keep the preview off Google. Driven by `WORKERS_ENV` (a wrangler
 * `[vars]` binding); falls back to "production" when unset.
 *
 * Always emits a `Sitemap:` line pointing at the sitemap index, so
 * crawlers find the per-locale sitemaps automatically.
 */
export const GET: RequestHandler = async ({ url, platform, locals }) => {
  // Fail-closed (#145): unset means "someone deployed a second worker and
  // forgot the var" far more often than it means production — and the
  // failure modes are asymmetric. A production site accidentally serving
  // Disallow is noticed and fixed in a day; a preview worker accidentally
  // serving Allow competes with production as duplicate content until
  // someone happens to search for it. wrangler.toml now sets the var in
  // every env template, so shipped configs are unaffected.
  const env =
    (platform?.env as { WORKERS_ENV?: string } | undefined)?.WORKERS_ENV ??
    "unset";
  const settings = await locals.content.getSettings().catch(() => null);
  const origin = resolveOrigin(url, settings?.cdnBaseUrl);

  const isProd = env === "production";
  // Owner policy (2026-11-17): WELCOME search and AI crawlers — Tonbab
  // wants to be found and recommended by Google, Bing, ChatGPT, Claude,
  // Perplexity, Gemini, Copilot and Apple Intelligence. AI agents are named
  // explicitly so a future "default deny" anywhere upstream is visibly
  // contradicted here. A named group replaces the `*` group for that bot,
  // so it repeats the admin/api disallows.
  const disallow = AI_PRIVATE_PATHS.map((p) => `Disallow: ${p}`).join("\n");
  const body = isProd
    ? `# tonbab.com — search engines and AI assistants are welcome.
# Plain-Markdown site summary for LLMs: ${origin}/llms.txt (full: ${origin}/llms-full.txt)

${AI_AGENTS.map((a) => `User-agent: ${a}`).join("\n")}
Allow: /
${disallow}

User-agent: *
Allow: /
${disallow}

Sitemap: ${origin}/sitemap.xml
`
    : `# Non-production environment (${env}) — keep this off search indexes.
User-agent: *
Disallow: /
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
};
