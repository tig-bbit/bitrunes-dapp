import { RichInput } from "~/shared/ui/common";
import { Icons } from "~/shared/ui/icons";
import { Heading, PagePaper } from "~/shared/ui/layout";
import { TableContent } from "./TableContent";
import { IndexerHydrationBoundary, prefetchRuneTickersQuery } from "~/shared/api/indexer";

export function Table() {
	return (
		<PagePaper className='items-start w-full bg-transparent p-[1.5rem] gap-[1rem] min-w-0'>
			<div className='flex justify-between gap-[1rem] w-full max-md:flex-col'>
				<Heading className='text-[1.5rem]/none'>
					Find a Rune to Mint
				</Heading>

				<RichInput
					variant='outline' size='small'
					placeholder='Search runes'
					rootProps={{
						className: 'w-[10.25rem] rounded-full px-[1rem] py-[0.3438rem] max-md:w-full'
					}}
					rightElement={
						<Icons.Search2
							className='text-black-40 h-full size-[1rem] shrink-0'
						/>
					}
				/>
			</div>

			<IndexerHydrationBoundary
				prefetchCallback={prefetchRuneTickersQuery}
			>
				<TableContent />
			</IndexerHydrationBoundary>
		</PagePaper>
	);
}