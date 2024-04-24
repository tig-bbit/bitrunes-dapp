import { useController } from "react-hook-form";
import { ToggleGroupRadio, ToggleGroupRadioProps } from "../common";

interface VToggleGroupRadioProps extends 
	Omit<ToggleGroupRadioProps, 'value' | 'onValueChange'> {
	name: string
}

export function VToggleGroupRadio({ name, ...props }: VToggleGroupRadioProps) {
	const { 
		field: { value, onChange } 
	} = useController({ name })

	return (
		<ToggleGroupRadio
			value={value} onValueChange={onChange}
			{...props}
		/>
	);
}