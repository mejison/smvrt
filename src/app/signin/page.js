import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import GoogleSVG from '@/assets/google.svg';
import Input from '@/components/input';
import Button from '@/components/button';

export default function SignIn() {
    return (<div className='bg-[#F6FAFF] min-h-screen pt-[30px]'>
        <div className='container text-center flex flex-col justify-center h-full max-w-[400px] mx-auto'>
            <Image className='mx-auto mb-[12px]' src={LogoSVG} width={57} height={57} alt="logo" />
            <h3 className='text-black text-[36px] mb-[12px] font-Eina04 font-bold'>Welcome Back</h3>
            <p className='text-[#8792A8] text-[16px] px-3 mb-[32px]'>Discover the all-in-one solution to manage your legal matters </p>
            <div className="mb-[20px]">
                <Input 
                    label="Email Address"
                    placeholder="Enter email address"
                    type="email"
                ></Input>
            </div>
            <div className="mb-[20px]">
                <Input 
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                ></Input>
            </div>
            <div className='mt-[32px] mb-[16px]'>
                <Button 
                    label="Sign Up"
                    className="bg-[#1860CC]"
                ></Button>
            </div>
            <div className="mb-[18px]">
                <Button 
                    label="Continue with Google"
                    className="bg-white !text-[#222] !font-normal shadow"
                    icon={GoogleSVG}
                ></Button>
            </div>
            <label className='mb-[14px]'>
                <span className='text-[#222] text-[14px]'>
                    <a href='#' className='text-[#1860CC] underline underline-offset-2'>Forgot password?</a>
                </span>
            </label>
            <span className='text-[#222] text-[14px]'>Don’t have an account? <a href='#' className='text-[#1860CC]  underline underline-offset-2'>Sign up</a></span>
        </div>
    </div>);
}