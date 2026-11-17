<script lang="ts">
	import { localePath, toLocale } from '$lib/i18n';
	import Breadcrumbs from '$lib/components/www/Breadcrumbs.svelte';
	import CtaBand from '$lib/components/www/CtaBand.svelte';
	import { migrationFaq } from '$lib/marketing/migration-data';
	import type { Bi } from '$lib/marketing/compare-data';
	import { FileSpreadsheet, ArrowRight, Check } from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived(toLocale(data.locale));
	const th = $derived(locale === 'th');
	const t = (b: Bi) => (locale === 'th' ? b.th : b.en);

	const sources = ['FlowAccount', 'PEAK', 'Express', 'Xero', 'QuickBooks', 'Excel'];
	const what: Bi[] = [
		{ th: 'รายชื่อลูกค้าและผู้ขาย พร้อมเลขผู้เสียภาษีและที่อยู่', en: 'Customers and vendors with tax IDs and addresses' },
		{ th: 'สินค้า หน่วยนับ และยอดสต็อกยกมาพร้อมต้นทุน', en: 'Products, units and opening stock with cost' },
		{ th: 'ผังบัญชีและยอดยกมา', en: 'Chart of accounts and opening balances' },
		{ th: 'สมุดรายวันย้อนหลัง', en: 'Past journal vouchers' },
		{ th: 'ใบเสนอราคา ใบกำกับภาษี ใบเสร็จ', en: 'Quotations, tax invoices and receipts' },
		{ th: 'ค่าใช้จ่าย การจ่ายเงิน และภาษีหัก ณ ที่จ่าย', en: 'Expenses, payments and withholding tax' }
	];
	const steps: { title: Bi; body: Bi }[] = [
		{ title: { th: 'สมัครฟรี', en: 'Sign up free' }, body: { th: 'สร้างบริษัทที่ app.tonbab.com ได้ทดลองแพ็กเกจ Business 30 วัน', en: 'Create your company at app.tonbab.com with a 30-day Business trial.' } },
		{ title: { th: 'ส่งออกจากโปรแกรมเดิม', en: 'Export from your current software' }, body: { th: 'ส่งออกรายงานและรายการเป็น Excel ตามรายการที่เราแนะนำ', en: 'Export reports and lists to Excel from the checklist we give you.' } },
		{ title: { th: 'นำเข้าและตรวจ', en: 'Import and check' }, body: { th: 'นำเข้าเองหรือให้ทีมเราทำ แล้วตรวจยอดคงเหลือและงบทดลองให้ตรงกับระบบเดิม', en: 'Import yourself or let our team do it, then check balances and the trial balance against the old system.' } },
		{ title: { th: 'ตั้งค่าและใช้งานจริง', en: 'Configure and go live' }, body: { th: 'ตั้งภาษี คลัง สายอนุมัติ บทบาท แล้วเปิดใช้ทีละโมดูล', en: 'Set tax, warehouses, approvals and roles, then switch on one module at a time.' } }
	];
</script>

<section class="bg-tnb-paper">
	<div class="container mx-auto max-w-6xl px-4 pt-8 pb-14">
		<Breadcrumbs {locale} items={[{ name: th ? 'ย้ายข้อมูล' : 'Migration' }]} />
		<h1 class="mt-8 max-w-3xl text-4xl leading-tight font-bold tracking-tight text-balance text-tnb-ink sm:text-5xl">{th ? 'ย้ายมา Tonbab ได้ โดยไม่ทิ้งประวัติเดิม' : 'Move to Tonbab without leaving your history behind'}</h1>
		<p class="mt-5 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">{th ? 'ย้ายข้อมูลจาก FlowAccount, PEAK, Express, Xero, QuickBooks และโปรแกรมบัญชีอื่น ๆ (ผ่าน Excel) ทั้งข้อมูลหลักและเอกสารย้อนหลัง ทำเองได้ฟรี หรือให้ทีมเราย้ายให้' : 'Bring your data from FlowAccount, PEAK, Express, Xero, QuickBooks and other accounting software (via Excel) — master data and past documents. Do it yourself for free, or let our team do it.'}</p>
		<ul class="mt-8 flex flex-wrap gap-2" aria-label={th ? 'ระบบต้นทาง' : 'Source systems'}>
			{#each sources as s (s)}<li class="inline-flex items-center gap-1.5 rounded-full bg-tnb-mist px-3.5 py-1.5 text-sm font-semibold text-tnb-ink"><FileSpreadsheet class="h-4 w-4 text-tnb-blue" aria-hidden="true" />{s}</li>{/each}
			<li class="rounded-full px-3.5 py-1.5 text-sm text-tnb-ink-soft">{th ? 'และโปรแกรมอื่น ๆ' : 'and others'}</li>
		</ul>
		<p class="mt-3 text-xs text-tnb-ink-soft">{th ? 'ชื่อโปรแกรมเป็นเครื่องหมายการค้าของเจ้าของแต่ละราย Tonbab ไม่มีความเกี่ยวข้องกับผู้พัฒนาเหล่านั้น' : 'Product names are trademarks of their owners; Tonbab is not affiliated with them.'}</p>
	</div>
</section>

<section class="bg-tnb-mist">
	<div class="container mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'ย้ายอะไรได้บ้าง' : 'What moves over'}</h2>
			<ul class="mt-6 space-y-3">
				{#each what as w (w.en)}<li class="flex gap-2.5 text-tnb-ink"><Check class="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{t(w)}</li>{/each}
			</ul>
			<p class="mt-6 text-[15px] leading-relaxed text-tnb-ink-soft">{th ? 'เอกสารที่นำเข้าเชื่อมกับรายการบัญชีที่ย้ายมา จึงไม่ลงบัญชีซ้ำ และยอดคงเหลือตรงกับระบบเดิม' : 'Imported documents link to the migrated vouchers, so nothing is posted twice and balances match the old system.'}</p>
		</div>
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'ขั้นตอน' : 'How it works'}</h2>
			<ol class="mt-6 space-y-4">
				{#each steps as s, i (s.title.en)}
					<li class="flex gap-4 rounded-xl bg-white p-5 ring-1 ring-tnb-line"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tnb-blue text-sm font-bold text-white">{i + 1}</span><div><h3 class="font-semibold text-tnb-ink">{t(s.title)}</h3><p class="mt-1 text-[15px] leading-relaxed text-tnb-ink-soft">{t(s.body)}</p></div></li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<section class="bg-tnb-paper">
	<div class="container mx-auto max-w-3xl px-4 py-16">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink sm:text-3xl">{th ? 'คำถามที่พบบ่อยเรื่องการย้ายข้อมูล' : 'Migration FAQ'}</h2>
		<div class="mt-8 space-y-3">
			{#each migrationFaq as q (q.q.en)}
				<div class="rounded-xl border border-tnb-line p-5"><h3 class="font-semibold text-tnb-ink">{t(q.q)}</h3><p class="mt-2 leading-relaxed text-tnb-ink-soft">{t(q.a)}</p></div>
			{/each}
		</div>
		<p class="mt-8"><a href={localePath(locale, '/compare')} class="inline-flex items-center gap-1 font-medium text-tnb-blue hover:underline">{th ? 'เทียบ Tonbab กับโปรแกรมอื่น' : 'Compare Tonbab with other software'}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a></p>
	</div>
</section>

<CtaBand {locale} title={th ? 'คุยกับทีมเรื่องการย้ายข้อมูล' : 'Talk to us about migrating'} />
