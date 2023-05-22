import Input from "./input";
import calendarsvg from '@/assets/calendar.svg'

export default function DatePicker({ label, placeholder }) {
    return (<div className="flex items-center">
                <Input 
                    label={label}
                    placeholder={placeholder}
                    icon={calendarsvg}
                    className="min-w-[376px]"
                />
                <a href="#" className="text-[#1860CC] underline underline-offset-2 translate-y-[10px] ml-8 text-[14px]">Reminder setting</a>
            </div>);
}