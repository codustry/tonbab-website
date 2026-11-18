<script lang="ts">
	import { localePath, toLocale } from '$lib/i18n';
	import { getVendorCompare, relatedCompares, TONBAB_YEARLY } from '$lib/marketing/compare-vendors';
	import type { Bi } from '$lib/marketing/compare-data';
	import Breadcrumbs from '$lib/components/www/Breadcrumbs.svelte';
	import CtaBand from '$lib/components/www/CtaBand.svelte';
	import { ArrowRight, Check, ExternalLink } from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived(toLocale(data.locale));
	const th = $derived(locale === 'th');
	const t = (b: Bi) => (locale === 'th' ? b.th : b.en);
	const v = $derived(getVendorCompare(data.vendorSlug)!);
	const others = $derived(relatedCompares(v));
	const baht = (n: number) => '฿' + n.toLocaleString('en-US');
	const tonbabPlans = $derived([
		{ name: 'Free', price: '฿0', note: th ? '1 ผู้ใช้ · POS 1 เครื่อง · สินค้า 100 รายการ' : '1 user · 1 POS · 100 products' },
		{ name: 'Starter', price: baht(TONBAB_YEARLY.starter), note: th ? '5 ผู้ใช้ · บัญชี · ตรวจสลิป' : '5 users · accounting · slip checking' },
		{ name: 'Standard', price: baht(TONBAB_YEARLY.standard), note: th ? '10 ผู้ใช้ · เงินเดือน · ล็อต · RFQ' : '10 users · payroll · lots · RFQ' },
		{ name: 'Business', price: baht(TONBAB_YEARLY.business), note: th ? '25 ผู้ใช้ · ไม่จำกัดสินค้าและออเดอร์ · SSO' : '25 users · unlimited products and orders · SSO' },
		{ name: 'Enterprise', price: (th ? 'เริ่ม ' : 'from ') + baht(TONBAB_YEARLY.enterprise), note: th ? '100+ ผู้ใช้ · หลายบริษัท' : '100+ users · several companies' }
	]);
</script>

