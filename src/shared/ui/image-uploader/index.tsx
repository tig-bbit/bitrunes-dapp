"use client"

import { cn } from "~/shared/lib/utils";
import { Icons } from "../icons";
import { HTMLAttributes, useState } from "react";
import { Button } from "../common";
import { X } from "lucide-react";

export interface ImageUploaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	label: string
	onChange?: (image: File | null) => void
}

export function ImageUploader({ className, label, onChange, ...props }: ImageUploaderProps) {
	const [imagePreview, setImagePreview] = useState<string | null>();

	const changePreview = (image: File | null) => {
		setImagePreview(image ? URL.createObjectURL(image) : null);
		onChange?.(image);
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file)
			return;

		changePreview(file)
	};

	return (
		<div
			{...props}
			className={cn(
				'flex flex-col items-center justify-center gap-[0.25rem] relative overflow-hidden',
				'size-[6.625rem] rounded-[1rem] border border-secondary border-dashed text-black-40',
				'hocus:bg-white/5',
				'light:hocus:bg-black/5',
				'max-md:size-[10rem] max-md:mx-auto',
				className
			)}
		>
			{imagePreview ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={imagePreview}
					className="object-contain size-full"
					alt="Preview"
				/>
			) : (
				<>
					<Icons.UploadCloud className='size-[1.25rem]' />
					<p className='w-min text-center'>{label}</p>
				</>
			)}

			<input
				accept='image/*'
				className='absolute size-full top-0 left-0 opacity-0 cursor-pointer'
				type='file'
				onChange={handleFileChange}
			/>

			{imagePreview && (
				<Button
					className='absolute top-1 right-1 w-min rounded-full bg-black/50 text-white/50'
					variant='unstyled' size='icon'
					onClick={() => changePreview(null)}
				>
					<X />
				</Button>
			)}
		</div>
	);
}