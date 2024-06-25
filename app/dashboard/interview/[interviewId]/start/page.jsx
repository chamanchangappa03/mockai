"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/db'
import { MockInterview } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import QuestionsSection from './_components/QuestionsSection'
import RecordansSection from './_components/RecordansSection'
function StartInterview({params}) {

    useEffect(()=>{
        GetInterviewDetails();
    },[])
    const [InterviewData,setInterviewData]=useState();
    const [mockQuestions,setmockQuestions]=useState();
    const [activeQuestions,setActiveQuestions]=useState(0);

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
    
        setInterviewData(result[0]);
        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp);
        setmockQuestions(jsonMockResp)
    }


  return (
    
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2'>
    {/* Questions */}
    <QuestionsSection mockQuestions={mockQuestions} activeQuestions={activeQuestions}/>

    {/* video and audio */}
    <RecordansSection
     mockQuestions={mockQuestions} activeQuestions={activeQuestions} InterviewData={InterviewData}
     setactiveQuestions={setActiveQuestions}

    />
    </div>


    </div>
  )
}

export default StartInterview