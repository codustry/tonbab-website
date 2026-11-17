<script lang="ts">
	import { customers } from '$lib/marketing/customers-data';
	import type { Locale } from '$lib/server/content/types';

	/** Customer logo wall — real customers with permission only. */
	let { locale, showIndustry = false }: { locale: Locale; showIndustry?: boolean } = $props();
	const t = (b: { en: string; th: string }) => (locale === 'th' ? b.th : b.en);
</script>

<ul class="grid grid-cols-2 gap-3 sm:grid-cols-4">
	{#each customers as c (c.name.en)}
		<li class="flex flex-col items-center justify-center rounded-xl px-4 py-5 text-center ring-1 {c.darkTile ? 'bg-tnb-ink ring-tnb-ink' : 'bg-white ring-tnb-line'}">
			<div class="flex h-12 items-center justify-center">
				{#if c.logo}
					<img src={c.logo} alt={c.brand ? `${c.brand} — ${t(c.name)}` : t(c.name)} class="max-h-10 w-auto max-w-[9rem] object-contain" loading="lazy" decoding="async" width={c.w ?? 144} height={c.h ?? 40} />
				{:else}
					<span class="text-[15px] leading-tight font-bold tracking-tight text-tnb-ink-soft uppercase">{c.name.en}</span>
				{/if}
			</div>
			{#if showIndustry}
				<p class="mt-2 text-xs {c.darkTile ? 'text-white/75' : 'text-tnb-ink-soft'}">{t(c.name)}{#if c.brand} · {c.brand}{/if}</p>
			{/if}
		</li>
	{/each}
</ul>
