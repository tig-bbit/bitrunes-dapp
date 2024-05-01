'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schemaFeeToggle } from '../../inputs/FeeToggle';
import { schemaRuneTicker } from '../schemaRuneTicker';

const schema = z.object({
	isValidRune: z.coerce.boolean(),
	runeTicker: schemaRuneTicker,
	repeatMint: z.coerce.number()
		.min(1, 'Allowed value from 1 to 23')
		.max(23, 'Allowed value from 1 to 23'),
	split: z.enum(['pre-split', 'auto-split']),
	fee: schemaFeeToggle,
}).superRefine((obj, ctx) => {
	if (!obj.isValidRune) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Invalid rune',
			path: ['runeTicker']
		})
	}
})

export type SchemaType = z.infer<typeof schema>

export function useFormValidation() {
	return useForm<SchemaType>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			runeTicker: '',
			repeatMint: 1,
			split: 'pre-split',
			fee: { type: 'medium' }
		}
	})
}