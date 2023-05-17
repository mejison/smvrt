
import WrapperModal from './wrapper.js'
import Input from '@/components/input'
import Select from '@/components/select'
import Button from '@/components/button'
import { useState } from 'react'
import AddTeamMember from '@/components/add-team-member'

export default function AddTeamMemberPopUp(props) {
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
   
    return (<WrapperModal title="Add team member" open={props.open} {...props}>
                <div className='flex flex-col'>
                            
                    <AddTeamMember roles={roles} />
                    
                    <a href="#" className="font-bold font-Eina03 inline-block bg-[#B8C2CC] text-white !text-[14px] rounded-[6px] py-[10px] text-center">
                        Save
                    </a>
                </div>
            </WrapperModal>);
}