import { Button } from "~/shared/ui/common";

const URL = 'https://app.uniswap.org/swap?outputCurrency=0x724313985dcb55d432d3888ddc0b9e3d3859e86d&chain=mainnet'

export function BuyBruneButton() {
	return (
		<Button
			asChild variant='solid'
			colorPallete='primary'
		>
			<a target='_blank' href={URL}>
				Buy $BRUNE
			</a>
		</Button>
	);
}