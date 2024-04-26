import { ToggleGroupItem, Button, Progress } from "~/shared/ui/common";
import { VTextInput } from "../../inputs/VTextInput";
import { FeeToggle } from "../../inputs/FeeToggle";
import { useFormValidation } from "./validation";
import { FormProvider } from "react-hook-form";
import { VToggleGroupRadio } from "~/shared/ui/validation-controls";
import { useRuneCrafterStore } from "~/pages/rune-crafter/model";
import { useEffect } from "react";

export function MintTab() {
	const methods = useFormValidation();
	const { setValue: setFormValue } = methods;

	const runeToMint = useRuneCrafterStore(s => s.runeToMint);
	const runeTicker = runeToMint?.rune_name;

	useEffect(() => {
		if (!runeTicker)
			return;

		setFormValue('runeTicker', runeTicker, {
			shouldDirty: true, shouldValidate: true, shouldTouch: true
		});
	}, [runeTicker, setFormValue]);

	const onSubmit = methods.handleSubmit(values => {
		alert(JSON.stringify(values, undefined, 4));
	});

	return (
		<FormProvider {...methods}>
			<form
				className='flex flex-col gap-[1.5rem] w-full grow justify-between'
				onSubmit={onSubmit}
			>
				{runeToMint && (
					<div className='flex flex-col gap-[0.5rem] w-full'>
						<span className='text-black-60 text-[0.875rem]'>
							Minted {runeToMint.progress.toFixed(2)}%
						</span>

						<Progress
							value={runeToMint.progress}
						/>

						<div className='flex justify-between gap-[0.5rem] w-full text-[0.75rem]'>
							<span className='text-black-40'>
								{runeToMint.mints} / {runeToMint.terms_cap} minted
							</span>
						</div>
					</div>
				)}

				<div className='flex flex-col gap-[1rem] w-full grow'>
					<VTextInput
						name='runeTicker'
						label='Rune Ticker*'
						placeholder='Select any ticker from the table'
						readOnly disabled
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