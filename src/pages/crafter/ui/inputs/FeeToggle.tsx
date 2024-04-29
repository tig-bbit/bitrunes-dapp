'use client';

import { ToggleGroupItem } from "~/shared/ui/common";
import { VTextInput } from "./VTextInput";
import { z } from "zod";
import { VToggleGroupRadio } from "~/shared/ui/validation-controls";
import { useFieldValue } from "~/shared/lib/useFieldValue";

export const schemaFeeToggle = z.union([
	z.object({
		type: z.enum(['slow', 'medium', 'fast']).default('medium')
	}),
	z.object({
		type: z.literal('custom'),
		custom: z.coerce.number().optional()
	})
])

export function FeeToggle({ name }: { name: string }) {
	const typeFieldName = `${name}.type`;
	const customFieldName = `${name}.custom`;

	const tab = useFieldValue({ name: typeFieldName });

	return (
		<>
			<div className='flex flex-col gap-[0.5rem] w-full'>
				<span className='text-black-60 text-[0.875rem]'>
					Select Fees (135 sats/vB)
				</span>

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
		</>
	);
}
