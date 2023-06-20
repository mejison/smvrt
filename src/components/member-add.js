import { useEffect, useState } from "react";
import Input from "./input";

import { getAttrFromName } from '@/utils/helpers'
import Select from "./select";

export default function MemberAdd({ label, roles, onUpdate, value, disabledRoles = [], exclude = [] }) {
    const [members, setMembers] = useState([...value])
    const [member, setMember] = useState({
        name: '',
        email: '',
        role: null
    })
    const [toggle, setToggle] = useState(false)
    
    const onChange = (field, value) => {
        setMember({
            ...member,
            [field]: value
        })
    }

    const regexpEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const canAdd = () => {
        const filled = !member.name || !member.email ? true: false
        const exist = members.find(item => item.email == member.email)
        const isEmail = regexpEmail.test(member.email)
        const isExclude = exclude.find(item => item.email == member.email)
        return ! filled && ! exist && isEmail && ! isExclude
    }

    useEffect(() => {
        setToggle(value && value.length)
        setMembers([...value])
    }, [value])

    const handleAdd = (e) => {
        e.preventDefault();
        if (canAdd()) {
            const defaultRole = roles[0] ?? false
            const newList = [
                ...members,
                {
                    ...member,
                    role: defaultRole
                }
            ]
            setMembers(newList)
            onUpdate(newList);
            setMember({
                name: '',
                email: '',
                role: null
            })
        }
        
    }

    const handleRemoveMember = (index) => {
        const newList = [
            ...members.filter((member, targetIndex) => {
                if (targetIndex != index) {
                    return true
                }
                return false
            })
        ]
        setMembers(newList)
        onUpdate(newList);
    }

    const handleUpdateRoleMember = (targetMember, role) => {
        const newList = [...members.map(member => {
            if (member.email == targetMember.email) {
                return {
                    ...member,
                    role: role
                }
            }
            return member
        })]

        setMembers(newList)
        onUpdate(newList);
    }

    return (
        <>
            <h3 className="font-Eina03 font-bold text-[14px] text-[#222] mt-[56px] mb-[24px] flex items-center">{label}
                        <a href="#" className="ml-auto" onClick={(e)=> {e.preventDefault(); setToggle(!toggle) }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_49_9784)">
                                    <path d="M12 6.85718V17.1429" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.85742 12H17.1431" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18.0003 0.857178H6.00028C3.15996 0.857178 0.857422 3.15971 0.857422 6.00003V18C0.857422 20.8404 3.15996 23.1429 6.00028 23.1429H18.0003C20.8406 23.1429 23.1431 20.8404 23.1431 18V6.00003C23.1431 3.15971 20.8406 0.857178 18.0003 0.857178Z" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_49_9784">
                                <rect width="24" height="24" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </h3>
            
            {
                toggle ? (
                    <div>
                        <div className='grid grid-cols-[210px_1fr_100px] gap-[16px] mb-[24px]'>
                            <div>
                                <Input 
                                    placeholder="Full name"
                                    name="name"
                                    className="text-[14px] placeholder:text-[14px]"
                                    onInput={(e) => { onChange('name', e.target.value);  }}
                                    value={member.name}
                                />
                            </div>
                            <div>
                                <Input 
                                    placeholder="Email address"
                                    className="text-[14px] placeholder:text-[14px]"
                                    type="email"
                                    name="email"
                                    onInput={(e) => { onChange('email', e.target.value);  }}
                                    value={member.email}
                                />
                            </div>
                            <a href="#" onClick={handleAdd}  className={`font-bold font-Eina03 inline-block ${ ! canAdd() ? 'bg-[#B8C2CC]' : 'bg-[#1860CC]'} text-white text-[12px] rounded-[6px] py-[12px] text-center`}>
                                Add
                            </a>
                        </div>
                        {
                            members.map((member, key) => {
                                return (

                                    <div className="grid grid-cols-[210px_1fr_85px] gap-[16px] mb-[12px] font-Eina03 text-[14px]" key={`${key}`}>
                                        <div className="rounded-[6px] py-[5px] px-[4px] bg-white flex items-center">
                                            <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#1ED9C6] mr-[9px] text-center flex items-center justify-center font-bold text-white tracking-tighter">
                                                
                                                {
                                                    member.user && member.user.avatar ? 
                                                    <img src={member.user.avatar} className="w-full h-full object-contain" />
                                                    :
                                                    getAttrFromName(member.name ? member.name : member.email)
                                                }
                                            </div>
                                            <h3>{ member.name ? member.name : member.email }</h3>
                                        </div>
                                        <div className="flex items-center rounded-[6px] py-[10px] px-[12px] bg-white">
                                            { member.email }
                                            {
                                                roles.length ? (
                                                    <div className="ml-auto">
                                                        <Select 
                                                            options={roles.filter(option => ! disabledRoles.includes(option.label))}
                                                            className=" px-[10px] !text-[12px] border-none !py-[0]"
                                                            value={member.role}
                                                            onSelect={(event) => handleUpdateRoleMember(member, event)}
                                                        />
                                                    </div>
                                                ) : <></>
                                            }
                                        </div>
                                        <a href="#" onClick={(e) => {e.preventDefault(); handleRemoveMember(key)}} className="rounded-[6px] text-center border font-bold text-[12px] border-[#737373] text-[#737373] py-[10px] px-[12px] bg-white">
                                            Remove
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : <></>
            }
            <hr />
        </>
    );
}