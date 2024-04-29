'use client';

import { useRuneHoldersQuery } from "~/shared/api/indexer";
import { Skeleton } from "~/shared/ui/common";

export function HoldersCount({ runeName }: { runeName: string }) {
	const { data } = useRuneHoldersQuery({ runeName });

	return data ? (
		<span>{data.total}</span>
	) : (
		<Skeleton className={'w-[3em] h-[1em] rounded-sm'} />
	);
}