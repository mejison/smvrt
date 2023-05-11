import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import Input from '@/components/input';
import Button from '@/components/button';

export default function Forgot() {
    return (<div className='bg-[#F6FAFF] min-h-screen pt-[30px]'>
        <div className='container text-center flex flex-col justify-center h-full max-w-[400px] mx-auto'>
            <Image className='mx-auto mb-[12px]' src={LogoSVG} width={57} height={57} alt="logo" />
            <h3 className='text-black text-[36px] mb-[12px] font-Eina04 font-bold'>Forgot password?</h3>
            <p className='text-[#8792A8] text-[16px] px-3 mb-[32px]'>
            If you have an account, we have sent an email to 
            your following instructions on how to reset your 
            password.
            </p>
            <div className="mb-[20px]">
                <Input 
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                ></Input>
            </div>
            <div className='mt-[32px] mb-[16px]'>
                <Button 
                    label="Send"
                    className="bg-[#1860CC]"
                ></Button>
            </div>
        </div>
    </div>);
}