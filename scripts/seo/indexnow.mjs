#!/usr/bin/env node
/**
 * IndexNow ping — tells Bing (which feeds ChatGPT search and Copilot),
 * Yandex, Seznam and Naver that tonbab.com pages changed. Run after a
 * deploy (`pnpm deploy` does it automatically; failures never fail the
 * deploy). Reads the LIVE sitemaps so it only submits URLs that exist.
 *
 * Key file: static/<KEY>.txt (served at https://www.tonbab.com/<KEY>.txt).
 */
const HOST = "www.tonbab.com";
const KEY = "fd3cd550d74e497c93f8317f25437da9";

async function urls() {
  const out = [];
  for (const l of ["th", "en"]) {
    const res = await fetch(`https://${HOST}/sitemap-${l}.xml`);
    if (!res.ok) throw new Error(`sitemap-${l}: HTTP ${res.status}`);
    const xml = await res.text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) out.push(m[1]);
  }
  return [...new Set(out)].slice(0, 10000);
}

try {
  const urlList = await urls();
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(
    `[indexnow] submitted ${urlList.length} URLs → HTTP ${res.status}`,
  );
} catch (e) {
  console.warn(`[indexnow] skipped: ${e instanceof Error ? e.message : e}`);
}
