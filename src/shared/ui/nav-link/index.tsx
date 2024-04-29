'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "~/shared/lib/utils";

interface NavLinkProps extends ComponentPropsWithoutRef<typeof Link> {
	end?: boolean
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ end = false, className, ...props }, ref) => {
	const pathname = usePathname();
	const href = props.href.toString();
	const isActive = end ? pathname == href : pathname?.startsWith(href);

	return (
		<Link
			ref={ref} {...props}
			className={cn(
				'transition-all',
				isActive ? 'text-primary' : 'hover:text-white light:hover:text-black',
				className
			)}
		/>
	);
});

NavLink.displayName = 'NavLink';