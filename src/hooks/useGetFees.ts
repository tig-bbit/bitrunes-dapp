"use client";
import { useEffect, useState } from "react";
import { FeeEstimate } from "../lib/types";
import { BITCOIN_MEMPOOL_URL } from "../constants/config";

export function useGasFees() {
  const [fees, setFees] = useState<FeeEstimate | undefined>();
  const getFees = async () => {
    const response = await fetch(BITCOIN_MEMPOOL_URL);
    const data = await response.json();
    setFees(data);
  };

  useEffect(() => {
    getFees();
  }, []);

  return { fees, getFees };
}
