# Tonbab Website — Project Guide

## What is this?

The public marketing website for **Tonbab (ต้นแบบ)** — the Thai-first
all-in-one ERP by Codustry — at **tonbab.com**. Bilingual, **Thai-first**
(default locale `th`, full English mirror — bare `/` always lands on `/th`
unless the visitor picked English with the header toggle). Showcases the
modules (Operation, People, Commerce+POS, CRM, Service, Docs, and Accounting
in invitation-only early access — always label it so), the API + MCP AI
connector at /developers, compares Tonbab honestly against Thai and global
ERPs, and hosts product docs, FAQ, and a blog.

- **App (login target)**: https://app.tonbab.com — the navbar "เข้าสู่ระบบ"
  button is a plain link there; the app routes signed-in/out users itself.
- **API reference**: https://api.tonbab.com/docs (same deployment as the app;
  Scalar over the Hono OpenAPI spec). This site links to it — never
  duplicates endpoint docs.
- **Product repo**: codustry/workflow (private).

## Origin

Forked from [`codustry/khaopad`](https://github.com/codustry/khaopad) — the
upstream remote is `upstream`. Pull CMS fixes with
`git fetch upstream && git merge upstream/main`. Don't squash or rewrite
upstream-side history.

## Architecture rule

**Custom pages are plain code routes; the CMS is for content.** Marketing
pages (home, /modules/*, /compare, /pricing, /developers) are hand-built
Svelte under `(www)` and reviewed as PRs. Docs, FAQ and blog live in Khao
Pad's content layer (per-locale articles/pages) so they publish without a
deploy.

**Design (2026-11, Notion-calm):** solid blueprint-blue primary buttons
(`btn-primary`), soft-blue secondary (`btn-soft`), `btn-ghost` for plain
actions — utilities in app.css. Warm grey `tnb-mist` surfaces for cards,
`tnb-hair` dividers, big tight headlines, generous whitespace. Amber is an
accent only, never the button colour. Demo-booking runs on Khao Pad Forms.

## Honesty rules (from the build proposal)

- **Never invent traction stats.** Use real production numbers only.
- **Plans** (owner, 2026-11-16; Free seat change 2026-11-17): Free ฿0 (1
  user), Starter ฿2,990/yr (5), Standard ฿6,000/yr (10), Business ฿14,400/yr
  (25), Enterprise from ฿42,000/yr (100+, quoted); monthly = yearly ÷ 10;
  Enterprise support pack ฿48,000/yr — all prices **excl. 7% VAT**. The single
  source is the product repo's `src/lib/shared/plans.ts`; /pricing and
  `src/lib/seo/site.ts` (PLAN_FACTS → JSON-LD, llms.txt) mirror it — change the
  product first, then both. Still no self-host and no public-GitHub claims.
- **Self-serve signup is live** at https://app.tonbab.com/signup (since
  2026-11-09): email-verified, a new company starts on the 30-day Business
  trial, then Free. "Start free" / Free / Business buttons link there;
  Enterprise emails hello@tonbab.com.
- /compare cites competitors with dated source footnotes. Never claim Thai
  rivals lack Thai tax compliance (PEAK/FlowAccount/AccRevo are strong there);
  lead with the manufacturing gap, transparent THB, and the split-stack story.

## Legal entity

The operating entity is **บริษัท โคดัสทรี (ประเทศไทย) จำกัด / Codustry
(Thailand) Co., Ltd.** Every legal surface — Privacy Policy, Terms, Cookie
Policy, footer copyright — must name this entity, never "Tonbab" alone and
never the khaopad placeholder. Legal pages are seeded via the CMS legal
templates and must be edited to carry this entity before publishing.

## SEO / AI search (2026-11)

- Every hand-built page builds its `seo` with `marketingSeo()` from
  `$lib/seo/site.ts` (canonical, hreflang th/en/x-default, per-page OG card,
  breadcrumbs, JSON-LD). Entity facts (name, Codustry, contact, plans) live
  ONLY in `site.ts` — llms.txt, JSON-LD and pages read them from there.
- FAQPage JSON-LD only where the same Q&As are visible on the page.
- New page → add it to the sitemap list (`sitemap-[locale].xml`), give it an
  OG card in `scripts/seo/og.ts`, run `pnpm seo:og`, bump `SITE_UPDATED`.
- AI crawlers are WELCOME (owner policy): robots.txt names them with Allow;
  /llms.txt, /llms-full.txt and /md/<locale>/<path> are generated from the
  same data files as the pages. Never add a bot block.
- Feature claims in `features-data.ts` carry a status (live / in development /
  coming soon); never upgrade one without the code shipping in the app repo.

## Help docs (/docs) and the sales deck (/pitch)

- **/[locale]/docs is code-owned Markdown** since 2026-11-17:
  `src/content/docs/<th|en>/<section>/<slug>.md` (frontmatter: title,
  description, section, order, updated). Sidebar order/labels live in
  `$lib/server/docs` (DOC_SECTIONS). Every instruction is verified against the
  app repo; TH and EN files share slugs and must say the same thing. The old
  CMS "docs" pages are shadowed by this route. FAQ and blog stay in the CMS.
- **/pitch** is the customer keynote (noindex, public by URL). Source =
  the Slides artifact export in `src/content/pitch/` (deck.json, deck.css,
  slides/*.html) + assets in `static/pitch/assets/<blobId>.*`. After the deck
  changes: re-export those files from the artifact (and any new /_blob assets),
  run `pnpm pitch:build`, commit `src/lib/pitch/deck.generated.ts`.
- Un-prefixed paths (`/developers`, `/docs/...`, `/pricing`) 308 to the
  visitor's locale (hooks.server.ts `unprefixedRedirectHook`).

## Customer stories

/story tells the origin + customer stories. Only REAL stories: the product
was built and dogfooded inside real operations (the production stats are
the proof). Never invent testimonials; a tenant may be named only after
their explicit consent. Owner-confirmed logo/name permission (2026-11-17) is
recorded in `src/lib/marketing/customers-data.ts` — only those companies
appear; no testimonials or metrics are attributed without separate consent.

## Tech stack (inherited from Khao Pad)

- pnpm · SvelteKit 2 + Svelte 5 · Tailwind CSS 4 + bits-ui
- Cloudflare Workers + D1 (Drizzle) + R2 + KV · Better Auth
- Paraglide JS 2.0 — `messages/{en,th}.json`; **all UI strings bilingual from
  day one** (same house rule as the product repo)
- `pnpm check` (svelte-check) is the gate; `pnpm deploy` builds + deploys

## Cloudflare resources

All on the **Codustry** account (`4becdbe083803fc00f06fdfb6d0bcc17`):

| Type | Name                           | Notes                       |
| ---- | ------------------------------ | --------------------------- |
| D1   | `tonbab-website-db`            | provisioned at first deploy |
| R2   | `tonbab-website-media`         | provisioned at first deploy |
| KV   | `tonbab-website-CONTENT_CACHE` | provisioned at first deploy |

## Languages

- `th` — Thai (**default**)
- `en` — English

Media: real app screenshots come from the live Codustry workspace on
app.tonbab.com; hero/illustration imagery is generated via Higgsfield.
