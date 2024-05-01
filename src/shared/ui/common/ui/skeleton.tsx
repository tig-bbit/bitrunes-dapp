import { cn } from "~/shared/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	loading?: boolean
}

function Skeleton({
	className,
	loading = true,
	...props
}: SkeletonProps) {
	return (
		<div
			className={cn(
				loading && "animate-pulse rounded-lg bg-black/20 dark:bg-white/10 text-transparent [&_*]:invisible", 
				className
			)}
			{...props}
		/>
	)
}

export { Skeleton }
