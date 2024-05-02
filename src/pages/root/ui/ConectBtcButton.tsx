'use client';

import { forwardRef, useState } from "react";
import { useBtcWallet } from "~/shared/lib/bitcoin";
import { truncateStrFromMiddle } from "~/shared/lib/truncate";
import { useIsMounted } from "~/shared/lib/useHydrated";
import { Button, ButtonProps, Skeleton } from "~/shared/ui/common";

export function ConnectBtcButton(props: ButtonProps) {
	const isMounted = useIsMounted()
	const { ordinalsAddress, connectWallet, disconnectWallet } = useBtcWallet();
	const [isHovered, setIsHovered] = useState(false);

	if (!isMounted) {
		return (
			<BtcButton disabled={true}>
				<Skeleton className='rounded-[1rem] size-full' />
			</BtcButton>
		);
	}

	if (ordinalsAddress) {
		return (
			<BtcButton
				disabled={!isHovered}
				onPointerEnter={() => setIsHovered(true)}
				onPointerLeave={() => setIsHovered(false)}
				onClick={event => {
					disconnectWallet();
					props?.onClick?.(event);
				}}
			>
				{isHovered ? 'Disconnect BTC' : `BTC: ${truncateStrFromMiddle(ordinalsAddress)}`}
			</BtcButton>
		);
	}

	return (
		<BtcButton
			{...props} disabled={!isMounted || !!props?.disabled || !!ordinalsAddress}
			onClick={event => {
				connectWallet();
				props?.onClick?.(event);
			}}
		>
			Connect BTC
		</BtcButton>
	);
}

const BtcButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
	<Button
		className='normal-case min-w-[10rem]'
		variant='outline' colorPallete='primary'
		ref={ref} {...props}
	/>
));

BtcButton.displayName = 'BtcButton'