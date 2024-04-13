'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";
import {
	Button, Form,
	FormControl, FormDescription,
	FormItem, FormLabel, Input,
	NumberInput, ToggleGroupRadio,
	ToggleGroupItem,
	FormElementsGroup
} from "~/shared/ui/common";

export function ConfigurationForm() {
	const form = useForm()

	return (
		<Form {...form}>
			<div className='flex flex-col items-center gap-[3rem]'>
				<h1 className='font-semibold text-[2rem]'>
					Premine Configuration
				</h1>

				<div className='flex flex-col gap-[1rem] w-[30.875rem]'>
					<FormItem>
						<FormLabel>Total</FormLabel>
						<FormControl>
							<NumberInput
								label="Total number of tokens"
								defaultValue={0}
							/>
						</FormControl>
					</FormItem>

					<FormItem>
						<FormLabel>Developers</FormLabel>
						<FormControl>
							<NumberInput
								label="Premine Configuration"
								defaultValue={0}
							/>
						</FormControl>
					</FormItem>

					<FormItem>
						<FormLabel>Contributors</FormLabel>

						<FormElementsGroup>
							<FormControl>
								<NumberInput
									label="Premine Configuration"
									defaultValue={0}
								/>
							</FormControl>

							<FormDescription>
								Specify how many Runes are allocated to developers
								or early contributors during the premine phase.
							</FormDescription>
						</FormElementsGroup>
					</FormItem>

					<FormItem className='mt-[2rem]'>
						<FormLabel>Mint</FormLabel>

						<FormElementsGroup>
							<FormControl>
								<ToggleGroupRadio
									className='grow'
									defaultValue='open'
								>
									<ToggleGroupItem value="open">
										Open
									</ToggleGroupItem>
									<ToggleGroupItem value="closed">
										Closed
									</ToggleGroupItem>
								</ToggleGroupRadio>
							</FormControl>

							<FormDescription>
								Specify whether the minting process is open 
								to all or restricted under certain conditions.
							</FormDescription>
						</FormElementsGroup>
					</FormItem>
				</div>

				<div className='flex gap-[1rem]'>
					<Button asChild variant='outline'>
						<Link href='/etcher'>Go Back</Link>
					</Button>
					<Button asChild colorPallete='primary'>
						<Link href='/etcher/limits-rules'>Next Step</Link>
					</Button>
				</div>
			</div>
		</Form>
	);
}