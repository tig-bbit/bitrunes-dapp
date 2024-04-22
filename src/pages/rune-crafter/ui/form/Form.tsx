'use client';

import { useState } from "react";
import { ToggleGroupRadio, ToggleGroupItem } from "~/shared/ui/common";
import { Heading, PagePaper } from "~/shared/ui/layout";
import { EtcherTab } from "./EtcherTab";

export function Form() {
	const [tab, setTab] = useState('etcher');

	return (
		<PagePaper className='items-start w-full p-[1.5rem] max-w-[28.3125rem] gap-[1.5rem] max-lg:max-w-full'>
			<Heading className='text-[1.5rem]/none'>
				Etch your Rune
			</Heading>

			<ToggleGroupRadio
				className='w-full bg-transparent'
				value={tab} onValueChange={setTab}
			>
				<ToggleGroupItem value='etcher'>
					Etcher
				</ToggleGroupItem>
				<ToggleGroupItem value='mint'>
					Mint
				</ToggleGroupItem>
				<ToggleGroupItem value='transfer'>
					Transfer
				</ToggleGroupItem>
			</ToggleGroupRadio>

			{tab == 'etcher' && <EtcherTab />}
		</PagePaper>
	);
}