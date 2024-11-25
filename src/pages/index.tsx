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

const monotonFont = Monoton({ weight: ['400'], style: 'normal', subsets: ['latin'] });
const OSFont = Open_Sans({ weight: ['400','500','700','800','300'], style: 'normal', subsets: ['latin'] });

const Home: NextPage = () => {
  const account = useAccount();
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

      <header className='py-5 shadow-md w-screen border-b-2'>
          <div className="header-wrapper flex justify-between items-center container mx-auto">
            <div className="logo flex items-center">
              <Command color='#818cf8' size={35} /> <h1 className={`${monotonFont.className} pl-1 font-bold text-2xl font-sans text-slate-700`}>FORTUPOOL</h1>
            </div>
            <div className="menus bg-slate-100 px-3 py-2 rounded-md">
              <nav>
                <ul className="flex space-x-6">
                  <li className='px-5 py-1 font-semibold hover:bg-white rounded-md text-lg duration-100'><Link href="/" className="hover:text-gray-800 text-gray-700">Deposit</Link></li>
                  <li className='px-5 py-1 font-semibold hover:bg-white rounded-md text-lg duration-100'><Link href="/docs" className="hover:text-gray-800 text-gray-700">Withdraw</Link></li>
                  <li className='px-5 py-1 font-semibold hover:bg-white rounded-md text-lg duration-100'><Link href="/docs" className="hover:text-gray-800 text-gray-700">Batch</Link></li>
                </ul>
              </nav>
            </div>
            <div>
              <ConnectButton />
            </div>
          </div>
        </header>

      <main className='w-screen h-screen bg-slate-100 pt-20 relative'>
        <div className="container mx-auto flex items-center justify-between relative z-10 relative">
          <SwapCard />
          <BatchInfo />
        </div>
        <Ripple />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
