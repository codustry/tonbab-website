<script lang="ts">
	import '../../app.css';
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale, getAlternateLocale, SUPPORTED_LOCALES } from '$lib/i18n';
	import { page } from '$app/state';
	import Seo from '$lib/components/seo/Seo.svelte';
	import CookieBanner from '$lib/components/consent/CookieBanner.svelte';
	import HeaderSearch from '$lib/components/www/HeaderSearch.svelte';
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
		image: undefined,
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
</script>

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
			<nav class="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
				<!-- Marketing nav: this fork removes the shop/cart/account surface —
				     tonbab.com sells a demo, not a catalog. CMS-managed nav.primary
				     items still render so editors can add links without a deploy. -->
				<a href={localePath(toLocale(data.locale), '/modules')} class="font-medium text-tnb-ink-soft hover:text-tnb-blue">{m.mkt_nav_modules()}</a>
				<a href={localePath(toLocale(data.locale), '/compare')} class="font-medium text-tnb-ink-soft hover:text-tnb-blue">{m.mkt_nav_compare()}</a>
				<a href={localePath(toLocale(data.locale), '/pricing')} class="font-medium text-tnb-ink-soft hover:text-tnb-blue">{m.mkt_nav_pricing()}</a>
				<a href={localePath(toLocale(data.locale), '/docs')} class="font-medium text-tnb-ink-soft hover:text-tnb-blue">{m.mkt_nav_docs()}</a>
				<a href={localePath(toLocale(data.locale), '/faq')} class="font-medium text-tnb-ink-soft hover:text-tnb-blue">{m.mkt_nav_faq()}</a>
				<a href={localePath(toLocale(data.locale), '/story')} class="font-medium text-tnb-ink-soft hover:text-tnb-blue">{m.story_nav()}</a>
				<a href={localePath(toLocale(data.locale), '/blog')} class="hover:text-primary">{m.nav_blog()}</a>
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
		</div>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-tnb-line bg-tnb-paper py-8 text-sm text-tnb-ink-soft">
		<div class="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
			<p>{m.footer_copyright({ year: new Date().getFullYear().toString() })}</p>
			{#if data.nav.footer.length > 0}
				<nav class="flex flex-wrap gap-4">
					{#each data.nav.footer as item (item.id)}
						<a href={item.href} class="hover:text-foreground">{item.label}</a>
					{/each}
				</nav>
			{/if}
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
