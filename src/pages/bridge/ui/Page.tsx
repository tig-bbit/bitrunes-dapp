import { BridgeForm } from "./BridgeForm";

export function Page() {
	return (
		<div className='flex flex-col items-center gap-[3rem]'>
			<h1 className='font-semibold text-[2rem]'>
				Bridge
			</h1>

			<BridgeForm />
		</div>
	);
}