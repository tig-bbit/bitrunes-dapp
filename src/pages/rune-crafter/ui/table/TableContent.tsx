'use client';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/shared/ui/common"

import { useState } from "react";
import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/utils";
import { Button, Skeleton } from "~/shared/ui/common";
import { ProgressPopover } from "./ProgressPopover";

import { getSorterComponents } from "~/shared/ui/sorter";
import { useRuneTickersQuery } from "~/shared/api/indexer";
import { MintsPopover } from "./MintsPopover";
import { dayJs } from "~/shared/lib/dayjs";
import { generatePaginationSequence } from "~/shared/lib/pagination";
import { useRuneCrafterStore } from "../../model";
import Link from "next/link";


const columns = [
	{
		label: 'Name',
		type: 'name',
		width: '15rem'
	},
	{
		label: 'Progress',
		type: 'progress',
		width: '12.5rem',
	},
	{
		label: 'Mints',
		type: 'mints',
		width: '6.25rem',
	},
	{
		label: '#',
		type: 'number',
		width: '5rem',
	},
	{
		label: 'Create',
		type: 'create',
		width: '8rem',
	},
	{
		label: '',
		type: 'mint-button',
		width: '2.875rem'
	},
] as const;

type ColumnType = typeof columns[number]['type'];

const getColStyle = (index: number) => ({
	width: columns[index].width,
	padding: '0 0.5rem'
})

export function TableContent() {
	const limit = 10;
	const [page, setPage] = useState(1);
	const { data, isFetching } = useRuneTickersQuery({ page, limit });
	const lastPage = Math.floor(data?.total / limit);

	const setRuneToMint = useRuneCrafterStore(s => s.setRuneToMint);

	const checkCanChangePage = (diff: 1 | -1) => {
		const newPage = page + diff;
		return newPage > 0 && newPage < lastPage;
	}

	const handleChangePage = (diff: 1 | -1) => {
		if (!checkCanChangePage(diff))
			return;

		setPage(p => p + diff);
	}

	const { Sorter } = getSorterComponents<ColumnType>();

	return (
		<div
			className='flex flex-col h-full gap-[1.5rem] text-black-60 light:text-black/80'
			style={{ width: 'max(100%, 50rem)' }}
		>
			<nav className='flex px-[0.75rem] py-[0.625rem] rounded-[0.875rem] border border-secondary'>
				<Sorter>
					{columns.map((col, index) => (
						col.type == 'mint-button' ? (
							<div key={col.type} style={getColStyle(index)} />
						) : (
							<TableSortButton
								key={col.type}
								field={col.type}
								style={getColStyle(index)}
							>
								{col.label}
							</TableSortButton>
						)
					))}
				</Sorter>
			</nav>

			<div className='shrink-0 grow'>
				{data?.items ? (
					data?.items?.map((row, index: number) => {
						return (
							<div
								key={index}
								className={cn(
									'px-[0.75rem] h-[3.375rem] rounded-[1rem] flex items-center text-[0.875rem]',
									index % 2 == 0 && 'bg-white/[.06] light:bg-black/[.06]',
								)}
							>
								<Link
									className='hocus:text-primary transition-all'
									href={`/rune-crafter/runes/${row.rune_name_wo_spacers}`}
								>
									<div
										className='flex gap-[0.5rem] items-center w-full max-w-full  shrink-0'
										style={getColStyle(0)}
									>
										<span className='w-[1rem]  shrink-0'>{row.symbol}</span>
										<span className='truncate'>{row.rune_name}</span>
									</div>
								</Link>

								<div style={getColStyle(1)}>
									<ProgressPopover rune={row} />
								</div>

								<div style={getColStyle(2)}>
									<MintsPopover rune={row} />
								</div>

								<div style={getColStyle(3)}>
									{row.number}
								</div>

								<div style={getColStyle(4)}>
									{dayJs(row.timestamp).fromNow()}
								</div>

								{row.progress != 100 && (
									<div
										className='sticky right-2'
										style={getColStyle(5)}
									>
										<Button
											colorPallete='primary'
											size='sm'
											onClick={() => setRuneToMint(row)}
										>
											Mint
										</Button>
									</div>
								)}
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

			<Pagination>
				<PaginationContent className='justify-between w-full pb-2'>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => handleChangePage(-1)}
							disabled={!checkCanChangePage(-1) || isFetching}
						/>
					</PaginationItem>

					{!isNaN(lastPage) && (
						<div className='flex gap-[0.5rem]'>
							{generatePaginationSequence(page, lastPage).map((p, index) => (
								p == '...' ? (
									<PaginationItem key={index}>
										<PaginationEllipsis />
									</PaginationItem>
								) : (
									<PaginationItem key={index}>
										<PaginationLink
											isActive={page == p}
											onClick={() => setPage(p)}
											disabled={isFetching}
										>
											{p}
										</PaginationLink>
									</PaginationItem>
								)
							))}
						</div>
					)}
					<PaginationItem>
						<PaginationNext
							onClick={() => handleChangePage(+1)}
							disabled={!checkCanChangePage(+1) || isFetching}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}

interface TableSortButtonProps extends HTMLAttributes<HTMLButtonElement> {
	field: ColumnType
}

function TableSortButton({ children, className, field, ...props }: TableSortButtonProps) {
	const { SorterButton } = getSorterComponents<typeof field>();

	return (
		<SorterButton
			field={field} {...props}
			className={cn('h-full justify-start gap-[0.5rem]', className)}
		>
			{children}
		</SorterButton>
	);
}