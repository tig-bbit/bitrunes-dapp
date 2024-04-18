'use client'

import { useTheme } from "next-themes"
import { ReactNode } from "react";
import { useIsHydrated } from "~/shared/lib/useHydrated";
import { cn } from "~/shared/lib/utils";
import { Button, ButtonProps, Skeleton } from "~/shared/ui/common";
import { Icons } from "~/shared/ui/icons";

interface ColorModeTogglerProps extends Omit<ButtonProps, 'children'> {
	children?: ReactNode | ((theme: string | undefined) => ReactNode)
}

export function ColorModeToggler({ className, children, ...props }: ColorModeTogglerProps) {
	const { setTheme, theme } = useTheme()
	const Icon = theme == 'dark' ? Icons.Sun : Icons.Moon;
	const hydrated = useIsHydrated();

	return (
		<Button
			variant='outline' className={cn('p-0 gap-2', className)} {...props}
			onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
		>
			{hydrated ? (
				<Icon className='size-[1.25rem]' />
			) : (
				<Skeleton className='size-[1.25rem] rounded-full' />
			)}

			{typeof children == 'function' ? children(theme) : children}
		</Button>
	);
}