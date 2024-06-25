import React from 'react'
import { Button } from './../../../@/components/ui/button';
import Link from 'next/link';
function Interviewitemcard({interview}) {
  return (
    <div className='border rounded-lg shadow-sm p-3 bg-white mt-5 '>
<h2 className='font-extrabold text-purple-500'>{interview?.jobPosition}</h2>
    <h2 className='text-gray-500'>JobExperience: {interview?.jobexperience} Years</h2>
    <h2 className='text-gray-500'>Created At: {interview.createdAt}</h2>
    <div className='flex justify-between mt-2 gap-5'>
                
              <Link href={'/dashboard/interview/'+interview.mockId+'/feedback'} className='w-full'>
              <Button size="sm" variant="outline" className='w-full'> Feedback </Button>
              </Link>
              <Link href={'/dashboard/interview/'+interview.mockId+''} className='w-full'>
                <Button size="sm"  className='w-full'> Start </Button>
                </Link>
    </div>
    </div>
  )
}

export default Interviewitemcard;