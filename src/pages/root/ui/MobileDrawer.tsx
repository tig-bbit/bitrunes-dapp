'use client';

import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDragger,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from '~/shared/ui/common';

import { HeaderLogo } from './HeaderLogo';
import { useEffect, useState } from 'react';
import { Menu as IconMenu, X as IconX } from 'lucide-react';
import { ColorModeToggler } from './ColorModeToggler';
import { usePathname } from 'next/navigation';
import { BuyBruneButton } from './BuyBruneButton';

export function MobileDrawer() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => setOpen(false), [pathname]);

	return (
		<Drawer
			direction='top'
			open={open} onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>
				<Button
					variant='outline'
					className='md:hidden rounded-md p-1'
				>
					<IconMenu />
				</Button>
			</DrawerTrigger>
			<DrawerContent className='h-full'>
				<DrawerHeader className='flex justify-between relative'>
					<HeaderLogo />

					<Button
						variant='outline' className='rounded-md p-1'
						onClick={() => setOpen(false)}
					>
						<IconX />
					</Button>

				</DrawerHeader>

				<DrawerFooter>
					<div className='flex flex-col gap-[0.75rem] '>
						<Button
							className='w-full'
							variant='outline' colorPallete='primary'
						>
							Connect BTC
						</Button>

						<BuyBruneButton />

						<ColorModeToggler>
							{theme => theme == 'dark' ? 'Light theme' : 'Dark theme'}
						</ColorModeToggler>
					</div>
					<DrawerDragger />
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}