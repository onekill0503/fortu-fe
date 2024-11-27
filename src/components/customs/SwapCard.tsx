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
import uniChainContract from "@/constants/UniChainContract";
import { baseSepolia } from "wagmi/chains";
import { useAccount, useReadContract } from "wagmi";
import { toCurrency } from "@/utils/currencies";
import { formatEther, parseEther } from "ethers";
import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { ArrowRight, ArrowUpRight, Ticket } from "@mynaui/icons-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useWriteContract, useSwitchChain } from "wagmi";
import unichain from "@/customChains/unichain";
import { getApprovalData, getLZArgs } from "@/utils";

const SwapCard = () => {
  const { switchChain } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();
  const { toast } = useToast();
  const account = useAccount();
  const [tickets, setTickets] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [ticketPrice, setTicketsPrice] = useState(2);
  const [userTicket, setUserTicket] = useState(0);
  const [fromChain, setFromChain] = useState("base"); // base or uni
  const [usdeBalance, setUsdeBalance] = useState(0);
  const [approveAmount, setApproveAmount] = useState(BigInt(0)); // Approve amount for USDe
  const [bridgeFee, setBridgeFee] = useState("0");
  const [rejoinBatch, setRejoinBatch] = useState(true);

  let TP = BigInt(0);
  let USDE_BALANCE = {
    base: BigInt(0),
    uni: BigInt(0),
  };
  let USDE_ALLOWANCE = {
    base: BigInt(0),
    uni: BigInt(0),
  };
  let USER_TICKET = Array<bigint>();
  let bridgeFeeAmount: { lzTokenFee: bigint; nativeFee: bigint } = {
    lzTokenFee: BigInt(0),
    nativeFee: BigInt(0),
  };
  let composedMessage: string = "0x";
  let activeFunds = Array<bigint>();
  let currentBatch = BigInt(0);

  const SC_AF = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "activeFunds",
    args: [account.address],
    chainId: baseSepolia.id,
  })  

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

  const SC_UT = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "batchPools",
    args: [SC_CB.data, account.address],
    chainId: baseSepolia.id,
  });

  const SC_USDE_BALANCE_BASE = useReadContract({
    address: baseSepoliaContract.USDE.address as `0x${string}`,
    abi: baseSepoliaContract.USDE.abi,
    functionName: "balanceOf",
    args: [account.address],
    chainId: baseSepolia.id,
  });

  const SC_USDE_ALLOWACE_BASE = useReadContract({
    address: baseSepoliaContract.USDE.address as `0x${string}`,
    abi: baseSepoliaContract.USDE.abi,
    functionName: "allowance",
    args: [
      account.address,
      baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    ],
    chainId: baseSepolia.id,
  });

  const SC_USDE_BALANCE_UNI = useReadContract({
    address: uniChainContract.USDE.address as `0x${string}`,
    abi: uniChainContract.USDE.abi,
    functionName: "balanceOf",
    args: [account.address],
    chainId: unichain.id,
  });

  const SC_USDE_ALLOWACE_UNI = useReadContract({
    address: uniChainContract.USDE.address as `0x${string}`,
    abi: uniChainContract.USDE.abi,
    functionName: "allowance",
    args: [
      account.address,
      uniChainContract.FORTU_ADAPTER.address as `0x${string}`,
    ],
    chainId: unichain.id,
  });
  const SC_BRIDGE_FEE_UNI = useReadContract({
    address: uniChainContract.FORTU_ADAPTER.address as `0x${string}`,
    abi: uniChainContract.FORTU_ADAPTER.abi,
    functionName: "quoteSend",
    args: [
      getLZArgs(
        parseEther(String(buyAmount)).toString(),
        account.address as string,
        "uni",
        composedMessage
      ),
      false,
    ],
    chainId: unichain.id,
  });
  const SC_COMPOSED_MESSAGE = useReadContract({
    address: baseSepoliaContract.FORTU_RECEIVER.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_RECEIVER.abi,
    functionName: "composeMessage",
    args: [account.address, parseEther(String(buyAmount))],
    chainId: baseSepolia.id,
  });

  activeFunds = (SC_AF.data as bigint[]) ?? BigInt(0);
  currentBatch = (SC_CB.data as bigint) ?? BigInt(0);

  TP = (SC_TP.data as bigint) ?? BigInt(0);
  USDE_BALANCE.base = (SC_USDE_BALANCE_BASE.data as bigint) ?? BigInt(0);
  USDE_ALLOWANCE.base = (SC_USDE_ALLOWACE_BASE.data as bigint) ?? BigInt(0);
  USDE_BALANCE.uni = (SC_USDE_BALANCE_UNI.data as bigint) ?? BigInt(0);
  USDE_ALLOWANCE.uni = (SC_USDE_ALLOWACE_UNI.data as bigint) ?? BigInt(0);
  USER_TICKET = (SC_UT.data as bigint[]) ?? BigInt(0);
  bridgeFeeAmount = (SC_BRIDGE_FEE_UNI.data as {
    lzTokenFee: bigint;
    nativeFee: bigint;
  }) ?? { lzTokenFee: BigInt(0), nativeFee: BigInt(0) };
  composedMessage = (SC_COMPOSED_MESSAGE.data as string) ?? "";
  useEffect(() => {

    const rejoinBatchCondition = 
        activeFunds[0] != currentBatch && activeFunds[1] > BigInt(0) ? true : false; 
    setRejoinBatch(rejoinBatchCondition);

    const userTicketCalc =
      USER_TICKET[1] > BigInt(0) ? Number(USER_TICKET[1] / TP) : 0;
    setTicketsPrice(Number(formatEther(TP.toString())));
    setUsdeBalance(
      Number(
        formatEther(
          USDE_BALANCE[fromChain as keyof typeof USDE_ALLOWANCE].toString()
        )
      )
    );
    setUserTicket(userTicketCalc);
    setApproveAmount(USDE_ALLOWANCE[fromChain as keyof typeof USDE_ALLOWANCE]);

    if (account.chainId === unichain.id) setFromChain("uni");
    if (account.chainId === baseSepolia.id) setFromChain("base");

  }, [buyAmount, TP, USDE_BALANCE, fromChain, account.chainId]);

  const handleRejoin = async () => {
    writeContractAsync({
      address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
      abi: baseSepoliaContract.FORTU_POOL.abi,
      functionName: "rejoinBacth (0x29c5ce08)",
      args: [activeFunds[0]],
    }).then(() => {
      toast({
        title: "Success Migration",
        description: "Your funds has been successfully migrated",
      })
    }).catch((err) => {
      toast({
        title: "Failed Migration",
        description: "Your funds failed to migrated",
      })
    })
  }

  const handleBuyTicket = async () => {
    const amountInWei = parseEther(buyAmount.toString());
    if (amountInWei <= BigInt(0)) {
      toast({
        title: `Please Enter Buy Amount`,
        description: "Buy amount must be greater than 0",
      });
      return;
    }
    switch (fromChain) {
      case "base":
        writeContractAsync({
          address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
          abi: baseSepoliaContract.FORTU_POOL.abi,
          functionName: "buyTicket",
          args: [amountInWei],
        })
          .then((tx) => {
            toast({
              title: `Transaction Created`,
              description: (
                <Link
                  href={`${unichain.blockExplorers.default.url}/tx/${tx}`}
                  target="_blank"
                >
                  {String(tx).substring(0, 15)} ... <ArrowUpRight className="inline-block" size={15} />
                </Link>
              ),
            });
          })
          .catch((err) => {
            toast({
              title: `Transaction Cancelled`,
              description: "Your transaction was cancelled",
            });
          });
        break;
      case "uni":
        writeContractAsync({
          address: uniChainContract.FORTU_ADAPTER.address as `0x${string}`,
          abi: uniChainContract.FORTU_ADAPTER.abi,
          functionName: "send",
          args: [
            getLZArgs(
              amountInWei.toString(),
              account.address as string,
              "uni",
              composedMessage
            ),
            [
              bridgeFeeAmount.nativeFee + BigInt(1e10),
              bridgeFeeAmount.lzTokenFee,
            ],
            account.address,
          ],
          value: bridgeFeeAmount.nativeFee + BigInt(1e10),
        })
          .then((tx) => {
            toast({
              title: `Transaction Created`,
              description: (
                <Link
                  href={`${unichain.blockExplorers.default.url}/tx/${tx}`}
                  target="_blank"
                >
                  {String(tx).substring(0, 15)} ... <ArrowUpRight className="inline-block" size={15} />
                </Link>
              ),
            });
          })
          .catch((err) => {
            toast({
              title: `Transaction Cancelled`,
              description: "Your transaction was cancelled",
            });
          });
        break;
    }
  };

  const handleApprove = async () => {
    const amountInWei = parseEther(buyAmount.toString());
    const contract = getApprovalData(fromChain);
    writeContractAsync({
      address: contract.contract as `0x${string}`,
      abi: contract.abi,
      functionName: "approve",
      args: [contract.spender as `0x${string}`, amountInWei],
    })
      .then((tx) => {
        setApproveAmount(amountInWei);
        toast({
          title: `Transaction Created`,
          description: (
            <Link
              href={`${unichain.blockExplorers.default.url}/tx/${tx}`}
              target="_blank"
            >
              {String(tx).substring(0, 15)} ... <ArrowUpRight className="inline-block" size={15} />
            </Link>
          ),
        });
      })
      .catch((err) => {
        toast({
          title: `Transaction Cancelled`,
          description: "Your transaction was cancelled",
        });
      });
  };

  const handleMaxButton = () => {
    setBuyAmount(usdeBalance);
    setTickets(Math.trunc(Number(usdeBalance ?? 0) / ticketPrice));
  };

  const handleSwitchChain = (target: string) => {
    switch (target) {
      case "base":
        switchChain({ chainId: baseSepolia.id });
        break;
      case "uni":
        switchChain({ chainId: unichain.id });
        break;
    }
  };
  
  return (
    <div className="swap__element flex-[0.3] relative">
      { !rejoinBatch && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Buy Tickets</div>
                <div className="text-sm flex items-center">
                  <div className="mr-2">Ticket Owned : {userTicket}</div>
                  <Ticket className="inline-block my-auto" size={15} />
                </div>
              </div>
            </CardTitle>
            <CardDescription>
              Buy Tickets by deposit your money into pool
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="input__wrapper">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <img
                    src="https://app.ethena.fi/shared/usde.svg"
                    style={{ width: "25px", height: "25px" }}
                    alt="usde"
                  />
                  <span className="ml-2">USDe</span>
                </div>
                <div className="flex items-center">
                  <Badge className="mr-2">{ticketPrice} USDe / Ticket</Badge>
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
                  value={fromChain}
                  onValueChange={(e: string) => {
                    setFromChain(e);
                    handleSwitchChain(e);
                  }}
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
              <div className="inline-block pr-3 font-sans ml-1 text-sm">
                Balance : {toCurrency(usdeBalance)}{" "}
                <span
                  className="text-blue-700 ml-2 cursor-pointer"
                  onClick={handleMaxButton}
                >
                  Max
                </span>
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
            {approveAmount < parseEther(buyAmount.toString()) ? (
              <ShimmerButton
                className="shadow-2xl w-full"
                background="#6366f1"
                onClick={handleApprove}
              >
                <span className="whitespace-pre-wrap text-center text-md font-semibold font-medium leading-none tracking-tight text-white dark:from-white dark:to-blue-600/10 lg:text-md">
                  Approve
                </span>
              </ShimmerButton>
            ) : (
              <ShimmerButton
                className="shadow-2xl w-full"
                background="#6366f1"
                onClick={handleBuyTicket}
              >
                <span className="whitespace-pre-wrap text-center text-md font-semibold font-medium leading-none tracking-tight text-white dark:from-white dark:to-blue-600/10 lg:text-md">
                  Buy
                </span>
              </ShimmerButton>
            )}
          </CardFooter>
        </Card>
      )}
      { rejoinBatch && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Migrate Funds</div>
                <div className="text-sm flex items-center">
                  <div className="mr-2">Ticket Owned : {userTicket}</div>
                  <Ticket className="inline-block my-auto" size={15} />
                </div>
              </div>
            </CardTitle>
            <CardDescription>
              Migrate your funds to follow the current batch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="input__wrapper">
              <div className="p-10 mx-auto w-full  flex flex-col items-center justify-center gap-4">
                <span className="font-semibold block text-center w-full text-2xl">
                  Last Batch Funds
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
              <ShimmerButton
                className="shadow-2xl w-full"
                background="#6366f1"
                onClick={handleRejoin}
              >
                <span className="whitespace-pre-wrap text-center text-md font-medium leading-none tracking-tight text-white dark:from-white dark:to-blue-600/10 lg:text-md">
                  Migrate
                </span>
              </ShimmerButton>
          </CardFooter>
        </Card>
      )}
      <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
    </div>
  );
};

export default SwapCard;
