<script lang="ts">
	/**
	 * Pricing (2026-11-16, owner-approved five plans). Numbers mirror the
	 * product's single source, codustry/workflow src/lib/shared/plans.ts —
	 * change them there first, then here. Layout after notion.com/pricing: two
	 * plan panels with a yearly / monthly switch, "everything in X, and:" lists,
	 * then a comparison
	 * table grouped by module, each module in its own colour (the same colours
	 * the app uses), add-ons, FAQ.
	 *
	 * Every plan button goes to self-serve signup (app.tonbab.com/signup — a new
	 * company starts on the 30-day Business trial, then picks a plan or stays on
	 * Free); Enterprise emails us.
	 */
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import { Check, Minus, Plus, Building2, Sparkles, Mail, ArrowRight, LayoutGrid, Boxes, ShoppingBag, Handshake, Users, Wrench, FileText, Plug, ShieldCheck } from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	// Notion-style billing switch: yearly first (two months free).
	let yearly = $state(true);

	type Cell = boolean | string;
	/** One value per plan, cheapest first: Free, Starter, Standard, Business, Enterprise. */
	type Row = { label: () => string; v: [Cell, Cell, Cell, Cell, Cell] };
	type Tone = 'slate' | 'blue' | 'orange' | 'fuchsia' | 'violet' | 'teal' | 'sky' | 'cyan' | 'emerald';
	type Group = { key: string; title: () => string; tone: Tone; icon: typeof Check; rows: Row[]; note?: () => string; link?: { href: string; label: () => string } };

	const thb = (n: number) => '฿' + n.toLocaleString('en-US');
	const mailto = (subject: string) => `mailto:sales@codustry.com?subject=${encodeURIComponent(subject)}`;
	const U = () => m.pr_unlimited();
	/** Included from plan number `i` upward (0 = Free … 4 = Enterprise). */
	const from = (i: number): Row['v'] => [0 >= i, 1 >= i, 2 >= i, 3 >= i, 4 >= i];

	// One colour per module — the app's own module colours. Full class names so Tailwind keeps them.
	const TONE: Record<Tone, { band: string; chip: string; bar: string; tick: string; dot: string }> = {
		slate: { band: 'bg-slate-200 text-slate-800', chip: 'bg-slate-100 text-slate-700 hover:bg-slate-200', bar: 'border-l-slate-400', tick: 'text-slate-600', dot: 'bg-slate-500' },
		blue: { band: 'bg-blue-100 text-blue-800', chip: 'bg-blue-50 text-blue-700 hover:bg-blue-100', bar: 'border-l-blue-500', tick: 'text-blue-600', dot: 'bg-blue-500' },
		orange: { band: 'bg-orange-100 text-orange-800', chip: 'bg-orange-50 text-orange-700 hover:bg-orange-100', bar: 'border-l-orange-500', tick: 'text-orange-600', dot: 'bg-orange-500' },
		fuchsia: { band: 'bg-fuchsia-100 text-fuchsia-800', chip: 'bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100', bar: 'border-l-fuchsia-500', tick: 'text-fuchsia-600', dot: 'bg-fuchsia-500' },
		violet: { band: 'bg-violet-100 text-violet-800', chip: 'bg-violet-50 text-violet-700 hover:bg-violet-100', bar: 'border-l-violet-500', tick: 'text-violet-600', dot: 'bg-violet-500' },
		teal: { band: 'bg-teal-100 text-teal-800', chip: 'bg-teal-50 text-teal-700 hover:bg-teal-100', bar: 'border-l-teal-500', tick: 'text-teal-600', dot: 'bg-teal-500' },
		sky: { band: 'bg-sky-100 text-sky-800', chip: 'bg-sky-50 text-sky-700 hover:bg-sky-100', bar: 'border-l-sky-500', tick: 'text-sky-600', dot: 'bg-sky-500' },
		cyan: { band: 'bg-cyan-100 text-cyan-800', chip: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100', bar: 'border-l-cyan-500', tick: 'text-cyan-600', dot: 'bg-cyan-500' },
		emerald: { band: 'bg-emerald-100 text-emerald-800', chip: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100', bar: 'border-l-emerald-500', tick: 'text-emerald-600', dot: 'bg-emerald-500' }
	};

	const groups: Group[] = [
		{
			key: 'core', title: m.pr_g_core, tone: 'slate', icon: LayoutGrid,
			rows: [
				{ label: m.pr_r_members, v: ['1', '5', '10', '25', '100+'] },
				{ label: m.pr_r_storage, v: ['5 GB', '30 GB', '50 GB', '100 GB', '1 TB'] },
				{ label: m.pr_r_file, v: ['50 MB', '200 MB', '1 GB', '5 GB', '20 GB'] },
				{ label: m.pr_r_multi_company, v: from(4) }
			]
		},
		{
			key: 'operation', title: m.pr_g_operation, tone: 'blue', icon: Boxes,
			rows: [
				{ label: m.pr_r_products, v: ['300', '1,000', '5,000', U(), U()] },
				{ label: m.pr_r_warehouses, v: ['2', '3', '5', '10', U()] },
				{ label: m.pr_r_pos_month, v: ['30', '100', '300', U(), U()] },
				{ label: m.pr_r_lots, v: from(2) },
				{ label: m.pr_r_rfq, v: from(2) },
				{ label: m.pr_r_manufacturing, v: from(3) },
				{ label: m.pr_r_accounting, v: from(4) }
			]
		},
		{
			key: 'commerce', title: m.pr_g_commerce, tone: 'orange', icon: ShoppingBag,
			rows: [
				{ label: m.pr_r_shops, v: ['1', '1', '2', '5', U()] },
				{ label: m.pr_r_pos_devices, v: ['1', '2', '5', '10', U()] },
				{ label: m.pr_r_orders, v: ['300', '1,000', '3,000', U(), U()] },
				{ label: m.pr_r_beam, v: from(0) },
				{ label: m.pr_r_promptpay, v: from(0) },
				{ label: m.pr_r_slip_verify, v: from(1) },
				{ label: m.pr_r_kitchen, v: from(2) },
				{ label: m.pr_r_channels, v: [false, false, false, m.pr_addon(), m.pr_included()] },
				{ label: m.pr_r_domain, v: from(4) }
			]
		},
		{
			key: 'crm', title: m.pr_g_crm, tone: 'fuchsia', icon: Handshake,
			rows: [
				{ label: m.pr_r_customers, v: ['200', '1,000', '5,000', U(), U()] },
				{ label: m.pr_r_deals, v: ['50', '200', '1,000', U(), U()] },
				{ label: m.pr_r_egp, v: from(3) },
				{ label: m.pr_r_visits, v: from(3) }
			]
		},
		{
			key: 'people', title: m.pr_g_people, tone: 'violet', icon: Users,
			rows: [
				{ label: m.pr_r_employees, v: ['10', '10', '50', '200', U()] },
				{ label: m.pr_r_payroll, v: from(2) },
				{ label: m.pr_r_recruit, v: from(3) },
				{ label: m.pr_r_hik, v: [false, false, false, m.pr_addon(), m.pr_included()] }
			]
		},
		{
			key: 'service', title: m.pr_g_service, tone: 'teal', icon: Wrench,
			rows: [
				{ label: m.pr_r_jobs, v: ['20', '50', '200', U(), U()] },
				{ label: m.pr_r_quotes, v: from(2) }
			]
		},
		{
			key: 'docs', title: m.pr_g_docs, tone: 'sky', icon: FileText,
			rows: [
				{ label: m.pr_r_pages, v: ['200', '500', '2,000', U(), U()] },
				{ label: m.pr_r_share, v: from(2) },
				{ label: m.pr_r_dbs, v: from(3) }
			]
		},
		{
			// Mirrors plans.ts API_LIMITS. Free is a read-only taste; drafts need a paid plan.
			key: 'api', title: m.pr_g_api, tone: 'cyan', icon: Plug,
			rows: [
				{ label: m.pr_r_api_access, v: [m.pr_r_api_read_only(), true, true, true, true] },
				{ label: m.pr_r_api_drafts, v: from(1) },
				{ label: m.pr_r_api_keys, v: ['1', '2', '3', '5', U()] },
				{ label: m.pr_r_api_webhooks, v: ['1', '1', '2', '3', '20'] },
				{ label: m.pr_r_api_rpm, v: ['10', '30', '60', '60', '600'] },
				{ label: m.pr_r_api_daily, v: ['300', '3,000', '10,000', '20,000', '500,000'] }
			],
			note: m.pr_api_note,
			link: { href: '/developers', label: m.pr_api_link }
		},
		{
			key: 'security', title: m.pr_g_security, tone: 'emerald', icon: ShieldCheck,
			rows: [
				{ label: m.pr_r_roles, v: from(2) },
				{ label: m.pr_r_sso, v: from(3) },
				{ label: m.pr_r_audit, v: [false, false, false, m.pr_r_audit_1y(), m.pr_r_audit_3y()] },
				{ label: m.pr_r_support, v: from(3) },
				{ label: m.pr_r_scim, v: from(4) },
				{ label: m.pr_r_sla, v: [false, false, false, false, m.pr_support_pack()] },
				{ label: m.pr_r_csm, v: [false, false, false, false, m.pr_support_pack()] }
			]
		}
	];

	const addOns: { name: () => string; detail?: () => string; price: number; once?: boolean; business?: boolean; enterprise?: boolean; inEnterprise?: boolean }[] = [
		{ name: m.pr_ao_storage, price: 1000 },
		{ name: m.pr_ao_members, price: 3000, business: true },
		{ name: m.pr_ao_shop, price: 2400, business: true },
		{ name: m.pr_ao_pos, price: 1200, business: true },
		{ name: m.pr_ao_channels, detail: m.pr_ao_channels_d, price: 3600, business: true, inEnterprise: true },
		{ name: m.pr_ao_slips, price: 600, once: true, business: true, inEnterprise: true },
		{ name: m.pr_ao_hik, price: 3600, business: true, inEnterprise: true },
		{ name: m.pr_ao_sla, price: 12000, business: true },
		{ name: m.pr_ao_onboarding, detail: m.pr_ao_onboarding_d, price: 15000, once: true },
		{ name: m.pr_ao_support, detail: m.pr_ao_support_d, price: 48000, enterprise: true }
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

	type Plan = { key: string; name: () => string; yearly: number; monthly: number | null; desc: () => string; lead: () => string; bullets: (() => string)[]; best?: boolean; quoted?: boolean };
	const plans: Plan[] = [
		{ key: 'free', name: m.pr_plan_free, yearly: 0, monthly: null, desc: m.pr_free_desc, lead: m.pr_includes, bullets: [m.pr_b_free_1, m.pr_b_free_2, m.pr_b_free_3, m.pr_b_free_4, m.pr_b_free_5, m.pr_b_free_6, m.pr_b_free_7, m.pr_b_free_8] },
		{ key: 'starter', name: m.pr_plan_starter, yearly: 2990, monthly: 299, desc: m.pr_starter_desc, lead: m.pr_everything_free, bullets: [m.pr_b_sta_1, m.pr_b_sta_2, m.pr_b_sta_3, m.pr_b_sta_4, m.pr_b_sta_5] },
		{ key: 'standard', name: m.pr_plan_standard, yearly: 6000, monthly: 600, desc: m.pr_standard_desc, lead: m.pr_everything_starter, bullets: [m.pr_b_std_1, m.pr_b_std_2, m.pr_b_std_3, m.pr_b_std_4, m.pr_b_std_5, m.pr_b_std_6] },
		{ key: 'business', name: m.pr_plan_business, yearly: 14400, monthly: 1440, desc: m.pr_business_desc, lead: m.pr_everything_standard, bullets: [m.pr_b_bus_1, m.pr_b_bus_2, m.pr_b_bus_3, m.pr_b_bus_4, m.pr_b_bus_5, m.pr_b_bus_6, m.pr_b_bus_7, m.pr_b_bus_8, m.pr_b_bus_9], best: true },
		{ key: 'enterprise', name: m.pr_plan_enterprise, yearly: 42000, monthly: null, desc: m.pr_enterprise_desc, lead: m.pr_everything_business, bullets: [m.pr_b_ent_1, m.pr_b_ent_2, m.pr_b_ent_3, m.pr_b_ent_4, m.pr_b_ent_5, m.pr_b_ent_7, m.pr_b_ent_6], quoted: true }
	];
</script>

{#snippet cell(v: Cell, tick: string)}
	{#if v === true}
		<Check class="h-4 w-4 {tick}" aria-label="✓" />
	{:else if v === false}
		<Minus class="h-4 w-4 text-tnb-line" aria-label="—" />
	{:else}
		<span class="text-sm text-tnb-ink">{v}</span>
	{/if}
{/snippet}

{#snippet planCol(p: Plan)}
	<div class="flex flex-col">
		<h2 class="flex flex-wrap items-center gap-2 text-lg font-semibold text-tnb-ink">
			{#if p.key === 'enterprise'}<Building2 class="h-4 w-4" aria-hidden="true" />{/if}
			{p.name()}
			{#if p.best}<span class="rounded-full bg-tnb-blue/10 px-2 py-0.5 text-xs font-medium text-tnb-blue">{m.pr_recommended()}</span>{/if}
		</h2>
		<p class="mt-1 flex flex-wrap items-baseline gap-x-1.5">
			{#if p.quoted}<span class="text-sm text-tnb-ink-soft">{m.pr_from()}</span>{/if}
			<span class="text-3xl font-bold tracking-tight tabular-nums text-tnb-ink">{thb(yearly || !p.monthly ? p.yearly : p.monthly)}</span>
			<span class="text-sm text-tnb-ink-soft">{p.key === 'free' ? m.pr_price_free_unit() : yearly || !p.monthly ? m.pr_per_year() : m.pr_per_month()}</span>
		</p>
		<p class="text-xs leading-snug text-tnb-ink-soft md:min-h-12">
			{#if p.monthly}{yearly ? m.pr_or_monthly({ price: thb(p.monthly) }) : m.pr_or_yearly({ price: thb(p.yearly) })}{:else if p.quoted}{m.pr_enterprise_price_note()}{/if}
		</p>
		<p class="mt-2 text-[15px] leading-snug text-tnb-ink-soft md:min-h-24">{p.desc()}</p>
		{#if p.key === 'enterprise'}
			<a href={mailto(m.pr_mail_subject_enterprise())} class="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-tnb-paper px-4 py-2.5 font-semibold text-tnb-blue-deep transition hover:bg-white/70">{m.pr_cta_enterprise()}</a>
		{:else}
			<a href="https://app.tonbab.com/signup" class="{p.best ? 'btn-primary' : 'btn-soft'} mt-5 w-full">{p.key === 'free' ? m.pr_cta_free() : m.pr_cta_trial()}</a>
		{/if}
		<p class="mt-7 text-sm font-semibold text-tnb-ink">{p.lead()}</p>
		<ul class="mt-3 space-y-2.5">
			{#each p.bullets as b (b())}
				<li class="flex gap-2.5 text-[15px] leading-snug text-tnb-ink"><Check class="mt-0.5 h-4 w-4 shrink-0 text-tnb-ink-soft" aria-hidden="true" />{b()}</li>
			{/each}
		</ul>
	</div>
{/snippet}

<!-- Hero -->
<section class="container mx-auto max-w-7xl px-4 pb-10 pt-16 sm:pt-24">
	<h1 class="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-tnb-ink sm:text-6xl">{m.pr_hero_title()}</h1>
	<p class="mt-5 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">{m.pr_hero_sub()}</p>
	<div class="mt-6 flex flex-wrap items-center gap-3">
		<div class="inline-flex rounded-full bg-tnb-mist p-1 text-sm font-medium" role="radiogroup" aria-label={m.pr_bill_label()}>
			<button type="button" role="radio" aria-checked={yearly} onclick={() => (yearly = true)} class="rounded-full px-4 py-1.5 transition {yearly ? 'bg-tnb-paper text-tnb-ink shadow-sm' : 'text-tnb-ink-soft'}">{m.pr_bill_yearly()}</button>
			<button type="button" role="radio" aria-checked={!yearly} onclick={() => (yearly = false)} class="rounded-full px-4 py-1.5 transition {!yearly ? 'bg-tnb-paper text-tnb-ink shadow-sm' : 'text-tnb-ink-soft'}">{m.pr_bill_monthly()}</button>
		</div>
		<span class="rounded-full bg-tnb-blue/10 px-2.5 py-1 text-xs font-medium text-tnb-blue">{m.pr_yearly_saves()}</span>
	</div>
	<p class="mt-3 text-sm text-tnb-ink-soft">{m.pr_vat_note()}</p>
</section>

<!-- Plans, after notion.com/pricing: the two entry plans on a plain panel, the three growth plans together on a tinted one -->
<section class="container mx-auto max-w-7xl px-4">
	<div class="grid gap-4 xl:grid-cols-[2fr_3fr]">
		<div class="rounded-2xl border border-tnb-hair bg-tnb-paper p-6 sm:p-8">
			<p class="text-xl font-semibold leading-snug text-tnb-ink">{m.pr_panel_start()}</p>
			<div class="mt-8 grid gap-10 md:grid-cols-2 md:gap-8">
				{#each plans.slice(0, 2) as p (p.key)}{@render planCol(p)}{/each}
			</div>
		</div>
		<div class="rounded-2xl bg-tnb-wash p-6 sm:p-8">
			<p class="flex items-center gap-2 text-xl font-semibold leading-snug text-tnb-ink"><Sparkles class="h-5 w-5 text-tnb-amber" aria-hidden="true" />{m.pr_panel_grow()}</p>
			<div class="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
				{#each plans.slice(2) as p (p.key)}{@render planCol(p)}{/each}
			</div>
		</div>
	</div>
	<p class="mt-4 text-sm text-tnb-ink-soft">{m.pr_trial_note()}</p>
</section>

<!-- Comparison: one colour per module -->
<section class="container mx-auto max-w-7xl px-4 pt-24">
	<h2 class="text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{m.pr_compare_title()}</h2>
	<nav class="mt-6 flex flex-wrap items-center gap-2" aria-label={m.pr_jump()}>
		<span class="text-sm text-tnb-ink-soft">{m.pr_jump()}</span>
		{#each groups as g (g.key)}
			<a href="#cmp-{g.key}" class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition {TONE[g.tone].chip}"><g.icon class="h-3.5 w-3.5" aria-hidden="true" />{g.title()}</a>
		{/each}
	</nav>
	<div class="mt-6 overflow-x-auto lg:overflow-visible">
		<table class="w-full min-w-[640px] table-fixed sm:min-w-[760px] border-separate border-spacing-0 text-left">
			<colgroup><col class="w-[150px] sm:w-[27%]" /><col /><col /><col /><col /><col /></colgroup>
			<thead>
				<tr>
					<th class="sticky left-0 z-10 border-b border-tnb-hair bg-tnb-paper py-3 lg:top-16"><span class="sr-only">{m.pr_compare_title()}</span></th>
					{#each plans as p (p.key)}
						<th class="z-10 border-b border-tnb-hair bg-tnb-paper px-2 py-3 align-bottom lg:sticky lg:top-16">
							<div class="text-sm font-semibold {p.best ? 'text-tnb-blue' : 'text-tnb-ink'}">{p.name()}</div>
							<div class="text-xs font-normal tabular-nums text-tnb-ink-soft">{#if p.quoted}{m.pr_from()} {/if}{thb(yearly || !p.monthly ? p.yearly : p.monthly)}{#if p.key !== 'free'} {yearly || !p.monthly ? m.pr_per_year() : m.pr_per_month_short()}{/if}</div>
						</th>
					{/each}
				</tr>
			</thead>
			{#each groups as g (g.key)}
				{@const t = TONE[g.tone]}
				<tbody id="cmp-{g.key}" class="scroll-mt-36">
					<tr><td colspan="6" class="h-6"></td></tr>
					<tr>
						<th colspan="6" class="rounded-lg px-3 py-2.5 {t.band}">
							<span class="sticky left-3 inline-flex items-center gap-2 text-sm font-semibold"><g.icon class="h-4 w-4" aria-hidden="true" />{g.title()}</span>
						</th>
					</tr>
					{#each g.rows as r (r.label())}
						<tr>
							<th scope="row" class="sticky left-0 z-[5] border-b border-l-4 border-b-tnb-hair bg-tnb-paper py-3 pl-3 pr-4 text-sm font-medium text-tnb-ink sm:text-[15px] lg:static {t.bar}">{r.label()}</th>
							{#each r.v as v, i (i)}
								<td class="border-b border-tnb-hair px-2 py-3 {i === 3 ? 'bg-tnb-wash/50' : ''}">{@render cell(v, t.tick)}</td>
							{/each}
						</tr>
					{/each}
					{#if g.note || g.link}
						<tr>
							<td colspan="6" class="pt-3 text-sm leading-relaxed text-tnb-ink-soft">
								{#if g.note}{g.note()}{/if}
								{#if g.link}<a href={localePath(locale, g.link.href)} class="ml-1 inline-flex items-center gap-0.5 font-medium text-tnb-blue hover:underline">{g.link.label()}<ArrowRight class="h-3.5 w-3.5" aria-hidden="true" /></a>{/if}
							</td>
						</tr>
					{/if}
				</tbody>
			{/each}
		</table>
	</div>
	<p class="mt-4 text-sm text-tnb-ink-soft">{m.pr_vat_note()}</p>

	<!-- Accounting is invitation-only early access: no price, no limits table. -->
	<div class="mt-10 flex flex-col gap-4 rounded-2xl bg-tnb-mist p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
		<div class="max-w-2xl">
			<p class="font-semibold text-tnb-ink">{m.pr_accounting_title()}</p>
			<p class="mt-1.5 text-[15px] leading-relaxed text-tnb-ink-soft">{m.pr_accounting_body()}</p>
		</div>
		<a href={localePath(locale, '/modules/accounting')} class="btn-soft shrink-0">{m.pr_accounting_cta()}</a>
	</div>
</section>

<!-- Add-ons -->
<section class="container mx-auto max-w-7xl px-4 pt-24">
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
					{#if a.enterprise}<span class="rounded-full bg-tnb-paper px-2 py-0.5 text-xs text-tnb-ink-soft">{m.pr_addon_enterprise()}</span>{/if}
					{#if a.inEnterprise}<span class="rounded-full bg-tnb-wash px-2 py-0.5 text-xs text-tnb-blue-deep">{m.pr_addon_in_enterprise()}</span>{/if}
				</div>
			</li>
		{/each}
	</ul>
</section>

<!-- FAQ -->
<section class="container mx-auto max-w-7xl px-4 pt-24">
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
<section class="container mx-auto max-w-7xl px-4 py-24">
	<div class="rounded-2xl bg-tnb-mist px-6 py-12 text-center sm:px-12">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink sm:text-3xl">{m.pr_contact_title()}</h2>
		<p class="mx-auto mt-3 max-w-xl text-tnb-ink-soft">{m.pr_contact_sub()}</p>
		<a href="mailto:sales@codustry.com" class="btn-primary mt-7"><Mail class="h-4 w-4" aria-hidden="true" />{m.pr_contact_cta()}</a>
	</div>
</section>
