<script lang="ts">
	/**
	 * Developers & AI — the public face of the Tonbab API (api.tonbab.com/v1)
	 * and the MCP AI connector (api.tonbab.com/mcp). Endpoint details live in
	 * the API reference (api.tonbab.com/docs) — this page explains, it never
	 * duplicates endpoint docs. Limits mirror the product's plans.ts API_LIMITS.
	 */
	import * as m from '$lib/paraglide/messages';
	import { localePath, toLocale } from '$lib/i18n';
	import type { Bi } from '$lib/marketing/compare-data';
	import {
		ArrowRight, Bot, KeyRound, FlaskConical, Webhook, ListTree, FileCode2, ShieldCheck, FilePen, UserCheck,
		Unplug, Check, Eye, Building2
	} from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived.by(() => toLocale(data.locale));
	const t = $derived.by(() => (b: Bi) => (locale === 'th' ? b.th : b.en));

	const API_DOCS = 'https://api.tonbab.com/docs';
	const MCP_URL = 'https://api.tonbab.com/mcp';

	const steps: { title: Bi; body: Bi; code?: string }[] = [
		{
			title: { en: 'Add Tonbab by URL', th: 'เพิ่ม Tonbab ด้วย URL' },
			body: {
				en: 'In Claude, ChatGPT or Gemini CLI, add a custom connector and paste this address:',
				th: 'ใน Claude, ChatGPT หรือ Gemini CLI เพิ่มตัวเชื่อมแบบกำหนดเอง (custom connector) แล้ววางที่อยู่นี้:'
			},
			code: MCP_URL
		},
		{
			title: { en: 'Sign in and choose', th: 'เข้าสู่ระบบและเลือกสิทธิ์' },
			body: {
				en: 'Sign in with your Tonbab account, pick your default company, tick any other companies it may use, and choose what the assistant may see and do.',
				th: 'เข้าสู่ระบบด้วยบัญชี Tonbab เลือกบริษัทหลัก ติ๊กบริษัทอื่นที่ให้ใช้ได้ (ถ้ามี) แล้วเลือกว่าจะให้ผู้ช่วยเห็นและทำอะไรได้บ้าง'
			}
		},
		{
			title: { en: 'Ask in your own words', th: 'ถามด้วยภาษาของคุณเอง' },
			body: {
				en: '“Which customers are more than 30 days overdue?” · “Profit and loss this month?” · “Draft a purchase request for 200 cartons from our usual supplier.”',
				th: '“ลูกค้าคนไหนค้างจ่ายเกิน 30 วัน” · “กำไรขาดทุนเดือนนี้” · “ร่างใบขอซื้อกล่อง 200 ใบจากผู้ขายเจ้าประจำให้หน่อย”'
			}
		}
	];

	const canRead: Bi[] = [
		{ en: 'Accounting — sales summary, receivables and payables aging, profit and loss, trial balance, invoices, bills, payments', th: 'บัญชี — สรุปยอดขาย ลูกหนี้/เจ้าหนี้ตามอายุ กำไรขาดทุน งบทดลอง ใบแจ้งหนี้ บิลซื้อ รับ-จ่ายเงิน' },
		{ en: 'Products and stock — levels, movements, lots, serials, valuation (cost-gated)', th: 'สินค้าและสต็อก — ยอดคงเหลือ ความเคลื่อนไหว ล็อต ซีเรียล มูลค่า (เฉพาะคนที่เห็นต้นทุน)' },
		{ en: 'Purchasing — PRs, POs, goods receipts', th: 'จัดซื้อ — PR, PO, ใบรับสินค้า' },
		{ en: 'Sales — orders and delivery notes', th: 'งานขาย — ออเดอร์และใบส่งของ' },
		{ en: 'CRM — customers, contacts, deals, activities', th: 'CRM — ลูกค้า ผู้ติดต่อ ดีล กิจกรรม' },
		{ en: 'People — my leave balance, leave requests, expense claims', th: 'บุคลากร — วันลาคงเหลือของฉัน ใบลา ใบเบิกค่าใช้จ่าย' },
		{ en: 'Manufacturing and service — work orders, BOMs, service jobs and schedule', th: 'การผลิตและงานบริการ — ใบสั่งผลิต BOM งานซ่อมบริการและตารางงาน' },
		{ en: 'Docs — search pages, read database rows', th: 'Docs — ค้นหน้าเอกสาร อ่านแถวในฐานข้อมูล' }
	];
	const canDraft: Bi[] = [
		{ en: 'A purchase request (as a draft)', th: 'ใบขอซื้อ (เป็นฉบับร่าง)' },
		{ en: 'A stock count', th: 'ใบตรวจนับสต็อก' },
		{ en: 'A CRM deal or activity', th: 'ดีลหรือกิจกรรมใน CRM' },
		{ en: 'A customer or vendor record', th: 'ข้อมูลลูกค้าหรือผู้ขาย' }
	];
	const guards: { icon: typeof Bot; title: Bi; body: Bi }[] = [
		{
			icon: FilePen,
			title: { en: 'Drafts, not decisions', th: 'สร้างได้แค่ฉบับร่าง' },
			body: {
				en: 'The assistant can prepare drafts. People still approve, post and pay — nothing is submitted for you.',
				th: 'ผู้ช่วยเตรียมฉบับร่างให้ได้ แต่การอนุมัติ ลงบัญชี และจ่ายเงิน ยังเป็นหน้าที่ของคน — ไม่มีอะไรถูกส่งแทนคุณ'
			}
		},
		{
			icon: UserCheck,
			title: { en: 'Never more than your role', th: 'ไม่เกินสิทธิ์ของคุณ' },
			body: {
				en: "A connection gets what you consented to and what your role allows — today. If you can't see costs, neither can your assistant.",
				th: 'การเชื่อมต่อได้สิทธิ์เท่าที่คุณยินยอมและเท่าที่บทบาทของคุณอนุญาต ณ ตอนนั้น ถ้าคุณมองไม่เห็นต้นทุน ผู้ช่วยของคุณก็มองไม่เห็นเช่นกัน'
			}
		},
		{
			icon: Building2,
			title: { en: 'Only the companies you tick', th: 'เฉพาะบริษัทที่คุณติ๊ก' },
			body: {
				en: 'Belong to several companies? Tick the ones a connection may use. Each call is re-checked against your role in that company, and summaries across companies come back one company at a time.',
				th: 'ถ้าคุณอยู่หลายบริษัท ติ๊กเฉพาะบริษัทที่ให้การเชื่อมต่อใช้ได้ ทุกการเรียกตรวจสิทธิ์ใหม่ตามบทบาทของคุณในบริษัทนั้น และการสรุปหลายบริษัทจะตอบแยกทีละบริษัท'
			}
		},
		{
			icon: Unplug,
			title: { en: 'Disconnect any time', th: 'ยกเลิกการเชื่อมต่อได้ทุกเมื่อ' },
			body: {
				en: 'Every connected app is listed in your API settings; disconnect it and its access ends.',
				th: 'แอปที่เชื่อมต่อทั้งหมดแสดงอยู่ในหน้าตั้งค่า API กดยกเลิกแล้วสิทธิ์จะหมดทันที'
			}
		}
	];

	const apiFeatures: { icon: typeof Bot; title: Bi; body: Bi }[] = [
		{
			icon: KeyRound,
			title: { en: 'API keys with scopes', th: 'API key กำหนดขอบเขตได้' },
			body: {
				en: 'Admins create company keys limited to the scopes an integration needs. A key acts as its creator: if their permissions shrink, so does the key, and it stops when they leave the company.',
				th: 'ผู้ดูแลระบบสร้าง key ของบริษัทที่จำกัดเฉพาะขอบเขตที่การเชื่อมต่อนั้นต้องใช้ key ทำงานในนามคนที่สร้าง ถ้าสิทธิ์ของคนนั้นลดลง key ก็ลดตาม และหยุดทำงานเมื่อเขาออกจากบริษัท'
			}
		},
		{
			icon: FlaskConical,
			title: { en: 'Test keys that never save', th: 'test key ที่ไม่บันทึกจริง' },
			body: {
				en: 'A tnb_test_ key runs every check on write requests and returns the result — but saves nothing. Build against real data safely.',
				th: 'key แบบ tnb_test_ ตรวจคำขอเขียนข้อมูลครบทุกขั้นและส่งผลลัพธ์กลับ — แต่ไม่บันทึกอะไรเลย พัฒนาบนข้อมูลจริงได้อย่างปลอดภัย'
			}
		},
		{
			icon: Webhook,
			title: { en: 'Signed webhooks', th: 'webhook ที่ลงลายเซ็น' },
			body: {
				en: 'Subscribe to events. Each delivery carries a timestamped HMAC-SHA256 signature, and failed deliveries retry with backoff.',
				th: 'สมัครรับเหตุการณ์ที่ต้องการ ทุกการส่งมีลายเซ็น HMAC-SHA256 พร้อมเวลา และส่งซ้ำอัตโนมัติแบบเว้นระยะเมื่อส่งไม่สำเร็จ'
			}
		},
		{
			icon: ListTree,
			title: { en: 'Events feed', th: 'ฟีดเหตุการณ์' },
			body: {
				en: 'Prefer polling? Read the same events from the events endpoint and pick up where you left off.',
				th: 'ถ้าสะดวกดึงข้อมูลเอง อ่านเหตุการณ์ชุดเดียวกันได้จาก events endpoint แล้วต่อจากจุดที่อ่านค้างไว้'
			}
		},
		{
			icon: FileCode2,
			title: { en: 'OpenAPI reference', th: 'เอกสาร OpenAPI' },
			body: {
				en: 'Interactive docs generated from the same spec the API runs on — always in step with what ships.',
				th: 'เอกสารแบบลองเรียกได้จริง สร้างจากสเปกเดียวกับที่ API ใช้ทำงาน — ตรงกับของจริงเสมอ'
			}
		},
		{
			icon: ShieldCheck,
			title: { en: 'Same rules as the app', th: 'กติกาเดียวกับในแอป' },
			body: {
				en: 'Every call is checked against the same permissions as a person using Tonbab, and drafts wait for the usual approvals.',
				th: 'ทุกการเรียกถูกตรวจสิทธิ์แบบเดียวกับคนที่ใช้งาน Tonbab และฉบับร่างยังต้องผ่านการอนุมัติตามปกติ'
			}
		}
	];

	// Mirrors the product's plans.ts API_LIMITS (codustry/workflow, checked 2026-11-17).
	const PLAN_COLS = [m.pr_plan_free, m.pr_plan_starter, m.pr_plan_standard, m.pr_plan_business, m.pr_plan_enterprise];
	const RO: Bi = { en: 'Read-only', th: 'อ่านอย่างเดียว' };
	const RW: Bi = { en: 'Read + drafts', th: 'อ่าน + สร้างฉบับร่าง' };
	const UNL: Bi = { en: 'Unlimited', th: 'ไม่จำกัด' };
	const limits: { label: Bi; v: (Bi | string)[] }[] = [
		{ label: { en: 'Access', th: 'การใช้งาน' }, v: [RO, RW, RW, RW, RW] },
		{ label: { en: 'API keys', th: 'API key' }, v: ['1', '2', '3', '5', UNL] },
		{ label: { en: 'Webhook endpoints', th: 'ปลายทาง webhook' }, v: ['1', '1', '2', '3', '20'] },
		{ label: { en: 'Requests per minute', th: 'คำขอต่อนาที' }, v: ['10', '30', '60', '60', '600'] },
		{ label: { en: 'Calls per day', th: 'จำนวนเรียกต่อวัน' }, v: ['300', '3,000', '10,000', '20,000', '500,000'] }
	];
	const OPENAPI = 'https://api.tonbab.com/v1/openapi.json';
	const quick: { title: Bi; body: Bi; code: string }[] = [
		{
			title: { en: '1 · Create a key', th: '1 · สร้าง API key' },
			body: { en: 'An admin creates a company key in Settings → API, choosing only the scopes the integration needs. Use a tnb_test_ key while you build — writes are validated but never saved.', th: 'ผู้ดูแลระบบสร้าง key ของบริษัทในหน้าตั้งค่า API เลือกเฉพาะขอบเขตที่ต้องใช้ ระหว่างพัฒนาใช้ key แบบ tnb_test_ — คำขอเขียนถูกตรวจครบแต่ไม่บันทึกจริง' },
			code: 'export TONBAB_API_KEY=tnb_test_…'
		},
		{
			title: { en: '2 · Call the REST API', th: '2 · เรียก REST API' },
			body: { en: 'Send the key as a Bearer token. Writes create drafts for a person to review; add an Idempotency-Key so retries never duplicate.', th: 'ส่ง key เป็น Bearer token การเขียนข้อมูลสร้างเป็นฉบับร่างให้คนตรวจ ใส่ Idempotency-Key เพื่อให้การส่งซ้ำไม่สร้างรายการซ้ำ' },
			code: 'curl https://api.tonbab.com/v1/products \\\n  -H "Authorization: Bearer $TONBAB_API_KEY"'
		},
		{
			title: { en: '3 · Connect an AI assistant (MCP)', th: '3 · เชื่อมผู้ช่วย AI (MCP)' },
			body: { en: 'MCP clients such as Claude, ChatGPT or Gemini CLI connect to the MCP endpoint and sign in with OAuth — the user ticks the companies and consents to scopes; every tool takes a company argument and access never exceeds their role there.', th: 'ไคลเอนต์ MCP เช่น Claude, ChatGPT หรือ Gemini CLI เชื่อมที่ MCP endpoint แล้วเข้าสู่ระบบด้วย OAuth — ผู้ใช้ติ๊กบริษัทและยินยอมขอบเขต ทุกเครื่องมือรับอาร์กิวเมนต์ company และสิทธิ์ไม่เกินบทบาทของผู้ใช้ในบริษัทนั้น' },
			code: 'https://api.tonbab.com/mcp'
		}
	];
	const cellText = (v: Bi | string) => (typeof v === 'string' ? v : t(v));
