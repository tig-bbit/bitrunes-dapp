"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/shared/lib/utils"
import { toggleVariants } from "~/shared/ui/common/ui/toggle"
import { useControllableState } from "~/shared/lib/useControllableState"

const toggleGroupVariants = cva([
	"flex items-center justify-center gap-1"
], {
	variants: {
		variant: {
			solid: [
				'bg-white/10 border border-secondary',
				'light:bg-white/80'
			]
		},
		size: {
			default: [
				'rounded-[1rem] p-[0.25rem]'
			]
		}
	},
	defaultVariants: {
		variant: 'solid',
		size: 'default'
	}
})

const ToggleGroupContext = React.createContext<
	VariantProps<typeof toggleVariants>
>({
	size: "default",
	variant: "solid",
})

type BaseToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>;

type ToggleGroupProps =
	& BaseToggleGroupProps
	& VariantProps<typeof toggleVariants>

const ToggleGroup = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Root>,
	ToggleGroupProps
>(({ className, variant, size, children, ...props }, ref) => {
	const contextValue = React.useMemo(() => ({ variant, size }), [variant, size]);

	return (
		<ToggleGroupPrimitive.Root
			ref={ref}
			className={cn(toggleGroupVariants({ className, variant }))}
			{...props}
		>
			<ToggleGroupContext.Provider value={contextValue}>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	);
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

export type ToggleGroupRadioProps = Omit<
	ToggleGroupPrimitive.ToggleGroupSingleProps & React.RefAttributes<HTMLDivElement> & VariantProps<typeof toggleVariants>,
	'type'
>

const ToggleGroupRadio = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Root>,
	ToggleGroupRadioProps
>(({ defaultValue, ...props }, ref) => {
	const [value, setValue] = useControllableState({
		value: props.value, defaultValue,
		shouldUpdate: (prev, next) => next.length > 0,
		onChange: props?.onValueChange
	});

	return (
		<ToggleGroup
			ref={ref} type='single'
			{...props}
			value={value} onValueChange={setValue}
		/>
	);
});

ToggleGroupRadio.displayName = ToggleGroupPrimitive.Root.displayName + 'Radio'

const ToggleGroupItem = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
	VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
	const context = React.useContext(ToggleGroupContext)

	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={cn(
				toggleVariants({
					variant: context.variant || variant,
					size: context.size || size,
				}),
				'h-full',
				className
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	)
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupRadio, ToggleGroupItem }
