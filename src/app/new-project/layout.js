"use client"

import DashboardLayout from "@/layouts/dashboard";
import Card from "@/components/card";
import Stepper from "@/components/stepper";
import { useState } from "react";

export default function NewProjectLayout({ children }) {
    const [steps, setSteps] = useState([
        {
            label: 'Add project details',
            slug: 'add-project-details'
        },
        {
            label: 'Team & Collaborators',
            slug: 'team-collaborators'
        },
        {
            label: 'Approvals & Signatures',
            slug: 'approvals-signatures'
        },
        {
            label: 'Edit Document',
            slug: 'edit-document'
        }
    ])

    const [activeStep, setActiveStep] = useState('team-collaborators')

    const onChangeActiveStep = (step) => {
        setActiveStep(step.slug)
    }

    return (
        <DashboardLayout>
            <div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
                <Card className="max-w-[800px] mx-auto">
                    <Stepper 
                        steps={steps} 
                        active={activeStep}
                        onChange={onChangeActiveStep} 
                    />
                    {children}
                </Card>
            </div>
        </DashboardLayout>
    );
}