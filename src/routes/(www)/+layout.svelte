<script lang="ts">
	import '../../app.css';
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale, getAlternateLocale, SUPPORTED_LOCALES } from '$lib/i18n';
	import { page } from '$app/state';
	import Seo from '$lib/components/seo/Seo.svelte';
	import CookieBanner from '$lib/components/consent/CookieBanner.svelte';
	import HeaderSearch from '$lib/components/www/HeaderSearch.svelte';
	import { Menu, X, ChevronDown } from 'lucide-svelte';
	import type { PageSeo } from '$lib/seo';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	// Each public +page.server.ts may return `seo: PageSeo`; the layout
	// reads it via $app/state and renders all SEO tags via <Seo />.
	const pageSeo = $derived((page.data.seo as PageSeo | undefined) ?? undefined);
	const seoDefaults = $derived({
		siteName: data.siteSettings?.siteName ?? m.site_name(),
		description: m.site_description(),
		// Brand OG card (1200×630) — absolute URL, scrapers ignore relatives.
		image: "https://www.tonbab.com/og.jpg",
		twitter: undefined,
	});

	// ─── Design settings (v3.17 D6) ─────────────────────────────
	// themePrimaryColor overrides the --color-primary token via an
	// inline style on the layout root: SSR renders it into the first
	// HTML payload, so a re-branded store never flashes the default
	// theme. The value is validated server-side to strict #hex before
	// it can be stored, so interpolating it into a style attribute is
	// safe. Empty/undefined leaves the app.css token untouched.
	const themePrimaryColor = $derived(
		typeof data.siteSettings?.themePrimaryColor === 'string' &&
			/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(data.siteSettings.themePrimaryColor)
			? data.siteSettings.themePrimaryColor
			: null,
	);
	// ─── Language switcher ──────────────────────────────────────
	// Swapping the locale used to drop the visitor on '/', so a shopper
	// deep in filtered results lost their place on every switch. Slugs
	// are shared across locales, so the same path resolves in both —
	// swap only the leading locale segment and keep the query string.
	const alternateLocale = $derived(getAlternateLocale(toLocale(data.locale)));
	const alternateHref = $derived.by(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);
		if (SUPPORTED_LOCALES.includes(segments[0] as (typeof SUPPORTED_LOCALES)[number])) {
			segments[0] = alternateLocale;
		} else {
			segments.unshift(alternateLocale);
		}
		return `/${segments.join('/')}${page.url.search}`;
	});

	const themeLogoMediaId = $derived(
		typeof data.siteSettings?.themeLogoMediaId === 'string' &&
			data.siteSettings.themeLogoMediaId
			? data.siteSettings.themeLogoMediaId
			: null,
	);
	let mobileOpen = $state(false);
	// Desktop dropdowns — one open at a time; outside click / Escape closes.
	let openMenu = $state<'modules' | 'resources' | null>(null);
	function toggleMenu(which: 'modules' | 'resources') {
		openMenu = openMenu === which ? null : which;
	}
</script>

<svelte:window
	onclick={() => (openMenu = null)}
	onkeydown={(e) => { if (e.key === 'Escape') openMenu = null; }}
/>

<Seo seo={pageSeo} defaults={seoDefaults} locale={toLocale(data.locale)} />

<div
	class="min-h-screen flex flex-col"
	style={themePrimaryColor ? `--color-primary: ${themePrimaryColor}` : undefined}
