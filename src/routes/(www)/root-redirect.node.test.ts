import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { load } from "./+page.server";

/**
 * `/` is Thai-first (owner, 2026-11-15): everyone lands on /th unless they
 * previously chose a language with the header toggle (PARAGLIDE_LOCALE).
 * Accept-Language must NOT send English-browser visitors to /en.
 */
type LoadEvent = Parameters<typeof load>[0];

async function redirectOf(opts: { cookie?: string; acceptLanguage?: string; search?: string }) {
  const event = {
    cookies: {
      get: (name: string) =>
        name === "PARAGLIDE_LOCALE" ? opts.cookie : undefined,
    },
    url: new URL(`https://www.tonbab.com/${opts.search ?? ""}`),
    request: new Request("https://www.tonbab.com/", {
      headers: opts.acceptLanguage
        ? { "accept-language": opts.acceptLanguage }
        : {},
    }),
  } as unknown as LoadEvent;
  try {
    await load(event);
  } catch (e) {
    return e as { status: number; location: string };
  }
  throw new Error("expected a redirect");
}

describe("root redirect is Thai-first", () => {
  it("no cookie, no header → /th", async () => {
    expect(await redirectOf({})).toMatchObject({ status: 308, location: "/th" });
  });

  it("English browser without a saved choice → /th (not /en)", async () => {
    const r = await redirectOf({ acceptLanguage: "en-US,en;q=0.9" });
    expect(r.location).toBe("/th");
  });

  it("a saved toggle choice wins", async () => {
    expect((await redirectOf({ cookie: "en" })).location).toBe("/en");
    expect((await redirectOf({ cookie: "th" })).location).toBe("/th");
  });

  it("a bogus cookie never reaches the Location header", async () => {
    for (const bad of ["zz", "*", "../admin", "EN", ""]) {
      expect((await redirectOf({ cookie: bad })).location, bad).toBe("/th");
    }
  });

  it("keeps campaign query strings", async () => {
    const r = await redirectOf({ search: "?utm_source=line" });
    expect(r.location).toBe("/th?utm_source=line");
  });
});

describe("Thai is the default everywhere it is configured", () => {
  const read = (p: string) =>
    readFileSync(new URL(p, import.meta.url).pathname, "utf8");

  it("wrangler.toml DEFAULT_LOCALE is th in every vars block", () => {
    const toml = read("../../../wrangler.toml");
    const values = [...toml.matchAll(/^DEFAULT_LOCALE\s*=\s*"(\w+)"/gm)].map(
      (m) => m[1],
    );
    expect(values.length).toBeGreaterThan(0);
    expect(new Set(values)).toEqual(new Set(["th"]));
  });

  it("hooks fall back to th when DEFAULT_LOCALE is unset", () => {
    expect(read("../../hooks.server.ts")).toMatch(
      /env\?\.DEFAULT_LOCALE \?\? "th"/,
    );
  });

  it("x-default hreflang points at the Thai page", () => {
    expect(read("../../lib/components/seo/Seo.svelte")).toMatch(
      /hreflang="x-default" href=\{alternates\.th/,
    );
  });
});
