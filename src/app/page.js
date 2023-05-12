'use client'

// import VerifyEmailAddress from '@/popups/verify-email-address';

export default function Page() {
  
  const handleClose = () => {
    alert('1')
  }

  const handleResend = () => {
    alert('2')
  }

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      {/* <VerifyEmailAddress 
        open={false} 
        title="Verify email address"
        onClose={handleClose}
        handleResend={handleResend}
      /> */}
    </div>
  );
}
