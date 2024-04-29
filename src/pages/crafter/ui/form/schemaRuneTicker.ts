import { z } from "zod";

export const schemaRuneTicker = z.string()
	.regex(/^[a-zA-Z•]*$/, 'Only a-Z letters')
	.superRefine((str, ctx) => {
		if(str.startsWith('•') || str.endsWith('•')) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Start/end • not allowed',
			})
		}

		const strWoSpacers = str.replaceAll('•', '');

		if(strWoSpacers.length < 13) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Min 13 chars',
			})
		}

		if(strWoSpacers.length > 28) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Max 28 chars',
			})
		}
	})

export function fixRuneTickerInput(text: string) {
	// not covering all the cases but we need proper validation on backend if it reach us
	return text.replace(/\s\s+/g, '').replaceAll(' ', '•').replaceAll('••', '•').toUpperCase();
}	