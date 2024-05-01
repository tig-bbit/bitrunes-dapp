'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Skeleton,
	useToast
} from '~/shared/ui/common'

import { ComponentPropsWithoutRef, useEffect, useMemo, useState } from 'react';
import { SchemaType } from './validation';
import { useServiceFees } from '../../inputs/FeeToggle';
import { useMintAction, useMintingEstimateQuery } from './actions';
import { isAppError } from '../AppError';

interface OrderModalProps extends ComponentPropsWithoutRef<typeof Dialog> {
	formData: SchemaType
}

export function MintingModal({ formData, open, ...props }: OrderModalProps) {
	const { toast } = useToast();
	const { data: fees } = useServiceFees();
	const [satsModalPassed, setSatsModalPassed] = useState(false);

	const {
		mutateAsync: executeMint,
		isPending: isExecuteMintPending
	} = useMintAction();

	const request = useMemo(() => {
		const wantedFee = formData.fee;
		const resolvedFee = wantedFee.type == 'custom' ? wantedFee.custom : fees.get(wantedFee.type) ?? 0;

		return {
			runeName: formData.runeTicker,
			feeRate: resolvedFee,
			repeats: formData.repeatMint
		}
	}, [formData, fees]);

	const { data: estimates } = useMintingEstimateQuery({
		request, enabled: open
	})

	useEffect(() => {
		if (estimates)
			setSatsModalPassed(true);
	}, [estimates])

	const handleExecuteMintClick = async () => {
		try {
			await executeMint(request);
		}
		catch (error) {
			if (isAppError(error)) {
				toast({
					variant: 'error', title: 'Error',
					description: error.message
				})
			}
		}
		finally {
			props?.onOpenChange?.(false);
		}
	}

	return (
		<Dialog {...props} open={open && satsModalPassed}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Estimates</DialogTitle>
					<DialogDescription className='flex flex-col gap-[0.5rem] text-inherit'>
						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Rune</span>
							<Skeleton loading={!estimates}>
								{formData.runeTicker}
							</Skeleton>
						</div>

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Repeat Mint</span>
							<Skeleton loading={!estimates}>
								{formData.repeatMint}
							</Skeleton>
						</div>

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Postage</span>
							<Skeleton loading={!estimates}>
								{estimates?.costBreakdown.postage ?? '0000'}
							</Skeleton>
						</div>

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Network Fee</span>
							<Skeleton loading={!estimates}>
								{estimates?.costBreakdown.networkFee ?? '0000'}
							</Skeleton>
						</div>

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Service Fee</span>
							<Skeleton loading={!estimates}>
								{estimates?.costBreakdown.serviceFee ?? '0000'}
							</Skeleton>
						</div>

						<hr className='border-secondary mt-[1rem]' />

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Total Cost</span>
							<Skeleton loading={!estimates}>
								{estimates?.totalCost ?? '0000'}
							</Skeleton>
						</div>

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Est. Mempool Fee Rate (priority)</span>
							<Skeleton loading={!fees}>
								{request.feeRate ?? '0000'}
							</Skeleton>
						</div>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="md:justify-center">
					<Button
						variant='solid' colorPallete='primary'
						onClick={handleExecuteMintClick}
						disabled={isExecuteMintPending}
					>
						Execute Mint
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}