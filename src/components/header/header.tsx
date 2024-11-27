import Link from "next/link"
import { Command } from '@mynaui/icons-react';
import { Monoton, Open_Sans } from 'next/font/google'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const monotonFont = Monoton({ weight: ['400'], style: 'normal', subsets: ['latin'] });

const Header = () => {
    const { address: userAddress, isConnected} = useAccount();
    
    return (
        <header className='p-5 shadow-md w-full fixed z-50 border-b-2 bg-white'>
          <div className="header-wrapper flex justify-between items-center container mx-auto">
            <div className="logo flex items-center">
              <Command color='#818cf8' size={35} /> <h1 className={`${monotonFont.className} pl-1 font-bold text-2xl font-sans text-slate-700`}>FORTUPOOL</h1>
            </div>
            {isConnected && (
              <div className="menus bg-slate-100 px-3 py-2 rounded-md">
                <nav>
                  <ul className="flex space-x-6">
                    <li className='px-5 py-1 font-semibold hover:bg-white rounded-md text-lg duration-100'><Link href="/" className="hover:text-gray-800 text-gray-700">Deposit</Link></li>
                    <li className='px-5 py-1 font-semibold hover:bg-white rounded-md text-lg duration-100'><Link href="/withdraw" className="hover:text-gray-800 text-gray-700">Withdraw</Link></li>
                    <li className='px-5 py-1 font-semibold hover:bg-white rounded-md text-lg duration-100'><Link href="/batch" className="hover:text-gray-800 text-gray-700">Batch</Link></li>
                  </ul>
                </nav>
              </div>
            )}
            <div>
              <ConnectButton />
            </div>
          </div>
        </header>
    )
}

export default Header;
