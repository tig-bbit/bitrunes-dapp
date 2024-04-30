'use client';

import { InputHint } from "../../inputs/Hint";
import { VTextInput } from "../../inputs/VTextInput";
import { Button, Skeleton, ToggleGroupItem } from "~/shared/ui/common";
import { SchemaType, useFormValidation } from "./validation";
import { FormProvider } from "react-hook-form";
import { VImageUploader, VToggleGroupRadio } from "~/shared/ui/validation-controls";
import { useFieldValue } from "~/shared/lib/useFieldValue";
import { fixRuneTickerInput } from "../schemaRuneTicker";
import { useGasFees } from "~/shared/lib/bitcoin";
import { useState } from "react";
import { OrderModal } from "./OrderModal";
import { objectId } from "~/shared/lib/object-id";

export function EtcherTab() {
	const methods = useFormValidation();
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState<SchemaType | null>(null);

	const onSubmit = methods.handleSubmit(values => {
		setValues(values);
		setOpen(true);
	});

	return (
		<FormProvider {...methods}>
			{values && (
				<OrderModal
					key={objectId(values)}
					formData={values} open={open}
					onOpenChange={setOpen}
				/>
			)}

			<form
				className='flex flex-col gap-[1rem] w-full grow'
				onSubmit={onSubmit}
			>
				<div className='flex gap-[1rem] w-full max-md:flex-col-reverse'>
					<div className='flex flex-col gap-[1rem] w-full'>
						<VTextInput
							name='runeName'
							label='Rune Name*'
							placeholder='Enter rune name'
							rightElement={<InputHint text='Names consist of letters A-Z and are between 13 & 28 characters long. They may contain spacers, represented as bullets • , to aid readability' />}
							onChange={e => {
								methods.setValue('runeName', fixRuneTickerInput(e.target.value), {
									shouldDirty: true, shouldValidate: true, shouldTouch: true
								})
							}}
						/>

						<VTextInput
							name='runeSymbol'
							label='Symbol' placeholder='Enter symbol'
							rightElement={<InputHint text="The rune's currency symbol, as a single Unicode code point, for example $, or 🧿." />}
						/>
					</div>

					<VImageUploader
						className='size-[7.875rem] shrink-0'
						label='Rune Image' name='image'
					/>
				</div>

				<VTextInput
					name='destAddress'
					label='Destination Address*'
					placeholder='Enter destination address'
					rightElement={<InputHint text='The Bitcoin address to which the minted runes should be allocated.' />}
				/>

				<div className='flex gap-[1rem] w-full'>

					<VTextInput
						name='divisibility'
						label='Divisibility' type='number'
						placeholder='Enter divisibility'
						rightElement={<InputHint text='A number representing the runes divisibility' />}
					/>
				</div>

				<MintOptions />

				<div className='flex flex-col gap-[1rem] w-full grow justify-end'>
					<FeesInfo />

					<Button type="submit" colorPallete='primary'>
						Etch Rune
					</Button>
				</div>
			</form>
		</FormProvider>
	);
}

function MintOptions() {
	const tab = useFieldValue({ name: 'mintType' })

	return (
		<div className='flex flex-col gap-[1rem] w-full'>
			<VToggleGroupRadio
				name='mintType' className='w-full'
			>
				<ToggleGroupItem value='open'>
					Open Mint
				</ToggleGroupItem>
				<ToggleGroupItem value='closed'>
					Closed Mint
				</ToggleGroupItem>
			</VToggleGroupRadio>

			{tab == 'open' && (
				<>
					<VTextInput
						name='premine'
						label='Premine' type='number'
						placeholder='Enter premine'
					/>

					<div className='flex gap-[1rem] w-full'>
						<VTextInput
							name='mintAmount'
							label='Mint Amount' type='number'
							placeholder='Enter mint amount'
						/>
						<VTextInput
							name='mintCap'
							label='Mint Cap' type='number'
							placeholder='Enter min cap'
						/>
					</div>

					{/* <div className='flex flex-col gap-[0.5rem]'>
						<span className='text-black-60 text-[0.875rem]'>
							Rune Inscription
						</span>
						<ToggleGroupRadio className='w-full' defaultValue='default'>
							<ToggleGroupItem value='default'>
								Choose File
							</ToggleGroupItem>
						</ToggleGroupRadio>
					</div> */}
				</>
			)}
		</div>
	);
}

function FeesInfo() {
	const { data } = useGasFees();

	return (
		<div className='flex gap-[1rem] w-full justify-between'>
			<span className='text-black-60'>Est. Mempool Fee Rate</span>

			<Skeleton loading={!data}>
				<span>{data?.fastestFee} Sats/vByte</span>
			</Skeleton>
		</div>
	);
}