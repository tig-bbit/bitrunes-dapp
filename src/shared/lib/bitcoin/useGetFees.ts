"use client";

import { useQuery } from "@tanstack/react-query";
import { FeeEstimate } from "./types";
import { BITCOIN_MEMPOOL_API_URL } from "~/shared/config/bitcoin";

export async function fetchFees() {
	const response = await fetch(BITCOIN_MEMPOOL_API_URL + '/fees/recommended');
	if (!response.ok)
		throw new Error();

	return await response.json() as FeeEstimate;
}

export function useGasFees() {
	return useQuery({
		queryFn: fetchFees,
		queryKey: ['fees'],
		refetchInterval: 10_000
	})
}