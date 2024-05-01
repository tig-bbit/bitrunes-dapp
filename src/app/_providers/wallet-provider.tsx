"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { WagmiProvider } from "wagmi";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { mainnet } from "viem/chains";

type WalletContextType = {
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
};

const Context = createContext<WalletContextType | null>(null);

const projectId = "68243e44c82c5843107aec303f5db2d3";

export const useConnect = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useConnect must be used within a WalletProvider");
  }
  return context;
};

const wagmiConfig = getDefaultConfig({
  appName: "Bitrune Dapp",
  projectId: projectId,
  chains: [mainnet],
  ssr: true,
});

const theme = darkTheme();

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider theme={theme}>
        <Context.Provider value={{ walletAddress, setWalletAddress }}>
          {children}
        </Context.Provider>
      </RainbowKitProvider>
    </WagmiProvider>
  );
};
