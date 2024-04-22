'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button, Form, FormControl, FormItem, FormLabel, Input } from "~/shared/ui/common";
import { NavButtonsFooter } from "../NavButtonsFooter";
import { ImageUploader } from "~/shared/ui/image-uploader";

export function InformationForm() {
	const form = useForm()

	return (
		<Form {...form}>
			<div className='flex flex-col items-center gap-[3rem] w-full'>
				<h1 className='font-semibold text-[2rem] text-center'>
					Basic Information
				</h1>

				<div className='flex flex-col gap-[1rem] w-full'>
					<div className='flex gap-[1.25rem] w-full max-md:flex-col-reverse'>
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
						<ImageUploader label='Rune Image' />
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

				<NavButtonsFooter>
					<Button asChild colorPallete='primary'>
						<Link href='/etcher/configuration'>Next Step</Link>
					</Button>
				</NavButtonsFooter>
			</div>
		</Form>
	);
}