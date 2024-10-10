import { createConfig, http, WagmiProvider } from "wagmi";
import { rootstock, rootstockTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";


const rootstockMainnetConfig = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [rootstock],
    transports: {
      [rootstock.id]: http(import.meta.env.VITE_MAINNET_URL as string),
    },

    // Required API Keys
    walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_ID as string,

    // Required App Info
    appName: "EAS",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const rootstockTestnetConfig = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [rootstockTestnet],
    transports: {
      [rootstockTestnet.id]: http(import.meta.env.VITE_TESTNET_URL as string),
    },

    // Required API Keys
    walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_ID as string,

    // Required App Info
    appName: "EAS",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const config = (() => {
  switch (Number(import.meta.env.VITE_CHAIN_ID)) {
    case rootstock.id:
      return rootstockMainnetConfig;
    case rootstockTestnet.id:
      return rootstockTestnetConfig;
    default:
      console.log("Invalid chain ID. Returning Default configuration");
      return rootstockTestnetConfig;
  }
})();

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
