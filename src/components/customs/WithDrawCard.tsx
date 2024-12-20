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
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { toCurrency } from "@/utils/currencies";
import { formatEther, parseEther } from "ethers";
import ShinyButton from "../ui/shiny-button";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast";
import { ArrowUpRight } from "@mynaui/icons-react";
import Link from "next/link";


const WithdrawCard = () => {
  const { toast } = useToast();
  const account = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [buyAmount, setBuyAmount] = useState(0);
  const [usdeBalance, setUsdeBalance] = useState(0);
  const [withdrawOut, setWithdrawOut] = useState(0);
  const [amount, setAmount] = useState(0)

  let TP = BigInt(0);
  let USDE_BALANCE = BigInt(0);
  let WITHDRAW_OUTPUT = BigInt(0);

  const SC_TP = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "TICKET_PRICE",
    args: [],
    chainId: baseSepolia.id,
  });
  const SC_CB = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "currentBatch",
    args: [],
    chainId: baseSepolia.id,
  });
  const SC_CURRENT_BATCH = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "currentBatch",
    args: [],
    chainId: baseSepolia.id,
  });

  const SC_USDE_BALANCE = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "batchPools",
    args: [SC_CURRENT_BATCH.data ,account.address],
    chainId: baseSepolia.id,
  });

  const SC_PREVIEW_WITHDRAW = useReadContract({
    address: baseSepoliaContract.SUSDE.address as `0x${string}`,
    abi: baseSepoliaContract.SUSDE.abi,
    functionName: "convertToShares",
    args: [parseEther(String(amount))],
    chainId: baseSepolia.id,
  });

  TP = (SC_TP.data as bigint) ?? BigInt(0);
  USDE_BALANCE = !SC_USDE_BALANCE.data ? BigInt(0) : (SC_USDE_BALANCE.data as [bigint, bigint])[1];
  WITHDRAW_OUTPUT = SC_PREVIEW_WITHDRAW.data as bigint ?? BigInt(0);

  useEffect(() => {
    setUsdeBalance(Number(formatEther(USDE_BALANCE.toString())));
    setWithdrawOut(Number(formatEther(WITHDRAW_OUTPUT.toString())));
  }, [buyAmount, TP, USDE_BALANCE, SC_PREVIEW_WITHDRAW]);

  const handleWithdraw = () => {
    writeContractAsync({
      address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
      abi: baseSepoliaContract.FORTU_POOL.abi,
      functionName: "withdraw",
      args: [parseEther(String(amount)) , SC_CB.data],
      chainId: baseSepolia.id,
    }).then((tx: string) => {
      setAmount(0);
      toast({
        title: `Withdrawal Successful`,
        description: (
          <Link
            href={`${baseSepolia.blockExplorers.default.url}/tx/${tx}`}
            target="_blank"
          >
            {String(tx).substring(0, 15)} ... <ArrowUpRight className="inline-block" size={15} />
          </Link>
        ),
      });
    }).catch((error: any) => {
      toast({
        title: `Withdrawal Failed`,
        description: `Your withdrawal failed. Error: ${error.message}`,
      });
    });
  }

  const handleChangeAmount = (value: string) => {
    if(Number(value) > usdeBalance) {
      toast({
        title: `Insufficient balance`,
        description: `Your input amount is greater than your available balance`,
      });
      return;
    };
    setAmount(Number(value))
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
                <span className="font-bold">{usdeBalance} USDe</span> {/*1000 Ethena / */ }
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
                  min={0}
                  onChange={(e) => { handleChangeAmount(e.target.value) }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs">Output : {withdrawOut.toFixed(4)} sUSDe</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <ShimmerButton className="shadow-2xl w-full" background="#6366f1" onClick={handleWithdraw}>
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
