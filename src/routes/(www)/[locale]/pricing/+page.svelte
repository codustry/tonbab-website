<script lang="ts">
	/**
	 * Pricing (2026-11, owner-approved plans). Numbers mirror the product's
	 * single source, codustry/workflow src/lib/shared/plans.ts — change them
	 * there first, then here. Layout after notion.com/pricing: two plan panels,
	 * "everything in X, and:" lists, a grouped comparison table with a sticky
	 * header, add-ons, FAQ.
	 *
	 * Free and Business go to self-serve signup (app.tonbab.com/signup — a new
	 * company starts on the 30-day Business trial, then Free); Enterprise emails us.
	 */
	import * as m from '$lib/paraglide/messages';
	import { Check, Minus, Plus, Building2, Sparkles, Mail } from 'lucide-svelte';

	type Cell = boolean | string;
	type Row = { label: () => string; free: Cell; business: Cell; enterprise: Cell };
	type Group = { title: () => string; rows: Row[] };

	const thb = (n: number) => '฿' + n.toLocaleString('en-US');
	const mailto = (subject: string) => `mailto:hello@tonbab.com?subject=${encodeURIComponent(subject)}`;
	const U = () => m.pr_unlimited();

	const groups: Group[] = [
		{
			title: m.pr_g_core,
			rows: [
				{ label: m.pr_r_members, free: '5', business: '25', enterprise: '100' },
				{ label: m.pr_r_storage, free: '20 GB', business: '100 GB', enterprise: '1 TB' },
				{ label: m.pr_r_file, free: '50 MB', business: '5 GB', enterprise: '20 GB' },
				{ label: m.pr_r_multi_company, free: false, business: false, enterprise: true }
			]
		},
		{
			title: m.pr_g_operation,
			rows: [
				{ label: m.pr_r_products, free: '300', business: U(), enterprise: U() },
				{ label: m.pr_r_warehouses, free: '2', business: '10', enterprise: U() },
				{ label: m.pr_r_pos_month, free: '30', business: U(), enterprise: U() },
				{ label: m.pr_r_manufacturing, free: false, business: true, enterprise: true },
				{ label: m.pr_r_lots, free: false, business: true, enterprise: true },
				{ label: m.pr_r_rfq, free: false, business: true, enterprise: true },
				{ label: m.pr_r_accounting, free: false, business: false, enterprise: true }
			]
		},
		{
			title: m.pr_g_commerce,
			rows: [
				{ label: m.pr_r_shops, free: '1', business: '5', enterprise: U() },
				{ label: m.pr_r_pos_devices, free: '1', business: '10', enterprise: U() },
				{ label: m.pr_r_orders, free: '300', business: U(), enterprise: U() },
				{ label: m.pr_r_beam, free: true, business: true, enterprise: true },
				{ label: m.pr_r_promptpay, free: true, business: true, enterprise: true },
				{ label: m.pr_r_slip_verify, free: false, business: true, enterprise: true },
				{ label: m.pr_r_kitchen, free: false, business: true, enterprise: true },
				{ label: m.pr_r_channels, free: false, business: m.pr_addon(), enterprise: m.pr_included() },
				{ label: m.pr_r_domain, free: false, business: false, enterprise: true }
			]
		},
		{
			title: m.pr_g_crm,
			rows: [
				{ label: m.pr_r_customers, free: '200', business: U(), enterprise: U() },
				{ label: m.pr_r_deals, free: '50', business: U(), enterprise: U() },
				{ label: m.pr_r_egp, free: false, business: true, enterprise: true },
				{ label: m.pr_r_visits, free: false, business: true, enterprise: true }
			]
		},
		{
			title: m.pr_g_people,
			rows: [
				{ label: m.pr_r_employees, free: '10', business: '200', enterprise: U() },
				{ label: m.pr_r_payroll, free: false, business: true, enterprise: true },
				{ label: m.pr_r_hik, free: false, business: m.pr_addon(), enterprise: m.pr_included() },
				{ label: m.pr_r_recruit, free: false, business: true, enterprise: true }
			]
		},
		{
			title: m.pr_g_service,
			rows: [
				{ label: m.pr_r_jobs, free: '20', business: U(), enterprise: U() },
				{ label: m.pr_r_quotes, free: false, business: true, enterprise: true }
			]
		},
		{
			title: m.pr_g_docs,
			rows: [
				{ label: m.pr_r_pages, free: '200', business: U(), enterprise: U() },
				{ label: m.pr_r_share, free: false, business: true, enterprise: true },
				{ label: m.pr_r_dbs, free: false, business: true, enterprise: true }
			]
		},
		{
			title: m.pr_g_security,
			rows: [
				{ label: m.pr_r_sso, free: false, business: true, enterprise: true },
				{ label: m.pr_r_roles, free: false, business: true, enterprise: true },
				{ label: m.pr_r_audit, free: false, business: m.pr_r_audit_1y(), enterprise: m.pr_r_audit_3y() },
				{ label: m.pr_r_scim, free: false, business: false, enterprise: true },
				{ label: m.pr_r_api, free: false, business: false, enterprise: true },
				{ label: m.pr_r_support, free: false, business: true, enterprise: true },
				{ label: m.pr_r_sla, free: false, business: false, enterprise: true },
				{ label: m.pr_r_csm, free: false, business: false, enterprise: true }
			]
		}
	];

	const addOns: { name: () => string; detail?: () => string; price: number; once?: boolean; business?: boolean; inEnterprise?: boolean }[] = [
		{ name: m.pr_ao_storage, price: 1000 },
		{ name: m.pr_ao_members, price: 3000, business: true },
		{ name: m.pr_ao_shop, price: 2400, business: true },
		{ name: m.pr_ao_pos, price: 1200, business: true },
		{ name: m.pr_ao_channels, detail: m.pr_ao_channels_d, price: 3600, business: true, inEnterprise: true },
		{ name: m.pr_ao_slips, price: 600, once: true, business: true, inEnterprise: true },
		{ name: m.pr_ao_hik, price: 3600, business: true, inEnterprise: true },
		{ name: m.pr_ao_sla, price: 12000, business: true, inEnterprise: true },
		{ name: m.pr_ao_onboarding, detail: m.pr_ao_onboarding_d, price: 15000, once: true, inEnterprise: true }
	];

	const faqs: [() => string, () => string][] = [
		[m.pr_q1, m.pr_a1],
		[m.pr_q2, m.pr_a2],
		[m.pr_q3, m.pr_a3],
		[m.pr_q4, m.pr_a4],
		[m.pr_q5, m.pr_a5],
		[m.pr_q6, m.pr_a6],
		[m.pr_q7, m.pr_a7],
		[m.pr_q8, m.pr_a8]
	];
	const plans = ['free', 'business', 'enterprise'] as const;
