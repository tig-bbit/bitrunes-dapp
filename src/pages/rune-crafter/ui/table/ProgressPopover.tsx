'use client';

import { useState } from "react";
import { cn } from "~/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger, Progress } from "~/shared/ui/common";

interface ProgressInfo {
	progress: number,
	pending: number
}

export function ProgressPopover({ progress, pending }: ProgressInfo) {
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
						value={progress}
					/>

					<div className='flex justify-between w-full text-[0.75rem]'>
						<span>{progress}%</span>
						<span className='text-primary'>{pending} pending</span>
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent className='flex flex-col gap-[0.75rem] text-[0.875rem]'>
				<div className='flex gap-[0.75rem] w-full'>
					<div className='flex flex-col gap-[0.25rem] w-full'>
						<h3>Blocks</h3>

						<div className='flex justify-between w-full text-black-60'>
							<span>1 block:</span>
							<span>0</span>
						</div>
						<div className='flex justify-between w-full text-black-60'>
							<span>3 block:</span>
							<span>0</span>
						</div>
						<div className='flex justify-between w-full text-black-60'>
							<span>10 block:</span>
							<span>26881</span>
						</div>
					</div>

					<div className='flex flex-col gap-[0.25rem] w-full'>
						<h3>Days</h3>

						<div className='flex justify-between w-full text-black-60'>
							<span>1 day:</span>
							<span>100001</span>
						</div>
						<div className='flex justify-between w-full text-black-60'>
							<span>3 days:</span>
							<span>100001</span>
						</div>
						<div className='flex justify-between w-full text-black-60'>
							<span>7 days:</span>
							<span>100001</span>
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
