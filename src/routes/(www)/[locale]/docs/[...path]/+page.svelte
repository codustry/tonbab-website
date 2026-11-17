<script lang="ts">
	import { localePath, toLocale } from '$lib/i18n';
	import { ArrowLeft, ArrowRight, Info } from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived(toLocale(data.locale));
	const th = $derived(locale === 'th');
	const href = (p: string) => localePath(locale, `/docs${p}`);
</script>

<div class="grid gap-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
	<article class="min-w-0">
		<nav aria-label={th ? 'เส้นทางหน้า' : 'Breadcrumb'} class="text-sm text-tnb-ink-soft">
			<a href={localePath(locale, '/docs')} class="hover:text-tnb-blue hover:underline">{th ? 'คู่มือ' : 'Docs'}</a> / <span>{data.doc.section}</span>
		</nav>
		<h1 class="mt-3 text-3xl leading-tight font-bold tracking-tight text-balance text-tnb-ink sm:text-4xl">{data.doc.title}</h1>
		{#if data.doc.earlyAccess}
			<p class="mt-4 flex gap-2 rounded-lg bg-tnb-mist p-3 text-sm text-tnb-ink"><Info class="mt-0.5 h-4 w-4 shrink-0 text-tnb-blue" aria-hidden="true" />{th ? 'โมดูลบัญชีเปิดใช้แบบเชิญ (Early access) — ติดต่อ sales@codustry.com' : 'Accounting is invitation-only early access — contact sales@codustry.com'}</p>
		{/if}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own reviewed Markdown -->
		<div class="doc-prose mt-6">{@html data.html}</div>
		{#if data.doc.updated}<p class="mt-10 text-xs text-tnb-ink-soft">{th ? 'อัปเดตล่าสุด' : 'Last updated'} <time datetime={data.doc.updated}>{data.doc.updated}</time></p>{/if}
		<nav class="mt-6 grid gap-3 border-t border-tnb-hair pt-6 sm:grid-cols-2" aria-label={th ? 'หน้าก่อนหน้าและถัดไป' : 'Previous and next'}>
			{#if data.prev}<a href={href(data.prev.path)} class="rounded-lg border border-tnb-line p-4 hover:border-tnb-blue"><span class="inline-flex items-center gap-1 text-xs text-tnb-ink-soft"><ArrowLeft class="h-3.5 w-3.5" aria-hidden="true" />{th ? 'ก่อนหน้า' : 'Previous'}</span><span class="mt-1 block font-medium text-tnb-ink">{data.prev.title}</span></a>{:else}<span></span>{/if}
			{#if data.next}<a href={href(data.next.path)} class="rounded-lg border border-tnb-line p-4 text-right hover:border-tnb-blue"><span class="inline-flex items-center gap-1 text-xs text-tnb-ink-soft">{th ? 'ถัดไป' : 'Next'}<ArrowRight class="h-3.5 w-3.5" aria-hidden="true" /></span><span class="mt-1 block font-medium text-tnb-ink">{data.next.title}</span></a>{/if}
		</nav>
	</article>
	{#if data.headings.length > 1}
		<aside class="hidden xl:block">
			<nav aria-label={th ? 'ในหน้านี้' : 'On this page'} class="sticky top-20 text-sm">
				<p class="font-semibold text-tnb-ink">{th ? 'ในหน้านี้' : 'On this page'}</p>
				<ul class="mt-2 space-y-1.5 border-l border-tnb-hair">
					{#each data.headings as h (h.id)}<li><a href="#{h.id}" class="-ml-px block border-l border-transparent py-0.5 {h.level === 3 ? 'pl-6' : 'pl-3'} text-tnb-ink-soft hover:border-tnb-blue hover:text-tnb-ink">{h.text}</a></li>{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>
