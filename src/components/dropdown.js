import { useEffect, useState } from "react";

export default function Dropdown(props) {
    let { label, options, value, onSelect, children, className, type, name} = props
    const [open, setOpen] = useState(false);

    type = type || 'radio'

    value = value || {label: '', value: {}}

    const handleClick = (option) => {
        onSelect(option)
        setOpen(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            if ( ! event.target.classList.contains('select') && ! event.target.closest('.select')) {
                setOpen(false)
            }
        }, false);
    }, [])

    return (<div className={`relative select ${open ? 'open': ''}`}>
        {
            label ? 
            <label 
                className={`block mb-2 text-sm font-Eina03 font-bold`}
                >{label}</label> : ""
        }
        
        <div onFocus={() => setOpen(! open)} onClick={() => {  setOpen(! open); }} className={`overflow-hidden border bg-white rounded-[6px] w-full flex items-center justify-between py-[10px] px-[12px] cursor-pointer ${className}`} >
            <div className={`text-[14px] mr-[10px] font-Eina03 text-[#B8C2CC]`}>
                { value.label }
            </div>
            <svg className={`ml-auto transition-all ${open ? 'rotate-[-90deg]' : 'rotate-[-180deg]'}`} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6L6 1L11 6" stroke="#737373" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <div className={`${ ! open ? 'hidden' : ''} dropdown absolute z-[9999] left-[0] w-auto bg-white mt-[6px] rounded-[6px] shadow w-full p-[8px] text-[#222] text-[14px] font-Eina03`}>
            {
                options.map((option, index) => {
                    return (
                        <div 
                            key={index}
                            // onClick={() => handleClick(option)} 
                            className={`flex items-center p-[12px] whitespace-nowrap cursor-pointer !text-[14px]`}>
                            <label className="inline-block lg:flex items-center justify-center select-none">
                                <input type={type} name={name} value={option.value} className={`w-[16px] h-[16px] text-blue-600 bg-gray-100 border-[#D4D4D4] rounded focus:ring-blue-500 focus:ring-2 mr-[6px]`} />
                                { option.label }
                            </label>
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