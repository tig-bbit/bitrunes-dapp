import { NextResponse } from "next/server";
import { INDEXER_API_URL } from "~/shared/config/indexer";

export async function GET(request: Request) {
	const url = new URL(request.url);

	const response = await fetch(`${INDEXER_API_URL}/runes/tickers?${url.searchParams}`, {
		next: { revalidate: 5000 }
	});

	const data = await response.json();

	return NextResponse.json({ data });
}