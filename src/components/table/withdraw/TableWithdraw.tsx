import { columns } from './columns'
import { DataTable } from './DataTable'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { gql } from 'graphql-request'
import Withdraw from '@/schema/types/Withdraw'
import { getWithdrawDataByUser } from '@/utils/subgraph'

export default function TableWithdraw() {
  const [hasMounted, setHasMounted] = useState(false)
  const { address } = useAccount()
  const [withdrawData, setWithdrawData] = useState<Withdraw[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const updateWithdrawTable = async () => {
    getWithdrawDataByUser(address as string, 0)
      .then((data) => {
        setWithdrawData(data)
        setIsLoading(false)
      })
      .finally(() => {
        setTimeout(() => updateWithdrawTable(), 5000)
      })
  }

  useEffect(() => {
    setHasMounted(true)
    updateWithdrawTable()
  }, [address])

  if (!hasMounted) {
    return null
  }

  const handleRefresh = async () => {
    getWithdrawDataByUser(address as string, 0).then((data) => {
      setWithdrawData(data)
    })
  }

  return (
    <div className="w-full h-auto z-10">
      <DataTable
        data={withdrawData}
        columns={columns()}
        handleRefresh={handleRefresh}
        isLoading={isLoading}
      />
    </div>
  )
}
