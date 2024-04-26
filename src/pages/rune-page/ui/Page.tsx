import { PagePaper } from "~/shared/ui/layout";
import { fetchRuneData } from "../api";

interface PageProps {
	runeName: string
}

export async function Page({ runeName }: PageProps) {
	const data = await fetchRuneData(runeName);

	return (
		<PagePaper>
			<pre>
				{JSON.stringify(data, undefined, 4)}
			</pre>
		</PagePaper>
	);
}