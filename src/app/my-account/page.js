'use client'
import Card from "@/components/card";
import Input from "@/components/input";
import Tabs from "@/components/tabs";
import React, { useState } from 'react';
import pencilsvg from '@/assets/pencil.svg'
import Image from 'next/image';
import Button from "@/components/button";

import * as api from '@/api'
import { validation } from '@/utils/validation'

import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';

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

    const [state, setState] = useState({
        edit: {
            password: false,
            profile: false,
        }
    })

    const [errorsPassword, setPasswordErrors] = useState({
        'password': [],
        'confirm_password': [],
    });
    
    const [formPassword, setForm] = useState({
        password: '',
        confirm_password: '',
    })

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

    const rulesPassword = {
        password: ['password','required'],
        confirm_password: ['password','required'],
    }

    const onChangePassword = (field, value, rules) => {
        setForm({
            ...formPassword,
            [field]: value
        })

        setPasswordErrors({
            ...errorsPassword,
            [field]: []
        })

        const messages = validation(value, rules);
        
        if (messages.length) {
            setPasswordErrors({
                ...errorsPassword,
                [field]: [...messages]
            })
        }
    }

    const changeTab = (tab) => {
        setActive(tab)
    }

    const handleEditPassword = () => {
        setState({
            ...state,
            edit: {
                ...state.edit,
                password: ! state.edit.password
            }
        })
    }

    const handleEditProfile = () => {
        setState({
            ...state,
            edit: {
                ...state.edit,
                profile: ! state.edit.profile
            }
        })
    }

    const updatePasswords = () => {
        let messages = {}
        for(let field in rulesPassword) {
            let message = validation(formPassword[field], rulesPassword[field]);
            messages[field] = message
        }

        setPasswordErrors(messages);

        if ( ! Object.values(messages).flat(1).length) {
            api.reset({
                ...formPassword,
                email: 'test@test.com'
            })
                .then(data => data.json())
                .then(data => {
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
                        <h3 className="font-bold text-[28px]">Alex Fisher</h3>
                        <span className="text-[12px] underline cursor-pointer">Edit display images</span>
                        <a href="#" onClick={handleEditProfile} className="absolute top-3 right-5">
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
                {
                    state.edit.profile ? (
                        <div className="flex justify-end mt-[32px]">
                            <Button
                                label="Cencel"
                                onClick={handleEditProfile}
                                className="bg-white !text-[#222] !py-2 px-4 border border-[#222] font-Eina03">
                                Cencel
                            </Button>
                            <Button 
                                label="Update"
                                className="bg-[#1860CC] !py-2 px-4 ml-[12px] font-Eina03 font-bold"
                            ></Button>
                        </div>
                    ) : <></>
                }
            </Card>
            <Card className="relative">
                <h4 className="font-Eina03 font-bold mb-[20px]">Change password</h4>
                <a href="#" onClick={handleEditPassword} className="absolute top-[24px] right-[24px]">
                    <Image src={pencilsvg} width={22} height={22} alt="pencil" />
                </a>
                <div className="mb-[20px]">
                    <Input 
                        label="Password"  
                        type="password" 
                        placeholder="******" 
                        value={formPassword.password}
                        errors={errorsPassword.password}
                        onInput={(e) => onChangePassword('password', e.target.value, rulesPassword.password)}
                        />
                </div>
                <Input 
                    label="Confirm password"  
                    type="password" 
                    placeholder="******" 
                    value={formPassword.confirm_password}
                    errors={errorsPassword.confirm_password}
                    onInput={(e) => onChangePassword('confirm_password', e.target.value, [...rulesPassword.confirm_password, `confirm:${formPassword.password}`])}
                    />
                    {
                        state.edit.password ? (
                            <div className="flex justify-end mt-[32px]">
                                <Button
                                    label="Cencel"
                                    onClick={handleEditPassword}
                                    className="bg-white !text-[#222] !py-2 px-4 border border-[#222] font-Eina03">
                                    Cencel
                                </Button>
                                <Button 
                                    label="Update"
                                    onClick={updatePasswords}
                                    className="bg-[#1860CC] !py-2 px-4 ml-[12px] font-Eina03 font-bold"
                                ></Button>
                            </div>
                        ) : <></>
                    }
            </Card>
        </div>
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
    </div>);
}