import { Chain } from "@rainbow-me/rainbowkit";
const ethena = {
  id: 52_085_143,
  name: "Ethena Testnet",
  iconUrl: "https://ethena.fi/shared/ethena.svg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.rpc.ethena.fi"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://testnet.explorer.ethena.fi" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;

export default ethena;