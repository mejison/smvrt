'use client'
import Select from "@/components/select";
import { useState, useEffect } from "react";
import CreateNewTeam from "@/popups/create-new-team";
import * as api from '@/api'

import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';
import MembersList from "@/components/members-list";
import Button from "@/components/button";
import MemberAdd from "@/components/member-add";
import { useNewProject } from '@/context/new-project'

import { useRouter } from "next/navigation";
export default function StepTwo() {
    const { push } = useRouter();

    const {project, setProject, handleNext} = useNewProject();

    const [popups, setPopUps] = useState({
        create_new_team: false,
        server_error: {
            visible: false,
            message: '',
        },
        server_success: {
            visible: false,
            message: '',
        },
    })

    const [teams, setTeams] = useState([
        {
            label: 'Not selected',
            value: '',
        }
    ])

    const [roles, setRoles] = useState([])

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

    const [activeTeam, setActiveTeam] = useState(teams[0])
    const onChangeTeam = (team) => {
        setActiveTeam(team)
        setProject({
            ...project,
            team
        })
    }

    const handleCreateNewTeam = () => {
        setPopUps({
            ...popups,
            create_new_team: true
        })
    }

    const onCreateTeam = (data) => {
        api.create_team({
            ...data,
            redirect: `${location.protocol + "//" + location.host}`
        }).then(data => data.json()).then(data => {
            const errors = data.errors ? Object.values(data.errors) : []
            if (errors.length || data.exception) {
                const message = Object.values(errors).flat(1).join(' ') || data.message || data.exception
                setPopUps({
                    ...popups,
                    server_error: {
                        visible: true,
                        message
                    }
                })
                return ;
            }

            setPopUps({
                ...popups,
                server_success: {
                    visible: true,
                    message: data.message
                }
            })
            getTeams();
        })
    }

    const getTeams = () => {
        api.get_profile_teams()
        .then(data => data.json())
        .then((data) => {
           if (data && data.data && data.data.length) {
                const teams = [
                    ...data.data.map(team => ({label : team.name, value: team.id, ...team}))
                ]

                let targetTeam = activeTeam.id && teams.length? {...teams.find(team => activeTeam.id == team.id)} : teams[0]
                if( ! Object.keys(targetTeam).length) {
                    targetTeam = teams[0]
                }
                
                if (project.team) {
                    targetTeam = teams.find(team => team.id == project.team.id)
                    setActiveTeam(targetTeam)
                }
                setTeams([
                    {
                        label: 'Not selected',
                        value: '',
                    },
                    ...teams
                ])
           }

           if (data.data && ! data.data.length) {
            setTeams([])
            setActiveTeam({ label: 'Not selected', value: '', members: [] })
           }
        })
    }

    const handleExternalCollaborators = (members) => {
        setProject({
            ...project,
            external_collaborators: members
        })
    }

    const handleUpdateMembers = (members) => {
        setProject({
            ...project,
            members: members
        })
    }

    return (<div>
                <h3 className="font-Eina03 font-bold text-[20px] text-[#222] mt-[56px] mb-[24px]">Team & Collaborators</h3>
                <Select 
                    label="Select the team" 
                    options={teams} 
                    value={activeTeam}
                    onSelect={onChangeTeam}
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
                <MembersList 
                    team={activeTeam}
                    members={activeTeam.members}
                    roles={roles}
                    getTeams={getTeams}
                />
                <div className=" mb-[24px]">
                    <MemberAdd label="Add team members" 
                        value={project.members} 
                        roles={roles} 
                        onUpdate={handleUpdateMembers}
                    />
                </div>
                <div className=" mb-[24px]">
                    <MemberAdd label="Add external collaborators" 
                        value={project.external_collaborators} 
                        roles={roles}
                        onUpdate={handleExternalCollaborators} 
                    />
                </div>
                <Button  label="Skip and later" onClick={() => handleNext()} className="bg-[#1860CC] !text-white font-bold !w-full text-[14px] px-[20px]" />
                <CreateNewTeam 
                            open={popups.create_new_team}
                            onSave={onCreateTeam}
                            roles={roles}
                            onClose={() => setPopUps({...popups, create_new_team: false})}
                        />

                <ServerError 
                    open={popups.server_error.visible} 
                    title="Error"
                    message={popups.server_error.message}
                    onClose={() => {setPopUps({...popups, server_error: { visible: false }})}}
                />

                <ServerSuccess
                    open={popups.server_success.visible} 
                    title="Success"
                    message={popups.server_success.message}
                    onClose={() => {setPopUps({...popups, server_success: { visible: false }})}}  
                />
            </div>);
}