import {
	QueryClient,
	keepPreviousData,
	queryOptions,
	useQuery
} from "@tanstack/react-query";

import { mapRuneDto } from "./dto";

interface QueryParams {
	page?: number
	limit?: number
}

const getOptions = ({ page = 1, limit = 10 }: QueryParams = {}) =>
	queryOptions({
		queryKey: ['rune-tickers', page, limit],
		queryFn: async () => {
			const res = await fetch(`/api/runes/tickers?skip=${(page - 1) * limit}&take=${limit}`);
			const body = await res.json();
			const items = body.data.data as unknown[];

			if(!res.ok)
				throw new Error(body)

			return { 
				items: items.map(mapRuneDto), 
				total: body.data.total 
			};
		},
		placeholderData: keepPreviousData,
		refetchInterval: 10_000
	})

export async function prefetchTickersQuery(client: QueryClient) {
	return await client.prefetchQuery(getOptions());
}

export function useTickersQuery(props: QueryParams = {}) {
	return useQuery(getOptions(props));
}