<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ScaleTime } from 'd3';

	export let xScale: ScaleTime<number, number, never>;
	export let dateFormatter: (date: Date) => string;
	export let height: number;

	let xTicks = xScale.ticks();
</script>

<g class="axis x" transform="translate(0, {height})">
	{#each xTicks as tick, index}
		<g
			class="tick"
			transform="translate({xScale(tick)} 0)"
			transition:fade={{ delay: index * 100 }}
		>
			<line x1={0} x2={0} y1={0} y2={6} stroke="hsla(212, 10%, 53%, 1)" />
			<text x={0} y={10} dy={10} text-anchor="middle">
				{dateFormatter(tick)}
			</text>
		</g>
	{/each}
</g>

<style lang="scss">
	line {
		stroke: black;
		stroke-width: 1;
	}

	text {
		font-size: 1.4rem;
		font-family: var(--font-base);
		user-select: none;
		fill: #464646;
	}
</style>
