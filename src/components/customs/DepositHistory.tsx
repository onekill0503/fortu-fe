import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  TableBody,
  TableCaption,
  TableCell,
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import Deposit from "@/schema/types/Deposit";
import { getDepositData } from "@/utils/subgraph";
import { formatEther } from "viem";
import moment from "moment";
import { Click, User } from "@mynaui/icons-react";
import Link from "next/link";
import { baseSepolia } from "viem/chains";

const DepositHistory = () => {
  const [depositData, setDepositData] = useState<Deposit[]>([]);

  useEffect(() => {
    getDepositData(0).then((data) => {
      setDepositData(data);
    });
  }, [""]);
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <span className="block font-bold text-2xl">Deposit History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all user deposits.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">From</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {depositData.length > 0 ? (
                depositData.map((deposit: Deposit) => (
                  <TableRow key={deposit.timestamp_}>
                    
                    <TableCell className="text-blue-600 text-left">
                      <Link href={`${baseSepolia.blockExplorers.default.url}/address/${deposit.wallet}`} target="_blank" className="flex items-center">
                        {String(deposit.wallet).substring(0, 25)}... <User className="inline-block ml-1" size={20} />
                      </Link>
                    </TableCell>
                    <TableCell>
                      {moment
                        .unix(Number(deposit.timestamp_))
                        .format("MMMM Do YYYY, h:mm:ss a")}
                    </TableCell>
                    <TableCell className="flex items-center">
                      <img
                        src="https://app.ethena.fi/shared/usde.svg"
                        style={{ width: "20px", height: "20px" }}
                        alt="usde"
                        className="inline-block mr-2"
                      />
                      {formatEther(BigInt(deposit.amount))}
                    </TableCell>
                    <TableCell className="text-blue-600 text-right">
                      <Link href={`${baseSepolia.blockExplorers.default.url}/tx/${deposit.transactionHash_}`} target="_blank">
                        {String(deposit.transactionHash_).substring(0, 30)}... <Click className="inline-block ml-1" size={20} />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No deposit history</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositHistory;
