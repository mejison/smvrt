'use client'
import Card from "@/components/card";
import Tabs from "@/components/tabs";
import Image  from "next/image";
import infosvg from "@/assets/info.svg"
import { useState } from "react";

import { useRouter } from 'next/navigation'
import Accordion from '@/components/accordion'

export default function Notification () {
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

    const [active, setActive] = useState(tabs[1])

    const changeTab = (tab) => {
        push("/my-account/" + tab.slug)
    }

    const [comments, setComments] = useState([])
    const [tasks, setTasks] = useState([
        {
            label: 'Assignee changes',
            value: true
        },
        {
            label: 'Status changes',
            value: false
        },
        {
            label: 'Tasks assigned to me',
            value: false
        },
        {
            label: 'Document edited',
            value: false
        },
        {
            label: 'New version published',
            value: false
        },
    ])

    const [duedates, setDueDates] = useState([
        {
            label: 'Due date changes',
            value: false
        },
        {
            label: 'Due date overdue',
            value: false
        },
        {
            label: 'Before due date reminder',
            value: false
        },
    ]);

    const handleChangeComments = (option) => {
        setComments([
            ...comments.map(row => {
                if (row.label == option.label) {
                    return {
                        label: row.label,
                        value: ! option.value
                    }
                }
                return row
            })
        ])
    }
    
    const handleChangeTasks = (option) => {
        setTasks([
            ...tasks.map(row => {
                if (row.label == option.label) {
                    return {
                        label: row.label,
                        value: ! option.value
                    }
                }
                return row
            })
        ])
    }

    const handleChangeDueDates = (option) => {
        setDueDates([
            ...duedates.map(row => {
                if (row.label == option.label) {
                    return {
                        label: row.label,
                        value: ! option.value
                    }
                }
                return row
            })
        ])
    }

    return (<div className="p-4 lg:pl-[270px] pl-0 pt-[90px]">
                <Tabs tabs={tabs} active={active} change={changeTab} />
                <div className="pt-[30px]">
                    <Card>
                        <div className="text-[14px] flex items-center mb-[15px] font-Eina03">
                            <Image 
                                src={infosvg} 
                                width="18"
                                heigh="18"
                                alt="image" 
                                className="mr-3"
                            />
                            <p>Notification settings can be customized for each Workspace you're part of</p>
                        </div>
                        <div className="text-[14px]  flex items-center font-Eina03">
                            <Image 
                                src={infosvg} 
                                width="18"
                                heigh="18"
                                alt="image" 
                                className="mr-3"
                            />
                            By default, you'll receive notifications for tasks that you're a viewer on.
                        </div>
                    </Card>
                    <div className="mb-[20px]"></div>
                    <Card>
                        <Accordion label="Comments" items={comments} handleChange={handleChangeComments} />
                    </Card>
                    <div className="mb-[20px]"></div>
                    <Card>
                        <Accordion label="Tasks" items={tasks} handleChange={handleChangeTasks} />
                    </Card>
                    <div className="mb-[20px]"></div>
                    <Card>
                        <Accordion label="Due dates" items={duedates} handleChange={handleChangeDueDates} />
                    </Card>
                </div>
        </div>
    );
}