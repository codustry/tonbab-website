<script lang="ts">
	/**
	 * Full-screen presenter for the Tonbab customer deck (1920×1080 slides,
	 * scaled to fit). Keys: → ↓ Space PageDown = next · ← ↑ PageUp = back ·
	 * Home/End · F = fullscreen · N = speaker notes · G = slide grid.
	 * Click right/left half or swipe to move. ?s=12 or #12 deep-links a slide.
	 * Print (Cmd/Ctrl+P) gives one slide per page.
	 *
	 * Source: src/content/pitch (Slides artifact export) → pnpm pitch:build.
	 */
	import '@fontsource/plus-jakarta-sans/400.css';
	import '@fontsource/plus-jakarta-sans/700.css';
	import '@fontsource/plus-jakarta-sans/800.css';
	import '@fontsource/anuphan/400.css';
	import '@fontsource/anuphan/600.css';
	import '@fontsource/anuphan/700.css';
	import '@fontsource/noto-sans-thai-looped/400.css';
	import '@fontsource/noto-sans-thai-looped/600.css';
	import '@fontsource/noto-sans-thai-looped/700.css';
	import { deckCss, deckTitle, slides } from '$lib/pitch/deck.generated';
	import { onMount } from 'svelte';

	const total = slides.length;
	let idx = $state(0);
	let notes = $state(false);
	let grid = $state(false);
	let scale = $state(0.5);
	let stageEl: HTMLDivElement | undefined = $state();
	let chrome = $state(true);
	let hideTimer: ReturnType<typeof setTimeout> | undefined;

	const go = (i: number) => {
		idx = Math.max(0, Math.min(total - 1, i));
		history.replaceState(history.state, '', `#${idx + 1}`);
	};
	const next = () => go(idx + 1);
	const prev = () => go(idx - 1);

	function fit() {
		const w = window.innerWidth;
		const h = window.innerHeight - (notes ? Math.min(220, window.innerHeight * 0.3) : 0);
		scale = Math.min(w / 1920, h / 1080);
	}
	function toggleFullscreen() {
		if (document.fullscreenElement) document.exitFullscreen();
		else document.documentElement.requestFullscreen?.();
	}
	function poke() {
		chrome = true;
		clearTimeout(hideTimer);
		hideTimer = setTimeout(() => (chrome = false), 2500);
	}

	onMount(() => {
		const fromHash = parseInt(location.hash.slice(1), 10);
		const fromQuery = parseInt(new URLSearchParams(location.search).get('s') ?? '', 10);
		const start = fromHash || fromQuery;
		if (start) idx = Math.max(0, Math.min(total - 1, start - 1));
		fit();
		poke();
		window.addEventListener('resize', fit);
		const onHash = () => {
			const n = parseInt(location.hash.slice(1), 10);
			if (n && n - 1 !== idx) idx = Math.max(0, Math.min(total - 1, n - 1));
		};
		window.addEventListener('hashchange', onHash);
		// Printing needs every screenshot, not just the ones already viewed.
		const eager = () => document.querySelectorAll<HTMLImageElement>('.slide img[loading="lazy"]').forEach((im) => (im.loading = 'eager'));
		window.addEventListener('beforeprint', eager);
		return () => {
			window.removeEventListener('resize', fit);
			window.removeEventListener('hashchange', onHash);
			window.removeEventListener('beforeprint', eager);
		};
	});
	$effect(() => {
		void notes;
		fit();
	});
	// Warm the next slide's images so advancing never shows a blank frame.
	$effect(() => {
		const n = stageEl?.querySelectorAll<HTMLElement>('.slide')[idx + 1];
		n?.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((im) => (im.loading = 'eager'));
	});

	function onKey(e: KeyboardEvent) {
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		const k = e.key;
		if (['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter'].includes(k)) { e.preventDefault(); next(); }
		else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
		else if (k === 'Home') go(0);
		else if (k === 'End') go(total - 1);
		else if (k === 'f' || k === 'F') toggleFullscreen();
		else if (k === 'n' || k === 'N') notes = !notes;
		else if (k === 'g' || k === 'G' || (k === 'Escape' && grid)) grid = !grid;
		poke();
	}

	// Click/tap: right 2/3 = next, left 1/3 = back. Swipe horizontally.
	let touchX = 0;
	let touchY = 0;
	function onStageClick(e: MouseEvent) {
		if ((e.target as HTMLElement).closest('a,button')) return;
		if (e.clientX < window.innerWidth / 3) prev();
		else next();
	}
	function onTouchStart(e: TouchEvent) {
		touchX = e.touches[0].clientX;
		touchY = e.touches[0].clientY;
	}
	function onTouchEnd(e: TouchEvent) {
		const dx = e.changedTouches[0].clientX - touchX;
		const dy = e.changedTouches[0].clientY - touchY;
		if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
	}
