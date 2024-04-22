'use client';

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/common";
import { Icons } from "~/shared/ui/icons";

export function InputHint({ text }: { text: string }) {
	const [open, setOpen] = useState(false);

	return (
		<Popover 	
			open={open} onOpenChange={setOpen}
		>
			<PopoverTrigger
				onPointerEnter={() => setOpen(true)}
				onPointerLeave={() => setOpen(false)}
				asChild
			>
				<div className='flex items-center justify-center h-full px-[0.25rem] cursor-help text-black-40'>
					<Icons.Hint className='size-[1rem]' />
				</div>
			</PopoverTrigger>
			<PopoverContent className='flex gap-[0.75rem] text-[0.875rem]'>
				<div className='flex items-center justify-center h-auto'>
					<Icons.Hint className='size-[1rem]' />
				</div>

				<p>
					{text}
				</p>
			</PopoverContent>
		</Popover>
	);
}