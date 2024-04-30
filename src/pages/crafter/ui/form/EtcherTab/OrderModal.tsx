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

import { DialogClose } from '@radix-ui/react-dialog';
import { ComponentPropsWithoutRef } from 'react';
import { SchemaType } from './validation';
import { useGasFees } from '~/shared/lib/bitcoin';
import { useGetOrderEstimateAction } from './actions';
import { useQuery } from '@tanstack/react-query';

interface OrderModalProps extends ComponentPropsWithoutRef<typeof Dialog> {
	formData: SchemaType
}

export function OrderModal({ formData, ...props }: OrderModalProps) {
	const { data: fees } = useGasFees();

	const fetchEstimates = useGetOrderEstimateAction()

	const { data: estimates } = useQuery({
		queryKey: ['estimates'],
		queryFn: async () => {
			const { data, error } = await fetchEstimates(formData);
			if (error)
				throw error;

			return data;
		},
		enabled: props?.open
	});

	return (
		<Dialog {...props}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Estimates</DialogTitle>
					<DialogDescription className='flex flex-col gap-[0.5rem] text-inherit'>
						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Est. Mempool Fee Rate (priority)</span>
							<Skeleton loading={!fees?.fastestFee}>
								{fees?.fastestFee}
							</Skeleton>
						</div>

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Postage</span>
							<Skeleton loading={!estimates?.costBreakdown.postage}>
								{estimates?.costBreakdown.postage}
							</Skeleton>
						</div>

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Network Fee</span>
							<Skeleton loading={!estimates?.costBreakdown.networkFee}>
								{estimates?.costBreakdown.networkFee}
							</Skeleton>
						</div>

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Service Fee</span>
							<Skeleton loading={!estimates?.costBreakdown.serviceFee}>
								{estimates?.costBreakdown.serviceFee}
							</Skeleton>
						</div>

						<hr className='border-secondary mt-[1rem]' />

						<div className='flex justify-between w-full gap-[1rem]'>
							<span className='text-black-40'>Total Cost</span>
							<Skeleton loading={!estimates?.costBreakdown.serviceFee}>
								{estimates?.totalCost}
							</Skeleton>
						</div>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="md:justify-center">
					<DialogClose asChild>
						<Button variant='solid' colorPallete='primary'>
							Create Order
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}