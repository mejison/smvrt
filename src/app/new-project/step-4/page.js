'use client'
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function StepFour() {
    const { push } = useRouter()

    const handleClick = () => {
        push('/active-projects')
    }

    return (<div className="font-Eina03 pt-[30px] flex flex-col">
        <h3 className="mb-[24px] text-[#222] text-[20px] font-bold">You&apos;re Ready to Start Your Project!</h3>
        <p className="text-[14px] ">Click Start Project to Continue</p>

        <Button onClick={handleClick} label="Start Project" className="bg-[#1860CC] text-white text-[14px] mt-[200px]" />
    </div>);
}