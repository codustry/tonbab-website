<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Mail } from 'lucide-svelte';
</script>

<section class="bg-tnb-wash">
<div class="container mx-auto max-w-2xl px-4 py-24 text-center">
	<h1 class="text-4xl font-bold tracking-tight text-tnb-blue-deep sm:text-5xl">{m.mkt_pricing_title()}</h1>
	<p class="mt-6 text-lg leading-relaxed text-tnb-ink-soft">{m.mkt_pricing_body()}</p>
	<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
		<a
			href="mailto:hello@tonbab.com"
			class="inline-flex items-center gap-2 rounded-lg bg-tnb-amber px-7 py-3.5 font-semibold text-tnb-ink shadow-[0_2px_0_0] shadow-tnb-amber-deep transition hover:-translate-y-0.5"
		>
			<Mail class="h-4 w-4" aria-hidden="true" />
			{m.mkt_pricing_email_cta()}
		</a>
	</div>
	<p class="mt-6 text-sm text-tnb-ink-soft">{m.mkt_pricing_demo_note()}</p>
</div>
</section>
