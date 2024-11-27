import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  baseSepolia
} from 'wagmi/chains';
import unichain from './customChains/unichain';

export const config = getDefaultConfig({
  appName: 'Fortupool',
  projectId: 'YOUR_PROJECT_ID',
  chains: [baseSepolia, unichain],
  ssr: true,
});