'use client'
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider, createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import '@mysten/dapp-kit/dist/index.css';
import { registerZkSendWallet } from "@mysten/zksend";
registerZkSendWallet("Reise", {
  origin: "https://zksend.com" || "http://localhost:3000"
});
// Create a new QueryClient instance
const queryClient = new QueryClient();
// Create network configuration
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

// Create a custom provider component
const DappKitProvider = ({ children } : { children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
        <WalletProvider 
          zkSend={{
            name: "Reise",
          }}
        >
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default DappKitProvider;
