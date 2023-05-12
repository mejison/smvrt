"use client";

import Image from 'next/image';

export default function Button(props) {
    const { label, className, icon } = props
   return (
     <div>
        <button {...props} className={` ${className} text-white w-full py-[10px] rounded-[6px] font-bold flex items-center justify-center`}>
            {
                icon ? 
                <span className='mr-[10px]'>
                    <Image 
                        src={icon}
                        width="20"
                        height="20"
                        alt="icon" 
                    />
                </span> :<></>
            }
            {label}
        </button>
     </div>
   );
 }