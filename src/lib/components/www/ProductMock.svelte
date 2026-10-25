<!--
	Illustrated product window — one per module, drawn in HTML so it stays
	crisp, bilingual and themeable (no screenshot to keep in sync). The data
	is illustrative example content, not a customer's real records; the
	layouts mirror the real screens (Job Control hero bar, team calendar,
	chat inbox, deal board, service job stepper).
-->
<script lang="ts">
	import { SUITE_THEME, type SuiteKey } from '$lib/marketing/suite-data';
	import type { Bi } from '$lib/marketing/compare-data';

	let { module, locale, compact = false }: { module: Exclude<SuiteKey, 'platform'>; locale: 'en' | 'th'; compact?: boolean } = $props();
	const t = (b: Bi) => (locale === 'th' ? b.th : b.en);
	const theme = $derived(SUITE_THEME[module]);

	// Animate bars from 0 once mounted (resting state = filled, so a
	// screenshot or reduced-motion visitor still sees the real picture).
	let mounted = $state(false);
	$effect(() => {
		const id = requestAnimationFrame(() => (mounted = true));
		return () => cancelAnimationFrame(id);
	});

	const nav: Record<string, Bi[]> = {
		operation: [
			{ en: 'Job Controls', th: 'Job Control' },
			{ en: 'Purchase requests', th: 'ใบขอซื้อ' },
			{ en: 'Purchase orders', th: 'ใบสั่งซื้อ' },
			{ en: 'Work orders', th: 'ใบสั่งผลิต' },
			{ en: 'Stock balance', th: 'สต็อกคงเหลือ' }
		],
		people: [
			{ en: 'Home', th: 'หน้าหลัก' },
			{ en: 'Directory', th: 'รายชื่อพนักงาน' },
			{ en: 'Calendar', th: 'ปฏิทิน' },
			{ en: 'Leave', th: 'การลา' },
			{ en: 'Time', th: 'เวลาทำงาน' }
		],
		commerce: [
			{ en: 'Home', th: 'หน้าหลัก' },
			{ en: 'Orders', th: 'ออเดอร์' },
			{ en: 'Chat', th: 'แชท' },
			{ en: 'Customers', th: 'ลูกค้า' },
			{ en: 'POS', th: 'POS' }
		],
		crm: [
			{ en: 'Home', th: 'หน้าหลัก' },
			{ en: 'Deals', th: 'ดีล' },
			{ en: 'Customers', th: 'ลูกค้า' },
			{ en: 'Tenders', th: 'งานประมูล' },
			{ en: 'Sales plan', th: 'แผนการขาย' }
		],
		service: [
			{ en: 'Home', th: 'หน้าหลัก' },
			{ en: 'My jobs', th: 'งานของฉัน' },
			{ en: 'New job', th: 'เปิดงานใหม่' },
			{ en: 'Maintenance', th: 'แผนบำรุงรักษา' },
			{ en: 'Reports', th: 'รายงาน' }
		]
	};
	const activeNav: Record<string, number> = { operation: 0, people: 2, commerce: 2, crm: 1, service: 1 };

	// ── Operation: Job Control
	const jcRows = [
		{ label: { en: 'Materials', th: 'วัตถุดิบ' }, value: 412_500, pct: 62 },
		{ label: { en: 'Production', th: 'การผลิต' }, value: 138_200, pct: 21 },
		{ label: { en: 'Services', th: 'ค่าบริการ' }, value: 64_000, pct: 10 },
		{ label: { en: 'Delivery', th: 'ขนส่ง' }, value: 21_300, pct: 3 }
	];
	const jcDocs = ['PR', 'RFQ', 'PO', 'GR', 'WO', 'DN'];

	// ── People: week calendar
	const days = [
		{ en: 'Mon', th: 'จ.' },
		{ en: 'Tue', th: 'อ.' },
		{ en: 'Wed', th: 'พ.' },
		{ en: 'Thu', th: 'พฤ.' },
		{ en: 'Fri', th: 'ศ.' }
	];
	const staff = [
		{ ini: 'PN', name: { en: 'Pim', th: 'พิม' }, cells: ['', '🌴', '🌴', '', ''] },
		{ ini: 'KT', name: { en: 'Krit', th: 'กฤต' }, cells: ['', '', '', '🏥', ''] },
		{ ini: 'SW', name: { en: 'Sai', th: 'ทราย' }, cells: ['', '', '', '', '📋'] },
		{ ini: 'NA', name: { en: 'Nat', th: 'ณัฐ' }, cells: ['', '', '', '', ''] }
	];

	// ── Commerce: chat inbox
	const chats = [
		{ ch: 'LINE', color: 'bg-[#06C755]', name: { en: 'Khun Mew', th: 'คุณมิว' }, msg: { en: 'Is the 500 ml in stock?', th: 'ขวด 500 ml มีของไหมคะ' }, unread: true },
		{ ch: 'FB', color: 'bg-[#0866FF]', name: { en: 'Arthit S.', th: 'อาทิตย์ ส.' }, msg: { en: 'Thanks, received!', th: 'ได้รับของแล้วครับ ขอบคุณ' }, unread: false },
		{ ch: 'IG', color: 'bg-linear-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]', name: { en: 'beam.studio', th: 'beam.studio' }, msg: { en: 'Can I pay by PromptPay?', th: 'จ่าย PromptPay ได้ไหม' }, unread: true }
	];

	// ── CRM: deal board
	const columns = [
		{ name: { en: 'Qualified', th: 'คัดกรองแล้ว' }, deals: [{ co: { en: 'Siam Packaging', th: 'สยามแพ็คเกจจิ้ง' }, amt: '฿180,000' }, { co: { en: 'Bangna Foods', th: 'บางนาฟู้ดส์' }, amt: '฿92,500' }] },
		{ name: { en: 'Quoted', th: 'เสนอราคา' }, deals: [{ co: { en: 'Rayong Plant 2', th: 'โรงงานระยอง 2' }, amt: '฿1.2M', hot: true }] },
		{ name: { en: 'Negotiation', th: 'ต่อรอง' }, deals: [{ co: { en: 'Provincial Hospital', th: 'โรงพยาบาลจังหวัด' }, amt: '฿640,000', tender: true }] },
		{ name: { en: 'Won', th: 'ชนะ' }, deals: [{ co: { en: 'Chonburi Steel', th: 'ชลบุรีสตีล' }, amt: '฿355,000', won: true }] }
	];

	// ── Service: job stepper
	const stages = [
		{ en: 'Intake', th: 'รับเครื่อง' },
		{ en: 'Inspect', th: 'ตรวจเช็ก' },
		{ en: 'Quote', th: 'เสนอราคา' },
		{ en: 'Repair', th: 'ซ่อม' },
		{ en: 'Test', th: 'ทดสอบ' },
		{ en: 'Ready', th: 'พร้อมส่ง' },
		{ en: 'Returned', th: 'ส่งคืน' }
	];
	const svcStage = 3;
	const checklist = [
		{ label: { en: 'Replace drive belt', th: 'เปลี่ยนสายพาน' }, done: true },
		{ label: { en: 'Clean & lubricate bearings', th: 'ทำความสะอาดและหล่อลื่นแบริ่ง' }, done: true },
		{ label: { en: 'Run test 30 min', th: 'ทดสอบเดินเครื่อง 30 นาที' }, done: false }
	];
