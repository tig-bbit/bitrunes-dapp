'use client';

import { Select, SelectContent, SelectItem, SelectTrigger } from "~/shared/ui/common";
import { CurrencyLabel, currencySelectItems } from "~/features/currency-select";
import { useState } from "react";
import { cn } from "~/shared/lib/utils";

export function RuneSelector() {
	const [currency, setCurrency] = useState('btc');

	return (
		<Select value={currency} onValueChange={setCurrency}>
			<SelectTrigger className={cn(
				'h-[3.375rem] py-[0.4063rem] pl-[0.75rem] pr-[1rem] border border-secondary',
				'light:bg-transparent'
			)}>
				<div className='flex flex-col text-[0.9375rem]'>
					<span className='text-[0.875rem] text-black-60'>
						Rune Ticker*
					</span>
					<CurrencyLabel currency={currency} />
				</div>
			</SelectTrigger>
			<SelectContent className='rounded-[1.2rem]'>
				{currencySelectItems.map(i => (
					<SelectItem key={i.type} value={i.type}>
						<CurrencyLabel
							className='h-[2.625rem] text-[1rem]'
							currency={i.type} 
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
