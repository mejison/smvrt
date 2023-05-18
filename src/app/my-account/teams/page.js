'use client'
import Card from "@/components/card";
import Tabs from "@/components/tabs";
import { useEffect, useState } from "react";

import { useRouter } from 'next/navigation'
import Select from "@/components/select"

import CreateNewTeam from "@/popups/create-new-team"
import AddTeamMember from "@/popups/add-team-member";
import * as api from '@/api'

import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';


export default function Teams () {
    const { push } = useRouter();

    const [popup, setPopup] = useState({
        server_error: {
            visible: false,
            message: '',
        },
        server_success: {
            visible: false,
            message: '',
        },
    })

    const [roles, setRoles] = useState([])

    const tabs = [
        {
            label: "Profile",
            slug: "",
        },
        {
            label: "Notification",
            slug: "notification",
        },
        {
            label: "Teams",
            slug: "teams",
        }
    ];

    const [activeTab, setActiveTab] = useState(tabs[2])

    const [teams, setTeams] = useState([]);

    const [members, setMembers] = useState([
        {
            fname: 'Victoria',
            lname: 'Kettle',
            email: 'victoriakettle@gmail.com',
            role: null
        },
    ])
    
    const [activeTeam, setActiveTeam] = useState({ members: [] })
    const [popups, setPopUps] = useState({
        add_member: false,
        create_new_team: false
    })

    const changeTab = (tab) => {
        // setActive(tab)
        push("/my-account/" + tab.slug)
    }

    const onSelect = (option) => {
        setActiveTeam(option);
    }

    const handleCreateNewTeam = () => {
        setPopUps({
            ...popups,
            create_new_team: true
        })
    }

    const handleAddMember = () => {
        setPopUps({
            ...popups,
            add_member: true
        })
    }

    useEffect(() => {
        api.roles()
            .then(data => data.json())
            .then((data) => {
               if (data && data.data) {
                const roles = [
                    {
                        label: 'Set role',
                        value: ''
                    },
                    ...data.data.map(role => ({label : role.name, value: role.id}) )
                ]
                setRoles(roles)
               }
            })

            getTeams();
    }, [])

    const getTeams = () => {
        api.get_profile_teams()
        .then(data => data.json())
        .then((data) => {
           if (data && data.data && data.data.length) {
                const teams = [
                    ...data.data.map(team => ({label : team.name, value: team.id, ...team}))
                ]
                setTeams(teams)
                if ( ! activeTeam.id) {
                    setActiveTeam(teams[0])
                } else {
                    setActiveTeam({...activeTeam})
                }
           }
        })
    }

    const handleRemoveMember = (member) => {
        api.remove_member_from_team({
            team_id: activeTeam.id,
            email: member.email
        })
            .then(data => data.json())
            .then((data) => {
                const errors = data.errors ? Object.values(data.errors) : []
                    if (errors.length || data.exception) {
                        const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                        setPopup({
                            ...popup,
                            server_error: {
                                visible: true,
                                message
                            }
                        })
                        return ;
                    }

                    setPopup({
                        ...popup,
                        server_success: {
                            visible: true,
                            message: data.message
                        }
                    })

                    getTeams()
            })
    }

    const onCreateTeam = (data) => {
        api.create_team(data).then(data => data.json()).then(data => {
            const errors = data.errors ? Object.values(data.errors) : []
            if (errors.length || data.exception) {
                const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                setPopup({
                    ...popup,
                    server_error: {
                        visible: true,
                        message
                    }
                })
                return ;
            }

            setPopup({
                ...popup,
                server_success: {
                    visible: true,
                    message: data.message
                }
            })
            
        })

    }

    const onAddedNewMember = (members) => {
        api.add_member_to_team({
            team_id: activeTeam.id,
            members
        }).then(data => data.json()).then(data => {
            const errors = data.errors ? Object.values(data.errors) : []
            if (errors.length || data.exception) {
                const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                setPopup({
                    ...popup,
                    server_error: {
                        visible: true,
                        message
                    }
                })
                return ;
            }

            setPopup({
                ...popup,
                server_success: {
                    visible: true,
                    message: data.message
                }
            })
            
        })
    }

    const onChangeRole = (member, role) => {
        
        api.update_role_on_team({
            team_id: activeTeam.id,
            email: member.email,
            role: role.value
        }).then(data => data.json()).then(data => {
            const errors = data.errors ? Object.values(data.errors) : []
            if (errors.length || data.exception) {
                const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                setPopup({
                    ...popup,
                    server_error: {
                        visible: true,
                        message
                    }
                })
                return ;
            }

            setPopup({
                ...popup,
                server_success: {
                    visible: true,
                    message: data.message
                }
            })
            
        })
    }

    return (<div className="p-4 lg:pl-[270px] pl-0 pt-[90px]">
                <Tabs tabs={tabs} active={activeTab} change={changeTab} />
                <div className="pt-[30px]">
                    <Select 
                        label="Select the team" 
                        options={teams} 
                        value={activeTeam}
                        onSelect={onSelect}
                    >
                        <div className="px-[24px] flex py-[15px] !pl-[10px] items-center cursor-pointer text-[#1860CC] font-bold font-Eina03" onClick={handleCreateNewTeam}>
                            <svg className="mr-[8px]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_49_19660)">
                                        <path d="M8.99972 17.3569C13.6152 17.3569 17.3569 13.6152 17.3569 8.99972C17.3569 4.3842 13.6152 0.642578 8.99972 0.642578C4.3842 0.642578 0.642578 4.3842 0.642578 8.99972C0.642578 13.6152 4.3842 17.3569 8.99972 17.3569Z" stroke="#74A6F1" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 5.14258V12.8569" stroke="#74A6F1" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M5.14258 9H12.8569" stroke="#74A6F1" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_49_19660">
                                        <rect width="18" height="18" fill="white"/>
                                    </clipPath>
                                    </defs>
                            </svg>
                            Create new team
                        </div>
                    </Select>
                </div>
                <div className="flex flex-col pt-[24px] mb-[36px]">
                    {
                        activeTeam.members.map((member, index) => {
                            return (
                                <div className="grid grid-cols-[210px_1fr_85px] gap-[16px] mb-[12px] font-Eina03 text-[14px]" key={`${activeTab.id}-${index}`}>
                                    <div className="rounded-[6px] py-[5px] px-[4px] bg-white flex items-center">
                                        <div className="w-[32px] h-[32px] rounded-full bg-[#1ED9C6] mr-[9px]">
                                            
                                        </div>
                                        <h3>{member.name ? member.name : member.email}</h3>
                                    </div>
                                    <div className="flex items-center rounded-[6px] py-[10px] px-[12px] bg-white">
                                        { member.email }
                                        <div className="ml-auto">
                                            <Select 
                                                options={roles}
                                                value={roles.find(role => role.value == member.role_id)}
                                                className=" px-[10px] !text-[12px] border-none !py-[0]"
                                                onSelect={(newRole) => onChangeRole(member, newRole)}
                                            />
                                        </div>
                                    </div>
                                    <a href="#" onClick={() => handleRemoveMember(member)} className="rounded-[6px] text-center border font-bold text-[12px] border-[#737373] text-[#737373] py-[10px] px-[12px] bg-white">
                                        Remove
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <div className='flex' >
                        <a href="#" onClick={handleAddMember} className="inline-flex ml-auto mb-[24px] font-bold font-Eina03 !text-[14px] items-center text-[#1860CC] border border-[#1860CC] rounded-[6px] px-[16px] py-[8px]">
                            <svg className="mr-[10px]" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.15407 6.15367C7.30112 6.15367 8.23099 5.22384 8.23099 4.07683C8.23099 2.92983 7.30112 2 6.15407 2C5.00702 2 4.07715 2.92983 4.07715 4.07683C4.07715 5.22384 5.00702 6.15367 6.15407 6.15367Z" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.69231 13.0753H2V11.6907C2.00735 10.9872 2.1929 10.297 2.53933 9.68457C2.88576 9.07217 3.38175 8.55757 3.98099 8.18882C4.58023 7.82007 5.26316 7.60922 5.96598 7.57595C6.66881 7.54268 7.3686 7.68807 8 7.99856" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M11.2305 8.46191V14.0001" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.46094 11.2305H13.9994" stroke="#1860CC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Add member
                        </a>
                    </div>
                    <hr />
                </div>
                <CreateNewTeam 
                    open={popups.create_new_team}
                    onSave={onCreateTeam}
                    roles={roles}
                    onClose={() => setPopUps({...popups, create_new_team: false})}
                />

                <AddTeamMember 
                    open={popups.add_member}
                    roles={roles}
                    onAddedNewMember={onAddedNewMember}
                    onClose={() => setPopUps({...popups, add_member: false})}
                />

                <ServerError 
                    open={popup.server_error.visible} 
                    title="Error"
                    message={popup.server_error.message}
                    onClose={() => {setPopup({...popup, server_error: { visible: false }})}}
                />

                <ServerSuccess
                    open={popup.server_success.visible} 
                    title="Success"
                    message={popup.server_success.message}
                    onClose={() => {setPopup({...popup, server_success: { visible: false }})}}  
                />
        </div>
    );
}