<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));

	// Real production numbers — same honesty rule as the landing page.
	const stats = [
		{ value: '6,510+', label: m.mkt_stat_movements },
		{ value: '827', label: m.mkt_stat_products },
		{ value: '376', label: m.mkt_stat_dns }
	];
</script>

<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-20 text-center">
		<h1 class="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-tnb-blue-deep sm:text-5xl">{m.story_title()}</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">{m.story_lede()}</p>
	</div>
</section>

<section class="bg-tnb-paper">
	<div class="container mx-auto max-w-3xl px-4 py-16">
		<p class="text-lg leading-relaxed text-tnb-ink">{m.story_p1()}</p>
		<p class="mt-6 text-lg leading-relaxed text-tnb-ink">{m.story_p2()}</p>
		<div class="mt-10 grid gap-px overflow-hidden rounded-xl border border-tnb-line bg-tnb-line sm:grid-cols-3">
			{#each stats as s (s.label)}
				<div class="bg-tnb-wash p-6 text-center">
					<p class="text-3xl font-bold tabular-nums text-tnb-blue-deep">{s.value}</p>
					<p class="mt-1 text-sm text-tnb-ink-soft">{s.label()}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-tnb-ink">
	<div class="container mx-auto max-w-3xl px-4 py-16 text-center">
		<h2 class="text-3xl font-bold tracking-tight text-white">{m.story_customers_title()}</h2>
		<p class="mx-auto mt-4 leading-relaxed text-white/70">{m.story_customers_body()}</p>
		<a
			href={localePath(locale, '/pricing')}
			class="mt-8 inline-flex items-center rounded-lg bg-tnb-amber px-7 py-3.5 text-base font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep transition hover:-translate-y-0.5"
		>
			{m.story_cta()}
		</a>
	</div>
</section>
