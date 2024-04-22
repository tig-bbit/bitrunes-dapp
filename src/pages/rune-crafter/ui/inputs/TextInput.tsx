import { cn } from "~/shared/lib/utils";
import { RichInput, RichInputProps } from "~/shared/ui/common";

interface TextInputProps extends Omit<RichInputProps, 'topElement'> {
	label: string
}

export function TextInput({ label, className, ...props }: TextInputProps) {
	return (
		<RichInput
			{...props} className={cn('text-[0.9375rem]/none', className)} size='small'
			topElement={
				<span className='text-black-60 text-[0.875rem]'>{label}</span>
			}
		/>
	);
}