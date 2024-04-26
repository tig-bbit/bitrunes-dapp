import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { useMergeRefs } from "~/shared/lib/useMergeRefs";
import { cn } from "~/shared/lib/utils";
import { RichInput, RichInputProps } from "~/shared/ui/common";

interface VTextInputProps extends Omit<RichInputProps, 'topElement' | 'name'> {
	label: string,
	name: string
}

export const VTextInput = forwardRef<HTMLInputElement, VTextInputProps>(({
	label, className, name, rootProps, ...props }, ref
) => {
	const {
		field: { ref: refField, onChange, ...field },
		fieldState: { error }
	} = useController({ name });

	const refs = useMergeRefs(ref, refField);

	return (
		<RichInput
			ref={refs} {...props} size='small'
			{...field}
			onChange={e => {
				onChange(e);
				props?.onChange?.(e);
			}}
			className={cn(
				'text-[0.9375rem]/none',
				className
			)}
			rootProps={{
				...rootProps,
				className: cn(
					'items-center',
					error && 'border-error shadow-error-default [&:has(input:focus)]:bg-black-100',
					rootProps?.className
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

VTextInput.displayName = 'TextInput'