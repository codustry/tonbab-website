<script lang="ts">
	/**
	 * /ai — Tonbab AI. Built-in AI ("Tonbab AI" — never name the AI vendor in
	 * customer copy, owner 2026-11-19) is the main story; connecting your own
	 * assistant over MCP is the optional second half. Third-party assistant
	 * marks go through AssistantMark (brand rules documented there). All copy lives in $lib/marketing/ai-data.ts, which
	 * also documents where each claim was verified.
	 */
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import type { Bi } from '$lib/marketing/compare-data';
	import { ENTITY, PLAN_FACTS } from '$lib/seo/site';
	import FeatureVisual from '$lib/components/www/FeatureVisual.svelte';
	import CtaBand from '$lib/components/www/CtaBand.svelte';
	import AssistantMark from '$lib/components/www/AssistantMark.svelte';
	import {
		MCP_URL, MCP_TOOL_TOTAL, MCP_DRAFT_TOTAL, aiFaq, aiSafety, assistants, builtInLive, builtInSoon, examplePrompts, mcpCoverage
	} from '$lib/marketing/ai-data';
	import {
		ArrowRight, Check, Cloud, EyeOff, Building2, UserCheck, FilePen, RotateCcw, Sparkles, MessageSquare, Wrench,
		ExternalLink, Clock
	} from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	const t = $derived.by(() => (b: Bi) => (locale === 'th' ? b.th : b.en));

	const SAFETY_ICON: Record<string, typeof Cloud> = {
		infrastructure: Cloud, logging: EyeOff, tenant: Building2, permissions: UserCheck, drafts: FilePen, refund: RotateCcw
	};

	let guide = $state(0);
	const activeGuide = $derived(assistants[guide]);
</script>

