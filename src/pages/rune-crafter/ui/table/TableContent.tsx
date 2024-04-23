'use client';

import { useState, useEffect } from "react";
import axios from 'axios';
import Image from "next/image";
import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/utils";
import { Button, Progress } from "~/shared/ui/common";
import { MintsPopover } from "./MintsPopover";
import { ProgressPopover } from "./ProgressPopover";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/shared/ui/common"

const columns = [
	{
		label: 'Name',
		type: 'name',
		width: '12.5rem'
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
		label: 'Holders',
		type: 'holders',
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
];


const ITEMS_PER_PAGE = 10;

const getColStyle = (index: number) => ({
	width: columns[index].width,
	padding: '0 0.5rem'
})

export function TableContent() {
	const [runData, setData] = useState(null);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://brc20-api.luminex.io/runes/runes');
				setData(response.data.data);
				setTotalPages(Math.ceil(response.data.data.length / ITEMS_PER_PAGE));
				console.log(response.data.data);
				setError(null);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message); // Assuming setError expects a string message
				}
			}
		};

		// Initial fetch
		fetchData();

		// Fetch data every 5 seconds
		const intervalId = setInterval(fetchData, 5000);

		// Cleanup function to clear the interval when component unmounts
		return () => clearInterval(intervalId);
	}, []);

	const NextPage = () => {
		setCurrentPage(currentPage + 1 > totalPages ? totalPages : currentPage + 1);
	};
	const PreviewPage = () => {
		setCurrentPage(currentPage - 1 === 0 ? currentPage : currentPage - 1);
	};
	const twoPage = () => {
		setCurrentPage(2);
	}
	const paginatedData = runData
		? runData.slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			currentPage * ITEMS_PER_PAGE
		)
		: [];
	if (error) {
		return <div>Error: {error.message}</div>; // Display error message
	}

	if (!runData) {
		return <div>Loading...</div>; // Or any other loading state
	}
	return (
		<div
			className='flex flex-col gap-[1.5rem] text-black-60 light:text-black/80'
			style={{ width: 'max(100%, 53rem)' }}
		>
			<nav className='flex px-[0.75rem] py-[0.625rem] rounded-[0.875rem] border border-secondary'>
				{columns.map((col, index) => (
					<TableSortButton
						key={col.type}
						style={getColStyle(index)}
					>
						{col.label}
					</TableSortButton>
				))}
			</nav>

			<div className='shrink-0'>
				{paginatedData.map((row, index: number) => (
					<div
						key={index}
						className={cn(
							'px-[0.75rem] h-[3.375rem] rounded-[1rem] flex items-center text-[0.875rem]',
							index % 2 == 0 && 'bg-white/[.06] light:bg-black/[.06]',
						)}
					>
						<div
							className='flex gap-[0.5rem] items-center w-full'
							style={getColStyle(0)}
						>
							<span>{row.symbol}</span>
							<span>{row.rune_text}</span>
						</div>

						<div style={getColStyle(1)}>
							<ProgressPopover
								progress={row.preminePercentage}
								pending={row.circulating}
								block={row.rune_block}
							/>
						</div>

						<div style={getColStyle(2)}>
							<MintsPopover mints={row.mints_count} history={row.history} />
						</div>

						<div style={getColStyle(3)}>
							{row.holders}
						</div>

						<div style={getColStyle(4)}>
							{row.number}
						</div>

						<div style={getColStyle(5)}>
							{row.block_time}
						</div>

						<div
							className='sticky right-2'
							style={getColStyle(6)}
						>
							<Button
								colorPallete='primary'
								size='sm'
							>
								Mint
							</Button>
						</div>
					</div>
				))}
			</div>

			<Pagination>
				<PaginationContent className='justify-between w-full'>
					<PaginationItem>
						<PaginationPrevious onClick={PreviewPage} href="#" />
					</PaginationItem>

					<div className='flex gap-[0.5rem]'>
						<PaginationItem>
							{currentPage == 1 ? 
							<PaginationLink onClick={PreviewPage} isActive href="#">
								{currentPage - 1 === 0 ? currentPage : currentPage - 1}
							</PaginationLink> 
							: 
							<PaginationLink onClick={PreviewPage} href="#">
								{currentPage - 1 === 0 ? currentPage : currentPage - 1}
							</PaginationLink>
}
						</PaginationItem>
						<PaginationItem>
						{currentPage == 1 ? 
							<PaginationLink onClick={twoPage} href="#">
								{currentPage - 1 === 0 ? currentPage + 1 : currentPage}
							</PaginationLink> 
							: 
							<PaginationLink isActive href="#">
								{currentPage - 1 === 0 ? currentPage + 1 : currentPage}
							</PaginationLink>}
						</PaginationItem>
						<PaginationItem>
							<PaginationLink onClick={NextPage}>
								{currentPage - 1 === 0 ? currentPage + 2 : currentPage + 1}
							</PaginationLink>
						</PaginationItem>
					</div>

					<PaginationItem>
						<PaginationNext onClick={NextPage} href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}

function TableSortButton({ children, className, ...props }: HTMLAttributes<HTMLButtonElement>) {
	return (
		<button {...props} className={cn('h-full text-start', className)}>
			{children}
		</button>
	);
}