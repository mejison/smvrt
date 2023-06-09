'use client'
import Card from "@/components/card";
import DescriptionBox from "@/components/description-box";
import SmallTabs from "@/components/small-tabs";
import { useEffect, useState } from "react";

export default function FullView() {
    const [tabs, setTabs] = useState([
        {
            label:'Full view',
            slug: 'full-view',
        },
        {
            label: 'Summary',
            slug: 'summary'
        }
    ])

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const description = `All the Lorem Ipsum generators on the Internet tend to repeat 
    predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
    `

    return (<div className="grid grid-cols-[1fr_400px] gap-2 items-center">
        <Card>
            <SmallTabs 
                tabs={tabs} 
                active={activeTab} 
                onChange={setActiveTab}
            />
        </Card>
        <div>
            <DescriptionBox description={description} />
        </div>
    </div>);
}