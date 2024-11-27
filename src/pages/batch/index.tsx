import HomeStyle from "../styles/Home.module.css"; 
import { ConnectButton  } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
// import baseSepoliaContract from '../constants/baseSepoliaContract';
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
import Header from "@/components/header/header";

const OSFont = Open_Sans({ weight: ['400','500','700','800','300'], style: 'normal', subsets: ['latin'] });

const Home: NextPage = () => {
  const account = useAccount();
  const {
    data: hash,
    isPending,
    writeContract
  } = useWriteContract();
  const [tickets, setTickets] = useState(0);


  useEffect(() => {
    // if(account.address == undefined) return;
  } , [""])
  
  return (
    <div className={OSFont.className}>
      <Header/>
      <div className="grid grid-cols-3 min-h-screen items-start justify-items-center p-8 gap-16 overflow-hidden">
        <div className="z-10 mt-36">
            <div className="swap__element flex-[0.3] relative">
                <Card className="w-full">
                <CardHeader>
                    <CardTitle>Total Tickets</CardTitle>
                    <CardDescription>use your ticket to join the batch</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="input_wrapper">
                        <div className="mx-auto w-full">
                        <p className="whitespace-pre-wrap text-6xl text-center font-medium tracking-tighter text-black dark:text-white">
                            {tickets ? (
                            <NumberTicker value={tickets} />
                            ) : (
                            <span className="mr-1">0</span>
                            )}
                        </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <ShimmerButton className="shadow-2xl w-full" background="#6366f1">
                    <span className="whitespace-pre-wrap text-center text-md font-semibold leading-none tracking-tight text-white dark:from-white dark:to-blue-600/10 lg:text-md">
                        Join / Rejoin
                    </span>
                </ShimmerButton>
                </CardFooter>
                </Card>
                <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
            </div>
        </div>
        <div className="w-full col-span-2 z-10 mt-36">
            <div className="swap__element flex-[0.3] relative">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Batch Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Informasi Batch</p>
                    </CardContent>
                </Card>
                <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
            </div>
        </div>
      </div>
      <Ripple/>
    </div>
  );
};

export default Home;
