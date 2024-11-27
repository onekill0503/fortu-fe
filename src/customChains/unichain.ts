import { Chain } from "@rainbow-me/rainbowkit";
const unichain = {
  id: 1_301,
  name: "Unichain Testnet",
  iconUrl: "https://unichain-sepolia.blockscout.com/assets/configs/network_icon.svg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia.unichain.org"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://unichain-sepolia.blockscout.com" },
  }
} as const satisfies Chain;

export default unichain;