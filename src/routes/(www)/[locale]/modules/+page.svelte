<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import { modulesContent } from '$lib/marketing/modules-data';
	import { Factory, Users, Store, Handshake, KeyRound, Wrench } from 'lucide-svelte';
	import { SUITE_THEME, type SuiteKey } from '$lib/marketing/suite-data';
	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	const t = $derived.by(() => (b: { en: string; th: string }) => (locale === 'th' ? b.th : b.en));
	const icons: Record<string, typeof Factory> = { operation: Factory, people: Users, commerce: Store, crm: Handshake, service: Wrench };
</script>

<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-16 text-center">
		<h1 class="text-4xl font-bold tracking-tight text-tnb-blue-deep sm:text-5xl">{m.mods_title()}</h1>
		<p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">{m.mods_lede()}</p>
	</div>
</section>

<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-16">
		<div class="grid gap-6 sm:grid-cols-2">
			{#each modulesContent as mod (mod.key)}
				{@const Icon = icons[mod.key]}
				{@const th = SUITE_THEME[mod.key as SuiteKey]}
				<a
					href={localePath(locale, `/modules/${mod.key}`)}
					class="group rounded-2xl border border-tnb-line p-8 shadow-[0_1px_3px_rgba(23,22,28,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_34px_-14px_rgba(23,22,28,0.25)]"
				>
					<span class="inline-flex h-12 w-12 items-center justify-center rounded-xl transition group-hover:scale-105 {th.chip}">
						<Icon class="h-6 w-6" aria-hidden="true" />
					</span>
					<h2 class="mt-4 text-xl font-bold text-tnb-ink">{t(mod.name)}</h2>
					<p class="mt-2 leading-relaxed text-tnb-ink-soft">{t(mod.tagline)}</p>
				</a>
			{/each}
			<!-- SSO: a capability card, not a destination page -->
			<div class="rounded-xl border border-dashed border-tnb-line p-8">
				<span class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-tnb-wash">
					<KeyRound class="h-6 w-6 text-tnb-blue" aria-hidden="true" />
				</span>
				<h2 class="mt-4 text-xl font-bold text-tnb-ink">{m.mkt_mod_sso_title()}</h2>
				<p class="mt-2 leading-relaxed text-tnb-ink-soft">{m.mkt_mod_sso_body()}</p>
			</div>
		</div>
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
