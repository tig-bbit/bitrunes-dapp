import { NextResponse } from "next/server";
import { INDEXER_API_URL } from "~/shared/config/indexer";

interface PageProps {
	params: {
		runeName: string
	}
}

export async function GET(request: Request, { params }: PageProps) {
	const response = await fetch(`${INDEXER_API_URL}/runes/${params.runeName}`, {
		next: { revalidate: 1000 }
	});

	const data = await response.json();

	return NextResponse.json({ data });
}