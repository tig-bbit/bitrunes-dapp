"use client"
import { PropsWithChildren, useEffect, useState, useContext } from "react";
import DataProvider, { DataContext } from "~/context/DataProvider";
import { cn } from "~/shared/lib/utils";
import { ComingSoonModal } from "./ComingSoonModal";
import { Header } from "./Header";

export function Page({ children }: PropsWithChildren) {
	const [alertshow, setAlertShow] = useState(false);
	// const { setOrdinalsAddress } = useContext(DataContext);
	useEffect(() => {
		const alertShown = localStorage.getItem('alertShown');

		if (!alertShown) {
			setAlertShow(true);
			localStorage.setItem('alertShown', 'true');
		}
	}, []);
	return (
		<main className={cn(
			'flex flex-col gap-[1rem] max-w-[90rem] m-auto h-full font-inter',
			'p-[1.25rem] pt-0 max-md:p-[0.75rem] max-md:pt-0'
		)}>
			<DataProvider>
				
						<>
							<Header/>
							<div className='grow'>
								{children}
							</div>
							{alertshow ?
								<ComingSoonModal />
								:
								''
							}
						</>
			</DataProvider>

		</main>
	);
}