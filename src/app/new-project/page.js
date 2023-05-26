'use client'

import Input from "@/components/input";
import Textarea from "@/components/textarea";
import DatePicker from "@/components/datepicker";
import { useState } from "react";
import { useNewProject } from '@/context/new-project'

export default function NewProject() {
    const {project, setProject} = useNewProject();

    const handleChange = (value, field) => {
        setProject({
            ...project,
            [field]: value
        })
    }

    const handleAddDueDate = (date) => {
        setProject({
            ...project,
            ['duedate']: date
        })
    }

    return (
        <div>
            <h3 className="font-Eina03 font-bold text-[20px] text-[#222] mt-[56px] mb-[24px]">Project details</h3>
            <div className="mb-[16px]">
                <Input 
                    label="Project name"
                    placeholder="Input project name here"
                    value={project.name}
                    onChange={(event) => handleChange(event.target.value, 'name')}
                />
            </div>
            <div className="mb-[16px]">
                <DatePicker 
                    label="Due Date"
                    placeholder="01/10/2023"
                    onChange={handleAddDueDate}
                    value={project.duedate}
                />
            </div>
            <Textarea 
                label="Notes (Quick Summary)"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo 
                sed egestas egestas fringilla."
                className="resize-none"
                maxLength="300"
                value={project.notes}
                onChange={(event) => handleChange(event.target.value, 'notes')}
            />
        </div>
    );
}