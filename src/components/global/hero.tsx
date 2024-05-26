import React from 'react'
import SignInForm from '../forms/signin-form'

const Hero = () => {
  return (
    <div className="flex items-start h-screen bg-cover bg-center hero">
        <div className='flex flex-col items-center lg:items-start justify-center bg-secondary-foreground/50 backdrop-blur-2xl h-full w-4/5 md:w-2/3 lg:w-3/5 xl:w-1/2 px-8 md:px-14 lg:px-28'>

            <div className='text-secondary space-y-2'>
                <h1>BlocMe</h1>
                <h4>Own Your Network, Own Your Impact</h4>
            </div>
            <div className='w-full'>
                <SignInForm />
            </div>
        </div>
    </div>
  )
}

export default Hero