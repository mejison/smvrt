import WrapperModal from './wrapper.js'
import Input from '@/components/input'
import Select from '@/components/select'
import Button from '@/components/button'
import { useState } from 'react'
import AddTeamMember from '@/components/add-team-member.js'

export default function CreateNewTeam(props) {
    const [roles, setRoles] = useState([
        {
            label: 'Set role',
            value: ''
        },
        {
            label: 'Role #1',
            value: '1'
        },
        {
            label: 'Role #2',
            value: '2'
        },
        {
            label: 'Role #3',
            value: '3'
        },
    ])

    const [activeRole, setActiveRole] = useState(roles[0])
    const [showAddMember, setShowAddMember] = useState(false)

    const handleAddMember = () => {
        setShowAddMember(!showAddMember)
    }

    return (<WrapperModal title="Create new team" open={props.open} {...props}>
                <div className=''>
                    <div className='flex flex-col'>
                        <div 
                            className="mb-[24px]">
                            <Input 
                                placeholder="Team name"
                                className="text-[14px] placeholder:text-[14px]"
                            />
                        </div>

                        <div className='flex'>
                            <a href="#"  onClick={handleAddMember} className="inline-flex ml-auto mb-[24px] font-bold font-Eina03 !text-[14px] items-center text-[#1860CC] border border-[#1860CC] rounded-[6px] px-[16px] py-[8px]">
                                <svg className="mr-[10px]" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.15407 6.15367C7.30112 6.15367 8.23099 5.22384 8.23099 4.07683C8.23099 2.92983 7.30112 2 6.15407 2C5.00702 2 4.07715 2.92983 4.07715 4.07683C4.07715 5.22384 5.00702 6.15367 6.15407 6.15367Z" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.69231 13.0753H2V11.6907C2.00735 10.9872 2.1929 10.297 2.53933 9.68457C2.88576 9.07217 3.38175 8.55757 3.98099 8.18882C4.58023 7.82007 5.26316 7.60922 5.96598 7.57595C6.66881 7.54268 7.3686 7.68807 8 7.99856" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11.2305 8.46191V14.0001" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.46094 11.2305H13.9994" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Add member
                            </a>
                        </div>
                        
                        {
                            showAddMember ? (
                                <AddTeamMember roles={roles} />
                            ) : <></>
                        }
                        
                        <a href="#" className="font-bold font-Eina03 inline-block bg-[#B8C2CC] text-white !text-[14px] rounded-[6px] py-[10px] text-center">
                            Save
                        </a>
                    </div>
                </div>
            </WrapperModal>);
}