"use client";

import {
	OrderDetails,
	OrderRune,
	Rune,
	RuneTransactionEstimate,
} from "./types";

import { useState } from "react";
import { BITCOIN_NODE_URL } from "../../config/bitcoin";

export function useGetOrderDetails() {
	const [orderDetails, setOrderDetails] = useState<OrderDetails>();

	const [estimateRuneData, setEstimateRuneData] =
		useState<RuneTransactionEstimate>();

	const getOrderDetails = async (rune: OrderRune) => {
		const response = await fetch(`${BITCOIN_NODE_URL}/runes/etch/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(rune),
		});
		const data = await response.json();
		setOrderDetails(data);
	};

	const getEstimateOrderDetails = async (rune: Rune) => {
		const response = await fetch(`${BITCOIN_NODE_URL}/runes/etch/estimate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(rune),
		});
		const data = await response.json();
		setEstimateRuneData(data);
	};
	return {
		orderDetails,
		getOrderDetails,
		getEstimateOrderDetails,
		estimateRuneData,
	};
}