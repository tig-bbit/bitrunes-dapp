'use client';

import {
	Button,
	Form,
	FormControl,
	FormItem,
	FormLabel,
	Input,
	RichInput,
	ToggleGroupItem,
	ToggleGroupRadio,
} from "~/shared/ui/common";


import { useForm } from "react-hook-form";
import { Icons } from "~/shared/ui/icons";
import { CurrencySelect } from "./CurrencySelect";

export function BridgeForm() {
	const form = useForm()

	return (
		<Form {...form}>
			<div className='flex flex-col items-center gap-[3rem] max-w-[30.875rem]'>
				<div className='flex flex-col items-center gap-[1rem]'>
					<FormItem className='w-full'>
						<FormLabel>From</FormLabel>
						<FormControl>
							<Input
								placeholder="e.g. 0xb794f5ea0ba39494ce839613fffba74279579268"
							/>
						</FormControl>
					</FormItem>

					<FormItem className='w-full'>
						<FormLabel>Amount</FormLabel>
						<FormControl>
							<RichInput
								className='text-[1.5rem]'
								topElement={<CurrencySelect />}
								rightElement={<span className='text-black-40'>~0.00 USD</span>}
								defaultValue='0.00'
							/>
						</FormControl>
					</FormItem>

					<div className='flex items-center gap-[1rem] w-full my-[1rem]'>
						<hr className='border-white/10 grow' />
						<Button variant='outline' size='lg' className='rounded-full'>
							<Icons.Switch className='size-[2rem]' />
						</Button>
						<hr className='border-white/10 grow' />
					</div>

					<FormItem className='w-full'>
						<FormLabel>To</FormLabel>
						<FormControl>
							<Input
								placeholder="e.g. 0xb794f5ea0ba39494ce839613fffba74279579268"
							/>
						</FormControl>
					</FormItem>

					<FormItem className='w-full'>
						<FormLabel>Amount</FormLabel>
						<FormControl>
							<RichInput
								className='text-[1.5rem]'
								topElement={<CurrencySelect defaultValue='usdt' />}
								rightElement={<span className='text-black-40'>~0.00 USD</span>}
								defaultValue='0.00'
							/>
						</FormControl>
					</FormItem>

					<FormItem className='w-full'>
						<FormLabel>Address</FormLabel>

						<FormControl>
							<ToggleGroupRadio
								className='grow'
								defaultValue='connected'
							>
								<ToggleGroupItem value="connected">
									Connected
								</ToggleGroupItem>
								<ToggleGroupItem value="other">
									Other
								</ToggleGroupItem>
							</ToggleGroupRadio>
						</FormControl>
					</FormItem>
				</div>

				<Button colorPallete='primary'>
					Connect Wallet
				</Button>
			</div>
		</Form>
	);
}

