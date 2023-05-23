import Button from '@/components/button.js';
import WrapperModal from './wrapper.js'
import Input from '@/components/input.js';
import Select from '@/components/select.js';
import UploadArea from '@/components/upload-area.js';
import { useState } from 'react';

export default function VerifyEmailAddress(props) {
    const [types, setTypes] = useState([
        {
            label: 'NDA',
            slug: 'nda'
        }
    ]);

    const [categories, setCategories] = useState([
        {
            label: 'Bussiness',
            slug: 'bussiness'
        }
    ])

    const [type, setType] = useState(types[0])
    const [category, setCategory] = useState(categories[0])

    const [form, setForm] = useState({
        name: '',
        file: null
    })

    const handleUpload = (file) => {
        setForm({
            ...form,
            file,
        })
    }

    const handleChangeOthers = () => {

    }

    const handleChangeTypes = () => {

    }

    return (<WrapperModal open={props.open} {...props}>
                <div className='pt-[15px] mb-[24px]'>
                    <h3 className='block mb-2 text-sm font-Eina03 font-bold mb-[8px]'>Document Type</h3>
                    <div className='grid gap-[16px] grid-cols-[1fr_1fr]'>
                        <Select 
                            options={types}
                            value={type}
                            onChange={handleChangeTypes}
                        />
                        <Input 
                            placeholder="Others"
                            value={form.name}
                            onChange={handleChangeOthers}
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
                        value={category}
                    />
                </div>
                <div className='mb-[15px]'>
                    <UploadArea onUpload={handleUpload} />
                </div>
                <Button label="Upload" className="bg-[#1860CC] text-[14px] text-white" />
            </WrapperModal>);
}