'use client';

import { useEffect, useState } from "react";
import { ToggleGroupRadio, ToggleGroupItem } from "~/shared/ui/common";
import { Heading, PagePaper } from "~/shared/ui/layout";
import { EtcherTab } from "./EtcherTab";
import { MintTab } from "./MintTab";
import { TransferTab } from "./TransferTab";
import { useRuneCrafterStore } from "../../model";

export function Form() {
	const [tab, setTab] = useState('etcher');
	const runeToMint = useRuneCrafterStore(s => s.runeToMint);

	useEffect(() => {
		if(runeToMint)
			setTab('mint');
	}, [runeToMint]);

	return (
		<PagePaper className='items-start w-full p-[1.5rem] max-w-[28.3125rem] gap-[1.5rem] max-lg:max-w-full shrink-0'>
			<Heading className='text-[1.5rem]/none'>
				{tab == 'etcher' && 'Etch your Rune'}
				{tab == 'mint' && 'Mint Rune'}
				{tab == 'transfer' && 'Transfer'}
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
			{tab == 'mint' && <MintTab />}
			{tab == 'transfer' && <TransferTab />}
		</PagePaper>
	);
}