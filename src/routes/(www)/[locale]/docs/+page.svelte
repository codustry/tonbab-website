<script lang="ts">
	import { localePath, toLocale } from '$lib/i18n';
	import { ArrowRight } from 'lucide-svelte';

	let { data } = $props();
	const locale = $derived(toLocale(data.locale));
	const th = $derived(locale === 'th');
</script>

<h1 class="text-4xl leading-tight font-bold tracking-tight text-tnb-ink">{data.title}</h1>
<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own reviewed Markdown -->
<div class="doc-prose mt-4">{@html data.intro}</div>

<div class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
	{#each data.docsNav as s (s.key)}
		<section class="rounded-xl border border-tnb-line p-5">
			<h2 class="font-bold text-tnb-ink">{s.label}</h2>
			<ul class="mt-3 space-y-1.5">
				{#each s.pages.slice(0, 6) as p (p.path)}
					<li><a href={localePath(locale, `/docs${p.path}`)} class="text-[15px] text-tnb-blue hover:underline">{p.title}</a></li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<div class="mt-10 rounded-xl bg-tnb-mist p-6">
	<p class="font-semibold text-tnb-ink">{th ? 'ไม่พบสิ่งที่ต้องการ?' : "Can't find what you need?"}</p>
	<p class="mt-1 text-tnb-ink-soft">{th ? 'ทีมเราช่วยตั้งค่าและตอบคำถามได้' : 'Our team can help you set up and answer questions'}: <a href="mailto:sales@codustry.com" class="text-tnb-blue hover:underline">sales@codustry.com</a> · <a href="tel:028734448" class="text-tnb-blue hover:underline">02-873-4448</a></p>
	<p class="mt-3"><a href="https://api.tonbab.com/docs" class="inline-flex items-center gap-1 font-medium text-tnb-blue hover:underline">{th ? 'เอกสารอ้างอิง API' : 'API reference'}<ArrowRight class="h-4 w-4" aria-hidden="true" /></a></p>
</div>
