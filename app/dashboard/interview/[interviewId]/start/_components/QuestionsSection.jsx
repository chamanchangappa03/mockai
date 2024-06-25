import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockQuestions,activeQuestions,InterviewData}) {
const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
        const speech=new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);

    }else{
        alert('Sorry your browser does not Support text to speech')
    }
};


  return mockQuestions&&(
    <div className='p-5 border rounded my-10'>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockQuestions&&mockQuestions.map((question,index)=>(
            <h2 className={` font-bold text-orange-950 p-1 border rounded-full 
            text-xs md:text-sm text-center cursor-pointer ${activeQuestions==index&&'bg-indigo-500'}`}>Question #{index+1}</h2>
        ))}

        
    </div>
    <h2 className='my-5 text-md md:text-lg'>{mockQuestions[activeQuestions]?.question}</h2>
    <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockQuestions[activeQuestions]?.question)}/>
    <div className='border rounded-lg p-5 bg-lime-200 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-500 '>
            <Lightbulb/>
            <strong className='items-center'>Note:</strong>
            <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </h2>
    </div>
    </div>
  )
}

export default QuestionsSection