>
	<header class="sticky top-0 z-40 border-b border-tnb-line bg-tnb-paper/95 backdrop-blur">
		<div class="container mx-auto px-4 py-4 flex items-center justify-between">
			<a href="/" class="flex items-center gap-2 text-xl font-bold tracking-tight text-tnb-ink">
				{#if themeLogoMediaId}
					<img
						src={`/api/media/${themeLogoMediaId}`}
						alt=""
						class="h-8 w-auto"
						height="32"
					/>
				{/if}
				{data.siteSettings?.siteName ?? m.site_name()}</a
			>
			<nav class="hidden md:flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
				<!-- Marketing nav: this fork removes the shop/cart/account surface —
				     tonbab.com sells a demo, not a catalog. CMS-managed nav.primary
				     items still render so editors can add links without a deploy. -->
				<div class="relative">
					<button
						type="button"
						class="inline-flex items-center gap-1 font-medium text-tnb-ink-soft hover:text-tnb-blue"
						aria-expanded={openMenu === 'modules'}
						onclick={(e) => { e.stopPropagation(); toggleMenu('modules'); }}
					>
						{m.mkt_nav_modules()}<ChevronDown class="h-4 w-4 transition {openMenu === 'modules' ? 'rotate-180' : ''}" aria-hidden="true" />
					</button>
					{#if openMenu === 'modules'}
						<div class="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-tnb-line bg-tnb-paper p-2 shadow-[0_10px_30px_rgba(23,22,28,0.12)]">
							<a href={localePath(toLocale(data.locale), '/modules/operation')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_mod_operation_short()}</a>
							<a href={localePath(toLocale(data.locale), '/modules/people')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_mod_people_short()}</a>
							<a href={localePath(toLocale(data.locale), '/modules/commerce')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_mod_commerce_short()}</a>
							<a href={localePath(toLocale(data.locale), '/modules/crm')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_mod_crm_short()}</a>
							<a href={localePath(toLocale(data.locale), '/modules')} onclick={() => (openMenu = null)} class="mt-1 block rounded-lg border-t border-tnb-line px-3 py-2 pt-2.5 font-semibold text-tnb-blue hover:bg-tnb-wash">{m.mkt_nav_all_modules()} →</a>
						</div>
					{/if}
				</div>
				<a href={localePath(toLocale(data.locale), '/compare')} class="font-medium text-tnb-ink-soft hover:text-tnb-blue">{m.mkt_nav_compare()}</a>
				<a href={localePath(toLocale(data.locale), '/pricing')} class="font-medium text-tnb-ink-soft hover:text-tnb-blue">{m.mkt_nav_pricing()}</a>
				<div class="relative">
					<button
						type="button"
						class="inline-flex items-center gap-1 font-medium text-tnb-ink-soft hover:text-tnb-blue"
						aria-expanded={openMenu === 'resources'}
						onclick={(e) => { e.stopPropagation(); toggleMenu('resources'); }}
					>
						{m.mkt_nav_resources()}<ChevronDown class="h-4 w-4 transition {openMenu === 'resources' ? 'rotate-180' : ''}" aria-hidden="true" />
					</button>
					{#if openMenu === 'resources'}
						<div class="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-tnb-line bg-tnb-paper p-2 shadow-[0_10px_30px_rgba(23,22,28,0.12)]">
							<a href={localePath(toLocale(data.locale), '/docs')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_nav_docs()}</a>
							<a href={localePath(toLocale(data.locale), '/faq')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_nav_faq()}</a>
							<a href={localePath(toLocale(data.locale), '/blog')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-wash">{m.nav_blog()}</a>
							<a href={localePath(toLocale(data.locale), '/story')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-wash">{m.story_nav()}</a>
						</div>
					{/if}
				</div>
				{#each data.nav.primary as item (item.id)}
					<a href={item.href} class="hover:text-primary">{item.label}</a>
				{/each}
				<HeaderSearch locale={toLocale(data.locale)} />
				<a
					href={alternateHref}
					data-sveltekit-reload
					class="px-2 py-1 border border-border rounded text-xs hover:bg-muted"
				>
					{m.lang_switch()}
				</a>
				<!-- Login is a plain link: app.tonbab.com routes signed-in/out itself. -->
				<a
					href="https://app.tonbab.com"
					class="inline-flex items-center rounded-lg bg-tnb-amber px-4 py-2 font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep transition hover:-translate-y-0.5"
				>
					{m.mkt_login()}
				</a>
			</nav>
			<!-- Mobile: login stays visible; everything else folds into the panel. -->
			<div class="flex items-center gap-2 md:hidden">
				<a
					href="https://app.tonbab.com"
					class="inline-flex items-center rounded-lg bg-tnb-amber px-3.5 py-2 text-sm font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep"
				>
					{m.mkt_login()}
				</a>
				<button
					type="button"
					class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-tnb-line text-tnb-ink"
					aria-expanded={mobileOpen}
					aria-label={mobileOpen ? m.mkt_menu_close() : m.mkt_menu_open()}
					onclick={() => (mobileOpen = !mobileOpen)}
				>
					{#if mobileOpen}
			<nav class="border-t border-tnb-line bg-tnb-paper px-4 pb-5 pt-3 md:hidden">
				<p class="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-tnb-ink-soft">{m.mkt_footer_modules()}</p>
				<div class="flex flex-col gap-1 text-base">
					<a href={localePath(toLocale(data.locale), '/modules/operation')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_mod_operation_short()}</a>
					<a href={localePath(toLocale(data.locale), '/modules/people')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_mod_people_short()}</a>
					<a href={localePath(toLocale(data.locale), '/modules/commerce')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_mod_commerce_short()}</a>
					<a href={localePath(toLocale(data.locale), '/modules/crm')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_mod_crm_short()}</a>
					<a href={localePath(toLocale(data.locale), '/modules')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-semibold text-tnb-blue hover:bg-tnb-wash">{m.mkt_nav_all_modules()} →</a>
				</div>
				<div class="mt-2 flex flex-col gap-1 border-t border-tnb-line pt-2 text-base">
					<a href={localePath(toLocale(data.locale), '/compare')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_nav_compare()}</a>
					<a href={localePath(toLocale(data.locale), '/pricing')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_nav_pricing()}</a>
				</div>
				<p class="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-tnb-ink-soft">{m.mkt_footer_resources()}</p>
				<div class="flex flex-col gap-1 text-base">
					<a href={localePath(toLocale(data.locale), '/docs')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_nav_docs()}</a>
					<a href={localePath(toLocale(data.locale), '/faq')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.mkt_nav_faq()}</a>
					<a href={localePath(toLocale(data.locale), '/blog')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.nav_blog()}</a>
					<a href={localePath(toLocale(data.locale), '/story')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{m.story_nav()}</a>
					{#each data.nav.primary as item (item.id)}
						<a href={item.href} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-wash">{item.label}</a>
					{/each}
				</div>
				<div class="mt-3 flex items-center gap-3 border-t border-tnb-line pt-4">
					<HeaderSearch locale={toLocale(data.locale)} />
					<a
						href={alternateHref}
						data-sveltekit-reload
						class="rounded border border-tnb-line px-2.5 py-1.5 text-sm hover:bg-tnb-wash"
					>
						{m.lang_switch()}
					</a>
				</div>
			</nav>
		{/if}
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-tnb-line bg-tnb-wash text-sm">
		<div class="container mx-auto grid gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<p class="text-lg font-bold tracking-tight text-tnb-ink">{data.siteSettings?.siteName ?? m.site_name()}</p>
				<p class="mt-2 max-w-xs leading-relaxed text-tnb-ink-soft">{m.site_description()}</p>
				<a
					href="https://app.tonbab.com"
					class="mt-4 inline-flex items-center rounded-lg bg-tnb-amber px-4 py-2 font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep transition hover:-translate-y-0.5"
				>
					{m.mkt_login()}
				</a>
			</div>
			<nav aria-label={m.mkt_footer_modules()}>
				<p class="text-xs font-semibold uppercase tracking-wide text-tnb-ink-soft">{m.mkt_footer_modules()}</p>
				<ul class="mt-3 space-y-2">
					<li><a href={localePath(toLocale(data.locale), '/modules/operation')} class="text-tnb-ink hover:text-tnb-blue">{m.mkt_mod_operation_short()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/modules/people')} class="text-tnb-ink hover:text-tnb-blue">{m.mkt_mod_people_short()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/modules/commerce')} class="text-tnb-ink hover:text-tnb-blue">{m.mkt_mod_commerce_short()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/modules/crm')} class="text-tnb-ink hover:text-tnb-blue">{m.mkt_mod_crm_short()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/modules')} class="font-medium text-tnb-blue hover:underline">{m.mkt_nav_all_modules()}</a></li>
				</ul>
			</nav>
			<nav aria-label={m.mkt_footer_resources()}>
				<p class="text-xs font-semibold uppercase tracking-wide text-tnb-ink-soft">{m.mkt_footer_resources()}</p>
				<ul class="mt-3 space-y-2">
					<li><a href={localePath(toLocale(data.locale), '/docs')} class="text-tnb-ink hover:text-tnb-blue">{m.mkt_nav_docs()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/faq')} class="text-tnb-ink hover:text-tnb-blue">{m.mkt_nav_faq()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/blog')} class="text-tnb-ink hover:text-tnb-blue">{m.nav_blog()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/story')} class="text-tnb-ink hover:text-tnb-blue">{m.story_nav()}</a></li>
					<li><a href="https://api.tonbab.com/docs" class="text-tnb-ink hover:text-tnb-blue">API</a></li>
				</ul>
			</nav>
			<nav aria-label={m.mkt_footer_company()}>
				<p class="text-xs font-semibold uppercase tracking-wide text-tnb-ink-soft">{m.mkt_footer_company()}</p>
				<ul class="mt-3 space-y-2">
					<li><a href={localePath(toLocale(data.locale), '/compare')} class="text-tnb-ink hover:text-tnb-blue">{m.mkt_nav_compare()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/pricing')} class="text-tnb-ink hover:text-tnb-blue">{m.mkt_nav_pricing()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/privacy')} class="text-tnb-ink hover:text-tnb-blue">Privacy</a></li>
					<li><a href={localePath(toLocale(data.locale), '/terms')} class="text-tnb-ink hover:text-tnb-blue">Terms</a></li>
					{#each data.nav.footer as item (item.id)}
						<li><a href={item.href} class="text-tnb-ink hover:text-tnb-blue">{item.label}</a></li>
					{/each}
				</ul>
			</nav>
		</div>
		<div class="border-t border-tnb-line">
			<div class="container mx-auto px-4 py-5 text-tnb-ink-soft">
				<p>{m.footer_copyright({ year: new Date().getFullYear().toString() })}</p>
			</div>
		</div>
	</footer>
</div>

<!--
	Cloudflare Web Analytics beacon (v1.8). Only loaded when:
	- the operator set a token in /admin/settings, AND
	- the visitor opted in to analytics via the cookie banner.
	The first-party D1 page-view counter runs regardless.
-->
{#if data.siteSettings?.cfaToken && data.consent?.analytics}
	<script
		defer
		src="https://static.cloudflareinsights.com/beacon.min.js"
		data-cf-beacon={`{"token": "${data.siteSettings.cfaToken}"}`}
	></script>
{/if}

<CookieBanner
	consent={data.consent}
	privacyHref={data.hasPrivacyPage
		? localePath(toLocale(data.locale), '/privacy-policy')
		: undefined}
/>
