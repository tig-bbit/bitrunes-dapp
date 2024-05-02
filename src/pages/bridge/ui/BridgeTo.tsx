import { useEffect, useState } from "react";
import { BridgeSelectCurrencyLabel } from "~/features/currency-select/BridgePopover";
import {
  Button,
  FormControl,
  FormItem,
  FormLabel,
  RichInput,
  Input,
  ToggleGroupRadio,
  ToggleGroupItem,
} from "~/shared/ui/common";
import { TCNCurrency } from "~/shared/types/types";
import { useConnect } from "~/app/_providers/wallet-provider";
import { useBtcWallet } from "~/shared/lib/bitcoin";
import { cn } from "~/shared/lib/utils";
import { useDebounce } from "~/shared/lib/debounce";

interface BridgeToProps {
  switchBridge: boolean;
  currency: TCNCurrency;
  amount: string;
  setAmount: (value: string) => void;
  minimalAmount: number;
  error: string;
  changeAmount: (value: number) => Promise<void>;
}

export function BridgeTo(props: BridgeToProps) {
  const {
    switchBridge,
    currency,
    amount,
    setAmount,
    minimalAmount,
    error,
    changeAmount,
  } = props;
  const { walletAddress, setWalletAddress } = useConnect();
  const { ordinalsAddress, connectWallet: walletBtcConnect } = useBtcWallet();
  const [connectedAddress, setConnectedAddress] = useState<string>("connected");

  useEffect(() => {
    setWalletAddress(ordinalsAddress as string);
  }, [ordinalsAddress, setWalletAddress]);

  useEffect(() => {
    if (ordinalsAddress) {
      window.localStorage.setItem("ordinalAddress", ordinalsAddress);
      setWalletAddress(ordinalsAddress);
    }
  }, [ordinalsAddress, setWalletAddress]);

  useEffect(() => {
    const item = window.localStorage.getItem("ordinalAddress");
    if (item) {
      setWalletAddress(item);
    }
  });

  const handleRemoveItem = () => {
    window.localStorage.removeItem("ordinalAddress");
    setWalletAddress("");
  };

  const handleConnectWallet = async () => {
    await walletBtcConnect();
    setWalletAddress(ordinalsAddress as string);
  };

  const debounceAmount = useDebounce((amount: string) => changeAmount(parseFloat(amount)), 200);

  const catchChangeAmount = async (inputValue: string) => {
    const fromAmount =
      parseFloat(inputValue) >= 1 ? inputValue.replace(/^0+/, "") : inputValue;
    setAmount(fromAmount);
    debounceAmount(fromAmount);
  };

  const handleChangeAmount = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const reqTest = new RegExp(`^\\d*\\.?\\d{0,${8}}$`);

    if (reqTest.test(inputValue) && inputValue !== "") {
      await catchChangeAmount(inputValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <FormItem className="w-full justify-between">
        <FormLabel>{switchBridge ? "To" : "From"}</FormLabel>
        <FormControl className="h-[45px]">
          {connectedAddress === "other" ? (
            <Input placeholder="e.g. 3QEC5s9i2KHWxRPPnwmyKdhmSPFW2PjupV" />
          ) : walletAddress ? (
            <Button
              variant="outline"
              colorPallete="primary"
              onClick={handleRemoveItem}
              className="group w-36 hover:bg-primary"
            >
              <span className="group-hover:hidden block w-full">
                {walletAddress.slice(0, 5)}...{walletAddress.slice(-5)}
              </span>
              <span className="hidden group-hover:inline-block w-full text-primary">
                Disconnect
              </span>
            </Button>
          ) : (
            <Button
              onClick={handleConnectWallet}
              variant="outline"
              colorPallete="primary"
            >
              Connect Wallet
            </Button>
          )}
        </FormControl>
      </FormItem>
      <FormItem className={cn("w-full", error !== "" && "error-richinput")}>
        <FormLabel>Amount</FormLabel>
        <FormControl>
          <RichInput
            className="text-[1.5rem]"
            topElement={<BridgeSelectCurrencyLabel currency={currency} />}
            rightElement={
              <span className="text-black-40 whitespace-nowrap uppercase">
                {currency?.ticker}
              </span>
            }
            value={amount}
            onChange={handleChangeAmount}
          />
        </FormControl>
      </FormItem>
      {error === "to" && (
        <div className="w-full flex justify-center text-xs top-2 text-primary pl-4">
          <span>
            Minimum amount is &nbsp;
            <span className="uppercase">{currency?.ticker}</span>
          </span>
          &nbsp;&nbsp;
          <span
            className="underline underline-offset-4 hover:cursor-pointer"
            onClick={() => catchChangeAmount(minimalAmount.toString())}
          >
            {minimalAmount}
          </span>
        </div>
      )}
      {switchBridge && (
        <FormItem className="w-full">
          <FormLabel>Address</FormLabel>
          <FormControl>
            <ToggleGroupRadio
              className="grow"
              value={connectedAddress}
              onValueChange={setConnectedAddress}
            >
              <ToggleGroupItem value="connected">Connected</ToggleGroupItem>
              <ToggleGroupItem value="other">Other</ToggleGroupItem>
            </ToggleGroupRadio>
          </FormControl>
        </FormItem>
      )}
    </div>
  );
}
