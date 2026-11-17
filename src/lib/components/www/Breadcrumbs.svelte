<script lang="ts">
	import { localePath } from '$lib/i18n';
	import type { Locale } from '$lib/server/content/types';

	/** Visible trail matching the page's BreadcrumbList JSON-LD. */
	let { locale, items }: { locale: Locale; items: { name: string; path?: string }[] } = $props();
	const home = $derived(locale === 'th' ? 'หน้าแรก' : 'Home');
</script>

<nav aria-label={locale === 'th' ? 'เส้นทางหน้า' : 'Breadcrumb'} class="text-sm text-tnb-ink-soft">
	<ol class="flex flex-wrap items-center gap-1.5">
		<li><a href={localePath(locale, '/')} class="hover:text-tnb-blue hover:underline">{home}</a></li>
		{#each items as it, i (i)}
			<li aria-hidden="true">/</li>
			<li>
				{#if it.path && i < items.length - 1}
					<a href={localePath(locale, it.path)} class="hover:text-tnb-blue hover:underline">{it.name}</a>
				{:else}
					<span aria-current={i === items.length - 1 ? 'page' : undefined} class="text-tnb-ink">{it.name}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
