"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "~/shared/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
	values?: Array<{ value: number, color: string }>
}

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps
>(({ className, value, values, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(
			"relative h-4 w-full overflow-hidden rounded-full bg-black/10 dark:bg-black-40",
			className
		)}
		{...props}
	>
		{values ? (
			[...values]
				.map((v, index, arr) => ({
					progress: arr.slice(0, index + 1).reduce((acc, v) => acc + v.value, 0),
					...v
				}))
				.reverse()
				.map((entry, index) => (
					<ProgressPrimitive.Indicator
						key={index}
						className="absolute h-full w-full flex-1 transition-all"
						style={{
							transform: `translateX(-${100 - (entry.progress || 0)}%)`,
							background: entry.color
						}}
					/>
				)
			)
		) : (
			<ProgressPrimitive.Indicator
				className="h-full w-full flex-1 transition-all bg-primary"
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		)}
	</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
