'use client';

import { useState } from "react";
import { cn } from "~/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/common";

export function MintsPopover({ mints }: { mints: number; }) {
	const [open, setOpen] = useState(false);

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
				<p className='text-black-40'>
					Mint ends in 209,647 blocks (1,050,000)
				</p>

				<hr className='border-white/10' />

				<div className='flex gap-[0.75rem] w-full'>
					<div className='flex flex-col gap-[0.25rem] w-full'>
						<h3>Status</h3>
						<p className='text-black-60'>
							62,950 (0.00%) circulating
						</p>
					</div>

					<div className='flex flex-col gap-[0.25rem] w-full'>
						<h3>Status</h3>
						<p className='text-black-60'>
							62,951 confirmed
						</p>
						<p className='text-primary'>
							3,139 pending
						</p>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