</script>

<div class="overflow-hidden rounded-2xl border border-tnb-line bg-white text-left shadow-[0_24px_60px_-20px_rgba(23,22,28,0.28)]">
	<!-- window chrome -->
	<div class="flex items-center gap-2 border-b border-tnb-line bg-[#f7f8fb] px-4 py-2.5">
		<span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
		<span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
		<span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
		<span class="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-tnb-ink-soft ring-1 ring-tnb-line">app.tonbab.com/{module}</span>
	</div>
	<div class="flex {compact ? 'h-[300px]' : 'h-[340px] sm:h-[380px]'}">
		<!-- sidebar -->
		<aside class="hidden w-40 shrink-0 flex-col gap-0.5 border-r border-tnb-line bg-[#fafbfd] p-2.5 sm:flex">
			<div class="mb-2 flex items-center gap-2 px-1.5">
				<span class="h-5 w-5 rounded-md {theme.solid}"></span>
				<span class="text-xs font-semibold text-tnb-ink">{module === 'crm' ? 'CRM' : module[0].toUpperCase() + module.slice(1)}</span>
			</div>
			{#each nav[module] as item, i (i)}
				<span class="truncate rounded-md px-2 py-1.5 text-[11.5px] {i === activeNav[module] ? `${theme.chip} font-semibold` : 'text-tnb-ink-soft'}">{t(item)}</span>
			{/each}
		</aside>

		<div class="min-w-0 flex-1 overflow-hidden p-4 sm:p-5">
			{#if module === 'operation'}
				<div class="flex items-start justify-between gap-3">
					<div class="min-w-0">
						<p class="text-[11px] font-medium text-tnb-ink-soft">JC-2026-014</p>
						<p class="truncate text-sm font-semibold text-tnb-ink">{t({ en: 'Conveyor line retrofit', th: 'ปรับปรุงไลน์สายพานลำเลียง' })}</p>
					</div>
					<span class="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">{t({ en: 'In progress', th: 'กำลังดำเนินการ' })}</span>
				</div>
				<div class="mt-4 rounded-xl {theme.wash} p-3.5">
					<div class="flex items-baseline justify-between text-[11px] text-tnb-ink-soft">
						<span>{t({ en: 'Actual cost vs. budget', th: 'ต้นทุนจริงเทียบงบ' })}</span>
						<span class="tabular-nums"><b class="text-sm text-tnb-ink">฿636,000</b> / ฿940,000</span>
					</div>
					<div class="mt-2 h-2.5 overflow-hidden rounded-full bg-white">
						<div class="h-full rounded-full {theme.solid} transition-[width] duration-1000 ease-out" style="width:{mounted ? 68 : 0}%"></div>
					</div>
					<p class="mt-1.5 text-[10.5px] text-tnb-ink-soft">68% {t({ en: 'used · ฿304,000 left', th: 'ใช้ไป · เหลือ ฿304,000' })}</p>
				</div>
				<div class="mt-3 space-y-2">
					{#each jcRows as r (r.label.en)}
						<div class="grid grid-cols-[5.5rem_1fr_4.5rem] items-center gap-2 text-[11.5px]">
							<span class="truncate text-tnb-ink-soft">{t(r.label)}</span>
							<span class="h-1.5 overflow-hidden rounded-full bg-tnb-line/70"><span class="block h-full rounded-full {theme.solid} opacity-70 transition-[width] duration-1000 ease-out" style="width:{mounted ? r.pct : 0}%"></span></span>
							<span class="text-right font-medium tabular-nums text-tnb-ink">฿{r.value.toLocaleString('en-US')}</span>
						</div>
					{/each}
				</div>
				<div class="mt-4 flex flex-wrap gap-1.5">
					{#each jcDocs as d, i (d)}
						<span class="rounded-md border border-tnb-line bg-white px-2 py-0.5 text-[10.5px] font-semibold text-tnb-ink-soft">{d}<span class="ml-1 font-normal text-tnb-ink-soft/70">×{[3, 2, 4, 4, 1, 2][i]}</span></span>
					{/each}
				</div>
			{:else if module === 'people'}
				<div class="flex items-center justify-between">
					<p class="text-sm font-semibold text-tnb-ink">{t({ en: 'This week', th: 'สัปดาห์นี้' })}</p>
					<span class="text-[11px] text-tnb-ink-soft">{t({ en: '3 away · 1 holiday', th: 'ไม่อยู่ 3 คน · วันหยุด 1 วัน' })}</span>
				</div>
				<div class="mt-3 overflow-hidden rounded-xl border border-tnb-line">
					<div class="grid grid-cols-[4.5rem_repeat(5,1fr)] bg-[#fafbfd] text-[10.5px] font-semibold text-tnb-ink-soft">
						<span class="px-2 py-1.5"></span>
						{#each days as d, i (i)}<span class="py-1.5 text-center">{t(d)}</span>{/each}
					</div>
					{#each staff as s (s.ini)}
						<div class="grid grid-cols-[4.5rem_repeat(5,1fr)] border-t border-tnb-line text-[11px]">
							<span class="flex items-center gap-1.5 px-2 py-2">
								<span class="flex h-5 w-5 items-center justify-center rounded-full {theme.chip} text-[9px] font-bold">{s.ini}</span>
								<span class="truncate text-tnb-ink">{t(s.name)}</span>
							</span>
							{#each s.cells as c, i (i)}
								<span class="flex items-center justify-center border-l border-tnb-line {i === 2 ? 'bg-rose-50' : ''}">
									{#if c}<span class="rounded-md bg-violet-100 px-1.5 py-0.5 text-[12px]">{c}</span>{/if}
								</span>
							{/each}
						</div>
					{/each}
				</div>
				<p class="mt-2 text-[10.5px] text-rose-600">● {t({ en: 'Wed — public holiday', th: 'พ. — วันหยุดนักขัตฤกษ์' })}</p>
				<div class="mt-3 grid grid-cols-3 gap-2">
					{#each [{ l: { en: 'Annual', th: 'พักร้อน' }, v: '4 / 6' }, { l: { en: 'Personal', th: 'ลากิจ' }, v: '2 / 3' }, { l: { en: 'Comp days', th: 'ชดเชย' }, v: '1' }] as b (b.l.en)}
						<div class="rounded-lg {theme.wash} px-2.5 py-2">
							<p class="text-[10px] text-tnb-ink-soft">{t(b.l)}</p>
							<p class="text-sm font-semibold tabular-nums text-tnb-ink">{b.v}</p>
						</div>
					{/each}
				</div>
			{:else if module === 'commerce'}
				<div class="grid h-full grid-cols-1 gap-3 sm:grid-cols-[11rem_1fr]">
					<div class="hidden flex-col gap-1.5 sm:flex">
						{#each chats as c, i (i)}
							<div class="flex items-center gap-2 rounded-lg p-1.5 {i === 0 ? theme.wash : ''}">
								<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[8.5px] font-bold text-white {c.color}">{c.ch}</span>
								<span class="min-w-0 flex-1">
									<span class="block truncate text-[11px] font-semibold text-tnb-ink">{t(c.name)}</span>
									<span class="block truncate text-[10.5px] text-tnb-ink-soft">{t(c.msg)}</span>
								</span>
								{#if c.unread}<span class="h-2 w-2 shrink-0 rounded-full {theme.solid}"></span>{/if}
							</div>
						{/each}
					</div>
					<div class="flex min-w-0 flex-col rounded-xl border border-tnb-line">
						<div class="flex items-center gap-2 border-b border-tnb-line px-3 py-2">
							<span class="rounded bg-[#06C755] px-1.5 py-0.5 text-[9px] font-bold text-white">LINE</span>
							<span class="text-[11.5px] font-semibold text-tnb-ink">{t(chats[0].name)}</span>
						</div>
						<div class="flex flex-1 flex-col gap-2 p-3 text-[11.5px]">
							<span class="max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-[#f1f3f7] px-3 py-1.5 text-tnb-ink">{t(chats[0].msg)}</span>
							<span class="max-w-[80%] self-end rounded-2xl rounded-br-sm {theme.solid} px-3 py-1.5 text-white">{t({ en: 'Yes — 24 in stock. Shall I open an order?', th: 'มีค่ะ เหลือ 24 ขวด เปิดออเดอร์ให้เลยไหมคะ' })}</span>
							<span class="max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-[#f1f3f7] px-3 py-1.5 text-tnb-ink">{t({ en: '2 please, PromptPay 🙏', th: 'เอา 2 ขวด จ่าย PromptPay ค่ะ 🙏' })}</span>
						</div>
						<div class="flex items-center justify-between gap-2 border-t border-tnb-line px-3 py-2">
							<span class="text-[11px] text-tnb-ink-soft">2 × ฿390 = <b class="text-tnb-ink">฿780</b></span>
							<span class="rounded-md {theme.solid} px-2.5 py-1 text-[11px] font-semibold text-white">{t({ en: 'Create order', th: 'สร้างออเดอร์' })}</span>
						</div>
					</div>
				</div>
			{:else if module === 'crm'}
				<div class="flex items-center justify-between">
					<p class="text-sm font-semibold text-tnb-ink">{t({ en: 'Sales pipeline', th: 'ไปป์ไลน์การขาย' })}</p>
					<span class="text-[11px] text-tnb-ink-soft">{t({ en: 'Weighted', th: 'ถ่วงน้ำหนัก' })} <b class="tabular-nums text-tnb-ink">฿1.46M</b></span>
				</div>
				<div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
					{#each columns as col, ci (ci)}
						<div class="rounded-xl bg-[#f6f7fa] p-2 {ci > 1 ? 'hidden sm:block' : ''}">
							<p class="mb-1.5 flex items-center justify-between px-0.5 text-[10.5px] font-semibold text-tnb-ink-soft">{t(col.name)}<span class="font-normal">{col.deals.length}</span></p>
							<div class="space-y-1.5">
								{#each col.deals as d, di (di)}
									<div class="rounded-lg border bg-white p-2 shadow-[0_1px_2px_rgba(23,22,28,0.06)] {'hot' in d && d.hot ? theme.ring : 'border-tnb-line'}">
										<p class="truncate text-[11px] font-semibold text-tnb-ink">{t(d.co)}</p>
										<p class="mt-0.5 text-[11px] tabular-nums text-tnb-ink-soft">{d.amt}</p>
										{#if 'tender' in d}<span class="mt-1 inline-block rounded bg-amber-50 px-1.5 py-0.5 text-[9.5px] font-semibold text-amber-700">e-GP</span>{/if}
										{#if 'won' in d}<span class="mt-1 inline-block rounded bg-emerald-50 px-1.5 py-0.5 text-[9.5px] font-semibold text-emerald-700">→ Job Control</span>{/if}
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
				<div class="mt-3 flex items-center gap-2 rounded-xl {theme.wash} px-3 py-2 text-[11px]">
					<span class="h-2 w-2 shrink-0 rounded-full {theme.solid}"></span>
					<span class="text-tnb-ink">{t({ en: '4 customers due to reorder this week', th: 'ลูกค้า 4 รายถึงรอบสั่งซ้ำสัปดาห์นี้' })}</span>
				</div>
			{:else if module === 'service'}
				<div class="flex items-start justify-between gap-3">
					<div class="min-w-0">
						<p class="text-[11px] font-medium text-tnb-ink-soft">SV-2026-0021</p>
						<p class="truncate text-sm font-semibold text-tnb-ink">{t({ en: 'Air compressor — no pressure', th: 'ปั๊มลม — ไม่มีแรงดัน' })}</p>
					</div>
					<span class="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold text-amber-700">{t({ en: 'Under warranty', th: 'อยู่ในประกัน' })}</span>
				</div>
				<ol class="mt-4 flex items-center">
					{#each stages as s, i (i)}
						<li class="flex flex-1 flex-col items-center gap-1">
							<span class="flex w-full items-center">
								<span class="h-0.5 flex-1 {i === 0 ? 'opacity-0' : i <= svcStage ? theme.solid : 'bg-tnb-line'}"></span>
								<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold {i < svcStage ? `${theme.solid} text-white` : i === svcStage ? `bg-white ring-2 ring-offset-1 ${theme.text} ring-current` : 'bg-tnb-line text-tnb-ink-soft'}">{i < svcStage ? '✓' : i + 1}</span>
								<span class="h-0.5 flex-1 {i === stages.length - 1 ? 'opacity-0' : i < svcStage ? theme.solid : 'bg-tnb-line'}"></span>
							</span>
							<span class="hidden text-[9.5px] sm:block {i === svcStage ? `${theme.text} font-semibold` : 'text-tnb-ink-soft'}">{t(s)}</span>
						</li>
					{/each}
				</ol>
				<div class="mt-4 grid gap-3 sm:grid-cols-[1fr_8rem]">
					<div class="space-y-1.5 rounded-xl border border-tnb-line p-3">
						{#each checklist as c (c.label.en)}
							<p class="flex items-center gap-2 text-[11.5px] {c.done ? 'text-tnb-ink-soft line-through' : 'text-tnb-ink'}">
								<span class="flex h-4 w-4 shrink-0 items-center justify-center rounded border {c.done ? `${theme.solid} border-transparent text-white` : 'border-tnb-line'} text-[9px]">{c.done ? '✓' : ''}</span>{t(c.label)}
							</p>
						{/each}
					</div>
					<div class="grid grid-cols-3 gap-1.5 sm:grid-cols-2">
						{#each [0, 1, 2, 3] as p (p)}
							<span class="aspect-square rounded-lg {p === 3 ? 'hidden sm:block' : ''} bg-linear-to-br {['from-slate-200 to-slate-300', 'from-teal-100 to-teal-200', 'from-slate-300 to-slate-200', 'from-teal-200 to-teal-100'][p]}"></span>
						{/each}
					</div>
				</div>
				<div class="mt-3 flex items-center justify-between rounded-xl {theme.wash} px-3 py-2 text-[11px]">
					<span class="text-tnb-ink">{t({ en: 'Parts: belt ×1 from stock · labour 2.5 h', th: 'อะไหล่: สายพาน ×1 จากสต็อก · ค่าแรง 2.5 ชม.' })}</span>
					<span class="rounded-md {theme.solid} px-2 py-0.5 font-semibold text-white">{t({ en: 'Next: Test', th: 'ถัดไป: ทดสอบ' })}</span>
				</div>
			{/if}
		</div>
	</div>
</div>
