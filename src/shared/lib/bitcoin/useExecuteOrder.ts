"use client";

import { BITCOIN_NODE_URL } from "~/shared/config/bitcoin";
import { ExecuteOrderResponse } from "~/shared/lib/bitcoin/types";
import { useState } from "react";
import { useToast } from "~/shared/ui/common";

export function useExecuteOrder() {
	const { toast } = useToast();

	const [executeOrderResponse, setExecuteOrderResponse] = useState<string>();
	const executeOrder = async ({
		orderId,
		fundTransactionId,
	}: ExecuteOrderResponse) => {
		if (!orderId || !fundTransactionId) {
			toast({
				variant: 'error',
				title: 'Error',
				description: 'Please provide order ID and fund transaction ID'
			});

			return;
		}
		const response = await fetch(
			`${BITCOIN_NODE_URL}/runes/etch/orders/${orderId}/execute`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ fundTransactionId }),
			}
		);
		const data = await response.json();
		console.log(data, response);
		if (response.ok) {
			toast({
				title: 'Success',
				description: 'Order executed successfully'
			});

			setExecuteOrderResponse(
				`https://mempool.space/testnet/tx/${fundTransactionId}`
			);
		} else {
			toast({
				variant: 'error',
				title: 'Error',
				description: data.message
			});
		}
	};

	return {
		executeOrder,
		executeOrderResponse,
	};
}
