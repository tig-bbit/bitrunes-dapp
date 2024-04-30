import {
	fetchFees,
	orderApiClient,
	useBtcWallet
} from "~/shared/lib/bitcoin";

import { SchemaType } from "./validation";
import { ApiErrorResponse } from "~/shared/lib/response";
import { OrderDetails } from "~/shared/lib/bitcoin/types";
import { useToast } from "~/shared/ui/common";

const ErrorFeeNotAvailable = ApiErrorResponse('no-fee', { message: 'Fee rate not available' });

const buildOrder = async (values: SchemaType) => {
	const fees = await fetchFees();
	if (!fees)
		return null;

	return {
		runeName: values.runeName.toUpperCase(),
		isMintable: values.mintType !== 'closed',
		feeRate: fees.fastestFee,
		destinationAddress: values.destAddress,
		symbol: values.runeSymbol,
		premine: values.premine,
		divisibility: values.divisibility,

		...(values.mintAmount && values.mintCap && {
			terms: { amount: values.mintAmount, cap: values.mintCap },
		}),
	};
}

export function useGetOrderEstimateAction() {
	return async (values: SchemaType) => {
		const order = await buildOrder(values);
		if (!order)
			return ErrorFeeNotAvailable;

		return await orderApiClient.getEstimateOrderDetails(order);
	}
}

export function useCreateOrderAction() {
	const wallet = useBtcWallet();

	return async (values: SchemaType) => {
		let ordinalsAddress = wallet.ordinalsAddress;

		if (!ordinalsAddress) {
			const connectionResponse = await wallet.connectWallet();
			if (!connectionResponse.ordinalsAddress)
				return ApiErrorResponse('no-ordinals-address', { message: `Wallet is not conntected` });

			ordinalsAddress = connectionResponse.ordinalsAddress
		}

		const order = await buildOrder(values);
		if (!order)
			return ErrorFeeNotAvailable;

		return await orderApiClient.createOrder({
			...order,
			refundAddress: ordinalsAddress!
		});
	}
}

export function useExecuteOrderAction() {
	const wallet = useBtcWallet();
	const { toast } = useToast();

	return async (order: OrderDetails) => {
		const response = await wallet.pay(order.fundAddress, order.fundAmount);
		if (!response)
			return null;

		const orderId = order.orderId;
		const transactionId = response.txid;

		const executingResponse = await orderApiClient.executeOrder(orderId, transactionId);

		if(executingResponse.error) {
			toast({
				variant: 'error', title: 'Error',
				description: executingResponse.error.message
			})
		}
		else {
			toast({
				title: 'Success!',
				description: 'Order executed successfully'
			})
		}

		return executingResponse;
	}
}