import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/shared/lib/utils"

const buttonVariants = cva([
	"inline-flex items-center justify-center whitespace-nowrap rounded-md",
	"text-sm font-medium capitalize font-manrope font-semibold",
	"disabled:cursor-not-allowed disabled:opacity-50",
	"outline-none transition-all",
], {
	variants: {
		variant: {
			solid: [
				'bg-gray-500 text-white',
				'hocus:bg-gray-400 hocus:shadow-white'
			],
			outline: [
				'border border-secondary',
				'hocus:bg-white/5',
				'light:hocus:bg-black/5'
			],
			ghost: [
				'hocus:bg-white/[.08]',
				'light:hocus:bg-black/[.08]'
			],
			dropdown: [
				'z-dropdown relative bg-white/10 text-white'
			],
			unstyled: []
		},
		size: {
			sm: 'px-[0.5rem] py-[0.125rem] text-[0.75rem]/[1.4] rounded-full',
			default: 'leading-auto py-[0.62rem] px-[1rem] rounded-[2.62rem] min-h-[2.625rem] min-w-[2.625rem] min-size',
			lg: 'p-[1rem]',
			icon: 'h-[2rem] min-w-[2rem] w-full px-[0.25rem]'
		},
		colorPallete: {
			default: [],
			primary: [],
		}
	},
	compoundVariants: [
		{
			variant: 'solid',
			colorPallete: 'primary',
			class: [
				"bg-primary text-white shadow-primary-norm",
				"hocus:bg-primary-gradient hocus:shadow-primary-light"
			]
		},
		{
			variant: 'outline',
			colorPallete: 'primary',
			class: [
				"border-primary text-primary",
				"hocus:bg-primary/5 light:hocus:bg-primary/10"
			]
		},
		{
			variant: 'dropdown',
			class: ['rounded-[1rem] h-[1.8125rem]']
		}
	],

	defaultVariants: {
		variant: 'solid',
		size: 'default',
		colorPallete: 'default'
	}
})

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, colorPallete, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className, colorPallete }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
