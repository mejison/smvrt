import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import Button from '@/components/button';

export default function Reset() {
    return (<div className='bg-[#F6FAFF] min-h-screen pt-[30px]'>
        <div className='container text-center flex flex-col justify-center h-full max-w-[400px] mx-auto'>
            <Image className='mx-auto mb-[12px]' src={LogoSVG} width={57} height={57} alt="logo" />
            <h3 className='text-black text-[36px] mb-[12px] font-Eina04 font-bold'>Check your email</h3>
            <p className='text-[#8792A8] text-[16px] px-3 mb-[32px]'>
                We have sent an email with password reset information to john.dowry@example.com
            </p>
            <p>
                Didn’t receive the email? 
                Please check your spam or promotion folder or
            </p>
            <div className='mt-[32px] mb-[16px]'>
                <Button 
                    label="Resend email"
                    className="bg-[#1860CC]"
                ></Button>
            </div>
        </div>
    </div>);
}