</script>

<svelte:head>
	<title>{deckTitle}</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- generated, scoped deck CSS from our own repo -->
	{@html `<style>${deckCss}</style>`}
</svelte:head>

<svelte:window onkeydown={onKey} onmousemove={poke} />

<div class="pitch-root" class:notes-open={notes}>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div class="viewport" onclick={onStageClick} ontouchstart={onTouchStart} ontouchend={onTouchEnd}>
		<div class="deck stage" bind:this={stageEl} style="transform: translate(-50%, -50%) scale({scale})">
			{#each slides as s, i (s.id)}
				<div class="slide" class:active={i === idx} aria-hidden={i !== idx} role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${total}`}>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- deck slides from our own repo (src/content/pitch) -->
					{@html s.html}
				</div>
			{/each}
		</div>
	</div>

	{#if notes}
		<aside class="notes" aria-label="Speaker notes">
			<p class="notes-head">โน้ตผู้พูด · {idx + 1} / {total}{#if slides[idx].section} · {slides[idx].section}{/if}</p>
			<p class="notes-body">{slides[idx].notes || '—'}</p>
			{#if idx + 1 < total}<p class="notes-next">ถัดไป: {slides[idx + 1].id}</p>{/if}
		</aside>
	{/if}

	<div class="bar" class:hidden={!chrome && !notes}>
		<button type="button" onclick={prev} aria-label="ก่อนหน้า" disabled={idx === 0}>‹</button>
		<span class="count" aria-live="polite">{idx + 1} / {total}</span>
		<button type="button" onclick={next} aria-label="ถัดไป" disabled={idx === total - 1}>›</button>
		<span class="sep"></span>
		<button type="button" onclick={() => (grid = !grid)} aria-pressed={grid} title="G">ทุกสไลด์</button>
		<button type="button" onclick={() => (notes = !notes)} aria-pressed={notes} title="N">โน้ต</button>
		<button type="button" onclick={toggleFullscreen} title="F">เต็มจอ</button>
		<button type="button" onclick={() => window.print()} title="PDF">พิมพ์ / PDF</button>
	</div>

	{#if grid}
		<div class="grid" role="dialog" aria-label="ทุกสไลด์">
			<button type="button" class="grid-close" onclick={() => (grid = false)}>ปิด (Esc)</button>
			<ol>
				{#each slides as s, i (s.id)}
					<li>
						<button type="button" class:current={i === idx} onclick={() => { go(i); grid = false; }}>
							<span class="num">{i + 1}</span>
							<span class="title">{s.section ?? s.id}</span>
						</button>
					</li>
				{/each}
			</ol>
		</div>
	{/if}
</div>

<style>
	:global(html), :global(body) { margin: 0; height: 100%; background: #0e0d12; overflow: hidden; }
	.pitch-root { position: fixed; inset: 0; color: #fff; font-family: 'Noto Sans Thai Looped', 'Plus Jakarta Sans', sans-serif; }
	.viewport { position: absolute; inset: 0; cursor: pointer; }
	.notes-open .viewport { bottom: min(220px, 30vh); }
	.stage { position: absolute; left: 50%; top: 50%; width: 1920px; height: 1080px; transform-origin: center; }
	/* The deck was authored on the Slides runtime's reset — recreate it here. */
	.stage :global(*) { margin: 0; box-sizing: border-box; }
	.stage :global(table) { border-collapse: collapse; }
	.stage :global(img) { display: block; max-width: none; }
	.stage :global(td), .stage :global(th) { text-align: left; }
	.stage :global(table.cmp td) { padding: 9px 14px; }
	.stage :global(table.law td) { padding: 14px 20px; }
	.slide { position: absolute; inset: 0; display: none; }
	.slide.active { display: block; }
	.slide :global(section) { position: absolute; inset: 0; box-sizing: border-box; overflow: hidden; }
	.slide :global(.x-icon) { width: 30px; height: 30px; color: #fdfcfa; }
	.bar { position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; background: rgba(23, 22, 28, 0.82); backdrop-filter: blur(6px); transition: opacity 0.3s; z-index: 5; font-size: 14px; }
	.notes-open .bar { bottom: calc(min(220px, 30vh) + 12px); }
	.bar.hidden { opacity: 0; pointer-events: none; }
	.bar button { background: transparent; color: #fff; border: 0; padding: 6px 10px; border-radius: 999px; font: inherit; cursor: pointer; }
	.bar button:hover:not(:disabled), .bar button[aria-pressed='true'] { background: rgba(255, 255, 255, 0.16); }
	.bar button:disabled { opacity: 0.35; cursor: default; }
	.bar .count { min-width: 64px; text-align: center; font-variant-numeric: tabular-nums; }
	.bar .sep { width: 1px; height: 18px; background: rgba(255, 255, 255, 0.25); margin: 0 4px; }
	.notes { position: absolute; left: 0; right: 0; bottom: 0; height: min(220px, 30vh); overflow-y: auto; box-sizing: border-box; padding: 16px 24px; background: #17161c; border-top: 1px solid #34333d; }
	.notes-head { margin: 0; font-size: 13px; color: #f5a623; font-weight: 600; }
	.notes-body { margin: 8px 0 0; font-size: 18px; line-height: 1.6; color: #e9e7ef; max-width: 1100px; }
	.notes-next { margin: 8px 0 0; font-size: 13px; color: #9b99a6; }
	.grid { position: absolute; inset: 0; z-index: 10; overflow-y: auto; background: rgba(14, 13, 18, 0.96); padding: 56px 24px 24px; }
	.grid ol { list-style: none; margin: 0 auto; padding: 0; max-width: 1100px; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
	.grid li button { width: 100%; text-align: left; display: flex; gap: 10px; align-items: baseline; padding: 12px; border-radius: 10px; border: 1px solid #34333d; background: #1d1c23; color: #fff; font: inherit; font-size: 14px; cursor: pointer; }
	.grid li button.current { border-color: #2e5ce6; background: #1d2a55; }
	.grid .num { color: #f5a623; font-weight: 700; font-variant-numeric: tabular-nums; }
	.grid-close { position: fixed; top: 14px; right: 18px; background: #2e5ce6; color: #fff; border: 0; border-radius: 999px; padding: 8px 14px; font: inherit; cursor: pointer; }

	/* Print / Save as PDF: every slide, one per landscape page. */
	@media print {
		@page { size: 1920px 1080px; margin: 0; }
		:global(html), :global(body) { overflow: visible; height: auto; background: #fff; }
		.pitch-root { position: static; }
		.viewport { position: static; }
		.stage { position: static; transform: none !important; width: 1920px; height: auto; }
		.slide { position: relative; display: block; width: 1920px; height: 1080px; break-after: page; page-break-after: always; }
		.bar, .notes, .grid { display: none !important; }
		.slide :global(img[loading='lazy']) { content-visibility: visible; }
		.slide :global(.rise), .slide :global(.float) { animation: none !important; opacity: 1 !important; transform: none !important; }
	}
	@media (prefers-reduced-motion: reduce) {
		.slide :global(.rise), .slide :global(.float) { animation: none !important; }
	}
</style>
