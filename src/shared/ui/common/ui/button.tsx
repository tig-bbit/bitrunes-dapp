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
				'bg-primary text-white shadow-primary-norm',
				'hocus:bg-primary-gradient hocus:shadow-primary-light'
			],
			outline: [
				'border-[0.0625rem] border-white/10 text-white',
				'hocus:bg-white/5'
			],
			dropdown: [
				'z-[51] relative bg-white/10 text-white'
			]
		},
		size: {
			default: 'leading-auto py-[0.62rem] px-[1rem] rounded-[2.62rem]',
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
				"hocus:bg-primary/5"
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
