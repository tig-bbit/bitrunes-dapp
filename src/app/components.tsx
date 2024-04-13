'use client';

import { useForm } from "react-hook-form";
import { Button, DropdownButton, Input, NumberInput, RichInput, ToggleGroupRadio } from "~/shared/ui/common";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/shared/ui/common"

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/shared/ui/common"

import {
	ToggleGroup,
	ToggleGroupItem,
} from "~/shared/ui/common"

export default function Home() {
	return (
		<main className="p-8 bg-black/85 h-screen flex flex-col items-center justify-center gap-16">
			<div className='flex gap-8'>
				<Button>Get Started</Button>
				<Button variant='outline'>Get Started</Button>
				<Button variant='outline' colorPallete='primary'>
					Get Started
				</Button>
			</div>

			<div className='flex gap-8'>
				<Input placeholder='Title' />

				<NumberInput
					label='Total number of tokens'
				/>

				<CurrencySelect />
			</div>

			<div className='flex gap-8'>
				<FormControlTest />
			</div>

			<div className='flex gap-8'>
				<ToggleGroupRadio
					defaultValue='connected' onValueChange={console.log}
				>
					<ToggleGroupItem value="connected">
						Connected
					</ToggleGroupItem>
					<ToggleGroupItem value="other" >
						Other
					</ToggleGroupItem>
				</ToggleGroupRadio>

				<RichInput
					topElement={<CurrencySelect />}
					rightElement={<span className='text-black-40'>~0.00 USD</span>}
					defaultValue='0.00'
				/>
			</div>
		</main>
	);
}

function FormControlTest() {
	const form = useForm()

	return (
		<Form {...form}>
			<div className='flex flex-col gap-3'>
				<FormField
					name="runeName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rune Name</FormLabel>
							<FormControl>
								<NumberInput
									label="Total number of tokens"
									defaultValue={0}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="developers"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Developers</FormLabel>

							<div className='flex flex-col gap-3 max-w-[20rem]'>
								<FormControl>
									<NumberInput
										className='w-full'
										label="Premine Configuration"
										defaultValue={0}
										{...field}
									/>
								</FormControl>

								<FormDescription>
									Specify how many Runes are allocated to developers or
									early contributors during the premine phase.
								</FormDescription>
							</div>

							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</Form>
	)
}

function CurrencySelect() {
	return (
		<Select defaultValue="USDT">
			<SelectTrigger className="w-[5.625rem]">
				<SelectValue placeholder="Theme" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="USDT">USDT</SelectItem>
				<SelectItem value="USDC">USDC</SelectItem>
				<SelectItem value="ETH">ETH</SelectItem>
				<SelectItem value="BFG">BFG</SelectItem>
				<SelectItem value="BSRX">BSRX</SelectItem>
			</SelectContent>
		</Select>
	)
}