"use client"
import { formHandlerAction } from '@/app/_actions/formHandler'
import {  DealFormState, StringMap } from '@/app/_types/deal'
import React, { useEffect, useRef, useState } from 'react'
import { useActionState} from 'react-dom'
import  toast  from 'react-hot-toast';
import SubmitButton from './SubmitButton';

const initialState: DealFormState<StringMap> = {};

export default function DealForm() {
  const [errors, setErrors] = React.useState<StringMap>({});
  const formRef = useRef<HTMLFormElement>(null);

const [serverState, formAction] = useActionState<DealFormState<StringMap>>(
  formHandlerAction, 
  initialState
);

useEffect(() => {
  if(serverState.successMsg) {
    toast.success(serverState.successMsg);
    formRef.current?.reset();
  }
}, [serverState]);

  return (
    <form className='w-full' action={formAction} method='POST' ref={formRef}>
      <div  className='flex flex-col gap-y-4'>
        <div>
          <label className='block' htmlFor='name'>
            Name
            </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full p-2 rounded-md text-gray-900 p-2'
            required
            defaultValue={serverState.data?.name}
            />
            <div className='min-h-8'>
              {serverState.errors?.name && (
                <small className='text-red-480'>{serverState.errors.name}</small>
              )}
            </div>
            </div>
            <div>
                <label className='block' htmlFor='link'>
                    Link { 'https:// or http://' }
                    </label>
                <input
                    type='text'
                    id='link'
                    name='link'
                    className='w-full p-2 rounded-md text-gray-900 p-2'
                 required
                 pattern='https?://.+'
                 title="Please enter a valid URL"
                 defaultValue={serverState.data?.link}
                 />
                 <div className="min-h-8">
                  {serverState.errors?.link && (
                    <small className='text-red-500'>{serverState.errors.link}</small>
                  )}
                 </div>
            </div>
            <div>
                <label className='block' htmlFor='price'>
                    Price
                    </label>
                <input
                    type='number' 
                    id='price'
                    name='price'
                    defaultValue={10}      
                    className='w-full p-2 rounded-md text-gray-900 p-2'
               defaultValue={serverState.data?.price}
               required
               />
            </div>
            </div>
            <div className='min-h-8'>
              {serverState.errors?.price && (
                <small className='text-red-500'>{serverState.errors.price}</small>
              )}
            </div>
            <div>
                <label className='block' htmlFor='couponCode'>
                    Coupon Code
                    </label>
                    <input
                        type='text'
                        id='couponCode'
                        name='couponCode'
                        className='w-full p-2 rounded-md text-gray-900'
                        required
                         minLength={6}
                         defaultValue={serverState.data?.couponCode}
                        />
                        <div className='min-h-8'>
                            {serverState.errors?.couponCode && (
                                <small className='text-red-400'>{serverState.errors.couponCode}</small>
                            )}
                   </div>
            </div>
            <div>
                <label className='block' htmlFor='discount'>
                    Discount(%)
                    </label>
                    <input
                        type='number'
                        id='discount'
                        min={1}
                        max={100}
                        name='discount'
                        defaultValue={10}
                        required
                        className='w-full p-2 rounded-md text-gray-900'
                        defaultValue={serverState.data?.discount}
                        />
                        <div className='min-h-8'>
                            {serverState.errors?.discount && (
                                <small className='text-red-400'>{serverState.errors.discount}</small>
                            )}
                        </div>
            </div>
            <SubmitButton />
    </form>
    )
}
