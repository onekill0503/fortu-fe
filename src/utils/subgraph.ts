import GET_ALL_DEPOSIT_DATA from "@/schema/queries/getAllDepositData";
import Deposit from "@/schema/types/Deposit";
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

export const getSubGraphClient = () => {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_SUBGRAPH_ENDPOINT ?? ``);
  return client;
};
