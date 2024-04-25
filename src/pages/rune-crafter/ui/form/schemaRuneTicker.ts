import { z } from "zod";

export const schemaRuneTicker = z.string()
	.regex(/^[a-zA-Z•]*$/, 'Only a-Z letters')
	.min(13, 'Min 13 chars')
	.max(28, 'Max 28 chars')
	.superRefine((str, ctx) => {
		if(str.startsWith('•') || str.endsWith('•')) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Start/end • not allowed',
			})
		}
	})

export function fixRuneTickerInput(text: string) {
	// not covering all the cases but we need proper validation on backend if it reach us
	return text.replace(/\s\s+/g, '').replaceAll(' ', '•').replaceAll('••', '•');
}	