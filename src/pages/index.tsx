import HomeStyle from "../styles/Home.module.css"; 
import { ConnectButton  } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import baseSepoliaContract from '../constants/baseSepoliaContract';
import { baseSepolia } from 'viem/chains';
import { Command } from '@mynaui/icons-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input"
import { BorderBeam } from '@/components/ui/border-beam';
import Meteors from '@/components/ui/meteors';
import Ripple from '@/components/ui/ripple';
import ShimmerButton from '@/components/ui/shimmer-button';
import { Button } from '@/components/ui/button';
import NumberTicker from '@/components/ui/number-ticker';
import { Badge } from '@/components/ui/badge';
import { Monoton, Open_Sans } from 'next/font/google'
import SwapCard from "@/components/customs/SwapCard";
import BatchInfo from "@/components/customs/BatchInfo";
import Header from "@/components/header/header";
import TypingAnimation from "@/components/ui/typing-animation";
import BoxReveal from "@/components/ui/box-reveal";

const monotonFont = Monoton({ weight: ['400'], style: 'normal', subsets: ['latin'] });
const OSFont = Open_Sans({ weight: ['400','500','700','800','300'], style: 'normal', subsets: ['latin'] });

const Home: NextPage = () => {
  const {address : userAddress, isConnected} = useAccount();
  const {
    data: hash,
    isPending,
    writeContract
  } = useWriteContract();


  useEffect(() => {
    // if(account.address == undefined) return;
  } , [""])
  
  return (
    <div className={OSFont.className}>
      <Head>
        <title>Fortupool</title>
        <meta
          content="Fortupool"
          name="A decentralized no-loss lottery platform where users can deposit funds, participate in weekly prize draws, and potentially win rewards without risking their principal. The platform leverages Chainlink VRF for secure random number generation and LayerZero for cross-chain deposits."
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header/>
      {isConnected && (
        <div className="grid grid-cols-3 min-h-screen items-center justify-items-center p-8 gap-16">
          <div className="z-10">
            <SwapCard/>
          </div>
          <div className="span-col-2">
            <BatchInfo/>
          </div>
        </div>
      )}
      {!isConnected && (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-6 bg-slate-100 relative p-20">
          <TypingAnimation
              className="text-7xl font-extrabold text-left text-neutral-800 dark:text-white"
              text="FortuPool"
          />
          <div className="w-[70%] flex items-center justify-center">
            <BoxReveal boxColor={"#000000"} duration={0.5}>
              <p className="text-xl font-medium text-center">A decentralized no-loss lottery platform where users can deposit funds, participate in weekly prize draws, and potentially win rewards without risking their principal. The platform leverages Chainlink VRF for secure random number generation and LayerZero for cross-chain deposits.</p>
            </BoxReveal>
          </div>
          <Ripple/>
        </div>
      )}
    </div>
  );
};

export default Home;
