'use client';

import { useState } from "react";
import { Rune } from "~/shared/api/indexer";
import { cn } from "~/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger, Progress } from "~/shared/ui/common";

interface ProgressInfo {
	rune: Rune
}

export function ProgressPopover({ rune }: ProgressInfo) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				onPointerEnter={() => setOpen(true)}
				onPointerLeave={() => setOpen(false)}
				asChild
			>
				<div
					className={cn(
						'flex flex-col gap-[0.125rem] p-[0.5rem] rounded-[0.25rem] cursor-pointer',
						open && 'bg-white/[.08]'
					)}
				>
					<Progress
						className='h-[0.25rem]'
						value={rune.progress}
					/>

					<div className='flex justify-between w-full text-[0.75rem]'>
						<span>{rune.progress.toFixed(2)}%</span>
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent className='flex flex-col gap-[0.75rem] text-[0.875rem]'>
				<p className='text-black-60 flex justify-between'>
					<span>Minted</span>
					<span>{rune.mints}/{rune.terms_cap}</span>
				</p>

				{/* <hr className='border-white/10' />

				<div className='flex gap-[0.75rem] w-full'>
					<div className='flex flex-col gap-[0.25rem] w-full'>
						<h3>Status</h3>
						<p className='text-black-60'>
							{pending} {progress} (Calculating)
						</p>
					</div>

					<div className='flex flex-col gap-[0.25rem] w-full'>
						<h3>Mints</h3>
						<p className='text-black-60'>
							62,951 confirmed
						</p>
						<p className='text-primary'>
							3,139 pending
						</p>
					</div>
				</div> */}
			</PopoverContent>
		</Popover>
	);
}
