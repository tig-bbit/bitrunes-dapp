import { formComponents } from "../config";
import { EtcherStepper } from "./Stepper";

interface PageProps {
	step: keyof typeof formComponents;
}

export function Page({ step }: PageProps) {
	const Component = formComponents[step];
	const stepNumber = Object.keys(formComponents).findIndex(k => k == step) + 1;

	return (
		<div className='flex flex-col items-center gap-[5rem]'>
			<EtcherStepper step={stepNumber} />
			<Component />
		</div>
	);
}