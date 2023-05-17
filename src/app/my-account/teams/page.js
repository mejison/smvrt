'use client'
import Card from "@/components/card";
import Tabs from "@/components/tabs";
import { useState } from "react";

import { useRouter } from 'next/navigation'
import Select from "@/components/select"

import CreateNewTeam from "@/popups/create-new-team"

export default function Teams () {
    const { push } = useRouter();

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

    const [teams, setTeams] = useState([
        {
            label: 'French',
            value: 'french'
        },
        {
            label: 'English',
            value: 'english'
        },
        {
            label: 'Spanish',
            value: 'spanish'
        }
    ]);

    const [activeTeam, setActiveTeam] = useState(teams[1])

    const changeTab = (tab) => {
        // setActive(tab)
        push("/my-account/" + tab.slug)
    }

    const onSelect = (option) => {
        setActiveTeam(option);
    }

    const handleCreateNewTeam = () => {
       
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
                <CreateNewTeam 
                    open={false}
                />
        </div>
    );
}