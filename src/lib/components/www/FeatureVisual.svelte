<!--
	Illustrated screen for a /features page — drawn in HTML (crisp, bilingual,
	no screenshot to keep in sync). Example data only, never a customer's
	records; layouts mirror the real screens. Decorative: the page text says
	everything the picture shows, so the drawing is aria-hidden and the
	<figcaption> names it.
-->
<script lang="ts">
	import type { Bi } from '$lib/marketing/compare-data';
	import type { FeatureVisual } from '$lib/marketing/features-data';
	import ProductMock from './ProductMock.svelte';

	let { visual, locale }: { visual: FeatureVisual; locale: 'en' | 'th' } = $props();
	const t = (b: Bi) => (locale === 'th' ? b.th : b.en);
	const baht = (n: number) => '฿' + n.toLocaleString('en-US');

	const caption: Record<FeatureVisual, Bi> = {
		pos: { en: 'POS counter with a PromptPay bill (example data)', th: 'หน้าจอ POS กับบิล PromptPay (ข้อมูลตัวอย่าง)' },
		kiosk: { en: 'Pack station: PIN sign-in and scan-to-pack (example data)', th: 'สถานีแพ็ก: เข้าด้วย PIN และสแกนแพ็ก (ข้อมูลตัวอย่าง)' },
		landed: { en: 'RFQ comparison ranked by landed cost (example data)', th: 'ตารางเทียบราคา จัดอันดับตามต้นทุนถึงคลัง (ข้อมูลตัวอย่าง)' },
		channels: { en: 'Orders and chats flowing into one place', th: 'ออเดอร์และแชทไหลเข้าที่เดียว' },
		wht: { en: 'Withholding tax certificate (50 Tawi), example data', th: 'หนังสือรับรองการหักภาษี ณ ที่จ่าย (50 ทวิ) ข้อมูลตัวอย่าง' },
		stock: { en: 'Stock balance by warehouse (example data)', th: 'สต็อกคงเหลือรายคลัง (ข้อมูลตัวอย่าง)' },
		mfg: { en: 'Job Control with work orders and live budget (example data)', th: 'Job Control พร้อมใบสั่งผลิตและงบสด (ข้อมูลตัวอย่าง)' },
		payroll: { en: 'Team calendar and leave in People (example data)', th: 'ปฏิทินทีมและวันลาใน People (ข้อมูลตัวอย่าง)' },
		egp: { en: 'Daily e-GP announcements with keyword matches (example data)', th: 'ประกาศ e-GP รายวันพร้อมคำค้นที่ตรง (ข้อมูลตัวอย่าง)' },
		mobile: { en: 'Approvals on a phone (example data)', th: 'อนุมัติบนมือถือ (ข้อมูลตัวอย่าง)' },
		security: { en: 'Who can see what — enforced in the database', th: 'ใครเห็นอะไร — บังคับที่ฐานข้อมูล' }
	};

	const quotes = [
		{ v: { en: 'Shenzhen Parts (CNY)', th: 'Shenzhen Parts (CNY)' }, unit: 412, landed: 498, best: true },
		{ v: { en: 'Bangkok Supply (THB)', th: 'บางกอก ซัพพลาย (THB)' }, unit: 520, landed: 520, best: false },
		{ v: { en: 'Osaka Trading (JPY)', th: 'Osaka Trading (JPY)' }, unit: 395, landed: 547, best: false }
	];
	const stateStyle = {
		live: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
		dev: 'bg-amber-50 text-amber-800 ring-amber-200',
		soon: 'bg-sky-50 text-sky-700 ring-sky-200',
		off: 'bg-slate-50 text-slate-500 ring-slate-200'
	} as const;
	const channels: { name: string; s: keyof typeof stateStyle }[] = [
		{ name: 'POS', s: 'live' }, { name: 'Shopee', s: 'live' }, { name: 'Lazada', s: 'live' },
		{ name: 'TikTok Shop', s: 'soon' }, { name: 'LINE Shopping', s: 'soon' }
	];
	const chats: { name: string; s: keyof typeof stateStyle }[] = [
		{ name: 'LINE OA', s: 'live' }, { name: 'Messenger', s: 'live' }, { name: 'Instagram', s: 'live' }
	];
	const stateLabel: Record<keyof typeof stateStyle, Bi> = {
		live: { en: 'Live', th: 'ใช้งานได้' },
		dev: { en: 'In development', th: 'กำลังพัฒนา' },
		soon: { en: 'Coming soon', th: 'เร็ว ๆ นี้' },
		off: { en: 'Not available', th: 'ยังไม่เปิด' }
	};
