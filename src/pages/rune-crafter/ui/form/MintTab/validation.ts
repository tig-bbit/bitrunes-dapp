'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schemaFeeToggle } from '../../inputs/FeeToggle';

const schema = z.object({
	runeTicker: z.string().min(1, 'Min 1 char'),
	repeatMint: z.string().min(1, 'Min 1 char'),
	split: z.enum(['pre-split', 'auto-split']),
	fee: schemaFeeToggle,
})

export function useFormValidation() {
	return useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			split: 'pre-split',
			'fee.type': 'medium'
		}
	})
}