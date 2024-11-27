import { BatchPrize } from '@/schema/types/BatchPrize'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { CalendarCheck, CheckSquare, Code, DiceSix, Ticket, User } from '@mynaui/icons-react'
import { baseSepolia } from 'wagmi/chains'
import moment from 'moment'
import { BorderBeam } from '../ui/border-beam'
import { formatEther } from 'ethers'

const BatchListItem = (item: BatchPrize) => {
  return (
    <div className="swap__element basis-1/3 relative px-3" key={item.timestamp_}>
      <div className="w-full h-full relative">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Details Batch #{item.batch}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm flex flex-col gap-2">
            <div className="flex justify-between items-center mx-5">
              <span className="font-semibold">Block</span>
              <Link href="/block/1" className="flex items-center text-blue-500" target="_blank">
                <span className="inline-block">{item.block}</span>
                <CheckSquare className="inline-block ml-2" size={20} />{' '}
              </Link>
            </div>

            <div className="flex justify-between items-center mx-5">
              <span className="font-semibold">Lucky Number</span>
              <span className="flex items-center">
                <span className="inline-block">{ item.luckyNumber ?? '-' }</span>
                <DiceSix className="inline-block ml-2" size={20} />{' '}
              </span>
            </div>

            <div className="flex justify-between items-center mx-5">
              <span className="font-semibold">Hash</span>
              <Link
                href={`${baseSepolia.blockExplorers.default.url}/tx/${item.transactionHash_}`}
                className="flex items-center text-blue-500"
              >
                <span className="inline-block">
                  {String(item.transactionHash_).substring(0, 10)} ...
                </span>
                <Code className="inline-block ml-2" size={20} />{' '}
              </Link>
            </div>

            <div className="flex justify-between items-center mx-5">
              <span className="font-semibold">Date</span>
              <span className="flex items-center">
                <span className="inline-block">
                  {moment.unix(Number(item.timestamp_)).format('MMMM Do YYYY, h:mm:ss a')}
                </span>
                <CalendarCheck className="inline-block ml-2" size={20} />{' '}
              </span>
            </div>

            <div className="flex justify-between items-center mx-5">
              <span className="font-semibold">Total Tickets</span>
              <span className="flex items-center">
                <span className="inline-block">{item.totalTickets ?? '-'}</span>
                <Ticket className="inline-block ml-2" size={20} />{' '}
              </span>
            </div>

            <div className="flex justify-between items-center mx-5">
              <span className="font-semibold">Winner</span>
              <Link
                href={`${baseSepolia.blockExplorers.default.url}/address/${item.winner}`}
                className="flex items-center text-blue-500"
              >
                <span className="inline-block">{String(item.winner).substring(0, 10)} ...</span>
                <User className="inline-block ml-2" size={20} />{' '}
              </Link>
            </div>

            <div className="flex justify-between items-center mx-5">
              <span className="font-semibold">Prizes</span>
              <span className="flex items-center">
                <span className="inline-block">{Number(formatEther(item.amount)).toFixed(6)}</span>
                <img
                  src="https://app.ethena.fi/shared/usde.svg"
                  style={{ width: '20px', height: '20px' }}
                  alt="usde"
                  className="inline-block ml-2"
                />
              </span>
            </div>
          </CardContent>
        </Card>
        <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
      </div>
    </div>
  )
}
export default BatchListItem
