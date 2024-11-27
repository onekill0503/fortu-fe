import HomeStyle from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { useEffect, useState } from 'react'
// import baseSepoliaContract from '../constants/baseSepoliaContract';
import { baseSepolia } from 'viem/chains'
import {
  Calendar,
  CalendarCheck,
  CheckSquare,
  Code,
  Command,
  DiceSix,
  Ticket,
  User
} from '@mynaui/icons-react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BorderBeam } from '@/components/ui/border-beam'
import Meteors from '@/components/ui/meteors'
import Ripple from '@/components/ui/ripple'
import ShimmerButton from '@/components/ui/shimmer-button'
import { Button } from '@/components/ui/button'
import NumberTicker from '@/components/ui/number-ticker'
import { Badge } from '@/components/ui/badge'
import { Monoton, Open_Sans } from 'next/font/google'
import Header from '@/components/header/header'
import moment from 'moment'
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
