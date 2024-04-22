import { cn } from "~/shared/lib/utils";
import { Icons } from "../icons";
import { HTMLAttributes } from "react";

interface ImageUploaderProps extends HTMLAttributes<HTMLDivElement> {
	label: string
}

export function ImageUploader({ className, label, ...props }: ImageUploaderProps) {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-col items-center justify-center gap-[0.25rem] relative',
				'size-[6.625rem] rounded-[1rem] border border-secondary border-dashed text-black-40',
				'hocus:bg-white/5',
				'light:hocus:bg-black/5',
				'max-md:size-[10rem] max-md:mx-auto',
				className
			)}
		>
			<Icons.UploadCloud className='size-[1.25rem]' />
			<p className='w-min text-center'>{label}</p>

			<input
				accept='image/*'
				className='absolute size-full top-0 left-0 opacity-0 cursor-pointer'
				type='file'
			/>
		</div>
	);
}