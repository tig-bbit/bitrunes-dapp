import { useQuery } from "@tanstack/react-query";
import { EstimateMintOrderRequest, useBtcWallet, useMintRunes } from "~/shared/lib/bitcoin";

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