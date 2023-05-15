'use client'
import Card from "@/components/card";
import Input from "@/components/input";
import Tabs from "@/components/tabs";
import React, { useState } from 'react';
import pencilsvg from '@/assets/pencil.svg'
import Image from 'next/image';

export default function MyAccount() {
    const tabs = [
        {
            label: "Profile",
            slug: "profile",
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

    const [active, setActive] = useState(tabs[0])

    const changeTab = (tab) => {
        setActive(tab)
    }

    const handleEditPassword = () => {
        alert('handleEditPassword')
    }

    return (<div className="p-4 lg:pl-[270px] pl-0 pt-[90px]">
        <Tabs tabs={tabs} active={active} change={changeTab} />
        <div className="pt-[30px] grid grid-cols-[1fr_1fr_20%] gap-[20px]">
            <Card>
                <div className="mb-[40px] grid grid-cols-[100px_1fr] gap-[20px] items-center content-center">
                    <div>
                        <div className="w-[86px] h-[86px] rounded-full bg-[#222]" ></div>
                    </div>
                    <div className="relative flex flex-col text-[#222]">
                        <h3 class="font-bold text-[28px]">Alex Fisher</h3>
                        <span class="text-[12px] underline cursor-pointer">Edit display images</span>
                        <a href="#" onClick={handleEditPassword} className="absolute top-3 right-5">
                            <Image src={pencilsvg} width={22} height={22} alt="pencil" />
                        </a>
                    </div>
                </div>
                <div className="mb-[20px]">
                    <Input label="First name"  type="text" placeholder="First name" />
                </div>
                <div className="mb-[20px]">
                    <Input label="Last name"  type="text" placeholder="Last name" />
                </div>
                <div className="mb-[20px]">
                    <Input label="Phone Number"  type="phone" placeholder="Phone Number" />
                </div>
                <Input label="Email Address"  type="email" placeholder="Email Address" />
            </Card>
            <Card className="relative">
                <h4 className="font-Eina03 font-bold mb-[20px]">Change password</h4>
                <a href="#" onClick={handleEditPassword} className="absolute top-[24px] right-[24px]">
                    <Image src={pencilsvg} width={22} height={22} alt="pencil" />
                </a>
                <div className="mb-[20px]">
                    <Input label="Password"  type="password" placeholder="Password" />
                </div>
                <Input label="Confirm password"  type="password" placeholder="Confirm password" />
            </Card>
        </div>
    </div>);
}