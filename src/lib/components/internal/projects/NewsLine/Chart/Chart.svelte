<script lang="ts">
	import { extent, scaleLinear, scaleTime, line, curveNatural, utcFormat } from 'd3';

	import type { WastewaterReport } from '../constants';
	import AxisY from './AxisY/AxisY.svelte';
	import AxisX from './AxisX/AxisX.svelte';
	import AnimatedLine from './AnimatedLine/AnimatedLine.svelte';

	const margin = {
		top: 25,
		right: 25,
		bottom: 20,
		left: 40,
	};

	export let data: WastewaterReport[];
	export let currentStep: number | undefined = data.length - 1;

	const xAccessor = (d: WastewaterReport) => new Date(d.date);
	const yAccessor = (d: WastewaterReport) => d.value;
	const dateFormatter = utcFormat('%b %Y');

	let width = 400;
	let height = 400;

	$: innerWidth = width - margin.left - margin.right;
	$: innerHeight = height - margin.top - margin.bottom;

	$: xScale = scaleTime()
		.domain(extent(data, xAccessor) as [Date, Date])
		.range([0, innerWidth]);

	$: yScale = scaleLinear()
		.domain(extent(data, yAccessor) as [number, number])
		.range([innerHeight, 0]);

	$: path = line<WastewaterReport>()
		.x((d) => xScale(xAccessor(d)))
		.y((d) => yScale(yAccessor(d)))
		.curve(curveNatural)(data);

	$: linePercent = (currentStep ?? 0) / (data.length - 1);
</script>

<div class="viz">
	<div class="headlines-container">
		<div class="headline"></div>
		<div class="headline"></div>
	</div>
	<div class="chart-container" bind:clientWidth={width} bind:clientHeight={height}>
		<svg {width} {height}>
			<g transform="translate({margin.left} {margin.top})">
				<AxisX {xScale} {dateFormatter} height={innerHeight} />
				<AxisY {yScale} width={innerWidth} />
				<AnimatedLine
					d={path}
					fill="none"
					stroke="steelblue"
					strokeWidth="2"
					percent={linePercent}
				/>
			</g>
		</svg>
	</div>
</div>

<style lang="scss">
	:global(.tick text) {
		font-weight: 400;
		font-size: 15px;
		fill: #747474;
	}

	.viz {
		position: relative;
		width: 100%;
		height: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 5%;

		.headlines-container {
			display: flex;
			justify-content: space-between;
			flex: 0 1 30%;

			.headline {
				width: 45%;
				background-color: plum;
				border-radius: var(--rounded-4);
			}
		}

		.chart-container {
			flex: 0 1 60%;
		}
	}
</style>
