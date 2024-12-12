"use client";

import React from 'react'
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
       const {pending} = useFormStatus()
  return (
    <button className='bg-blue-500 py-2 px-4 rounded-md w-full hover:bg-blue-700'>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
