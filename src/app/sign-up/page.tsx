import SignUpForm from '@/components/forms/signup-form'
import React from 'react'


const SignUp = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-cover hero'>
        <div className='bg-secondary-foreground/50 backdrop-blur-2xl p-14 rounded-lg'>
            <h2 className='text-secondary'>Enter your information below <br/> to start</h2>
            <SignUpForm />
        </div>
    </div>
  )
}

export default SignUp