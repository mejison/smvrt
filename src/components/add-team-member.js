import { useState } from "react";
import Input from "./input";
import Select from "./select";

export default function AddTeamMember({ roles, onAddedNewMember }) {
    const [member, setMember] = useState({
        name: '',
        email: '',
        role: {
            label: 'Set role',
            value: ''
        },
    })

    const handleAdd = () => {
        onAddedNewMember(member)
        setMember({
            name: '',
            email: '',
            role: {
                label: 'Set role',
                value: ''
            },
        })
    }

    const setActiveRole = (role) => {
        setMember({
            ...member,
            role: role
        })
    }

    return (
        <div className='mb-[24px]'>
                <div className='grid grid-cols-[210px_1fr] gap-[16px] mb-[24px]'>
                    <div>
                        <Input 
                            placeholder="Full name"
                            className="text-[14px] placeholder:text-[14px]"
                            onInput={(e) => setMember({...member, name: e.target.value })}
                            value={member.name}
                        />
                    </div>
                    <div>
                        <Input 
                            placeholder="Email address"
                            className="text-[14px] placeholder:text-[14px]"
                            type="email"
                            onInput={(e) => setMember({...member, email: e.target.value })}
                            value={member.email}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_85px] gap-[15px] items-center content-center">
                    <Select 
                        label="" 
                        options={roles} 
                        value={member.role}
                        onSelect={setActiveRole}
                        className="text-[14px]"
                    />
                    <a href="#" onClick={handleAdd} className={`font-bold font-Eina03 inline-block ${ ! member.name ||  ! member.email || ! member.role.value ? 'bg-[#B8C2CC]' : 'bg-[#1860CC]'} text-white text-[12px] rounded-[6px] py-[12px] text-center`}>
                        Add
                    </a>
                </div>
            </div>
    );
}