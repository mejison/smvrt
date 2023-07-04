'use client'
import CKeditor from "@/components/ckeditor";
import { useEffect, useState } from "react";

export default function MyDocument() {
    const [load, setLoad] = useState(false)

    useEffect(() => {
        
        setTimeout(() => {
            setLoad(true)
        }, 1500)
        
    }, [])

    return (<div className="lg:pl-[270px] pl-0 pt-[90px]">
                my document
                <CKeditor editorLoaded={load} value={'sdf'}  />
            </div>);
}