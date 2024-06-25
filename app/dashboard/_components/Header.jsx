"use client"
import React, { useEffect,useState } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Interview from '../interview/[interviewId]/page'
import InterviewList from './InterviewList'
import { MockInterview } from '../../../utils/schema'
import { db } from '../../../utils/db'
import { eq } from 'drizzle-orm'

function Header() {
    
    const path=usePathname();
    
   
   

  return (
    
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
        <Image src={'/logo.svg'} width={150} height={100} alt='logo'/>
        <ul className=' flex gap-6' >

<Link href={'/dashboard'}>

<li className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer
             ${path=='/dashboard'&&'text-blue-600 font-bold '}`}>Dashboard</li>
</Link>


             
<li className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer
             ${path=='/dashboard/interview/'&&'text-blue-600 font-bold'}`}>Question</li>

            <li className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer
             ${path=='/dashboard/upgrade'&&'text-blue-600 font-bold'}`}>Upgrade</li>
            <li className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer
             ${path=='/dashboard/how'&&'text-blue-600 font-bold'}`}>How it works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header