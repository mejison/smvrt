import Input from "@/components/input";
import Textarea from "@/components/textarea";
import DatePicker from "@/components/datepicker";

export default function NewProject() {
    return (
        <div>
            <h3 className="font-Eina03 font-bold text-[20px] text-[#222] mt-[56px] mb-[24px]">Project details</h3>
            <div className="mb-[16px]">
                <Input 
                    label="Project name"
                    placeholder="Input project name here"
                />
            </div>
            <div className="mb-[16px]">
                <DatePicker 
                    label="Due Date"
                    placeholder="01/10/2023"
                />
            </div>
            <Textarea 
                label="Notes (Quick Summary)"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo 
                sed egestas egestas fringilla."
                className="resize-none"
            />
        </div>
    );
}