'use client';

import { Button } from "~/shared/ui/common";
import { HeaderLogo } from "./HeaderLogo";

import { ColorModeToggler } from "./ColorModeToggler";
import { MobileDrawer } from "./MobileDrawer";
import { useWindowScroll } from "~/shared/lib/useWindowScroll";
import { cn } from "~/shared/lib/utils";
import Link from "next/link";

export function Header() {
	const isScrolled = useWindowScroll({ threshold: 10 });

	return (
		<header className={cn(
			'flex justify-between sticky top-2 py-[0.75rem] z-header max-md: transition-all border-transparent',
			isScrolled && 'px-[1rem] bg-black/50 light:bg-white/50 backdrop-blur-lg border border-secondary rounded-[1rem]'
		)}>
			<HeaderLogo />

			<div className='flex gap-[0.75rem] max-md:hidden'>
				<Button variant='outline' colorPallete='primary'>
					Connect EVM
				</Button>
				<Button variant='outline' colorPallete='primary'>
					Connect BTC
				</Button>
				<Button
					asChild variant='solid'
					colorPallete='primary'
				>
					<Link href='/etcher'>Buy $BRUNE</Link>
				</Button>

				<ColorModeToggler />
			</div>

			<MobileDrawer />
		</header>
	)
}