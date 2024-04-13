"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/shared/lib/utils"

const toggleVariants = cva([
	"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors",
	"outline-none",
	"disabled:cursor-not-allowed disabled:opacity-50",
], {
	variants: {
		variant: {
			solid: [
				'text-black-40 border border-transparent',
				'hover:bg-white/5 hover:text-white',
				'data-[state=on]:bg-white/10 data-[state=on]:border-white/10 data-[state=on]:text-white'
			]
		},
		size: {
			default: "h-[2.3125rem] px-[1rem] py-[0.5rem] rounded-[0.88rem] grow w-[10rem]",
		},
	},
	defaultVariants: {
		variant: "solid",
		size: "default",
	},
})

const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
	VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
	<TogglePrimitive.Root
		ref={ref}
		className={cn(toggleVariants({ variant, size, className }))}
		{...props}
	/>
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }