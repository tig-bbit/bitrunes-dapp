"use client"

import { cn } from "~/shared/lib/utils";
import { Icons } from "../icons";
import { HTMLAttributes, useState } from "react";
import Image from "next/image";

interface ImageUploaderProps extends HTMLAttributes<HTMLDivElement> {
	label: string
}

export function ImageUploader({ className, label, ...props }: ImageUploaderProps) {
	const [imagePrompt, setImagePrompt] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>();
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImagePreview(e.target?.result as string);
			};
			reader.readAsDataURL(e.target.files[0]);
			setImagePrompt(e.target.files[0]);
		}
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
				<Image
					src={imagePreview}
					className="object-contain"
					alt="Preview"
					width={124}
					height={130}
				/>
			) :
				<>
					<Icons.UploadCloud className='size-[1.25rem]' />
					<p className='w-min text-center'>{label}</p>
				</>
			}

			<input
				accept='image/*'
				className='absolute size-full top-0 left-0 opacity-0 cursor-pointer'
				type='file'
				onChange={handleFileChange}
			/>
		</div>
	);
}