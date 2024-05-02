import {
	fetchFees,
	orderApiClient,
	useBtcWallet
} from "~/shared/lib/bitcoin";

import { SchemaType } from "./validation";
import { OrderDetails } from "~/shared/lib/bitcoin/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AppError } from "../AppError";

const ErrorFeeNotAvailable: AppError = { type: 'no-fee', message: 'Fee rate not available' };

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

interface UseOrderEstimatesQueryProps {
	formData: SchemaType,
	enabled?: boolean
}

export function useOrderEstimatesQuery({ formData, enabled }: UseOrderEstimatesQueryProps) {
	return useQuery({
		enabled,
		retry: false,
		queryKey: ['etching-estimates', ...Object.values(formData)],
		queryFn: async () => {
			const order = await buildOrder(formData);
			if (!order)
				throw ErrorFeeNotAvailable;

			const { data, error } = await orderApiClient.getEstimateOrderDetails(order);
			if (error)
				throw error;

			return data;
		},
	});
}

export function useCreateOrderAction() {
	const wallet = useBtcWallet();

	const action = async (values: SchemaType) => {
		const { ordinalsAddress } = await wallet.requireWalletAddresses();

		if (!ordinalsAddress)
			throw { type: 'no-ordinals-address', message: `Wallet is not conntected` };

		const order = await buildOrder(values);
		if (!order)
			throw ErrorFeeNotAvailable;

		const { data, error } = await orderApiClient.createOrder({
			...order,
			refundAddress: ordinalsAddress!
		});

		if (error)
			throw error;

		return data;
	}

	return useMutation({ mutationFn: action });
}

export function useExecuteOrderAction() {
	const wallet = useBtcWallet();

	const action = async (order: OrderDetails) => {
		const response = await wallet.pay(order.fundAddress, order.fundAmount);
		if (!response)
			throw { type: 'no-pay', message: 'Cannot pay' }

		const orderId = order.orderId;
		const transactionId = response.txid;

		const { data, error } = await orderApiClient.executeOrder(orderId, transactionId);

		if (error)
			throw error;

		return data;
	}

	return useMutation({ mutationFn: action });
}