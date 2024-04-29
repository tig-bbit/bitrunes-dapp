import { PageRune } from "~/pages/rune-page"

interface PageProps {
	params: {
		runeName: string
	}
}

export default function Page({ params }: PageProps) {
	return <PageRune runeName={params.runeName} />
}

export async function generateMetadata({ params }: PageProps) {
	return {
		title: `Rune: ${params.runeName}`
	}
}