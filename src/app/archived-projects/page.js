'use client'

import Dropdown from "@/components/dropdown";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import * as api from '@/api'
import Button from "@/components/button";


export default function ArchivedProjects() {
    const fields = [
        {
            label: "Project name",
            field: 'name',
            sort: 'asc',
            class: 'font-bold'
        },
        {
            label: "Doc Type",
            field: 'type',
            sort: 'asc',
            class: 'font-bold'
        },
        {
            label: "Last Modified",
            field: 'updated_at',
            sort: 'asc'
        },
        {
            label: "Team",
            field: 'team',
            sort: 'asc'
        },
        {
            label: "No. of versions",
            field: 'versions',
            sort: 'asc'
        }
    ]

    const [roles, setRoles] = useState([
        {
            label: 'Owner by A-Z',
            value: 'a-z'
        },
        {
            label: 'Owner by Z-A',
            value: 'z-a'
        }
    ])
    const [teams, setTeams] = useState([])

    const [role, setRole] = useState(roles[0])
    const [team, setTeam] = useState({
        label: "Team",
        value: '',
    })

    const [archivedProjects, setArchivedProjects] = useState([
        {
            name: 'Cleo',
            type: 'NDA',
            updated_at: 'Apr 10, 2022',
            team: 'English',
            versions: '3',
        },
        {
            name: 'Funnel',
            type: 'NDA',
            updated_at: 'Apr 10, 2022',
            team: 'English',
            versions: '3',
        },
        {
            name: 'Tibber',
            type: 'NDA',
            updated_at: 'Apr 10, 2022',
            team: 'English',
            versions: '3',
        },
    ]);

    const [sortOptions, setSortOptions] = useState([
        {
            label: 'Newest first',
            value: 'newest-first',
        },
        {
            label: 'Oldest first',
            value: 'oldest-first',
        },
    ])

    const [documentTypes, setDocumentTypes] = useState([
        {
            label: 'Document type',
            value: '',
        },
        {
            label: 'NDA',
            value: 'nda',
        },
        {
            label: 'DPA',
            value: 'dpa',
        },
        {
            label: 'Job offer letter',
            value: 'job-offer-letter',
        },
        {
            label: 'MSA',
            value: 'msa',
        },
    ])

    const [sort, setSort] = useState({...sortOptions[0]})
    const [doctype, setDocType] = useState({
        label: 'Document type',
        value: '',
    })

    useEffect(() => {
        api.get_profile_teams()
        .then(data => data.json())
        .then((data) => {
           if (data && data.data && data.data.length) {
            const teams = [
                {
                    label: "Team",
                    value: '',
                },
                ...data.data.map(role => ({label : role.name, value: role.id}) )
            ]
            setTeams(teams)
            setTeam(teams[0])
           }
        });
    }, [])

    return (<div className="lg:pl-[270px] pl-0 pt-[90px] pr-[15px]">
        archived projects
        {/* <div className="flex items-center items-center content-center py-[22px]"> */}
            {/* <div className=" mr-[12px]">
                <Button 
                    label="All results"
                    className="bg-[#4ECFE0] text-[14px] min-w-[100px]"
                />
            </div>
            <div className="mr-[12px]">
                <Dropdown 
                    options={roles}
                    value={role}
                    type="radio"
                    name="name"
                    className="max-w-[150px]"
                />
            </div>
            <div 
                className="mr-[12px]">
                <Dropdown
                    options={teams}
                    value={team}
                    type="radio"
                    name="team"
                    className="max-w-[150px]"
                />
            </div>
            <div
                className="mr-[12px]"
            >
                <Dropdown 
                    options={sortOptions}
                    value={sort}
                    type="checkbox"
                    className="max-w-[200px]  mr-[12px]"
                />
            </div>
            <div
                className="mr-[12px]"
                >
                <Dropdown 
                    options={documentTypes}
                    value={doctype}
                    type="checkbox"
                    className="max-w-[200px]"
                />
            </div>
        </div>
        <Table fields={fields} data={archivedProjects} /> */}
    </div>);
}