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
import SwapCard from "@/components/customs/SwapCard";
import WithdrawCard from "@/components/customs/WithDrawCard";
import BatchInfo from "@/components/customs/BatchInfo";
import Header from "@/components/header/header";
import TableWithdrawCard from "@/components/customs/TableWithdrawCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
      <Header/>
      <div className="grid grid-cols-3 min-h-screen items-start justify-items-center p-8 gap-16 overflow-hidden">
        <div className="z-10 mt-32">
          <WithdrawCard/>
        </div>
        <div className="w-full col-span-2 z-10 mt-32">
          <TableWithdrawCard/>
        </div>
      </div>
      <Ripple/>
    </div>
  );
};

export default Home;
