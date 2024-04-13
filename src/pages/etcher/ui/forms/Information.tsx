'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";
import { cn } from "~/shared/lib/utils";
import { Button, Form, FormControl, FormItem, FormLabel, Input } from "~/shared/ui/common";
import { Icons } from "~/shared/ui/icons";

export function InformationForm() {
	const form = useForm()

	return (
		<Form {...form}>
			<div className='flex flex-col items-center gap-[3rem]'>
				<h1 className='font-semibold text-[2rem]'>
					Basic Information
				</h1>

				<div className='flex flex-col gap-[1rem]'>
					<div className='flex gap-[1.25rem]'>
						<div className='flex flex-col gap-[1rem] grow'>
							<FormItem>
								<FormLabel>Rune Name</FormLabel>
								<FormControl>
									<Input placeholder="e.g. Swaple" />
								</FormControl>
							</FormItem>

							<FormItem>
								<FormLabel>Ticker</FormLabel>
								<FormControl>
									<Input placeholder="e.g. SWPL" />
								</FormControl>
							</FormItem>
						</div>
						<FileUploader />
					</div>

					<FormItem>
						<FormLabel>Decimals</FormLabel>
						<FormControl>
							<Input
								placeholder="1-18, Decimal precicion of your token"
							/>
						</FormControl>
					</FormItem>

					<FormItem>
						<FormLabel>Tokenomics</FormLabel>
						<FormControl>
							<Input
								placeholder="Enter total token supply"
							/>
						</FormControl>
					</FormItem>

					<FormItem>
						<FormLabel>Description</FormLabel>
						<FormControl>
							<Input
								placeholder="e.g. DeFi stacking, pool and farming token"
							/>
						</FormControl>
					</FormItem>
				</div>

				<Button asChild colorPallete='primary'>
					<Link href='/etcher/configuration'>Next Step</Link>
				</Button>
			</div>
		</Form>
	);
}

function FileUploader() {
	return (
		<div className={cn(
			'flex flex-col items-center justify-center gap-[0.25rem] relative',
			'size-[6.625rem] rounded-[1rem] border border-secondary border-dashed text-black-40',
			'hocus:bg-white/5',
			'light:hocus:bg-black/5'
		)}>
			<Icons.UploadCloud className='size-[1.25rem]' />
			<p className='w-min text-center'>Rune Image</p>

			<input 
				accept='image/*'
				className='absolute size-full top-0 left-0 opacity-0 cursor-pointer'
				type='file'
			/>
		</div>
	);
}