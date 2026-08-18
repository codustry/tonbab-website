<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import {
		ShoppingCart, Boxes, Factory, Truck, Users, Store,
		Handshake, KeyRound, FileSpreadsheet, Globe2, ShieldCheck, Scan
	} from 'lucide-svelte';
	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));

	// Real production numbers (queried 18 Aug 2026) — never invent stats.
	// Update these alongside releases; they must stay defensible.
	const stats = [
		{ value: '6,510+', label: m.mkt_stat_movements },
		{ value: '827', label: m.mkt_stat_products },
		{ value: '376', label: m.mkt_stat_dns },
		{ value: '2', label: m.mkt_stat_bilingual }
	];

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

<!-- ───────────────────────── Hero ───────────────────────── -->
<section class="border-b border-border">
	<div class="container mx-auto px-4 py-20 text-center">
		<p class="mb-4 text-sm font-medium uppercase tracking-widest text-primary">{m.mkt_hero_eyebrow()}</p>
		<h1 class="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
			{m.mkt_hero_title_1()}<br />{m.mkt_hero_title_2()}
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{m.mkt_hero_subtitle()}</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
			<a
				href={localePath(locale, '/pricing')}
				class="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
			>
				{m.mkt_hero_cta_primary()}
			</a>
			<a
				href={localePath(locale, '/modules')}
				class="inline-flex items-center rounded-lg border border-border px-6 py-3 hover:bg-muted"
			>
				{m.mkt_hero_cta_secondary()}
			</a>
		</div>
	</div>
</section>

<!-- ─────────────────────── Pain points ─────────────────────── -->
<section class="container mx-auto px-4 py-16">
	<h2 class="text-center text-3xl font-bold">{m.mkt_pain_title()}</h2>
	<p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{m.mkt_pain_subtitle()}</p>
	<div class="mt-10 grid gap-6 sm:grid-cols-3">
		{#each pains as p (p.title)}
			<div class="rounded-lg border border-border p-6">
				<p.icon class="h-6 w-6 text-primary" aria-hidden="true" />
				<h3 class="mt-3 font-semibold">{p.title()}</h3>
				<p class="mt-2 text-sm text-muted-foreground">{p.body()}</p>
			</div>
		{/each}
	</div>
</section>

<!-- ───────────────────────── Modules ───────────────────────── -->
<section class="border-y border-border bg-muted/30">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-center text-3xl font-bold">{m.mkt_modules_title()}</h2>
		<p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{m.mkt_modules_subtitle()}</p>
		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each modules as mod (mod.title)}
				<a href={localePath(locale, mod.href)} class="group rounded-lg border border-border bg-background p-6 transition hover:border-primary">
					<mod.icon class="h-6 w-6 text-primary" aria-hidden="true" />
					<h3 class="mt-3 font-semibold group-hover:text-primary">{mod.title()}</h3>
					<p class="mt-2 text-sm text-muted-foreground">{mod.body()}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ──────────────────────── Features ──────────────────────── -->
<section class="container mx-auto px-4 py-16">
	<h2 class="text-center text-3xl font-bold">{m.mkt_features_title()}</h2>
	<p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{m.mkt_features_subtitle()}</p>
	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each features as f (f.title)}
			<div class="rounded-lg border border-border p-6">
				<f.icon class="h-6 w-6 text-primary" aria-hidden="true" />
				<h3 class="mt-3 font-semibold">{f.title()}</h3>
				<p class="mt-2 text-sm text-muted-foreground">{f.body()}</p>
			</div>
		{/each}
	</div>
</section>

<!-- ──────────────────────── How it flows ──────────────────── -->
<section class="border-y border-border bg-muted/30">
	<div class="container mx-auto px-4 py-16">
		<h2 class="text-center text-3xl font-bold">{m.mkt_flow_title()}</h2>
		<p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{m.mkt_flow_subtitle()}</p>
		<ol class="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each flow as step, i (i)}
				<li class="rounded-lg border border-border bg-background p-5">
					<span class="text-sm font-semibold text-primary">{i + 1}</span>
					<h3 class="mt-1 font-semibold">{step.title()}</h3>
					<p class="mt-1 text-sm text-muted-foreground">{step.body()}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ───────────────────────── Stats ─────────────────────────── -->
<section class="container mx-auto px-4 py-16">
	<div class="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
		{#each stats as s (s.label)}
			<div class="bg-background p-6 text-center">
				<p class="text-3xl font-bold tabular-nums text-primary">{s.value}</p>
				<p class="mt-1 text-sm text-muted-foreground">{s.label()}</p>
			</div>
		{/each}
	</div>
</section>

<!-- ─────────────────── Pricing = talk to us ────────────────── -->
<section class="border-y border-border bg-muted/30">
	<div class="container mx-auto px-4 py-16 text-center">
		<h2 class="text-3xl font-bold">{m.mkt_talk_title()}</h2>
		<p class="mx-auto mt-3 max-w-xl text-muted-foreground">{m.mkt_talk_body()}</p>
		<a
			href={localePath(locale, '/pricing')}
			class="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
		>
			{m.mkt_talk_cta()}
		</a>
	</div>
</section>

<!-- ─────────────────────────── FAQ ─────────────────────────── -->
<section class="container mx-auto max-w-3xl px-4 py-16">
	<h2 class="text-center text-3xl font-bold">{m.mkt_faq_title()}</h2>
	<div class="mt-8 space-y-4">
		{#each faqs as f (f.q)}
			<details class="group rounded-lg border border-border p-4">
				<summary class="cursor-pointer font-medium marker:content-none">{f.q()}</summary>
				<p class="mt-2 text-sm text-muted-foreground">{f.a()}</p>
			</details>
		{/each}
	</div>
	<p class="mt-6 text-center">
		<a href={localePath(locale, '/faq')} class="text-sm text-primary hover:underline">{m.mkt_faq_more()}</a>
	</p>
</section>

<!-- ─────────────────────── Final CTA ───────────────────────── -->
<section class="border-t border-border">
	<div class="container mx-auto px-4 py-20 text-center">
		<h2 class="text-3xl font-bold">{m.mkt_cta_title()}</h2>
		<p class="mx-auto mt-3 max-w-xl text-muted-foreground">{m.mkt_cta_subtitle()}</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
			<a
				href={localePath(locale, '/pricing')}
				class="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
			>
				{m.mkt_cta_primary()}
			</a>
			<a
				href={localePath(locale, '/docs')}
				class="inline-flex items-center rounded-lg border border-border px-6 py-3 hover:bg-muted"
			>
				{m.mkt_cta_secondary()}
			</a>
		</div>
	</div>
</section>
