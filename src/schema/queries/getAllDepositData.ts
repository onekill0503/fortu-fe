import { gql } from "graphql-request";
const GET_ALL_DEPOSIT_DATA = gql`
  query getDepositData($skip: Int!) {
    joinRaffles(
      where: {}
      skip: $skip
      orderDirection: desc
      orderBy: block
      first: 10
    ) {
      wallet
      amount
      block
      batch
      timestamp_
      transactionHash_
    }
  }
`;

export default GET_ALL_DEPOSIT_DATA;
