import { z } from "zod";

export const schemaRuneTicker = z.string()
	.regex(/^[a-zA-Z•]*$/, 'Only a-Z letters')
	.min(13, 'Min 13 chars')
	.max(28, 'Max 28 chars')