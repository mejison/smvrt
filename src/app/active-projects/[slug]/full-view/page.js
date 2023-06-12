'use client'
import Button from "@/components/button";
import Card from "@/components/card";
import DescriptionBox from "@/components/description-box";
import SmallTabs from "@/components/small-tabs";
import { useEffect, useState } from "react";
import sharesvg from '@/assets/share.svg'
import invitesvg from '@/assets/invite.svg'
import SharePopUp from "@/popups/share";
import InvitePopUp from "@/popups/invite";
import { useProject } from "@/context/project";
import Prompt from "@/popups/prompt";
import ServerSuccess from "@/popups/server-success";

export default function FullView() {

    const {project, roles, setProject} = useProject();

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

    const [share, setShare] = useState({});

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const description = `All the Lorem Ipsum generators on the Internet tend to repeat 
                        predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        `
    const [popup, setPopUp] = useState({
        share: false,
        invite: false,
        confirm: false,
        success: {
            visible: false,
            message: '',
        },
    })

    const handleClickShare = () => {
        setPopUp({
            ...popup,
            share: true
        })
    }

    const handleClickInvite = () => {
        setPopUp({
            ...popup,
            invite: true
        })
    }

    const handleShare = (shareForm) => {
        setShare(shareForm)
        setPopUp({
            ...popup,
            confirm: true,
        })
    }

    const handleConfirm = () => {
        setPopUp({
            ...popup,
            confirm: false,
            success: {
                visible: true,
                message: 'You have successfully shared this project  to external collaborator(s).'
            },
           })
    }

    return (<div className="relative grid grid-cols-[1fr_400px] gap-2 items-center mb-6">
        <div className="grid grid-cols-[1fr_1fr] gap-3 absolute right-0 top-[-70px]">
            <Button 
                label="Share" 
                className="bg-[#F0F6FF] !text-[#1860CC]  border px-[16px] !py-[8px] border-[#1860CC] rounded text-[14px]"
                icon={sharesvg}
                onClick={handleClickShare}
            />
            <Button 
                label="Invite" 
                className="bg-[#F0F6FF] !text-[#1860CC] border px-[16px] !py-[8px] border-[#1860CC] rounded text-[14px]" 
                icon={invitesvg}
                onClick={handleClickInvite}
            />
        </div>
        <Card>
            <SmallTabs 
                tabs={tabs} 
                active={activeTab} 
                onChange={setActiveTab}
            />
            <div className="max-h-[500px] overflow-y-auto text-[14px] pt-4">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                    sheets containing Lorem Ipsum passages, and more recently with 
                    desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <br />
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                    sheets containing Lorem Ipsum passages, and more recently with 
                    desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <br />
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
        </Card>
        <div>
            <DescriptionBox description={description} />
        </div>
        <SharePopUp 
            open={popup.share} 
            roles={roles}
            project={project}
            onClose={() => setPopUp({...popup, share: false})} 
            onShare={(data) => handleShare(data)}
        />
        <InvitePopUp
            open={popup.invite}
            roles={roles}
            project={project}
            onClose={() => setPopUp({...popup, invite: false})} 
            onInvite={() => setPopUp({...popup, invite: false, success: {visible: true, message: 'You have successfully invited external collaborator(s) to this project.'}})}
        />
        <Prompt open={popup.confirm} 
            title="Share project" 
            message={`You are about to share the project to ${share.email}, 
                    are you sure you’d like to proceed?`}
            onConfirm={handleConfirm}
            onClose={() => setPopUp({...popup, confirm: false})} 
        />
        <ServerSuccess open={popup.success.visible} 
            title="All good!" 
            message={popup.success.message}
            onClose={() => setPopUp({...popup, success: {...popup.success, visible: false}, share: false})} 
        />
    </div>);
}