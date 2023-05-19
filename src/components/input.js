"use client";

import React, { useState } from 'react';

import OpenEyeSVG from '@/assets/eye-open.svg';
import CloseEyeSVG from '@/assets/eye-close.svg';
import Image from 'next/image';

export default function Input(props) {
    const { label } = props
    const errors = props.errors || []

    const [showPassword, setShowPassword] = useState(false);
    const [payload, setPayload] = useState(false);

    const handleClick = () => {
        setShowPassword( ! showPassword)
    }

    const onChange = (event) => {
        setPayload(event.target.value);
    }
  return (
    <div className="text-left z-[1]">
        {
            label ? 
            <label 
                htmlFor="success" 
                className="block mb-2 text-sm font-Eina03 font-bold"
                >{label}</label> : ""
        }
        <div className='relative z-[2]'>
            <input
                id="success"
                {...props}
                className={`border text-[14px] rounded-[6px] block w-full p-2.5 focus:outline outline-[4px] outline-[#D3E4FE] ${ ! errors.length ? 'focus:border-[#1860CC]' : 'focus:border-[#D94042]' }`}
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
            {
                errors.length ? 
                <p className="mt-[8px] text-[12px] shadow-sm text-[#D94042] absolute left-[0] z-index-[3] bg-white right-[0] px-3 py-2" dangerouslySetInnerHTML={{__html: errors.join(' ')}}></p> : <></>
            }
        </div>
    </div>
  );
}