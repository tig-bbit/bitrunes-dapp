import { ToggleGroupItem, Button, Progress } from "~/shared/ui/common";
import { VTextInput } from "../../inputs/VTextInput";
import { FeeToggle } from "../../inputs/FeeToggle";
import { useFormValidation } from "./validation";
import { FormProvider } from "react-hook-form";
import { VToggleGroupRadio } from "~/shared/ui/validation-controls";
import { useRuneCrafterStoreApi } from "~/pages/rune-crafter/model";
import { useEffect } from "react";
import { fixRuneTickerInput } from "../schemaRuneTicker";

export function MintTab() {
	const methods = useFormValidation();
	const { setValue: setFormValue } = methods;
	const { subscribe } = useRuneCrafterStoreApi();

	useEffect(() => {
		return subscribe(({ runeTickerToMint }) => {
			if (!runeTickerToMint)
				return;

			setFormValue('runeTicker', runeTickerToMint, {
				shouldDirty: true, shouldValidate: true, shouldTouch: true
			});
		});
	}, [subscribe, setFormValue]);

	const onSubmit = methods.handleSubmit(values => {
		alert(JSON.stringify(values, undefined, 4));
	});

	return (
		<FormProvider {...methods}>
			<form
				className='flex flex-col gap-[1.5rem] w-full grow justify-between'
				onSubmit={onSubmit}
			>
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
					<VTextInput
						name='runeTicker'
						label='Rune Ticker*'
						placeholder='Enter rune ticker'
						onChange={e => {
							methods.setValue('runeTicker', fixRuneTickerInput(e.target.value), {
								shouldDirty: true, shouldValidate: true, shouldTouch: true
							})
						}}
					/>

					<VTextInput
						name='repeatMint'
						label='Repeat Mint*'
						placeholder='Enter repeat mint'
					/>
				</div>

				<div className='flex flex-col gap-[0.5rem] w-full'>
					<span className='text-black-60 text-[0.875rem]'>
						Minting Mode (Max)
					</span>

					<VToggleGroupRadio
						name='split' className='w-full'
					>
						<ToggleGroupItem value='pre-split'>
							Pre Split (20)
						</ToggleGroupItem>
						<ToggleGroupItem value='auto-split'>
							Auto Split (2500)
						</ToggleGroupItem>
					</VToggleGroupRadio>
				</div>

				<FeeToggle name='fee' />

				<Button colorPallete='primary'>
					Mint
				</Button>
			</form>
		</FormProvider>
	)
}