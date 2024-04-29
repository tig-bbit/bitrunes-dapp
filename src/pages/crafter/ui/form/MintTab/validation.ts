'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schemaFeeToggle } from '../../inputs/FeeToggle';
import { schemaRuneTicker } from '../schemaRuneTicker';

const schema = z.object({
	runeTicker: schemaRuneTicker,
	repeatMint: z.string().min(1, 'Min 1 char'),
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