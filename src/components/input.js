"use client";

import React, { useState } from 'react';

import OpenEyeSVG from '@/assets/eye-open.svg';
import CloseEyeSVG from '@/assets/eye-close.svg';
import Image from 'next/image';

export default function Input(props) {
    const { label } = props
    const hasError = false;

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        setShowPassword( ! showPassword)
    }
  return (
    <div className="text-left">
        <label 
            htmlFor="success" 
            className="block mb-2 text-sm font-Eina03 font-bold"
            >{label}</label>
        <div className='relative'>
            <input
                id="success"
                {...props}
                className="border text-[14px] rounded-[6px] block w-full p-2.5 focus:outline outline-[4px] outline-[#D3E4FE] focus:border-[#1860CC]" 
                type={showPassword ? 'text' : props.type}
            />
            {
                ['password'].includes(props.type) ? 
                (<Image 
                    src={showPassword ? OpenEyeSVG : CloseEyeSVG} 
                    alt="eye" 
                    width="20" 
                    height="20" 
                    className='absolute right-[12px] top-[50%] translate-y-[-50%] cursor-pointer'
                    onClick={handleClick}
                />) : <></>
            }
        </div>
        
        {
            hasError ? 
            <p className="mt-[8px] text-sm text-[#D94042]">
                Some success message.
            </p> : <></>
        }
    </div>
  );
}