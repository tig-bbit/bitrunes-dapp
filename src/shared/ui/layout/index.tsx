import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/utils";

export function PagePaper({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-col items-center gap-[4rem] grow p-[3rem]',
				'border border-secondary rounded-[1rem] grow',
				'bg-white/[.04] light:bg-white/[.3]',
				'max-md:p-[1rem] max-md:gap-[1rem]',
				className
			)}
		/>
	);
}

export function Heading({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h1 {...props} className={cn('font-semibold font-manrope', className)} />
	);
}