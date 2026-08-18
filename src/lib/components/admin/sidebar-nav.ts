import type { ComponentType } from "svelte";
import type { Pathname } from "$app/types";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Image as ImageIcon,
  Database,
  Folder,
  Menu as MenuIcon,
  Tag,
  Users,
  Settings,
  ScrollText,
  Puzzle,
  Inbox,
  Mail,
  MessageSquare,
  Webhook,
  KeyRound,
  Ruler,
  Plug,
} from "lucide-svelte";
import * as m from "$lib/paraglide/messages";

// Registry lives in ./nav-registry (fork change — breaks the Vite SSR
// cycle with $lib/plugins/registrations; see that file's header).
export {
  registerNavGroup,
  registerNavItem,
  listNavGroups,
  type NavItem,
  type NavGroup,
} from "./nav-registry";
import { registerNavGroup, listNavGroups } from "./nav-registry";
import type { NavGroup } from "./nav-registry";

// ─── Core registration ─────────────────────────────────────────
// Core groups + items registered at module load. Order determines
// sidebar order; plugin groups will render after these.
//
// Plugin registrations happen via the side-effect import at the
// bottom of this file — after core is in place, so plugin groups
// slot in below core groups.

registerNavGroup({
  id: "main",
  title: m.cms_app_name,
  items: [
    { href: "/admin/dashboard", label: m.cms_dashboard, icon: LayoutDashboard },
    { href: "/admin/articles", label: m.cms_articles, icon: FileText },
    {
      href: "/admin/pages",
      label: m.cms_pages,
      icon: FilePlus,
      roles: ["super_admin", "admin", "editor"],
    },
    { href: "/admin/media", label: m.cms_media, icon: ImageIcon },
    {
      href: "/admin/navigation",
      label: m.cms_navigation,
      icon: MenuIcon,
      roles: ["super_admin", "admin", "editor"],
    },
  ],
});

registerNavGroup({
  id: "taxonomy",
  title: m.cms_categories,
  items: [
    {
      // Phase 4 (#68): user-defined content types. Editors see this too
      // (#125): the entry-editing routes beneath the index already admit
      // editors, but the only link into the area was admin-gated — so
      // the registry was admin-only in practice regardless of the route
      // guards. The index now renders read-only for editors; DEFINING a
      // type (a schema change) remains admin-gated at the action level.
      href: "/admin/content",
      label: () => "Content types",
      icon: Database,
      roles: ["super_admin", "admin", "editor"],
    },
    {
      // Phase 3 (#88/#130): typed spec/attribute definitions. Editors can
      // view; create/delete actions are admin-gated server-side.
      href: "/admin/specs",
      label: () => "Specs",
      icon: Ruler,
      roles: ["super_admin", "admin", "editor"],
    },
    { href: "/admin/categories", label: m.cms_categories, icon: Folder },
    { href: "/admin/tags", label: m.cms_tags, icon: Tag },
    {
      href: "/admin/blocks",
      label: m.cms_blocks,
      icon: Puzzle,
      roles: ["super_admin", "admin", "editor"],
    },
    {
      href: "/admin/forms",
      label: m.cms_forms,
      icon: Inbox,
      roles: ["super_admin", "admin", "editor"],
    },
    {
      href: "/admin/comments",
      label: m.cms_comments,
      icon: MessageSquare,
      roles: ["super_admin", "admin", "editor"],
    },
  ],
});

registerNavGroup({
  id: "admin",
  title: m.cms_admin,
  items: [
    {
      href: "/admin/users",
      label: m.cms_users,
      icon: Users,
      roles: ["super_admin", "admin"],
    },
    {
      href: "/admin/audit",
      label: m.cms_audit,
      icon: ScrollText,
      roles: ["super_admin", "admin"],
    },
    {
      href: "/admin/subscribers",
      label: m.cms_subscribers,
      icon: Mail,
      roles: ["super_admin", "admin"],
    },
    {
      href: "/admin/webhooks",
      label: m.cms_webhooks,
      icon: Webhook,
      roles: ["super_admin", "admin"],
    },
    {
      href: "/admin/api-keys",
      label: m.cms_api_keys,
      icon: KeyRound,
      roles: ["super_admin", "admin"],
    },
    {
      href: "/admin/settings/secrets",
      label: () => "Credentials",
      icon: KeyRound,
      // super_admin only — these keys create charges and issue refunds.
      // Deliberately narrower than site settings, which admits `admin`.
      roles: ["super_admin"],
    },
    {
      // #160 Phase E — commerce-network pairing (Tonbab sync). Guide +
      // live status only; the secret VALUES stay on the super_admin
      // Credentials page.
      href: "/admin/settings/connections",
      label: m.cms_connections,
      icon: Plug,
      roles: ["super_admin", "admin"],
    },
    {
      href: "/admin/settings",
      label: m.cms_settings,
      icon: Settings,
      roles: ["super_admin", "admin"],
    },
  ],
});

/**
 * @deprecated Use `listNavGroups()` — the direct array export captured
 * groups at module load time and missed plugin registrations that
 * happened after import. Kept as a live getter (Proxy) so old imports
 * still work and always see the current set.
 */
export const navGroups = new Proxy([] as NavGroup[], {
  get(_t, prop, receiver) {
    return Reflect.get(listNavGroups(), prop, receiver);
  },
  has(_t, prop) {
    return Reflect.has(listNavGroups(), prop);
  },
  ownKeys(_t) {
    return Reflect.ownKeys(listNavGroups());
  },
  getOwnPropertyDescriptor(_t, prop) {
    return Object.getOwnPropertyDescriptor(listNavGroups(), prop);
  },
});

// ─── Plugin side-effect imports ─────────────────────────────────
// Importing this at the BOTTOM (after core registrations above) means
// plugin groups slot in below core groups in insertion order. This
// import runs in BOTH client + server bundles because sidebar-nav.ts
// is imported by Sidebar.svelte (a browser component) — which was the
// original bug fix: plugin registrations that only ran server-side
// vanished after client hydration.
import "$lib/plugins/registrations";
