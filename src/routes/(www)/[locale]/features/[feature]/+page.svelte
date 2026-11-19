<script lang="ts">
	import { localePath, toLocale } from '$lib/i18n';
	import { getFeature, features, type ChannelState } from '$lib/marketing/features-data';
	import { getModule } from '$lib/marketing/modules-data';
	import { SUITE_THEME } from '$lib/marketing/suite-data';
	import type { Bi } from '$lib/marketing/compare-data';
	import FeatureVisual from '$lib/components/www/FeatureVisual.svelte';
	import Breadcrumbs from '$lib/components/www/Breadcrumbs.svelte';
	import CtaBand from '$lib/components/www/CtaBand.svelte';
	import { ArrowRight, Check, Info } from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived(toLocale(data.locale));
	const t = (b: Bi | string) => (typeof b === 'string' ? b : locale === 'th' ? b.th : b.en);
	const f = $derived(getFeature(data.featureKey)!);
	const theme = $derived(SUITE_THEME[f.module]);
	const related = $derived(f.related.flatMap((k) => features.filter((x) => x.key === k)));
	const mods = $derived(f.modules.flatMap((k) => { const m = getModule(k); return m ? [m] : []; }));
	const th = $derived(locale === 'th');

	const STATE: Record<ChannelState, { label: Bi; cls: string }> = {
		live: { label: { en: 'Live', th: 'ใช้งานได้' }, cls: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
		dev: { label: { en: 'In development', th: 'กำลังพัฒนา' }, cls: 'bg-amber-50 text-amber-800 ring-amber-200' },
		soon: { label: { en: 'Coming soon', th: 'เร็ว ๆ นี้' }, cls: 'bg-sky-50 text-sky-700 ring-sky-200' },
		off: { label: { en: 'Not available yet', th: 'ยังไม่เปิด' }, cls: 'bg-slate-50 text-slate-600 ring-slate-200' }
	};
</script>

<article>
	<!-- Hero: answer-first -->
	<section class="bg-tnb-paper">
		<div class="container mx-auto max-w-6xl px-4 pt-8 pb-14">
			<Breadcrumbs {locale} items={[{ name: th ? 'ฟีเจอร์' : 'Features', path: '/features' }, { name: t(f.keyword) }]} />
			<div class="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
				<div>
					<p class="inline-flex items-center gap-2 rounded-full bg-tnb-mist px-3 py-1 text-sm font-semibold {theme.text}"><span class="h-2 w-2 rounded-full {theme.solid}" aria-hidden="true"></span>{t(f.eyebrow)}{#if f.ai}<span class="ml-1.5 inline-flex items-center gap-0.5 rounded-full border border-violet-300 bg-violet-50 px-1.5 py-px align-middle text-[10.5px] font-semibold text-violet-700" title="AI">✦ AI</span>{/if}</p>
					<h1 class="mt-4 text-4xl leading-tight font-bold tracking-tight text-balance text-tnb-ink sm:text-5xl">{t(f.h1)}</h1>
					<p class="mt-5 text-lg leading-relaxed text-tnb-ink-soft">{t(f.lede)}</p>
					<div class="mt-7 flex flex-wrap gap-3">
						<a href="https://app.tonbab.com/signup" class="btn-primary px-5 py-2.5">{th ? 'เริ่มใช้ฟรี' : 'Start free'}</a>
						<a href={localePath(locale, '/pricing')} class="btn-soft px-5 py-2.5">{th ? 'ดูราคา' : 'See pricing'}</a>
					</div>
				</div>
				<FeatureVisual visual={f.visual} {locale} />
			</div>
		</div>
	</section>

	<!-- Definition block — quotable, factual -->
	<section class="bg-tnb-mist">
		<div class="container mx-auto max-w-3xl px-4 py-14">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? `${t(f.keyword)} ของ Tonbab คืออะไร` : `What is Tonbab's ${t(f.keyword)}?`}</h2>
			<p class="mt-4 text-[17px] leading-relaxed text-tnb-ink">{t(f.answer)}</p>
			<p class="mt-5 flex gap-2 rounded-xl bg-white p-4 text-[15px] leading-relaxed text-tnb-ink-soft ring-1 ring-tnb-line"><Info class="mt-0.5 h-4 w-4 shrink-0 text-tnb-blue" aria-hidden="true" />{t(f.plan)}</p>
		</div>
	</section>

	<!-- Highlights -->
	<section class="bg-tnb-paper">
		<div class="container mx-auto max-w-6xl px-4 py-16">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink sm:text-3xl">{th ? 'ทำอะไรได้บ้าง' : 'What it does'}</h2>
			<ul class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each f.highlights as h (h.title.en)}
					<li class="rounded-xl border border-tnb-line p-6">
						<h3 class="flex items-start gap-2 font-semibold text-tnb-ink"><Check class="mt-0.5 h-4 w-4 shrink-0 {theme.text}" aria-hidden="true" />{t(h.title)}</h3>
						<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{t(h.body)}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	{#if f.statusRows}
		<section class="bg-tnb-mist">
			<div class="container mx-auto max-w-3xl px-4 py-14">
				<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'สถานะการเชื่อมต่อ' : 'Connection status'}</h2>
				<p class="mt-2 text-tnb-ink-soft">{th ? 'อัปเดต 17 พฤศจิกายน 2569 — เราแสดงตามจริง ไม่ประกาศสิ่งที่ยังไม่พร้อม' : 'Updated 17 November 2026 — we list things as they are, not as planned.'}</p>
				<div class="mt-6 overflow-hidden rounded-xl bg-white ring-1 ring-tnb-line">
					<table class="w-full text-left text-[15px]">
						<thead class="bg-tnb-paper text-sm text-tnb-ink-soft"><tr><th scope="col" class="px-4 py-3 font-medium">{th ? 'ช่องทาง' : 'Channel'}</th><th scope="col" class="px-4 py-3 font-medium">{th ? 'ประเภท' : 'Type'}</th><th scope="col" class="px-4 py-3 font-medium">{th ? 'สถานะ' : 'Status'}</th></tr></thead>
						<tbody>
							{#each f.statusRows as r (t(r.name))}
								<tr class="border-t border-tnb-line">
									<th scope="row" class="px-4 py-3 font-medium text-tnb-ink">{t(r.name)}{#if r.note}<span class="block text-xs font-normal text-tnb-ink-soft">{t(r.note)}</span>{/if}</th>
									<td class="px-4 py-3 text-tnb-ink-soft">{t(r.group)}</td>
									<td class="px-4 py-3"><span class="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 {STATE[r.state].cls}">{t(STATE[r.state].label)}</span></td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	{/if}

	<!-- FAQ (mirrored in FAQPage JSON-LD) -->
	<section class="bg-tnb-paper">
		<div class="container mx-auto max-w-3xl px-4 py-16">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink sm:text-3xl">{th ? 'คำถามที่พบบ่อย' : 'Frequently asked questions'}</h2>
			<div class="mt-8 space-y-3">
				{#each f.faq as q (q.q.en)}
					<div class="rounded-xl border border-tnb-line p-5">
						<h3 class="font-semibold text-tnb-ink">{t(q.q)}</h3>
						<p class="mt-2 leading-relaxed text-tnb-ink-soft">{t(q.a)}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Internal links: modules + related features -->
	<section class="bg-tnb-mist">
		<div class="container mx-auto max-w-6xl px-4 py-16">
			<h2 class="text-2xl font-bold tracking-tight text-tnb-ink">{th ? 'ที่เกี่ยวข้อง' : 'Related'}</h2>
			<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each mods as m (m.key)}
					<a href={localePath(locale, `/modules/${m.key}`)} class="group rounded-xl bg-white p-6 ring-1 ring-tnb-line transition hover:ring-tnb-blue">
						<p class="text-xs font-semibold tracking-wider text-tnb-ink-soft uppercase">{th ? 'โมดูล' : 'Module'}</p>
						<h3 class="mt-1 font-bold text-tnb-ink group-hover:text-tnb-blue">{t(m.name)}</h3>
						<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{t(m.tagline)}</p>
					</a>
				{/each}
				{#each related as r (r.key)}
					<a href={localePath(locale, `/features/${r.key}`)} class="group rounded-xl bg-white p-6 ring-1 ring-tnb-line transition hover:ring-tnb-blue">
						<p class="text-xs font-semibold tracking-wider text-tnb-ink-soft uppercase">{th ? 'ฟีเจอร์' : 'Feature'}</p>
						<h3 class="mt-1 font-bold text-tnb-ink group-hover:text-tnb-blue">{t(r.keyword)}</h3>
						<p class="mt-2 text-[15px] leading-relaxed text-tnb-ink-soft">{t(r.lede)}</p>
						<span class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-tnb-blue">{th ? 'อ่านต่อ' : 'Read more'}<ArrowRight class="h-4 w-4" aria-hidden="true" /></span>
					</a>
				{/each}
			</div>
		</div>
	</section>
</article>

<CtaBand {locale} />
