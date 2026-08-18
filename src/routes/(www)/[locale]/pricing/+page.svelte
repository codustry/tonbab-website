<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Mail } from 'lucide-svelte';
</script>

<section class="container mx-auto max-w-2xl px-4 py-20 text-center">
	<h1 class="text-4xl font-bold">{m.mkt_pricing_title()}</h1>
	<p class="mt-6 text-lg text-muted-foreground">{m.mkt_pricing_body()}</p>
	<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
		<a
			href="mailto:hello@tonbab.com"
			class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
		>
			<Mail class="h-4 w-4" aria-hidden="true" />
			{m.mkt_pricing_email_cta()}
		</a>
	</div>
	<p class="mt-6 text-sm text-muted-foreground">{m.mkt_pricing_demo_note()}</p>
</section>
