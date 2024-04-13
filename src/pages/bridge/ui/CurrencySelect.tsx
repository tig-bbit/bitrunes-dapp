'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger
} from "~/shared/ui/common";

import { Icons } from "~/shared/ui/icons";
import { useState } from "react";

const currencyVariants = new Map(
	Object.entries({
		btc: {
			Icon: Icons.CurrencyBtcb,
			text: 'BTC'
		},
		usdt: {
			Icon: Icons.CurrencyUsdt,
			text: 'USDT'
		},
		usdc: {
			Icon: Icons.CurrencyUsdc,
			text: 'USDC'
		},
		eth: {
			Icon: Icons.CurrencyEth,
			text: 'ETH'
		},
		bfg: {
			Icon: Icons.CurrencyBfg,
			text: 'BFG'
		},
		bsrx: {
			Icon: Icons.CurrencyBond,
			text: 'BFG'
		},
	})
);
function CurrencyLable({ currency }: { currency: string; }) {
	const variant = currencyVariants.get(currency);

	if (!variant)
		return null;

	return (
		<div className='flex items-center gap-[0.375rem]'>
			<variant.Icon className='size-[1.25rem]' />
			<span>{variant.text}</span>
		</div>
	);
}

interface CurrencySelectProps {
	defaultValue?: string
}

export function CurrencySelect({ defaultValue = 'btc' }: CurrencySelectProps) {
	const [currency, setCurrency] = useState(defaultValue);

	return (
		<Select value={currency} onValueChange={setCurrency}>
			<SelectTrigger className="w-[8rem]">
				<CurrencyLable currency={currency} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="btc">
					<CurrencyLable currency='btc' />
				</SelectItem>
				<SelectItem value="usdt">
					<CurrencyLable currency='usdt' />
				</SelectItem>
				<SelectItem value="usdc">
					<CurrencyLable currency='usdc' />
				</SelectItem>
				<SelectItem value="eth">
					<CurrencyLable currency='eth' />
				</SelectItem>
				<SelectItem value="bfg">
					<CurrencyLable currency='bfg' />
				</SelectItem>
				<SelectItem value="bsrx">
					<CurrencyLable currency='bsrx' />
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
