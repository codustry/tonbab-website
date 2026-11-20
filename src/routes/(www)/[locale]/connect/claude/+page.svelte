<script lang="ts">
	/**
	 * /connect/claude — landing page for Tonbab in the Claude Connectors
	 * Directory. All copy (and the CLAUDE_DIRECTORY_URL switch) lives in
	 * $lib/marketing/connect-claude-data.ts, which documents where each claim
	 * was verified. Claude is named as plain text only (no logo: Anthropic's
	 * trademark guidelines — see AssistantMark). The built-in assistant is
	 * "Tonbab AI"; never name the AI vendor behind it.
	 */
	import { localePath, toLocale } from '$lib/i18n';
	import type { Bi } from '$lib/marketing/compare-data';
	import { ENTITY } from '$lib/seo/site';
	import CtaBand from '$lib/components/www/CtaBand.svelte';
	import {
		CLAUDE_DIRECTORY_URL, CLAUDE_LISTED, CLAUDE_CONNECTORS_SETTINGS, CLAUDE_CUSTOM_CONNECTOR_HELP, MCP_URL,
		claudeExamples, claudeFaq, claudeOrgNote, claudeSecurity, claudeSteps
	} from '$lib/marketing/connect-claude-data';
	import {
		ArrowRight, Check, ExternalLink, UserCheck, Building2, FilePen, Unplug, Wrench, Users, BookOpen, ShieldCheck
	} from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	const t = $derived.by(() => (b: Bi) => (locale === 'th' ? b.th : b.en));

	const steps = claudeSteps(CLAUDE_LISTED);
	const SECURITY_ICON: Record<string, typeof UserCheck> = {
		'as-you': UserCheck, companies: Building2, drafts: FilePen, revoke: Unplug
	};

	/** "Add to Claude": the directory listing once live, else the custom-connector steps below. */
	const addHref = CLAUDE_LISTED ? CLAUDE_DIRECTORY_URL : '#connect';
</script>

