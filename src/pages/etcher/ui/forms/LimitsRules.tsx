'use client';

import {
	Button, Form,
	FormControl, FormDescription,
	FormItem, FormLabel,
	NumberInput, ToggleGroupRadio,
	ToggleGroupItem,
	FormElementsGroup
} from "~/shared/ui/common";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { NavButtonsFooter } from "../NavButtonsFooter";

export function LimitRulesForm() {
	const form = useForm()

	return (
		<Form {...form}>
			<div className='flex flex-col items-center gap-[3rem]'>
				<h1 className='font-semibold text-[2rem] text-center'>
					Token Limits & Rules
				</h1>

				<div className='flex flex-col gap-[1rem]'>
					<FormItem>
						<FormLabel>Minting Cap</FormLabel>
						<FormControl>
							<NumberInput
								label="Maximum can be minted"
								defaultValue={0}
							/>
						</FormControl>
					</FormItem>

					<FormItem>
						<FormLabel>Block Heights</FormLabel>

						<FormElementsGroup>
							<FormElementsGroup className='flex-row gap-[1.25rem]'>
								<FormControl>
									<NumberInput
										label="Start"
										defaultValue={0}
									/>
								</FormControl>

								<NumberInput
									label="End"
									defaultValue={0}
								/>
							</FormElementsGroup>

							<FormDescription>
								Define blockchain height range for minting.
							</FormDescription>
						</FormElementsGroup>
					</FormItem>


					<FormItem className='mt-[2rem]'>
						<FormLabel>Goverance</FormLabel>

						<FormElementsGroup>
							<FormControl>
								<ToggleGroupRadio
									className='grow'
									defaultValue='add-rule'
								>
									<ToggleGroupItem value="add-rule">
										Add Rule
									</ToggleGroupItem>
								</ToggleGroupRadio>
							</FormControl>

							<FormDescription>
								Establish governance parameters for the token.
							</FormDescription>
						</FormElementsGroup>
					</FormItem>
				</div>

				<NavButtonsFooter>
					<Button asChild variant='outline'>
						<Link href='/etcher/configuration'>Go Back</Link>
					</Button>
					<Button asChild colorPallete='primary'>
						<Link href='/etcher/summary'>Next Step</Link>
					</Button>
				</NavButtonsFooter>
			</div>
		</Form>
	);
}
