"use client"
import Image from 'next/image'
import React,{useState,useEffect} from 'react'
import Webcam from 'react-webcam'
import { Button } from '../../../../../../@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '../../../../../../utils/GeminiAimodel'
import { db } from '../../../../../../utils/db'
import { UserAnswer } from '../../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import Link from 'next/link'

function RecordansSection({mockQuestions,activeQuestions,InterviewData,setactiveQuestions}) {
    const [isSupported, setIsSupported] = useState(false);
    const [userAnswer,setuserAnswer]=useState('');
    const User=useUser();
    const [loading,setLoading]=useState(false);


    useEffect(() => {
        // Check if the browser supports the Web Speech API
        const isWebSpeechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        setIsSupported(isWebSpeechSupported);
      }, []);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      
useEffect(()=>{
    results.map((result)=>(
        setuserAnswer(prevAns=>prevAns+result?.transcript)
))
},[results]);
useEffect(() => {
    if (error) {
        console.error("Speech recognition error:", error);
        toast.error("Speech recognition error: " + error);
    }
}, [error]);

const startstopRecording = async () => {
    if (isRecording) {
        console.log("Stopping recording...");
        stopSpeechToText();
    } else {
        console.log("Starting recording...");
        startSpeechToText();
    }
};
    useEffect(()=>{
        if(!isRecording&&userAnswer?.length>10){
            UpdateuserAnswerinDB();
        }
        
    },[userAnswer])
    const UpdateuserAnswerinDB=async()=>{
        setLoading(true);
        
        const feedbackPrompt="Questions"+mockQuestions[activeQuestions]?.question+
        ", user answer :"+userAnswer+", depending on user answer for given interview question give us rating of the answer and feedback as area of improvement if any in just 3-5 lines to improve it in JSON format with rating field and feedback field "

        const result=await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(mockJsonResp)
        const jsonFeedbackResp=JSON.parse(mockJsonResp);

        const resp=await db.insert(UserAnswer)
        .values({
            mockIdRef:InterviewData?.mockId,
            question:mockQuestions[activeQuestions]?.question,
            correctAns:mockQuestions[activeQuestions]?.answer,
            userAns:userAnswer,
            feedback:jsonFeedbackResp,
            rating:jsonFeedbackResp?.rating,
            userEmail:User?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')


        })
        if(resp){
            toast('user Answer recorded successfully')
            setuserAnswer('');
            setResults([]);

        }

        setuserAnswer('')
        setLoading(false);
    }
       
  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col justify-center items-center bg-secondary rounded-lg p-5 mt-20'>
        <Image src={'/webam.png'} width={200} height={200}
        className='absolute'
        />
        <Webcam
        mirrored={true}
        style={{
            height:300,
            width:'100%',
            zIndex:10,
            
        }}
        />
        
    </div>
   
    <Button
        disabled={loading}
     variant="outline" className='my-10 mx-20'
    onClick={startstopRecording}
    >{isRecording ? 
    <h2 className='text-red-700 flex gap-2'>
        <Mic/>'Recording'
    </h2> :'Start Recording'}</Button>
    
      <div className='flex mr-1 gap-3 '>
        {activeQuestions>0&&<Button
        onClick={()=>setactiveQuestions(activeQuestions-1)}
        >Previous Question</Button>}

        {activeQuestions!=mockQuestions?.length-1
        &&<Button onClick={()=> setactiveQuestions(activeQuestions+1)}
        >Next Question</Button>}
        {activeQuestions==mockQuestions?.length-1&&
        <Link href={'/dashboard/interview/'+InterviewData?.mockId+"/feedback"}>
        <Button>End Interview</Button>
        </Link>}
      </div>


      </div>
   
  )
}

export default RecordansSection