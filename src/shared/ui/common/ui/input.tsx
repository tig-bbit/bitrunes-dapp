import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/shared/lib/utils"

export const inputVariants = cva([
	'flex transition-all w-full',
	"disabled:cursor-not-allowed disabled:opacity-50",
], {
	variants: {
		variant: {
			solid: [
				'placeholder-black-40 bg-white/[.08] border border-secondary',
				"hover:bg-white/[.12]",
				"outline-[0.125rem] outline outline-transparent focus:outline-primary focus:bg-black-100",
				'light:bg-white/80'
			],
			outline: [
				'placeholder-black-40 border border-secondary',
				"hover:bg-white/5",
				"outline-[0.125rem] outline outline-transparent focus:outline-primary"
			]
		},
		size: {
			default: 'text-[0.94rem] py-[0.75rem] px-[1rem] rounded-[1rem]',
			small: 'text-[0.9375rem] px-[0.75rem] py-[0.4063rem] rounded-[1rem]'
		}
	},
	defaultVariants: {
		variant: 'solid',
		size: 'default',
	}
})


export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
	VariantProps<typeof inputVariants> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, size, ...props }, ref) => (
		<input
			className={cn(inputVariants({ variant, size, className }))}
			ref={ref} {...props}
		/>
	)
)
Input.displayName = "Input"

interface NumberInputProps extends Omit<InputProps, 'type'> {
	rootProps?: React.HTMLAttributes<HTMLDivElement>,
	label: string
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
	({ rootProps, className, label, ...props }, ref) => (
		<div {...rootProps} className={cn('flex relative grow', rootProps?.className)}>
			<Input
				ref={ref} type='number'
				{...props} className={cn('text-end peer pl-[3rem]', className)}
			/>

			<label className={'absolute top-0 h-full flex flex-col justify-center px-[1rem]\
				pointer-events-none text-black-40 peer-focus:text-white light:peer-focus:text-primary transition-all'}
			>
				{label}
			</label>
		</div>
	)
)
NumberInput.displayName = 'NumberInput';