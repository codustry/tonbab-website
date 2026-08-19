<script lang="ts">
	/**
	 * Responsive inline-SVG workflow diagram for /modules/[module].
	 * Lays nodes in rows of `perRow`, left-to-right, with elbow connectors
	 * between rows. Bilingual: labels resolve from Bi pairs via `locale`.
	 * Light-only by design (public www surface) — brand palette hardcoded
	 * via CSS custom properties from app.css.
	 */
	import type { DiagramNode } from '$lib/marketing/modules-data';

	let { nodes, locale }: { nodes: DiagramNode[]; locale: 'en' | 'th' } = $props();

	const t = (b: { en: string; th: string }) => (locale === 'th' ? b.th : b.en);

	const NODE_W = 168;
	const NODE_H = 62;
	const H_GAP = 40;
	const V_GAP = 46;
	const PAD = 8;
	const PER_ROW = 4;

	const layout = $derived.by(() => {
		const perRow = Math.min(PER_ROW, nodes.length);
		const rows = Math.ceil(nodes.length / PER_ROW);
		const width = PAD * 2 + perRow * NODE_W + (perRow - 1) * H_GAP;
		const height = PAD * 2 + rows * NODE_H + (rows - 1) * V_GAP;
		const placed = nodes.map((node, i) => {
			const row = Math.floor(i / PER_ROW);
			const col = i % PER_ROW;
			return {
				node,
				i,
				x: PAD + col * (NODE_W + H_GAP),
				y: PAD + row * (NODE_H + V_GAP),
				row,
				col
			};
		});
		return { width, height, placed };
	});

	const ariaLabel = $derived.by(() => nodes.map((n) => t(n.label)).join(' → '));
</script>

<svg
	viewBox={`0 0 ${layout.width} ${layout.height}`}
	class="h-auto w-full max-w-full"
	role="img"
	aria-label={ariaLabel}
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<marker id="tnb-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
			<path d="M 0 1 L 9 5 L 0 9 z" fill="var(--color-tnb-blue)" />
		</marker>
	</defs>

	{#each layout.placed as p (p.i)}
		{@const next = layout.placed[p.i + 1]}
		{#if next}
			{#if next.row === p.row}
				<!-- straight connector within a row -->
				<line
					x1={p.x + NODE_W}
					y1={p.y + NODE_H / 2}
					x2={next.x - 3}
					y2={next.y + NODE_H / 2}
					stroke="var(--color-tnb-blue)"
					stroke-width="1.75"
					marker-end="url(#tnb-flow-arrow)"
				/>
			{:else}
				<!-- elbow connector down to the next row -->
				<path
					d={`M ${p.x + NODE_W / 2} ${p.y + NODE_H}
					   V ${p.y + NODE_H + V_GAP / 2}
					   H ${next.x + NODE_W / 2}
					   V ${next.y - 3}`}
					fill="none"
					stroke="var(--color-tnb-blue)"
					stroke-width="1.75"
					marker-end="url(#tnb-flow-arrow)"
				/>
			{/if}
		{/if}
	{/each}

	{#each layout.placed as p (p.i)}
		<g>
			<rect
				x={p.x}
				y={p.y}
				width={NODE_W}
				height={NODE_H}
				rx="10"
				fill="var(--color-tnb-paper)"
				stroke="var(--color-tnb-line)"
				stroke-width="1.25"
			/>
			<rect x={p.x} y={p.y} width="4" height={NODE_H} rx="2" fill={p.i === layout.placed.length - 1 ? 'var(--color-tnb-amber)' : 'var(--color-tnb-blue)'} />
			<text
				x={p.x + NODE_W / 2}
				y={p.y + (p.node.sub ? 26 : NODE_H / 2 + 4.5)}
				text-anchor="middle"
				font-size="12.5"
				font-weight="700"
				fill="var(--color-tnb-ink)"
				font-family="inherit"
			>
				{t(p.node.label)}
			</text>
			{#if p.node.sub}
				<text
					x={p.x + NODE_W / 2}
					y={p.y + 45}
					text-anchor="middle"
					font-size="10.5"
					fill="var(--color-tnb-ink-soft)"
					font-family="inherit"
				>
					{t(p.node.sub)}
				</text>
			{/if}
		</g>
	{/each}
</svg>
