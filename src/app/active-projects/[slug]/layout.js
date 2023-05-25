"use client"

import DashboardLayout from "@/layouts/dashboard";
import Card from "@/components/card";
import Stepper from "@/components/stepper";
import { useEffect, useState } from "react";
import ProjectDetailsHeader from "@/components/project-details-header";
import Tabs from "@/components/tabs";
import ProjectContext from '@/context/project';


export default function ProjectDetailsLayout({ children }) {
    const [project, setProject] = useState({});

    const [tabs, setTabs] = useState([
        {
            label: 'General',
            slug: 'general',
        },
        {
            label: 'Full view',
            slug: 'full view',
        },
        {
            label: 'Summary',
            slug: 'summary',
        },
        {
            label: 'Forum',
            slug: 'forum',
        },
        {
            label: 'History',
            slug: 'history',
        },
    ])
    const [activeTab, setActiveTab] = useState(tabs[0])

   
    const [steps, setSteps] = useState([
        {
            label: 'In Progress',
            slug: 'in-progress'
        },
        {
            label: 'Internal Approval',
            slug: 'internal-approval'
        },
        {
            label: 'New Version Sent',
            slug: 'new-version-sent'
        },
        {
            label: 'New Version Received',
            slug: 'new-version-received'
        },
        {
            label: 'To Sign',
            slug: 'to-sign'
        }
    ])

    const [activeStep, setActiveStep] = useState('internal-approval')

    const onChangeActiveStep = (step) => {
        setActiveStep(step.slug)
    }

    useEffect(() => {
         setProject({
            name: 'Zephyr & Virgin Galactic (V3)',
            doctype: 'NDA',
            updated_at: 'Apr 10, 2022',
            created_at: 'Apr 10, 2022',
            status: 'Internal Approval',
            lead: 'John Dicks',
            owner: 'Virgin Galactic',
            description: 'sdf',
            team: 'sdf'
        })
    }, [])

    return (
        <DashboardLayout>
            <div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
                <ProjectDetailsHeader 
                    project={project} 
                    steps={steps} 
                    activeStep={activeStep}
                />
                <ProjectContext.Provider value={{ project, setProject }}>
                    <Tabs tabs={tabs} active={activeTab} className="mb-8" />
                    {children}
                </ProjectContext.Provider>
            </div>
        </DashboardLayout>
    );
}