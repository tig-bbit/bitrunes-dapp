import { NavLink } from "~/shared/ui/nav-link";
import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/utils";

export function NavButtonsStack({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props} className={cn('flex gap-[1rem] items-center text-black-60', className)}>
			<NavLink href='/crafter'>
				Crafter
			</NavLink>
			<NavLink href='/bridge'>
				Bridge
			</NavLink>
		</div>
	);
}