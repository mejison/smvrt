'use client'
import Select from "@/components/select";
import { useState } from "react";

export default function StepTwo() {
    const [options, setOptions] = useState([
        {
            label: 'Not selected',
            value: '',
        },
        {
            label: 'val 1',
            value: '1',
        },
        {
            label: 'val 2',
            value: '2',
        },
    ])

    const [team, setTeam] = useState(options[0])
    const onChangeTeam = (team) => {
        setTeam(team)
    }

    return (<div>
        <h3 className="font-Eina03 font-bold text-[20px] text-[#222] mt-[56px] mb-[24px]">Team & Collaborators</h3>
        <Select 
            label="Select your team"
            options={options}
            value={team}
            onChange={onChangeTeam}
        />
    </div>);
}