</script>

<figure class="min-w-0">
	<div aria-hidden="true">
		{#if visual === 'landed'}
			<div class="overflow-hidden rounded-xl border border-tnb-line bg-white shadow-[0_10px_30px_-12px_rgba(23,22,28,0.2)]">
				<div class="flex items-center justify-between border-b border-tnb-line bg-tnb-mist px-4 py-2.5 text-xs">
					<span class="font-semibold text-tnb-ink">RFQ · PR-2026-0142</span>
					<span class="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-blue-700">{t({ en: 'International mode', th: 'โหมดระหว่างประเทศ' })}</span>
				</div>
				<table class="w-full text-left text-[13px]">
					<thead class="text-[11px] text-tnb-ink-soft"><tr><th class="px-4 py-2 font-medium">{t({ en: 'Vendor', th: 'ผู้ขาย' })}</th><th class="px-2 py-2 text-right font-medium">{t({ en: 'Unit (THB)', th: 'ราคา/หน่วย (บาท)' })}</th><th class="px-4 py-2 text-right font-medium">{t({ en: 'Landed', th: 'ถึงคลัง' })}</th></tr></thead>
					<tbody>
						{#each quotes as q (q.v.en)}
							<tr class="border-t border-tnb-line {q.best ? 'bg-emerald-50/60' : ''}">
								<td class="px-4 py-2.5 text-tnb-ink">{t(q.v)}{#if q.best}<span class="ml-2 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">#1</span>{/if}</td>
								<td class="px-2 py-2.5 text-right tabular-nums text-tnb-ink-soft">{baht(q.unit)}</td>
								<td class="px-4 py-2.5 text-right font-semibold tabular-nums text-tnb-ink">{baht(q.landed)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<p class="border-t border-tnb-line px-4 py-2 text-[11px] text-tnb-ink-soft">{t({ en: 'Landed = price × FX + freight + duty + clearance', th: 'ต้นทุนถึงคลัง = ราคา × อัตราแลกเปลี่ยน + ค่าขนส่ง + อากร + พิธีการ' })}</p>
			</div>
		{:else if visual === 'channels'}
			<div class="grid gap-3 rounded-xl border border-tnb-line bg-white p-4 shadow-[0_10px_30px_-12px_rgba(23,22,28,0.2)] sm:grid-cols-[1fr_auto_1fr] sm:items-center">
				<div class="space-y-1.5">
					<p class="text-[11px] font-semibold uppercase tracking-wider text-tnb-ink-soft">{t({ en: 'Sales channels', th: 'ช่องทางขาย' })}</p>
					{#each channels as c (c.name)}<div class="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[13px] ring-1 {stateStyle[c.s]}"><span class="font-medium">{c.name}</span><span class="text-[10.5px]">{t(stateLabel[c.s])}</span></div>{/each}
				</div>
				<div class="mx-auto rounded-xl bg-orange-500 px-3 py-4 text-center text-xs font-semibold text-white">Tonbab<br />Commerce</div>
				<div class="space-y-1.5">
					<p class="text-[11px] font-semibold uppercase tracking-wider text-tnb-ink-soft">{t({ en: 'Chat inbox', th: 'กล่องแชท' })}</p>
					{#each chats as c (c.name)}<div class="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[13px] ring-1 {stateStyle[c.s]}"><span class="font-medium">{c.name}</span><span class="text-[10.5px]">{t(stateLabel[c.s])}</span></div>{/each}
				</div>
			</div>
		{:else if visual === 'wht'}
			<div class="mx-auto max-w-md rounded-sm border border-tnb-line bg-white p-5 font-sans text-[11.5px] leading-relaxed text-tnb-ink shadow-[0_10px_30px_-12px_rgba(23,22,28,0.25)]">
				<p class="text-center text-[13px] font-bold">หนังสือรับรองการหักภาษี ณ ที่จ่าย</p>
				<p class="text-center text-tnb-ink-soft">ตามมาตรา 50 ทวิ แห่งประมวลรัษฎากร</p>
				<div class="mt-3 grid grid-cols-2 gap-2">
					<div class="rounded border border-tnb-line p-2"><p class="text-[10px] text-tnb-ink-soft">ผู้มีหน้าที่หักภาษี</p><p class="font-semibold">บจก. ทองดี โฮมแวร์</p><p class="tabular-nums">0105569000000</p></div>
					<div class="rounded border border-tnb-line p-2"><p class="text-[10px] text-tnb-ink-soft">ผู้ถูกหักภาษี</p><p class="font-semibold">หจก. ช่างดี เซอร์วิส</p><p class="tabular-nums">0103560000000</p></div>
				</div>
				<table class="mt-3 w-full text-[11px]"><thead class="text-tnb-ink-soft"><tr><th class="text-left font-medium">ประเภทเงินได้</th><th class="text-right font-medium">จำนวนเงิน</th><th class="text-right font-medium">ภาษีที่หัก</th></tr></thead>
					<tbody><tr class="border-t border-tnb-line"><td class="py-1">ค่าบริการ 3%</td><td class="text-right tabular-nums">20,000.00</td><td class="text-right tabular-nums">600.00</td></tr></tbody></table>
				<p class="mt-2 text-tnb-ink-soft">(หกร้อยบาทถ้วน) · ภ.ง.ด.53</p>
			</div>
		{:else if visual === 'kiosk'}
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="rounded-[1.6rem] border-[8px] border-tnb-ink bg-white p-4 shadow-xl">
					<p class="text-center text-sm font-semibold text-tnb-ink">{t({ en: 'Pack station · PIN', th: 'สถานีแพ็ก · PIN' })}</p>
					<div class="mt-3 flex justify-center gap-2">{#each [0, 1, 2, 3] as d (d)}<span class="h-3 w-3 rounded-full {d < 3 ? 'bg-tnb-blue' : 'bg-tnb-line'}"></span>{/each}</div>
					<div class="mx-auto mt-3 grid max-w-48 grid-cols-3 gap-1.5">{#each ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'] as k, i (i)}<span class="flex h-9 items-center justify-center rounded-lg text-base font-semibold {k ? 'bg-tnb-wash text-tnb-ink' : ''}">{k}</span>{/each}</div>
				</div>
				<div class="rounded-xl border border-tnb-line bg-white p-4 text-[13px] shadow-[0_10px_30px_-12px_rgba(23,22,28,0.2)]">
					<p class="font-semibold text-tnb-ink">DN-2026-0539</p>
					{#each [{ n: { en: 'Ceramic mug 350 ml', th: 'แก้วเซรามิก 350 มล.' }, q: '6/6' }, { n: { en: 'Bamboo tray', th: 'ถาดไม้ไผ่' }, q: '2/2' }, { n: { en: 'Linen napkin set', th: 'ชุดผ้าเช็ดปาก' }, q: '1/3' }] as r (r.n.en)}
						<div class="mt-2 flex items-center justify-between rounded-lg bg-tnb-mist px-2.5 py-2"><span class="text-tnb-ink">{t(r.n)}</span><span class="font-semibold tabular-nums {r.q.split('/')[0] === r.q.split('/')[1] ? 'text-emerald-700' : 'text-amber-700'}">{r.q}</span></div>
					{/each}
					<p class="mt-3 rounded-lg bg-tnb-ink px-3 py-2 text-center text-xs font-semibold text-white">{t({ en: 'Scan next item…', th: 'สแกนชิ้นถัดไป…' })}</p>
				</div>
			</div>
		{:else if visual === 'egp'}
			<div class="overflow-hidden rounded-xl border border-tnb-line bg-white text-[13px] shadow-[0_10px_30px_-12px_rgba(23,22,28,0.2)]">
				<div class="border-b border-tnb-line bg-tnb-mist px-4 py-2.5 text-xs font-semibold text-tnb-ink">{t({ en: 'e-GP · today', th: 'e-GP · วันนี้' })}</div>
				{#each [{ a: { en: 'Provincial hospital', th: 'โรงพยาบาลจังหวัด' }, x: { en: 'Kitchen equipment, 1 lot', th: 'ครุภัณฑ์ครัว 1 ชุด' }, hit: true }, { a: { en: 'Municipality office', th: 'สำนักงานเทศบาล' }, x: { en: 'Office cleaning service', th: 'จ้างเหมาทำความสะอาด' }, hit: false }, { a: { en: 'University', th: 'มหาวิทยาลัย' }, x: { en: 'Stainless kitchenware', th: 'อุปกรณ์ครัวสเตนเลส' }, hit: true }] as r (r.x.en)}
					<div class="flex items-center justify-between gap-3 border-t border-tnb-line px-4 py-2.5 first:border-t-0 {r.hit ? '' : 'opacity-60'}">
						<div><p class="font-medium text-tnb-ink">{t(r.x)}</p><p class="text-[11.5px] text-tnb-ink-soft">{t(r.a)}</p></div>
						{#if r.hit}<span class="shrink-0 rounded-full bg-fuchsia-600 px-2.5 py-1 text-[11px] font-semibold text-white">+ {t({ en: 'Deal', th: 'ดีล' })}</span>{/if}
					</div>
				{/each}
			</div>
		{:else if visual === 'mobile'}
			<div class="mx-auto w-56 rounded-[2rem] border-[9px] border-tnb-ink bg-white p-3 shadow-2xl">
				<p class="text-xs font-semibold text-tnb-ink">{t({ en: 'Approvals', th: 'รออนุมัติ' })}</p>
				{#each [{ c: 'bg-blue-500', l: 'PR-0144 · ฿18,400' }, { c: 'bg-violet-500', l: t({ en: 'Leave · 2 days', th: 'ลาพักร้อน · 2 วัน' }) }, { c: 'bg-violet-500', l: 'OT · 3 h' }, { c: 'bg-blue-500', l: 'PO-0154 · ฿62,000' }] as r (r.l)}
					<div class="mt-2 flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-2 text-[11px]"><span class="h-2 w-2 rounded-full {r.c}"></span><span class="flex-1 text-tnb-ink">{r.l}</span><span class="font-bold text-emerald-600">✓</span></div>
				{/each}
			</div>
		{:else if visual === 'security'}
			<div class="space-y-2 rounded-xl border border-tnb-line bg-white p-4 text-[13px] shadow-[0_10px_30px_-12px_rgba(23,22,28,0.2)]">
				{#each [{ l: { en: 'Company A', th: 'บริษัท A' }, s: { en: 'row-level security', th: 'Row-Level Security' } }, { l: { en: 'Role: Purchasing', th: 'บทบาท: จัดซื้อ' }, s: { en: 'sees PR / PO / stock', th: 'เห็น PR / PO / สต็อก' } }, { l: { en: 'Tier: Salary', th: 'ชั้นสิทธิ์: เงินเดือน' }, s: { en: 'HR & Admin only', th: 'เฉพาะ HR และ Admin' } }] as r, i (r.l.en)}
					<div class="flex items-center justify-between rounded-lg px-3 py-2.5 ring-1 ring-tnb-line" style="margin-left:{i * 1.25}rem"><span class="font-semibold text-tnb-ink">{t(r.l)}</span><span class="text-tnb-ink-soft">{t(r.s)}</span></div>
				{/each}
			</div>
		{:else if visual === 'pos'}
			<div class="grid gap-3 rounded-xl border border-tnb-line bg-white p-3 shadow-[0_10px_30px_-12px_rgba(23,22,28,0.2)] sm:grid-cols-[1fr_12rem]">
				<div class="grid grid-cols-3 gap-2">
					{#each [{ n: { en: 'Latte', th: 'ลาเต้' }, p: 65 }, { n: { en: 'Mug', th: 'แก้วมัค' }, p: 290 }, { n: { en: 'Croissant', th: 'ครัวซองต์' }, p: 75 }, { n: { en: 'Beans 250 g', th: 'เมล็ด 250 ก.' }, p: 420 }, { n: { en: 'Tea', th: 'ชาไทย' }, p: 55 }, { n: { en: 'Tote bag', th: 'กระเป๋าผ้า' }, p: 190 }] as p (p.n.en)}
						<div class="rounded-lg bg-orange-50 p-2.5 text-[12px]"><p class="font-medium text-tnb-ink">{t(p.n)}</p><p class="text-orange-700 tabular-nums">{baht(p.p)}</p></div>
					{/each}
				</div>
				<div class="rounded-lg bg-tnb-mist p-3 text-[12px]">
					<p class="font-semibold text-tnb-ink">{t({ en: 'Bill', th: 'บิล' })} #0281</p>
					<div class="mt-2 flex justify-between"><span>{t({ en: 'Latte', th: 'ลาเต้' })} ×2</span><span class="tabular-nums">฿130</span></div>
					<div class="flex justify-between"><span>{t({ en: 'Mug', th: 'แก้วมัค' })}</span><span class="tabular-nums">฿290</span></div>
					<div class="mt-2 flex justify-between border-t border-tnb-line pt-2 font-semibold"><span>{t({ en: 'Total', th: 'รวม' })}</span><span class="tabular-nums">฿420</span></div>
					<p class="mt-3 rounded-lg bg-orange-500 py-2 text-center font-semibold text-white">PromptPay QR</p>
				</div>
			</div>
		{:else}
			<ProductMock module={visual === 'payroll' ? 'people' : 'operation'} {locale} />
		{/if}
	</div>
	<figcaption class="mt-3 text-center text-sm text-tnb-ink-soft">{t(caption[visual])}</figcaption>
</figure>
