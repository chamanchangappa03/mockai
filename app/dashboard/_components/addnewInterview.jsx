"use client";
import React, { useState,useEffect } from 'react';
import { Button } from "../../../@/components/ui/button"
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { db } from '../../../utils/db'
import { Label } from '@radix-ui/react-label';
import { Input } from '../../../@/components/ui/input'
import { chatSession } from '../../../utils/GeminiAimodel'
import { LoaderCircle } from 'lucide-react';

import { MockInterview } from '../../../utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';






const AddnewInterview = () => {
    const [openDialog,setOpenDialog]=useState(false);
    const [jobPosition,setjobPosition]=useState();
    const [jobDescription,setjobdesc]=useState();
    const [jobexperience,setjobexperience]=useState();
    const [loading,setloading]=useState(false)
    const [jsonresponse,setjsonResponse]=useState([])
    const { user }=useUser();
    const router=useRouter();


    const onSubmit=async (e)=>{
      setloading(true)
        e.preventDefault()
        console.log(jobPosition,jobDescription,jobexperience)
        const InputPrompt="job position:"+jobPosition+" job description:"+jobDescription+" years of experience:"+jobexperience+" give me "+process.env.NEXT_PUBLIC_COUNT_QUESTION_KEY+" interview questions with answered in json format,give me question and answers as fields in JSON"
        const result=await chatSession.sendMessage(InputPrompt)
        const Mockjsonresp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(Mockjsonresp))
        setjsonResponse(Mockjsonresp)
        
        if(Mockjsonresp){
        const resp=await db.insert(MockInterview).values({
          mockId:uuidv4(),
          jsonMockResp:Mockjsonresp,
          jobPosition:jobPosition,
          jobDescription:jobDescription,
          jobexperience:jobexperience,
          createdBy: user?.primaryEmailAddress?.emailAddress, 
          createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:MockInterview.mockId});

        console.log("Inserted ID:",resp)
        if(resp){
          setOpenDialog(false);
          router.push('/dashboard/interview/'+resp[0]?.mockId)
        }


      }else{
        console.log("")
      }

          setloading(false);
      }


  return (
  
        
    <div>
        
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
         onClick={()=>setOpenDialog(true)}> <h2 className='text-lg text-center'>+ Add new</h2>
        </div>
        
   <Dialog.Root open={openDialog}>
    
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Edit profile
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
        <form onSubmit={onSubmit}>
        <div>
        <h2>Add details about Job position/role,job description</h2>
        <div className='mt-7 my-3'>
        <Label>Job position/Job Role</Label>
        <Input placeholder="Ex. Full stack Developer" required 
        onChange={(event)=>setjobPosition(event.target.value)}
        />
        </div>
        <div className='my-3'>
        <Label>
            Job description/Tech Stack 
        </Label>
        <Input placeholder="ex. React,Angular,mySQL" required
        onChange={(event)=>setjobdesc(event.target.value)}
        ></Input>
        </div>
        <div className='my-3'>
        <Label>
            Years of experience  
        </Label>
        <Input placeholder="ex.5" type="number" max="50" required
        onChange={(event)=>setjobexperience(event.target.value)}
        ></Input>
        </div>
        <div className='flex gap-5 justify-end'>
       <Button type="button" className='ghost' onClick={()=> setOpenDialog(false)}>Cancel</Button>
       <Button type='submit' disabled={loading}>
        {loading? 
        <><LoaderCircle className='animate-spin'/> 'generating AI'</>:'Start Interview'}
      </Button>
       </div>
       </div>
       </form>
        </Dialog.Description>
       

      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
    </div>
    

  );
};

export default AddnewInterview;
