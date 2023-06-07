'use client'
import Table from "@/components/table";
import { useState } from "react";

export default function ActiveProject() {
    const [fields, setFields] = useState([
        {
            label: 'Project name',
            field: 'name',
        },
        {
            label: 'Doc Type',
            field: 'doctype',
        },
        {
            label: 'Last modified',
            field: 'updated_at',
        },
        {
            label: 'Status',
            field: 'status',
        },
        {
            label: 'Lead',
            field: 'lead',
        }
    ]);

    const [projects, setProjects] = useState([
        {
            name: 'Zephyr & Virgin Galactic (V3)',
            doctype: 'NDA',
            updated_at: 'Apr 10, 2022',
            status: 'Internal Approval',
            lead: 'John Dicks',
        }
    ])

    return (<div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
        active project
        {/* <Table
            fields={fields}
            data={projects}
        /> */}
    </div>);
}