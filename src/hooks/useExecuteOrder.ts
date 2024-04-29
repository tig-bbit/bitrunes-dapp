"use client";

import { BITCOIN_NODE_URL } from "~/constants/config";
import toast from "react-hot-toast";
import { ExecuteOrderResponse } from "~/lib/types";
import { useState } from "react";

export function useExecuteOrder() {
  const [executeOrderResponse, setExecuteOrderResponse] = useState<string>();
  const executeOrder = async ({
    orderId,
    fundTransactionId,
  }: ExecuteOrderResponse) => {
    if (!orderId || !fundTransactionId) {
      toast.error("Please provide order ID and fund transaction ID");
      return;
    }
    const response = await fetch(
      `${BITCOIN_NODE_URL}/runes/etch/orders/${orderId}/execute`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fundTransactionId }),
      }
    );
    const data = await response.json();
    console.log(data, response);
    if (response.ok) {
      toast.success("Order executed successfully");
      setExecuteOrderResponse(
        `https://mempool.space/testnet/tx/${fundTransactionId}`
      );
    } else {
      toast.error(data.message);
    }
  };

  return {
    executeOrder,
    executeOrderResponse,
  };
}
