import Image from "next/image";
import timesSVG from "@/assets/times.svg"
import "./wrapper.css"

export default function WrapperModal({ children, open, title, icon, onClose }) {
    
    return (
        <div className={`${open ? 'open' : ''} wrapper-modal fixed left-[0] top-[0] bottom-[0] right-[0] min-w-full min-h-screen overflow-hidden`}>
            <dialog open={ open } className="z-[2] overflow-hidden max-w-[518px] min-w-[518px] rounded shadow fixed top-[50%] translate-y-[-50%]">
                <div className="title text-[20px] font-bold text-[#222] mb-[16px] flex items-center justify-between">
                        {
                            icon ? (<Image src={ icon } alt="time" width="25" height="25" />) : <></>
                        }
                        <h3 className="ml-[20px]">{ title }</h3>
                        <a href="#" className="times" onClick={onClose}>
                            <Image src={ timesSVG } alt="time" width="24" height="24" />
                            </a>
                        </div>
                    { children }
            </dialog>
            <div className="overlay left-0 top-0 bottom-0 right-0  w-full h-full z-[1]"></div>
        </div>
    );
}