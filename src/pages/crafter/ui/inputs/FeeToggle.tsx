'use client';

import { Skeleton, ToggleGroupItem } from "~/shared/ui/common";
import { VTextInput } from "./VTextInput";
import { z } from "zod";
import { VToggleGroupRadio } from "~/shared/ui/validation-controls";
import { useFieldValue } from "~/shared/lib/useFieldValue";
import { useGasFees } from "~/shared/lib/bitcoin";

export const schemaFeeToggle = z.union([
	z.object({
		type: z.enum(['slow', 'medium', 'fast']).default('medium')
	}),
	z.object({
		type: z.literal('custom'),
		custom: z.coerce.number().min(1, 'Min value is 1')
	})
])

export function FeeToggle({ name }: { name: string }) {
	const typeFieldName = `${name}.type`;
	const customFieldName = `${name}.custom`;

	const tab = useFieldValue({ name: typeFieldName });
	const customFee = useFieldValue({ name: customFieldName });

	const { data: fees, isLoading } = useServiceFees();
	const serviceFee = fees.get(tab);

	return (
		<Skeleton className='flex flex-col w-full gap-[0.5rem]' loading={isLoading}>
			<div className='flex flex-col gap-[0.5rem] w-full'>
				{(tab != 'custom' || customFee) && (
					<span className='text-black-60 text-[0.875rem]'>
						Select Fees ({tab == 'custom' ? customFee : serviceFee} sats/vB)
					</span>
				)}
				<VToggleGroupRadio name={typeFieldName} className='w-full'>
					<ToggleGroupItem value='slow'>Slow</ToggleGroupItem>
					<ToggleGroupItem value='medium'>Medium</ToggleGroupItem>
					<ToggleGroupItem value='fast'>Fast</ToggleGroupItem>
					<ToggleGroupItem value='custom'>Custom</ToggleGroupItem>
				</VToggleGroupRadio>
			</div>

			{tab == 'custom' && (
				<VTextInput
					name={customFieldName}
					label='Custom Fee Rate*'
					placeholder='e.g. 125'
				/>
			)}
		</Skeleton>
	);
}

export function useServiceFees() {
	const { data: fees, ...rest } = useGasFees();

	return {
		data: new Map([
			['slow', fees?.hourFee],
			['medium', fees?.halfHourFee],
			['fast', fees?.fastestFee]
		]),
		...rest
	}
}