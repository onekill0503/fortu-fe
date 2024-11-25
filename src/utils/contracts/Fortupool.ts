import baseSepoliaContract from "@/constants/baseSepoliaContract";
import { useReadContract } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const getTicketPrice = async (): Promise<bigint> => {
  const TP = useReadContract({
    address: baseSepoliaContract.FORTU_POOL.address as `0x${string}`,
    abi: baseSepoliaContract.FORTU_POOL.abi,
    functionName: "TICKET_PRICE",
    args: [],
    chainId: baseSepolia.id,
  });

  return TP.data as bigint ?? BigInt(0);
};