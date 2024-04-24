import { cn } from "~/shared/lib/utils"

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-black/20 dark:bg-white/10", className)}
			{...props}
		/>
	)
}

export { Skeleton }
