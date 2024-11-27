import unichain from "@/customChains/unichain";
import UniChainContract from "@/constants/UniChainContract";
import baseSepoliaContract from "@/constants/baseSepoliaContract";
import { baseSepolia } from "wagmi/chains";
import { hexZeroPadTo32 } from "@layerzerolabs/lz-v2-utilities";
import { solidityPackedKeccak256 } from "ethers";

export const getApprovalData = (
  chain: string
): {
  contract: string;
  abi: any;
  spender: string;
} => {
  switch (chain) {
    case "uni":
      return {
        contract: UniChainContract.USDE.address,
        abi: UniChainContract.USDE.abi,
        spender: UniChainContract.FORTU_ADAPTER.address,
      };
    case "base":
      return {
        contract: baseSepoliaContract.USDE.address,
        abi: baseSepoliaContract.USDE.abi,
        spender: baseSepoliaContract.FORTU_POOL.address,
      };
    default:
      return {
        contract: baseSepoliaContract.USDE.address,
        abi: baseSepoliaContract.USDE.abi,
        spender: baseSepoliaContract.FORTU_POOL.address,
      };
  }
};

export const getBuyData = (
  chain: string
): {
  contract: string;
  abi: any;
  function: string;
} => {
  switch (chain) {
    case "uni":
      return {
        contract: UniChainContract.FORTU_ADAPTER.address,
        abi: UniChainContract.FORTU_ADAPTER.abi,
        function: "send",
      };
    case "base":
      return {
        contract: baseSepoliaContract.FORTU_POOL.address,
        abi: baseSepoliaContract.FORTU_POOL.abi,
        function: "buyTicket",
      };
    default:
      return {
        contract: baseSepoliaContract.USDE.address,
        abi: baseSepoliaContract.USDE.abi,
        function: "buyTicket",
      };
  }
};

export const getLZArgs = (amount: string, address: string, chain: string, compose: string) => {
  if (address === undefined) return [];
  console.log(solidityPackedKeccak256(["address", "uint256"], [address, amount]))
  switch (chain) {
    case "uni":
      return [
          40_245,
          hexZeroPadTo32(baseSepoliaContract.FORTU_RECEIVER.address),
          amount,
          amount,
          `0x0003010011010000000000000000000000000016e3600100130300000000000000000000000000000016e360`,
          compose,
          `0x`
        ]
    default:
      return [];
  }
};
