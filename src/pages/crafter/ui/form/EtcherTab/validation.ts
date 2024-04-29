'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schemaRuneTicker } from '../schemaRuneTicker';

const schema = z.object({
	runeName: schemaRuneTicker,
	runeSymbol: z.string().length(1, 'Only one symbol'),
	destAddress: z.string().min(3),
	divisibility: z.coerce.number().int().optional(),
	premine: z.coerce.number().int().optional(),
	mintType: z.enum(['open', 'closed']),
	mintAmount: z.coerce.number().int().optional(),
	mintCap: z.coerce.number().int().optional(),
	image: z.instanceof(File)
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