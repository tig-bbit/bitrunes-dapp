'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schemaRuneTicker } from '../schemaRuneTicker';

export const schema = z.object({
	runeName: schemaRuneTicker,
	runeSymbol: z.string().length(1, 'Only one symbol'),
	destAddress: z.string().min(14, 'Min 14 symbols'),
	divisibility: z.coerce.number().int().optional(),
	premine: z.coerce.number().int().optional(),
	mintType: z.enum(['open', 'closed']),
	mintAmount: z.coerce.number().int().optional(),
	mintCap: z.coerce.number().int().optional(),
	image: z.instanceof(File)
})

export type SchemaType = z.infer<typeof schema>

export function useFormValidation() {
	return useForm<SchemaType>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			divisibility: 0,
			premine: 0,
			mintType: 'open',
			mintAmount: 0,
			mintCap: 0
		}
	})
}