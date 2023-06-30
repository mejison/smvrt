"use client"

import DashboardLayout from "@/layouts/dashboard";
import Card from "@/components/card";
import Stepper from "@/components/stepper";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import searchsvg from "@/assets/search.svg"

import NewProjectContext from '@/context/new-project'
import { useRouter } from 'next/navigation'
import * as api from '@/api'

import ServerError from '@/popups/server-error';
import ServerSuccess from '@/popups/server-success';

export default function NewProjectLayout({ children }) {
    const { push } = useRouter();
    const [steps, setSteps] = useState([
        {
            label: 'Add project details',
            slug: ''
        },
        {
            label: 'Team & Collaborators',
            slug: 'step-2'
        },
        // {
        //     // label: 'Approvals & Signatures',
        //     label: 'Signatures',
        //     slug: 'step-3'
        // },
        {
            label: 'Upload Document',
            slug: 'step-3'
        },
        {
            label: 'Start Project',
            slug: 'step-4'
        }
    ])

    const [popup, setPopup] = useState({
        server_error: {
            visible: false,
            message: '',
        },
        server_success: {
            title: 'Success',
            visible: false,
            message: '',
        },
    })

    const [project, setProject] = useState({
        name: '',
        leads: {},
        notes: '',
        duedate: '',
        reminderdate: '',
        team: '',
        members: [],
        external_collaborators: [],
        signatories: [],
        documentname: '',
        document: null,
        type: '',
        category: '',
        approvers: [],
        final_approver: {
            label: 'Not selected',
            value: null,
        },
        save_for_future: false,
    })

    const [activeStep, setActiveStep] = useState('step-1')

    const onChangeActiveStep = (step) => {
        setActiveStep(step.slug)
        push("/new-project/" + step.slug)
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
        if (targetStep == steps[steps.length - 1]) {
            handleCreateProject();
            return;
        }

        if (currentIndex != steps.length - 1) { 
            setActiveStep(targetStep.slug);
            push("/new-project/step-" + (currentIndex + 2))
        }
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
            // const existLead = !! Object.values(project.leads).filter(value => value).length
            // return existLead
        }

        if (activeStep == steps[3].slug) {
           if ( ! project.documentname || ! project.document) {
            return false;
           }
        }

        return true
    }

    const handleCreateProject = async () => {
        setPopup({
            ...popup,
            server_success: {
                title: 'Wait',
                visible: true,
                message: "We're Analyzing Your Document, Hang Tight ..."
            }
        })

        const fd = new FormData;
        fd.append('file', project.document)
            
        const content = await api.convert_file_to_html(fd)
                .then((data) => {
                    return new Promise((resolve, reject) => resolve(data.data))
            });

        api.openAI_summarize_document({
            content,
        }).then((data) => {
            
            console.log({ data })

            setPopup({
                ...popup,
                server_success: {
                    title: "Success",
                    visible: false,
                    message: ""
                }
            })

            const fd = new FormData;
            for(let key in project) {
                fd.append(key, project[key])
            }
    
            fd.set('final_approver', JSON.stringify(project.final_approver))
            if (project.team) {
                fd.set('team', JSON.stringify(project.team))
            }
           
            project.approvers.forEach(member => {
                fd.append('approvers[]', JSON.stringify(member))
            })
    
            project.members.forEach(member => {
                fd.append('members[]', JSON.stringify(member))
            })

            project.external_collaborators.forEach(member => {
                fd.append('external_collaborators[]', JSON.stringify(member))
            })
    
            project.signatories.forEach(member => {
                fd.append('signatories[]', JSON.stringify(member))
            })
    
            fd.set('save_for_future', project.save_for_future ? 1 : 0)
    
            api.create_project(fd)
                .then((data) => {
                const errors = data.errors ? Object.values(data.errors) : []
                if (errors.length || data.exception) {
                    const message = Object.values(errors).flat(1).join(' ') || data.message
                    setPopup({
                        ...popup,
                        server_error: {
                            visible: true,
                            message
                        }
                    })
                    return ;
                }
    
                setActiveStep("step-4");
                push("/new-project/step-4")
            })
        })
    }

    useEffect(() => {
        const segments = location.pathname.split('/')
        const step = segments.pop()
       
        if (['new-project'].includes(step)) {
            setActiveStep('')    
        }
       
        if (['step-2', 'step-3', 'step-4'].includes(step)) {
            setActiveStep(step)
        }
    }, [])

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

            <ServerError 
                    open={popup.server_error.visible} 
                    title="Error"
                    message={popup.server_error.message}
                    onClose={() => {setPopup({...popup, server_error: { visible: false }})}}
                    />

                <ServerSuccess
                    open={popup.server_success.visible} 
                    title={popup.server_success.title}
                    message={popup.server_success.message}
                    onClose={() => {setPopup({...popup, server_success: { visible: false }})}}  
                    />
            </div>
        </DashboardLayout>
    );
}