import Button from "@/components/button";

export default function StepFour() {
    return (<div className="font-Eina03 pt-[30px] flex flex-col">
        <h3 className="mb-[24px] text-[#222] text-[20px] font-bold">Your document has been analyzed successfully</h3>
        <p className="text-[14px] ">Reroute to processed document with SMVRT Boxes & Active Projects &gt;  FULL VIEW</p>

        <Button label="View Document" className="bg-[#1860CC] text-white text-[14px] mt-[200px]" />
    </div>);
}