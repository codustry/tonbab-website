/**
 * Customers shown on the site. Owner confirmed logo/name permission for
 * exactly these companies (2026-11-17). Add a company only with its
 * explicit consent (CLAUDE.md "Customer stories"). No testimonials or
 * metrics are attributed to anyone — those need separate, written consent.
 *
 * `logo` is a file in /static/customers; without one the wall renders a
 * typographic wordmark, never a recreated logo.
 */
import type { Bi } from "./compare-data";

export interface Customer {
  name: Bi;
  /** Brand shown on the wall when it differs from the company name. */
  brand?: string;
  logo?: string;
  /** Logo is light-on-dark or needs a dark tile. */
  darkTile?: boolean;
}

export const customers: Customer[] = [
  {
    name: { th: "บจก. คิเนติค เอ็นจิเนียริ่ง", en: "Kinetic Engineering" },
    logo: "/customers/kinetic-engineering.svg",
  },
  {
    name: { th: "House of Scent", en: "House of Scent" },
    brand: "LE HORM",
    logo: "/customers/le-horm.png",
  },
  {
    name: { th: "N-Rich 78", en: "N-Rich 78" },
    brand: "Kirirhom",
    logo: "/customers/kirirhom.png",
  },
  { name: { th: "Alta Trade & Supply", en: "Alta Trade & Supply" } },
  { name: { th: "Amnuay Foods and Frozen", en: "Amnuay Foods and Frozen" } },
  {
    name: {
      th: "บจก. แหลมทองอิเล็คทริค กรุ๊ป",
      en: "Laemthong Electric Group",
    },
  },
  { name: { th: "บจก. ศรีมิตรก่อสร้าง", en: "Srimitr Construction" } },
  {
    name: { th: "Codustry (Thailand)", en: "Codustry (Thailand)" },
    logo: "/brand/codustry-logo.svg",
  },
];
