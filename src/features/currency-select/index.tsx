'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger
} from "~/shared/ui/common";

import { Icons } from "~/shared/ui/icons";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn } from "~/shared/lib/utils";

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

export const currencySelectItems = Array.from(currencySelectVariants.entries())
	.map(([type, currency]) => ({ type, ...currency }))

interface CurrencyElement {
	currency: string
	className?: string,
}

export function CurrencyIcon({ className, currency }: CurrencyElement) {
	const variant = currencySelectVariants.get(currency);

	if (!variant)
		return null;

	return <variant.Icon className={cn('size-[1.25rem]', className)} />
}

export function CurrencyText({ className, currency }: CurrencyElement) {
	const variant = currencySelectVariants.get(currency);

	if (!variant)
		return null;

	return <span className={className}>{variant.text}</span>
}

export function CurrencyLabel({ currency, className }: CurrencyElement) {
	return (
		<div className={cn('flex items-center gap-[0.375rem]', className)}>
			<CurrencyIcon currency={currency} />
			<CurrencyText currency={currency} />
		</div>
	);
}

interface CurrencySelectProps extends Omit<
	ComponentPropsWithoutRef<typeof Select>,
	'value' | 'onValueChange'
> {
	defaultValue?: string
}

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
