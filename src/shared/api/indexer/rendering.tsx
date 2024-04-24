import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'

import { PropsWithChildren } from 'react';
import { createClient } from './createClient';

interface IndexerHydrationBoundaryProps extends PropsWithChildren {
	prefetchCallback: (client: QueryClient) => Promise<void>;
}

export async function IndexerHydrationBoundary({ children, prefetchCallback }: IndexerHydrationBoundaryProps) {
	const client = createClient();
	await prefetchCallback(client);

	return (
		<HydrationBoundary state={dehydrate(client)}>
			{children}
		</HydrationBoundary>
	);
}