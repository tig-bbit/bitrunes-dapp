import { PropsWithChildren } from "react";
import { cn } from "~/shared/lib/utils";
import { ComingSoonModal } from "./ComingSoonModal";
import { Header } from "./Header";

export function Page({ children }: PropsWithChildren) {
	return (
		<main className={cn(
			'flex flex-col gap-[1rem] max-w-[90rem] m-auto h-full font-inter',
			'p-[1.25rem] pt-0 max-md:p-[0.75rem] max-md:pt-0'
		)}>
			<Header />
			<div
				className={cn(
					'flex flex-col items-center gap-[4rem] grow p-[3rem]',
					'border border-secondary rounded-[1rem] grow',
					'bg-white/[.04] light:bg-white/[.3]',
					'max-md:p-[1rem] max-md:gap-[1rem]'
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