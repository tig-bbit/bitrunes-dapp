import { Button, ToggleGroupItem } from "~/shared/ui/common";
import { FeeToggle } from "../../inputs/FeeToggle";
import { VTextInput } from "../../inputs/VTextInput";
import { RuneSelector } from "./RuneSelector";
import { useFormValidation } from "./validation";
import { FormProvider } from "react-hook-form";
import { VToggleGroupRadio } from "~/shared/ui/validation-controls";

export function TransferTab() {
	const methods = useFormValidation();

	const onSubmit = methods.handleSubmit(values => {
		alert(JSON.stringify(values, undefined, 4));
	});

	return (
		<FormProvider {...methods}>
			<form 
				className='flex flex-col gap-[1.5rem] w-full grow justify-between'
				onSubmit={onSubmit}
			>
				<div className='flex flex-col gap-[1rem] w-full grow'>
					<RuneSelector />

					<VTextInput
						name='receiverAddress'
						label='Receiver Address*'
						placeholder='Enter wallet address'
					/>

					<VTextInput
						name='amount' type='number'
						label='Amount to transfer*'
						placeholder='e.g. 100000'
					/>

					<VToggleGroupRadio
						name='splitRunes' className='w-full'
					>
						<ToggleGroupItem value='yes'>
							Split runes
						</ToggleGroupItem>
						<ToggleGroupItem value='no'>
							{`Don't split`}
						</ToggleGroupItem>
					</VToggleGroupRadio>

					<VTextInput
						name='utxo'
						label='# of UTXOs to split amount into (equally)*'
						required type='number'
						placeholder='e.g. 2'
					/>
				</div>

				<FeeToggle name='fee' />

				<Button colorPallete='primary'>
					Transfer
				</Button>
			</form>
		</FormProvider>
	)
}