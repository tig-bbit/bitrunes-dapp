'use client';

import { Button } from "~/shared/ui/common";
import { HeaderLogo } from "./HeaderLogo";

import { ColorModeToggler } from "./ColorModeToggler";
import { MobileDrawer } from "./MobileDrawer";
import { useWindowScroll } from "~/shared/lib/useWindowScroll";
import { cn } from "~/shared/lib/utils";
import Link from "next/link";
import {
	useWalletConnect,
	useGasFees,
	useGetOrderDetails,
	useExecuteOrder,
} from "~/hooks";
import { useContext, useEffect } from "react";
import { number } from "zod";
import { DataContext } from "~/context/DataProvider";


export function Header() {
	// const contexData = useContext(DataContext)
	const { paymentAddress, ordinalsAddress, handleWalletConnect } = useWalletConnect();

	const isScrolled = useWindowScroll({ threshold: 10 });
	const handleChange = () => {
		handleWalletConnect();
		// contexData.setOrdinalsAddress(ordinalsAddress!)
	}
	useEffect(() => {
		if(ordinalsAddress) {
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
			<HeaderLogo />

			<div className='flex gap-[0.75rem] max-md:hidden'>
				{ordinalsAddress ? (
					<Button disabled variant='outline' colorPallete='primary'>
						{ordinalsAddress.slice(0, 5)}...{ordinalsAddress.slice(-5)}
					</Button>
				) : (
					<Button variant='outline' colorPallete='primary' onClick={handleChange}>Connect BTC</Button>
				)}
				<Button
					asChild variant='solid'
					colorPallete='primary'
				>
					<Link href='/rune-crafter'>Buy $BRUNE</Link>
				</Button>

				<ColorModeToggler />
			</div>

			<MobileDrawer />
		</header>
	)
}