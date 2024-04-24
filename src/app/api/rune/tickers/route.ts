import { NextResponse } from "next/server";
import { apiBaseUrl } from "../../apiBaseUrl";

export async function GET(request: Request) {
	const url = new URL(request.url);

	const response = await fetch(`${apiBaseUrl}/runes/tickers?${url.searchParams}`, {
		next: { revalidate: 5000 }
	});

	const data = await response.json();

	return NextResponse.json({ data });
}