'use client';

import { useState } from "react";
import { cn } from "~/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/common";

interface History {
	[key : string] : number;
}
interface DataProps {
	mints : number;
	history : History;
}

export function MintsPopover(props : DataProps) {
	const [open, setOpen] = useState(false);
	const {mints, history} = props;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				onPointerEnter={() => setOpen(true)}
				onPointerLeave={() => setOpen(false)}
				className={cn('px-[0.5rem] py-[0.25rem] rounded-[0.25rem]', open && 'bg-white/[.08]')}
			>
				{mints}
			</PopoverTrigger>
			
			<PopoverContent className='flex flex-col gap-[0.75rem] text-[0.875rem]'>
				<div className='flex gap-[0.75rem] w-full'>
					<div className='flex flex-col gap-[0.25rem] w-full'>
						<h3>Blocks</h3>

						<div className='flex justify-between w-full text-black-60'>
							<span>1 block:</span>
							<span>{history["1"]}</span>
						</div>
						<div className='flex justify-between w-full text-black-60'>
							<span>3 block:</span>
							<span>{history["3"]}</span>
						</div>
						<div className='flex justify-between w-full text-black-60'>
							<span>10 block:</span>
							<span>{history["10"]}</span>
						</div>
					</div>

					<div className='flex flex-col gap-[0.25rem] w-full'>
						<h3>Days</h3>

						<div className='flex justify-between w-full text-black-60'>
							<span>1 day:</span>
							<span>{history["1d"]}</span>
						</div>
						<div className='flex justify-between w-full text-black-60'>
							<span>3 days:</span>
							<span>{history["3d"]}</span>
						</div>
						<div className='flex justify-between w-full text-black-60'>
							<span>7 days:</span>
							<span>{history["7d"]}</span>
						</div>
					</div>
				</div>

				<hr className='border-white/10' />

				<p className='text-black-40'>
					All time 100,001
				</p>
			</PopoverContent>
		</Popover>
	);
}
