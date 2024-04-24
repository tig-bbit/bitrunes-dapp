import { invariant } from "~/shared/lib/asserts";

export const apiBaseUrl = process.env.INDEXER_API_URL;

invariant(apiBaseUrl, 'Please define INDEXER_API_URL env variable without trailing slash');