import axios from "axios";
import {
  CHANGE_NOW_API_KEY,
} from "~/shared/config/change-now";
import { TCNCurrency } from "~/shared/types/types";

export const fetchCurrencyList = async () => {
  try {
    const response = await axios.get(
      "https://api.changenow.io/v2/exchange/currencies?flow=standard",
      {
        headers: {
          "x-changenow-api-key": CHANGE_NOW_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch currency info:", error);
    throw error;
  }
};

export const fetchMinimalExchange = async ({
  from,
  to,
}: {
  from: TCNCurrency;
  to: TCNCurrency;
}) => {
  try {
    const response = await axios.get(
      "https://api.changenow.io/v2/exchange/min-amount",
      {
        headers: {
          "x-changenow-api-key": CHANGE_NOW_API_KEY,
        },
        params: {
          fromCurrency: from?.ticker,
          fromNetwork: from?.network,
          toCurrency: to?.ticker,
          toNetwork: to?.network,
          flow: "standard",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch currency info:", error);
    throw error;
  }
};

export const fetchEstimateAmount = async ({
  from,
  to,
  fromAmount,
}: {
  from: TCNCurrency;
  to: TCNCurrency;
  fromAmount: number;
}) => {
  try {
    const response = await axios.get(
      "https://api.changenow.io/v2/exchange/estimated-amount",
      {
        headers: {
          "x-changenow-api-key": CHANGE_NOW_API_KEY,
        },
        params: {
          fromCurrency: from?.ticker,
          fromNetwork: from?.network,
          fromAmount: fromAmount,
          toCurrency: to?.ticker,
          toNetwork: to?.network,
          toAmount: "",
          flow: "standard",
          useRateId: "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch currency info:", error);
    throw error;
  }
};

export const createTransaction = async ({
  from,
  to,
  fromAmount,
  address,
}: {
  from: TCNCurrency;
  to: TCNCurrency;
  fromAmount: number;
  address: string;
}) => {
  try {
    const response = await axios.post("https://api.changenow.io/v2/exchange", {
      headers: {
        "x-changenow-api-key": CHANGE_NOW_API_KEY,
        "Content-Type": "application/json",
      },
      body: {
        fromCurrency: from?.ticker,
        fromNetwork: from?.network,
        fromAmount: fromAmount,
        toCurrency: to?.ticker,
        toNetwork: to?.network,
        flow: "standard",
        address,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch currency info:", error);
    throw error;
  }
};
