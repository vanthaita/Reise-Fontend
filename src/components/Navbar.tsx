'use client'
import React from 'react';
import { Wallet } from './ui/Wallet';
import { useCurrentWallet } from '@mysten/dapp-kit';
import Link from "next/link";

const Navbar = () => {
  const wallet = useCurrentWallet();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className='relative bg-white z-30 '>
      <div className='flex items-center justify-between h-14 px-4 lg:px-6'>
        <div className=' flex flex-row gap-5 justify-center items-center'>
        <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden'>
            <svg className='w-6 h-6' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
              <path d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
            </svg>
        </button>
          <div className='flex gap-5  items-center'>
        <Link href="/">
          <p className='text-xl font-bold'>Reise</p>
        </Link>
          <div className={`flex-col lg:flex-row lg:space-x-4 ${isOpen ? 'hidden' : 'hidden'} lg:flex`}>
            <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Blog</p>
            <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Earn</p>
            <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Collection</p>
            <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Explore</p>
            <Link href="/create">
              <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Create</p>
            </Link>
          </div>
        </div>        
        </div>

        <div className='flex items-center rounded-xl'>
          <Wallet />
        </div>
      </div>
      <div className={`flex flex-col p-4 space-y-2 bg-white border-t border-gray-200 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <Link href="/blog">
          <p className='text-sm font-medium hover:text-blue-500'>Blog</p>
        </Link>
        <Link href="/earn">
          <p className='text-sm font-medium hover:text-blue-500'>Earn</p>
        </Link>
        <Link href="/collection">
          <p className='text-sm font-medium hover:text-blue-500'>Collection</p>
        </Link>
        <Link href="/explore">
          <p className='text-sm font-medium hover:text-blue-500'>Explore</p>
        </Link>
        <Link href="/create">
          <p className='text-sm font-medium hover:text-blue-500'>Create</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
