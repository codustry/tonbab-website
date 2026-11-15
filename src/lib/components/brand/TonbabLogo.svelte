<script lang="ts">
	/**
	 * The full Tonbab logo: ต mark + "tonbab" wordmark (+ "ต้นแบบ" unless compact).
	 * Size it by height (the width follows). The wordmark is outlined paths, so it
	 * renders identically without the brand fonts.
	 * - `color`: blue mark, wordmark in currentColor (ink on light, white in .dark).
	 * - `white`: everything white except the amber head — on blue/dark surfaces.
	 * - `mono`: one colour (currentColor), including the head.
	 */
	import * as P from './logo-paths.js';

	let {
		variant = 'color',
		compact = false,
		height = 40,
		class: klass = ''
	}: {
		variant?: 'color' | 'white' | 'mono';
		compact?: boolean;
		height?: number | string;
		class?: string;
	} = $props();

	const vb = $derived(compact ? P.COMPACT_VIEWBOX : P.FULL_VIEWBOX);
	const word = $derived(compact ? P.COMPACT_WORD : P.FULL_WORD);
	const markT = $derived(compact ? P.COMPACT_MARK_TRANSFORM : P.FULL_MARK_TRANSFORM);
	const ratio = $derived.by(() => {
		const [, , w, h] = vb.split(' ').map(Number);
		return w / h;
	});
	const h = $derived(Number(height));
	const stroke = $derived(variant === 'color' ? P.BRAND.blue : variant === 'white' ? '#FFFFFF' : 'currentColor');
	const head = $derived(variant === 'mono' ? 'currentColor' : P.BRAND.amber);
	const wordFill = $derived(variant === 'white' ? '#FFFFFF' : 'currentColor');
</script>

<svg
	viewBox={vb}
	height={h}
	width={Math.round(h * ratio * 100) / 100}
	class={klass}
	role="img"
	aria-label="Tonbab ต้นแบบ"
	xmlns="http://www.w3.org/2000/svg"
>
	<g transform={markT}>
		<path d={P.MARK_PATH} fill="none" stroke={stroke} stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
		<circle cx={P.MARK_HEAD.cx} cy={P.MARK_HEAD.cy} r={P.MARK_HEAD.r} fill={head} />
	</g>
	<path transform={word.transform} fill={wordFill} d={word.d} />
	{#if !compact}
		<path
			transform={P.FULL_THAI.transform}
			d={P.FULL_THAI.d}
			fill={variant === 'white' ? '#DFE9FB' : variant === 'mono' ? 'currentColor' : undefined}
			class={variant === 'color' ? 'fill-[#1D3FA8] dark:fill-[#9DB5F5]' : ''}
		/>
	{/if}
</svg>
