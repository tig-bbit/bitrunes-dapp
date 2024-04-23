import { ToggleGroupRadio, ToggleGroupItem, Button, Progress } from "~/shared/ui/common";
import { InputHint } from "../inputs/Hint";
import { TextInput } from "../inputs/TextInput";
import { FeeToggle } from "../inputs/FeeToggle";

export function MintTab() {
	return (
		<div className='flex flex-col gap-[1.5rem] w-full grow justify-between'>
			<div className='flex flex-col gap-[0.5rem] w-full'>
				<span className='text-black-60 text-[0.875rem]'>
					Confirmed 5.52% · <span className='text-primary'>Pending 1.76%</span>
				</span>

				<Progress
					values={[
						{ value: 10, color: '#f26818' },
						{ value: 5.52, color: '#3A86FF' }
					]}
				/>

				<div className='flex justify-between gap-[0.5rem] w-full text-[0.75rem]'>
					<span className='text-black-40'>
						27,610,000 / 500,000,000 minted
					</span>
					<span className='text-primary'>
						883 mints pending
					</span>
				</div>
			</div>

			<div className='flex flex-col gap-[1rem] w-full grow'>
				<TextInput
					label='Rune Ticker*' required
					placeholder='Enter rune ticker'
				/>

				<TextInput
					label='Repeat Mint*' required
					placeholder='Enter repeat mint'
				/>
			</div>

			<div className='flex flex-col gap-[0.5rem] w-full'>
				<span className='text-black-60 text-[0.875rem]'>
					Minting Mode (Max)
				</span>

				<ToggleGroupRadio
					className='w-full'
					defaultValue='pre-split'
				>
					<ToggleGroupItem value='pre-split'>
						Pre Split (20)
					</ToggleGroupItem>
					<ToggleGroupItem value='auto-split'>
						Auto Split (2500)
					</ToggleGroupItem>
				</ToggleGroupRadio>
			</div>

			<FeeToggle />

			<Button colorPallete='primary'>
				Mint
			</Button>
		</div>
	)
}