"use client";

import { FeeEstimate } from "./types";
import { useEffect, useState } from "react";
import { BITCOIN_MEMPOOL_URL } from "~/shared/config/bitcoin";

export async function fetchFees() {
	const response = await fetch(BITCOIN_MEMPOOL_URL);
	return await response.json() as FeeEstimate;
}

export function useGasFees() {
	const [fees, setFees] = useState<FeeEstimate | undefined>();

	useEffect(() => {
		fetchFees().then(setFees);
	}, []);

	return fees;
}
