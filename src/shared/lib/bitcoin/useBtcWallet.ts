"use client";

import { useCallback, useMemo } from "react";
import { useToast } from "~/shared/ui/common";
import { useLocalStorage } from 'usehooks-ts'

export function useBtcWallet() {
	const { toast } = useToast();

	const [paymentAddress, setPaymentAddress] = useLocalStorage<string | null>('paymentAddress', null);
	const [ordinalsAddress, setOrdinalsAddress] = useLocalStorage<string | null>('ordinalsAddress', null);

	const connectWallet = useCallback(async () => {
		const { AddressPurpose, request } = await import("sats-connect");

		const response = await request('getAccounts', {
			purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals, AddressPurpose.Stacks],
			message: 'Connect to Bitrunes Runes'
		});

		if (response.status == 'error') {
			toast({
				variant: 'error',
				title: 'Error',
				description: response.error.message
			});
			return { paymentAddress: null, ordinalsAddress: null };
		}

		const wallets = response.result;

		const paymentAddress = wallets.find(a => a.purpose === AddressPurpose.Payment)?.address ?? null;
		const ordinalsAddress = wallets.find(a => a.purpose === AddressPurpose.Ordinals)?.address ?? null;

		setPaymentAddress(paymentAddress);
		setOrdinalsAddress(ordinalsAddress);

		return { paymentAddress, ordinalsAddress };
	}, [setOrdinalsAddress, setPaymentAddress, toast]);

	const disconnectWallet = useCallback(async () => {
		const { default: Wallet } = await import("sats-connect");

		await Wallet.disconnect();

		setPaymentAddress(null);
		setOrdinalsAddress(null);
	}, [setPaymentAddress, setOrdinalsAddress]);
	
	const requireWalletAddresses = useCallback(async () => {
		if(paymentAddress && ordinalsAddress)
			return { paymentAddress, ordinalsAddress };

		return await connectWallet();
	}, [connectWallet, paymentAddress, ordinalsAddress]);

	const pay = useCallback(async (address: string, amount: number) => {
		const { request } = await import("sats-connect");

		const response = await request("sendTransfer", {
			recipients: [{ address, amount }]
		});

		if (response.status === "success")
			return response.result;

		toast({
			variant: 'error', title: 'Error',
			description: response.error.message
		});
		return null;
	}, [toast])

	return useMemo(() => ({
		paymentAddress, ordinalsAddress, connectWallet, disconnectWallet, requireWalletAddresses, pay,
	}), [paymentAddress, ordinalsAddress, connectWallet, disconnectWallet, requireWalletAddresses, pay])
}
