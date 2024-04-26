import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { mapRuneDetailsDto } from "./dto";

export const fetchDetails = async (runeName: string) => {
	const res = await fetch(`/api/runes/${runeName}`);
	const body = await res.json();

	if (!res.ok)
		throw new Error(body)

	const runeData = body.data.data;
	return runeData ? mapRuneDetailsDto(runeData) : null;
}

const getOptions = (runeName: string) =>
	queryOptions({
		queryKey: ['rune-details', runeName],
		queryFn: () => fetchDetails(runeName),
		placeholderData: keepPreviousData,
		refetchInterval: 60_000
	})

export function useDetailsQuery(runeName: string | null) {
	return useQuery({
		...getOptions(runeName ?? ''),
		enabled: !!runeName
	});
}