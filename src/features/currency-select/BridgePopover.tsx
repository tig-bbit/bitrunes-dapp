"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/shared/ui/common";

import { useEffect, useState } from "react";
import { cn } from "~/shared/lib/utils";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { TCNCurrency } from "~/shared/types/types";

interface CurrencyElement {
  currency: TCNCurrency;
  className?: string;
  key?: string;
  select?: boolean;
}

interface CurrencySelectProps {
  currencyList: TCNCurrency[];
  currency: TCNCurrency;
  setCurrency: (value: TCNCurrency) => void;
}

export function BridgeSelectCurrency({
  currency,
  currencyList,
  setCurrency,
}: CurrencySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cnList, setCNList] = useState<TCNCurrency[]>([]);

  const handleSelectItem = (item: TCNCurrency) => {
    setCurrency(item);
    setIsOpen(false);
  };

  useEffect(() => {
    setCNList(currencyList);
  }, [currencyList]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <BridgeSelectCurrencyLabel currency={currency} select={true} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col max-h-[15rem] overflow-y-scroll">
          {cnList?.length > 0 &&
            cnList
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
  select
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
      {select && <ChevronDown className="ml-1 w-4" />}
    </div>
  );
}
