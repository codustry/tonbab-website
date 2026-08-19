<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import { getModule } from '$lib/marketing/modules-data';
	import ModuleFlowDiagram from '$lib/components/www/ModuleFlowDiagram.svelte';
	import { ArrowLeft, ArrowRight, Image, BookOpen } from 'lucide-svelte';
	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	const t = $derived.by(() => (b: { en: string; th: string }) => (locale === 'th' ? b.th : b.en));
	const mod = $derived.by(() => getModule(data.moduleKey)!);
	const relatedMods = $derived.by(() =>
		mod.related.flatMap((k) => {
			const r = getModule(k);
			return r ? [r] : [];
		})
	);
</script>

<!-- Hero -->
<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-16">
		<a href={localePath(locale, '/modules')} class="inline-flex items-center gap-1.5 text-sm font-medium text-tnb-blue hover:underline">
			<ArrowLeft class="h-4 w-4" aria-hidden="true" />{m.mod_back()}
		</a>
		<div class="mt-4 grid items-center gap-10 lg:grid-cols-2">
			<div>
				<h1 class="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-tnb-blue-deep sm:text-5xl">{t(mod.name)}</h1>
				<p class="mt-4 max-w-2xl text-xl leading-relaxed text-tnb-ink">{t(mod.tagline)}</p>
				<p class="mt-4 max-w-2xl leading-relaxed text-tnb-ink-soft">{t(mod.intro)}</p>
			</div>
			<figure class="overflow-hidden rounded-xl border border-tnb-line bg-tnb-paper shadow-[0_1px_3px_rgba(23,22,28,0.07)]">
				<img src={mod.heroArt} alt={t(mod.heroArtAlt)} class="block aspect-video w-full max-w-full object-cover" loading="eager" />
			</figure>
		</div>
	</div>
</section>

<!-- Document-flow diagram -->
<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{m.mod_diagram_title()}</h2>
		<div class="mt-8 overflow-x-auto rounded-xl border border-tnb-line bg-tnb-wash p-6">
			<div class="mx-auto max-w-4xl">
				<ModuleFlowDiagram nodes={mod.diagram} {locale} />
			</div>
		</div>
	</div>
</section>

<!-- How it works -->
<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-blue-deep">{m.mod_how_title()}</h2>
		<ol class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each mod.workflow as step, i (i)}
				<li class="rounded-xl bg-tnb-paper p-6 shadow-[0_1px_3px_rgba(23,22,28,0.07)]">
					<span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-tnb-blue text-sm font-bold text-white">{i + 1}</span>
					<h3 class="mt-3 font-semibold leading-snug text-tnb-ink">{t(step.title)}</h3>
					<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{t(step.body)}</p>
				</li>
			{/each}
		</ol>

		<!-- Screenshot slot: real screenshot when the data has one, styled placeholder otherwise -->
		<figure class="mx-auto mt-10 max-w-3xl">
			{#if mod.screenshot}
				<img
					src={mod.screenshot}
					alt={t(mod.screenshotCaption)}
					class="block w-full max-w-full rounded-xl border border-tnb-line shadow-[0_1px_3px_rgba(23,22,28,0.07)]"
					loading="lazy"
				/>
			{:else}
				<div class="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-tnb-line bg-tnb-paper text-tnb-ink-soft">
					<Image class="h-8 w-8 text-tnb-blue" aria-hidden="true" />
					<span class="px-4 text-center text-sm font-medium">{m.mod_screenshot_soon()}</span>
				</div>
			{/if}
			<figcaption class="mt-3 text-center text-sm text-tnb-ink-soft">{t(mod.screenshotCaption)}</figcaption>
		</figure>
	</div>
</section>

<!-- Feature groups -->
<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{m.mod_features_title()}</h2>
		<div class="mt-8 space-y-12">
			{#each mod.featureGroups as group (group.title.en)}
				<div>
					<h3 class="text-lg font-bold text-tnb-blue-deep">{t(group.title)}</h3>
					<div class="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each group.features as f (f.title.en)}
							<div class="rounded-xl border border-tnb-line p-6 shadow-[0_1px_3px_rgba(23,22,28,0.05)]">
								<h4 class="font-semibold text-tnb-ink">{t(f.title)}</h4>
								<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{t(f.body)}</p>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Who it's for -->
<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-blue-deep">{m.mod_whofor_title()}</h2>
		<ul class="mt-8 grid gap-5 sm:grid-cols-2">
			{#each mod.whoFor as who, i (i)}
				<li class="flex items-start gap-3 rounded-xl bg-tnb-paper p-5 shadow-[0_1px_3px_rgba(23,22,28,0.07)]">
					<span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-tnb-amber" aria-hidden="true"></span>
					<p class="leading-relaxed text-tnb-ink">{t(who)}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- FAQ -->
<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{m.mod_faq_title()}</h2>
		<div class="mt-8 grid gap-6 lg:grid-cols-2">
			{#each mod.faq as entry (entry.q.en)}
				<div class="rounded-xl border border-tnb-line p-6">
					<h3 class="font-semibold text-tnb-ink">{t(entry.q)}</h3>
					<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{t(entry.a)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Related modules + docs -->
<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-blue-deep">{m.mod_related_title()}</h2>
		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each relatedMods as rel (rel.key)}
				<a
					href={localePath(locale, `/modules/${rel.key}`)}
					class="group rounded-xl border border-tnb-line bg-tnb-paper p-6 shadow-[0_1px_3px_rgba(23,22,28,0.06)] transition hover:-translate-y-1 hover:border-tnb-blue hover:shadow-[0_10px_28px_rgba(46,92,230,0.14)]"
				>
					<h3 class="font-bold text-tnb-ink group-hover:text-tnb-blue">{t(rel.name)}</h3>
					<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{t(rel.tagline)}</p>
				</a>
			{/each}
			<a
				href={localePath(locale, '/docs')}
				class="group rounded-xl border border-dashed border-tnb-line bg-tnb-paper p-6 transition hover:border-tnb-blue"
			>
				<span class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-tnb-wash">
					<BookOpen class="h-5 w-5 text-tnb-blue" aria-hidden="true" />
				</span>
				<h3 class="mt-3 font-bold text-tnb-ink group-hover:text-tnb-blue">{m.mod_docs_title()}</h3>
				<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{m.mod_docs_body()}</p>
				<span class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-tnb-blue">
					{m.mod_docs_cta()}<ArrowRight class="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
				</span>
			</a>
		</div>
	</div>
</section>

<!-- CTA -->
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
