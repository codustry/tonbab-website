/**
 * Site-wide entity facts + page-SEO builder for the marketing routes.
 *
 * ONE place for the facts search engines and AI answer engines read about
 * Tonbab (name, owner, contact, plans). Keep them identical everywhere:
 * Organization / SoftwareApplication JSON-LD, llms.txt, and the visible
 * pages all import from here, so the entity never drifts between surfaces.
 *
 * Prices mirror codustry/workflow src/lib/shared/plans.ts (before 7% VAT).
 * Change the product first, then this file and /pricing.
 */
import type { Locale } from "$lib/server/content/types";
import { SUPPORTED_LOCALES } from "$lib/i18n";
import {
  breadcrumbJsonLd,
  canonicalUrl,
  resolveOrigin,
  type PageSeo,
} from "./index";

export type Bi = { en: string; th: string };

/** Production origin — used for entity ids so they never vary by host. */
export const SITE_ORIGIN = "https://www.tonbab.com";

/**
 * Last meaningful content update of the hand-built marketing pages. The
 * sitemap uses it as <lastmod> (Google ignores lastmod values that change
 * on every crawl, so this must be a real date, bumped with real edits).
 */
export const SITE_UPDATED = "2026-11-18";

export const ENTITY = {
  name: "Tonbab",
  alternateName: ["ต้นแบบ", "Tonbab (ต้นแบบ)", "Tonbab ERP"],
  /** Product of Codustry — the legal entity on every contract and invoice. */
  publisher: {
    name: "Codustry",
    legalName: "Codustry (Thailand) Co., Ltd.",
    legalNameTh: "บริษัท โคดัสทรี (ประเทศไทย) จำกัด",
    url: "https://www.codustry.com",
    sameAs: [
      "https://www.codustry.com",
      "https://www.facebook.com/codustry",
      "https://www.linkedin.com/company/codustry",
    ],
  },
  email: "sales@codustry.com",
  phone: "+66-2-873-4448",
  phoneDisplay: "02-873-4448",
  appUrl: "https://app.tonbab.com",
  signupUrl: "https://app.tonbab.com/signup",
  apiDocsUrl: "https://api.tonbab.com/docs",
  /** Codustry (publisher) logo, raster for Google (>=112px). */
  logo: `${SITE_ORIGIN}/brand/codustry-logo.png`,
  /** Tonbab product mark. */
  productImage: `${SITE_ORIGIN}/icon-512.png`,
  foundingCountry: "TH",
} as const;

/** Plans (THB per year, before VAT). Monthly billing = yearly / 10. */
export const PLAN_FACTS: {
  code: string;
  name: string;
  yearly: number;
  monthly: number | null;
  /** Included user seats (owner, 2026-11-17: Free is 1 seat). */
  seats: number;
  /** Enterprise is "from" — priced per customer above the included scale. */
  from?: boolean;
}[] = [
  { code: "free", name: "Free", yearly: 0, monthly: 0, seats: 1 },
  { code: "starter", name: "Starter", yearly: 2990, monthly: 299, seats: 5 },
  { code: "standard", name: "Standard", yearly: 6000, monthly: 600, seats: 10 },
  {
    code: "business",
    name: "Business",
    yearly: 14400,
    monthly: 1440,
    seats: 25,
  },
  {
    code: "enterprise",
    name: "Enterprise",
    yearly: 42000,
    monthly: null,
    seats: 100,
    from: true,
  },
];
export const SUPPORT_PACK_YEARLY = 24000;
export const TRIAL_DAYS = 30;

/** Organization (publisher) — emitted on the home page and /about-tonbab. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: ENTITY.publisher.name,
    legalName: ENTITY.publisher.legalName,
    alternateName: ENTITY.publisher.legalNameTh,
    url: ENTITY.publisher.url,
    logo: ENTITY.logo,
    email: ENTITY.email,
    telephone: ENTITY.phone,
    address: { "@type": "PostalAddress", addressCountry: "TH" },
    sameAs: ENTITY.publisher.sameAs,
    brand: { "@id": `${SITE_ORIGIN}/#software` },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: ENTITY.email,
        telephone: ENTITY.phone,
        areaServed: "TH",
        availableLanguage: ["th", "en"],
      },
    ],
  };
}

/**
 * The product as a WebApplication with one Offer per plan in THB. No
 * aggregateRating: we have no public review corpus and never invent one,
 * so Google will not show a software rich result — the markup still gives
 * search and AI engines the authoritative name, category and prices.
 */