</script>

<!-- Hero -->
<section class="container mx-auto max-w-6xl px-4 pb-14 pt-16 sm:pt-24">
	<p class="text-sm font-semibold uppercase tracking-wider text-tnb-blue">{m.mkt_nav_developers()}</p>
	<h1 class="mt-3 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight text-tnb-ink text-balance sm:text-6xl">
		{t({ en: 'Connect Tonbab to your tools — and to your AI.', th: 'เชื่อม Tonbab กับเครื่องมือของคุณ และกับ AI ของคุณ' })}
	</h1>
	<p class="mt-5 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">
		{t({
			en: 'A REST API with scoped keys and signed webhooks, and an AI connector with 59 tools that brings your company data into Claude, ChatGPT or Gemini CLI — always within each person’s own permissions.',
			th: 'REST API ที่กำหนดขอบเขตของ key ได้ พร้อม webhook ที่ลงลายเซ็น และตัวเชื่อม AI 59 เครื่องมือที่พาข้อมูลบริษัทเข้าไปใช้ใน Claude, ChatGPT หรือ Gemini CLI — ภายใต้สิทธิ์ของแต่ละคนเสมอ'
		})}
	</p>
	<div class="mt-8 flex flex-wrap gap-3">
		<a href={API_DOCS} class="btn-primary px-5 py-2.5">{t({ en: 'Read the API reference', th: 'อ่านเอกสาร API' })}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
		<a href="https://app.tonbab.com/signup" class="btn-soft px-5 py-2.5">{m.mkt_start_free()}</a>
	</div>
	<p class="mt-4 text-sm text-tnb-ink-soft">{t({ en: 'Included on every plan — Free is read-only.', th: 'มีในทุกแพ็กเกจ — แพ็กเกจฟรีอ่านได้อย่างเดียว' })}</p>
