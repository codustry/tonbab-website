<script lang="ts">
	import { localePath, toLocale } from '$lib/i18n';
	import Breadcrumbs from '$lib/components/www/Breadcrumbs.svelte';
	import LogoWall from '$lib/components/www/LogoWall.svelte';
	import CtaBand from '$lib/components/www/CtaBand.svelte';
	import { realStats } from '$lib/marketing/suite-data';

	let { data } = $props();
	const locale = $derived(toLocale(data.locale));
	const th = $derived(locale === 'th');
</script>

<section class="bg-tnb-paper">
	<div class="container mx-auto max-w-6xl px-4 pt-8 pb-16">
		<Breadcrumbs {locale} items={[{ name: th ? 'ลูกค้า' : 'Customers' }]} />
		<h1 class="mt-8 max-w-3xl text-4xl leading-tight font-bold tracking-tight text-balance text-tnb-ink sm:text-5xl">{th ? 'บริษัทไทยที่ทำงานบน Tonbab ทุกวัน' : 'Thai companies that run on Tonbab every day'}</h1>
		<p class="mt-5 max-w-2xl text-lg leading-relaxed text-tnb-ink-soft">{th ? 'ตั้งแต่โรงงานและผู้จัดจำหน่าย ถึงแบรนด์สินค้าและงานก่อสร้าง — ลูกค้าเหล่านี้ใช้ Tonbab อยู่จริงและอนุญาตให้แสดงชื่อและโลโก้' : 'From factories and distributors to consumer brands and construction — these customers use Tonbab today and agreed to be named.'}</p>
		<div class="mt-12"><LogoWall {locale} showIndustry /></div>
		<p class="mt-4 text-sm text-tnb-ink-soft">{th ? 'Codustry ผู้พัฒนา Tonbab ใช้ระบบนี้เองทุกวันด้วย' : 'Codustry, the company behind Tonbab, runs on it every day too.'}</p>
	</div>
</section>

<section class="bg-tnb-mist">
	<div class="container mx-auto max-w-6xl px-4 py-14">
		<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'ตัวเลขจริงจากระบบที่ใช้งาน' : 'Real numbers from live workspaces'}</h2>
		<dl class="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
			{#each realStats as s (s.value)}
				<div class="rounded-xl bg-white p-5 ring-1 ring-tnb-line"><dt class="text-sm text-tnb-ink-soft">{th ? s.label.th : s.label.en}</dt><dd class="mt-1 text-3xl font-bold text-tnb-blue-deep tabular-nums">{s.value}</dd></div>
			{/each}
		</dl>
		<p class="mt-4 text-xs text-tnb-ink-soft">{th ? 'นับจากระบบลูกค้าที่ใช้งานอยู่ พฤศจิกายน 2569' : 'Counted from live customer workspaces, November 2026.'}</p>
		<p class="mt-8 max-w-2xl leading-relaxed text-tnb-ink">{th ? 'อยากคุยกับผู้ใช้จริงก่อนตัดสินใจ? ทีมขายนัดให้ได้ (เราขออนุญาตลูกค้าก่อนทุกครั้ง)' : 'Want to talk to a real user before deciding? Our sales team can arrange it (we always ask the customer first).'} <a href={localePath(locale, '/story')} class="font-medium text-tnb-blue hover:underline">{th ? 'อ่านเรื่องราวของ Tonbab' : 'Read the Tonbab story'}</a></p>
	</div>
</section>

<CtaBand {locale} />
