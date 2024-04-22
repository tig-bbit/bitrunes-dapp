import { Icons } from "~/shared/ui/icons";

export function InputHint() {
	return (
		<div className='flex items-center justify-center h-full px-[0.25rem] cursor-help'>
			<Icons.Hint className='size-[1rem]' />
		</div>
	);
}