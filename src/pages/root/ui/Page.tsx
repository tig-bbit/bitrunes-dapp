import { PropsWithChildren } from "react";
import { Button } from "~/shared/ui/common";
import { HeaderLogo } from "./HeaderLogo";
import { cn } from "~/shared/lib/utils";
import Link from "next/link";
import { ColorModeToggler } from "./ColorModeToggler";
import { ComingSoonModal } from "./ComingSoonModal";

export function Page({ children }: PropsWithChildren) {
	return (
		<main className='flex flex-col gap-[1rem] p-[1.25rem] h-screen max-w-[90rem] m-auto font-inter'>
			<header className='flex justify-between'>
				<HeaderLogo />

				<div className='flex gap-[0.75rem]'>
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
						<Link href='/etcher'>Buy $RUNES</Link>
					</Button>

					<ColorModeToggler />
				</div>
			</header>
			<div
				className={cn(
					'flex flex-col items-center gap-[4rem] grow p-[3rem]',
					'border border-secondary rounded-[1rem] grow',
					'bg-white/[.04] light:bg-white/[.3]'
				)}
				style={{
					backgroundImage: 'radial-gradient(rgb(189 189 189 / 4%) -25%, rgba(255, 255, 255, 0))'
				}}
			>
				{children}

				<ComingSoonModal />
			</div>
		</main>
	);
}