</section>

<!-- AI connector -->
<section class="bg-tnb-mist">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-tnb-ink-soft"><Bot class="h-4 w-4" aria-hidden="true" />{t({ en: 'AI connector (MCP)', th: 'ตัวเชื่อม AI (MCP)' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-tnb-ink text-balance sm:text-4xl">{t({ en: 'Tonbab inside Claude, ChatGPT and Gemini CLI', th: 'ใช้ Tonbab ได้ใน Claude, ChatGPT และ Gemini CLI' })}</h2>
		<p class="mt-4 max-w-2xl leading-relaxed text-tnb-ink-soft">
			{t({
				en: 'Ask about sales, receivables, profit, stock, purchasing, customers and leave in plain Thai or English — in every company you tick — and let the assistant prepare drafts for you to check. It uses your plan’s API quota, not AI credits.',
				th: 'ถามเรื่องยอดขาย ลูกหนี้ กำไรขาดทุน สต็อก การจัดซื้อ ลูกค้า และวันลา ด้วยภาษาไทยหรืออังกฤษธรรมดา ๆ ได้ทุกบริษัทที่คุณติ๊ก แล้วให้ผู้ช่วยเตรียมฉบับร่างไว้ให้คุณตรวจ ใช้โควตา API ของแพ็กเกจ ไม่ใช้เครดิต AI'
			})}
		</p>

		<ol class="mt-10 grid gap-4 md:grid-cols-3">
			{#each steps as s, i (i)}
				<li class="flex min-w-0 flex-col rounded-2xl bg-tnb-paper p-6">
					<span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-tnb-blue text-sm font-bold text-white">{i + 1}</span>
					<h3 class="mt-4 font-semibold text-tnb-ink">{t(s.title)}</h3>
					<p class="mt-1.5 text-[15px] leading-relaxed text-tnb-ink-soft">{t(s.body)}</p>
					{#if s.code}
						<code class="mt-3 block overflow-x-auto whitespace-nowrap rounded-lg bg-tnb-ink px-3 py-2.5 font-mono text-sm text-white">{s.code}</code>
					{/if}
				</li>
			{/each}
		</ol>

		<div class="mt-6 grid gap-4 md:grid-cols-2">
			<div class="rounded-2xl bg-tnb-paper p-6">
				<h3 class="flex items-center gap-2 font-semibold text-tnb-ink"><Eye class="h-4 w-4 text-tnb-ink-soft" aria-hidden="true" />{t({ en: 'What it can read', th: 'อ่านอะไรได้บ้าง' })}</h3>
				<ul class="mt-3 space-y-2">
					{#each canRead as r (r.en)}
						<li class="flex gap-2.5 text-[15px] leading-snug text-tnb-ink"><Check class="mt-0.5 h-4 w-4 shrink-0 text-tnb-ink-soft" aria-hidden="true" />{t(r)}</li>
					{/each}
				</ul>
			</div>
			<div class="rounded-2xl bg-tnb-paper p-6">
				<h3 class="flex items-center gap-2 font-semibold text-tnb-ink"><FilePen class="h-4 w-4 text-tnb-ink-soft" aria-hidden="true" />{t({ en: 'What it can create — drafts only', th: 'สร้างอะไรได้บ้าง — เฉพาะฉบับร่าง' })}</h3>
				<ul class="mt-3 space-y-2">
					{#each canDraft as r (r.en)}
						<li class="flex gap-2.5 text-[15px] leading-snug text-tnb-ink"><Check class="mt-0.5 h-4 w-4 shrink-0 text-tnb-ink-soft" aria-hidden="true" />{t(r)}</li>
					{/each}
				</ul>
				<p class="mt-4 text-sm text-tnb-ink-soft">{t({ en: 'Drafting works on every paid plan, from Starter; Free connections are read-only.', th: 'การสร้างฉบับร่างใช้ได้ทุกแพ็กเกจที่ชำระเงิน ตั้งแต่ Starter ส่วนแพ็กเกจฟรีอ่านได้อย่างเดียว' })}</p>
			</div>
		</div>

		<div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{#each guards as g (g.title.en)}
				{@const Icon = g.icon}
				<div class="rounded-2xl border border-tnb-hair bg-tnb-paper p-6">
					<Icon class="h-5 w-5 text-tnb-blue" aria-hidden="true" />
					<h3 class="mt-3 font-semibold text-tnb-ink">{t(g.title)}</h3>
					<p class="mt-1.5 text-[15px] leading-relaxed text-tnb-ink-soft">{t(g.body)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- REST API -->
<section class="container mx-auto max-w-6xl px-4 py-20">
	<p class="text-sm font-semibold uppercase tracking-wider text-tnb-ink-soft">REST API</p>
	<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-tnb-ink text-balance sm:text-4xl">{t({ en: 'Build on the same records your team uses', th: 'ต่อยอดบนข้อมูลชุดเดียวกับที่ทีมใช้' })}</h2>
	<div class="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_28rem]">
		<div class="grid gap-x-8 gap-y-7 sm:grid-cols-2">
			{#each apiFeatures as f (f.title.en)}
				{@const Icon = f.icon}
				<div>
					<Icon class="h-5 w-5 text-tnb-blue" aria-hidden="true" />
					<h3 class="mt-2.5 font-semibold text-tnb-ink">{t(f.title)}</h3>
					<p class="mt-1 text-[15px] leading-relaxed text-tnb-ink-soft">{t(f.body)}</p>
				</div>
			{/each}
		</div>
		<div class="min-w-0 space-y-4">
			<figure class="overflow-hidden rounded-2xl bg-tnb-ink">
				<figcaption class="border-b border-white/10 px-4 py-2.5 text-xs font-medium text-white/60">{t({ en: 'List products', th: 'ดึงรายการสินค้า' })}</figcaption>
				<pre class="overflow-x-auto p-4 text-[13px] leading-relaxed text-white"><code>curl https://api.tonbab.com/v1/products \
  -H "Authorization: Bearer $TONBAB_API_KEY"</code></pre>
			</figure>
			<figure class="overflow-hidden rounded-2xl bg-tnb-ink">
				<figcaption class="border-b border-white/10 px-4 py-2.5 text-xs font-medium text-white/60">{t({ en: 'Every webhook delivery is signed', th: 'ทุก webhook ที่ส่งมามีลายเซ็น' })}</figcaption>
				<pre class="overflow-x-auto p-4 text-[13px] leading-relaxed text-white"><code>Tonbab-Signature: t=&lt;unix time&gt;,v1=&lt;hex HMAC-SHA256&gt;
# v1 = HMAC-SHA256(secret, "&lt;t&gt;.&lt;raw body&gt;")</code></pre>
			</figure>
			<a href={API_DOCS} class="inline-flex items-center gap-1 text-sm font-semibold text-tnb-blue hover:underline">api.tonbab.com/docs<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
		</div>
	</div>
</section>

<!-- Quickstart -->
<section id="quickstart" class="scroll-mt-20 bg-tnb-mist">
	<div class="container mx-auto max-w-6xl px-4 py-20">
		<p class="text-sm font-semibold uppercase tracking-wider text-tnb-ink-soft">{t({ en: 'Getting started', th: 'เริ่มต้นใช้งาน' })}</p>
		<h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-tnb-ink text-balance sm:text-4xl">{t({ en: 'From zero to your first call in three steps', th: 'เริ่มเรียก API ได้ใน 3 ขั้นตอน' })}</h2>
		<ol class="mt-10 grid gap-5 lg:grid-cols-3">
			{#each quick as q (q.title.en)}
				<li class="flex min-w-0 flex-col rounded-2xl bg-white p-6 ring-1 ring-tnb-line">
					<h3 class="font-semibold text-tnb-ink">{t(q.title)}</h3>
					<p class="mt-2 flex-1 text-[15px] leading-relaxed text-tnb-ink-soft">{t(q.body)}</p>
					<pre class="mt-4 overflow-x-auto rounded-xl bg-tnb-ink p-3 text-[12.5px] leading-relaxed text-white"><code>{q.code}</code></pre>
				</li>
			{/each}
		</ol>
		<div class="mt-8 flex flex-wrap gap-3">
			<a href={API_DOCS} class="btn-primary px-5 py-2.5">{t({ en: 'API reference', th: 'เอกสารอ้างอิง API' })} — api.tonbab.com/docs<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
			<a href={OPENAPI} class="btn-soft px-5 py-2.5">OpenAPI spec (JSON)</a>
			<a href={localePath(locale, '/docs/api/api-and-mcp-quickstart')} class="btn-ghost">{t({ en: 'Step-by-step guide', th: 'คู่มือทีละขั้น' })}</a>
		</div>
	</div>
</section>

<!-- Limits per plan -->
<section class="container mx-auto max-w-6xl px-4 pb-20">
	<div class="rounded-2xl border border-tnb-hair p-6 sm:p-8">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{t({ en: 'Limits by plan', th: 'โควตาตามแพ็กเกจ' })}</h2>
		<p class="mt-2 text-tnb-ink-soft">{t({ en: 'Per company, across the REST API and the AI connector together.', th: 'นับต่อบริษัท รวมทั้ง REST API และตัวเชื่อม AI' })}</p>
		<div class="mt-6 overflow-x-auto">
			<table class="w-full min-w-[640px] border-separate border-spacing-0 text-left">
				<thead>
					<tr>
						<th class="w-[34%] border-b border-tnb-hair py-2.5"><span class="sr-only">{t({ en: 'Limit', th: 'โควตา' })}</span></th>
						{#each PLAN_COLS as p (p)}<th class="border-b border-tnb-hair py-2.5 pr-3 text-sm font-semibold text-tnb-ink">{p()}</th>{/each}
					</tr>
				</thead>
				<tbody>
					{#each limits as r (r.label.en)}
						<tr>
							<th scope="row" class="border-b border-tnb-hair py-3 pr-4 text-[15px] font-medium text-tnb-ink">{t(r.label)}</th>
							{#each r.v as v, i (i)}<td class="border-b border-tnb-hair py-3 pr-3 text-sm tabular-nums text-tnb-ink">{cellText(v)}</td>{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<a href={localePath(locale, '/pricing')} class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-tnb-blue hover:underline">{m.mod_cta_pricing()}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
	</div>
</section>
