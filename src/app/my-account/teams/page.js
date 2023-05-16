'use client'
import Card from "@/components/card";
import Tabs from "@/components/tabs";
import { useState } from "react";

import { useRouter } from 'next/navigation'


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

    const [active, setActive] = useState(tabs[2])

    const changeTab = (tab) => {
        // setActive(tab)
        push("/my-account/" +tab.slug)
    }

    return (<div className="p-4 lg:pl-[270px] pl-0 pt-[90px]">
                <Tabs tabs={tabs} active={active} change={changeTab} />
                <div className="pt-[30px] grid grid-cols-[1fr_1fr_20%] gap-[20px]">
                    teams
                </div>
        </div>
    );
}