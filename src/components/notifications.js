import Image from "next/image";
import belsvg from "@/assets/bell.svg"

export default function Notifications() {
    return (<div className="flex items-center justify-center border-r-[#D2D2D2] border-r">
        <a href="#">
            <Image src={belsvg} width="48px" height="48px" alt="notify" />
        </a>
    </div>);
}