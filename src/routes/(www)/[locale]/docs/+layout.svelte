<script lang="ts">
	import { localePath, toLocale } from '$lib/i18n';
	import { page } from '$app/state';
	import { Search, BookOpen, ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: any; children: Snippet } = $props();
	const locale = $derived(toLocale(data.locale));
	const th = $derived(locale === 'th');
	const base = $derived(localePath(locale, '/docs'));
	const current = $derived(page.url.pathname.replace(base, ''));

	// Client-side search over a small prebuilt corpus (title + summary + text).
	let q = $state('');
	const results = $derived.by(() => {
		const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
		if (!terms.length) return [];
		return (data.docsSearch as { path: string; title: string; text: string }[])
			.map((d) => {
				const title = d.title.toLowerCase();
				const text = d.text.toLowerCase();
				let score = 0;
				for (const t of terms) {
					if (title.includes(t)) score += 5;
					else if (text.includes(t)) score += 1;
					else return { d, score: -1 };
				}
				return { d, score };
			})
			.filter((r) => r.score > 0)
			.sort((a, b) => b.score - a.score)
			.slice(0, 8)
			.map((r) => r.d);
	});
	let navOpen = $state(false);
</script>

<div class="border-b border-tnb-hair bg-tnb-mist">
	<div class="container mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
		<a href={base} class="inline-flex items-center gap-2 font-semibold text-tnb-ink"><BookOpen class="h-5 w-5 text-tnb-blue" aria-hidden="true" />{th ? 'คู่มือการใช้งาน Tonbab' : 'Tonbab Docs'}</a>
		<div class="relative w-full sm:w-80" role="search">
			<label for="docs-search" class="sr-only">{th ? 'ค้นหาคู่มือ' : 'Search the docs'}</label>
			<Search class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-tnb-ink-soft" aria-hidden="true" />
			<input id="docs-search" type="search" bind:value={q} autocomplete="off" placeholder={th ? 'ค้นหาคู่มือ เช่น 50 ทวิ, ใบขอซื้อ' : 'Search, e.g. 50 Tawi, purchase request'} class="w-full rounded-lg border border-tnb-line bg-white py-2 pr-3 pl-9 text-[15px] text-tnb-ink placeholder:text-tnb-ink-soft focus:border-tnb-blue focus:outline-none" />
			{#if q.trim()}
				<div class="absolute top-full right-0 left-0 z-30 mt-1 overflow-hidden rounded-lg border border-tnb-line bg-white shadow-lg">
					{#if results.length}
						<ul>
							{#each results as r (r.path)}
								<li><a href={base + r.path} onclick={() => (q = '')} class="block px-3 py-2 text-[15px] text-tnb-ink hover:bg-tnb-mist">{r.title}</a></li>
							{/each}
						</ul>
					{:else}
						<p class="px-3 py-2 text-sm text-tnb-ink-soft">{th ? 'ไม่พบหน้าที่ตรงกัน' : 'No matching pages'}</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<div class="container mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
	<aside class="lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">
		<button type="button" class="flex w-full items-center justify-between rounded-lg border border-tnb-line px-3 py-2 text-sm font-medium text-tnb-ink lg:hidden" aria-expanded={navOpen} aria-controls="docs-nav" onclick={() => (navOpen = !navOpen)}>
			{th ? 'สารบัญคู่มือ' : 'Docs menu'}<ChevronDown class="h-4 w-4 transition {navOpen ? 'rotate-180' : ''}" aria-hidden="true" />
		</button>
		<nav id="docs-nav" aria-label={th ? 'สารบัญคู่มือ' : 'Docs'} class="{navOpen ? 'block' : 'hidden'} mt-3 lg:mt-0 lg:block">
			{#each data.docsNav as s (s.key)}
				<p class="mt-5 mb-1.5 px-2 text-xs font-semibold tracking-wide text-tnb-ink-soft uppercase first:mt-0">{s.label}</p>
				<ul class="space-y-0.5">
					{#each s.pages as p (p.path)}
						<li>
							<a href={base + p.path} onclick={() => (navOpen = false)} aria-current={current === p.path ? 'page' : undefined} class="block rounded-md px-2 py-1.5 text-[14.5px] leading-snug {current === p.path ? 'bg-tnb-wash font-semibold text-tnb-blue-deep' : 'text-tnb-ink hover:bg-tnb-mist'}">{p.title}</a>
						</li>
					{/each}
				</ul>
			{/each}
		</nav>
	</aside>
	<div class="min-w-0">
		{@render children()}
	</div>
</div>
