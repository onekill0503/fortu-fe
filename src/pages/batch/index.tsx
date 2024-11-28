import HomeStyle from '../styles/Home.module.css'
import type { NextPage } from 'next'
import { useAccount} from 'wagmi'
import { useEffect, useState } from 'react'
import Ripple from '@/components/ui/ripple'
import { Open_Sans } from 'next/font/google'
import Header from '@/components/header/header'
import { BatchPrize } from '@/schema/types/BatchPrize'
import BatchListItem from '@/components/customs/BatchListItem'
import { getDistributedPrizes } from '@/utils/subgraph'

const OSFont = Open_Sans({
  weight: ['400', '500', '700', '800', '300'],
  style: 'normal',
  subsets: ['latin']
})

const Home: NextPage = () => {
  const account = useAccount()
  const [batchPrize, setBatchPrize] = useState<BatchPrize[]>([])

  const updateBatchPrize = () => {
    getDistributedPrizes(0)
      .then((data) => {
        setBatchPrize(data)
      })
      .finally(() => {
        setTimeout(() => updateBatchPrize(), 5000)
      })
  }
  useEffect(() => {
    getDistributedPrizes(0).then((data) => {
      console.log(data)
      setBatchPrize(data)
    })
  }, [''])

  return (
    <div className={OSFont.className}>
      <Header />
      <div className="min-h-screen flex justify-between mx-5">
        <div className="w-full col-span-2 z-10 flex justify-between items-center flex-wrap flex-row">
          {batchPrize.map((item, index) => BatchListItem(item))}
        </div>
      </div>
      <Ripple />
    </div>
  )
}

export default Home
