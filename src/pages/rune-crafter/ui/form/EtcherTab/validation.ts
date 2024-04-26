'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
	runeName: z.string()
		.regex(/^[a-zA-Z•]*$/, 'Only a-Z letters')
		.min(13, 'Min 13 chars')
		.max(28, 'Max 28 chars'),
	runeSymbol: z.string().length(1, 'Only one symbol'),
	destAddress: z.string().min(3),
	divisibility: z.coerce.number().int().optional(),
	premine: z.coerce.number().int().optional(),
	mintType: z.enum(['open', 'closed']),
	mintAmount: z.coerce.number().int().optional(),
	mintCap: z.coerce.number().int().optional(),
})

export function useFormValidation() {
	return useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			runeName: '',
			runeSymbol : '',
			destAddress : '',
			divisibility: 0,
			premine: 0,
			mintType: 'open',
			mintAmount: 0,
			mintCap: 0
		}
	})
}