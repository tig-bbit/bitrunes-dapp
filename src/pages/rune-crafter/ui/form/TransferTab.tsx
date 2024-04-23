import { Button, ToggleGroupItem, ToggleGroupRadio } from "~/shared/ui/common";
import { FeeToggle } from "../inputs/FeeToggle";
import { TextInput } from "../inputs/TextInput";
import { RuneSelector } from "./RuneSelector";

export function TransferTab() {
	return (
		<div className='flex flex-col gap-[1.5rem] w-full grow justify-between'>
			<div className='flex flex-col gap-[1rem] w-full grow'>
				<RuneSelector />

				<TextInput
					label='Receiver Address*' required
					placeholder='Enter wallet address'
				/>

				<TextInput
					label='Amount to transfer*' required type='number'
					placeholder='e.g. 100000'
				/>

				<ToggleGroupRadio
					className='w-full'
					defaultValue='1'
				>
					<ToggleGroupItem value='1'>
						Split runes
					</ToggleGroupItem>
					<ToggleGroupItem value='0'>
						{`Don't split`}
					</ToggleGroupItem>
				</ToggleGroupRadio>

				<TextInput
					label='# of UTXOs to split amount into (equally)*'
					required type='number'
					placeholder='e.g. 2'
					defaultValue={2}
				/>
			</div>

			<FeeToggle />

			<Button colorPallete='primary'>
				Transfer
			</Button>
		</div>
	)
}