<!-- ───────────────────────── Hero ───────────────────────── -->
<section class="relative overflow-hidden bg-tnb-paper">
	<div aria-hidden="true" class="blueprint pointer-events-none absolute inset-0"></div>
	<div class="relative container mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-16 sm:pt-24 lg:grid-cols-[1fr_24rem]">
		<div class="min-w-0">
			<p class="inline-flex items-center gap-1.5 rounded-full border border-tnb-hair bg-white px-3 py-1 text-sm font-semibold text-tnb-ink">
				{t({ en: 'Claude connector', th: 'ตัวเชื่อมสำหรับ Claude' })}
			</p>
			<h1 class="mt-5 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight text-balance text-tnb-ink sm:text-6xl">
				{t({ en: 'Connect Tonbab to Claude', th: 'เชื่อมต่อ Tonbab กับ Claude' })}
			</h1>
			<p class="mt-5 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">
				{t({
					en: 'Ask Claude about your deals, receivables, stock, purchase orders and leave in plain Thai or English — and let it prepare drafts for you to check in Tonbab. It works within your own permissions, only in the companies you choose.',
					th: 'ถาม Claude เรื่องดีล ลูกหนี้ สต็อก ใบสั่งซื้อ และวันลา ด้วยภาษาไทยหรืออังกฤษได้เลย แล้วให้ Claude เตรียมฉบับร่างไว้ให้คุณตรวจใน Tonbab ทำงานภายใต้สิทธิ์ของคุณ และเฉพาะบริษัทที่คุณเลือก'
				})}
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a
					href={addHref}
					class="btn-primary px-5 py-2.5"
					rel={CLAUDE_LISTED ? 'noopener' : undefined}
				>{t({ en: 'Add to Claude', th: 'เพิ่มใน Claude' })}{#if CLAUDE_LISTED}<ExternalLink class="h-4 w-4" aria-hidden="true" />{:else}<ArrowRight class="h-4 w-4" aria-hidden="true" />{/if}</a>
				<a href={ENTITY.signupUrl} class="btn-soft px-5 py-2.5">{t({ en: 'No Tonbab account? Start free', th: 'ยังไม่มีบัญชี Tonbab? เริ่มใช้ฟรี' })}</a>
			</div>
			{#if !CLAUDE_LISTED}
				<p class="mt-4 max-w-2xl text-sm text-tnb-ink-soft">
					{t({
						en: 'Tonbab connects to Claude as a custom connector today — it takes about a minute with the steps below.',
						th: 'ตอนนี้เชื่อม Tonbab กับ Claude แบบตัวเชื่อมที่กำหนดเอง (custom connector) ได้ ใช้เวลาประมาณ 1 นาทีตามขั้นตอนด้านล่าง'
					})}
				</p>
			{/if}
			<ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-tnb-ink-soft">
				{#each [
					{ en: 'Acts with your Tonbab permissions', th: 'ใช้สิทธิ์ Tonbab ของคุณ' },
					{ en: 'Drafts only — a person confirms', th: 'ฉบับร่างเท่านั้น คนเป็นผู้ยืนยัน' },
					{ en: 'Every plan, Free included', th: 'ทุกแพ็กเกจ รวม Free' }
				] as c (c.en)}
					<li class="inline-flex items-center gap-1.5"><Check class="h-4 w-4" aria-hidden="true" />{t(c)}</li>
				{/each}
			</ul>
		</div>

		<!-- A sample exchange -->
		<div class="min-w-0 rounded-2xl bg-white p-5 ring-1 ring-tnb-hair shadow-[0_14px_34px_-18px_rgba(23,22,28,0.25)]">
			<p class="text-xs font-semibold tracking-wider text-tnb-ink-soft uppercase">{t({ en: 'In Claude', th: 'ใน Claude' })}</p>
			<p class="mt-3 ml-auto w-fit max-w-full rounded-2xl rounded-br-sm bg-tnb-blue px-3.5 py-2 text-[15px] leading-snug text-white">
				{t({ en: 'Which customers are more than 30 days overdue?', th: 'ลูกค้าคนไหนค้างจ่ายเกิน 30 วัน' })}
			</p>
			<div class="mt-3 flex flex-wrap items-center gap-1.5">
				<Wrench class="h-3.5 w-3.5 text-tnb-ink-soft" aria-hidden="true" />
				<span class="sr-only">{t({ en: 'Tonbab tool used:', th: 'เครื่องมือ Tonbab ที่ใช้:' })}</span>
				<code class="rounded bg-tnb-mist px-1.5 py-0.5 font-mono text-[11.5px] text-tnb-ink-soft">ar_aging</code>
			</div>
			<p class="mt-3 rounded-2xl rounded-bl-sm bg-tnb-mist px-3.5 py-2.5 text-[14px] leading-relaxed text-tnb-ink">
				{t({
					en: 'Claude reads your receivables aging from Tonbab and answers by customer and age bucket — only if your role can see receivables.',
					th: 'Claude อ่านรายงานลูกหนี้ตามอายุจาก Tonbab แล้วตอบแยกตามลูกค้าและช่วงอายุหนี้ เฉพาะเมื่อบทบาทของคุณดูลูกหนี้ได้'
				})}
			</p>
		</div>
	</div>
</section>

<!-- ───────────────────── What you can do ───────────────────── -->
<section id="examples" class="scroll-mt-20 bg-white">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="text-sm font-semibold tracking-wider text-tnb-blue uppercase">{t({ en: 'What you can do', th: 'ทำอะไรได้บ้าง' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance text-tnb-ink sm:text-4xl">{t({ en: 'Ask about any part of the business', th: 'ถามได้ทุกส่วนของธุรกิจ' })}</h2>
		<p class="mt-4 max-w-2xl leading-relaxed text-tnb-ink-soft">
			{t({
				en: 'A few examples per module. Each one names the Tonbab tools Claude calls behind the answer. An area only works if the module is on and your role can open it.',
				th: 'ตัวอย่างคำถามในแต่ละโมดูล พร้อมชื่อเครื่องมือ Tonbab ที่ Claude เรียกใช้เพื่อตอบ แต่ละหมวดใช้ได้เมื่อเปิดโมดูลนั้นและบทบาทของคุณเปิดดูได้'
			})}
		</p>
		<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each claudeExamples as g (g.key)}
				<article class="flex min-w-0 flex-col rounded-2xl bg-tnb-mist p-5">
					<h3 class="text-lg font-semibold text-tnb-ink">{t(g.module)}</h3>
					<ul class="mt-3 space-y-4">
						{#each g.prompts as p (p.prompt.en)}
							<li class="min-w-0">
								<p class="w-fit max-w-full rounded-2xl rounded-br-sm bg-tnb-blue px-3.5 py-2 text-[15px] leading-snug text-white">{t(p.prompt)}</p>
								<div class="mt-2 flex flex-wrap items-center gap-1.5">
									<Wrench class="h-3.5 w-3.5 text-tnb-ink-soft" aria-hidden="true" />
									<span class="sr-only">{t({ en: 'Tonbab tools used:', th: 'เครื่องมือ Tonbab ที่ใช้:' })}</span>
									{#each p.tools as tool (tool)}<code class="rounded bg-white px-1.5 py-0.5 font-mono text-[11.5px] text-tnb-ink-soft">{tool}</code>{/each}
								</div>
								{#if p.draft}<p class="mt-1.5 text-[13px] text-tnb-ink-soft">{t({ en: 'Creates a draft for you to confirm in Tonbab · Starter and up', th: 'สร้างเป็นฉบับร่างให้คุณยืนยันใน Tonbab · ตั้งแต่ Starter' })}</p>{/if}
							</li>
						{/each}
					</ul>
				</article>
			{/each}
			<article class="flex min-w-0 flex-col justify-between rounded-2xl bg-white p-5 ring-1 ring-tnb-hair">
				<div>
					<h3 class="text-lg font-semibold text-tnb-ink">{t({ en: 'And more', th: 'และอื่น ๆ' })}</h3>
					<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">
						{t({
							en: 'Sales orders, manufacturing, service jobs, Docs pages and more — see everything a connected assistant can reach.',
							th: 'ออเดอร์ขาย การผลิต งานบริการ หน้าเอกสารใน Docs และอื่น ๆ ดูทั้งหมดที่ผู้ช่วย AI เข้าถึงได้'
						})}
					</p>
				</div>
				<a href={localePath(locale, '/ai') + '#assistants'} class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-tnb-blue hover:underline">{t({ en: 'Full tool coverage', th: 'ดูเครื่องมือทั้งหมด' })}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
			</article>
		</div>
	</div>
</section>

<!-- ───────────────────── How to connect ───────────────────── -->
<section id="connect" class="scroll-mt-20 bg-tnb-mist">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="text-sm font-semibold tracking-wider text-tnb-ink-soft uppercase">{t({ en: 'How to connect', th: 'วิธีเชื่อมต่อ' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance text-tnb-ink sm:text-4xl">{t({ en: 'Five steps, about a minute', th: '5 ขั้นตอน ประมาณ 1 นาที' })}</h2>
		<div class="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
			<ol class="min-w-0 space-y-3">
				{#each steps as s, i (i)}
					<li class="flex min-w-0 gap-4 rounded-2xl bg-white p-5 ring-1 ring-tnb-hair">
						<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tnb-blue text-sm font-bold text-white">{i + 1}</span>
						<div class="min-w-0">
							<h3 class="font-semibold text-tnb-ink">{t(s.title)}</h3>
							<p class="mt-1 text-[15px] leading-relaxed text-tnb-ink-soft">{t(s.body)}</p>
							{#if s.code}
								<code class="mt-3 block overflow-x-auto whitespace-nowrap rounded-lg bg-tnb-ink px-3 py-2.5 font-mono text-sm text-white">{s.code}</code>
							{/if}
						</div>
					</li>
				{/each}
			</ol>
			<aside class="min-w-0 space-y-4">
				<div class="rounded-2xl bg-white p-5 ring-1 ring-tnb-hair">
					<h3 class="flex items-center gap-2 font-semibold text-tnb-ink"><Users class="h-4 w-4 text-tnb-ink-soft" aria-hidden="true" />{t({ en: 'Claude Team or Enterprise', th: 'Claude แบบ Team หรือ Enterprise' })}</h3>
					<p class="mt-2 text-[14px] leading-relaxed text-tnb-ink-soft">{t(claudeOrgNote)}</p>
				</div>
				<div class="rounded-2xl bg-white p-5 ring-1 ring-tnb-hair">
					<div class="flex flex-col gap-2">
						{#if CLAUDE_LISTED}
							<a href={CLAUDE_DIRECTORY_URL} rel="noopener" class="btn-primary justify-center px-4 py-2">{t({ en: 'Add to Claude', th: 'เพิ่มใน Claude' })}<ExternalLink class="h-4 w-4" aria-hidden="true" /></a>
						{/if}
						<a href={CLAUDE_CONNECTORS_SETTINGS} rel="noopener" class="{CLAUDE_LISTED ? 'btn-soft' : 'btn-primary'} justify-center px-4 py-2">{t({ en: 'Open Claude connector settings', th: 'เปิดหน้าตั้งค่าตัวเชื่อมของ Claude' })}<ExternalLink class="h-4 w-4" aria-hidden="true" /></a>
					</div>
					<a href={CLAUDE_CUSTOM_CONNECTOR_HELP} rel="noopener" class="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-tnb-blue hover:underline">{t({ en: 'Claude’s guide to custom connectors', th: 'คู่มือตัวเชื่อมแบบกำหนดเองของ Claude' })}<ExternalLink class="h-3.5 w-3.5" aria-hidden="true" /></a>
				</div>
			</aside>
		</div>
	</div>
</section>

<!-- ───────────────────── Security & permissions ───────────────────── -->
<section id="security" class="scroll-mt-20 bg-tnb-ink">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="flex items-center gap-2 text-sm font-semibold tracking-wider text-tnb-amber uppercase"><ShieldCheck class="h-4 w-4" aria-hidden="true" />{t({ en: 'Security & permissions', th: 'ความปลอดภัยและสิทธิ์การเข้าถึง' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">{t({ en: 'Claude gets your access — never more', th: 'Claude ได้สิทธิ์เท่าที่คุณมี ไม่เกินนั้น' })}</h2>
		<div class="mt-10 grid gap-4 sm:grid-cols-2">
			{#each claudeSecurity as p (p.key)}
				{@const Icon = SECURITY_ICON[p.key] ?? ShieldCheck}
				<div class="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
					<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-tnb-amber/15 text-tnb-amber"><Icon class="h-5 w-5" aria-hidden="true" /></span>
					<h3 class="mt-4 font-semibold text-white">{t(p.title)}</h3>
					<p class="mt-1.5 text-[15px] leading-relaxed text-white/70">{t(p.body)}</p>
				</div>
			{/each}
		</div>
		<p class="mt-8 text-[15px] leading-relaxed text-white/70">
			{t({ en: 'How we handle personal data:', th: 'วิธีที่เราดูแลข้อมูลส่วนบุคคล:' })}
			<a href={localePath(locale, '/privacy')} class="font-semibold text-white underline underline-offset-2 hover:text-tnb-amber">{t({ en: 'Privacy Policy', th: 'นโยบายความเป็นส่วนตัว' })}</a>
		</p>
	</div>
</section>

<!-- ───────────────────── FAQ ───────────────────── -->
<section class="bg-white">
	<div class="container mx-auto max-w-3xl px-4 py-20">
		<h2 class="text-center text-3xl font-bold tracking-tight text-tnb-ink sm:text-4xl">{t({ en: 'Questions about Tonbab in Claude', th: 'คำถามเรื่องใช้ Tonbab ใน Claude' })}</h2>
		<div class="mt-10 space-y-3">
			{#each claudeFaq as f (f.q.en)}
				<details class="group rounded-xl border border-tnb-line bg-white p-5 open:border-tnb-blue/40 open:bg-tnb-wash/40">
					<summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-tnb-ink marker:content-none">
						{t(f.q)}<span class="text-xl leading-none text-tnb-blue transition group-open:rotate-45" aria-hidden="true">+</span>
					</summary>
					<p class="mt-3 leading-relaxed text-tnb-ink-soft">{t(f.a)}</p>
				</details>
			{/each}
		</div>
		<div class="mt-10 rounded-2xl bg-tnb-mist p-5 sm:p-6">
			<h3 class="flex items-center gap-2 font-semibold text-tnb-ink"><BookOpen class="h-4 w-4 text-tnb-ink-soft" aria-hidden="true" />{t({ en: 'More detail', th: 'รายละเอียดเพิ่มเติม' })}</h3>
			<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">
				{t({
					en: 'Every tool, the limits per plan, and how to connect ChatGPT, Gemini CLI or Claude Code are in the API & MCP quickstart.',
					th: 'เครื่องมือทั้งหมด โควตาตามแพ็กเกจ และวิธีเชื่อม ChatGPT, Gemini CLI หรือ Claude Code อยู่ในคู่มือเริ่มต้น API และ MCP'
				})}
			</p>
			<div class="mt-4 flex flex-wrap gap-3">
				<a href={localePath(locale, '/docs/api/api-and-mcp-quickstart')} class="btn-soft px-4 py-2">{t({ en: 'API & MCP quickstart', th: 'คู่มือเริ่มต้น API และ MCP' })}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
				<a href={localePath(locale, '/developers')} class="btn-ghost">{t({ en: 'Developers & AI connector', th: 'นักพัฒนาและตัวเชื่อม AI' })}</a>
			</div>
			<p class="mt-4 break-all font-mono text-xs text-tnb-ink-soft">{MCP_URL}</p>
		</div>
		<!-- Trademark notice for the third-party assistant names above. -->
		<p class="mt-10 text-center text-xs leading-relaxed text-tnb-ink-soft">
			{t({
				en: 'Claude, Claude Code, ChatGPT and Gemini CLI are trademarks of their respective owners. Tonbab is not affiliated with or endorsed by these companies; the names only show which assistants can connect to Tonbab.',
				th: 'Claude, Claude Code, ChatGPT และ Gemini CLI เป็นเครื่องหมายการค้าของเจ้าของแต่ละราย Tonbab ไม่ได้มีความเกี่ยวข้องหรือได้รับการรับรองจากบริษัทเหล่านี้ ชื่อใช้เพื่อบอกว่าผู้ช่วย AI ตัวไหนเชื่อมต่อกับ Tonbab ได้เท่านั้น'
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