<!-- ───────────────────────── Hero ───────────────────────── -->
<section class="relative overflow-hidden bg-tnb-paper">
	<div aria-hidden="true" class="blueprint pointer-events-none absolute inset-0"></div>
	<div class="relative container mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-16 sm:pt-24 lg:grid-cols-[1fr_24rem]">
		<div class="min-w-0">
			<p class="inline-flex items-center gap-1.5 rounded-full border border-violet-300 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">✦ Tonbab AI</p>
			<h1 class="mt-5 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight text-balance text-tnb-ink sm:text-6xl">
				{t({ en: 'AI built into your daily work — no extra AI subscription', th: 'AI ที่อยู่ในงานประจำวัน ไม่ต้องสมัคร AI เพิ่ม' })}
			</h1>
			<p class="mt-5 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">
				{t({
					en: 'Scan receipts into expense claims and bills, count stock from a photo — with Tonbab AI, built in and included in your plan as monthly AI credits. Prefer your own assistant? Connect Claude, ChatGPT or Gemini CLI too.',
					th: 'สแกนใบเสร็จเข้าเบิกค่าใช้จ่ายและบิลซื้อ นับของจากรูปถ่าย ด้วย Tonbab AI ที่อยู่ในระบบและมาพร้อมแพ็กเกจเป็นเครดิต AI รายเดือน อยากใช้ผู้ช่วยของคุณเองก็เชื่อม Claude, ChatGPT หรือ Gemini CLI ได้ด้วย'
				})}
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href={ENTITY.signupUrl} class="btn-primary px-5 py-2.5">{m.mkt_start_free()}</a>
				<a href="#built-in" class="btn-soft px-5 py-2.5">{t({ en: 'See it work', th: 'ดูการทำงาน' })}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
			</div>
			<ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-tnb-ink-soft">
				{#each [
					{ en: 'Tonbab AI, built in', th: 'Tonbab AI อยู่ในระบบ' },
					{ en: 'Included in every plan', th: 'รวมในทุกแพ็กเกจ' },
					{ en: 'Always a draft you check', th: 'เป็นฉบับร่างให้คุณตรวจเสมอ' }
				] as c (c.en)}
					<li class="inline-flex items-center gap-1.5"><Check class="h-4 w-4" aria-hidden="true" />{t(c)}</li>
				{/each}
			</ul>
		</div>

		<!-- What's live today, at a glance -->
		<div class="min-w-0 rounded-2xl bg-white p-5 ring-1 ring-tnb-hair shadow-[0_14px_34px_-18px_rgba(23,22,28,0.25)]">
			<p class="text-xs font-semibold tracking-wider text-tnb-ink-soft uppercase">{t({ en: 'Live in Tonbab today', th: 'ใช้ได้ใน Tonbab วันนี้' })}</p>
			<ul class="mt-3 divide-y divide-tnb-hair">
				{#each builtInLive as f (f.key)}
					<li class="flex items-start justify-between gap-3 py-3">
						<div class="min-w-0">
							<p class="font-semibold leading-snug text-tnb-ink">{t(f.title)}</p>
							<p class="mt-0.5 text-[13px] text-tnb-ink-soft">{t(f.where)}</p>
						</div>
						<span class="inline-flex shrink-0 items-center gap-1 rounded-full border border-violet-300 bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">✦ AI<span class="font-normal opacity-80">· {t(f.credits)}</span></span>
					</li>
				{/each}
				<li class="flex items-start justify-between gap-3 py-3">
					<div class="min-w-0">
						<p class="font-semibold leading-snug text-tnb-ink">{t({ en: 'Your own AI assistant (MCP)', th: 'ผู้ช่วย AI ของคุณเอง (MCP)' })}</p>
						<p class="mt-1.5 text-[12px] text-tnb-ink-soft">{t({ en: 'Works with', th: 'ใช้ได้กับ' })}</p>
							<ul class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium text-tnb-ink">
								{#each assistants as a (a.key)}<li><AssistantMark key={a.key} size="sm" /></li>{/each}
							</ul>
					</div>
					<span class="shrink-0 rounded-full bg-tnb-mist px-2 py-0.5 text-[11px] font-semibold text-tnb-ink-soft">{t({ en: 'no AI credits', th: 'ไม่ใช้เครดิต AI' })}</span>
				</li>
			</ul>
		</div>
	</div>
</section>

<!-- ───────────────────── Built-in AI, live ───────────────────── -->
<section id="built-in" class="scroll-mt-20 bg-white">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="text-sm font-semibold tracking-wider text-tnb-blue uppercase">{t({ en: 'Built-in AI · live now', th: 'AI ในตัว · ใช้ได้แล้ววันนี้' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance text-tnb-ink sm:text-4xl">{t({ en: 'Less retyping, fewer counting sheets', th: 'พิมพ์ซ้ำน้อยลง นับมือน้อยลง' })}</h2>
		<p class="mt-4 max-w-2xl leading-relaxed text-tnb-ink-soft">
			{t({
				en: 'AI does the tedious first pass; a person checks and decides. Every AI feature carries the ✦ AI mark and shows its credit cost before you tap.',
				th: 'AI ทำรอบแรกที่น่าเบื่อให้ คนเป็นผู้ตรวจและตัดสินใจ ทุกฟีเจอร์ AI มีเครื่องหมาย ✦ AI และบอกจำนวนเครดิตก่อนกด'
			})}
		</p>
		<div class="mt-10 grid gap-6 lg:grid-cols-2">
			{#each builtInLive as f (f.key)}
				<article class="flex min-w-0 flex-col rounded-2xl bg-tnb-mist p-5 sm:p-6">
					<FeatureVisual visual={f.key === 'receipt' ? 'receipt' : 'aicount'} {locale} />
					<h3 class="mt-5 text-xl font-semibold text-tnb-ink">{t(f.title)}</h3>
					<p class="mt-2 flex-1 text-[15px] leading-relaxed text-tnb-ink-soft">{t(f.body)}</p>
					<dl class="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
						<div><dt class="inline text-tnb-ink-soft">{t({ en: 'Cost:', th: 'ใช้:' })}</dt> <dd class="inline font-medium text-tnb-ink">{t(f.credits)}</dd></div>
						<div><dt class="inline text-tnb-ink-soft">{t({ en: 'Where:', th: 'อยู่ที่:' })}</dt> <dd class="inline font-medium text-tnb-ink">{t(f.where)}</dd></div>
					</dl>
					{#if f.href}
						<a href={localePath(locale, f.href)} class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-tnb-blue hover:underline">{t({ en: 'How it works', th: 'ดูวิธีทำงาน' })}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ───────────────────── Coming soon ───────────────────── -->
<section class="bg-tnb-mist">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="flex items-center gap-2 text-sm font-semibold tracking-wider text-tnb-ink-soft uppercase"><Clock class="h-4 w-4" aria-hidden="true" />{t({ en: 'Coming soon', th: 'เร็ว ๆ นี้' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance text-tnb-ink sm:text-4xl">{t({ en: 'Next on the same AI backbone', th: 'ต่อไปบน AI ชุดเดียวกัน' })}</h2>
		<p class="mt-4 max-w-2xl leading-relaxed text-tnb-ink-soft">{t({ en: 'In development, with the same rules: Tonbab AI, within your permissions, drafts only. No dates until they ship.', th: 'กำลังพัฒนา ด้วยกติกาเดียวกัน: ใช้ Tonbab AI ไม่เกินสิทธิ์ของคุณ และเป็นฉบับร่างเท่านั้น จะบอกวันเปิดเมื่อพร้อมใช้จริง' })}</p>
		<ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each builtInSoon as s (s.key)}
				<li class="flex min-w-0 flex-col rounded-2xl bg-white p-6 ring-1 ring-tnb-hair">
					<div class="flex flex-wrap items-center gap-2">
						<span class="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700 ring-1 ring-sky-200">{t({ en: 'Coming soon', th: 'เร็ว ๆ นี้' })}</span>
						<span class="text-xs font-medium text-tnb-ink-soft">{t(s.module)}</span>
					</div>
					<h3 class="mt-3 font-semibold leading-snug text-tnb-ink">{t(s.title)}</h3>
					<p class="mt-1.5 text-[15px] leading-relaxed text-tnb-ink-soft">{t(s.body)}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ───────────────────── Privacy & safety ───────────────────── -->
<section class="bg-tnb-ink">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="text-sm font-semibold tracking-wider text-tnb-amber uppercase">{t({ en: 'Privacy & safety', th: 'ความเป็นส่วนตัวและความปลอดภัย' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">{t({ en: 'Helpful AI, on a short leash', th: 'AI ที่ช่วยงาน ภายใต้กติกาที่ชัดเจน' })}</h2>
		<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each aiSafety as p (p.key)}
				{@const Icon = SAFETY_ICON[p.key] ?? Sparkles}
				<div class="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
					<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-tnb-amber/15 text-tnb-amber"><Icon class="h-5 w-5" aria-hidden="true" /></span>
					<h3 class="mt-4 font-semibold text-white">{t(p.title)}</h3>
					<p class="mt-1.5 text-[15px] leading-relaxed text-white/70">{t(p.body)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ───────────────────── AI credits ───────────────────── -->
<section id="credits" class="scroll-mt-20 bg-white">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="text-sm font-semibold tracking-wider text-tnb-ink-soft uppercase">{t({ en: 'AI credits', th: 'เครดิต AI' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance text-tnb-ink sm:text-4xl">{t({ en: 'Monthly AI credits on every plan', th: 'ทุกแพ็กเกจได้เครดิต AI ทุกเดือน' })}</h2>
		<p class="mt-4 max-w-2xl leading-relaxed text-tnb-ink-soft">
			{t({
				en: 'Most AI actions use 1 credit and heavier ones more: a receipt scan is 1, an AI Count photo is 1, or 2 for a dense pile. Failed runs are refunded, and credits reset every month on Bangkok time.',
				th: 'งาน AI ส่วนใหญ่ใช้ 1 เครดิต งานที่หนักกว่าใช้มากกว่านั้น: สแกนใบเสร็จ 1 เครดิต AI Count 1 เครดิตต่อรูป หรือ 2 เครดิตถ้ากองแน่นมาก ทำไม่สำเร็จคืนเครดิตให้ และเริ่มนับใหม่ทุกเดือนตามเวลาประเทศไทย'
			})}
		</p>
		<ul class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
			{#each PLAN_FACTS as p (p.code)}
				<li class="rounded-2xl bg-tnb-mist p-5 ring-1 ring-tnb-hair">
					<p class="text-sm font-semibold text-tnb-ink">{p.name}</p>
					<p class="mt-2 text-3xl font-bold text-tnb-blue-deep tabular-nums">{p.aiCredits.toLocaleString('en-US')}</p>
					<p class="mt-0.5 text-[13px] text-tnb-ink-soft">{t({ en: 'credits / month', th: 'เครดิต / เดือน' })}</p>
				</li>
			{/each}
		</ul>
		<p class="mt-6 text-sm text-tnb-ink-soft">{t({ en: 'Connecting your own assistant (below) doesn’t use AI credits.', th: 'การเชื่อมผู้ช่วย AI ของคุณเอง (ด้านล่าง) ไม่ใช้เครดิต AI' })}</p>
		<a href={localePath(locale, '/pricing')} class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-tnb-blue hover:underline">{m.mod_cta_pricing()}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
	</div>
</section>

<!-- ───────────────────── Your own assistant (optional) ───────────────────── -->
<section id="assistants" class="scroll-mt-20 bg-tnb-mist">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="flex items-center gap-2 text-sm font-semibold tracking-wider text-tnb-ink-soft uppercase"><MessageSquare class="h-4 w-4" aria-hidden="true" />{t({ en: 'Optional · your own assistant', th: 'ทางเลือกเสริม · ผู้ช่วยของคุณเอง' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance text-tnb-ink sm:text-4xl">{t({ en: 'Use Tonbab from the AI you already use', th: 'ใช้ Tonbab ผ่าน AI ที่คุณใช้อยู่' })}</h2>
		<p class="mt-4 max-w-2xl leading-relaxed text-tnb-ink-soft">
			{t({
				en: 'Tonbab has an MCP server, the open standard AI assistants use to reach other apps. Connect it to your own assistant account and ask about sales, receivables, profit, stock, purchasing, CRM, leave, service jobs and docs in plain Thai or English — across every company you tick when you connect. It sees only what your role allows, and anything it creates is a draft. It doesn’t use Tonbab AI credits; data calls count toward your plan’s API quota.',
				th: 'Tonbab มี MCP server ซึ่งเป็นมาตรฐานเปิดที่ผู้ช่วย AI ใช้เชื่อมกับแอปอื่น เชื่อมกับบัญชีผู้ช่วย AI ของคุณเอง แล้วถามเรื่องยอดขาย ลูกหนี้ กำไรขาดทุน สต็อก จัดซื้อ CRM วันลา งานบริการ และเอกสารด้วยภาษาไทยหรืออังกฤษ ได้ทุกบริษัทที่คุณติ๊กตอนเชื่อมต่อ ผู้ช่วยเห็นเท่าที่บทบาทของคุณเห็น และสิ่งที่สร้างเป็นฉบับร่างเสมอ ไม่ใช้เครดิต AI ของ Tonbab การดึงข้อมูลนับตามโควตา API ของแพ็กเกจ'
			})}
		</p>
		<p class="mt-5 flex flex-wrap items-center gap-2 text-sm">
			<span class="text-tnb-ink-soft">{t({ en: 'Works with', th: 'ใช้ได้กับ' })}</span>
			{#each assistants as a (a.key)}
				<span class="inline-flex h-8 items-center rounded-full bg-white px-3 font-medium text-tnb-ink ring-1 ring-tnb-hair"><AssistantMark key={a.key} /></span>
			{/each}
		</p>

		<!-- Tool coverage by area — counts come from the app's operation registry -->
		<h3 class="mt-12 text-lg font-semibold text-tnb-ink">{t({ en: 'What it can reach', th: 'เข้าถึงอะไรได้บ้าง' })}</h3>
		<p class="mt-1 text-sm text-tnb-ink-soft">
			{t({
				en: `${MCP_TOOL_TOTAL} tools: ${MCP_TOOL_TOTAL - MCP_DRAFT_TOTAL} that read and ${MCP_DRAFT_TOTAL} that create drafts. Each area appears only if the module is on and your role can open it.`,
				th: `${MCP_TOOL_TOTAL} เครื่องมือ: อ่านข้อมูล ${MCP_TOOL_TOTAL - MCP_DRAFT_TOTAL} ตัว และสร้างฉบับร่าง ${MCP_DRAFT_TOTAL} ตัว แต่ละหมวดจะใช้ได้เมื่อเปิดโมดูลนั้นและบทบาทของคุณเปิดดูได้`
			})}
		</p>
		<ul class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each mcpCoverage as c (c.key)}
				<li class="min-w-0 rounded-2xl bg-white p-5 ring-1 ring-tnb-hair">
					<p class="flex items-baseline justify-between gap-3">
						<span class="font-semibold text-tnb-ink">{t(c.area)}</span>
						<span class="shrink-0 text-xs text-tnb-ink-soft tabular-nums">{c.tools} {t({ en: c.tools === 1 ? 'tool' : 'tools', th: 'เครื่องมือ' })}</span>
					</p>
					<p class="mt-1.5 text-[14px] leading-relaxed text-tnb-ink-soft">{t(c.reads)}</p>
					{#if c.drafts}<p class="mt-2 text-[13px] text-tnb-ink-soft"><span class="font-medium text-tnb-ink">{t({ en: 'Drafts:', th: 'ฉบับร่าง:' })}</span> {t(c.drafts)}</p>{/if}
				</li>
			{/each}
		</ul>

		<!-- Example prompts, with the Tonbab tools behind each answer -->
		<h3 class="mt-12 text-lg font-semibold text-tnb-ink">{t({ en: 'Things you can ask', th: 'ตัวอย่างคำถาม' })}</h3>
		<ul class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each examplePrompts as p (p.prompt.en)}
				<li class="flex min-w-0 flex-col rounded-2xl bg-white p-5 ring-1 ring-tnb-hair">
					<p class="w-fit max-w-full rounded-2xl rounded-br-sm bg-tnb-blue px-3.5 py-2 text-[15px] leading-snug text-white">{t(p.prompt)}</p>
					<div class="mt-4 flex flex-wrap items-center gap-1.5">
						<Wrench class="h-3.5 w-3.5 text-tnb-ink-soft" aria-hidden="true" />
						<span class="sr-only">{t({ en: 'Tonbab tools used:', th: 'เครื่องมือ Tonbab ที่ใช้:' })}</span>
						{#each p.tools as tool (tool)}<code class="rounded bg-tnb-mist px-1.5 py-0.5 font-mono text-[11.5px] text-tnb-ink-soft">{tool}</code>{/each}
					</div>
					{#if p.multiCompany}<p class="mt-2 text-[13px] text-tnb-ink-soft">{t({ en: 'company: "all" — one answer per company you ticked, never added together', th: 'company: "all" — ตอบแยกทีละบริษัทที่คุณติ๊กไว้ ไม่รวมยอดข้ามบริษัท' })}</p>{/if}
					{#if p.draft}<p class="mt-2 text-[13px] text-tnb-ink-soft">{t({ en: 'Creates a draft for you to submit · Starter and up', th: 'สร้างเป็นฉบับร่างให้คุณกดส่ง · ตั้งแต่ Starter' })}</p>{/if}
				</li>
			{/each}
		</ul>

		<!-- Connect guide, one tab per assistant -->
		<h3 class="mt-12 text-lg font-semibold text-tnb-ink">{t({ en: 'Connect in three steps', th: 'เชื่อมต่อใน 3 ขั้นตอน' })}</h3>
		<div class="mt-4 rounded-2xl bg-white p-5 ring-1 ring-tnb-hair sm:p-6">
			<div role="tablist" aria-label={t({ en: 'Assistant', th: 'ผู้ช่วย AI' })} class="flex flex-wrap gap-2">
				{#each assistants as a, i (a.key)}
					<button
						type="button"
						role="tab"
						aria-selected={guide === i}
						onclick={() => (guide = i)}
						class="inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold transition {guide === i ? 'bg-tnb-ink text-white' : 'bg-tnb-mist text-tnb-ink-soft hover:text-tnb-ink'}"
					><AssistantMark key={a.key} tone={guide === i ? 'dark' : 'light'} /></button>
				{/each}
			</div>
			<div role="tabpanel" class="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
				<div class="min-w-0">
					<p class="flex flex-wrap items-center gap-x-3 gap-y-1">
						<span class="text-base font-semibold text-tnb-ink"><AssistantMark key={activeGuide.key} /></span>
						<span class="text-sm text-tnb-ink-soft">{t(activeGuide.where)}</span>
					</p>
					<ol class="mt-3 space-y-3">
						{#each activeGuide.steps as s, i (i)}
							<li class="flex gap-3">
								<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tnb-blue text-sm font-bold text-white">{i + 1}</span>
								<span class="pt-0.5 text-[15px] leading-relaxed text-tnb-ink">{t(s)}</span>
							</li>
						{/each}
					</ol>
					{#if activeGuide.code}
						<pre class="mt-4 overflow-x-auto rounded-xl bg-tnb-ink p-3.5 text-[12.5px] leading-relaxed text-white"><code>{activeGuide.code}</code></pre>
					{/if}
				</div>
				<div class="min-w-0 rounded-xl bg-tnb-mist p-4 text-[14px] leading-relaxed text-tnb-ink-soft">
					<p>{t(activeGuide.note)}</p>
					<a href={activeGuide.doc} rel="noopener" class="mt-3 inline-flex items-center gap-1 font-semibold text-tnb-blue hover:underline">{t({ en: `${activeGuide.name} docs`, th: `เอกสารของ ${activeGuide.name}` })}<ExternalLink class="h-3.5 w-3.5" aria-hidden="true" /></a>
				</div>
			</div>
		</div>
		<p class="mt-4 text-sm leading-relaxed text-tnb-ink-soft">
			{t({
				en: 'Other apps that let you add a remote MCP server by URL with OAuth sign-in connect the same way. An admin can switch AI connectors off for the whole company in Settings › API & connectors.',
				th: 'แอปอื่นที่เพิ่ม MCP server ด้วย URL และเข้าสู่ระบบแบบ OAuth ได้ ก็เชื่อมต่อแบบเดียวกัน ผู้ดูแลระบบปิดการเชื่อมต่อ AI ทั้งบริษัทได้ที่ ตั้งค่า › API และการเชื่อมต่อ'
			})}
		</p>
		<div class="mt-8 flex flex-wrap gap-3">
			<a href={localePath(locale, '/connect/claude')} class="btn-primary px-5 py-2.5">{t({ en: 'Connect Tonbab to Claude', th: 'เชื่อมต่อ Tonbab กับ Claude' })}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
			<a href={localePath(locale, '/developers')} class="btn-soft px-5 py-2.5">{t({ en: 'Developers & AI connector', th: 'นักพัฒนาและตัวเชื่อม AI' })}</a>
			<a href={localePath(locale, '/docs/api/api-and-mcp-quickstart')} class="btn-ghost">{t({ en: 'Step-by-step guide', th: 'คู่มือทีละขั้น' })}</a>
			<a href="https://api.tonbab.com/docs" class="btn-ghost">{t({ en: 'API reference', th: 'เอกสาร API' })} ↗</a>
		</div>
		<p class="mt-4 font-mono text-xs text-tnb-ink-soft">{MCP_URL}</p>
	</div>
</section>

<!-- ───────────────────── FAQ ───────────────────── -->
<section class="bg-white">
	<div class="container mx-auto max-w-3xl px-4 py-20">
		<h2 class="text-center text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{t({ en: 'Questions about AI in Tonbab', th: 'คำถามเรื่อง AI ใน Tonbab' })}</h2>
		<div class="mt-10 space-y-3">
			{#each aiFaq as f (f.q.en)}
				<details class="group rounded-xl border border-tnb-line bg-white p-5 open:border-tnb-blue/40 open:bg-tnb-wash/40">
					<summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-tnb-ink marker:content-none">
						{t(f.q)}<span class="text-xl leading-none text-tnb-blue transition group-open:rotate-45" aria-hidden="true">+</span>
					</summary>
					<p class="mt-3 leading-relaxed text-tnb-ink-soft">{t(f.a)}</p>
				</details>
			{/each}
		</div>
		<!-- Trademark notice for the third-party assistant names and marks above. -->
		<p class="mt-10 text-center text-xs leading-relaxed text-tnb-ink-soft">
			{t({
				en: 'Claude, Claude Code, ChatGPT, OpenAI, Gemini and Gemini CLI are trademarks of their respective owners. Tonbab is not affiliated with or endorsed by these companies; the names and logos only show which assistants can connect to Tonbab.',
				th: 'Claude, Claude Code, ChatGPT, OpenAI, Gemini และ Gemini CLI เป็นเครื่องหมายการค้าของเจ้าของแต่ละราย Tonbab ไม่ได้มีความเกี่ยวข้องหรือได้รับการรับรองจากบริษัทเหล่านี้ ชื่อและโลโก้ใช้เพื่อบอกว่าผู้ช่วย AI ตัวไหนเชื่อมต่อกับ Tonbab ได้เท่านั้น'
			})}
		</p>
	</div>
</section>

<CtaBand {locale} />

<style>
	.blueprint {
		background-image:
			linear-gradient(rgba(46, 92, 230, 0.07) 1px, transparent 1px),
			linear-gradient(90deg, rgba(46, 92, 230, 0.07) 1px, transparent 1px);
		background-size: 32px 32px;
		mask-image: radial-gradient(ellipse at 30% 0%, #000 40%, transparent 80%);
	}
</style>
