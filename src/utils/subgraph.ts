import GET_ALL_DEPOSIT_DATA from "@/schema/queries/getAllDepositData";
import Get_ALL_WITHDRAW_BY_USER from "@/schema/queries/getAllWithdrawByUser";
import GET_DISTRIBUTED_PRIZES from "@/schema/queries/getDistributedPrizes";
import { BatchPrize } from "@/schema/types/BatchPrize";
import Deposit from "@/schema/types/Deposit";
import Withdraw from "@/schema/types/Withdraw";
import { GraphQLClient } from "graphql-request";
 

export const getDepositData = async (skip: number) => {
  const client = getSubGraphClient();
  try {
    const response = (
      await client.request<{ joinRaffles: Deposit[] }>(GET_ALL_DEPOSIT_DATA, {
        skip: skip,
      })
    ).joinRaffles;
    return response;
  } catch (error) {
    console.error("Error fetching deposits:", error);
    return [];
  }
};

export const getWithdrawDataByUser = async (user: string, skip: number) => {
  const client = getSubGraphClient();
  try {
    const response = (
      await client.request<{ withdraws: Withdraw[] }>(Get_ALL_WITHDRAW_BY_USER, {
        user: String(user).toLowerCase(),
        skip: skip,
      })
    ).withdraws;
    return response;
  } catch (error) {
    console.error("Error fetching deposits:", error);
    return [];
  }
}

export const getDistributedPrizes = async (skip: number) => {
  const client = getSubGraphClient();
  try {
    const response = (
      await client.request<{ distributedPrizes: BatchPrize[] }>(GET_DISTRIBUTED_PRIZES, {
        skip: skip,
      })
    ).distributedPrizes;
    return response;
  } catch (error) {
    console.error("Error fetching deposits:", error);
    return [];
  }
}

export const getSubGraphClient = () => {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_SUBGRAPH_ENDPOINT ?? ``);
  return client;
};
