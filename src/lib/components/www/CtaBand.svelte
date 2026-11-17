<script lang="ts">
	import { ENTITY } from '$lib/seo/site';
	import { localePath } from '$lib/i18n';
	import type { Locale } from '$lib/server/content/types';
	import { Phone, Mail } from 'lucide-svelte';

	/** Closing call to action: start free + talk to sales (email / phone). */
	let { locale, title, body }: { locale: Locale; title?: string; body?: string } = $props();
	const th = $derived(locale === 'th');
</script>

<section class="relative overflow-hidden bg-tnb-ink">
	<div class="relative container mx-auto px-4 py-16 text-center">
		<h2 class="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">{title ?? (th ? 'เริ่มใช้ Tonbab ฟรีวันนี้' : 'Start on Tonbab for free today')}</h2>
		<p class="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">{body ?? (th ? `สมัครฟรี ทดลองแพ็กเกจ Business 30 วัน หมดช่วงทดลองใช้ต่อแบบ Free ได้ ข้อมูลไม่หาย` : `Sign up free with a 30-day Business trial; afterwards you continue on Free and keep your data.`)}</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<a href={ENTITY.signupUrl} class="btn-primary px-6 py-3 text-base">{th ? 'เริ่มใช้ฟรี' : 'Start free'}</a>
			<a href={localePath(locale, '/pricing')} class="inline-flex items-center rounded-lg px-6 py-3 text-base font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10">{th ? 'ดูราคา' : 'See pricing'}</a>
		</div>
		<p class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
			<span>{th ? 'คุยกับทีมขาย / ขอเดโม:' : 'Talk to sales / book a demo:'}</span>
			<a href={`mailto:${ENTITY.email}`} class="inline-flex items-center gap-1.5 text-white hover:underline"><Mail class="h-4 w-4" aria-hidden="true" />{ENTITY.email}</a>
			<a href={`tel:${ENTITY.phone.replace(/-/g, '')}`} class="inline-flex items-center gap-1.5 text-white hover:underline"><Phone class="h-4 w-4" aria-hidden="true" />{ENTITY.phoneDisplay}</a>
		</p>
	</div>
</section>