</script>

{#snippet bullet(text: string)}
	<li class="flex gap-2.5 text-[15px] leading-snug text-tnb-ink">
		<Check class="mt-0.5 h-4 w-4 shrink-0 text-tnb-ink-soft" aria-hidden="true" />{text}
	</li>
{/snippet}

{#snippet cell(v: Cell)}
	{#if v === true}
		<Check class="h-4 w-4 text-tnb-ink" aria-label="✓" />
	{:else if v === false}
		<Minus class="h-4 w-4 text-tnb-line" aria-label="—" />
	{:else}
		<span class="text-sm text-tnb-ink">{v}</span>
	{/if}
{/snippet}

<!-- Hero -->
<section class="container mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pt-24">
	<h1 class="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-tnb-ink sm:text-6xl">{m.pr_hero_title()}</h1>
	<p class="mt-5 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">{m.pr_hero_sub()}</p>
	<p class="mt-3 text-sm text-tnb-ink-soft">{m.pr_vat_note()}</p>
</section>

<!-- Plans: Free on its own, Business + Enterprise together on a tinted panel -->
<section class="container mx-auto max-w-6xl px-4">
	<div class="grid gap-4 lg:grid-cols-[1fr_2fr]">
		<div class="flex flex-col rounded-2xl border border-tnb-hair bg-tnb-paper p-6 sm:p-8">
			<p class="text-xl font-semibold leading-snug text-tnb-ink">{m.pr_panel_start()}</p>
			<div class="mt-8 flex flex-1 flex-col">
				<h2 class="text-lg font-semibold text-tnb-ink">{m.pr_plan_free()}</h2>
				<p class="mt-1 flex items-baseline gap-1.5"><span class="text-3xl font-bold tracking-tight text-tnb-ink">{thb(0)}</span><span class="text-sm text-tnb-ink-soft">{m.pr_price_free_unit()}</span></p>
				<p class="mt-2 min-h-12 text-[15px] text-tnb-ink-soft">{m.pr_free_desc()}</p>
				<a href="https://app.tonbab.com/signup" class="btn-soft mt-5 w-full">{m.pr_cta_free()}</a>
				<p class="mt-7 text-sm font-semibold text-tnb-ink">{m.pr_includes()}</p>
				<ul class="mt-3 space-y-2.5">
					{@render bullet(m.pr_b_free_1())}
					{@render bullet(m.pr_b_free_2())}
					{@render bullet(m.pr_b_free_3())}
					{@render bullet(m.pr_b_free_4())}
					{@render bullet(m.pr_b_free_5())}
					{@render bullet(m.pr_b_free_6())}
					{@render bullet(m.pr_b_free_7())}
				</ul>
			</div>
		</div>

		<div class="rounded-2xl bg-tnb-wash p-6 sm:p-8">
			<p class="flex items-center gap-2 text-xl font-semibold leading-snug text-tnb-ink"><Sparkles class="h-5 w-5 text-tnb-amber" aria-hidden="true" />{m.pr_panel_grow()}</p>
			<div class="mt-8 grid gap-8 md:grid-cols-2">
				<!-- Business -->
				<div class="flex flex-col">
					<h2 class="flex items-center gap-2 text-lg font-semibold text-tnb-ink">
						{m.pr_plan_business()}
						<span class="rounded-full bg-tnb-blue/10 px-2 py-0.5 text-xs font-medium text-tnb-blue">{m.pr_recommended()}</span>
					</h2>
					<p class="mt-1 flex items-baseline gap-1.5"><span class="text-3xl font-bold tracking-tight text-tnb-ink">{thb(3000)}</span><span class="text-sm text-tnb-ink-soft">{m.pr_per_month()}</span></p>
					<p class="text-xs text-tnb-ink-soft">{m.pr_or_yearly({ price: thb(36000) })}</p>
					<p class="mt-2 min-h-12 text-[15px] text-tnb-ink-soft">{m.pr_business_desc()}</p>
					<a href="https://app.tonbab.com/signup" class="btn-primary mt-5 w-full">{m.pr_cta_business()}</a>
					<p class="mt-2 text-xs leading-relaxed text-tnb-ink-soft">{m.pr_trial_note()}</p>
					<p class="mt-5 text-sm font-semibold text-tnb-ink">{m.pr_everything_free()}</p>
					<ul class="mt-3 space-y-2.5">
						{@render bullet(m.pr_b_bus_1())}
						{@render bullet(m.pr_b_bus_2())}
						{@render bullet(m.pr_b_bus_3())}
						{@render bullet(m.pr_b_bus_4())}
						{@render bullet(m.pr_b_bus_5())}
						{@render bullet(m.pr_b_bus_6())}
						{@render bullet(m.pr_b_bus_7())}
						{@render bullet(m.pr_b_bus_8())}
						{@render bullet(m.pr_b_bus_9())}
					</ul>
				</div>
				<!-- Enterprise -->
				<div class="flex flex-col">
					<h2 class="flex items-center gap-2 text-lg font-semibold text-tnb-ink"><Building2 class="h-4 w-4" aria-hidden="true" />{m.pr_plan_enterprise()}</h2>
					<p class="mt-1 flex items-baseline gap-1.5"><span class="text-sm text-tnb-ink-soft">{m.pr_from()}</span><span class="text-3xl font-bold tracking-tight text-tnb-ink">{thb(99000)}</span><span class="text-sm text-tnb-ink-soft">{m.pr_per_year()}</span></p>
					<p class="text-xs text-tnb-ink-soft">{m.pr_enterprise_price_note()}</p>
					<p class="mt-2 min-h-12 text-[15px] text-tnb-ink-soft">{m.pr_enterprise_desc()}</p>
					<a href={mailto(m.pr_mail_subject_enterprise())} class="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-tnb-paper px-4 py-2.5 font-semibold text-tnb-blue-deep transition hover:bg-white/70">{m.pr_cta_enterprise()}</a>
					<p class="mt-5 text-sm font-semibold text-tnb-ink md:mt-[3.25rem]">{m.pr_everything_business()}</p>
					<ul class="mt-3 space-y-2.5">
						{@render bullet(m.pr_b_ent_1())}
						{@render bullet(m.pr_b_ent_2())}
						{@render bullet(m.pr_b_ent_3())}
						{@render bullet(m.pr_b_ent_4())}
						{@render bullet(m.pr_b_ent_5())}
						{@render bullet(m.pr_b_ent_6())}
						{@render bullet(m.pr_b_ent_7())}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Comparison -->
<section class="container mx-auto max-w-6xl px-4 pt-24">
	<h2 class="text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{m.pr_compare_title()}</h2>
	<div class="mt-8 overflow-x-auto lg:overflow-visible">
		<table class="w-full min-w-[640px] border-separate border-spacing-0 text-left">
			<thead>
				<tr>
					<th class="z-10 lg:sticky lg:top-16 w-[40%] border-b border-tnb-hair bg-tnb-paper py-3"><span class="sr-only">{m.pr_compare_title()}</span></th>
					{#each plans as p (p)}
						<th class="z-10 lg:sticky lg:top-16 border-b border-tnb-hair bg-tnb-paper py-3 pr-3 align-bottom">
							<div class="text-sm font-semibold text-tnb-ink">{p === 'free' ? m.pr_plan_free() : p === 'business' ? m.pr_plan_business() : m.pr_plan_enterprise()}</div>
							<div class="text-xs font-normal text-tnb-ink-soft">
								{#if p === 'free'}{thb(0)}{:else if p === 'business'}{thb(3000)} {m.pr_per_month_short()}{:else}{m.pr_from()} {thb(99000)} {m.pr_per_year()}{/if}
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			{#each groups as g (g.title())}
				<tbody>
					<tr><th colspan="4" class="pb-2 pt-10 text-sm font-medium text-tnb-ink-soft">{g.title()}</th></tr>
					{#each g.rows as r (r.label())}
						<tr>
							<th scope="row" class="border-t border-tnb-hair py-3 pr-4 text-[15px] font-medium text-tnb-ink">{r.label()}</th>
							<td class="border-t border-tnb-hair py-3 pr-3">{@render cell(r.free)}</td>
							<td class="border-t border-tnb-hair py-3 pr-3">{@render cell(r.business)}</td>
							<td class="border-t border-tnb-hair py-3 pr-3">{@render cell(r.enterprise)}</td>
						</tr>
					{/each}
				</tbody>
			{/each}
		</table>
	</div>
	<p class="mt-4 text-sm text-tnb-ink-soft">{m.pr_vat_note()}</p>
</section>

<!-- Add-ons -->
<section class="container mx-auto max-w-6xl px-4 pt-24">
	<h2 class="text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{m.pr_addons_title()}</h2>
	<p class="mt-3 max-w-2xl text-tnb-ink-soft">{m.pr_addons_sub()}</p>
	<ul class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each addOns as a (a.name())}
			<li class="flex flex-col rounded-2xl bg-tnb-mist p-5">
				<div class="flex items-start justify-between gap-3">
					<p class="font-semibold text-tnb-ink">{a.name()}</p>
					<p class="shrink-0 text-right">
						<span class="font-semibold tabular-nums text-tnb-ink">{thb(a.price)}</span>
						<span class="block text-xs text-tnb-ink-soft">{a.once ? m.pr_one_time() : m.pr_per_year()}</span>
					</p>
				</div>
				{#if a.detail}<p class="mt-1 text-sm text-tnb-ink-soft">{a.detail()}</p>{/if}
				<div class="mt-auto flex flex-wrap gap-1.5 pt-4">
					{#if a.business}<span class="rounded-full bg-tnb-paper px-2 py-0.5 text-xs text-tnb-ink-soft">{m.pr_addon_business()}</span>{/if}
					{#if a.inEnterprise}<span class="rounded-full bg-tnb-wash px-2 py-0.5 text-xs text-tnb-blue-deep">{m.pr_addon_in_enterprise()}</span>{/if}
				</div>
			</li>
		{/each}
	</ul>
</section>

<!-- FAQ -->
<section class="container mx-auto max-w-6xl px-4 pt-24">
	<div class="grid gap-10 lg:grid-cols-[1fr_2fr]">
		<h2 class="text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{m.pr_faq_title()}</h2>
		<div class="divide-y divide-tnb-hair border-y border-tnb-hair">
			{#each faqs as [q, a] (q())}
				<details class="group py-4">
					<summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-tnb-ink [&::-webkit-details-marker]:hidden">
						{q()}
						<Plus class="h-4 w-4 shrink-0 text-tnb-ink-soft transition group-open:rotate-45" aria-hidden="true" />
					</summary>
					<p class="mt-3 max-w-2xl text-[15px] leading-relaxed text-tnb-ink-soft">{a()}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<!-- Contact -->
<section class="container mx-auto max-w-6xl px-4 py-24">
	<div class="rounded-2xl bg-tnb-mist px-6 py-12 text-center sm:px-12">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink sm:text-3xl">{m.pr_contact_title()}</h2>
		<p class="mx-auto mt-3 max-w-xl text-tnb-ink-soft">{m.pr_contact_sub()}</p>
		<a href="mailto:hello@tonbab.com" class="btn-primary mt-7"><Mail class="h-4 w-4" aria-hidden="true" />{m.pr_contact_cta()}</a>
	</div>
</section>
