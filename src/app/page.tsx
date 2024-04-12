import { Button, DropdownButton, Input, NumberInput } from "~/shared/ui/common";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "~/shared/ui/common"

export default function Home() {
	return (
		<main className="p-8 bg-black/85 h-screen flex flex-col items-center justify-center gap-16">
			<div className='flex gap-8'>
				<Button>Get Started</Button>
				<Button variant='outline'>Get Started</Button>
				<Button variant='outline' colorPallete='primary'>
					Get Started
				</Button>
			</div>

			<div className='flex gap-8'>
				<Input placeholder='Title' />

				<NumberInput
					label='Total number of tokens'

				/>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<DropdownButton className='w-32'>
							BTC
						</DropdownButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								USDT
							</DropdownMenuItem>
							<DropdownMenuItem>
								USDC
							</DropdownMenuItem>
							<DropdownMenuItem>
								ETH
							</DropdownMenuItem>
							<DropdownMenuItem>
								BFG
							</DropdownMenuItem>
							<DropdownMenuItem>
								BSRX
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</main>
	);
}
