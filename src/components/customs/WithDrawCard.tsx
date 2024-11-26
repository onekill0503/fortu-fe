'use client'

import { BorderBeam } from "../ui/border-beam";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import NumberTicker from "../ui/number-ticker";
import ShimmerButton from "../ui/shimmer-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import baseSepoliaContract from "@/constants/baseSepoliaContract";
import { baseSepolia } from "wagmi/chains";
import { useAccount, useReadContract } from "wagmi";
import { toCurrency } from "@/utils/currencies";
import { formatEther } from "ethers";
import ShinyButton from "../ui/shiny-button";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


const WithdrawCard = () => {
  const account = useAccount();
  const [tickets, setTickets] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [ticketPrice, setTicketsPrice] = useState(2);
  const [fromChain, setFromChain] = useState("base"); // base or uni
  const [usdeBalance, setUsdeBalance] = useState(0);

  let TP = BigInt(0);
  let USDE_BALANCE = BigInt(0);

  const SC_TP = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "TICKET_PRICE",
    args: [],
    chainId: baseSepolia.id,
  });
  const SC_USDE_BALANCE = useReadContract({
    address: baseSepoliaContract.USDE.address as `0x${string}`,
    abi: baseSepoliaContract.USDE.abi,
    functionName: "balanceOf",
    args: [account.address],
    chainId: baseSepolia.id,
  });

  TP = (SC_TP.data as bigint) ?? BigInt(0);
  USDE_BALANCE = (SC_USDE_BALANCE.data as bigint) ?? BigInt(0);
  useEffect(() => {
    setTicketsPrice(Number(formatEther(TP.toString())));
    setUsdeBalance(Number(formatEther(USDE_BALANCE.toString())));
    console.log(`TP: ${TP}, USDE_BALANCE: ${USDE_BALANCE}`);
  }, [buyAmount, TP, USDE_BALANCE]);


  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('ethena')

  const handleWithdraw = () => {
    // Implement withdraw logic here
    console.log(`Withdrawing ${amount} ${currency}`)
  }


  return (
    <div className="swap__element flex-[0.3] relative">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
            <CardDescription>Safely withdraw your funds from FortuPool</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Available Balance:</span>
                <span className="font-bold">500 USDe</span> {/*1000 Ethena / */ }
              </div>
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-medium">
                  Amount to Withdraw
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="currency" className="block text-sm font-medium">
                  Currency
                </label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sUSDe">sUSDe</SelectItem>
                    {/* <SelectItem value="ethena">Ethena</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <ShimmerButton className="shadow-2xl w-full" background="#6366f1">
            <span className="whitespace-pre-wrap text-center text-md font-semibold leading-none tracking-tight text-white dark:from-white dark:to-blue-600/10 lg:text-md">
              Withdraw
            </span>
          </ShimmerButton>
          </CardFooter>
        </Card>
        <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
    </div>
  );
};

export default WithdrawCard;
