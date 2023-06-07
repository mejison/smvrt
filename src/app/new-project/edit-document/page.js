'use client'

import CKeditor from '@/components/ckeditor'
import { useNewProject } from '@/context/new-project';
import { useState, useEffect } from 'react';

export default function StepFour() {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    const {project, setProject} = useNewProject();

    useEffect(() => {
        readFile();
    }, []);

    const readFile = () => {
        if (project.document instanceof Blob) {
            const fr = new FileReader
            fr.onloadend = () => {
                setData(fr.result);
                setEditorLoaded(true);
            }
            fr.readAsText(project.document)
            return ;
        }

        setEditorLoaded(true);
    }

    return (<div className='mt-[35px]'>
        <CKeditor 
            onChange={(data) => {
                setData(data);
            }}
            value={data}
            editorLoaded={editorLoaded}
        />
    </div>);
}