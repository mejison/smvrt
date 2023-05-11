import Image from "next/image";
import timesSVG from "@/assets/times.svg"


export default function WrapperModal({ children, open, title, icon }) {
    const handleClose = () => {
        alert('close')
    }
    return (
        <div className="fixed left-[0] top-[0] bottom-[0] right-[0] min-w-full min-h-screen overflow-hidden">
            <dialog open={ open } className="z-2 overflow-hidden max-w-[518px] rounded shadow fixed top-[50%] translate-y-[-50%]">
            <div className="text-[20px] font-bold text-[#222] mb-[16px] flex items-center justify-between">
                    {
                        icon ? (<Image src={ icon } alt="time" width="25" height="25" />) : <></>
                    }
                    <h3 className="ml-[20px]">{ title }</h3>
                    <a href="#" className="ml-[auto]">
                        <Image src={ timesSVG } alt="time" width="24" height="24" />
                        </a>
                    </div>
                    { children }
            </dialog>
            <div className="bg-slate-300 absolute left-0 top-0 bottom-0 right-0  w-full h-full z-1"></div>
        </div>
    );
}