<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import { getModule } from '$lib/marketing/modules-data';
	import { ArrowLeft } from 'lucide-svelte';
	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	const t = $derived.by(() => (b: { en: string; th: string }) => (locale === 'th' ? b.th : b.en));
	const mod = $derived.by(() => getModule(data.moduleKey)!);
</script>

<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-16">
		<a href={localePath(locale, '/modules')} class="inline-flex items-center gap-1.5 text-sm font-medium text-tnb-blue hover:underline">
			<ArrowLeft class="h-4 w-4" aria-hidden="true" />{m.mod_back()}
		</a>
		<h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-tnb-blue-deep sm:text-5xl">{t(mod.name)}</h1>
		<p class="mt-4 max-w-2xl text-xl leading-relaxed text-tnb-ink">{t(mod.tagline)}</p>
		<p class="mt-4 max-w-2xl leading-relaxed text-tnb-ink-soft">{t(mod.intro)}</p>
	</div>
</section>

<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{m.mod_features_title()}</h2>
		<div class="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each mod.features as f (f.title.en)}
				<div class="rounded-xl border border-tnb-line p-6 shadow-[0_1px_3px_rgba(23,22,28,0.05)]">
					<h3 class="font-semibold text-tnb-ink">{t(f.title)}</h3>
					<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{t(f.body)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-blue-deep">{m.mod_how_title()}</h2>
		<ol class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each mod.flow as step, i (i)}
				<li class="rounded-xl bg-tnb-paper p-5 shadow-[0_1px_3px_rgba(23,22,28,0.07)]">
					<span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-tnb-blue text-sm font-bold text-white">{i + 1}</span>
					<p class="mt-3 font-medium leading-relaxed text-tnb-ink">{t(step)}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="bg-tnb-ink">
	<div class="container mx-auto px-4 py-16 text-center">
		<h2 class="text-3xl font-bold tracking-tight text-white">{m.mod_cta_title()}</h2>
		<p class="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">{m.mod_cta_body()}</p>
		<a
			href={localePath(locale, '/pricing')}
			class="mt-8 inline-flex items-center rounded-lg bg-tnb-amber px-7 py-3.5 text-base font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep transition hover:-translate-y-0.5"
		>
			{m.mkt_hero_cta_primary()}
		</a>
	</div>
</section>
