"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import GoogleSVG from '@/assets/google.svg';
import Input from '@/components/input';
import Button from '@/components/button';
import * as api from '@/api'
import { validation } from '@/utils/validation'
import Link from 'next/link';
 
import VerifyEmailAddress from '@/popups/verify-email-address';
import ServerError from '@/popups/server-error';

export default function SignUp() {
    const [errors, setErrors] = useState({
        'email': [],
        'password': [],
        'confirm_password': [],
        'terms_and_conditions': [],
    });

    const [popup, setPopup] = useState({
        verify_email_address: {
            visible: false,
        },
        server_error: {
            visible: false,
            message: '',
        },
    })

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirm_password: '',
        terms_and_conditions: false
    })

    const rules = {
        email: ['email','required'],
        password: ['password','required'],
        confirm_password: ['required', 'password',`confirm:${form.password}`],
        terms_and_conditions: ['terms_and_conditions']
    }

    const handleSignUp = () => {
        let messages = {}
        for(let field in rules) {
            let message = validation(form[field], rules[field]);
            messages[field] = message
        }

        setErrors(messages);

        if ( ! Object.values(messages).flat(1).length) {
            api.signup(form)
                .then(res => res.json())
                .then((data) => {
                    const errors = data.errors ? Object.values(data.errors) : []
                    if (errors.length) {
                        setPopup({
                            ...popup,
                            server_error: {
                                visible: true,
                                message: Object.values(errors).flat(1).join(' ')
                            }
                            
                        })
                    }

                    setPopup({
                        ...popup,
                        verify_email_address: {
                            visible: true,
                        }
                    })
                })
        }
    }

    const handleTermsAndConditions = (event) => {
        const value = event.target.checked
        setForm({
            ...form,
            terms_and_conditions: value
        })

        if (value) {
            setErrors({
                ...errors,
                terms_and_conditions: []
            })
        }
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
    
    const handleResend = () => {
        alert('2')
    }

    return (<div className='bg-[#F6FAFF] min-h-screen pt-[30px] px-[30px] lg:px-0'>
        <div className='container text-center flex flex-col justify-center h-full max-w-[400px] mx-auto'>
            <Image className='mx-auto mb-[12px]' src={LogoSVG} width={57} height={57} alt="logo" />
            <h3 className='text-black text-[36px] mb-[12px] font-Eina04 font-bold'>Sign up</h3>
            <p className='text-[#8792A8] text-[16px] px-3 mb-[32px]'>Discover the all-in-one solution to manage your legal matters </p>
            <div className="mb-[20px]">
                <Input 
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                    errors={errors.email}
                    onInput={(e) => onChange('email', e.target.value, rules.email)}
                ></Input>
            </div>
            <div className="mb-[20px]">
                <Input 
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    errors={errors.password}
                    onInput={(e) => onChange('password', e.target.value, rules.password)}
                ></Input>
            </div>
            <div>
                <Input 
                    label="Confirm password"
                    placeholder="Enter password"
                    type="password"
                    errors={errors.confirm_password}
                    onInput={(e) => onChange('confirm_password', e.target.value, rules.confirm_password)}
                ></Input>
            </div>
            <div className='mt-[32px] mb-[16px]'>
                <Button 
                    label="Sign Up"
                    onClick={handleSignUp}
                    className="bg-[#1860CC]"
                ></Button>
            </div>
            <div className="mb-[18px]">
                <Button 
                    label="Continue with Google"
                    className="bg-white !text-[#222] !font-normal shadow"
                    icon={GoogleSVG}
                ></Button>
            </div>
            <label className='mb-[14px]'>
                <span className='text-[#222] text-[14px]'>
                    <div className="mb-4 inline-block lg:flex items-center justify-center">
                        <input id="default-checkbox" type="checkbox" onChange={handleTermsAndConditions} value="" className={`w-[20px] h-[20px] text-blue-600 bg-gray-100 border-[#D4D4D4] rounded focus:ring-blue-500 focus:ring-2 mr-[17px]`} />
                        I agree with the&nbsp; <Link  href='/terms-and-conditions-and-privacy-policy' className='text-[#1860CC] underline underline-offset-2'>Terms of Use </Link>&nbsp; and&nbsp; <Link  href='/terms-and-conditions-and-privacy-policy?tab=privacy-policy' className='text-[#1860CC] underline underline-offset-2'> Privacy Policy</Link>
                    </div>
                    {
                        errors.terms_and_conditions.length ? 
                        <p className="mt-[8px] text-sm text-[#D94042] text-left ml-[20px]" dangerouslySetInnerHTML={{__html: errors.terms_and_conditions.join('<br />')}}></p> 
                        : <></>
                    }
                </span>
            </label>
            <span className='text-[#222] text-[14px] mb-[50px]'>Already have an account? <Link href="/signin" className='text-[#1860CC]  underline underline-offset-2'>Sign in</Link></span>
        </div>

        <VerifyEmailAddress 
            open={popup.verify_email_address.visible}
            title="Verify email address"
            onClose={() => {setPopup({...popup, verify_email_address: { visible: false }})}}
            handleResend={handleResend}
        />

        <ServerError 
            open={popup.server_error.visible} 
            title="Error"
            message={popup.server_error.message}
            onClose={() => {setPopup({...popup, server_error: { visible: false }})}}
        />
    </div>);
}