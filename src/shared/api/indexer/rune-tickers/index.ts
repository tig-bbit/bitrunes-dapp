import {
	QueryClient,
	keepPreviousData,
	queryOptions,
	useQuery
} from "@tanstack/react-query";
import { mapRuneDto } from "./dto";

interface PaginationProps {
	page?: number
	limit?: number
}

const getOptions = ({ page = 0, limit = 10 }: PaginationProps = {}) =>
	queryOptions({
		queryKey: ['rune-tickers', page, limit],
		queryFn: async () => {
			const res = await fetch(`/api/rune/tickers?skip=${(page - 1) * limit}&take=${limit}`);
			const body = await res.json();
			const items = body.data.data as unknown[];

			return { 
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				items: items.map(mapRuneDto), 
				total: body.data.total 
			};
		},
		placeholderData: keepPreviousData,
		refetchInterval: 10_000
	})

export async function prefetchQuery(client: QueryClient) {
	return await client.prefetchQuery(getOptions());
}

export function useTickerQuery(props: PaginationProps = {}) {
	return useQuery(getOptions(props));
}