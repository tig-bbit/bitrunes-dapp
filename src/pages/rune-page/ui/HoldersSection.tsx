'use client';

import {
	Progress,
	Skeleton
} from "~/shared/ui/common";

import { useState } from "react";
import { Rune, useRuneHoldersQuery } from "~/shared/api/indexer";
import { truncateStrFromMiddle } from "~/shared/lib/truncate";
import { cn } from "~/shared/lib/utils";
import { PagePaper } from "~/shared/ui/layout";
import { Paginator } from "~/shared/ui/paginator";

const columns = [
	{
		label: 'Rank',
		type: 'rank',
		width: '10rem'
	},
	{
		label: 'Address',
		type: 'address',
		width: '100%',
	},
	{
		label: 'Amount',
		type: 'amount',
		width: '16rem',
	},
	{
		label: 'Percentage',
		type: 'percentage',
		width: '100%',
	}
]

const getColStyle = (index: number) => ({
	width: columns[index].width,
	padding: '0 0.5rem'
})

export function HoldersSection({ rune }: { rune: Rune }) {
	const limit = 10;
	const [page, setPage] = useState(1);
	const { data, isFetching } = useRuneHoldersQuery({
		runeName: rune.rune_name_wo_spacers, page, limit
	});

	const total = data?.total;

	return (
		<PagePaper className='items-start p-[1.5rem] h-full gap-[1rem]'>
			<h1 className='text-[1.5rem] font-semibold'>
				Top Holders
			</h1>

			<div className='w-full max-w-full overflow-x-auto grow gap-[1.5rem]'>
				<div
					className='flex flex-col gap-[1.5rem] grow w-full'
					style={{ width: 'max(100%, 50rem)' }}
				>
					<nav className='flex px-[0.75rem] py-[0.625rem] rounded-[0.875rem] border border-secondary'>
						{columns.map((col, index) => (
							<div
								key={col.type}
								style={getColStyle(index)}
							>
								{col.label}
							</div>
						))}
					</nav>

					<div className='shrink-0 grow'>
						{data?.items ? (
							data?.items?.map((row, index) => {
								const progress = row.total_balance / (rune.terms_amount * rune.terms_cap) * 100;

								return (
									<div
										key={index}
										className={cn(
											'px-[0.75rem] h-[3.375rem] rounded-[1rem] flex items-center text-[0.875rem]',
											index % 2 == 0 && 'bg-white/[.06] light:bg-black/[.06]',
										)}
									>
										<div style={getColStyle(0)}>
											{(page - 1) * limit + index + 1}
										</div>

										<div style={getColStyle(1)} title={row.wallet_addr}>
											{truncateStrFromMiddle(row.wallet_addr)}
										</div>

										<div style={getColStyle(2)}>
											{row.total_balance}
										</div>

										<div
											className='flex items-center gap-[1rem] text-primary'
											style={getColStyle(3)}
										>
											<Progress
												className='h-[0.25rem]'
												value={progress}
											/>
											<span>
												{progress.toFixed(2)}%
											</span>
										</div>
									</div>
								)
							})
						) : (
							Array.from({ length: limit }).map((_, index) => (
								<Skeleton
									key={index}
									className={cn(
										'w-full h-[3.375rem] rounded-[1rem]',
										index % 2 !== 0 && 'bg-transparent dark:bg-transparent'
									)}
								/>
							))
						)}
					</div>
				</div>
			</div>

			{total && total > limit && (
				<Paginator
					value={page} onChange={setPage}
					totalItems={total} limit={limit}
					disabled={isFetching}
				/>
			)}
		</PagePaper>
	);
}