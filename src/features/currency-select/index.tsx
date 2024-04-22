'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger
} from "~/shared/ui/common";

import { Icons } from "~/shared/ui/icons";
import { ComponentPropsWithoutRef, useState } from "react";

export const currencySelectVariants = new Map(
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

function CurrencyLabel({ currency }: { currency: string; }) {
	const variant = currencySelectVariants.get(currency);

	if (!variant)
		return null;

	return (
		<div className='flex items-center gap-[0.375rem]'>
			<variant.Icon className='size-[1.25rem]' />
			<span>{variant.text}</span>
		</div>
	);
}

interface CurrencySelectProps extends Omit<
	ComponentPropsWithoutRef<typeof Select>,
	'value' | 'onValueChange'
> {
	defaultValue?: string
}

const currencySelectItems = Array.from(currencySelectVariants.entries())
	.map(([type, currency]) => ({ type, ...currency }))

export function CurrencySelectSmall({ defaultValue = 'btc', ...props }: CurrencySelectProps) {
	const [currency, setCurrency] = useState(defaultValue);

	return (
		<Select
			value={currency} onValueChange={setCurrency}
			{...props}
		>
			<SelectTrigger>
				<CurrencyLabel currency={currency} />
			</SelectTrigger>
			<SelectContent>
				{currencySelectItems.map(i => (
					<SelectItem key={i.type} value={i.type}>
						<CurrencyLabel currency={i.type} />
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
