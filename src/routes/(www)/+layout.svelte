<script lang="ts">
	import '../../app.css';
	import { TonbabLogo } from '$lib/components/brand';
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale, getAlternateLocale, SUPPORTED_LOCALES } from '$lib/i18n';
	import { page } from '$app/state';
	import { cookieName, cookieMaxAge } from '$lib/paraglide/runtime';
	import Seo from '$lib/components/seo/Seo.svelte';
	// Preload the two body-text faces so Thai text paints in its final font
	// without waiting for app.css to be parsed (LCP is a text block).
	import plexThai400 from '@fontsource/ibm-plex-sans-thai/files/ibm-plex-sans-thai-thai-400-normal.woff2?url';
	import plexLatin400 from '@fontsource/ibm-plex-sans-thai/files/ibm-plex-sans-thai-latin-400-normal.woff2?url';
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

	// The toggle is the ONE place a visitor states a language preference.
	// Remember it so bare `/` (Thai-first by default) sends them back to
	// the language they picked — see (www)/+page.server.ts.
	function rememberLocale() {
		try {
			document.cookie = `${cookieName}=${alternateLocale}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;
		} catch {
			/* cookies blocked — the link still switches language */
		}
	}

	const themeLogoMediaId = $derived(
		typeof data.siteSettings?.themeLogoMediaId === 'string' &&
			data.siteSettings.themeLogoMediaId
			? data.siteSettings.themeLogoMediaId
			: null,
	);
	// One list feeds the desktop dropdown, the mobile panel and the footer,
	// so a new module can't be added to one and forgotten in the others.
	const navModules: { key: string; label: () => string }[] = [
		{ key: 'operation', label: m.mkt_mod_operation_short },
		{ key: 'people', label: m.mkt_mod_people_short },
		{ key: 'commerce', label: m.mkt_mod_commerce_short },
		{ key: 'crm', label: m.mkt_mod_crm_short },
		{ key: 'service', label: m.mkt_mod_service_short },
		{ key: 'docs', label: m.mkt_mod_docs_short },
		{ key: 'accounting', label: m.mkt_mod_accounting_short }
	];
	const loc = $derived(toLocale(data.locale));

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

<svelte:head>
	<link rel="preload" as="font" type="font/woff2" href={plexThai400} crossorigin="anonymous" />
	<link rel="preload" as="font" type="font/woff2" href={plexLatin400} crossorigin="anonymous" />
</svelte:head>

<Seo seo={pageSeo} defaults={seoDefaults} locale={toLocale(data.locale)} />

<div
	class="min-h-screen flex flex-col"
	style={themePrimaryColor ? `--color-primary: ${themePrimaryColor}` : undefined}
>
	<header class="sticky top-0 z-40 border-b border-tnb-hair bg-tnb-paper/90 backdrop-blur">
		<div class="container mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
			<a href={`/${toLocale(data.locale)}`} class="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-tnb-ink" aria-label={data.siteSettings?.siteName ?? m.site_name()}>
				{#if themeLogoMediaId}
					<!-- A logo uploaded in the CMS (Design settings) overrides the built-in one. -->
					<img
						src={`/api/media/${themeLogoMediaId}`}
						alt=""
						class="h-8 w-auto"
						height="32"
					/>
				{:else}
					<TonbabLogo compact height={30} />
				{/if}
			</a>
			<nav class="hidden flex-1 items-center gap-1 whitespace-nowrap text-[15px] lg:flex">
				<!-- Marketing nav: this fork removes the shop/cart/account surface —
				     tonbab.com sells a demo, not a catalog. CMS-managed nav.primary
				     items still render so editors can add links without a deploy. -->
				<div class="relative">
					<button
						type="button"
						class="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-tnb-ink hover:bg-tnb-mist"
						aria-expanded={openMenu === 'modules'}
						onclick={(e) => { e.stopPropagation(); toggleMenu('modules'); }}
					>
						{m.mkt_nav_modules()}<ChevronDown class="h-4 w-4 transition {openMenu === 'modules' ? 'rotate-180' : ''}" aria-hidden="true" />
					</button>
					{#if openMenu === 'modules'}
						<div class="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-tnb-line bg-tnb-paper p-2 shadow-[0_10px_30px_rgba(23,22,28,0.12)]">
							{#each navModules as nm (nm.key)}
								<a href={localePath(loc, `/modules/${nm.key}`)} onclick={() => (openMenu = null)} class="flex items-center justify-between gap-2 rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{nm.label()}</a>
							{/each}
							<a href={localePath(toLocale(data.locale), '/modules')} onclick={() => (openMenu = null)} class="mt-1 block rounded-lg border-t border-tnb-line px-3 py-2 pt-2.5 font-semibold text-tnb-blue hover:bg-tnb-mist">{m.mkt_nav_all_modules()} →</a>
						</div>
					{/if}
				</div>
				<a href={localePath(loc, '/features')} class="rounded-md px-3 py-1.5 text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_features()}</a>
				<a href={localePath(loc, '/ai')} class="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-tnb-ink hover:bg-tnb-mist"><span class="text-violet-600" aria-hidden="true">✦</span>{m.mkt_nav_ai()}</a>
				<a href={localePath(toLocale(data.locale), '/compare')} class="rounded-md px-3 py-1.5 text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_compare()}</a>
				<a href={localePath(toLocale(data.locale), '/pricing')} class="rounded-md px-3 py-1.5 text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_pricing()}</a>
				<div class="relative">
					<button
						type="button"
						class="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-tnb-ink hover:bg-tnb-mist"
						aria-expanded={openMenu === 'resources'}
						onclick={(e) => { e.stopPropagation(); toggleMenu('resources'); }}
					>
						{m.mkt_nav_resources()}<ChevronDown class="h-4 w-4 transition {openMenu === 'resources' ? 'rotate-180' : ''}" aria-hidden="true" />
					</button>
					{#if openMenu === 'resources'}
						<div class="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-tnb-line bg-tnb-paper p-2 shadow-[0_10px_30px_rgba(23,22,28,0.12)]">
							<a href={localePath(toLocale(data.locale), '/docs')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_docs()}</a>
							<a href={localePath(loc, '/developers')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_developers()}</a>
							<a href="https://api.tonbab.com/docs" onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_footer_api_docs()} ↗</a>
							<a href={localePath(toLocale(data.locale), '/faq')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_faq()}</a>
							<a href={localePath(toLocale(data.locale), '/blog')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{m.nav_blog()}</a>
							<a href={localePath(toLocale(data.locale), '/story')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{m.story_nav()}</a>
							<a href={localePath(loc, '/customers')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_customers()}</a>
							<a href={localePath(loc, '/migration')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_migration()}</a>
							<a href={localePath(loc, '/what-is-tonbab')} onclick={() => (openMenu = null)} class="block rounded-lg px-3 py-2 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_what_is()}</a>
						</div>
					{/if}
				</div>
				{#each data.nav.primary as item (item.id)}
					<a href={item.href} class="rounded-md px-3 py-1.5 text-tnb-ink hover:bg-tnb-mist">{item.label}</a>
				{/each}
				<div class="ml-auto flex items-center gap-1.5">
					<HeaderSearch locale={toLocale(data.locale)} />
					<a
						href={alternateHref}
						hreflang={alternateLocale}
						onclick={rememberLocale}
						data-sveltekit-reload
						class="rounded-md px-2.5 py-1.5 text-sm text-tnb-ink-soft hover:bg-tnb-mist"
					>
						{m.lang_switch()}
					</a>
					<!-- Login is a plain link: app.tonbab.com routes signed-in/out itself. -->
					<a href="https://app.tonbab.com" class="btn-ghost text-[15px]">{m.mkt_login()}</a>
					<a href="https://app.tonbab.com/signup" class="btn-primary px-4 py-2 text-[15px]">{m.mkt_start_free()}</a>
				</div>
			</nav>
			<!-- Mobile: login stays visible; everything else folds into the panel. -->
			<div class="flex items-center gap-2 lg:hidden">
				<a href="https://app.tonbab.com/signup" class="btn-primary px-3.5 py-2 text-sm">{m.mkt_start_free()}</a>
				<button
					type="button"
					class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-tnb-ink hover:bg-tnb-mist"
					aria-expanded={mobileOpen}
					aria-label={mobileOpen ? m.mkt_menu_close() : m.mkt_menu_open()}
					onclick={() => (mobileOpen = !mobileOpen)}
				>
					{#if mobileOpen}<X class="h-5 w-5" aria-hidden="true" />{:else}<Menu class="h-5 w-5" aria-hidden="true" />{/if}
				</button>
			</div>
		</div>
		{#if mobileOpen}
			<!-- Scrolls inside itself: the header is sticky, so a panel taller than
			     the screen would otherwise hide its last rows (language, Log in). -->
			<nav class="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-tnb-hair bg-tnb-paper px-4 pb-5 pt-3 lg:hidden">
				<p class="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-tnb-ink-soft">{m.mkt_footer_modules()}</p>
				<div class="flex flex-col gap-1 text-base">
					{#each navModules as nm (nm.key)}
						<a href={localePath(loc, `/modules/${nm.key}`)} onclick={() => (mobileOpen = false)} class="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{nm.label()}</a>
					{/each}
					<a href={localePath(toLocale(data.locale), '/modules')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-semibold text-tnb-blue hover:bg-tnb-mist">{m.mkt_nav_all_modules()} →</a>
				</div>
				<div class="mt-2 flex flex-col gap-1 border-t border-tnb-line pt-2 text-base">
					<a href={localePath(loc, '/features')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_features()}</a>
					<a href={localePath(loc, '/ai')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist"><span class="text-violet-600" aria-hidden="true">✦ </span>{m.mkt_nav_ai()}</a>
					<a href={localePath(toLocale(data.locale), '/compare')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_compare()}</a>
					<a href={localePath(toLocale(data.locale), '/pricing')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_pricing()}</a>
				</div>
				<p class="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-tnb-ink-soft">{m.mkt_footer_resources()}</p>
				<div class="flex flex-col gap-1 text-base">
					<a href={localePath(toLocale(data.locale), '/docs')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_docs()}</a>
					<a href={localePath(loc, '/developers')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_developers()}</a>
					<a href="https://api.tonbab.com/docs" onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_footer_api_docs()} ↗</a>
					<a href={localePath(toLocale(data.locale), '/faq')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_faq()}</a>
					<a href={localePath(toLocale(data.locale), '/blog')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.nav_blog()}</a>
					<a href={localePath(toLocale(data.locale), '/story')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.story_nav()}</a>
					<a href={localePath(loc, '/customers')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_customers()}</a>
					<a href={localePath(loc, '/migration')} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{m.mkt_nav_migration()}</a>
					{#each data.nav.primary as item (item.id)}
						<a href={item.href} onclick={() => (mobileOpen = false)} class="rounded-lg px-3 py-2.5 font-medium text-tnb-ink hover:bg-tnb-mist">{item.label}</a>
					{/each}
				</div>
				<div class="mt-3 flex items-center gap-3 border-t border-tnb-line pt-4">
					<HeaderSearch locale={toLocale(data.locale)} />
					<a
						href={alternateHref}
						hreflang={alternateLocale}
						onclick={rememberLocale}
						data-sveltekit-reload
						class="rounded border border-tnb-line px-2.5 py-1.5 text-sm hover:bg-tnb-mist"
					>
						{m.lang_switch()}
					</a>
					<a href="https://app.tonbab.com" class="btn-ghost ml-auto">{m.mkt_login()}</a>
				</div>
			</nav>
		{/if}
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-tnb-hair bg-tnb-paper text-sm">
		<div class="container mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<p class="text-tnb-ink" aria-label={data.siteSettings?.siteName ?? m.site_name()}><TonbabLogo height={44} /></p>
				<p class="mt-2 max-w-xs leading-relaxed text-tnb-ink-soft">{m.site_description()}</p>
				<div class="mt-5 flex items-center gap-2">
					<a href="https://app.tonbab.com/signup" class="btn-primary px-4 py-2">{m.mkt_start_free()}</a>
					<a href="https://app.tonbab.com" class="btn-ghost">{m.mkt_login()}</a>
				</div>
			</div>
			<nav aria-label={m.mkt_footer_modules()}>
				<p class="text-sm font-medium text-tnb-ink-soft">{m.mkt_footer_modules()}</p>
				<ul class="mt-2 space-y-0.5">
					{#each navModules as nm (nm.key)}
						<li><a href={localePath(loc, `/modules/${nm.key}`)} class="inline-block py-1 text-tnb-ink hover:underline">{nm.label()}</a></li>
					{/each}
					<li><a href={localePath(toLocale(data.locale), '/modules')} class="inline-block py-1 font-medium text-tnb-blue hover:underline">{m.mkt_nav_all_modules()}</a></li>
				</ul>
			</nav>
			<nav aria-label={m.mkt_footer_resources()}>
				<p class="text-sm font-medium text-tnb-ink-soft">{m.mkt_footer_resources()}</p>
				<ul class="mt-2 space-y-0.5">
					<li><a href={localePath(toLocale(data.locale), '/docs')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_docs()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/faq')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_faq()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/blog')} class="inline-block py-1 text-tnb-ink hover:underline">{m.nav_blog()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/story')} class="inline-block py-1 text-tnb-ink hover:underline">{m.story_nav()}</a></li>
					<li><a href={localePath(loc, '/developers')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_developers()}</a></li>
					<li><a href="https://api.tonbab.com/docs" class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_footer_api_docs()}</a></li>
				</ul>
			</nav>
			<nav aria-label={m.mkt_footer_company()}>
				<p class="text-sm font-medium text-tnb-ink-soft">{m.mkt_footer_company()}</p>
				<ul class="mt-2 space-y-0.5">
					<li><a href={localePath(loc, '/what-is-tonbab')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_what_is()}</a></li>
					<li><a href={localePath(loc, '/features')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_features()}</a></li>
					<li><a href={localePath(loc, '/ai')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_ai()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/compare')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_compare()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/pricing')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_pricing()}</a></li>
					<li><a href={localePath(loc, '/customers')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_customers()}</a></li>
					<li><a href={localePath(loc, '/migration')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_nav_migration()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/privacy')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_footer_privacy()}</a></li>
					<li><a href={localePath(toLocale(data.locale), '/terms')} class="inline-block py-1 text-tnb-ink hover:underline">{m.mkt_footer_terms()}</a></li>
					{#each data.nav.footer as item (item.id)}
						<li><a href={item.href} class="inline-block py-1 text-tnb-ink hover:underline">{item.label}</a></li>
					{/each}
				</ul>
			</nav>
		</div>
		<div class="border-t border-tnb-hair">
			<div class="container mx-auto max-w-6xl px-4 py-6 text-tnb-ink-soft">
				<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
					<p>{m.footer_copyright({ year: new Date().getFullYear().toString() })}</p>
					<p>
						<a href="https://www.codustry.com" class="hover:underline">{m.mkt_footer_product_of()}</a>
						<span class="mx-2 text-tnb-line">·</span>{m.mkt_footer_contact()}:
						<a href="mailto:sales@codustry.com" class="hover:underline">sales@codustry.com</a>
						<span class="mx-1">·</span><a href="tel:028734448" class="hover:underline">02-873-4448</a>
					</p>
				</div>
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
