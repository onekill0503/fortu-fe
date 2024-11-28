import HomeStyle from "../styles/Home.module.css";
import type { NextPage } from 'next';
import { useAccount, useWriteContract } from 'wagmi';
import { useEffect } from 'react';
import Ripple from '@/components/ui/ripple';
import WithdrawCard from "@/components/customs/WithDrawCard";
import Header from "@/components/header/header";
import TableWithdrawCard from "@/components/customs/TableWithdrawCard";
import { Open_Sans } from "next/font/google";

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
