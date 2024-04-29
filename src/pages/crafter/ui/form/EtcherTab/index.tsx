'use client';

import { InputHint } from "../../inputs/Hint";
import { VTextInput } from "../../inputs/VTextInput";
import { Button, ToggleGroupItem } from "~/shared/ui/common";
import { useFormValidation } from "./validation";
import { FormProvider } from "react-hook-form";
import { VImageUploader, VToggleGroupRadio } from "~/shared/ui/validation-controls";
import { useFieldValue } from "~/shared/lib/useFieldValue";
import {
	useGasFees,
	useGetOrderDetails,
} from "~/hooks";
import { useEffect, useState } from "react";
import { fixRuneTickerInput } from "../schemaRuneTicker";

export function EtcherTab() {
	const methods = useFormValidation();
	const { fees: mempoolFeeRate, getFees } = useGasFees();
	const {
		getOrderDetails,
		estimateRuneData,
		getEstimateOrderDetails,
	} = useGetOrderDetails();
	const [ismintable, setIsMintable] = useState(true);

	const onSubmit = methods.handleSubmit(values => {
		alert(JSON.stringify(values, undefined, 4));
		if (!localStorage.getItem('ordinalAddress')) {
			alert("Connect wallet");
			return;
		}
		console.log("OrdinalAddress --- " , localStorage.getItem('ordinalAddress'))
		const ordinalAddress = localStorage.getItem('ordinalAddress');

		//   if (ismintable && (!form.getValues().amount || !form.getValues().cap)) {
		// 	toast.error("Please fill mandatory fields!");
		// 	console.log("missing fields");
		// 	return;
		//   }
		getFees();

		console.log('Fees --- ', getFees());
		if (!mempoolFeeRate) {
			alert("Fee rate not available");
			console.log("no fee rate");
			return;
		}
		const rune = {
			runeName: values.runeName.toUpperCase(),
			isMintable : ismintable,
			feeRate: mempoolFeeRate?.fastestFee,
			destinationAddress: values.destAddress,
			...(values.runeSymbol && { symbol: values.runeSymbol }),
			...(values.premine && { premine: values.premine }),
			...(values.divisibility && {
				divisibility: parseInt(values.divisibility.toString()),
			}),
			...(values.mintAmount &&
				values.mintCap && {
				terms: { amount: values.mintAmount, cap: values.mintCap },
			}),
		};
		console.log("rune --- ", rune);
		getEstimateOrderDetails(rune);
		console.log('EstimateOrderDetails --- ', getEstimateOrderDetails(rune));
		if (estimateRuneData) {
			getOrderDetails({
				...rune,
				refundAddress: ordinalAddress,
			});
			console.log('GetOrderDetails --- ', getOrderDetails);
		}
	});

	return (
		<FormProvider {...methods}>
			<form
				className='flex flex-col gap-[1rem] w-full grow'
				onSubmit={onSubmit}
			>
				<div className='flex gap-[1rem] w-full max-md:flex-col-reverse'>
					<div className='flex flex-col gap-[1rem] w-full'>
						<VTextInput
							name='runeName'
							label='Rune Name*'
							placeholder='Enter rune name'
							className="uppercase"
							rightElement={<InputHint text='Names consist of letters A-Z and are between 13 & 28 characters long. They may contain spacers, represented as bullets • , to aid readability' />}
							onChange={e => {
								methods.setValue('runeName', fixRuneTickerInput(e.target.value), {
									shouldDirty: true, shouldValidate: true, shouldTouch: true
								})
							}}
						/>

						<VTextInput
							name='runeSymbol'
							label='Symbol' placeholder='Enter symbol'
							rightElement={<InputHint text="The rune's currency symbol, as a single Unicode code point, for example $, or 🧿." />}
						/>
					</div>

					<VImageUploader
						className='size-[7.875rem] shrink-0'
						label='Rune Image' name='image'
					/>
				</div>

				<VTextInput
					name='destAddress'
					label='Destination Address*'
					placeholder='Enter destination address'
					rightElement={<InputHint text='The Bitcoin address to which the minted runes should be allocated.' />}
				/>

				<div className='flex gap-[1rem] w-full'>

					<VTextInput
						name='divisibility'
						label='Divisibility' type='number'
						placeholder='Enter divisibility'
						rightElement={<InputHint text='A number representing the runes divisibility' />}
					/>
				</div>

				<MintOptions setState={setIsMintable} />

				<div className='flex flex-col gap-[1rem] w-full grow justify-end'>
					<div className='flex gap-[1rem] w-full jsutify-between'>
						<span className='text-black-60'>Est. Mempool Fee Rate</span>
						<span>102 Sats/vByte</span>
					</div>

					<Button type="submit" colorPallete='primary'>
						Etch Rune
					</Button>
				</div>
			</form>
		</FormProvider>
	);
}
interface Props {
	setState: (isVisible : boolean) => void;
  }
function MintOptions({setState} : Props) {
	const tab = useFieldValue({ name: 'mintType' })

	useEffect(() => {
		if(tab == 'open')
			setState(true);
		else
			setState(false);
	}, [tab])
	return (
		<div className='flex flex-col gap-[1rem] w-full'>
			<VToggleGroupRadio
				name='mintType' className='w-full'
			>
				<ToggleGroupItem value='open'>
					Open Mint
				</ToggleGroupItem>
				<ToggleGroupItem value='closed'>
					Closed Mint
				</ToggleGroupItem>
			</VToggleGroupRadio>

			{tab == 'open' && (
				<>
					<VTextInput
						name='premine'
						label='Premine' type='number'
						placeholder='Enter premine'
					/>

					<div className='flex gap-[1rem] w-full'>
						<VTextInput
							name='mintAmount'
							label='Mint Amount' type='number'
							placeholder='Enter mint amount'
						/>
						<VTextInput
							name='mintCap'
							label='Mint Cap' type='number'
							placeholder='Enter min cap'
						/>
					</div>

					{/* <div className='flex flex-col gap-[0.5rem]'>
						<span className='text-black-60 text-[0.875rem]'>
							Rune Inscription
						</span>
						<ToggleGroupRadio className='w-full' defaultValue='default'>
							<ToggleGroupItem value='default'>
								Choose File
							</ToggleGroupItem>
						</ToggleGroupRadio>
					</div> */}
				</>
			)}
		</div>
	);
}