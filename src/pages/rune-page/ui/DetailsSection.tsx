import { PropsWithChildren } from "react";
import { RuneDetails } from "~/shared/api/indexer";
import { dayJs } from "~/shared/lib/dayjs";
import { truncateStrFromMiddle } from "~/shared/lib/truncate";
import { Button, Progress } from "~/shared/ui/common";
import { PagePaper } from "~/shared/ui/layout";
import { HoldersCount } from "./HoldersCount";

export async function DetailsSection({ details }: { details: RuneDetails }) {
	return (
		<PagePaper className='p-[1.5rem]'>
			<div className='flex flex-col gap-[1.5rem] w-full'>
				<div className='flex gap-[1rem] justify-between items-center w-full max-md:flex-col'>
					<div className='flex gap-[1rem] max-md:flex-col max-md:items-center w-full'>
						<span className='size-[4.25rem] text-[3.25rem]'>
							{details.symbol}
						</span>

						<div className='flex flex-col justify-between max-md:gap-[1rem] w-full'>
							<h1 className='text-[2rem] font-semibold break-all'>
								{details.rune_name}
							</h1>

							<Button
								className='w-min h-[1.6875rem] max-md:w-full max-md:h-[2rem] max-md:text-[0.90rem]'
								colorPallete='primary' size='sm'
							>
								Mint
							</Button>
						</div>
					</div>

					<div className='flex flex-col gap-[0.5rem] max-w-[26.8125rem] w-full max-md:max-w-full'>
						<Progress
							className='h-[1rem]'
							value={details.progress}
						/>

						<div className='flex justify-between w-full text-[0.75rem] text-black-60'>
							<span>{details.mints}/{details.terms_cap} minted</span>
							<span className='text-primary'>{details.progress.toFixed(2)}%</span>
						</div>
					</div>
				</div>

				<div className='flex gap-[1.25rem] w-full max-md:flex-col'>
					<DetailsContainer>
						<DetailsRecord>
							<span>Rune Id</span>

							<span>{details.rune_id}</span>
						</DetailsRecord>
						<DetailsRecord>
							<span>Etch Txs</span>

							<a
								className='text-primary'
								href={`https://mempool.space/tx/${details.etching}`}
							>
								{truncateStrFromMiddle(details.etching, 10)}
							</a>
						</DetailsRecord>
						<DetailsRecord>
							<span>Divisibility</span>

							<span>{details.divisibility}</span>
						</DetailsRecord>
						<DetailsRecord>
							<span>Supply</span>

							<span>{details.terms_amount}</span>
						</DetailsRecord>
						<DetailsRecord>
							<span>Minted</span>

							<span>{details.mints} times</span>
						</DetailsRecord>
						<DetailsRecord>
							<span>Premine</span>

							<span>{details.premine}</span>
						</DetailsRecord>
					</DetailsContainer>
					<DetailsContainer>
						<DetailsRecord>
							<span>Holders</span>

							<HoldersCount
								runeName={details.rune_name_wo_spacers}
							/>
						</DetailsRecord>
						<DetailsRecord>
							<span>Created</span>

							<span>{dayJs(details.timestamp).fromNow()}</span>
						</DetailsRecord>
						<DetailsRecord>
							<span>Max Mint Number</span>

							<span>{details.terms_cap}</span>
						</DetailsRecord>
						<DetailsRecord>
							<span>Mint Start Block</span>

							<span>{details.mint_start_block}</span>
						</DetailsRecord>
						<DetailsRecord>
							<span>Mint End Block</span>

							<span>{details.mint_end_block}</span>
						</DetailsRecord>
					</DetailsContainer>
				</div>
			</div>
		</PagePaper>
	);
}

function DetailsContainer({ children }: PropsWithChildren) {
	return (
		<div className='flex flex-col border border-secondary rounded-[1rem] p-[0.5rem] text-black-60 w-full'>
			{children}
		</div>
	);
}

function DetailsRecord({ children }: PropsWithChildren) {
	return (
		<div className='flex w-full justify-between even:bg-white/[.04] px-[1rem] py-[0.3125rem] rounded-[0.625rem]'>
			{children}
		</div>
	);
}