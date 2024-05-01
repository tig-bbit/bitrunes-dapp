import { useCallback, useMemo } from "react";
import { useToast } from "~/shared/ui/common";

type CreateMintOrderRequest = {
	runeName: string;
	repeats: number;
	refundAddress: string;
	destinationAddress: string;
	feeRate: number;
	appServiceFee?: number;
	appServiceFeeAddress?: string;
};

type EstimateMintOrderRequest = Omit<CreateMintOrderRequest, 'refundAddress'>;

export function useMintRunes() {
	const { toast } = useToast();

	const getEstimateMint = useCallback(async (params: EstimateMintOrderRequest) => {
		const { BitcoinNetworkType, request } = await import("sats-connect");
		const response = await request('runes_estimateMint', {
			...params,
			network: BitcoinNetworkType.Mainnet,
		});

		if (response.status === "success")
			return response.result;

		toast({
			variant: 'error', title: 'Error',
			description: response.error.message
		});

		return null;
	}, [toast]);

	const mint = useCallback(async (params: CreateMintOrderRequest) => {
		const { BitcoinNetworkType, request } = await import("sats-connect");
		const response = await request('runes_mint', {
			...params,
			network: BitcoinNetworkType.Mainnet,
		});

		if (response.status === "success")
			return response.result;

		toast({
			variant: 'error', title: 'Error',
			description: response.error.message
		});

		return null;
	}, [toast]); 

	return useMemo(() => ({
		getEstimateMint, mint
	}), [getEstimateMint, mint])
}