"use server";

import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

import { createClient } from "./createClient";
import { PropsWithChildren } from "react";

interface IndexerHydrationBoundaryProps extends PropsWithChildren {
	prefetchCallback: (client: QueryClient) => Promise<void>;
}

export async function IndexerHydrationBoundary({
	children,
	prefetchCallback,
}: IndexerHydrationBoundaryProps) {
	const client = createClient()
	
	await prefetchCallback(client);

	return (
		<HydrationBoundary state={dehydrate(client)}>
			{children}
		</HydrationBoundary>
	);
}