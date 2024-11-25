import baseSepoliaContract from "@/constants/baseSepoliaContract";
import { baseSepolia } from "viem/chains";
import { useReadContract } from "wagmi";

export const getBalancesOf = async (address: `0x${string}`): Promise<BigInt> => {
  const SC = useReadContract({
    address: baseSepoliaContract.USDE.address as `0x${string}`,
    abi: baseSepoliaContract.USDE.abi,
    functionName: "balancesOf",
    args: [address],
    chainId: baseSepolia.id,
  });

  return SC.data as bigint ?? BigInt(0);
};