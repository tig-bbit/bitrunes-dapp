import { forwardRef } from "react";
import { cn } from "~/shared/lib/utils";
import { RichInput, RichInputProps } from "~/shared/ui/common";

interface TextInputProps extends Omit<RichInputProps, 'topElement'> {
	label: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, className, ...props }, ref) => (
	<RichInput
		ref={ref} {...props} size='small'
		className={cn('text-[0.9375rem]/none', className)}
		topElement={
			<span className='text-black-60 text-[0.875rem]'>{label}</span>
		}
	/>
));

TextInput.displayName = 'TextInput'