import { ReactNode, forwardRef } from "react";
import { InputProps, inputVariants } from "./input";
import { cn } from "~/shared/lib/utils";

interface RichInputProps extends InputProps {
	topElement?: ReactNode,
	rightElement?: ReactNode
}

export const RichInput = forwardRef<HTMLInputElement, RichInputProps>(
	({ topElement, rightElement, className, size, variant, ...props }, ref) => {

		return (
			<div className={cn('flex flex-col gap-[0.25rem]', inputVariants({ variant, size }))}>
				{topElement}

				<div className={cn('flex justify-between gap-2 items-end')}>
					<input 
						ref={ref} {...props}
						className={cn('bg-transparent outline-none w-full', className)}
					/>
					{rightElement}
				</div>
			</div>
		)
	}
);

RichInput.displayName = 'RichInput';