import {
	EstimateMintOrderRequest,
	CreateMintOrderRequest,
	useBtcWallet,
	useMintRunes
} from "~/shared/lib/bitcoin";

import { useMutation, useQuery } from "@tanstack/react-query";

interface UseMintingEstimateQueryProps {
	request: Omit<EstimateMintOrderRequest, 'destinationAddress'>,
	enabled?: boolean
}

export function useMintingEstimateQuery({ request, enabled }: UseMintingEstimateQueryProps) {
	const { getEstimateMint } = useMintRunes();
	const wallet = useBtcWallet();

	return useQuery({
		enabled,
		retry: false,
		queryKey: ['minting-estimate', ...Object.values(request)],
		queryFn: async () => {
			const { ordinalsAddress } = await wallet.requireWalletAddresses();

			if (!ordinalsAddress)
				throw { type: 'no-ordinals-address', message: `Wallet is not conntected` };

			const estimates = await getEstimateMint({
				...request,
				destinationAddress: ordinalsAddress
			})

			if (!estimates)
				throw { type: 'no-estimates', message: `Could not get estimates for minting` };

			return estimates;
		}
	})
}

export function useMintAction() {
	const wallet = useBtcWallet();
	const { mint } = useMintRunes();

	const action = async (values: Omit<CreateMintOrderRequest, 'destinationAddress' | 'refundAddress'>) => {
		const {
			ordinalsAddress: destinationAddress,
			paymentAddress: refundAddress
		} = await wallet.requireWalletAddresses();

		if (!destinationAddress || !refundAddress)
			throw { type: 'no-ordinals-address', message: `Wallet is not conntected` };

		const order = await mint({
			...values,
			destinationAddress,
			refundAddress
		})

		if (!order)
			throw { type: 'no-order-result', message: `Could not perform order` };
	}

	return useMutation({ mutationFn: action });
}