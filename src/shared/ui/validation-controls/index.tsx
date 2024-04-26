import { useController } from "react-hook-form";
import { ToggleGroupRadio, ToggleGroupRadioProps } from "../common";
import { ImageUploader, ImageUploaderProps } from "../image-uploader";
import { cn } from "~/shared/lib/utils";

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

interface VImageUploaderProps extends ImageUploaderProps {
	name: string
}

export function VImageUploader({ name, className, ...props }: VImageUploaderProps) {
	const { 
		field: { onChange },
		fieldState: { error }
	} = useController({ name })

	return (
		<ImageUploader
			{...props}
			className={cn(error && 'border-error shadow-error-default', className)}
			onChange={image => {
				onChange(image);
				props?.onChange?.(image);
			}}
		/>
	);
}