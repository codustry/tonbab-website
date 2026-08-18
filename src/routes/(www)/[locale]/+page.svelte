<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import {
		ShoppingCart, Boxes, Factory, Truck, Users, Store, Handshake, KeyRound,
		FileSpreadsheet, Globe2, ShieldCheck, Scan, Check, Sparkles, UtensilsCrossed, Laptop, ShoppingBag
	} from 'lucide-svelte';
	import { reveal, countUp } from '$lib/marketing/animate';
	import { industries } from '$lib/marketing/industries-data';
	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	const t = $derived.by(() => (b: { en: string; th: string }) => (locale === 'th' ? b.th : b.en));
	const indIcons: Record<string, typeof Factory> = { Factory, Globe2, ShoppingBag, Sparkles, UtensilsCrossed, Laptop };

	// Real production numbers (queried 18 Aug 2026) — never invent stats.
	const stats = [
		{ value: '6,510+', label: m.mkt_stat_movements },
		{ value: '827', label: m.mkt_stat_products },
		{ value: '376', label: m.mkt_stat_dns },
		{ value: '2', label: m.mkt_stat_bilingual }
	];

	const trust = [m.mkt_trust_bilingual, m.mkt_trust_pwa, m.mkt_trust_promptpay];

	const pains = [
		{ title: m.mkt_pain_1_title, body: m.mkt_pain_1_body, icon: FileSpreadsheet },
		{ title: m.mkt_pain_2_title, body: m.mkt_pain_2_body, icon: ShieldCheck },
		{ title: m.mkt_pain_3_title, body: m.mkt_pain_3_body, icon: Globe2 }
	];

	const modules = [
		{ href: '/modules/operation', title: m.mkt_mod_operation_title, body: m.mkt_mod_operation_body, icon: Factory },
		{ href: '/modules/people', title: m.mkt_mod_people_title, body: m.mkt_mod_people_body, icon: Users },
		{ href: '/modules/commerce', title: m.mkt_mod_commerce_title, body: m.mkt_mod_commerce_body, icon: Store },
		{ href: '/modules/crm', title: m.mkt_mod_crm_title, body: m.mkt_mod_crm_body, icon: Handshake },
		{ href: '/modules/operation', title: m.mkt_mod_sso_title, body: m.mkt_mod_sso_body, icon: KeyRound }
	];

	const features = [
		{ title: m.mkt_feature_procurement_title, body: m.mkt_feature_procurement_body, icon: ShoppingCart },
		{ title: m.mkt_feature_inventory_title, body: m.mkt_feature_inventory_body, icon: Boxes },
		{ title: m.mkt_feature_production_title, body: m.mkt_feature_production_body, icon: Factory },
		{ title: m.mkt_feature_lots_title, body: m.mkt_feature_lots_body, icon: Scan },
		{ title: m.mkt_feature_imports_title, body: m.mkt_feature_imports_body, icon: Globe2 },
		{ title: m.mkt_feature_i18n_title, body: m.mkt_feature_i18n_body, icon: Truck }
	];

	const flow = [
		{ title: m.mkt_flow_step_1, body: m.mkt_flow_step_1_body },
		{ title: m.mkt_flow_step_2, body: m.mkt_flow_step_2_body },
		{ title: m.mkt_flow_step_3, body: m.mkt_flow_step_3_body },
		{ title: m.mkt_flow_step_4, body: m.mkt_flow_step_4_body },
		{ title: m.mkt_flow_step_5, body: m.mkt_flow_step_5_body },
		{ title: m.mkt_flow_step_6, body: m.mkt_flow_step_6_body }
	];

	const faqs = [
		{ q: m.mkt_faq_q1, a: m.mkt_faq_a1 },
		{ q: m.mkt_faq_q6, a: m.mkt_faq_a6 },
		{ q: m.mkt_faq_q2, a: m.mkt_faq_a2 },
		{ q: m.mkt_faq_q4, a: m.mkt_faq_a4 }
	];
</script>

