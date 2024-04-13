'use client'

import { useTheme } from "next-themes"
import { useIsHydrated } from "~/shared/lib/useHydrated";
import { Button, Skeleton } from "~/shared/ui/common";
import { Icons } from "~/shared/ui/icons";

export function ColorModeToggler() {
	const { setTheme, theme } = useTheme()
	const Icon = theme == 'dark' ? Icons.Sun : Icons.Moon;
	const hydrated = useIsHydrated();

	return (
		<Button
			variant='outline' className='p-0'
			onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
		>
			{hydrated ? (
				<Icon className='size-[1.25rem]' />
			) : (
				<Skeleton className='size-[1.25rem] rounded-full' />
			)}
		</Button>
	);
}