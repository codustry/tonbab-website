<script lang="ts">
	import { localePath, toLocale } from '$lib/i18n';
	import Breadcrumbs from '$lib/components/www/Breadcrumbs.svelte';
	import CtaBand from '$lib/components/www/CtaBand.svelte';
	import LogoWall from '$lib/components/www/LogoWall.svelte';
	import { ENTITY, PLAN_FACTS, SUPPORT_PACK_YEARLY, TRIAL_DAYS, SITE_UPDATED } from '$lib/seo/site';
	import { modulesContent } from '$lib/marketing/modules-data';
	import { features } from '$lib/marketing/features-data';
	import type { Bi } from '$lib/marketing/compare-data';
	import { whatFaq } from '$lib/marketing/about-data';

	let { data } = $props();
	const locale = $derived(toLocale(data.locale));
	const th = $derived(locale === 'th');
	const t = (b: Bi) => (locale === 'th' ? b.th : b.en);
	const baht = (n: number) => '฿' + n.toLocaleString('en-US');

	const facts = $derived<[string, string][]>([
		[th ? 'ชื่อ' : 'Name', 'Tonbab (ต้นแบบ)'],
		[th ? 'ประเภท' : 'Category', th ? 'ระบบ ERP ออนไลน์ (SaaS) สำหรับ SME' : 'Cloud ERP (SaaS) for SMEs'],
		[th ? 'ผู้พัฒนา' : 'Made by', th ? `${ENTITY.publisher.legalNameTh} (Codustry)` : ENTITY.publisher.legalName],
		[th ? 'ภาษา' : 'Languages', th ? 'ไทย (หลัก) และอังกฤษ' : 'Thai (primary) and English'],
		[th ? 'ใช้งานบน' : 'Runs on', th ? 'เว็บ, PWA, แอป iOS และ Android (มีโหมดคีออสก์)' : 'Web, PWA, iOS and Android apps (with kiosk mode)'],
		[th ? 'โมดูล' : 'Modules', 'Operation, Commerce, CRM, People, Service, Docs, ' + (th ? 'บัญชี (ทุกโมดูลมีในทุกแพ็กเกจ)' : 'Accounting (every module on every plan)')],
		[th ? 'ราคาเริ่มต้น' : 'Starting price', th ? `ฟรี; แพ็กเกจเสียเงินเริ่ม ${baht(2990)}/ปี (ก่อน VAT)` : `Free; paid plans from ${baht(2990)}/yr (before VAT)`],
		[th ? 'ทดลองใช้' : 'Trial', th ? `แพ็กเกจ Business ${TRIAL_DAYS} วัน แล้วใช้ต่อแบบ Free` : `${TRIAL_DAYS}-day Business trial, then Free`],
		[th ? 'เข้าใช้งาน' : 'Sign in', ENTITY.appUrl.replace('https://', '')],
		[th ? 'ติดต่อฝ่ายขาย' : 'Sales', `${ENTITY.email} · ${ENTITY.phoneDisplay}`]
	]);
</script>

