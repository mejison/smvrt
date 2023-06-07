'use client'
import Table from "@/components/table";
import { useEffect, useState } from "react";
import * as api from '@/api'
import ProjectStatus from "@/components/project-status";

export default function ActiveProject() {
    const [fields, setFields] = useState([
        {
            label: 'Project name',
            field: 'name',
        },
        {
            label: 'Doc Type',
            getValue: (row) => {
                return row['document'] && row['document']['type'] && row['document']['type']['name'] || '';
            }
        },
        {
            label: 'Last modified',
            field: 'updated_at',
        },
        {
            label: 'Due Date',
            field: 'due_date',
        },
        {
            label: 'Status',
            getValue: (row) => {
                return (
                    <ProjectStatus type={row.status.toLowerCase().replace(/\s*/g, '')}>{ row.status }</ProjectStatus>
                );
            }
        },
        {
            label: 'Lead',
            getValue: (row) => {
                const members = row['team'] && row['team']['members'] || []
                const [lead] = members;
                return lead && lead.fname + ' ' + lead.lname || lead.email;
            }
        }
    ]);

    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.projects().then(({ data }) => {
            setProjects(data)
        })
    }, []);

    return (<div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
        <Table
            fields={fields}
            data={projects}
        />
    </div>);
}