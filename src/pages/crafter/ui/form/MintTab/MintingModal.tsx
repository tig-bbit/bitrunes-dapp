'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Skeleton
} from '~/shared/ui/common'

import { ComponentPropsWithoutRef } from 'react';
import { SchemaType } from './validation';
import { useServiceFees } from '../../inputs/FeeToggle';
import { useMintingEstimateQuery } from './actions';

interface OrderModalProps extends ComponentPropsWithoutRef<typeof Dialog> {
	formData: SchemaType
}

export function MintingModal({ formData, ...props }: OrderModalProps) {
	const { data: fees } = useServiceFees();
	const wantedFee = formData.fee;
	const resolvedFee = wantedFee.type == 'custom' ? wantedFee.custom : fees.get(wantedFee.type) ?? 0;

	const { data: estimates } = useMintingEstimateQuery({ 
		request: {
			runeName: formData.runeTicker,	
			feeRate: resolvedFee,
			repeats: formData.repeatMint
		}, 
		enabled: props?.open 
	})

	return (
		<Dialog {...props}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Estimates</DialogTitle>
					<DialogDescription className='flex flex-col gap-[0.5rem] text-inherit'>
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
								{resolvedFee ?? '0000'}
							</Skeleton>
						</div>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="md:justify-center">
					<Button
						variant='solid' colorPallete='primary'
					>
						Execute Mint
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}