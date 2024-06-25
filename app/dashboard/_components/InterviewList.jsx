
"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import Interviewitemcard  from './Interviewitemcard';

function InterviewList() {
    const {user} =useUser();

    const [userlist,setuserlist]=useState([]);


    useEffect(()=>{
        user&&Getinterview();
    },[user])
    const Getinterview=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(MockInterview.mockId))
       
        setuserlist(result)
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        <h2 className='font-medium text-black' >Previous Mock Interviews </h2>
        <div>
            {userlist&&userlist.map((interview,index)=>(
                <Interviewitemcard key={index} interview={interview}/>
            ))}
           
        </div>

    </div>
  )
}

export default InterviewList;