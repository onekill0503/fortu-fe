import { gql } from "graphql-request";

const Get_ALL_WITHDRAW_BY_USER = gql`
query getWithdrawData($user: String, $skip: Int){
  withdraws(where: { wallet: $user }, skip: $skip, orderBy: block, orderDirection: desc, first: 10) {
    wallet
    amount
    block
    batch
    timestamp_
    transactionHash_
  }
}
`;

export default Get_ALL_WITHDRAW_BY_USER;