'use client'

import { useState } from "react";
import Button from "./button";

export default function IncomingRequestsToChangeRoles() {
    const [requests, setRequests] = useState([
        {
            user: {
                fname: 'Victoria',
                lname: 'Kasdfsd',
            },
            message: 'asked to change his role to <strong>Editor</strong>'
        }
    ]);

    const handleAccept = (request) => {
        console.log(request)
    }

    const handleReject = (request) => {
        console.log(request)
    }

    return (<div className="pt-[25px] text-[14px]">
        {
            requests.map((request, key) => {
                return (
                    <div key={key} className="flex">
                        <div className="flex items-center rounded-lg py-2 px-3  w-full bg-[#FBE3E2] mr-4">
                            <div className="mr-3">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="#D94042" />
                                </svg>
                            </div>
                            <strong>
                                { request.user.fname } { request.user.lname } 
                            </strong>&nbsp;
                            <span dangerouslySetInnerHTML={{__html: request.message}}></span>
                        </div>
                        <div className="grid grid-cols-[110px_110px] gap-[15px] items-center ml-auto">
                            <Button onClick={() => handleAccept(request)} label="Accept" className="bg-[#297FFF] text-white text-[14px] font-Eina03 font-bold" />
                            <Button onClick={() => handleReject(request)} label="Reject" className="!text-[#012D55] !border-[#012D55] border text-[14px] font-Eina03 font-bold" />
                        </div>
                    </div>
                )
            })
        }
        </div>);
}