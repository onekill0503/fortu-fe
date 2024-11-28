import { baseSepolia } from "wagmi/chains";
import { BorderBeam } from "../ui/border-beam";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import NumberTicker from "../ui/number-ticker";
import { useEffect, useState } from "react";
import baseSepoliaContract from "@/constants/baseSepoliaContract";
import { useReadContract } from "wagmi";
import { formatEther } from "ethers";

const BatchInfo = () => {
  const [totalPrize, setTotalPrize] = useState(0);
  const [totalStackedBatch, setTotalStackedBatch] = useState(0);

  let TP = BigInt(0);
  let TSB = BigInt(0);

  const SC_TP = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "getPrizePool",
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

  const SC_TSB = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "batchTotalStacked",
    args: [SC_CB.data],
    chainId: baseSepolia.id,
  });

  TP = (SC_TP.data as bigint) ?? BigInt(0);
  TSB = (SC_TSB.data as bigint) ?? BigInt(0);

  useEffect(() => {

    setTotalPrize(Number(formatEther(TP)));
    setTotalStackedBatch(Number(formatEther(TSB)));

  }, [TP, TSB]);

  return (
    <div className="flex-[0.65] relative">
      <div className="swap__element relative">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <span className="block font-bold text-2xl">
                Total Asset Deposit in Batch #{(SC_CB.data as bigint).toString() ?? 0}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-start items-center">
              <img
                src="https://app.ethena.fi/shared/usde.svg"
                style={{ width: "75px", height: "75px" }}
                alt="usde"
              />
              <p className="ml-4 whitespace-pre-wrap text-6xl text-center font-medium tracking-tighter text-black dark:text-white">
                { totalStackedBatch > 0 ? (
                  <NumberTicker value={totalStackedBatch} />
                ) : (
                  <span className="mr-1">0.0</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
        <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
      </div>
      <div className="swap__element mt-5 relative">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <span className="block font-bold text-2xl">
                Total Prize in Batch #{(SC_CB.data as bigint).toString() ?? 0}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-start items-center">
              <img
                src="https://app.ethena.fi/shared/usde.svg"
                style={{ width: "75px", height: "75px" }}
                alt="usde"
              />
              <p className="ml-4 whitespace-pre-wrap text-6xl text-center font-medium tracking-tighter text-black dark:text-white">
                { totalPrize > 0 ? (
                  <NumberTicker value={totalPrize} />
                ) : (
                  <span className="mr-1">0.0</span>
                ) }
              </p>
            </div>
          </CardContent>
        </Card>
        <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
      </div>
    </div>
  );
};

export default BatchInfo;
