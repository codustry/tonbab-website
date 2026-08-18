/**
 * Nav registry — extracted from sidebar-nav.ts (fork change).
 *
 * WHY: upstream khaopad has plugins import registerNavGroup/registerNavItem
 * FROM sidebar-nav.ts, while sidebar-nav.ts side-effect-imports
 * $lib/plugins/registrations (which imports the plugins). That cycle
 * (sidebar-nav → registrations → plugin → sidebar-nav) works in production
 * builds but intermittently breaks Vite 5 dev SSR with "dependency module
 * is not yet fully initialized". Plugins now import THIS module, which
 * imports nothing of theirs — the cycle is gone. sidebar-nav re-exports
 * everything so other upstream consumers keep working.
 */
import type { ComponentType } from "svelte";
import type { Pathname } from "$app/types";

export type NavItem = {
  href: Pathname;
  /** Localized label (called at render time) */
  label: () => string;
  icon: ComponentType;
  /** Roles that can see this item. Empty = visible to everyone signed in. */
  roles?: ReadonlyArray<"super_admin" | "admin" | "editor" | "author">;
};

export type NavGroup = {
  /** Stable key used for localStorage open/close state */
  id: string;
  /** Localized group title (shown above items, hidden in collapsed mode) */
  title: () => string;
  items: ReadonlyArray<NavItem>;
};

/**
 * Runtime nav registry.
 *
 * Core groups + items are seeded at module load (below). Plugins call
 * `registerNavGroup()` or `registerNavItem()` at boot to contribute
 * their own entries — plugin groups appear after core groups in the
 * sidebar; plugin items appended to an existing group appear after
 * that group's core items.
 *
 * The Map preserves insertion order (ES2015+ guarantee) so ordering
 * is stable + predictable. `listNavGroups()` returns a fresh snapshot
 * on each call — do NOT hold onto the reference across plugin
 * registrations, or you'll miss late-registering plugins.
 */
type RegistryEntry = { title: () => string; items: NavItem[] };

/**
 * Lazily-initialized so registration cannot depend on module evaluation
 * ORDER.
 *
 * This file imports `$lib/plugins/registrations` at the bottom as a
 * side effect, so plugin `registerNavGroup()` calls run during this
 * module's own initialization. A bundler is free to hoist those calls
 * above a top-level `const registry = new Map()`, at which point every
 * request throws:
 *
 *   TypeError: Cannot read properties of undefined (reading 'get')
 *       at registerNavGroup (sidebar-nav.js)
 *
 * That is not hypothetical — it took the demo deployment down with a
 * Worker 1101 on every route, including /api/health, after an unrelated
 * icon import shifted the import graph enough to change the order.
 *
 * Reading through this accessor makes the order irrelevant: whoever
 * touches the registry first creates it.
 */
// `var`, deliberately — NOT `let`. This is the one case where var is
// correct and let is a bug.
//
// `let` is block-scoped and lives in the Temporal Dead Zone until its
// declaration executes: touching it before then throws
// `ReferenceError: Cannot access '_registry' before initialization`.
// `var` is hoisted and initialized to `undefined`, so the guard below
// simply sees undefined and creates the Map.
//
// That matters because this module imports `$lib/plugins/registrations`
// as a side effect at the bottom of the file, and a bundler is free to
// hoist those plugin registration calls ABOVE this declaration. It did:
// production minified the shop plugin's registerPaymentProvider call
// directly before `let pe;` (this variable), so every admin page threw
// on hydration and rendered "500 Internal Error".
//
// The lazy accessor added after the earlier outage fixed the Map being
// undefined, but not the TDZ on the binding itself — the accessor cannot
// run at all if reaching the variable throws. `var` closes that gap.
//
// eslint-disable-next-line no-var
var _registry: Map<string, RegistryEntry> | undefined;
function registry(): Map<string, RegistryEntry> {
  if (!_registry) _registry = new Map<string, RegistryEntry>();
  return _registry;
}

/**
 * Register a new nav group. Idempotent on id — a second call with the
 * same id updates the title (last write wins) but preserves items.
 * Plugins wanting to contribute to an existing core group should use
 * `registerNavItem()` instead.
 */
export function registerNavGroup(group: NavGroup): void {
  const existing = registry().get(group.id);
  if (existing) {
    existing.title = group.title;
    // Merge items — new ones appended, preserving core order.
    for (const item of group.items) {
      if (!existing.items.some((i) => i.href === item.href)) {
        existing.items.push(item);
      }
    }
    return;
  }
  registry().set(group.id, {
    title: group.title,
    items: [...group.items],
  });
}

/**
 * Append a nav item to an existing group. Silently no-ops if the
 * group doesn't exist — plugins should register their group first
 * (or accept that their items will only appear when the group
 * they targeted is registered by someone else).
 *
 * Duplicate items (same href) are ignored — safe to call at every
 * plugin boot.
 */
export function registerNavItem(groupId: string, item: NavItem): void {
  const group = registry().get(groupId);
  if (!group) return;
  if (group.items.some((i) => i.href === item.href)) return;
  group.items.push(item);
}

/**
 * Snapshot of current nav groups. Called by Sidebar.svelte on each
 * render (Svelte re-runs the derived that reads it whenever
 * dependencies change). Returns groups in registration order.
 */
export function listNavGroups(): ReadonlyArray<NavGroup> {
  return Array.from(registry().entries()).map(([id, { title, items }]) => ({
    id,
    title,
    items: [...items] as ReadonlyArray<NavItem>,
  }));
}

