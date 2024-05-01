"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from "~/shared/ui/common";

import { useCallback, useEffect, useState } from "react";
import { cn } from "~/shared/lib/utils";
import Image from "next/image";
import { TCNCurrency } from "~/shared/types/types";

interface CurrencyElement {
  currency: TCNCurrency;
  className?: string;
  key?: string;
}

interface CurrencySelectProps {
  currencyList: TCNCurrency[];
  currency: TCNCurrency;
  setCurrency: (value: TCNCurrency) => void;
}

export const CSupportNetworks = [
  {
    name: "ERC20",
    keyValue: "eth",
  },
  {
    name: "Binance Smart Chain",
    keyValue: "bsc",
  },
  {
    name: "Arbitrum",
    keyValue: "arbitrum",
  },
  {
    name: "Base",
    keyValue: "base",
  },
  {
    name: "Avalanche",
    keyValue: "xchain",
  },
  {
    name: "Avalanche (C-Chain)",
    keyValue: "cchain",
  },
  {
    name: "Polygon",
    keyValue: "matic",
  },
  {
    name: "Optimism",
    keyValue: "op",
  },
  {
    name: "Cronos",
    keyValue: "cro",
  },
];

export function BridgeSelectCurrency({
  currency,
  currencyList,
  setCurrency,
}: CurrencySelectProps) {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCNList, setFilterCNList] = useState<TCNCurrency[]>([]);
  const [cNList, setCNList] = useState<TCNCurrency[]>([]);

  const handleSelectItem = (item: TCNCurrency) => {
    setCurrency(item);
    setIsOpen(false);
  };

  const onFilterCN = useCallback(async () => {
    let _filterCNList = [];
    const supportChains = CSupportNetworks.map((item) => item.keyValue).join(
      ""
    );
    _filterCNList = cNList?.filter((item) => {
      return (
        item?.isFiat === false &&
        supportChains.indexOf(item?.network || "etherum") > -1
      );
    });
    if (searchText !== "") {
      _filterCNList = _filterCNList.filter((item) => {
        return (
          (item?.ticker || "" + item?.name || "")
            .toLocaleLowerCase()
            .indexOf(searchText.toLocaleLowerCase()) > -1
        );
      });
    }
    setFilterCNList(_filterCNList);
  }, [cNList, searchText]);

  useEffect(() => {
    onFilterCN();
  }, [onFilterCN]);

  useEffect(() => {
    setCNList(currencyList);
  }, [currencyList]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <BridgeSelectCurrencyLabel currency={currency} />
      </PopoverTrigger>
      <PopoverContent>
        <Input
          className="px-2 py-1 mb-2 rounded-sm"
          placeholder="Search..."
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <div className="flex flex-col max-h-[15rem] overflow-y-scroll">
          {filteredCNList?.filter((item) => item?.featured)?.length > 0 && (
            <div className="text-sm font-extralight">Popular Coins</div>
          )}
          {filteredCNList?.filter((item) => item?.featured)?.length > 0 &&
            filteredCNList
              ?.filter((item) => item?.featured)
              ?.map((currencyItem, index) => (
                <div
                  onClick={() => handleSelectItem(currencyItem)}
                  className="w-full hover:cursor-pointer hover:backdrop-blur-lg rounded-md p-2"
                  key={index}
                >
                  <BridgeCurrencyLabel currency={currencyItem} />
                </div>
              ))}
          {filteredCNList?.filter((item) => item?.isStable && !item?.featured)
            ?.length > 0 && (
            <div className="text-sm font-extralight">Stable Coins</div>
          )}
          {filteredCNList?.filter((item) => item?.isStable && !item?.featured)
            ?.length > 0 &&
            filteredCNList
              ?.filter((item) => item?.isStable && !item?.featured)
              ?.map((currencyItem, index) => (
                <div
                  onClick={() => handleSelectItem(currencyItem)}
                  className="w-full hover:cursor-pointer hover:backdrop-blur-lg rounded-md p-2"
                  key={index}
                >
                  <BridgeCurrencyLabel currency={currencyItem} />
                </div>
              ))}
          {filteredCNList?.filter((item) => !item?.isStable && !item?.featured)
            ?.length > 0 && (
            <div className="text-sm font-extralight">DeFi Tokens</div>
          )}
          {filteredCNList
            ?.filter((item) => !item?.isStable && !item?.featured)
            ?.map((currencyItem, index) => (
              <div
                onClick={() => handleSelectItem(currencyItem)}
                className="w-full hover:cursor-pointer hover:backdrop-blur-lg rounded-md p-2"
                key={index}
              >
                <BridgeCurrencyLabel currency={currencyItem} />
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function BridgeCurrencyLabel({ currency, className }: CurrencyElement) {
  return (
    <div className={cn("flex items-center gap-[1rem]", className)}>
      <Image
        alt="token"
        src={currency?.image || "/images/swaple-image.png"}
        className="w-8 h-8"
        width={8}
        height={8}
      />
      <div className="flex flex-col">
        <span className="uppercase text-md font-bold">{currency?.ticker}</span>
        <span className="text-xs font-light">{currency?.name}</span>
      </div>
    </div>
  );
}

export function BridgeSelectCurrencyLabel({
  currency,
  className,
}: CurrencyElement) {
  return (
    <div className={cn("flex items-center gap-[.5rem]", className)}>
      <Image
        alt="token"
        src={currency?.image || "/images/swaple-image.png"}
        className="w-6 h-6"
        width={8}
        height={8}
      />
      <span className="uppercase">{currency?.ticker || ""}</span>
    </div>
  );
}
