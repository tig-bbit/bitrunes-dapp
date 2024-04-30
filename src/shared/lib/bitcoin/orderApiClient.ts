"use client";

import {
	OrderDetails,
	OrderRune,
	Rune,
	RuneTransactionEstimate,
} from "./types";

import { BITCOIN_NODE_API_URL } from "../../config/bitcoin";
import { ApiErrorResponse, ApiOkResponse, UnknownApiError } from "../response";

export const orderApiClient = {
	async getEstimateOrderDetails(rune: Rune) {
		const response = await fetch(`${BITCOIN_NODE_API_URL}/runes/etch/estimate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(rune),
		});

		if (!response.ok)
			return UnknownApiError

		const data = await response.json() as RuneTransactionEstimate;
		return ApiOkResponse('estimate', data);
	},
	async createOrder(rune: OrderRune) {
		const response = await fetch(`${BITCOIN_NODE_API_URL}/runes/etch/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(rune),
		});

		if (!response.ok)
			return UnknownApiError

		const data = await response.json() as OrderDetails;
		return ApiOkResponse('order-details', data);
	},
	async executeOrder(orderId: string, transactionId: string) {
		const response = await fetch(`${BITCOIN_NODE_API_URL}/runes/etch/orders/${orderId}/execute`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fundTransactionId: transactionId
			})
		});

		if (response.ok) {
			return ApiOkResponse('ok', {
				getTransactionDetailsUrl: () => `https://mempool.space/testnet/tx/${transactionId}`
			});
		}

		const body = await response.json()

		return ApiErrorResponse('order-execution-error', { message: body.message });
	}
}