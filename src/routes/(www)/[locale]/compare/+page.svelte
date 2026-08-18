<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import { thaiVendors, globalVendors, sourceNote, type Verdict } from '$lib/marketing/compare-data';
	import { Check, X, Minus } from 'lucide-svelte';
	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	const t = $derived.by(() => (b: { en: string; th: string }) => (locale === 'th' ? b.th : b.en));

	const verdictLabel: Record<Verdict, () => string> = {
		yes: m.cmp_v_yes, no: m.cmp_v_no, partial: m.cmp_v_partial
	};
</script>

{#snippet verdict(v: Verdict)}
	{#if v === 'yes'}
		<span class="inline-flex items-center gap-1 font-semibold text-green-700"><Check class="h-4 w-4" aria-hidden="true" />{verdictLabel[v]()}</span>
	{:else if v === 'no'}
		<span class="inline-flex items-center gap-1 font-semibold text-red-700"><X class="h-4 w-4" aria-hidden="true" />{verdictLabel[v]()}</span>
	{:else}
		<span class="inline-flex items-center gap-1 font-semibold text-tnb-amber-deep"><Minus class="h-4 w-4" aria-hidden="true" />{verdictLabel[v]()}</span>
	{/if}
{/snippet}

<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-16 text-center">
		<h1 class="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-tnb-blue-deep sm:text-5xl">{m.cmp_title()}</h1>
		<p class="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-tnb-ink-soft">{m.cmp_lede()}</p>
	</div>
</section>

<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-14">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{m.cmp_thai_heading()}</h2>
		<div class="mt-6 overflow-x-auto rounded-xl border border-tnb-line shadow-[0_1px_3px_rgba(23,22,28,0.06)]">
			<table class="w-full min-w-[820px] text-sm">
				<thead class="bg-tnb-wash text-left text-tnb-blue-deep">
					<tr>
						<th class="px-4 py-3 font-semibold">ERP</th>
						<th class="px-4 py-3 font-semibold">{m.cmp_col_what()}</th>
						<th class="px-4 py-3 font-semibold">{m.cmp_col_price()}</th>
						<th class="px-4 py-3 font-semibold">{m.cmp_col_mfg()}</th>
						<th class="px-4 py-3 font-semibold">{m.cmp_col_enui()}</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-tnb-line">
					{#each thaiVendors as v (v.name)}
						<tr class="align-top">
							<td class="px-4 py-3.5 font-semibold text-tnb-ink">{v.name}</td>
							<td class="px-4 py-3.5 text-tnb-ink-soft">{t(v.what)}</td>
							<td class="px-4 py-3.5 text-tnb-ink-soft">{t(v.price)}</td>
							<td class="px-4 py-3.5">
								{@render verdict(v.mfg)}
								<p class="mt-1 text-xs leading-relaxed text-tnb-ink-soft">{t(v.mfgNote)}</p>
							</td>
							<td class="px-4 py-3.5">{@render verdict(v.enUi)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-14">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-blue-deep">{m.cmp_global_heading()}</h2>
		<div class="mt-6 overflow-x-auto rounded-xl border border-tnb-line bg-tnb-paper shadow-[0_1px_3px_rgba(23,22,28,0.06)]">
			<table class="w-full min-w-[900px] text-sm">
				<thead class="bg-tnb-wash text-left text-tnb-blue-deep">
					<tr>
						<th class="px-4 py-3 font-semibold">ERP</th>
						<th class="px-4 py-3 font-semibold">{m.cmp_col_price()}</th>
						<th class="px-4 py-3 font-semibold">{m.cmp_col_os()}</th>
						<th class="px-4 py-3 font-semibold">{m.cmp_col_thaiby()}</th>
						<th class="px-4 py-3 font-semibold">{m.cmp_col_weak()}</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-tnb-line">
					{#each globalVendors as v (v.name)}
						<tr class="align-top">
							<td class="px-4 py-3.5 font-semibold text-tnb-ink">{v.name}</td>
							<td class="px-4 py-3.5 text-tnb-ink-soft">{t(v.price)}</td>
							<td class="px-4 py-3.5 text-tnb-ink-soft">
								{#if v.openSource}{t(v.openSource)}{:else}<span class="inline-flex items-center gap-1 font-semibold text-red-700"><X class="h-4 w-4" aria-hidden="true" />{m.cmp_v_no()}</span>{/if}
							</td>
							<td class="px-4 py-3.5 text-tnb-ink-soft">{t(v.thaiBy)}</td>
							<td class="px-4 py-3.5 leading-relaxed text-tnb-ink-soft">{t(v.weakness)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="mx-auto mt-6 max-w-3xl text-xs leading-relaxed text-tnb-ink-soft">{t(sourceNote)}</p>
	</div>
</section>

<section class="bg-tnb-ink">
	<div class="container mx-auto px-4 py-16 text-center">
		<h2 class="text-3xl font-bold tracking-tight text-white">{m.cmp_split_title()}</h2>
		<p class="mx-auto mt-4 max-w-2xl leading-relaxed text-white/70">{m.cmp_split_body()}</p>
		<a
			href={localePath(locale, '/pricing')}
			class="mt-8 inline-flex items-center rounded-lg bg-tnb-amber px-7 py-3.5 text-base font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep transition hover:-translate-y-0.5"
		>
			{m.cmp_cta()}
		</a>
	</div>
</section>
