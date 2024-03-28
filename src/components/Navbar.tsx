'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ButtonIcon, ReloadIcon } from "@radix-ui/react-icons"
import { Wallet } from './ui/Wallet'
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit'
const Navbar = () => {
  const wallet = useCurrentWallet();

  return (
    <nav className=' relative h-14 w-full bg-white z-30'>
      <div className=' flex flex-row justify-between items-center w-full h-full lg:px-6 px-4' >
        <div className=' flex flex-row justify-center items-center gap-5'>
          <h1 className=' text-xl font-bold font-sans '>Reise</h1>
          {wallet.isConnected && (
              <div className='flex space-x-4'>
                <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Blog</p>
                <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Bag</p>
                <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Explore</p>
                <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Create</p>
              </div>
            )}
        </div>
        <div className=' flex flex-row justify-center items-center rounded-xl gap-5'>
            <Wallet />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
