import { QueryClient } from '@tanstack/react-query';

export function createClient() {
	return new QueryClient();
}