'use client';

import { ImageUploader } from "~/shared/ui/image-uploader";
import { InputHint } from "../inputs/Hint";
import { TextInput } from "../inputs/TextInput";
import { Button, ToggleGroupItem, ToggleGroupRadio } from "~/shared/ui/common";
import { useState } from "react";

export function EtcherTab() {
	return (
		<div className='flex flex-col gap-[1rem] w-full grow'>
			<div className='flex gap-[1rem] w-full max-md:flex-col-reverse'>
				<div className='flex flex-col gap-[1rem] w-full'>
					<TextInput
						label='Rune Name*' required
						placeholder='Enter rune name'
						rightElement={<InputHint />}
					/>

					<TextInput
						label='Symbol'
						placeholder='Enter symbol'
						rightElement={<InputHint />}
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
				rightElement={<InputHint />}
			/>

			<div className='flex gap-[1rem] w-full'>
				<TextInput
					label='Premine' type='number'
					placeholder='Enter premine'
					rightElement={<InputHint />}
					defaultValue={0}
				/>
				<TextInput
					label='Divisibility' type='number'
					placeholder='Enter divisibility'
					rightElement={<InputHint />}
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
							rightElement={<InputHint />}
							defaultValue={0}
						/>
						<TextInput
							label='Mint Cap' type='number'
							placeholder='Enter min cap'
							rightElement={<InputHint />}
							defaultValue={0}
						/>
					</div>

					<TextInput
						label='Rune Inscription'
						placeholder='Enter rune inscription'
						rightElement={<InputHint />}
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