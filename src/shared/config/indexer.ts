import { invariant } from "~/shared/lib/asserts";

export const INDEXER_API_URL = process.env.INDEXER_API_URL;

invariant(INDEXER_API_URL, 'Please define INDEXER_API_URL env variable without trailing slash');