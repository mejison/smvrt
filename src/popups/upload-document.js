import Button from '@/components/button.js';
import WrapperModal from './wrapper.js'
import Input from '@/components/input.js';
import Select from '@/components/select.js';
import UploadArea from '@/components/upload-area.js';
import { useState } from 'react';

export default function VerifyEmailAddress(props) {
    const { onUpload }  = props;
    const [types, setTypes] = useState([
        {
            label: 'NDA',
            value: 'nda'
        },
        {
            label: 'NDA2',
            value: 'nda2'
        },
        {
            label: 'NDA3',
            value: 'nda3'
        },
    ]);

    const [categories, setCategories] = useState([
        {
            label: 'Bussiness',
            value: 'bussiness'
        },
        {
            label: 'Bussiness2',
            value: 'bussiness2'
        },
        {
            label: 'Bussiness3',
            value: 'bussiness3'
        }
    ])

    const [form, setForm] = useState({
        others: '',
        type: types[0],
        category: categories[0],
        file: null
    })

    const handleUpload = (file) => {
        setForm({
            ...form,
            file,
        })
    }

    const handleChangeCategory = (option) => {
        setForm({
            ...form,
            category: option
        })
    }

    const handleChangeTypes = (option) => {
        setForm({
            ...form,
            type: option
        })
    }

    return (<WrapperModal open={props.open} {...props}>
                <div className='pt-[15px] mb-[24px]'>
                    <h3 className='block mb-2 text-sm font-Eina03 font-bold mb-[8px]'>Document Type</h3>
                    <div className='grid gap-[16px] grid-cols-[1fr_1fr]'>
                        <Select 
                            options={types}
                            value={form.type}
                            onSelect={handleChangeTypes}
                        />
                        <Input 
                            placeholder="Others"
                            value={form.others}
                            onInput={(event) => setForm({...form, others: event.target.value})}
                        />
                    </div>
                </div>
                <div className='mb-[24px] relative'>
                    <span className='absolute top-[4px] left-[75px]  cursor-pointer'>
                        <svg className='w-[18px] h-[18px]' width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.2857 19.5714C15.4141 19.5714 19.5714 15.4141 19.5714 10.2857C19.5714 5.15736 15.4141 1 10.2857 1C5.15736 1 1 5.15736 1 10.2857C1 15.4141 5.15736 19.5714 10.2857 19.5714Z" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.2861 10.2856V15.2856" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.2856 7.42857C10.6801 7.42857 10.9999 7.10877 10.9999 6.71429C10.9999 6.3198 10.6801 6 10.2856 6C9.89109 6 9.57129 6.3198 9.57129 6.71429C9.57129 7.10877 9.89109 7.42857 10.2856 7.42857Z" stroke="#B8C2CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <Select 
                        label="Category"
                        options={categories}
                        value={form.category}
                        onSelect={handleChangeCategory}
                    />
                </div>
                <div className='mb-[15px]'>
                    <UploadArea onUpload={handleUpload} />
                </div>
                <Button label="Upload" onClick={() => onUpload(form)} disabled={!(form.file && form.type && form.category)} className="bg-[#1860CC] text-[14px] text-white" />
            </WrapperModal>);
}