export function softwareJsonLd(locale: Locale): Record<string, unknown> {
  const th = locale === "th";
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE_ORIGIN}/#software`,
    name: "Tonbab (ต้นแบบ)",
    alternateName: ENTITY.alternateName,
    url: `${SITE_ORIGIN}/${locale}`,
    image: ENTITY.productImage,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "ERP",
    operatingSystem: "Web, iOS, Android",
    inLanguage: ["th", "en"],
    description: th
      ? "Tonbab (ต้นแบบ) ระบบ ERP ออนไลน์ภาษาไทยสำหรับ SME: จัดซื้อ สต็อก การผลิต POS CRM งานบริการ บุคคลและเงินเดือน และบัญชีไทย ในฐานข้อมูลเดียว เริ่มใช้ฟรี"
      : "Tonbab (ต้นแบบ) is a Thai-first cloud ERP for SMEs: purchasing, inventory, manufacturing, POS, CRM, service, HR & payroll and Thai accounting in one database. Free plan available.",
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    offers: PLAN_FACTS.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: `${p.seats}${p.from ? "+" : ""} ${p.seats === 1 ? "user" : "users"}, ${p.code === "free" ? "every module except Accounting" : "every module"}, billed yearly (monthly = yearly ÷ 10)`,
      price: p.yearly,
      priceCurrency: "THB",
      url: `${SITE_ORIGIN}/${locale}/pricing`,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.yearly,
        priceCurrency: "THB",
        unitCode: "ANN",
        valueAddedTaxIncluded: false,
        ...(p.from ? { minPrice: p.yearly } : {}),
      },
    })),
  };
}

export function faqJsonLd(
  items: { q: string; a: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/** Per-locale OG card path generated by scripts/og/generate.mjs. */
export function ogImage(slug: string, locale: Locale): string {
  return `${SITE_ORIGIN}/og/${slug}-${locale}.jpg`;
}

/**
 * Build the PageSeo for a hand-built marketing page: canonical + hreflang
 * for every locale, per-page OG card, optional breadcrumb trail (names in
 * the page language) and extra JSON-LD.
 */
export function marketingSeo(input: {
  url: URL;
  cdnBaseUrl?: string | null;
  locale: Locale;
  /** Path after the locale, e.g. "/pricing" ("" for home). */
  path: string;
  title: string;
  description: string;
  /** OG card slug; defaults to the path with slashes → dashes. */
  og?: string;
  breadcrumbs?: { name: string; path: string }[];
  jsonLd?: Array<Record<string, unknown>>;
  robots?: PageSeo["robots"];
}): PageSeo {
  const origin = resolveOrigin(input.url, input.cdnBaseUrl);
  const alternates: Partial<Record<Locale, string>> = {};
  for (const l of SUPPORTED_LOCALES)
    alternates[l] = canonicalUrl(origin, `/${l}${input.path}`);
  const slug =
    input.og ?? (input.path.replace(/^\//, "").replace(/\//g, "-") || "home");
  const ld = [...(input.jsonLd ?? [])];
  if (input.breadcrumbs?.length) {
    ld.push(
      breadcrumbJsonLd(
        input.breadcrumbs.map((b) => ({
          name: b.name,
          url: canonicalUrl(origin, `/${input.locale}${b.path}`),
        })),
      ),
    );
  }
  return {
    title: input.title,
    description: input.description,
    canonical: canonicalUrl(origin, `/${input.locale}${input.path}`),
    locale: input.locale,
    alternates,
    image: ogImage(slug, input.locale),
    ogType: "website",
    robots: input.robots,
    jsonLd: ld,
  };
}

/** Home crumb label in each language. */
export const HOME_CRUMB: Bi = { en: "Home", th: "หน้าแรก" };
