"use client";

import { useRouter } from 'next/router';
import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import GoogleAuthBtn from '@/components/google-auth-btn';
import Input from '@/components/input';
import Button from '@/components/button';
import Link from 'next/link'
import { setCookie } from '@/utils/helpers'

import * as api from '@/api'
import { validation } from '@/utils/validation'
import React, { useState } from 'react'

export default function SignIn() {
    const [errors, setErrors] = useState({
        'email': [],
        'password': [],
    });

    const [response, setResponse] = useState("");

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const rules = {
        email: ['email','required'],
        password: ['password','required'],
    }

    const onChange = (field, value, rules) => {
        setForm({
            ...form,
            [field]: value
        })

        setErrors({
            ...errors,
            [field]: []
        })

        const messages = validation(value, rules);
        
        if (messages.length) {
            setErrors({
                ...errors,
                [field]: [...messages]
            })
        }
    }

    const handleSignIn = () => {
        let messages = {}
        for(let field in rules) {
            let message = validation(form[field], rules[field]);
            messages[field] = message
        }

        setErrors(messages);

        if ( ! Object.values(messages).flat(1).length) {
            api.signin(form)
                .then(data => data.json())
                .then(data => {
                    if (data.status == 'error') {
                        setResponse(data.message)
                        return;
                    }

                    setResponse("")

                    localStorage.setItem('user', JSON.stringify(data.user))
                    localStorage.setItem('token', data.authorisation.token)

                    setCookie('token', data.authorisation.token, 86400)
                    location.href = "/dashboard"
                })
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSignIn();
        }
    };

    return (<div className='bg-[#F6FAFF] min-h-screen pt-[30px] px-[30px] lg:px-0'>
        <div className='container text-center flex flex-col justify-center h-full max-w-[400px] mx-auto'>
            <Image className='mx-auto mb-[12px]' src={LogoSVG} width={57} height={57} alt="logo" />
            <h3 className='text-black text-[36px] mb-[12px] font-Eina04 font-bold'>Welcome Back</h3>
            <p className='text-[#8792A8] text-[16px] px-3 mb-[32px]'>Discover the all-in-one solution to manage your legal matters </p>
            <div className="mb-[20px]">
                <Input 
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                    value={form.email}
                    errors={errors.email}
                    onInput={(e) => onChange('email', e.target.value, rules.email)}
                    onKeyDown={handleKeyDown}
                ></Input>
            </div>
            <div className="mb-[20px]">
                <Input 
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    value={form.password}
                    errors={errors.password}
                    onInput={(e) => onChange('password', e.target.value, rules.password)}
                    onKeyDown={handleKeyDown}
                ></Input>
            </div>
            {
                response ? 
                <p className="mt-[8px] text-sm text-[#D94042] text-left ml-[20px]" dangerouslySetInnerHTML={{__html: response }}></p> 
                : <></>
            }
            <div className='mt-[32px] mb-[16px]'>
                <Button 
                    label="Sign In"
                    className="bg-[#1860CC]"
                    onClick={handleSignIn}
                ></Button>
            </div>
            <div className="mb-[18px]">
                <GoogleAuthBtn />
            </div>
            <label className='mb-[14px]'>
                <span className='text-[#222] text-[14px]'>
                    <Link href='/forgot' className='text-[#1860CC] underline underline-offset-2'>Forgot password?</Link>
                </span>
            </label>
            <span className='text-[#222] text-[14px]'>Don’t have an account? <Link href='/signup' className='text-[#1860CC]  underline underline-offset-2'>Sign up</Link></span>
        </div>
    </div>);
}