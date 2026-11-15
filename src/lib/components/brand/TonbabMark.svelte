<script lang="ts">
	/**
	 * The Tonbab ต mark (C3 "golden head").
	 * - `color`: blue stroke + amber head — on light surfaces.
	 * - `white`: white stroke + amber head — on blue or dark surfaces.
	 * - `mono`: one colour (currentColor) — stamps, thermal print, footers.
	 * - `tile`: the app-icon tile (blue rounded square, white mark).
	 */
	import { MARK_PATH, MARK_HEAD, MARK_BOUNDS, BRAND } from './logo-paths.js';

	let {
		variant = 'color',
		size = 32,
		class: klass = '',
		title
	}: {
		variant?: 'color' | 'white' | 'mono' | 'tile';
		size?: number | string;
		class?: string;
		/** Accessible name; omit when the mark sits next to visible "tonbab" text. */
		title?: string;
	} = $props();

	const stroke = $derived(
		variant === 'color' ? BRAND.blue : variant === 'mono' ? 'currentColor' : '#FFFFFF'
	);
	const head = $derived(variant === 'mono' ? 'currentColor' : BRAND.amber);
	// Optically centre the mark: the tile gets a smaller mark inside a padded square.
	const frac = $derived(variant === 'tile' ? 0.62 : 0.92);
	const s = $derived((48 * frac) / (MARK_BOUNDS.y1 - MARK_BOUNDS.y0));
	const tx = $derived(24 - ((MARK_BOUNDS.x0 + MARK_BOUNDS.x1) / 2) * s);
	const ty = $derived(24 - ((MARK_BOUNDS.y0 + MARK_BOUNDS.y1) / 2) * s);
</script>

<svg
	viewBox="0 0 48 48"
	width={size}
	height={size}
	class={klass}
	role={title ? 'img' : undefined}
	aria-label={title}
	aria-hidden={title ? undefined : 'true'}
	xmlns="http://www.w3.org/2000/svg"
>
	{#if variant === 'tile'}<rect width="48" height="48" rx="11" fill={BRAND.blue} />{/if}
	<g transform="translate({tx} {ty}) scale({s})">
		<path d={MARK_PATH} fill="none" stroke={stroke} stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
		<circle cx={MARK_HEAD.cx} cy={MARK_HEAD.cy} r={MARK_HEAD.r} fill={head} />
	</g>
</svg>
