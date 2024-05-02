"use client";

import { Button, Form } from "~/shared/ui/common";
import { useForm } from "react-hook-form";
import { Icons } from "~/shared/ui/icons";
import { useMutation } from "@tanstack/react-query";
import { BridgeTo } from "./BridgeTo";
import { BridgeFrom } from "./BridgeFrom";
import { useEffect, useState } from "react";
import {
  // createTransaction,
  fetchEstimateAmount,
  fetchMinimalExchange,
} from "../api/change-now";
import { TCNCurrency } from "~/shared/types/types";
import "./bridge.css";

type TBridgeForm = {
  fromAddress: string;
  fromAmount: string;
  fromCurrency: TCNCurrency;
  toAddress: string;
  toAmont: string;
  toCurrency: TCNCurrency;
};

const defaultBridgeForm = {
  fromAddress: "",
  fromAmount: "0",
  fromCurrency: {
    ticker: "usdt",
    name: "Tether (ERC20)",
    image: "https://content-api.changenow.io/uploads/usdterc20_5ae21618aa.svg",
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: true,
    supportsFixedRate: true,
    network: "eth",
    tokenContract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    buy: true,
    sell: true,
    legacyTicker: "usdterc20",
  },
  toAddress: "",
  toAmont: "0",
  toCurrency: {
    ticker: "btc",
    name: "Bitcoin",
    image: "https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg",
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
    network: "btc",
    tokenContract: null,
    buy: true,
    sell: true,
    legacyTicker: "btc",
  },
};

const CurrencyList = [
  {
    "ticker": "usdt",
    "name": "Tether (ERC20)",
    "image": "https://content-api.changenow.io/uploads/usdterc20_5ae21618aa.svg",
    "hasExternalId": false,
    "isFiat": false,
    "featured": true,
    "isStable": true,
    "supportsFixedRate": true,
    "network": "eth",
    "tokenContract": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "buy": true,
    "sell": true,
    "legacyTicker": "usdterc20"
  },
  {
    "ticker": "eth",
    "name": "Ethereum",
    "image": "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg",
    "hasExternalId": false,
    "isFiat": false,
    "featured": true,
    "isStable": false,
    "supportsFixedRate": true,
    "network": "eth",
    "tokenContract": null,
    "buy": true,
    "sell": true,
    "legacyTicker": "eth"
  },
]

type TCNValue = {
  minimalAmount: number;
  estimateAmount: number;
  error: string;
};

const defaultCNValue = {
  minimalAmount: 0,
  estimateAmount: 0,
  error: "",
};

// type TTXValue = {
//   payOutAddress: string;
//   txId: string;
//   status: string;
// }

// const defaultTxValue = {
//   payOutAddress: "",
//   txId: "",
//   status: ""
// }

