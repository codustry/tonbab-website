<script lang="ts" module>
	/**
	 * Third-party AI assistant marks for the "use Tonbab from your own
	 * assistant (MCP)" copy. Each brand follows its owner's published rules
	 * (checked 2026-11-19); files in static/brand/third-party are the owners'
	 * own downloads, unaltered:
	 *
	 *  - ChatGPT → OpenAI Blossom, black or white only (openai.com/brand,
	 *    cdn.openai.com/brand/openai-logos.zip). The SVG's own padding is the
	 *    prescribed clear space, so never crop it or overlap it.
	 *  - Gemini CLI → Gemini CLI icon, full colour (geminicli.com/brand-kit).
	 *    The kit's guidelines name this icon for sites that offer Gemini CLI.
	 *  - Claude, Claude Code → name as plain text. Anthropic's trademark
	 *    guidelines (anthropic.com/legal/trademark-guidelines) allow logo use
	 *    only in materials Anthropic approves beforehand.
	 *  - Cloudflare → never shown (owner, 2026-11-19: built-in AI is "Tonbab
	 *    AI", and Cloudflare's trademark page needs written permission for its
	 *    logo anyway).
	 *
	 * Always pair with "works with" / "ใช้ได้กับ" wording. Never "partner",
	 * "worked with" or "powered by".
	 */
	export type AssistantKey = 'claude' | 'chatgpt' | 'gemini' | 'claude-code';

	type Logo = { light: string; dark: string; alt: string };
	const LOGOS: Partial<Record<AssistantKey, Logo>> = {
		chatgpt: {
			light: '/brand/third-party/openai-blossom-black.svg',
			dark: '/brand/third-party/openai-blossom-white.svg',
			alt: 'OpenAI logo'
		},
		gemini: {
			light: '/brand/third-party/gemini-cli-icon.svg',
			dark: '/brand/third-party/gemini-cli-icon.svg',
			alt: 'Gemini CLI icon'
		}
	};

	export const ASSISTANT_NAMES: Record<AssistantKey, string> = {
		claude: 'Claude',
		chatgpt: 'ChatGPT',
		gemini: 'Gemini CLI',
		'claude-code': 'Claude Code'
	};
</script>

<script lang="ts">
	let {
		key,
		tone = 'light',
		size = 'md'
	}: { key: AssistantKey; tone?: 'light' | 'dark'; size?: 'sm' | 'md' } = $props();

	const logo = $derived(LOGOS[key]);
	const src = $derived(logo ? (tone === 'dark' ? logo.dark : logo.light) : '');
	// The OpenAI file carries ~25% built-in clear space on each side, so it
	// gets a larger box than the Gemini CLI tile to read at the same weight.
	const box = $derived(
		key === 'chatgpt' ? (size === 'sm' ? 'h-6 w-6' : 'h-7 w-7') : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
	);
</script>

<span class="inline-flex min-w-0 items-center gap-1.5">
	{#if logo}
		<img {src} alt={logo.alt} width="28" height="28" class="{box} shrink-0" loading="lazy" decoding="async" />
	{/if}
	<span>{ASSISTANT_NAMES[key]}</span>
</span>
