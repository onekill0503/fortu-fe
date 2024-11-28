import { gql } from 'graphql-request'

const GET_DISTRIBUTED_PRIZES = gql`
  query getDistributedPrizes($skip: Int) {
    distributedPrizes(skip: $skip, first: 10, orderBy: block, orderDirection: desc) {
      batch
      block
      timestamp_
      transactionHash_
      winner
      amount
      luckyNumber
      totalTickets
    }
  }
`

export default GET_DISTRIBUTED_PRIZES
