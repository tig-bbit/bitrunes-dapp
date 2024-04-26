"use client";
import { useState } from "react";

export function useWalletConnect() {
  const [paymentAddress, setPaymentAddress] = useState<string | undefined>();
  const [ordinalsAddress, setOrdinalsAddress] = useState<string | undefined>();
  const handleWalletConnect = async () => {
    const { AddressPurpose, BitcoinNetworkType, getAddress } = await import(
      "sats-connect"
    );
    await getAddress({
      payload: {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
        message: "Connect to Bitrunes Runes",
        network: {
          type: BitcoinNetworkType.Testnet,
        },
      },
      onFinish: (response) => {
        const paymentAddressItem = response.addresses.find(
          (address) => address.purpose === AddressPurpose.Payment
        );
        setPaymentAddress(paymentAddressItem?.address);

        const ordinalsAddressItem = response.addresses.find(
          (address) => address.purpose === AddressPurpose.Ordinals
        );
        setOrdinalsAddress(ordinalsAddressItem?.address);
      },
      onCancel: () => alert("Request canceled"),
    });
  };

  return { paymentAddress, ordinalsAddress, handleWalletConnect };
}
