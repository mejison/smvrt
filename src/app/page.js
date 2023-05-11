import Image from 'next/image'
import VerifyEmailAddress from '@/popups/verify-email-address';

export default function Page() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <VerifyEmailAddress 
        open={false} 
        title="Verify email address"
      />
    </div>
  );
}
