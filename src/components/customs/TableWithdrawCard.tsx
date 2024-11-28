'use client'

import { BorderBeam } from "../ui/border-beam";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import TableWithdraw from "../table/withdraw/TableWithdraw";

const TableWithdrawCard = () => {

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