export function BridgeForm() {
  const form = useForm();

  const [switchBridge, setSwitchBridge] = useState<boolean>(true);
  const [formValue, setFormValue] = useState<TBridgeForm>(defaultBridgeForm);
  const [cnValue, setCNValue] = useState<TCNValue>(defaultCNValue);
  // const [txValue, setTxValue] = useState<TTXValue>(defaultTxValue)

  const handleChangeBridge = () => {
    setSwitchBridge(!switchBridge);
  };

  const minimalMutate = useMutation({
    mutationKey: ["minimal-exchange-amount"],
    mutationFn: fetchMinimalExchange,
  });

  const estimateMutate = useMutation({
    mutationKey: ["estimate-exchange-amount"],
    mutationFn: fetchEstimateAmount,
  });

  // const createTxMutate = useMutation({
  //   mutationKey: ["create-exchange-transaction"],
  //   mutationFn: createTransaction,
  // });

  const onSubmit = form.handleSubmit(async data => {
    try {
      // const exchangeTx = await createTxMutate.mutateAsync(formValue.fromCurrency,formValue.toCurrency, )
      console.log(data)
    } catch (error) {

    }
  });

  const catchChangeFromAmount = async (fromAmount: number) => {
    let minimalAmount = 0;
    try {
      const minimal = await minimalMutate.mutateAsync({
        from: formValue.fromCurrency,
        to: formValue.toCurrency,
      });
      minimalAmount = minimal?.minAmount;
    } catch (error) {
      console.error(error);
    }

    if (!(fromAmount > minimalAmount)) {
      setCNValue((prev) => ({ ...prev, error: "from", minimalAmount }));
      setFormValue((prev) => ({ ...prev, toAmont: "0" }));
      return;
    }
    try {
      const estimate = await estimateMutate.mutateAsync({
        from: formValue.fromCurrency,
        to: formValue.toCurrency,
        fromAmount: fromAmount,
      });
      setCNValue((prev) => ({
        ...prev,
        estimateAmount: estimate?.toAmount,
        minimalAmount,
        error: "",
      }));
      setFormValue((prev) => ({
        ...prev,
        toAmont: estimate?.toAmount,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const catchChangeToAmount = async (toAmount: number) => {
    let minimalAmount = 0;
    try {
      const minimal = await minimalMutate.mutateAsync({
        to: formValue.fromCurrency,
        from: formValue.toCurrency,
      });
      minimalAmount = minimal?.minAmount;
    } catch (error) {
      console.error(error);
    }

    if (!(toAmount > minimalAmount)) {
      setCNValue((prev) => ({ ...prev, error: "to", minimalAmount }));
      setFormValue((prev) => ({ ...prev, fromAmount: "0" }));
      return;
    }
    try {
      const estimate = await estimateMutate.mutateAsync({
        to: formValue.fromCurrency,
        from: formValue.toCurrency,
        fromAmount: toAmount,
      });
      setCNValue((prev) => ({
        ...prev,
        estimateAmount: estimate?.toAmount,
        minimalAmount,
        error: "",
      }));
      setFormValue((prev) => ({
        ...prev,
        fromAmount: estimate?.toAmount,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const catchChangeTicker = async () => {
    let minimalAmount = 0;
    try {
      const minimal = await minimalMutate.mutateAsync({
        from: formValue.fromCurrency,
        to: formValue.toCurrency,
      });
      minimalAmount = minimal?.minAmount;
    } catch (error) {
      console.error(error);
    }
    setCNValue((prev) => ({ ...prev, minimalAmount }));
    setFormValue((prev) => ({ ...prev, fromAmount: "0", toAmont: "0" }));
  };

  useEffect(() => {
    catchChangeTicker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue.fromCurrency?.legacyTicker]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="flex flex-col items-center gap-[1rem] max-w-[30rem] max-md:gap-[1.5rem] pb-8">
          <div className="flex flex-col items-center mt-2">
            <div className="min-h-44">
              {switchBridge ? (
                <BridgeFrom
                  switchBridge={switchBridge}
                  currencyList={CurrencyList}
                  currency={formValue.fromCurrency}
                  setAmount={(value: string) =>
                    setFormValue((prev) => ({ ...prev, fromAmount: value }))
                  }
                  setCurrency={(value: TCNCurrency) =>
                    setFormValue((prev) => ({ ...prev, fromCurrency: value }))
                  }
                  amount={formValue.fromAmount}
                  changeAmount={catchChangeFromAmount}
                  error={cnValue.error}
                  minimalAmount={cnValue.minimalAmount}
                />
              ) : (
                <BridgeTo
                  switchBridge={switchBridge}
                  currency={formValue.toCurrency}
                  amount={formValue.toAmont}
                  setAmount={(value: string) =>
                    setFormValue((prev) => ({ ...prev, toAmont: value }))
                  }
                  changeAmount={catchChangeToAmount}
                  minimalAmount={cnValue.minimalAmount}
                  error={cnValue.error}
                />
              )}
            </div>
            <div className="flex items-center gap-[0.5rem] w-full my-[1rem] max-md:my-0">
              <hr className="border-secondary grow" />
              <Button
                className="rounded-full"
                variant="outline"
                size="lg"
                onClick={handleChangeBridge}
              >
                <Icons.Switch className="size-[2rem]" />
              </Button>
              <hr className="border-secondary grow" />
            </div>
            <div className="min-h-56">
              {switchBridge ? (
                <BridgeTo
                  switchBridge={switchBridge}
                  currency={formValue.toCurrency}
                  amount={formValue.toAmont}
                  setAmount={(value: string) =>
                    setFormValue((prev) => ({ ...prev, toAmont: value }))
                  }
                  changeAmount={catchChangeToAmount}
                  minimalAmount={cnValue.minimalAmount}
                  error={cnValue.error}
                />
              ) : (
                <BridgeFrom
                  switchBridge={switchBridge}
                  currencyList={CurrencyList}
                  currency={formValue.fromCurrency}
                  setCurrency={(value: TCNCurrency) =>
                    setFormValue((prev) => ({ ...prev, fromCurrency: value }))
                  }
                  setAmount={(value: string) =>
                    setFormValue((prev) => ({ ...prev, fromAmount: value }))
                  }
                  amount={formValue.fromAmount}
                  changeAmount={catchChangeFromAmount}
                  error={cnValue.error}
                  minimalAmount={cnValue.minimalAmount}
                />
              )}
            </div>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                colorPallete="primary"
                className="w-80 text-lg tracking-widest md:mt-0 mt-4"
              >
                Bridge
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
