'use client';

import { useBtcWallet } from "~/shared/lib/bitcoin";
import { truncateStrFromMiddle } from "~/shared/lib/truncate";
import { useIsMounted } from "~/shared/lib/useHydrated";
import { Button, ButtonProps, Skeleton } from "~/shared/ui/common";

export function ConnectBtcButton(props: ButtonProps) {
	const isMounted = useIsMounted()
	const { ordinalsAddress, connectWallet } = useBtcWallet();

	return (
		<Button
			className='normal-case'
			variant='outline' colorPallete='primary'
			{...props} disabled={!isMounted || !!props?.disabled || !!ordinalsAddress}
			onClick={event => {
				connectWallet();
				props?.onClick?.(event);
			}}
		>
			{isMounted ? (
				ordinalsAddress ? `BTC: ${truncateStrFromMiddle(ordinalsAddress, 10)}` : 'Connect BTC'
			) : (
				<Skeleton className='rounded-[1rem] h-full w-[7rem]' />
			)}
		</Button>
	);
}