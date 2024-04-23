'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schemaFeeToggle } from '../../inputs/FeeToggle';

const schema = z.object({
	receiverAddress: z.string().min(1, 'Min 1 char'),
	amount: z.coerce.number(),
	utxo: z.coerce.number().optional(),
	fee: schemaFeeToggle,
	splitRunes: z.coerce.string()
})

export function useFormValidation() {
	return useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			utxo: 2,
			splitRunes: 'yes',
			'fee.type': 'medium'
		}
	})
}