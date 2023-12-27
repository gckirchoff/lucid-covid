import type { ScaleLinear } from 'd3';

import type { RiskItem } from '../../constants';

interface Coin {
	yPosition: number;
	inDelay: number;
	outDelay: number;
}

interface GetCoinsArgs {
	d: RiskItem;
	yScale: ScaleLinear<number, number, never>;
	coinRadius: number;
	columnIndex: number;
	barsSwappedPlaces: boolean;
	innerHeight: number;
}

interface CalcOutDelay {
	i: number;
	totalLength: number;
	columnIndex: number;
	barsSwappedPlaces: boolean;
	direction: 'in' | 'out';
}

class DelayCalculator {
	private i: number;
	private totalLength: number;
	private columnIndex: number;
	private barsSwappedPlaces: boolean;

	private coinDelay = 30;
	private columnDelay = 25;

	constructor(i: number, totalLength: number, columnIndex: number, barsSwappedPlaces: boolean) {
		this.i = i;
		this.totalLength = totalLength;
		this.columnIndex = columnIndex;
		this.barsSwappedPlaces = barsSwappedPlaces;
	}

	calcDelay = (direction: 'in' | 'out'): number => {
		const position = direction === 'in' ? this.i : this.totalLength - this.i;
		const constantDelay = this.barsSwappedPlaces ? 1000 : 200;

		const delay = position * this.coinDelay + this.columnIndex * this.columnDelay + constantDelay;
		return delay;
	};
}

export const getCoins = ({
	d,
	yScale,
	coinRadius,
	columnIndex,
	barsSwappedPlaces,
	innerHeight,
}: GetCoinsArgs): Coin[] => {
	const coinsArr: Coin[] = [];
	for (let i = 1; i < d.coins + 1; i++) {
		const delayCalculator = new DelayCalculator(i, d.coins, columnIndex, barsSwappedPlaces);

		const coin: Coin = {
			yPosition: -(innerHeight - yScale(i) + coinRadius),
			inDelay: delayCalculator.calcDelay('in'),
			outDelay: delayCalculator.calcDelay('out'),
		};
		coinsArr.push(coin);
	}
	return coinsArr.sort((a, b) => b.yPosition - a.yPosition);
};