<!-- ───────────────────────── Hero — blue wash, ink display, amber CTA ── -->
<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 pt-20 pb-16 text-center">
		<p class="mb-5 inline-block rounded-full bg-tnb-wash-deep px-4 py-1.5 text-sm font-semibold text-tnb-blue-deep">
			{m.mkt_hero_eyebrow()}
		</p>
		<h1 class="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-tnb-blue-deep sm:text-6xl">
			{m.mkt_hero_title_1()}<br />{m.mkt_hero_title_2()}
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">{m.mkt_hero_subtitle()}</p>
		<div class="mt-9 flex flex-wrap items-center justify-center gap-4">
			<a
				href={localePath(locale, '/pricing')}
				class="inline-flex items-center rounded-lg bg-tnb-amber px-7 py-3.5 text-base font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep transition hover:-translate-y-0.5 hover:shadow-[0_3px_0_0] hover:shadow-tnb-amber-deep"
			>
				{m.mkt_hero_cta_primary()}
			</a>
			<a
				href={localePath(locale, '/modules')}
				class="inline-flex items-center rounded-lg border-2 border-tnb-blue bg-tnb-paper px-7 py-3.5 text-base font-semibold text-tnb-blue transition hover:bg-tnb-wash-deep"
			>
				{m.mkt_hero_cta_secondary()}
			</a>
		</div>
		<img
			src="/story-hero.jpg"
			alt=""
			width="1376"
			height="768"
			class="mx-auto mt-12 w-full max-w-4xl rounded-2xl shadow-[0_10px_40px_rgba(46,92,230,0.15)]" use:reveal={{ y: 40 }}
			loading="eager"
			fetchpriority="high"
		/>
		<ul class="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-tnb-ink-soft">
			{#each trust as t (t)}
				<li class="inline-flex items-center gap-1.5">
					<Check class="h-4 w-4 text-tnb-blue" aria-hidden="true" />{t()}
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ─────────────────────── Pain points — white ─────────────────────── -->
<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-20">
		<h2 class="text-center text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{m.mkt_pain_title()}</h2>
		<p class="mx-auto mt-4 max-w-2xl text-center text-tnb-ink-soft">{m.mkt_pain_subtitle()}</p>
		<div class="mt-12 grid gap-6 sm:grid-cols-3" use:reveal={{ stagger: 0.12 }}>
			{#each pains as p (p.title)}
				<div class="rounded-xl border border-tnb-line bg-tnb-paper p-7 shadow-[0_1px_3px_rgba(23,22,28,0.06)]">
					<span class="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-tnb-wash">
						<p.icon class="h-5.5 w-5.5 text-tnb-blue" aria-hidden="true" />
					</span>
					<h3 class="mt-4 text-lg font-semibold text-tnb-ink">{p.title()}</h3>
					<p class="mt-2 leading-relaxed text-tnb-ink-soft">{p.body()}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ───────────────────────── Modules — wash ────────────────────────── -->
<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-20">
		<h2 class="text-center text-3xl font-bold tracking-tight text-tnb-blue-deep sm:text-4xl">{m.mkt_modules_title()}</h2>
		<p class="mx-auto mt-4 max-w-2xl text-center text-tnb-ink-soft">{m.mkt_modules_subtitle()}</p>
		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" use:reveal={{ stagger: 0.1 }}>
			{#each modules as mod (mod.title)}
				<a
					href={localePath(locale, mod.href)}
					class="group rounded-xl border border-transparent bg-tnb-paper p-7 shadow-[0_1px_3px_rgba(23,22,28,0.07)] transition hover:-translate-y-1 hover:border-tnb-blue hover:shadow-[0_10px_28px_rgba(46,92,230,0.14)]"
				>
					<span class="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-tnb-wash transition group-hover:bg-tnb-blue">
						<mod.icon class="h-5.5 w-5.5 text-tnb-blue transition group-hover:text-white" aria-hidden="true" />
					</span>
					<h3 class="mt-4 text-lg font-semibold text-tnb-ink group-hover:text-tnb-blue">{mod.title()}</h3>
					<p class="mt-2 leading-relaxed text-tnb-ink-soft">{mod.body()}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ──────────────────────── Features — white ───────────────────────── -->
<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-20">
		<h2 class="text-center text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{m.mkt_features_title()}</h2>
		<p class="mx-auto mt-4 max-w-2xl text-center text-tnb-ink-soft">{m.mkt_features_subtitle()}</p>
		<div class="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3" use:reveal={{ stagger: 0.08 }}>
			{#each features as f (f.title)}
				<div class="flex gap-4">
					<span class="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tnb-wash">
						<f.icon class="h-5 w-5 text-tnb-blue" aria-hidden="true" />
					</span>
					<div>
						<h3 class="font-semibold text-tnb-ink">{f.title()}</h3>
						<p class="mt-1.5 text-[15px] leading-relaxed text-tnb-ink-soft">{f.body()}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─────────────────────── Flow — numbered rail on wash ────────────── -->
<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-20">
		<h2 class="text-center text-3xl font-bold tracking-tight text-tnb-blue-deep sm:text-4xl">{m.mkt_flow_title()}</h2>
		<p class="mx-auto mt-4 max-w-2xl text-center text-tnb-ink-soft">{m.mkt_flow_subtitle()}</p>
		<ol class="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3" use:reveal={{ stagger: 0.1 }}>
			{#each flow as step, i (i)}
				<li class="rounded-xl bg-tnb-paper p-6 shadow-[0_1px_3px_rgba(23,22,28,0.07)]">
					<span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-tnb-blue text-sm font-bold text-white">{i + 1}</span>
					<h3 class="mt-3 font-semibold text-tnb-ink">{step.title()}</h3>
					<p class="mt-1.5 text-[15px] leading-relaxed text-tnb-ink-soft">{step.body()}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ───────────────────── Stats — inverted ink band ─────────────────── -->
<section class="bg-tnb-ink">
	<div class="container mx-auto grid gap-10 px-4 py-16 text-center sm:grid-cols-4">
		{#each stats as s (s.label)}
			<div>
				<p class="text-4xl font-bold tabular-nums text-tnb-amber" use:countUp>{s.value}</p>
				<p class="mt-2 text-sm text-white/70">{s.label()}</p>
			</div>
		{/each}
	</div>
</section>

<!-- ───────────── Why Tonbab — the conversion argument ───────────── -->
<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-20">
		<h2 class="text-center text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{m.mkt_why_title()}</h2>
		<div class="mt-12 grid gap-6 sm:grid-cols-3" use:reveal={{ stagger: 0.12 }}>
			<div class="rounded-xl border-2 border-tnb-blue bg-tnb-wash p-7">
				<h3 class="text-lg font-bold text-tnb-blue-deep">{m.mkt_why_1_title()}</h3>
				<p class="mt-2 leading-relaxed text-tnb-ink-soft">{m.mkt_why_1_body()}</p>
			</div>
			<div class="rounded-xl border-2 border-tnb-blue bg-tnb-wash p-7">
				<h3 class="text-lg font-bold text-tnb-blue-deep">{m.mkt_why_2_title()}</h3>
				<p class="mt-2 leading-relaxed text-tnb-ink-soft">{m.mkt_why_2_body()}</p>
			</div>
			<div class="rounded-xl border-2 border-tnb-blue bg-tnb-wash p-7">
				<h3 class="text-lg font-bold text-tnb-blue-deep">{m.mkt_why_3_title()}</h3>
				<p class="mt-2 leading-relaxed text-tnb-ink-soft">{m.mkt_why_3_body()}</p>
			</div>
		</div>
		<p class="mt-8 text-center">
			<a href={localePath(locale, '/compare')} class="font-semibold text-tnb-blue hover:underline">{m.mkt_why_cta()} →</a>
		</p>
	</div>
</section>

<!-- ─────────────────── Pricing = talk to us — white ────────────────── -->
<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-20 text-center">
		<h2 class="text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{m.mkt_talk_title()}</h2>
		<p class="mx-auto mt-4 max-w-xl leading-relaxed text-tnb-ink-soft">{m.mkt_talk_body()}</p>
		<a
			href={localePath(locale, '/pricing')}
			class="mt-8 inline-flex items-center rounded-lg bg-tnb-amber px-7 py-3.5 text-base font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep transition hover:-translate-y-0.5"
		>
			{m.mkt_talk_cta()}
		</a>
	</div>
</section>


<!-- ───────────── Industries strip → /story ───────────── -->
<section class="bg-tnb-paper">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-center text-2xl font-bold tracking-tight text-tnb-ink sm:text-3xl">{m.mkt_ind_title()}</h2>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3" use:reveal={{ stagger: 0.06 }}>
			{#each industries as ind (ind.icon)}
				{@const Icon = indIcons[ind.icon]}
				<a href={localePath(locale, '/story')} class="inline-flex items-center gap-2 rounded-full border border-tnb-line bg-tnb-wash px-4 py-2 text-sm font-medium text-tnb-ink transition hover:border-tnb-blue hover:text-tnb-blue">
					<Icon class="h-4 w-4 text-tnb-blue" aria-hidden="true" />{t(ind.name)}
				</a>
			{/each}
		</div>
		<p class="mt-6 text-center">
			<a href={localePath(locale, '/story')} class="font-semibold text-tnb-blue hover:underline">{m.mkt_ind_cta()} →</a>
		</p>
	</div>
</section>

<!-- ─────────────────────────── FAQ — wash ──────────────────────────── -->
<section class="bg-tnb-wash">
	<div class="container mx-auto max-w-3xl px-4 py-20">
		<h2 class="text-center text-3xl font-bold tracking-tight text-tnb-blue-deep sm:text-4xl">{m.mkt_faq_title()}</h2>
		<div class="mt-10 space-y-4">
			{#each faqs as f (f.q)}
				<details class="group rounded-xl bg-tnb-paper p-5 shadow-[0_1px_3px_rgba(23,22,28,0.07)]">
					<summary class="cursor-pointer list-none font-semibold text-tnb-ink marker:content-none group-open:text-tnb-blue">{f.q()}</summary>
					<p class="mt-3 leading-relaxed text-tnb-ink-soft">{f.a()}</p>
				</details>
			{/each}
		</div>
		<p class="mt-7 text-center">
			<a href={localePath(locale, '/faq')} class="font-medium text-tnb-blue hover:underline">{m.mkt_faq_more()}</a>
		</p>
	</div>
</section>

<!-- ───────────────────────── Final CTA — ink ───────────────────────── -->
<section class="bg-tnb-ink">
	<div class="container mx-auto px-4 py-20 text-center">
		<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.mkt_cta_title()}</h2>
		<p class="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">{m.mkt_cta_subtitle()}</p>
		<div class="mt-9 flex flex-wrap items-center justify-center gap-4">
			<a
				href={localePath(locale, '/pricing')}
				class="inline-flex items-center rounded-lg bg-tnb-amber px-7 py-3.5 text-base font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep transition hover:-translate-y-0.5"
			>
				{m.mkt_cta_primary()}
			</a>
			<a
				href={localePath(locale, '/docs')}
				class="inline-flex items-center rounded-lg border-2 border-white/25 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
			>
				{m.mkt_cta_secondary()}
			</a>
		</div>
	</div>
</section>
