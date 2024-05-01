'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schemaFeeToggle } from '../../inputs/FeeToggle';
import { schemaRuneTicker } from '../schemaRuneTicker';

const schema = z.object({
	runeTicker: schemaRuneTicker,
	repeatMint: z.coerce.number()
		.min(1, 'Allowed value from 1 to 23')
		.max(23, 'Allowed value from 1 to 23'),
	split: z.enum(['pre-split', 'auto-split']),
	fee: schemaFeeToggle,
})

export function useFormValidation() {
	return useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			runeTicker: '',
			split: 'pre-split',
			'fee.type': 'medium'
		}
	})
}