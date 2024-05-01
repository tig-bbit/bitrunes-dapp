import { Button, Progress } from "~/shared/ui/common";
import { VTextInput } from "../../inputs/VTextInput";
import { FeeToggle } from "../../inputs/FeeToggle";
import { SchemaType, useFormValidation } from "./validation";
import { FormProvider, useFormContext } from "react-hook-form";
import { useRuneCrafterStore } from "~/pages/crafter/model";
import { useEffect, useState } from "react";
import { fixRuneTickerInput } from "../schemaRuneTicker";
import { fetchRuneDetails } from "~/shared/api/indexer";
import { useDebounce } from "~/shared/lib/debounce";
import { MintingModal } from "./MintingModal";
import { objectId } from "~/shared/lib/object-id";

export function MintTab() {
	const methods = useFormValidation();
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState<SchemaType | null>(null);

	const onSubmit = methods.handleSubmit(values => {
		setValues(values);
		setOpen(true);
	});

	return (
		<FormProvider {...methods}>
			{values && (
				<MintingModal
					key={objectId(values)}
					formData={values} open={open}
					onOpenChange={setOpen}
				/>
			)}

			<form
				className='flex flex-col gap-[1.5rem] w-full grow justify-between'
				onSubmit={onSubmit}
			>
				<RuneControls />

				{/* <div className='flex flex-col gap-[0.5rem] w-full'>
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
				</div> */}

				<FeeToggle name='fee' />

				<Button colorPallete='primary'>
					Mint
				</Button>
			</form>
		</FormProvider>
	)
}

function RuneControls() {
	const { setValue } = useFormContext();
	const [isLoading, setIsLoader] = useState(false);

	const runeToMint = useRuneCrafterStore(s => s.runeToMint);
	const setRuneToMint = useRuneCrafterStore(s => s.setRuneToMint);

	const runeTicker = runeToMint?.rune_name;

	useEffect(() => {
		if (!runeTicker)
			return;

		setValue('isValidRune', true);

		setValue('runeTicker', runeTicker, {
			shouldDirty: true, shouldValidate: true, shouldTouch: true
		});

		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [runeTicker, setValue]);

	const fetchDetails = useDebounce(async (runeName: string) => {
		setIsLoader(true);

		try {
			const details = await fetchRuneDetails(runeName)
			setRuneToMint(details);
			setValue('isValidRune', !!details);
		}
		catch {
			setValue('isValidRune', false);
		}
		finally {
			setIsLoader(false);
		}
	}, 500);

	return (
		<>
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
					onChange={e => {
						const text = e.target.value;
						fetchDetails(text.replaceAll('•', ''));

						setValue('runeTicker', fixRuneTickerInput(text), {
							shouldDirty: true, shouldValidate: true, shouldTouch: true
						})
					}}
					rightElement={isLoading && <Loader />}
				/>

				<VTextInput
					name='repeatMint'
					label='Repeat Mint*'
					placeholder='Enter repeat mint'
				/>
			</div>
		</>
	)
}

const Loader = () => <div className='animate-ping size-[0.5rem] rounded-full bg-white/50 light:bg-black/50 mx-[0.5rem]' />