'use client';

import { ToggleGroupRadio, ToggleGroupItem } from "~/shared/ui/common";
import { TextInput } from "./TextInput";
import { useState } from "react";

export function FeeToggle() {
	const [tab, setTab] = useState('medium');

	return (
		<>
			<div className='flex flex-col gap-[0.5rem] w-full'>
				<span className='text-black-60 text-[0.875rem]'>
					Select Fees (135 sats/vB)
				</span>

				<ToggleGroupRadio
					className='w-full'
					value={tab} onValueChange={setTab}
				>
					<ToggleGroupItem value='slow'>Slow</ToggleGroupItem>
					<ToggleGroupItem value='medium'>Medium</ToggleGroupItem>
					<ToggleGroupItem value='fast'>Fast</ToggleGroupItem>
					<ToggleGroupItem value='custom'>Custom</ToggleGroupItem>
				</ToggleGroupRadio>
			</div>

			{tab == 'custom' && (
				<TextInput
					label='Custom Fee Rate*' required
					placeholder='e.g. 125'
				/>
			)}
		</>
	);
}
