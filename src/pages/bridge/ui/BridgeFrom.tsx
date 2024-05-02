import {
  FormControl,
  FormItem,
  FormLabel,
  Input,
  RichInput,
  ToggleGroupItem,
  ToggleGroupRadio,
} from "~/shared/ui/common";
import WalletConnectButton from "./WalletConnectButton";
import { BridgeSelectCurrency } from "~/features/currency-select/BridgePopover";
import { useState } from "react";
import { TCNCurrency } from "~/shared/types/types";
import { cn } from "~/shared/lib/utils";
import { useDebounce } from "~/shared/lib/debounce";

interface BridgeFromProps {
  switchBridge: boolean;
  currencyList: TCNCurrency[];
  amount: string;
  setAmount: (value: string) => void;
  currency: TCNCurrency;
  setCurrency: (value: TCNCurrency) => void;
  minimalAmount: number;
  error: string;
  changeAmount: (value: number) => Promise<void>;
}

export function BridgeFrom(props: BridgeFromProps) {
  const {
    switchBridge,
    currencyList,
    currency,
    setCurrency,
    amount,
    setAmount,
    minimalAmount,
    error,
    changeAmount,
  } = props;

  const [connectedAddress, setConnectedAddress] = useState<string>("connected");

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
      <FormItem className="w-full">
        <FormLabel>{switchBridge ? "From" : "To"}</FormLabel>
        <FormControl className="flex w-full">
          {connectedAddress === "other" ? (
            <Input placeholder="e.g. 0x997c71Efe6DE05bdd3072b8af97Ddf3E4B38731f" />
          ) : (
            <div className="flex flex-row justify-end items-center">
              <WalletConnectButton />
            </div>
          )}
        </FormControl>
      </FormItem>
      <FormItem className={cn("w-full", error !== "" && "error-richinput")}>
        <FormLabel>Amount</FormLabel>
        <FormControl>
          <RichInput
            className="text-[1.5rem]"
            topElement={
              <BridgeSelectCurrency
                currencyList={currencyList}
                currency={currency}
                setCurrency={setCurrency}
              />
            }
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
      {error === "from" && (
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
      {!switchBridge && (
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