<article>
	<section class="bg-tnb-paper">
		<div class="container mx-auto max-w-4xl px-4 pt-8 pb-14">
			<Breadcrumbs {locale} items={[{ name: th ? 'Tonbab คืออะไร' : 'What is Tonbab' }]} />
			<h1 class="mt-8 text-4xl leading-tight font-bold tracking-tight text-balance text-tnb-ink sm:text-5xl">{th ? 'Tonbab (ต้นแบบ) คืออะไร?' : 'What is Tonbab (ต้นแบบ)?'}</h1>
			<p class="mt-6 text-lg leading-relaxed text-tnb-ink">{t(whatFaq[0].a)}</p>
			<p class="mt-4 leading-relaxed text-tnb-ink-soft">{t(whatFaq[1].a)}</p>
			<p class="mt-4 text-sm text-tnb-ink-soft">{th ? 'ข้อมูล ณ' : 'Facts as of'} <time datetime={SITE_UPDATED}>{SITE_UPDATED}</time></p>
		</div>
	</section>

	<section class="bg-tnb-mist">
		<div class="container mx-auto max-w-4xl px-4 py-14">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'ข้อมูลโดยย่อ' : 'Key facts'}</h2>
			<dl class="mt-6 divide-y divide-tnb-line overflow-hidden rounded-xl bg-white ring-1 ring-tnb-line">
				{#each facts as [k, v] (k)}
					<div class="grid gap-1 px-5 py-3 sm:grid-cols-[12rem_1fr]"><dt class="text-sm font-medium text-tnb-ink-soft">{k}</dt><dd class="text-tnb-ink">{v}</dd></div>
				{/each}
			</dl>
		</div>
	</section>

	<section class="bg-tnb-paper">
		<div class="container mx-auto max-w-4xl px-4 py-14">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? '7 โมดูลในระบบเดียว' : 'Seven modules, one system'}</h2>
			<ul class="mt-6 space-y-3">
				{#each modulesContent as m (m.key)}
					<li class="rounded-xl border border-tnb-line p-5">
						<h3 class="font-semibold"><a href={localePath(locale, `/modules/${m.key}`)} class="text-tnb-ink hover:text-tnb-blue hover:underline">{t(m.name)}</a></h3>
						<p class="mt-1 text-[15px] leading-relaxed text-tnb-ink-soft">{t(m.tagline)}</p>
					</li>
				{/each}
			</ul>
			<h2 class="mt-12 text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'ฟีเจอร์เด่น' : 'Standout features'}</h2>
			<ul class="mt-4 grid gap-2 sm:grid-cols-2">
				{#each features as f (f.key)}<li><a href={localePath(locale, `/features/${f.key}`)} class="text-tnb-blue hover:underline">{t(f.keyword)}</a></li>{/each}
				<li><a href={localePath(locale, '/developers')} class="text-tnb-blue hover:underline">{th ? 'API และ MCP สำหรับ AI' : 'API and MCP for AI'}</a></li>
				<li><a href={localePath(locale, '/migration')} class="text-tnb-blue hover:underline">{th ? 'บริการย้ายข้อมูล' : 'Data migration'}</a></li>
			</ul>
		</div>
	</section>

	<section class="bg-tnb-mist">
		<div class="container mx-auto max-w-4xl px-4 py-14">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'ราคา (ต่อบริษัท ก่อน VAT 7%)' : 'Pricing (per company, before 7% VAT)'}</h2>
			<div class="mt-6 overflow-x-auto rounded-xl bg-white ring-1 ring-tnb-line">
				<table class="w-full text-left text-[15px]">
					<thead class="bg-tnb-paper text-sm text-tnb-ink-soft"><tr><th scope="col" class="px-4 py-3 font-medium">{th ? 'แพ็กเกจ' : 'Plan'}</th><th scope="col" class="px-4 py-3 text-right font-medium">{th ? 'ผู้ใช้' : 'Users'}</th><th scope="col" class="px-4 py-3 text-right font-medium">{th ? 'รายปี' : 'Yearly'}</th><th scope="col" class="px-4 py-3 text-right font-medium">{th ? 'รายเดือน' : 'Monthly'}</th><th scope="col" class="px-4 py-3 text-right font-medium">{th ? 'เครดิต AI/เดือน' : 'AI credits/mo'}</th></tr></thead>
					<tbody>
						{#each PLAN_FACTS as p (p.code)}
							<tr class="border-t border-tnb-line"><th scope="row" class="px-4 py-3 font-medium text-tnb-ink">{p.name}</th><td class="px-4 py-3 text-right tabular-nums">{p.seats}{p.from ? '+' : ''}</td><td class="px-4 py-3 text-right tabular-nums">{p.from ? (th ? 'เริ่มต้น ' : 'from ') : ''}{baht(p.yearly)}</td><td class="px-4 py-3 text-right tabular-nums text-tnb-ink-soft">{p.monthly === null ? (th ? 'รายปีเท่านั้น' : 'yearly only') : baht(p.monthly)}</td><td class="px-4 py-3 text-right tabular-nums text-tnb-ink-soft">{p.aiCredits.toLocaleString('en-US')}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="mt-3 text-sm text-tnb-ink-soft">{th ? `ทุกแพ็กเกจได้ทุกโมดูลและทุกฟีเจอร์ รวมถึงบัญชี ต่างกันที่ขนาด เช่น จำนวนผู้ใช้ พื้นที่ และเครดิต AI (งาน AI ส่วนใหญ่ใช้ 1 เครดิต งานที่หนักกว่าใช้มากกว่านั้น) แพ็กซัพพอร์ต Enterprise ${baht(SUPPORT_PACK_YEARLY)}/ปี` : `Every plan includes every module and feature, Accounting included; plans differ by size, such as users, storage and AI credits (most AI actions use 1 credit; heavier ones use more). Enterprise support pack ${baht(SUPPORT_PACK_YEARLY)}/yr.`} <a href={localePath(locale, '/pricing')} class="font-medium text-tnb-blue hover:underline">{th ? 'ดูรายละเอียดราคา' : 'Full pricing'}</a></p>
		</div>
	</section>

	<section class="bg-tnb-paper">
		<div class="container mx-auto max-w-4xl px-4 py-14">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'ใครใช้ Tonbab' : 'Who uses Tonbab'}</h2>
			<div class="mt-6"><LogoWall {locale} /></div>
			<h2 class="mt-14 text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'คำถามที่พบบ่อย' : 'FAQ'}</h2>
			<div class="mt-6 space-y-3">
				{#each whatFaq.slice(2) as q (q.q.en)}
					<div class="rounded-xl border border-tnb-line p-5"><h3 class="font-semibold text-tnb-ink">{t(q.q)}</h3><p class="mt-2 leading-relaxed text-tnb-ink-soft">{t(q.a)}</p></div>
				{/each}
			</div>
		</div>
	</section>
</article>

<CtaBand {locale} />
