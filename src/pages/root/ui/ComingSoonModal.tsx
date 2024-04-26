'use client'

import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '~/shared/ui/common'

export function ComingSoonModal() {
	// yeah it's what nextjs or shadcn offering to do instead of defaultOpen={true}
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const alertShown = localStorage.getItem('alertShown');
		if(!alertShown) {
			localStorage.setItem('alertShown', 'true');
			setOpen(true)
		}
	}, [setOpen]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='max-w-[25.875rem]'>
				<DialogHeader>
					<DialogTitle>Notice</DialogTitle>
					<DialogDescription>
						This is the demo of our upcoming Bridge and Crafter features that will be a
						part of the Runepad. For the ETA consult the roadmap, and stay up to date with our socials.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="md:justify-center">
					<DialogClose asChild>
						<Button variant='solid' colorPallete='primary'>
							Acknowledge
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}