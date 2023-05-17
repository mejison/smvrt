import { useState } from "react";

export default function Select({ label, options, value, onSelect, children }) {
    const [open, setOpen] = useState(true);

    const handleClick = (option) => {
        onSelect(option)
    }

    return (<div>
        <label 
            className="block mb-2 text-sm font-Eina03 font-bold"
            >{label}</label>
        <div onFocus={() => setOpen(! open)} onClick={() => setOpen(! open)} className="bg-white rounded-[6px] shadow w-full flex items-center justify-between py-[10px] px-[12px] cursor-pointer">
            <div className="text-[#222] text-[14px] font-Eina03">
                { value.label }
            </div>
            <svg className={`ml-auto transition-all ${open ? 'rotate-[-90deg]' : 'rotate-[-180deg]'}`} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6L6 1L11 6" stroke="#737373" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <div className={`${ ! open ? 'hidden' : ''} bg-white mt-[6px] rounded-[6px] shadow w-full p-[12px] text-[#222] text-[14px] font-Eina03`}>
            {
                options.map((option, index) => {
                    return (
                        <div 
                            key={index}
                            onClick={() => handleClick(option)} 
                            className={`p-[12px] cursor-pointer ${option.value == value.value ? 'bg-[#F7FAFF] border-b border-b-[#E5E5E5] border-t border-t-[#E5E5E5]' : ''}`}>
                            { option.label }
                        </div>
                    );
                })
            }
            {
                children
            }
        </div>
    </div>);
}