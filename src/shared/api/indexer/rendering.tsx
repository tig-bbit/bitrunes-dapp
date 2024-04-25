"use client";

import React, { useState, useEffect, PropsWithChildren} from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  DehydratedState,
} from "@tanstack/react-query";
import { createClient } from "./createClient";

interface IndexerHydrationBoundaryProps extends PropsWithChildren{
  prefetchCallback: (client: QueryClient) => Promise<void>;
}

export function IndexerHydrationBoundary({
  children,
  prefetchCallback,
}: IndexerHydrationBoundaryProps) {
  const [client] = useState(createClient());
  const [hydrationState, setHydrationState] = useState<DehydratedState | undefined>(undefined);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      await prefetchCallback(client);
      if (isActive) {
        setHydrationState(dehydrate(client));
      }
    };
    fetchData();
    return () => {
      isActive = false; 
    };
  }, [prefetchCallback, client]);

  if (!hydrationState) {
    return <div>Loading...</div>; 
  }

  return (
    <HydrationBoundary state={hydrationState}>{children}</HydrationBoundary>
  );
}