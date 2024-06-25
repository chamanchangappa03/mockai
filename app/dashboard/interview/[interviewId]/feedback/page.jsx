"use client"
import React, { useEffect, useState } from 'react'
import { UserAnswer } from '../../../../../utils/schema'
import { db } from '../../../../../utils/db'
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../../../@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../../../../../@/components/ui/button'


function feedback({params}) {
   const [feedbackList,setFeedbackList]=useState([]);
  useEffect(()=>{
    getFeedback();
  },[])

  const getFeedback=async()=>{
    const result=await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,params.interviewId)).orderBy(UserAnswer.id);
    setFeedbackList(result)
    
  }



  return (
    <div className='p-10 ml-40'>
    <h2 className=' font-bold text-green-500 text-3xl'>Congratulations</h2>
    <h2 className='font-semibold text-2xl'>here is your interview feedback</h2>
    {feedbackList.length==0?
    <div className='my-3   p-2 border w-fit items-center justify-center rounded-lg' >
    <h2 className='font-bold   text-xl text-gray-500'>No interview record found Please Attempt the Interview</h2>
   <Link className='my-3 ' href={'/dashboard/interview/'+params.interviewId+''}>
   <Button className='my-3 items-center ml-60' >
        Attempt
    </Button>
   </Link>
    </div>
    
    :
    <div>
    <h2 className='font-medium text-2xl'>Your overall rating:{}</h2>

    <h2 className='text-sm'>find below the correct answer,your answer and feedback for improvement</h2>
    {feedbackList&&feedbackList.map((items,index)=>(
      <Collapsible key={index} className='mt-7'>
      <CollapsibleTrigger className='pd-2 w-full bg-secondary rounded-lg gap-10 my-2 text-left flex justify-between'>
      {items.question} <ChevronsUpDown className='h-5 w-5 '/>
      </CollapsibleTrigger>
      <CollapsibleContent>
       <div className='flex flex-col gap-2'>
       <h2 className='text-red-500 p-2 border rounded-lg'>
          <strong>Rating:</strong>
          {items.rating}
          </h2>
          <h2 className='border rounded-lg p-2 bg-blue-50 text-sm font-medium text-blue-900'
          ><strong>Your answer: </strong> {items.userAns}</h2>
          <h2 className='border rounded-lg p-2 bg-green-50 text-sm font-medium text-green-900'
          ><strong>Correct answer: </strong> {items.correctAns}</h2>
          <h2 className='border rounded-lg p-2 bg-yellow-50 text-sm font-medium text-yellow-900'
          ><strong>Feedback </strong> {items.feedback}</h2>
          
       </div>
      </CollapsibleContent>
      </Collapsible>

    ))}

      <Link href={'/dashboard'}>
      <Button>Go home</Button>
      </Link>
      </div>
  }
    
 
    </div>
  )
}

export default feedback