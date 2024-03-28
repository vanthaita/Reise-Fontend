'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Wallet } from './ui/Wallet'
const Navbar = () => {

  return (
    <nav className=' relative h-14 w-full bg-white z-30'>
      <div className=' flex flex-row justify-between items-center w-full h-full lg:px-6 px-4' >
      <h1 className=' text-xl font-bold font-sans '>Reise</h1>
        <div className=' flex flex-row justify-center items-center rounded-xl'>
            <Wallet />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
