'use client';

import { HeaderLogo } from "./HeaderLogo";
import { ColorModeToggler } from "./ColorModeToggler";
import { MobileDrawer } from "./MobileDrawer";
import { useWindowScroll } from "~/shared/lib/useWindowScroll";
import { cn } from "~/shared/lib/utils";
import { BuyBruneButton } from "./BuyBruneButton";
import { NavButtonsStack } from "./NavButtonsStack";
import { ConnectBtcButton } from "./ConectBtcButton";

export function Header() {
	const isScrolled = useWindowScroll({ threshold: 10 });

	return (
		<header className={cn(
			'flex justify-between sticky top-2 py-[0.75rem] z-header max-md: transition-all border-transparent',
			isScrolled && 'px-[1rem] bg-black/50 light:bg-white/50 backdrop-blur-lg border border-secondary rounded-[1rem]'
		)}>
			<div className='flex gap-[1.5rem] items-center'>
				<HeaderLogo />

				<NavButtonsStack className='max-sm:hidden' />
			</div>

			<div className='flex gap-[0.75rem] max-md:hidden'>
				<ConnectBtcButton />

				<BuyBruneButton />

				<ColorModeToggler />
			</div>

			<MobileDrawer />
		</header>
	)
}