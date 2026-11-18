<script lang="ts">
	import { localePath, toLocale } from '$lib/i18n';
	import { features } from '$lib/marketing/features-data';
	import { SUITE_THEME } from '$lib/marketing/suite-data';
	import type { Bi } from '$lib/marketing/compare-data';
	import Breadcrumbs from '$lib/components/www/Breadcrumbs.svelte';
	import CtaBand from '$lib/components/www/CtaBand.svelte';
	import { ArrowRight } from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived(toLocale(data.locale));
	const th = $derived(locale === 'th');
	const t = (b: Bi) => (locale === 'th' ? b.th : b.en);

	// Differentiators that live on their own canonical pages.
	const more: { href: string; title: Bi; body: Bi; badge?: Bi }[] = [
		{ href: '/modules/accounting', title: { th: 'โปรแกรมบัญชีไทย', en: 'Thai accounting' }, body: { th: 'ผังบัญชีไทย เอกสารครบสาย กระทบยอดธนาคารที่เรียนรู้ได้ หลายสกุลเงิน สินทรัพย์ งบการเงินสิ้นปี', en: 'Thai CoA, full document chain, learning bank reconciliation, multi-currency, fixed assets, year-end statements.' }, badge: { th: 'ตั้งแต่ Starter', en: 'From Starter' } },
		{ href: '/modules/crm', title: { th: 'ระบบ CRM และเซลส์ภาคสนาม', en: 'CRM and field sales' }, body: { th: 'ไปป์ไลน์ แผนเยี่ยมลูกค้า เช็คอิน GPS คิวถึงรอบสั่งซ้ำ และ KPI', en: 'Pipeline, visit plans, GPS check-ins, reorder-due queue and KPIs.' } },
		{ href: '/developers', title: { th: 'API และ MCP สำหรับ AI', en: 'API and MCP for AI' }, body: { th: 'REST API และ MCP ให้ Claude ChatGPT Zapier Make ทำงานกับข้อมูลของคุณตามสิทธิ์', en: 'REST API and MCP so Claude, ChatGPT, Zapier and Make work with your data within permissions.' } },
		{ href: '/migration', title: { th: 'บริการย้ายข้อมูล', en: 'Data migration service' }, body: { th: 'ย้ายจาก FlowAccount, PEAK, Express, Xero, QuickBooks และโปรแกรมอื่นผ่าน Excel', en: 'Move from FlowAccount, PEAK, Express, Xero, QuickBooks and others via Excel.' } }
	];
</script>

<section class="bg-tnb-paper">
	<div class="container mx-auto max-w-6xl px-4 pt-8 pb-14">
		<Breadcrumbs {locale} items={[{ name: th ? 'ฟีเจอร์' : 'Features' }]} />
		<h1 class="mt-8 max-w-3xl text-4xl leading-tight font-bold tracking-tight text-balance text-tnb-ink sm:text-5xl">{th ? 'ฟีเจอร์ที่ทำให้ Tonbab ต่างจากโปรแกรมทั่วไป' : 'What sets Tonbab apart'}</h1>
		<p class="mt-5 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">{th ? 'Tonbab (ต้นแบบ) คือระบบ ERP ภาษาไทยที่รวมจัดซื้อ สต็อก การผลิต หน้าร้าน งานขาย บุคคล และบัญชีไว้ในฐานข้อมูลเดียว ด้านล่างคือฟีเจอร์เด่นแต่ละเรื่อง พร้อมสถานะตามจริง' : 'Tonbab (ต้นแบบ) is a Thai-first ERP that keeps purchasing, stock, production, retail, sales, HR and accounting in one database. Below is each standout capability, with its real status.'}</p>

		<ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as f (f.key)}
				{@const theme = SUITE_THEME[f.module]}
				<li>
					<a href={localePath(locale, `/features/${f.key}`)} class="group flex h-full flex-col rounded-xl border border-tnb-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-tnb-blue hover:shadow-md">
						<p class="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase {theme.text}"><span class="h-2 w-2 rounded-full {theme.solid}" aria-hidden="true"></span>{t(f.eyebrow)}</p>
						<h2 class="mt-2 text-lg font-bold text-tnb-ink group-hover:text-tnb-blue">{t(f.keyword)}</h2>
						<p class="mt-2 flex-1 text-[15px] leading-relaxed text-tnb-ink-soft">{t(f.lede)}</p>
						<span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tnb-blue">{th ? 'ดูรายละเอียด' : 'Details'}<ArrowRight class="h-4 w-4" aria-hidden="true" /></span>
					</a>
				</li>
			{/each}
			{#each more as x (x.href)}
				<li>
					<a href={localePath(locale, x.href)} class="group flex h-full flex-col rounded-xl border border-dashed border-tnb-line bg-tnb-mist p-6 transition hover:border-tnb-blue">
						<h2 class="text-lg font-bold text-tnb-ink group-hover:text-tnb-blue">{t(x.title)}{#if x.badge}<span class="ml-2 rounded-full bg-white px-2 py-0.5 align-middle text-[11px] font-medium text-tnb-ink-soft">{t(x.badge)}</span>{/if}</h2>
						<p class="mt-2 flex-1 text-[15px] leading-relaxed text-tnb-ink-soft">{t(x.body)}</p>
						<span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tnb-blue">{th ? 'ดูรายละเอียด' : 'Details'}<ArrowRight class="h-4 w-4" aria-hidden="true" /></span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<CtaBand {locale} />
