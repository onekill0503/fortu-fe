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

import TableWithdraw from "../table/withdraw/TableWithdraw";
import Withdraw from "@/schema/types/Withdraw";

const TableWithdrawCard = () => {
  const account = useAccount();

  useEffect(() => {
  }, []);


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
            <CardTitle>Withdraw History</CardTitle>
          </CardHeader>
          <CardContent>
            <TableWithdraw/>
          </CardContent>
        </Card>
        <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
    </div>
  );
};

export default TableWithdrawCard;
