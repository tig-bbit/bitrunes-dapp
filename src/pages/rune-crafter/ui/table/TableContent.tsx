'use client';

import Image from "next/image";
import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/utils";
import { Button, Progress } from "~/shared/ui/common";
import { MintsPopover } from "./MintsPopover";
import { ProgressPopover } from "./ProgressPopover";

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

const mockData = [
	{
		imageUrl: '/images/1.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/2.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/1.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/2.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/1.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/2.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/1.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/2.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/1.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/2.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
	{
		imageUrl: '/images/1.jpg',
		name: 'BITCOIN•PEPE•MATRIX',
		progress: 54.43,
		pending: 13_808,
		mints: 54_433,
		holders: 10_075,
		number: 4_241,
		create: 'Apr 21 02:46'
	},
]

const getColStyle = (index: number) => ({
	width: columns[index].width,
	padding: '0 0.5rem'
})

export function TableContent() {
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
				{mockData.map((row, index) => (
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
							<Image
								src={row.imageUrl}
								width={60} height={60}
								className='size-[1.25rem] rounded-[0.375rem]'
								alt='image'
							/>
							<span>{row.name}</span>
						</div>

						<div style={getColStyle(1)}>
							<ProgressPopover 
								progress={row.progress}
								pending={row.pending} 
							/>
						</div>

						<div style={getColStyle(2)}>
							<MintsPopover mints={row.mints} />
						</div>

						<div style={getColStyle(3)}>
							{row.holders}
						</div>

						<div style={getColStyle(4)}>
							{row.number}
						</div>

						<div style={getColStyle(5)}>
							{row.create}
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