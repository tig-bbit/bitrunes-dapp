'use client';

import { Button } from "~/shared/ui/common";
import { HeaderLogo } from "./HeaderLogo";

import { ColorModeToggler } from "./ColorModeToggler";
import { MobileDrawer } from "./MobileDrawer";
import { useWindowScroll } from "~/shared/lib/useWindowScroll";
import { cn } from "~/shared/lib/utils";

import {
	useWalletConnect,
} from "~/hooks";
import { useEffect } from "react";

import { BuyBruneButton } from "./BuyBruneButton";
import { NavButtonsStack } from "./NavButtonsStack";

export function Header() {
	const { ordinalsAddress, handleWalletConnect } = useWalletConnect();

	const isScrolled = useWindowScroll({ threshold: 10 });
	const handleChange = () => {
		handleWalletConnect();
	}
	useEffect(() => {
		if (ordinalsAddress) {
			localStorage.setItem('ordinalAddress', ordinalsAddress);
		} else {
			localStorage.removeItem('ordinalAddress')
		}
	}, [ordinalsAddress])
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
				{ordinalsAddress ? (
					<Button disabled variant='outline' colorPallete='primary'>
						{ordinalsAddress.slice(0, 5)}...{ordinalsAddress.slice(-5)}
					</Button>
				) : (
					<Button  onClick={handleChange} variant='outline' colorPallete='primary'>Connect Wallet</Button>
				)}
				<BuyBruneButton />

				<ColorModeToggler />
			</div>

			<MobileDrawer />
		</header>
	)
}