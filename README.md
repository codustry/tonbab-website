# Tonbab Website (tonbab.com)

Marketing site for [Tonbab (ต้นแบบ)](https://app.tonbab.com) — the Thai-first
all-in-one ERP. Thai-first bilingual (TH default / EN mirror). Built on
[Khao Pad](https://github.com/codustry/khaopad); custom marketing pages as
code routes, CMS for docs/FAQ/blog.

## Develop

```bash
pnpm install
pnpm dev
```

## Checks & deploy

```bash
pnpm check     # svelte-check — the CI gate
pnpm deploy    # build + wrangler deploy (Codustry Cloudflare account)
```

See `CLAUDE.md` for architecture and content rules. Pull CMS updates from
upstream with `git fetch upstream && git merge upstream/main`.
