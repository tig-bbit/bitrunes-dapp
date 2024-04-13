import { cn } from "~/shared/lib/utils"

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-black/20 dark:bg-stone-800", className)}
			{...props}
		/>
	)
}

export { Skeleton }
