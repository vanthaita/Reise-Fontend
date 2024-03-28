'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
const Navbar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }
    
  return (
    <nav className=' relative h-14 w-full bg-white z-30'>
      <div className=' flex flex-row justify-between items-center w-full h-full lg:px-6 px-4' >
      <h1 className=' text-xl font-bold font-sans '>Reise</h1>
        <div className=' flex flex-row justify-center items-center'>
       { !isLoading ? 
       <Button asChild className='px-4' onClick={handleClick}>
            <p className=' cursor-pointer'>Connect</p>
        </Button> : 
            <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </Button>
        }
        </div>
      </div>
    </nav>
  )
}
export default Navbar
