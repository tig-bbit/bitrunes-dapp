'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
	runeName: z.string()
		.regex(/^[a-zA-Z•]*$/, 'Only a-Z letters')
		.min(13, 'Min 13 chars')
		.max(28, 'Max 28 chars'),
	destAddress: z.string().min(3)
})

export function useFormValidation() {
	return useForm({
		resolver: zodResolver(schema),
		mode: 'onChange'
	})
}