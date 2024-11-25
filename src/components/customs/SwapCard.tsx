import exp from "constants";
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
import { Badge } from "lucide-react";
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

const SwapCard = () => {
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

  return (
    <div className="swap__element flex-[0.3] relative">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Buy Tickets</CardTitle>
          <CardDescription>
            Buy Tickets by deposit your money into pool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="input__wrapper">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <img
                  src="https://etherscan.io/token/images/ethenausde_32.png"
                  style={{ width: "25px", height: "25px" }}
                  alt="usde"
                />
                <span className="ml-2">USDe</span>
              </div>
              <div className="flex items-center">
                <div className="inline-block pr-3 font-sans">
                  Balances : {toCurrency(usdeBalance)}
                </div>
                <div>
                  <Button
                    onClick={(e) => {
                      setBuyAmount(usdeBalance);
                      setTickets(
                        Math.trunc(Number(usdeBalance ?? 0) / ticketPrice)
                      );
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between items-center space-x-2">
              <Input
                type="number"
                value={buyAmount}
                placeholder="Amount"
                onChange={(e) => {
                  {
                    setTickets(
                      Math.trunc(Number(e.target.value ?? 0) / ticketPrice)
                    );
                    setBuyAmount(Number(e.target.value ?? 0));
                  }
                }}
              />
              <Select
                defaultValue="base"
                onValueChange={(e) => setFromChain(e)}
              >
                <SelectTrigger className="w-[65px]">
                  <SelectValue placeholder="" className="mr-1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="uni">
                      <img
                        src="https://unichain-sepolia.blockscout.com/assets/configs/network_icon.svg"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </SelectItem>
                    <SelectItem value="base">
                      <img
                        src="https://sepolia.basescan.org/assets/basesepolia/images/svg/logos/chain-light.svg?v=24.11.2.0"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-5 mx-auto w-full">
              <span className="font-semibold block text-center w-full text-2xl">
                Total Tickets
              </span>
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
            <span className="whitespace-pre-wrap text-center text-md font-semibold font-medium leading-none tracking-tight text-white dark:from-white dark:to-blue-600/10 lg:text-md">
              Buy
            </span>
          </ShimmerButton>
        </CardFooter>
      </Card>
      <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
    </div>
  );
};

export default SwapCard;
