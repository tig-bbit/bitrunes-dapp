'use client';

import {
	Button,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerDragger,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '~/shared/ui/common';

import { HeaderLogo } from './HeaderLogo';
import { useEffect, useState } from 'react';
import { Menu as IconMenu, X as IconX } from 'lucide-react';
import Link from 'next/link';
import { ColorModeToggler } from './ColorModeToggler';
import { usePathname } from 'next/navigation';

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
						<div className='flex gap-[0.5rem]'>
							<Button
								className='w-full'
								variant='outline' colorPallete='primary'
							>
								Connect EVM
							</Button>
							<Button
								className='w-full'
								variant='outline' colorPallete='primary'
							>
								Connect BTC
							</Button>
						</div>
						<Button
							asChild variant='solid'
							colorPallete='primary'
						>
							<Link href='/etcher'>Buy $BRUNE</Link>
						</Button>

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