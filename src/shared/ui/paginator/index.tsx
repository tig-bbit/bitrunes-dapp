'use client';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from "~/shared/ui/common";

import { ComponentProps } from "react";
import { generatePaginationSequence } from "~/shared/lib/pagination";
import { useControllableState } from "~/shared/lib/useControllableState";
import { useBreakpoint } from "~/shared/lib/responsive";
import { cn } from "~/shared/lib/utils";

interface PaginatiorProps extends Omit<ComponentProps<typeof Pagination>, 'onChange'> {
	totalItems: number;
	limit: number;
	onChange: (page: number) => void;
	value?: number;
	disabled?: boolean;
	defaultValue?: number;
}

export function Paginator({ value, totalItems, onChange, disabled, defaultValue, limit, ...props }: PaginatiorProps) {
	const [page, setPage] = useControllableState({
		defaultValue, onChange, value
	});

	const lastPage = Math.floor(totalItems / limit);

	const checkCanChangePage = (diff: 1 | -1) => {
		const newPage = page + diff;
		return newPage > 0 && newPage < lastPage;
	};

	const handleChangePage = (diff: 1 | -1) => {
		if (!checkCanChangePage(diff))
			return;

		setPage(p => p + diff);
	};

	const { isMd } = useBreakpoint('md');

	return (
		<Pagination {...props}>
			<PaginationContent className={cn('justify-between w-full pb-2', !isMd && 'justify-center')}>
				<PaginationItem className={cn(!isMd && 'hidden')}>
					<PaginationPrevious
						onClick={() => handleChangePage(-1)}
						disabled={!checkCanChangePage(-1) || disabled}
					/>
				</PaginationItem>

				<div className='flex gap-[0.5rem]'>
					{generatePaginationSequence(page, lastPage, 6).map((p, index) => (
						p == '...' ? (
							<PaginationItem key={index}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={index}>
								<PaginationLink
									isActive={page == p}
									onClick={() => setPage(p)}
									disabled={disabled}
								>
									{p}
								</PaginationLink>
							</PaginationItem>
						)
					))}
				</div>
				<PaginationItem className={cn(!isMd && 'hidden')}>
					<PaginationNext
						onClick={() => handleChangePage(+1)}
						disabled={!checkCanChangePage(+1) || disabled} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
