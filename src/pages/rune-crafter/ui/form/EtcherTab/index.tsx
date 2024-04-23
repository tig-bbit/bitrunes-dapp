'use client';

import { ImageUploader } from "~/shared/ui/image-uploader";
import { InputHint } from "../../inputs/Hint";
import { TextInput } from "../../inputs/TextInput";
import { Button, ToggleGroupItem, ToggleGroupRadio } from "~/shared/ui/common";
import { useState } from "react";
import { useFormValidation } from "./validation";
import { FormProvider } from "react-hook-form";

export function EtcherTab() {
	const methods = useFormValidation();

	const onSubmit = methods.handleSubmit(values => {
		alert(JSON.stringify(values, undefined, 4));
	});

	return (
		<FormProvider {...methods}>
			<form className='flex flex-col gap-[1rem] w-full grow' onSubmit={onSubmit}>
				<div className='flex gap-[1rem] w-full max-md:flex-col-reverse'>
					<div className='flex flex-col gap-[1rem] w-full'>
						<TextInput
							name='runeName'
							label='Rune Name*'
							placeholder='Enter rune name'
							className="uppercase"
							rightElement={<InputHint text='Names consist of letters A-Z and are between 13 & 28 characters long. They may contain spacers, represented as bullets • , to aid readability' />}
						/>

						<TextInput
							name='runeSymbol'
							label='Symbol'
							maxLength={1}
							placeholder='Enter symbol'
							rightElement={<InputHint text="The rune's currency symbol, as a single Unicode code point, for example $, or 🧿." />}
						/>
					</div>

					<ImageUploader
						className='size-[7.875rem] shrink-0'
						label='Rune Image'
					/>
				</div>

				<TextInput
					name='destAddress'
					label='Destination Address*'
					placeholder='Enter destination address'
					rightElement={<InputHint text='The Bitcoin address to which the minted runes should be allocated.' />}
				/>

				<div className='flex gap-[1rem] w-full'>

					<TextInput
						name='divisibility'
						label='Divisibility' type='number'
						placeholder='Enter divisibility'
						rightElement={<InputHint text='A number representing the runes divisibility' />}
						defaultValue={0}
					/>
				</div>

				<MintOptions />

				<div className='flex flex-col gap-[1rem] w-full grow justify-end'>
					<div className='flex gap-[1rem] w-full jsutify-between'>
						<span className='text-black-60'>Est. Mempool Fee Rate</span>
						<span>102 Sats/vByte</span>
					</div>

					<Button colorPallete='primary'>
						Etch Rune
					</Button>
				</div>
			</form>
		</FormProvider>
	);
}

function MintOptions() {
	const [tab, setTab] = useState('open');

	return (
		<div className='flex flex-col gap-[1rem] w-full'>
			<ToggleGroupRadio
				className='w-full'
				value={tab} onValueChange={setTab}
			>
				<ToggleGroupItem value='open'>
					Open Mint
				</ToggleGroupItem>
				<ToggleGroupItem value='closed'>
					Closed Mint
				</ToggleGroupItem>
			</ToggleGroupRadio>

			{tab == 'open' && (
				<>
					<TextInput
						name='premine'
						label='Premine' type='number'
						placeholder='Enter premine'
						defaultValue={0}
					/>
					
					<div className='flex gap-[1rem] w-full'>
						<TextInput
							name='mintAmount'
							label='Mint Amount' type='number'
							placeholder='Enter mint amount'
							defaultValue={0}
						/>
						<TextInput
							name='mintCap'
							label='Mint Cap' type='number'
							placeholder='Enter min cap'
							defaultValue={0}
						/>
					</div>

					<div className='flex flex-col gap-[0.5rem]'>
						<span className='text-black-60 text-[0.875rem]'>
							Rune Inscription
						</span>
						<ToggleGroupRadio className='w-full' defaultValue='default'>
							<ToggleGroupItem value='default'>
								Choose File
							</ToggleGroupItem>
						</ToggleGroupRadio>
					</div>
				</>
			)}
		</div>
	);
}