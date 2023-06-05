'use client'

import CKeditor from '@/components/ckeditor'
import { useState, useEffect } from 'react';

export default function EditDocument() {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    return (<div className='mt-[35px]'>
        <CKeditor 
            onChange={(data) => {
                setData(data);
            }}
            editorLoaded={editorLoaded}
        />
    </div>);
}