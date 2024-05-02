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

import { 
	useCreateOrderAction, 
	useExecuteOrderAction, 
	useOrderEstimatesQuery 
} from './actions';
import { isAppError } from "../AppError";

import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { SchemaType } from './validation';
import { useGasFees } from '~/shared/lib/bitcoin';
import { OrderDetails } from '~/shared/lib/bitcoin/types';
import { truncateStrFromMiddle } from '~/shared/lib/truncate';

interface OrderModalProps extends ComponentPropsWithoutRef<typeof Dialog> {
	formData: SchemaType
}

export function OrderModal({ formData, open, ...props }: OrderModalProps) {
	const { toast } = useToast();
	const { data: fees } = useGasFees();
	const { data: estimates, error } = useOrderEstimatesQuery({ formData, enabled: open })
	const [isEstimatesReceived, setIsEstimatesReceived] = useState(false);

	const {
		mutateAsync: createOrder,
		isPending: isCreateOrderPending
	} = useCreateOrderAction();

	const {
		mutateAsync: executeOrder,
		isPending: isExecuteOrderPending
	} = useExecuteOrderAction();

	const [order, setOrder] = useState<OrderDetails | null>(null);

	useEffect(() => {
		if (isAppError(error)) {
			toast({
				variant: 'error', title: 'Error',
				description: error.message
			})
		}
	}, [toast, error])

	useEffect(() => {
		setIsEstimatesReceived(!!estimates);
	}, [estimates])

	const handleCreateOrderClick = async () => {
		try {
			const result = await createOrder(formData);
			setOrder(result);
		}
		catch (error: unknown) {
			if (isAppError(error)) {
				toast({
					variant: 'error', title: 'Error',
					description: error.message
				})
			}

			props?.onOpenChange?.(false);
		}
	}

	const handleExecuteOrder = async () => {
		if (!order)
			return;

		try {
			await executeOrder(order);

			toast({
				title: 'Success!',
				description: 'Order executed successfully'
			})
		}
		catch (error: unknown) {
			if (isAppError(error)) {
				toast({
					variant: 'error', title: 'Error',
					description: error.message
				})
			}
		}

		props?.onOpenChange?.(false);
	}

	if (order) {
		return (
			<Dialog {...props} open={open}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Order details</DialogTitle>
						<DialogDescription className='flex flex-col gap-[0.5rem] text-inherit'>
							<div className='flex justify-between w-full gap-[1rem]'>
								<span className='text-black-40'>Order Id</span>
								<span>{order.orderId}</span>
							</div>

							<div className='flex justify-between w-full gap-[1rem]'>
								<span className='text-black-40'>Fund Address</span>
								<span>{truncateStrFromMiddle(order.fundAddress)}</span>
							</div>

							<div className='flex justify-between w-full gap-[1rem]'>
								<span className='text-black-40'>Fund Amount</span>
								<span>{order.fundAmount}</span>
							</div>
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="md:justify-center">
						<Button
							variant='solid' colorPallete='primary'
							onClick={handleExecuteOrder}
							disabled={isExecuteOrderPending}
						>
							Pay
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Dialog {...props} open={open && isEstimatesReceived}>
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
								{fees?.fastestFee ?? '0000'}
							</Skeleton>
						</div>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="md:justify-center">
					<Button
						variant='solid' colorPallete='primary'
						onClick={handleCreateOrderClick}
						disabled={isCreateOrderPending}
					>
						Create Order
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}