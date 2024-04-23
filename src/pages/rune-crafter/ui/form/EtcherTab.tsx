'use client';

import { ImageUploader } from "~/shared/ui/image-uploader";
import { InputHint } from "../inputs/Hint";
import { TextInput } from "../inputs/TextInput";
import { Button, ToggleGroupItem, ToggleGroupRadio } from "~/shared/ui/common";
import { useState } from "react";

export function EtcherTab() {
	const [runvalue, setRunValue] = useState('');
	const HandleRune = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const regMatch = /^[a-zA-Z]*$/.test(value);

		if (regMatch)
			setRunValue(value);
	};
	return (
		<div className='flex flex-col gap-[1rem] w-full grow'>
			<div className='flex gap-[1rem] w-full max-md:flex-col-reverse'>
				<div className='flex flex-col gap-[1rem] w-full'>
					<div className="relative">
						<TextInput
							label='Rune Name*' required
							maxLength={28}
							minLength={13}
							onChange={HandleRune}
							placeholder='Enter rune name'
							className="uppercase"
							value={runvalue}
							rightElement={<InputHint text='Names consist of letters A-Z and are between 13 & 28 characters long. They may contain spacers, represented as bullets • , to aid readability' />}
						/>

					</div>

					<TextInput
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
				label='Destination Address*' required
				placeholder='Enter destination address'
				rightElement={<InputHint text='The Bitcoin address to which the minted runes should be allocated.' />}
			/>

			<div className='flex gap-[1rem] w-full'>
				<TextInput
					label='Premine' type='number'
					placeholder='Enter premine'
					defaultValue={0}
				/>
				<TextInput
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
		</div>
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
					<div className='flex gap-[1rem] w-full'>
						<TextInput
							label='Min Amount' type='number'
							placeholder='Enter min amount'
							defaultValue={0}
						/>
						<TextInput
							label='Mint Cap' type='number'
							placeholder='Enter min cap'
							defaultValue={0}
						/>
					</div>

					<TextInput
						label='Rune Inscription'
						placeholder='Enter rune inscription'
					/>

					<ToggleGroupRadio className='w-full' defaultValue='default'>
						<ToggleGroupItem value='default'>
							Choose File
						</ToggleGroupItem>
					</ToggleGroupRadio>
				</>
			)}
		</div>
	);
}