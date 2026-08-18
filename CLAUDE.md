# Tonbab Website — Project Guide

## What is this?

The public marketing website for **Tonbab (ต้นแบบ)** — the Thai-first
all-in-one ERP by Codustry — at **tonbab.com**. Bilingual, **Thai-first**
(default locale `th`, full English mirror). Showcases the five modules
(Operation, People, Commerce+POS, CRM, SSO), compares Tonbab honestly against
Thai and global ERPs, and hosts product docs, FAQ, and a blog.

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
deploy. Demo-booking runs on Khao Pad Forms.

## Honesty rules (from the build proposal)

- **Never invent traction stats.** Use real production numbers only.
- **No free tier, no self-host, no SLA, no public-GitHub claims** — none of
  these exist. Pricing page is "คุยกับเรา / Talk to us".
- /compare cites competitors with dated source footnotes. Never claim Thai
  rivals lack Thai tax compliance (PEAK/FlowAccount/AccRevo are strong there);
  lead with the manufacturing gap, transparent THB, and the split-stack story.

## Legal entity

The operating entity is **บริษัท โคดัสทรี (ประเทศไทย) จำกัด / Codustry
(Thailand) Co., Ltd.** Every legal surface — Privacy Policy, Terms, Cookie
Policy, footer copyright — must name this entity, never "Tonbab" alone and
never the khaopad placeholder. Legal pages are seeded via the CMS legal
templates and must be edited to carry this entity before publishing.

## Customer stories

/story tells the origin + customer stories. Only REAL stories: the product
was built and dogfooded inside real operations (the production stats are
the proof). Never invent testimonials; a tenant may be named only after
their explicit consent — until then the customer-story section stays a
"coming soon" invitation.

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
