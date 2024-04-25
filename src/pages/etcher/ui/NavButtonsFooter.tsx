import { PropsWithChildren} from "react";

export function NavButtonsFooter({ children }: PropsWithChildren) {
	return (
		<div className='flex gap-[1rem] max-md:gap-[0.5rem] max-md:flex-col-reverse w-full [&>*]:w-full'>
			{children}
		</div>
	)
}