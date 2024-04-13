import { CSSProperties, Children, HTMLAttributes, ReactNode, cloneElement, isValidElement } from "react";
import { cn } from "~/shared/lib/utils";

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
	step: number
}

export function Stepper({ children, className, step }: StepperProps) {
	const childrenCount = Children.count(children);

	return (
		<div className={cn('flex items-center gap-[1.125rem]', className)}>
			{Children.map(children, (child, index) => isValidElement(child) && (
				<>
					{cloneElement(child, {
						'data-active': step == index + 1 ? true : undefined,
						'data-passed': index + 1 < step ? true : undefined
					} as CSSProperties)}

					{index + 1 != childrenCount && (
						<hr className='w-[5.25rem] border-white/10' />
					)}
				</>
			))}
		</div>
	);
}

interface StepperStepProps extends HTMLAttributes<HTMLDivElement> {
	label?: ReactNode
}

export function StepperStep({ className, label, children, ...props }: StepperStepProps) {
	return (
		<div
			className={cn(
				'flex items-center justify-center relative transition-all',
				'font-manrope font-semibold text-[1.25rem]',
				'border border-white/10',
				'data-[passed]:bg-black-40',
				'data-[active]:bg-primary data-[active]:shadow-primary-norm',
				'size-[2.625rem] rounded-full',
				className
			)}
			{...props}
		>
			{children}
			<div className='absolute -bottom-[2rem] capitalize text-[0.875rem] text-nowrap'>
				{label}
			</div>
		</div>
	);
}