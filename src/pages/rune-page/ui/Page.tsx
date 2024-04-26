import { fetchRuneDetails } from "../api";
import { DetailsSection } from "./DetailsSection";
import { HoldersSection } from "./HoldersSection";

interface PageProps {
	runeName: string
}

export async function Page({ runeName }: PageProps) {	
	const details = await fetchRuneDetails(runeName);

	return (
		<div className='flex flex-col gap-[1.25rem] h-full'>
			<DetailsSection details={details} />
			<HoldersSection rune={details} />
		</div>
	);
}