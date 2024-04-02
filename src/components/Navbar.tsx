'use client'
import React from 'react';
import { Wallet } from './ui/Wallet';
import { useCurrentWallet } from '@mysten/dapp-kit';
import Link from "next/link";
import Image from 'next/image';

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
          <div className=' flex flex-row justify-center items-center'>
          <Image src="https://www.svgrepo.com/show/317127/travel.svg" 
              className="h-12 mr-3 sm:h-9" alt="Landwind Logo" width={30} height={30} />
              <p className='text-xl font-bold'>Reise</p>
          </div>
        </Link>
          <div className={`flex-col lg:flex-row lg:space-x-4 ${isOpen ? 'hidden' : 'hidden'} lg:flex`}>
            <Link href="/map">
              <p className='text-sm font-medium hover:text-blue-500'>Map</p>
            </Link>
            <Link href="/blog">
              <p className='text-sm font-medium hover:text-blue-500'>Blog</p>
            </Link>
            <Link href="/earn">
              <p className='text-sm font-medium hover:text-blue-500'>Earn</p>
            </Link>
            {/* <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Collection</p> */}
            <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Explore</p>
            {/* <Link href="/create">
              <p className='text-sm font-medium cursor-pointer hover:text-blue-500'>Create</p>
            </Link> */}
          </div>
        </div>        
        </div>

        <div className='flex items-center rounded-xl'>
          <Wallet />
        </div>
      </div>
      <div className={`flex flex-col p-4 space-y-2 bg-white border-t border-gray-200 lg:hidden w-full ${isOpen ? ' block' : 'hidden'}`}>
        <Link href="/map">
          <p className='text-sm font-medium hover:text-blue-500'>Map</p>
        </Link>
        <Link href="/blog">
          <p className='text-sm font-medium hover:text-blue-500'>Blog</p>
        </Link>
        <Link href="/earn">
          <p className='text-sm font-medium hover:text-blue-500'>Earn</p>
        </Link>
        {/* <Link href="/collection">
          <p className='text-sm font-medium hover:text-blue-500'>Collection</p>
        </Link> */}
        <Link href="/explore">
          <p className='text-sm font-medium hover:text-blue-500'>Explore</p>
        </Link>
        {/* <Link href="/create">
          <p className='text-sm font-medium hover:text-blue-500'>Create</p>
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
