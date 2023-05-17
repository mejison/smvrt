import { useState } from "react";
import Input from "./input";
import Select from "./select";

export default function AddTeamMember({ roles }) {
    const [activeRole, setActiveRole] = useState(roles[0])
   
    return (
        <div className='mb-[24px]'>
                <div className='grid grid-cols-[210px_1fr] gap-[16px] mb-[24px]'>
                    <div>
                        <Input 
                            placeholder="Full name"
                            className="text-[14px] placeholder:text-[14px]"
                        />
                    </div>
                    <div>
                        <Input 
                            placeholder="Email address"
                            className="text-[14px] placeholder:text-[14px]"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_85px] gap-[15px] items-center content-center">
                    <Select 
                        label="" 
                        options={roles} 
                        value={activeRole}
                        onSelect={setActiveRole}
                        className="text-[14px]"
                        />
                    <a href="#" className="font-bold font-Eina03 inline-block bg-[#B8C2CC] text-white text-[12px] rounded-[6px] py-[12px] text-center">
                        Add
                    </a>
                </div>
            </div>
    );
}