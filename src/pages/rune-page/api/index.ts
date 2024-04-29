import { mapRuneDetailsDto } from "~/shared/api/indexer";
import { INDEXER_API_URL } from "~/shared/config/indexer";

export async function fetchRuneDetails(runeName: string) {
	const response = await fetch(`${INDEXER_API_URL}/runes/${runeName}`, {
		next: { revalidate: 5000 }
	});

	const { data } = await response.json();

	return mapRuneDetailsDto(data);
}