"use client"

import DashboardLayout from "@/layouts/dashboard";
import Card from "@/components/card";
import Stepper from "@/components/stepper";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import searchsvg from "@/assets/search.svg"

import NewProjectContext from '@/context/new-project'
import { useRouter } from 'next/navigation'

export default function NewProjectLayout({ children }) {
    const { push } = useRouter();
    const [steps, setSteps] = useState([
        {
            label: 'Add project details',
            slug: 'step-1'
        },
        {
            label: 'Team & Collaborators',
            slug: 'step-2'
        },
        {
            label: 'Approvals & Signatures',
            slug: 'step-3'
        },
        {
            label: 'Edit Document',
            slug: 'step-4'
        }
    ])

    const [project, setProject] = useState({
        name: '',
        notes: '',
        duedate: '',
        team: null,
        members: [],
        external_collaborators: [],
        filename: '',
        file: null,
        type: '',
        category: '',
    })

    const [activeStep, setActiveStep] = useState('step-1')

    const onChangeActiveStep = (step) => {
        // setActiveStep(step.slug)
    }

    const handlePrev = () => {
        const currentIndex = steps.findIndex(item => item.slug == activeStep)
        const targetStep = steps[currentIndex - 1]
        setActiveStep(targetStep.slug);
        if (currentIndex - 1 != 0) {
            push("/new-project/step-" + (currentIndex ))
        } else {
            push("/new-project")
        }
    }

    const handleNext = () => {
        const currentIndex = steps.findIndex(item => item.slug == activeStep)
        const targetStep = steps[currentIndex + 1]
        setActiveStep(targetStep.slug);
        push("/new-project/step-" + (currentIndex + 2))
    }

    const isCanPrev = () => {
        if (activeStep == steps[0].slug) {
            return false
        }
        return true
    }

    const isCanNext = () => {
        if (activeStep == steps[0].slug) {
            if ( ! project.name || ! project.duedate) { 
                return false;
            }
        }

        if (activeStep == steps[1].slug) {
            // ...
        }

        return true
    }

    // useEffect(() => {
    //     const segments = location.pathname.split('/')
    //     const currentStep = segments.length >= 2 ? segments[2] : false
    //     if (currentStep) {
    //         setActiveStep(currentStep)
    //     }
    // }, [activeStep])

    return (
        <DashboardLayout>
            <div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px] relative pb-[100px]">
                <Card className="max-w-[800px] mx-auto">
                    <Stepper 
                        steps={steps} 
                        active={activeStep}
                        onChange={onChangeActiveStep} 
                    />
                    
                    <NewProjectContext.Provider value={{ project, setProject, handleNext }}>
                        {children}
                    </NewProjectContext.Provider>
                </Card>
                <div className="fixed bottom-0 z-[2] left-0 right-0 border-t p-[15px] bg-[#fff] lg:pl-[270px] pl-0 ">
                    <div className="mx-auto max-w-[800px] flex items-center justify-between">
                        <Button {...{disabled: !isCanPrev() }}  onClick={handlePrev} icon={searchsvg} label="Previous" className="border border-[#1860CC] !text-[#1860CC] font-bold !w-auto text-[14px] px-[20px]" />
                        <Button {...{disabled: !isCanNext() }} onClick={handleNext} label="Save and Continue" className="bg-[#1860CC] !text-white font-bold !w-auto text-[14px] px-[20px]" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}