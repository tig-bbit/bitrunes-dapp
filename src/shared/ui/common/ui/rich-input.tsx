import { HTMLAttributes, ReactNode, forwardRef, useId } from "react";
import { InputProps, inputVariants } from "./input";
import { cn } from "~/shared/lib/utils";

export interface RichInputProps extends InputProps {
	topElement?: ReactNode,
	rightElement?: ReactNode,
	rootProps?: HTMLAttributes<HTMLLabelElement>
}

export const RichInput = forwardRef<HTMLInputElement, RichInputProps>(
	({ topElement, rightElement, className, size, variant, rootProps, ...props }, ref) => {
		const internalId = useId();
		const id = props?.id ?? internalId;

		return (
			<label
				htmlFor={id}
				{...rootProps}
				className={cn(
					'flex justify-between gap-2 items-end grow-0',
					inputVariants({ variant, size }),
					rootProps?.className
				)}
			>
				<div className={cn('flex flex-col gap-[0.25rem] text-inherit grow', size == 'small' && 'gap-0')}>
					{topElement}
					<input
						ref={ref} {...props} id={id}
						className={cn('bg-transparent outline-none w-full placeholder-black-40', className)}
					/>
				</div>

				{rightElement}
			</label>
		)
	}
);

RichInput.displayName = 'RichInput';