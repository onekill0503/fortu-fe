import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  baseSepolia
} from 'wagmi/chains';
import ethena from './customChains/ethena';

export const config = getDefaultConfig({
  appName: 'Fortupool',
  projectId: 'YOUR_PROJECT_ID',
  chains: [baseSepolia],
  ssr: true,
});