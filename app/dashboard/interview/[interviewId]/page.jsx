"use client"

import React, { useEffect, useState } from 'react'
import { MockInterview } from '../../../../utils/schema'
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '../../../../@/components/ui/button';
import { db } from '../../../../utils/db';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

function Interview({params}) {
  const [InterviewData,setInterviewData]=useState();
  const [webcamEnable,setWebcamEnable]=useState();
    useEffect(()=>{
       
        GetInterviewDetails()
    },[])
    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
    
        setInterviewData(result[0]);
    }
  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl' >Lets get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-10'>
      
      
      <div>
        <div className='flex flex-col my-5 gap-5 '>
          <div className='flex flex-col my-5 gap-5 p-10 rounded-lg border'>
            <div> <strong className='text-lg'>Job role/Position:</strong>{InterviewData?.jobPosition} </div>
            <div> <strong className='text-lg'>Job role/Position:</strong>{InterviewData?.jobDescription} </div>
            <div> <strong className='text-lg'>Job role/Position:</strong>{InterviewData?.jobexperience} </div>
       </div> 
       
        </div>
        <div className='p-5 border rounded-lg border-yellow-700 bg-yellow-300'>
          <h2 className='flex gap-2 items-center'>
          <Lightbulb/><strong>Information</strong>
          </h2>
          <h2>
            {process.env.NEXT_PUBLIC_INFORMATION}
          </h2>
        </div>

      </div>
      <div>
        {webcamEnable ?<Webcam 
        onUserMedia={()=>setWebcamEnable(true)}
        onUserMediaError={()=>setWebcamEnable(false)}  
        mirrored={true}
        style={
          {
            height:300,
            width:300,
          
          }
        }

        />:

      <>
        <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border justify-center'/>
        <Button variant="ghost" className='w-full h-10' onClick={()=> setWebcamEnable(true)}>Enable Web cam  and microphone</Button>
      </>
      }
      
      
      </div>
      </div>
      <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}> 
      <Button >Start Interview</Button>
      </Link>
      </div>
    </div>

  )
}

export default Interview