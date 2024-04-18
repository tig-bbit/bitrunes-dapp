import Link from "next/link";
import { Button } from "~/shared/ui/common";
import { HTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import { NavButtonsFooter } from "../NavButtonsFooter";

export function SummaryForm() {
	return (
		<div className='flex flex-col items-center gap-[2.5rem]'>
			<h1 className='font-semibold text-[2rem] text-center'>
				Summary
			</h1>

			<div className='flex flex-col items-center gap-[2rem]'>
				<div className='flex flex-col items-center gap-[1rem]'>
					<Image
						src='/images/swaple-image.png'
						width={256} height={256}
						className='size-[7.5rem]'
						alt='Swaple image'
						draggable={false}
					/>

					<Record
						className='text-[1.25rem]'
						label={
							<span>
								Swaple <span className='text-black-60'>$SWPL</span>
							</span>
						}
					>
						Blockchain: Bitcoin
					</Record>
				</div>

				<Record label='Description'>
					DeFi stacking, pool and farming token
				</Record>

				<div className='flex items-center gap-[2rem]'>
					<Record label='Supply Type'>
						Fixed
					</Record>
					<Record label='Initial Supply'>
						178 000 000 000
					</Record>
					<Record label='Maximum Supply'>
						178 000 000 000
					</Record>
				</div>
			</div>

			<Record className='text-primary' label='TOTAL $30.00'>
				Currency: ETH
			</Record>

			<NavButtonsFooter>
				<Button asChild variant='outline'>
					<Link href='/etcher/limits-rules'>Go Back</Link>
				</Button>
				<Button colorPallete='primary'>
					Deploy
				</Button>
			</NavButtonsFooter>
		</div>
	);
}

interface RecordProps extends HTMLAttributes<HTMLHeadingElement> {
	label: ReactNode
}

function Record({ label, children, ...props }: RecordProps) {
	return (
		<div className='flex flex-col items-center gap=[0.5rem]'>
			<h3 {...props}>{label}</h3>
			<p className='text-black-40'>{children}</p>
		</div>
	)
}