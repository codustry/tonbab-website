<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import {
		Briefcase, ShoppingCart, PackageCheck, Boxes, Factory, Truck, ReceiptText, Users, CalendarDays, Clock,
		CalendarRange, UserPlus, UserCircle, Store, ShoppingBag, MessageCircle, CreditCard, Kanban, Building2,
		CalendarClock, Landmark, RefreshCw, BarChart3, Wrench, UserCheck, ShieldCheck, LayoutDashboard, Inbox,
		MonitorSmartphone, KeyRound, FileSpreadsheet, Languages, QrCode, Scale, Smartphone, Package, Check,
		ArrowRight, Play, Pause, Handshake, Layers
	} from 'lucide-svelte';
	import { countUp } from '$lib/marketing/animate';
	import ProductMock from '$lib/components/www/ProductMock.svelte';
	import {
		SUITE_THEME, heroWords, suiteModules, useCases, suiteApps, loopSteps, thaiPoints, realStats, kiosks,
		type SuiteKey
	} from '$lib/marketing/suite-data';
	import type { Bi } from '$lib/marketing/compare-data';

	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	const t = $derived.by(() => (b: Bi) => (locale === 'th' ? b.th : b.en));

	const ICONS: Record<string, typeof Factory> = {
		Briefcase, ShoppingCart, PackageCheck, Boxes, Factory, Truck, ReceiptText, Users, CalendarDays, Clock,
		CalendarRange, UserPlus, UserCircle, Store, ShoppingBag, MessageCircle, CreditCard, Kanban, Building2,
		CalendarClock, Landmark, RefreshCw, BarChart3, Wrench, UserCheck, ShieldCheck, LayoutDashboard, Inbox,
		MonitorSmartphone, KeyRound, FileSpreadsheet, Languages, QrCode, Scale, Smartphone, Package
	};
	const MODULE_ICON: Record<SuiteKey, typeof Factory> = {
		operation: Factory, people: Users, commerce: Store, crm: Handshake, service: Wrench, platform: Layers
	};
	const MODULE_LABEL: Record<SuiteKey, Bi> = {
		operation: { en: 'Operation', th: 'Operation' },
		people: { en: 'People', th: 'People' },
		commerce: { en: 'Commerce', th: 'Commerce' },
		crm: { en: 'CRM', th: 'CRM' },
		service: { en: 'Service', th: 'Service' },
		platform: { en: 'Platform', th: 'แพลตฟอร์ม' }
	};

	// Motion is opt-out: reduced-motion visitors get static, fully-rendered sections.
	let reduced = $state(false);
	$effect(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	// ── Hero: rotating word
	let wordIdx = $state(0);
	$effect(() => {
		if (reduced) return;
		const id = setInterval(() => (wordIdx = (wordIdx + 1) % heroWords.length), 2200);
		return () => clearInterval(id);
	});
	const word = $derived(heroWords[wordIdx]);

	// ── Hero: module switcher (auto-advances until the visitor picks one)
	let active = $state(0);
	let userPicked = $state(false);
	$effect(() => {
		if (reduced || userPicked) return;
		const id = setInterval(() => (active = (active + 1) % suiteModules.length), 6500);
		return () => clearInterval(id);
	});
	const activeMod = $derived(suiteModules[active]);
	function pick(i: number) {
		active = i;
		userPicked = true;
	}

	// ── App grid filter
	let filter = $state<SuiteKey | 'all'>('all');
	const filters: (SuiteKey | 'all')[] = ['all', 'operation', 'people', 'commerce', 'crm', 'service', 'platform'];
	const shownApps = $derived(filter === 'all' ? suiteApps : suiteApps.filter((a) => a.module === filter));

	// ── Connected loop stepper
	let step = $state(0);
	let playing = $state(true);
	$effect(() => {
		if (reduced || !playing) return;
		const id = setInterval(() => (step = (step + 1) % loopSteps.length), 3800);
		return () => clearInterval(id);
	});
	const loopStep = $derived(loopSteps[step]);

	const trust = [m.mkt_trust_bilingual, m.mkt_trust_pwa, m.mkt_trust_promptpay];
	const faqs = [
		{ q: m.mkt_faq_q1, a: m.mkt_faq_a1 },
		{ q: m.mkt_faq_q6, a: m.mkt_faq_a6 },
		{ q: m.mkt_faq_q2, a: m.mkt_faq_a2 },
		{ q: m.mkt_faq_q4, a: m.mkt_faq_a4 }
	];
</script>

<!-- ───────────────────────── Hero ───────────────────────── -->
<section class="relative overflow-hidden bg-tnb-wash">
	<!-- Blueprint grid — Tonbab (ต้นแบบ) means "the master plan". -->
	<div aria-hidden="true" class="blueprint pointer-events-none absolute inset-0"></div>
	<div class="relative container mx-auto px-4 pt-16 pb-14 text-center sm:pt-20">
		<p class="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-tnb-blue-deep ring-1 ring-tnb-wash-deep">
			<span class="flex gap-0.5" aria-hidden="true">
				{#each suiteModules as sm (sm.key)}<span class="h-2 w-2 rounded-full {SUITE_THEME[sm.key].solid}"></span>{/each}
			</span>
			{t({ en: 'One Thai-first platform · 5 modules · 3 kiosk apps', th: 'แพลตฟอร์มเดียวสไตล์ไทย · 5 โมดูล · 3 แอปคีออสก์' })}
		</p>
		<h1 class="mx-auto max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight text-tnb-ink sm:text-6xl">
			{t({ en: 'One system that runs your', th: 'ระบบเดียว ที่ดูแลครบทั้ง' })}
			<span class="relative inline-block min-w-[6ch]">
				{#key wordIdx}
					<span class="word inline-block {SUITE_THEME[word.key].text}">{t(word.word)}</span>
				{/key}
			</span>
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">
			{t({
				en: 'Purchasing, stock, production, HR, POS, chat, sales and after-sales service — in one database, in Thai and English, on every device.',
				th: 'จัดซื้อ สต็อก การผลิต บุคคล หน้าร้าน แชท งานขาย และบริการหลังการขาย — ในฐานข้อมูลเดียว ภาษาไทยและอังกฤษ ใช้ได้ทุกอุปกรณ์'
			})}
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<a href={localePath(locale, '/pricing')} class="btn-amber">{m.mkt_hero_cta_primary()}</a>
			<a href="#apps" class="inline-flex items-center gap-1.5 rounded-lg border-2 border-tnb-blue bg-white px-6 py-3 text-base font-semibold text-tnb-blue transition hover:bg-tnb-wash-deep">
				{t({ en: 'See every app', th: 'ดูแอปทั้งหมด' })}<ArrowRight class="h-4 w-4" aria-hidden="true" />
			</a>
		</div>
		<ul class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-tnb-ink-soft">
			{#each trust as tr (tr)}
				<li class="inline-flex items-center gap-1.5"><Check class="h-4 w-4 text-tnb-blue" aria-hidden="true" />{tr()}</li>
			{/each}
		</ul>

		<!-- Module switcher + illustrated product window -->
		<div class="mx-auto mt-12 max-w-5xl">
			<div role="tablist" aria-label={t({ en: 'Modules', th: 'โมดูล' })} class="flex flex-wrap justify-center gap-2">
				{#each suiteModules as sm, i (sm.key)}
					{@const Icon = MODULE_ICON[sm.key]}
					{@const th = SUITE_THEME[sm.key]}
					<button
						type="button"
						role="tab"
						aria-selected={active === i}
						onclick={() => pick(i)}
						class="relative inline-flex items-center gap-2 overflow-hidden rounded-full border bg-white px-4 py-2 text-sm font-semibold transition
							{active === i ? `${th.ring} ${th.text} shadow-sm` : 'border-tnb-line text-tnb-ink-soft hover:border-tnb-ink-soft/40 hover:text-tnb-ink'}"
					>
						<span class="flex h-6 w-6 items-center justify-center rounded-full {th.chip}"><Icon class="h-3.5 w-3.5" aria-hidden="true" /></span>
						{t(sm.name)}
						<span class="hidden text-xs font-normal text-tnb-ink-soft md:inline">· {t(sm.short)}</span>
						{#if active === i && !userPicked && !reduced}
							<span class="progress absolute bottom-0 left-0 h-0.5 {th.solid}"></span>
						{/if}
					</button>
				{/each}
			</div>

			<div class="mt-6 grid items-center gap-6 text-left lg:grid-cols-[1fr_17rem]">
				{#key active}
					<div class="fade-in min-w-0"><ProductMock module={activeMod.key} {locale} /></div>
				{/key}
				<div class="rounded-2xl bg-white/85 p-5 ring-1 ring-tnb-wash-deep">
					<p class="text-xs font-semibold uppercase tracking-wider {SUITE_THEME[activeMod.key].text}">{t(activeMod.short)}</p>
					<p class="mt-2 font-semibold leading-snug text-tnb-ink">{t(activeMod.pitch)}</p>
					<ul class="mt-4 space-y-2.5">
						{#each activeMod.points as p (p.en)}
							<li class="flex gap-2 text-sm text-tnb-ink-soft">
								<Check class="mt-0.5 h-4 w-4 shrink-0 {SUITE_THEME[activeMod.key].text}" aria-hidden="true" />{t(p)}
							</li>
						{/each}
					</ul>
					<a href={localePath(locale, `/modules/${activeMod.key}`)} class="mt-5 inline-flex items-center gap-1 text-sm font-semibold {SUITE_THEME[activeMod.key].text} hover:underline">
						{t({ en: `Explore ${activeMod.name.en}`, th: `ดูโมดูล ${activeMod.name.th}` })}<ArrowRight class="h-4 w-4" aria-hidden="true" />
					</a>
				</div>
			</div>
			<p class="mt-3 text-xs text-tnb-ink-soft/80">{t({ en: 'Illustrated screens with example data.', th: 'ภาพหน้าจอจำลองพร้อมข้อมูลตัวอย่าง' })}</p>
		</div>
	</div>
</section>

<!-- ───────────────────── Use cases ───────────────────── -->
<section class="bg-white">
	<div class="container mx-auto px-4 py-20">
		<h2 class="section-title">{t({ en: 'How every team runs better on Tonbab', th: 'ทุกทีมทำงานได้ดีขึ้นด้วย Tonbab' })}</h2>
		<p class="section-lede">{t({ en: 'The same records flow from sales to the warehouse to the technician — nobody re-types an order.', th: 'ข้อมูลชุดเดียวไหลจากฝ่ายขาย ไปคลังสินค้า ไปจนถึงช่าง — ไม่มีใครต้องพิมพ์ออเดอร์ซ้ำ' })}</p>
		<div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each useCases as uc (uc.key)}
				{@const th = SUITE_THEME[uc.module]}
				<article class="flex flex-col overflow-hidden rounded-2xl border border-tnb-line bg-white transition hover:-translate-y-1 hover:shadow-[0_14px_34px_-14px_rgba(23,22,28,0.25)]">
					<div class="relative h-36 overflow-hidden p-4 {th.wash}" aria-hidden="true">
						{#if uc.key === 'jobcost'}
							<div class="rounded-lg bg-white p-3 shadow-sm">
								<p class="text-[10px] text-tnb-ink-soft">JC-2026-014</p>
								<div class="mt-1.5 h-2 rounded-full bg-tnb-line"><div class="h-2 w-[68%] rounded-full {th.solid}"></div></div>
								<div class="mt-2 grid grid-cols-3 gap-1 text-[9.5px] text-tnb-ink-soft">
									<span>PO ฿412k</span><span>WO ฿138k</span><span>DN ฿21k</span>
								</div>
							</div>
							<span class="absolute right-4 bottom-3 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-emerald-700 shadow-sm">฿304k {t({ en: 'left', th: 'คงเหลือ' })}</span>
						{:else if uc.key === 'approve'}
							<div class="mx-auto w-36 rounded-2xl border-4 border-tnb-ink bg-white p-2 shadow-md">
								{#each [{ k: 'PR-0144', c: 'bg-blue-500' }, { k: '🌴 2d', c: 'bg-violet-500' }, { k: 'PO-0154', c: 'bg-blue-500' }] as a (a.k)}
									<div class="mb-1 flex items-center gap-1.5 rounded-md bg-slate-50 px-1.5 py-1 text-[9px]">
										<span class="h-2 w-2 rounded-full {a.c}"></span>
										<span class="flex-1 text-tnb-ink">{a.k}</span>
										<span class="font-bold text-emerald-600">✓</span>
									</div>
								{/each}
							</div>
						{:else if uc.key === 'chat'}
							<div class="space-y-1.5 text-[10.5px]">
								<span class="block w-fit rounded-xl rounded-bl-sm bg-white px-2.5 py-1 shadow-sm"><b class="mr-1 text-[#06C755]">LINE</b>{t({ en: 'In stock?', th: 'มีของไหม' })}</span>
								<span class="ml-auto block w-fit rounded-xl rounded-br-sm px-2.5 py-1 text-white {th.solid}">{t({ en: 'Yes! Order opened ✓', th: 'มีค่ะ เปิดออเดอร์แล้ว ✓' })}</span>
								<span class="block w-fit rounded-lg bg-white px-2.5 py-1 font-semibold shadow-sm">PromptPay · ฿780</span>
							</div>
						{:else}
							<div class="flex h-full items-center justify-center gap-3">
								<div class="rounded-lg bg-white p-2 text-[10px] shadow-sm">
									<p class="font-semibold text-tnb-ink">📍 {t({ en: 'Checked in', th: 'เช็คอินแล้ว' })}</p>
									<p class="text-tnb-ink-soft">09:42 · GPS ±8 m</p>
								</div>
								<div class="rounded-lg bg-white p-2 text-[10px] shadow-sm">
									<p class="font-semibold text-tnb-ink">✍️ {t({ en: 'Signed', th: 'เซ็นรับแล้ว' })}</p>
									<p class="text-tnb-ink-soft">{t({ en: '3 photos', th: 'รูป 3 ใบ' })}</p>
								</div>
							</div>
						{/if}
					</div>
					<div class="flex flex-1 flex-col p-5">
						<p class="text-xs font-semibold uppercase tracking-wider {th.text}">{t(MODULE_LABEL[uc.module])}</p>
						<h3 class="mt-1.5 text-lg font-semibold leading-snug text-tnb-ink">{t(uc.title)}</h3>
						<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{t(uc.body)}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ───────────────────── One platform: every app ───────────────────── -->
<section id="apps" class="scroll-mt-20 bg-[#f7f8fb]">
	<div class="container mx-auto px-4 py-20">
		<h2 class="section-title">{t({ en: 'One platform. Every app your business runs on.', th: 'แพลตฟอร์มเดียว ครบทุกแอปที่ธุรกิจต้องใช้' })}</h2>
		<p class="section-lede">{t({ en: 'Turn modules on as you grow. They share one customer list, one product catalogue and one stock ledger.', th: 'เปิดโมดูลเพิ่มได้ตามการเติบโต ทุกโมดูลใช้รายชื่อลูกค้า แคตตาล็อกสินค้า และบัญชีสต็อกชุดเดียวกัน' })}</p>

		<div class="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label={t({ en: 'Filter apps by module', th: 'กรองแอปตามโมดูล' })}>
			{#each filters as f (f)}
				<button
					type="button"
					aria-pressed={filter === f}
					onclick={() => (filter = f)}
					class="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition
						{filter === f ? (f === 'all' ? 'bg-tnb-ink text-white' : `${SUITE_THEME[f].solid} text-white`) : 'bg-white text-tnb-ink-soft ring-1 ring-tnb-line hover:text-tnb-ink'}"
				>
					{#if f !== 'all'}<span class="h-2 w-2 rounded-full {filter === f ? 'bg-white' : SUITE_THEME[f].solid}"></span>{/if}
					{f === 'all' ? t({ en: 'All apps', th: 'ทั้งหมด' }) : t(MODULE_LABEL[f])}
					<span class="font-normal opacity-70">{f === 'all' ? suiteApps.length : suiteApps.filter((a) => a.module === f).length}</span>
				</button>
			{/each}
		</div>

		<div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each shownApps as app (app.module + app.name.en)}
				{@const Icon = ICONS[app.icon] ?? Layers}
				{@const th = SUITE_THEME[app.module]}
				<a
					href={app.module === 'platform' ? localePath(locale, '/modules') : localePath(locale, `/modules/${app.module}`)}
					class="group flex gap-3.5 rounded-xl border border-tnb-line/60 bg-white p-4 shadow-[0_1px_2px_rgba(23,22,28,0.05)] transition hover:-translate-y-0.5 hover:shadow-md"
				>
					<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition group-hover:scale-105 {th.chip}"><Icon class="h-5 w-5" aria-hidden="true" /></span>
					<span class="min-w-0">
						<span class="block font-semibold text-tnb-ink">{t(app.name)}</span>
						<span class="mt-0.5 block text-[13.5px] leading-snug text-tnb-ink-soft">{t(app.body)}</span>
						<span class="mt-1.5 block text-[11px] font-semibold uppercase tracking-wider {th.text}">{t(MODULE_LABEL[app.module])}</span>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ───────────────────── Connected loop ───────────────────── -->
<section class="bg-white">
	<div class="container mx-auto px-4 py-20">
		<h2 class="section-title">{t({ en: 'Follow one order through the whole business', th: 'ตามออเดอร์หนึ่งใบผ่านทั้งธุรกิจ' })}</h2>
		<p class="section-lede">{t({ en: 'Because every module shares one database, each step picks up where the last one left off.', th: 'เพราะทุกโมดูลใช้ฐานข้อมูลเดียวกัน ทุกขั้นตอนจึงรับช่วงต่อจากขั้นก่อนหน้าได้ทันที' })}</p>

		<div class="mx-auto mt-12 max-w-5xl">
			<div class="relative">
				<div aria-hidden="true" class="absolute top-5 right-5 left-5 h-0.5 bg-tnb-line"></div>
				<div aria-hidden="true" class="absolute top-5 left-5 h-0.5 bg-tnb-ink/70 transition-[width] duration-500" style="width:calc((100% - 2.5rem) * {step / (loopSteps.length - 1)})"></div>
				<ol class="relative flex justify-between">
					{#each loopSteps as s, i (i)}
						{@const th = SUITE_THEME[s.module]}
						<li class="flex w-10 flex-col items-center">
							<button
								type="button"
								onclick={() => { step = i; playing = false; }}
								aria-current={step === i ? 'step' : undefined}
								aria-label={t(s.doc)}
								class="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ring-4 ring-white transition
									{i <= step ? `${th.solid} text-white` : 'bg-tnb-line text-tnb-ink-soft hover:bg-tnb-wash-deep'} {step === i ? 'scale-110 shadow-lg' : ''}"
							>{i + 1}</button>
							<span class="mt-2 hidden w-24 text-center text-[11.5px] leading-tight font-medium md:block {step === i ? th.text : 'text-tnb-ink-soft'}">{t(s.doc)}</span>
						</li>
					{/each}
				</ol>
			</div>

			<div class="mt-8 grid items-stretch gap-4 md:grid-cols-[1fr_auto]">
				{#key step}
					<div class="fade-in rounded-2xl border-2 p-6 {SUITE_THEME[loopStep.module].ring} {SUITE_THEME[loopStep.module].wash}">
						<p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider {SUITE_THEME[loopStep.module].text}">
							<span class="h-2 w-2 rounded-full {SUITE_THEME[loopStep.module].solid}"></span>
							{t(MODULE_LABEL[loopStep.module])} · {t(loopStep.doc)}
						</p>
						<h3 class="mt-2 text-xl font-bold text-tnb-ink">{t(loopStep.title)}</h3>
						<p class="mt-2 max-w-2xl leading-relaxed text-tnb-ink-soft">{t(loopStep.body)}</p>
					</div>
				{/key}
				<div class="flex items-center gap-2 md:flex-col md:justify-center">
					<button type="button" onclick={() => (playing = !playing)} class="inline-flex items-center gap-1.5 rounded-lg border border-tnb-line px-3 py-2 text-sm font-medium text-tnb-ink hover:bg-tnb-wash" aria-pressed={playing}>
						{#if playing}<Pause class="h-4 w-4" aria-hidden="true" />{t({ en: 'Pause', th: 'หยุด' })}{:else}<Play class="h-4 w-4" aria-hidden="true" />{t({ en: 'Play', th: 'เล่น' })}{/if}
					</button>
					<button type="button" onclick={() => { step = (step + 1) % loopSteps.length; playing = false; }} class="inline-flex items-center gap-1.5 rounded-lg bg-tnb-ink px-3 py-2 text-sm font-medium text-white hover:bg-tnb-ink/90">
						{t({ en: 'Next', th: 'ถัดไป' })}<ArrowRight class="h-4 w-4" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ───────────────────── Thai-first — ink band ───────────────────── -->
<section class="bg-tnb-ink">
	<div class="container mx-auto px-4 py-20">
		<p class="text-center text-sm font-semibold tracking-wider text-tnb-amber uppercase">{t({ en: 'Made in Thailand, for Thailand', th: 'สร้างในไทย เพื่อธุรกิจไทย' })}</p>
		<h2 class="mt-3 text-center text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">{t({ en: 'Built for how Thai businesses actually work', th: 'ออกแบบตามวิธีทำงานจริงของธุรกิจไทย' })}</h2>
		<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each thaiPoints as p (p.icon)}
				{@const Icon = ICONS[p.icon] ?? Layers}
				<div class="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 transition hover:bg-white/[0.09]">
					<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-tnb-amber/15 text-tnb-amber"><Icon class="h-5 w-5" aria-hidden="true" /></span>
					<h3 class="mt-4 font-semibold text-white">{t(p.title)}</h3>
					<p class="mt-1.5 text-[15px] leading-relaxed text-white/65">{t(p.body)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ───────────────────── Kiosks & mobile ───────────────────── -->
<section class="overflow-hidden bg-white">
	<div class="container mx-auto grid items-center gap-14 px-4 py-20 lg:grid-cols-2">
		<div>
			<p class="text-sm font-semibold tracking-wider text-tnb-blue uppercase">{t({ en: 'On the floor, not just the office', th: 'ใช้ได้ถึงหน้างาน ไม่ใช่แค่ในออฟฟิศ' })}</p>
			<h2 class="mt-3 text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{t({ en: 'Kiosk apps for every station', th: 'แอปคีออสก์สำหรับทุกสถานี' })}</h2>
			<p class="mt-4 leading-relaxed text-tnb-ink-soft">{t({ en: 'Put a tablet at the packing bench, the production line or the counter. Operators sign in with a PIN, and everything they do lands in the same records the office sees.', th: 'วางแท็บเล็ตไว้ที่โต๊ะแพ็ก ไลน์ผลิต หรือหน้าร้าน พนักงานเข้าใช้ด้วย PIN และทุกอย่างที่ทำจะลงในข้อมูลชุดเดียวกับที่ออฟฟิศเห็น' })}</p>
			<div class="mt-8 space-y-3">
				{#each kiosks as k (k.icon)}
					{@const Icon = ICONS[k.icon] ?? Layers}
					<div class="flex gap-4 rounded-xl border border-tnb-line p-4">
						<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tnb-wash text-tnb-blue"><Icon class="h-5 w-5" aria-hidden="true" /></span>
						<div>
							<h3 class="font-semibold text-tnb-ink">{t(k.name)}</h3>
							<p class="mt-0.5 text-[15px] leading-relaxed text-tnb-ink-soft">{t(k.body)}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<!-- Tablet + phone illustration -->
		<div class="relative mx-auto mb-8 w-full max-w-sm" aria-hidden="true">
			<div class="rounded-[2rem] border-[10px] border-tnb-ink bg-white p-5 shadow-2xl">
				<p class="text-center text-sm font-semibold text-tnb-ink">{t({ en: 'Enter your PIN', th: 'กรอก PIN ของคุณ' })}</p>
				<div class="mt-3 flex justify-center gap-2">
					{#each [0, 1, 2, 3] as d (d)}<span class="h-3 w-3 rounded-full {d < 2 ? 'bg-tnb-blue' : 'bg-tnb-line'}"></span>{/each}
				</div>
				<div class="mx-auto mt-4 grid max-w-56 grid-cols-3 gap-2">
					{#each ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'] as k, i (i)}
						<span class="flex h-11 items-center justify-center rounded-xl text-lg font-semibold {k ? 'bg-tnb-wash text-tnb-ink' : ''}">{k}</span>
					{/each}
				</div>
			</div>
			<div class="absolute -right-2 -bottom-8 w-36 rounded-[1.6rem] border-[7px] border-tnb-ink bg-white p-2.5 shadow-xl sm:-right-12">
				<p class="text-[10px] font-semibold text-tnb-ink">{t({ en: 'Approvals', th: 'รออนุมัติ' })}</p>
				{#each [{ c: 'bg-blue-500', l: 'PR-0144' }, { c: 'bg-violet-500', l: '🌴 2d' }, { c: 'bg-blue-500', l: 'PO-0154' }] as r (r.l)}
					<div class="mt-1.5 flex items-center gap-1.5 rounded-md bg-slate-50 px-1.5 py-1 text-[9px]">
						<span class="h-2 w-2 rounded-full {r.c}"></span><span class="flex-1 text-tnb-ink">{r.l}</span><span class="font-bold text-emerald-600">✓</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ───────────────────── Real numbers ───────────────────── -->
<section class="bg-tnb-wash">
	<div class="container mx-auto px-4 py-16">
		<div class="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
			{#each realStats as s (s.value)}
				<div>
					<!-- countUp only parses a single number; "5 + 3" stays static. -->
					{#if /^[\d,]+\+?$/.test(s.value)}
						<p class="text-4xl font-bold text-tnb-blue-deep tabular-nums" use:countUp>{s.value}</p>
					{:else}
						<p class="text-4xl font-bold text-tnb-blue-deep tabular-nums">{s.value}</p>
					{/if}
					<p class="mt-1.5 text-sm text-tnb-ink-soft">{t(s.label)}</p>
				</div>
			{/each}
		</div>
		<p class="mt-8 text-center text-xs text-tnb-ink-soft">{t({ en: 'Real counts from live customer workspaces, October 2026.', th: 'ตัวเลขจริงจากระบบลูกค้าที่ใช้งานอยู่ ตุลาคม 2569' })}</p>
	</div>
</section>

<!-- ───────────────────── FAQ ───────────────────── -->
<section class="bg-white">
	<div class="container mx-auto max-w-3xl px-4 py-20">
		<h2 class="section-title">{m.mkt_faq_title()}</h2>
		<div class="mt-10 space-y-3">
			{#each faqs as f (f.q)}
				<details class="group rounded-xl border border-tnb-line bg-white p-5 open:border-tnb-blue/40 open:bg-tnb-wash/40">
					<summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-tnb-ink marker:content-none">
						{f.q()}<span class="text-xl leading-none text-tnb-blue transition group-open:rotate-45" aria-hidden="true">+</span>
					</summary>
					<p class="mt-3 leading-relaxed text-tnb-ink-soft">{f.a()}</p>
				</details>
			{/each}
		</div>
		<p class="mt-7 text-center">
			<a href={localePath(locale, '/faq')} class="font-medium text-tnb-blue hover:underline">{m.mkt_faq_more()}</a>
			<span class="mx-2 text-tnb-line">|</span>
			<a href={localePath(locale, '/compare')} class="font-medium text-tnb-blue hover:underline">{m.mkt_why_cta()}</a>
		</p>
	</div>
</section>

<!-- ───────────────────── Final CTA ───────────────────── -->
<section class="relative overflow-hidden bg-tnb-ink">
	<div aria-hidden="true" class="blueprint-dark pointer-events-none absolute inset-0"></div>
	<div class="relative container mx-auto px-4 py-20 text-center">
		<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">{m.mkt_cta_title()}</h2>
		<p class="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">{m.mkt_cta_subtitle()}</p>
		<div class="mt-9 flex flex-wrap items-center justify-center gap-4">
			<a href={localePath(locale, '/pricing')} class="btn-amber">{m.mkt_cta_primary()}</a>
			<a href={localePath(locale, '/docs')} class="inline-flex items-center rounded-lg border-2 border-white/25 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10">{m.mkt_cta_secondary()}</a>
		</div>
	</div>
</section>

<style>
	.blueprint {
		background-image:
			linear-gradient(rgba(46, 92, 230, 0.07) 1px, transparent 1px),
			linear-gradient(90deg, rgba(46, 92, 230, 0.07) 1px, transparent 1px);
		background-size: 32px 32px;
		mask-image: radial-gradient(ellipse at 50% 0%, #000 40%, transparent 80%);
	}
	.blueprint-dark {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
		background-size: 32px 32px;
		mask-image: radial-gradient(ellipse at 50% 100%, #000 30%, transparent 75%);
	}
	.btn-amber {
		display: inline-flex;
		align-items: center;
		border-radius: 0.5rem;
		background: var(--color-tnb-amber);
		padding: 0.875rem 1.75rem;
		font-weight: 600;
		color: var(--color-tnb-ink);
		box-shadow: 0 2px 0 0 var(--color-tnb-amber-deep);
		transition: transform 0.15s;
	}
	.btn-amber:hover {
		transform: translateY(-2px);
	}
	.section-title {
		text-align: center;
		font-size: 1.875rem;
		line-height: 1.25;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--color-tnb-ink);
		text-wrap: balance;
	}
	@media (min-width: 640px) {
		.section-title {
			font-size: 2.25rem;
		}
	}
	.section-lede {
		margin: 1rem auto 0;
		max-width: 42rem;
		text-align: center;
		line-height: 1.65;
		color: var(--color-tnb-ink-soft);
	}
	.word {
		animation: word-in 0.45s ease-out;
	}
	.fade-in {
		animation: fade-in 0.4s ease-out;
	}
	.progress {
		animation: progress 6.5s linear forwards;
	}
	@keyframes word-in {
		from { opacity: 0; transform: translateY(0.35em); }
		to { opacity: 1; transform: none; }
	}
	@keyframes fade-in {
		from { opacity: 0.2; transform: translateY(6px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes progress {
		from { width: 0; }
		to { width: 100%; }
	}
	@media (prefers-reduced-motion: reduce) {
		.word, .fade-in, .progress { animation: none; }
	}
</style>