<article>
	<section class="bg-tnb-paper">
		<div class="container mx-auto max-w-4xl px-4 pt-8 pb-12">
			<Breadcrumbs {locale} items={[{ name: th ? 'เปรียบเทียบ' : 'Compare', path: '/compare' }, { name: `${v.name} vs Tonbab` }]} />
			<p class="mt-8 text-sm font-semibold text-tnb-blue">{t(v.keyword)}</p>
			<h1 class="mt-2 text-4xl leading-tight font-bold tracking-tight text-balance text-tnb-ink sm:text-5xl">{th ? `${v.name} กับ Tonbab ต่างกันอย่างไร?` : `${v.name} vs Tonbab: what's the difference?`}</h1>
			<p class="mt-6 text-lg leading-relaxed text-tnb-ink">{t(v.summary)}</p>
			<nav aria-label={th ? 'สารบัญ' : 'On this page'} class="mt-8 flex flex-wrap gap-2 text-sm">
				<a href="#side-by-side" class="rounded-full bg-tnb-mist px-3 py-1.5 text-tnb-ink hover:text-tnb-blue">{th ? 'ตารางเปรียบเทียบ' : 'Side by side'}</a>
				{#if v.plans.length || v.plansNote}<a href="#pricing" class="rounded-full bg-tnb-mist px-3 py-1.5 text-tnb-ink hover:text-tnb-blue">{th ? 'ราคา' : 'Pricing'}</a>{/if}
				{#if v.scenario}<a href="#cost" class="rounded-full bg-tnb-mist px-3 py-1.5 text-tnb-ink hover:text-tnb-blue">{th ? 'ตัวอย่างค่าใช้จ่าย' : 'Worked cost'}</a>{/if}
				<a href="#which" class="rounded-full bg-tnb-mist px-3 py-1.5 text-tnb-ink hover:text-tnb-blue">{th ? 'เลือกแบบไหนดี' : 'Which to choose'}</a>
				<a href="#faq" class="rounded-full bg-tnb-mist px-3 py-1.5 text-tnb-ink hover:text-tnb-blue">{th ? 'คำถามที่พบบ่อย' : 'FAQ'}</a>
			</nav>
		</div>
	</section>

	<section id="side-by-side" class="scroll-mt-20 bg-tnb-mist">
		<div class="container mx-auto max-w-4xl px-4 py-12">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? `ตารางเปรียบเทียบ ${v.name} กับ Tonbab` : `${v.name} and Tonbab side by side`}</h2>
			<div class="mt-6 overflow-x-auto rounded-xl bg-white ring-1 ring-tnb-line">
				<table class="w-full min-w-[36rem] text-left text-[15px]">
					<thead class="bg-tnb-paper text-sm text-tnb-ink-soft"><tr><th scope="col" class="w-1/4 px-4 py-3 font-medium"></th><th scope="col" class="px-4 py-3 font-semibold text-tnb-ink">{v.name}</th><th scope="col" class="px-4 py-3 font-semibold text-tnb-blue">Tonbab</th></tr></thead>
					<tbody>
						{#each v.rows as r (r.label.en)}
							<tr class="border-t border-tnb-line align-top"><th scope="row" class="px-4 py-3 font-medium text-tnb-ink">{t(r.label)}</th><td class="px-4 py-3 text-tnb-ink-soft">{t(r.them)}</td><td class="px-4 py-3 text-tnb-ink">{t(r.tonbab)}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>

	{#if v.plans.length || v.plansNote}
		<section id="pricing" class="scroll-mt-20 bg-tnb-paper">
			<div class="container mx-auto max-w-4xl px-4 py-12">
				<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? `ราคา ${v.name} เทียบกับ Tonbab` : `${v.name} pricing vs Tonbab pricing`}</h2>
				<p class="mt-2 text-sm text-tnb-ink-soft">{th ? 'ราคาต่อปี ก่อน VAT ตามที่ผู้ขายเผยแพร่' : 'Yearly prices before VAT, as each vendor publishes them'}</p>
				<div class="mt-6 grid gap-6 md:grid-cols-2">
					<div class="rounded-xl border border-tnb-line p-5">
						<h3 class="font-semibold text-tnb-ink">{v.name}</h3>
						{#if v.plans.length}
							<ul class="mt-3 divide-y divide-tnb-line">
								{#each v.plans as p (p.name.en)}
									<li class="py-3"><div class="flex flex-wrap items-baseline justify-between gap-x-3"><span class="font-medium text-tnb-ink">{t(p.name)}</span><span class="text-tnb-ink">{t(p.price)}</span></div><p class="mt-0.5 text-sm text-tnb-ink-soft">{t(p.note)}</p></li>
								{/each}
							</ul>
						{/if}
						{#if v.plansNote}<p class="mt-3 text-sm leading-relaxed text-tnb-ink-soft">{t(v.plansNote)}</p>{/if}
					</div>
					<div class="rounded-xl border-2 border-tnb-blue/40 bg-tnb-wash/40 p-5">
						<h3 class="font-semibold text-tnb-blue">Tonbab</h3>
						<ul class="mt-3 divide-y divide-tnb-line">
							{#each tonbabPlans as p (p.name)}
								<li class="py-3"><div class="flex flex-wrap items-baseline justify-between gap-x-3"><span class="font-medium text-tnb-ink">{p.name}</span><span class="text-tnb-ink">{p.price}{th ? '/ปี' : '/yr'}</span></div><p class="mt-0.5 text-sm text-tnb-ink-soft">{p.note}</p></li>
							{/each}
						</ul>
						<p class="mt-3 text-sm leading-relaxed text-tnb-ink-soft">{th ? 'ราคาต่อบริษัท ไม่ใช่ต่อคน ทุกแพ็กเกจได้ทุกโมดูล (บัญชีตั้งแต่ Starter)' : 'Per company, not per user. Every plan gets every module (accounting from Starter).'} <a href={localePath(locale, '/pricing')} class="font-medium text-tnb-blue hover:underline">{th ? 'ดูราคาทั้งหมด' : 'Full pricing'}</a></p>
					</div>
				</div>
			</div>
		</section>
	{/if}

	{#if v.scenario}
		<section id="cost" class="scroll-mt-20 bg-tnb-mist">
			<div class="container mx-auto max-w-4xl px-4 py-12">
				<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'ตัวอย่างค่าใช้จ่ายต่อปี' : 'A worked yearly cost'}</h2>
				<p class="mt-2 leading-relaxed text-tnb-ink-soft">{t(v.scenario.title)}</p>
				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					<div class="rounded-xl bg-white p-5 ring-1 ring-tnb-line">
						<p class="text-sm font-medium text-tnb-ink-soft">{v.name}</p>
						<p class="mt-1 text-2xl font-bold tracking-tight text-tnb-ink">{t(v.scenario.themTotal)}</p>
						<p class="mt-2 text-sm leading-relaxed text-tnb-ink-soft">{t(v.scenario.them)}</p>
					</div>
					<div class="rounded-xl bg-white p-5 ring-2 ring-tnb-blue/40">
						<p class="text-sm font-medium text-tnb-blue">Tonbab</p>
						<p class="mt-1 text-2xl font-bold tracking-tight text-tnb-ink">{t(v.scenario.tonbabTotal)}</p>
						<p class="mt-2 text-sm leading-relaxed text-tnb-ink-soft">{t(v.scenario.tonbab)}</p>
					</div>
				</div>
				{#if v.scenario.note}<p class="mt-4 text-sm leading-relaxed text-tnb-ink-soft">{t(v.scenario.note)}</p>{/if}
			</div>
		</section>
	{/if}

	<section class="bg-tnb-paper">
		<div class="container mx-auto max-w-3xl px-4 py-12">
			{#each v.sections as s (s.h.en)}
				<h2 class="mt-10 text-2xl font-bold tracking-tight text-tnb-ink first:mt-0">{t(s.h)}</h2>
				{#each s.p as para (para.en)}<p class="mt-4 text-[17px] leading-relaxed text-tnb-ink">{t(para)}</p>{/each}
			{/each}
		</div>
	</section>

	<section id="which" class="scroll-mt-20 bg-tnb-paper">
		<div class="container mx-auto grid max-w-4xl gap-6 px-4 pb-12 sm:grid-cols-2">
			<div class="rounded-xl border border-tnb-line p-6">
				<h2 class="text-lg font-bold text-tnb-ink">{th ? `เลือก ${v.name} ถ้า…` : `Choose ${v.name} if…`}</h2>
				<ul class="mt-3 list-disc space-y-2 pl-5 text-tnb-ink-soft">{#each v.chooseThem as c (c.en)}<li>{t(c)}</li>{/each}</ul>
			</div>
			<div class="rounded-xl border-2 border-tnb-blue/40 bg-tnb-wash/40 p-6">
				<h2 class="text-lg font-bold text-tnb-ink">{th ? 'เลือก Tonbab ถ้า…' : 'Choose Tonbab if…'}</h2>
				<ul class="mt-3 space-y-2 text-tnb-ink">{#each v.chooseTonbab as c (c.en)}<li class="flex gap-2"><Check class="mt-1 h-4 w-4 shrink-0 text-tnb-blue" aria-hidden="true" /><span>{t(c)}</span></li>{/each}</ul>
				<a href="https://app.tonbab.com/signup" class="btn-primary mt-5 inline-flex px-5 py-2.5">{th ? 'ทดลอง Business ฟรี 30 วัน' : 'Try Business free for 30 days'}</a>
			</div>
		</div>
	</section>

	<section id="faq" class="scroll-mt-20 bg-tnb-mist">
		<div class="container mx-auto max-w-3xl px-4 py-12">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'คำถามที่พบบ่อย' : 'Frequently asked questions'}</h2>
			<div class="mt-6 divide-y divide-tnb-line rounded-xl bg-white ring-1 ring-tnb-line">
				{#each v.faq as f (f.q.en)}
					<details class="group px-5 py-4">
						<summary class="cursor-pointer list-none font-medium text-tnb-ink marker:hidden">{t(f.q)}</summary>
						<p class="mt-3 leading-relaxed text-tnb-ink-soft">{t(f.a)}</p>
					</details>
				{/each}
			</div>
			<p class="mt-6 text-xs leading-relaxed text-tnb-ink-soft">
				{t(v.verified)}.
				{#each v.sources as s, i (s.url)}{i ? ' · ' : ' '}<a href={s.url} rel="nofollow noopener" target="_blank" class="inline-flex items-center gap-0.5 underline">{s.label}<ExternalLink class="h-3 w-3" aria-hidden="true" /></a>{/each}
				{th ? ' ราคาและฟีเจอร์อาจเปลี่ยนแปลง โปรดตรวจสอบกับผู้ขายโดยตรง ชื่อผลิตภัณฑ์เป็นเครื่องหมายการค้าของเจ้าของ' : ' Prices and features change — check with each vendor. Product names are trademarks of their owners.'}
			</p>
		</div>
	</section>

	<section class="bg-tnb-paper">
		<div class="container mx-auto max-w-4xl px-4 py-12">
			<p class="leading-relaxed text-tnb-ink-soft">{th ? `ใช้ ${v.name} อยู่และอยากย้ายมา? เรารับย้ายข้อมูลผ่าน Excel` : `Using ${v.name} and want to move? We migrate your data via Excel.`} <a href={localePath(locale, '/migration')} class="font-medium text-tnb-blue hover:underline">{th ? 'บริการย้ายข้อมูล' : 'Migration service'}</a></p>
			<h2 class="mt-8 text-lg font-bold text-tnb-ink">{th ? 'เปรียบเทียบอื่น ๆ' : 'More comparisons'}</h2>
			<ul class="mt-4 flex flex-wrap gap-3">
				{#each others as o (o.slug)}<li><a href={localePath(locale, `/compare/${o.slug}`)} class="inline-flex items-center gap-1 rounded-full bg-tnb-mist px-4 py-2 text-sm font-medium text-tnb-ink hover:text-tnb-blue">{o.name} vs Tonbab<ArrowRight class="h-4 w-4" aria-hidden="true" /></a></li>{/each}
				<li><a href={localePath(locale, '/compare')} class="inline-flex items-center gap-1 rounded-full bg-tnb-mist px-4 py-2 text-sm font-medium text-tnb-ink hover:text-tnb-blue">{th ? 'เปรียบเทียบทั้งหมด' : 'All comparisons'}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a></li>
			</ul>
		</div>
	</section>
</article>

<CtaBand {locale} />
