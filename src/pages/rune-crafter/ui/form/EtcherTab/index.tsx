'use client';

import { ImageUploader } from "~/shared/ui/image-uploader";
import { InputHint } from "../../inputs/Hint";
import { VTextInput } from "../../inputs/VTextInput";
import { Button, ToggleGroupItem, ToggleGroupRadio } from "~/shared/ui/common";
import { useFormValidation } from "./validation";
import { FormProvider } from "react-hook-form";
import { VToggleGroupRadio } from "~/shared/ui/validation-controls";
import { useFieldValue } from "~/shared/lib/useFieldValue";

export function EtcherTab() {
	const methods = useFormValidation();

	const onSubmit = methods.handleSubmit(values => {
		alert(JSON.stringify(values, undefined, 4));
	});

	return (
		<FormProvider {...methods}>
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
							className="uppercase"
							rightElement={<InputHint text='Names consist of letters A-Z and are between 13 & 28 characters long. They may contain spacers, represented as bullets • , to aid readability' />}
							onChange={e => {
								methods.setValue('runeName', e.target.value.replaceAll(' ', '•'))
							}}
						/>

						<VTextInput
							name='runeSymbol'
							label='Symbol' placeholder='Enter symbol'
							rightElement={<InputHint text="The rune's currency symbol, as a single Unicode code point, for example $, or 🧿." />}
						/>
					</div>

					<ImageUploader
						className='size-[7.875rem] shrink-0'
						label='Rune Image'
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