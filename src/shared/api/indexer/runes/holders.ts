import {
	QueryClient,
	keepPreviousData,
	queryOptions,
	useQuery
} from "@tanstack/react-query";

import { mapRuneHolderDto } from "./dto";

interface QueryParams {
	runeName: string,
	page?: number
	limit?: number
}

const getOptions = ({ runeName, page = 1, limit = 10 }: QueryParams) =>
	queryOptions({
		queryKey: ['rune-holders', runeName, page, limit],
		queryFn: async () => {
			const res = await fetch(`/api/runes/${runeName}/holders?skip=${(page - 1) * limit}&take=${limit}`);
			const body = await res.json();
			
			if(!res.ok)
				throw new Error(body)

			const items = body.data.data.res.data as unknown[];

			return { 
				items: items.map(mapRuneHolderDto), 
				total: body.data.data.total
			};
		},
		placeholderData: keepPreviousData,
		refetchInterval: 30_000
	})

export async function prefetchHoldersQuery(client: QueryClient, params: QueryParams) {
	return await client.prefetchQuery(getOptions(params));
}

export function useHoldersQuery(params: QueryParams) {
	return useQuery(getOptions(params));
}