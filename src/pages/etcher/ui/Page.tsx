import { PagePaper } from "~/shared/ui/layout";
import { formComponents } from "../config";
import { EtcherStepper } from "./Stepper";

interface PageProps {
	step: keyof typeof formComponents;
}

export function Page({ step }: PageProps) {
	const Component = formComponents[step];
	const stepNumber = Object.keys(formComponents).findIndex(k => k == step) + 1;

	return (
		<PagePaper>
			<div className='flex flex-col items-center gap-[3rem] w-full'>
				<EtcherStepper step={stepNumber} />

				<div className='w-full max-w-[30.875rem]'>
					<Component />
				</div>
			</div>
		</PagePaper>
	);
}