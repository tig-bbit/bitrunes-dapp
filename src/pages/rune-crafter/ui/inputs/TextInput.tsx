import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { useMergeRefs } from "~/shared/lib/useMergeRefs";
import { cn } from "~/shared/lib/utils";
import { RichInput, RichInputProps } from "~/shared/ui/common";

interface TextInputProps extends Omit<RichInputProps, 'topElement' | 'name'> {
	label: string,
	name: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, className, name, ...props }, ref) => {
	const {
		field: { ref: refField, ...field },
		fieldState: { error }
	} = useController({ name });

	const refs = useMergeRefs(ref, refField);

	return (
		<RichInput
			ref={refs} {...props} size='small'
			{...field}
			className={cn(
				'text-[0.9375rem]/none',
				className
			)}
			rootProps={{
				className: cn(
					'items-center', 
					error && 'border-error shadow-error-default [&:has(input:focus)]:bg-black-100'
				)
			}}
			topElement={
				<span className={cn('text-black-60 text-[0.875rem]', error && 'text-error')}>
					{error?.message ?? label}
				</span>
			}
		/>
	)
});

TextInput.displayName = 'TextInput'