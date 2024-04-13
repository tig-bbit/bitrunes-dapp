import { Stepper, StepperProps, StepperStep } from "~/shared/ui/stepper";

export function EtcherStepper(props: StepperProps) {
	return (
		<Stepper {...props}>
			<StepperStep label='Information'>
				1
			</StepperStep>
			<StepperStep label='Configuration'>
				2
			</StepperStep>
			<StepperStep label='Limits & Rules'>
				3
			</StepperStep>
			<StepperStep label='Summary'>
				4
			</StepperStep>
		</Stepper>
	);
}