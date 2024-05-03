"use client"

import { PropsWithChildren} from "react";
import { cn } from "~/shared/lib/utils";
import { Header } from "./Header";

export function Page({ children }: PropsWithChildren) {
	return (
		<main className={cn(
			'flex flex-col gap-[1rem] max-w-[90rem] m-auto h-full font-inter',
			'p-[1.25rem] pt-0 max-md:p-[0.75rem] max-md:pt-0'
		)}>

			<>
				<Header />
				<div className='grow'>
					{children}
				</div>
			</>
		</main >
	);
}